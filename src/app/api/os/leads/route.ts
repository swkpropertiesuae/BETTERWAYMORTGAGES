import { createHmac } from 'node:crypto';
import { NextResponse } from 'next/server';
import { SITE } from '@/data/site';
import { createLocalEnquiryReference } from '@/lib/os-interconnect';

const MAX_BODY_BYTES = 16_384;
const RATE_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 15;
const rateBucket = new Map<string, { count: number; resetAt: number }>();

function cleanStr(val: unknown, maxLen: number): string {
  if (typeof val !== 'string' && typeof val !== 'number') return '';
  return String(val)
    .replace(/[\u0000-\u001f\u007f<>]/g, '')
    .trim()
    .slice(0, maxLen);
}

function cleanNum(val: unknown, min: number, max: number): number | undefined {
  if (val === undefined || val === null || val === '') return undefined;
  const n = Number(val);
  if (!Number.isFinite(n)) return undefined;
  return Math.min(max, Math.max(min, n));
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateBucket.get(ip);
  if (!entry || now > entry.resetAt) {
    if (rateBucket.size > 5000) rateBucket.clear();
    rateBucket.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip')?.trim() ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      );
    }

    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Payload exceeds allowed size.' }, { status: 413 });
    }

    const rawText = await req.text();
    if (rawText.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Payload exceeds allowed size.' }, { status: 413 });
    }

    const body = JSON.parse(rawText) as Record<string, unknown>;
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid enquiry payload.' }, { status: 400 });
    }

    // Silent honeypot check for automated spam bots
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true, syncedToOs: false, referenceCode: 'BW-RECEIVED' }, { status: 202 });
    }

    const contactName = cleanStr(body.contactName ?? body.name, 120);
    const contactPhone = cleanStr(body.contactPhone ?? body.phone, 32);
    const contactEmail = cleanStr(body.contactEmail ?? body.email, 160);

    if (contactName.length < 2 || !/^[+\d][\d\s\-()]{6,26}$/.test(contactPhone)) {
      return NextResponse.json(
        { error: 'Please provide a valid full name and UAE or international phone number.' },
        { status: 400 },
      );
    }

    if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Allow-listed sanitized payload forwarded to Betterway OS (never forwards arbitrary raw client keys)
    const sanitized = {
      contactName,
      contactPhone,
      contactEmail: contactEmail || undefined,
      source: cleanStr(body.source, 64) || 'betterway-web',
      topic: cleanStr(body.topic ?? body.goal, 120) || undefined,
      advisor: cleanStr(body.advisor, 120) || undefined,
      residency: cleanStr(body.residency, 64) || undefined,
      community: cleanStr(body.community, 120) || undefined,
      agencyName: cleanStr(body.agencyName, 140) || undefined,
      reraBrn: cleanStr(body.reraBrn, 48) || undefined,
      slot: cleanStr(body.slot, 64) || undefined,
      notes: cleanStr(body.notes, 1000) || undefined,
      propertyPriceAed: cleanNum(body.propertyPriceAed ?? body.price, 100_000, 500_000_000),
      monthlyIncomeAed: cleanNum(body.monthlyIncomeAed ?? body.income, 1_000, 50_000_000),
      downPaymentPct: cleanNum(body.downPaymentPct, 5, 95),
      receivedAt: new Date().toISOString(),
    };

    const rawBody = JSON.stringify(sanitized);
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const hmacSecret = process.env.BW_INTAKE_HMAC_SECRET;
    if (hmacSecret) {
      headers['x-betterway-signature'] = `sha256=${createHmac('sha256', hmacSecret).update(rawBody).digest('hex')}`;
    }

    const candidateEndpoints = [
      process.env.BW_OS_INTERNAL_URL ? `${process.env.BW_OS_INTERNAL_URL.replace(/\/$/, '')}/api/v1/intake/leads` : null,
      process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api/v1/intake/leads' : null,
      SITE.osLeadIntakeUrl,
    ].filter((u, idx, arr): u is string => Boolean(u) && arr.indexOf(u) === idx);

    for (const url of candidateEndpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers,
          body: rawBody,
          signal: AbortSignal.timeout(4500),
        });
        if (res.ok) {
          const data = await res.json();
          return NextResponse.json({
            ok: true,
            syncedToOs: true,
            leadId: data.leadId,
            referenceCode: data.referenceCode || createLocalEnquiryReference(contactName, contactPhone),
            assignedAdvisor: data.assignedAdvisor || {
              name: 'Betterway Advisory Desk',
              designation: 'Mortgage Specialist',
              email: SITE.email,
            },
            osPortalUrl: SITE.osPortalUrl,
          });
        }
      } catch {
        /* try next endpoint */
      }
    }

    // Honest 202 response: never misrepresent an unsynced submission as persisted in Betterway OS
    return NextResponse.json(
      {
        ok: true,
        syncedToOs: false,
        referenceCode: createLocalEnquiryReference(contactName, contactPhone),
        assignedAdvisor: {
          name: 'Betterway Advisory Desk',
          designation: 'Mortgage Specialist',
          email: SITE.email,
        },
        osPortalUrl: SITE.osPortalUrl,
      },
      { status: 202 },
    );
  } catch {
    return NextResponse.json(
      { error: 'Unable to process your enquiry. Please check your details and try again.' },
      { status: 400 },
    );
  }
}
