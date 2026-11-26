import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { getCmsRevalidateSecret, verifyCmsRevalidateSignature } from '@/lib/cms-live';

export async function POST(req: Request) {
  const secret = getCmsRevalidateSecret();
  if (!secret) {
    return NextResponse.json(
      { error: 'CMS revalidation secret is not configured on this environment.' },
      { status: 503 },
    );
  }

  const rawBody = await req.text();
  const sig = req.headers.get('x-betterway-signature');
  if (!verifyCmsRevalidateSignature(rawBody, sig, secret)) {
    return NextResponse.json({ error: 'Invalid HMAC signature.' }, { status: 401 });
  }

  let tag = 'betterway-cms';
  try {
    const parsed = JSON.parse(rawBody || '{}') as { tag?: string };
    if (parsed.tag && /^[a-z0-9-]+$/i.test(parsed.tag)) {
      tag = parsed.tag;
    }
  } catch {
    /* keep default tag */
  }

  revalidateTag(tag);
  return NextResponse.json({ ok: true, revalidated: tag, at: new Date().toISOString() });
}
