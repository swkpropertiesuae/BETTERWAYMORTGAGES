import { BANKS } from '@/data/banks';
import { cashToClose, emi } from '@/lib/math';

export type HeroScene = {
  index: string;
  label: string;
  location: string;
  mandate: string;
  href: string;
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
};

export const HERO_SCENES: readonly HeroScene[] = [
  {
    index: '01',
    label: 'Waterfront Villa',
    location: 'Palm & Jumeirah Bay',
    mandate: 'Resident & private-client mortgages · up to 80% LTV',
    href: '/mortgages/uae-residents',
    src: '/images/dubai-waterfront-3344.webp',
    srcSet: '/images/dubai-waterfront-1280.webp 1280w, /images/dubai-waterfront-1672.webp 1672w, /images/dubai-waterfront-3344.webp 3344w',
    width: 3344,
    height: 1882,
    alt: 'Concept architectural residence overlooking the Dubai skyline across calm water',
  },
  {
    index: '02',
    label: 'Marina Horizon',
    location: 'Dubai Marina & Harbour',
    mandate: 'Non-resident & overseas income · 20 jurisdictions',
    href: '/mortgages/non-resident-dubai',
    src: '/images/marina-evening-2752.webp',
    srcSet: '/images/marina-evening.webp 1376w, /images/marina-evening-2752.webp 2752w',
    width: 2752,
    height: 1536,
    alt: 'Concept evening view over Dubai Marina towers from a private terrace',
  },
  {
    index: '03',
    label: 'Transfer Desk',
    location: 'DLD Trustee & Closing',
    mandate: 'Valuation, final offer & trustee cheque execution',
    href: '/guides/complete-dld-trustee-transfer-day-checklist',
    src: '/images/guide-transfer-day-2752.webp',
    srcSet: '/images/guide-transfer-day.webp 1376w, /images/guide-transfer-day-2752.webp 2752w',
    width: 2752,
    height: 1536,
    alt: 'Concept boardroom overlooking Palm Jumeirah prepared for property transfer completion',
  },
] as const;

export function computeScrollProgress(scrollY: number, scrollHeight: number, viewportHeight: number): number {
  const max = scrollHeight - viewportHeight;
  if (!Number.isFinite(max) || max <= 0 || !Number.isFinite(scrollY)) return 0;
  return Math.min(1, Math.max(0, scrollY / max));
}

export function nextSceneIndex(current: number, total: number, step: 1 | -1 = 1): number {
  if (!Number.isFinite(total) || total <= 0) return 0;
  return (((current + step) % total) + total) % total;
}

export function buildHeroDossier(price: number, downPct: number, eibor3m: number) {
  const cash = cashToClose({ price, downPct });
  const twoYearRates = BANKS.filter((b) => b.introTerm === '2Y').map((b) => b.intro);
  const indicativeRate = Math.min(...twoYearRates);
  const indicativeEmi = Math.round(emi(cash.loan, indicativeRate, 25));
  const safeEibor = Number.isFinite(eibor3m) ? eibor3m : 4.21;

  return {
    price,
    downPct,
    loan: Math.round(cash.loan),
    upfrontCash: Math.round(cash.total),
    indicativeRate,
    indicativeEmi,
    eiborFormatted: `${safeEibor.toFixed(2)}%`,
  };
}

export function interpolateCount(target: number, progress: number): number {
  if (!Number.isFinite(target) || target <= 0) return 0;
  if (!Number.isFinite(progress) || progress <= 0) return 0;
  if (progress >= 1) return Math.round(target);
  const eased = 1 - Math.pow(1 - progress, 3);
  return Math.round(target * eased);
}

