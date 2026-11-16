import { emi } from '@/lib/math';

export const LOAN_TIERS = [1_500_000, 2_500_000, 4_000_000] as const;

const ILLUSTRATIVE_MARGINS: { margin: number; label: string; descriptor: string }[] = [
  { margin: 1.0, label: '+1.00% margin', descriptor: 'Illustrative lower margin over 3M EIBOR' },
  { margin: 1.5, label: '+1.50% margin', descriptor: 'Illustrative mid-range margin over 3M EIBOR' },
  { margin: 2.0, label: '+2.00% margin', descriptor: 'Illustrative higher margin over 3M EIBOR' },
];

export type RevertMarginTier = {
  margin: number;
  label: string;
  descriptor: string;
  effectiveRate: number;
  monthlyEmi: number;
};

export type RevertBriefing = {
  loan: number;
  years: number;
  eibor3m: number;
  tiers: RevertMarginTier[];
  monthlySpread: number;
};

export function buildRevertBriefing(loan: number, eibor3m: number, years = 25): RevertBriefing {
  const safeLoan = loan > 0 && Number.isFinite(loan) ? loan : 0;
  const safeEibor = Number.isFinite(eibor3m) ? eibor3m : 4.21;

  const tiers: RevertMarginTier[] = ILLUSTRATIVE_MARGINS.map(({ margin, label, descriptor }) => {
    const effectiveRate = +(safeEibor + margin).toFixed(2);
    const monthlyEmi = safeLoan > 0 ? Math.round(emi(safeLoan, effectiveRate, years)) : 0;
    return {
      margin,
      label,
      descriptor,
      effectiveRate,
      monthlyEmi,
    };
  });

  const monthlySpread =
    safeLoan > 0 && tiers.length >= 2 ? Math.max(0, tiers[tiers.length - 1].monthlyEmi - tiers[0].monthlyEmi) : 0;

  return { loan: safeLoan, years, eibor3m: safeEibor, tiers, monthlySpread };
}
