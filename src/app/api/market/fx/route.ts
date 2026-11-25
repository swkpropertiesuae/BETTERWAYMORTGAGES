import { NextResponse } from 'next/server';
import { DEFAULT_FX_RATES, type CurrencyCode } from '@/data/i18n';

export const revalidate = 21600; // Refresh live FX snapshot every 6 hours

const SUPPORTED: CurrencyCode[] = ['AED', 'USD', 'GBP', 'EUR', 'SAR', 'RUB', 'CNY', 'INR'];

export async function GET() {
  const fallback = {
    base: 'AED' as const,
    rates: DEFAULT_FX_RATES,
    source: 'CBUAE AED/USD peg (3.6725) & indicative reference snapshot',
    asOf: new Date().toISOString().slice(0, 10),
    live: false,
    note: 'AED is pegged to USD at 3.6725 by the Central Bank of the UAE. Converted figures are indicative; statutory UAE mortgage contracts and DLD fees are settled in AED.',
  };

  try {
    const res = await fetch('https://open.er-api.com/v6/latest/AED', {
      next: { revalidate: 21600 },
      signal: AbortSignal.timeout(4500),
    });
    if (!res.ok) return NextResponse.json(fallback);
    const json = (await res.json()) as {
      result?: string;
      time_last_update_utc?: string;
      rates?: Record<string, number>;
    };
    if (json.result !== 'success' || !json.rates) {
      return NextResponse.json(fallback);
    }

    const rates = { ...DEFAULT_FX_RATES };
    for (const code of SUPPORTED) {
      const val = json.rates[code];
      if (typeof val === 'number' && Number.isFinite(val) && val > 0) {
        rates[code] = val;
      }
    }
    rates.AED = 1;

    return NextResponse.json({
      base: 'AED' as const,
      rates,
      source: 'Live FX market feed (open.er-api.com)',
      asOf: json.time_last_update_utc ? new Date(json.time_last_update_utc).toISOString().slice(0, 10) : fallback.asOf,
      live: true,
      note: fallback.note,
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
