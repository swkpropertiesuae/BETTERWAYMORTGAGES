import { createHmac, timingSafeEqual } from 'node:crypto';
import { SITE } from '@/data/site';

export interface LiveCmsOffer {
  id: string;
  slug: string;
  tab: string;
  badge: string;
  title: string;
  summary: string;
  highlights: string[];
  bankKey: string;
  rateBadge: string;
  ctaHref: string;
  ctaLabel: string;
  spotlight: boolean;
}

export interface LiveCmsBanner {
  id: string;
  placement: string;
  badge: string;
  message: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface LiveCmsBankRate {
  id: string;
  bankKey: string;
  bankName: string;
  productName: string;
  ratePct: number;
  fixedYears: number;
  revertMarginPct: number;
  maxLtvPct: number;
  islamic: boolean;
  featured: boolean;
  verifiedAt: string;
}

export interface LiveCmsTeamMember {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  designation: string;
  department: string;
  category: string;
  email: string;
  portraitUrl: string;
  summary: string;
  specialties: string[];
}

export interface LiveCmsPayload {
  brand: string;
  office: string;
  syncedAt: string;
  offers: LiveCmsOffer[];
  banners: LiveCmsBanner[];
  rates: LiveCmsBankRate[];
  team: LiveCmsTeamMember[];
}

export function getCmsRevalidateSecret(): string {
  return (
    process.env.BW_CMS_REVALIDATE_SECRET?.trim() ||
    process.env.BW_INTAKE_HMAC_SECRET?.trim() ||
    ''
  );
}

export function verifyCmsRevalidateSignature(rawBody: string, headerSig: string | null, secretOverride?: string): boolean {
  const secret = (secretOverride ?? getCmsRevalidateSecret()).trim();
  if (!secret || !headerSig) return false;
  const expected = `sha256=${createHmac('sha256', secret).update(rawBody).digest('hex')}`;
  const a = Buffer.from(headerSig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function resolveOsCmsUrl(): string {
  const base = (process.env.BW_OS_INTERNAL_URL || SITE.osUrl || '').trim().replace(/\/$/, '');
  return base ? `${base}/api/v1/public/cms` : '';
}

/**
 * Fetches live offers, announcement banners, bank rates & team data published from Betterway OS.
 * Safely returns null if Betterway OS is unreachable during static build or offline preview so
 * bundled website defaults always render without interruption.
 */
export async function fetchLiveCms(): Promise<LiveCmsPayload | null> {
  const url = resolveOsCmsUrl();
  if (!url) return null;
  try {
    const res = await fetch(url, {
      next: { revalidate: 60, tags: ['betterway-cms'] },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as LiveCmsPayload;
    if (!data || !Array.isArray(data.offers)) return null;
    return data;
  } catch {
    return null;
  }
}
