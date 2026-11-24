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
    mandate: 'Resident mortgages · CBUAE up to 80% / 85% LTV',
    href: '/mortgages/uae-residents',
    src: '/images/dubai-waterfront-3072.webp',
    srcSet: '/images/dubai-waterfront-768.webp 768w, /images/dubai-waterfront-1536.webp 1536w, /images/dubai-waterfront-3072.webp 3072w',
    width: 3072,
    height: 1728,
    alt: 'Concept architectural residence overlooking the Dubai skyline across calm water',
  },
  {
    index: '02',
    label: 'Marina Horizon',
    location: 'Dubai Marina & Harbour',
    mandate: 'Non-resident & overseas documentation · 25 country guides',
    href: '/mortgages/non-resident-dubai',
    src: '/images/marina-evening-3072.webp',
    srcSet: '/images/marina-evening-768.webp 768w, /images/marina-evening-1536.webp 1536w, /images/marina-evening-3072.webp 3072w',
    width: 3072,
    height: 1728,
    alt: 'Concept evening view over Dubai Marina towers from a private terrace',
  },
  {
    index: '03',
    label: 'Transfer Desk',
    location: 'DLD Trustee & Closing',
    mandate: 'Valuation, Final Offer Letter & trustee cheque execution',
    href: '/guides/complete-dld-trustee-transfer-day-checklist',
    src: '/images/guide-transfer-day-3072.webp',
    srcSet: '/images/guide-transfer-day-768.webp 768w, /images/guide-transfer-day-1536.webp 1536w, /images/guide-transfer-day-3072.webp 3072w',
    width: 3072,
    height: 1728,
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

export function buildHeroDossier(eibor3m: number) {
  const safeEibor = Number.isFinite(eibor3m) ? eibor3m : 4.21;

  return {
    eiborFormatted: `${safeEibor.toFixed(2)}%`,
    residentMaxLtv: '80%',
    nationalMaxLtv: '85%',
    maxDbr: '50%',
  };
}

export function interpolateCount(target: number, progress: number): number {
  if (!Number.isFinite(target) || target <= 0) return 0;
  if (!Number.isFinite(progress) || progress <= 0) return 0;
  if (progress >= 1) return Math.round(target);
  const eased = 1 - Math.pow(1 - progress, 3);
  return Math.round(target * eased);
}
