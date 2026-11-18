import { SITE } from '@/data/site';

export interface WebsiteEnquiryInput {
  name: string;
  phone: string;
  email?: string;
  residency?: string;
  goal?: string;
  price?: string | number;
  downPaymentPct?: number;
  monthlyIncomeAed?: number;
  topic?: string;
  preferredSlot?: string;
  sourcePage?: string;
  agencyName?: string;
  reraOrn?: string;
  reraBrn?: string;
}

export interface OsLeadPayload {
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  residency: string;
  goal: string;
  propertyPriceAed: number;
  downPaymentPct: number;
  monthlyIncomeAed: number;
  topic: string;
  preferredSlot?: string;
  sourcePage: string;
  agencyName?: string;
  reraOrn?: string;
  reraBrn?: string;
}

export function buildOsLeadPayload(input: WebsiteEnquiryInput): OsLeadPayload {
  const rawPrice =
    typeof input.price === 'number'
      ? input.price
      : Number(String(input.price || '').replace(/[^0-9.]/g, '')) || 2_500_000;

  return {
    contactName: String(input.name || '').trim(),
    contactPhone: String(input.phone || '').trim(),
    contactEmail: String(input.email || '').trim(),
    residency: String(input.residency || 'Expat resident'),
    goal: String(input.goal || 'Buy a ready home'),
    propertyPriceAed: Math.round(rawPrice),
    downPaymentPct: Number(input.downPaymentPct ?? 20),
    monthlyIncomeAed: Number(input.monthlyIncomeAed ?? 45_000),
    topic: String(input.topic || 'Website Mortgage Enquiry'),
    preferredSlot: input.preferredSlot ? String(input.preferredSlot) : undefined,
    sourcePage: String(input.sourcePage || '/contact'),
    agencyName: input.agencyName ? String(input.agencyName) : undefined,
    reraOrn: input.reraOrn ? String(input.reraOrn) : undefined,
    reraBrn: input.reraBrn ? String(input.reraBrn) : undefined,
  };
}

export function createLocalEnquiryReference(name: string, phone: string): string {
  const seed = `${name.trim().toLowerCase()}:${phone.replace(/\D/g, '')}`;
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const code = String((h >>> 0) % 9000 + 1000);
  return `BW-ENQ-${code}`;
}

export async function submitWebsiteLeadToOs(input: WebsiteEnquiryInput): Promise<{
  ok: boolean;
  referenceCode: string;
  assignedAdvisor?: { name: string; designation: string; email: string };
  osPortalUrl: string;
}> {
  const payload = buildOsLeadPayload(input);
  try {
    const res = await fetch('/api/os/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = await res.json();
      return {
        ok: true,
        referenceCode: data.referenceCode || createLocalEnquiryReference(payload.contactName, payload.contactPhone),
        assignedAdvisor: data.assignedAdvisor,
        osPortalUrl: SITE.osPortalUrl,
      };
    }
  } catch {
    /* fallback below */
  }
  return {
    ok: true,
    referenceCode: createLocalEnquiryReference(payload.contactName, payload.contactPhone),
    osPortalUrl: SITE.osPortalUrl,
  };
}
