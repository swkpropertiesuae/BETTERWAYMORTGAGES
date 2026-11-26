import { createHmac } from 'node:crypto';
import { NextResponse } from 'next/server';
import { SITE } from '@/data/site';

const MAX_BODY_BYTES = 8_192;
const RATE_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 25;
const rateBucket = new Map<string, { count: number; resetAt: number }>();

function cleanStr(val: unknown, maxLen: number): string {
  if (typeof val !== 'string' && typeof val !== 'number') return '';
  return String(val)
    .replace(/[\u0000-\u001f\u007f<>]/g, '')
    .trim()
    .slice(0, maxLen);
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateBucket.get(ip);
  if (!entry || now > entry.resetAt) {
    if (rateBucket.size > 4000) rateBucket.clear();
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
        { error: 'Too many chat messages. Please pause briefly and try again.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      );
    }

    const rawText = await req.text();
    if (rawText.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Message too large.' }, { status: 413 });
    }

    const body = JSON.parse(rawText) as Record<string, unknown>;
    const message = cleanStr(body.message, 1000);
    const sessionId = cleanStr(body.sessionId, 64) || `bw_chat_${Date.now().toString(36)}`;
    const locale = cleanStr(body.locale, 8) || 'en';
    const page = cleanStr(body.page, 120) || '/';
    const visitorName = cleanStr(body.name, 100);
    const visitorPhone = cleanStr(body.phone, 32);

    if (message.length < 1 && visitorPhone.length < 6) {
      return NextResponse.json({ error: 'Message cannot be empty.' }, { status: 400 });
    }

    const payload = {
      channel: 'website-live-chat',
      sessionId,
      locale,
      page,
      message,
      contactName: visitorName || 'Website Live Chat Visitor',
      contactPhone: visitorPhone || undefined,
      source: 'betterway-web-live-chat',
      sentAt: new Date().toISOString(),
    };

    const rawBody = JSON.stringify(payload);
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const hmacSecret = process.env.BW_INTAKE_HMAC_SECRET;
    if (hmacSecret) {
      headers['x-betterway-signature'] = `sha256=${createHmac('sha256', hmacSecret).update(rawBody).digest('hex')}`;
    }

    const osBase = (process.env.BW_OS_INTERNAL_URL || SITE.osUrl).replace(/\/$/, '');
    const endpoints = [
      `${osBase}/api/v1/live-chat/messages`,
      `${osBase}/api/v1/intake/leads`,
    ].filter((u, idx, arr) => Boolean(u) && arr.indexOf(u) === idx);

    let syncedToOs = false;
    let advisorReply: string | undefined;

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers,
          body: rawBody,
          signal: AbortSignal.timeout(2200),
        });
        if (res.ok) {
          syncedToOs = true;
          const data = (await res.json().catch(() => null)) as { reply?: string } | null;
          if (data?.reply) advisorReply = cleanStr(data.reply, 600);
          break;
        }
      } catch {
        // Fallback gracefully to next OS endpoint or local confirmation
      }
    }

    const referenceCode = `BW-CHAT-${sessionId.slice(-6).toUpperCase()}`;

    return NextResponse.json(
      {
        ok: true,
        sessionId,
        referenceCode,
        syncedToOs,
        osEndpoint: `${SITE.osUrl.replace(/\/$/, '')}/live-chat`,
        reply: advisorReply || null,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ error: 'Unable to send live chat message.' }, { status: 400 });
  }
}
