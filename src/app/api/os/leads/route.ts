import { createHmac } from 'node:crypto';
import { NextResponse } from 'next/server';
import { SITE } from '@/data/site';
import { createLocalEnquiryReference } from '@/lib/os-interconnect';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const contactName = String(body.contactName || body.name || '').trim();
    const contactPhone = String(body.contactPhone || body.phone || '').trim();
    if (!contactName || !contactPhone) {
      return NextResponse.json({ error: 'Name and mobile phone are required.' }, { status: 400 });
    }

    const rawBody = JSON.stringify(body);
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
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unable to process enquiry' },
      { status: 400 },
    );
  }
}
