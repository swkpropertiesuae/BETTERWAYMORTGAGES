import { BANKS, type Bank } from '@/data/banks';
import { fixedThenRevert } from '@/lib/math';

export const LOAN_TIERS = [1_500_000, 2_500_000, 4_000_000] as const;

const ARCHETYPES: { key: string; archetype: string }[] = [
  { key: 'dib', archetype: 'Lowest revert margin (+1.00%)' },
  { key: 'hsbc', archetype: '2-year fixed · lowest floor (1.99%)' },
  { key: 'sib', archetype: 'Lowest Year-1 headline teaser' },
];

export type RevertOfferRow = {
  key: string;
  slug: string;
  logo: string;
  name: string;
  short: string;
  type: Bank['type'];
  archetype: string;
  intro: number;
  introTerm: Bank['introTerm'];
  margin: number;
  floor: number;
  revertRate: number;
  floorBinding: boolean;
  introEmi: number;
  revertEmi: number;
  monthlyJump: number;
  fiveYearCost: number;
  lowestFiveYearCost: boolean;
  lowestTeaser: boolean;
};

export type RevertBriefing = {
  loan: number;
  years: number;
  eibor3m: number;
  offers: RevertOfferRow[];
  spreadFiveYear: number;
  maxRevertJump: number;
};

export function buildRevertBriefing(loan: number, eibor3m: number, years = 25): RevertBriefing {
  const safeLoan = loan > 0 && Number.isFinite(loan) ? loan : 0;
  const safeEibor = Number.isFinite(eibor3m) ? eibor3m : 4.21;

  const banks = ARCHETYPES.map((entry) => {
    const bank = BANKS.find((b) => b.key === entry.key);
    if (!bank) throw new Error(`Missing benchmark archetype bank: ${entry.key}`);
    return { bank, archetype: entry.archetype };
  });

  const minIntro = Math.min(...banks.map(({ bank }) => bank.intro));

  const unsorted = banks.map(({ bank, archetype }) => {
    const rawFormula = safeEibor + bank.margin;
    const floorBinding = rawFormula < bank.floor;
    const revertRate = +Math.max(rawFormula, bank.floor).toFixed(2);
    const fixedYears = bank.introTerm === '1Y' ? 1 : 2;

    if (safeLoan === 0) {
      return {
        key: bank.key,
        slug: bank.slug,
        logo: bank.logo,
        name: bank.name,
        short: bank.short,
        type: bank.type,
        archetype,
        intro: bank.intro,
        introTerm: bank.introTerm,
        margin: bank.margin,
        floor: bank.floor,
        revertRate,
        floorBinding,
        introEmi: 0,
        revertEmi: 0,
        monthlyJump: 0,
        fiveYearCost: 0,
        lowestFiveYearCost: false,
        lowestTeaser: bank.intro === minIntro,
      };
    }

    const calc = fixedThenRevert(safeLoan, years, bank.intro, fixedYears, safeEibor, bank.margin, bank.floor, 5);
    const introEmi = Math.round(calc.introEmi);
    const revertEmi = Math.round(calc.revertEmi);

    return {
      key: bank.key,
      slug: bank.slug,
      logo: bank.logo,
      name: bank.name,
      short: bank.short,
      type: bank.type,
      archetype,
      intro: bank.intro,
      introTerm: bank.introTerm,
      margin: bank.margin,
      floor: bank.floor,
      revertRate,
      floorBinding,
      introEmi,
      revertEmi,
      monthlyJump: revertEmi - introEmi,
      fiveYearCost: Math.round(calc.cost),
      lowestFiveYearCost: false,
      lowestTeaser: bank.intro === minIntro,
    };
  });

  const offers = [...unsorted].sort((a, b) => a.fiveYearCost - b.fiveYearCost);
  if (offers.length > 0 && safeLoan > 0) {
    offers[0] = { ...offers[0], lowestFiveYearCost: true };
  }

  const best = offers[0];
  const teaser = offers.find((o) => o.lowestTeaser) ?? offers[offers.length - 1];
  const spreadFiveYear = safeLoan > 0 && best && teaser ? Math.max(0, teaser.fiveYearCost - best.fiveYearCost) : 0;
  const maxRevertJump = safeLoan > 0 ? Math.max(0, ...offers.map((o) => o.monthlyJump)) : 0;

  return { loan: safeLoan, years, eibor3m: safeEibor, offers, spreadFiveYear, maxRevertJump };
}
