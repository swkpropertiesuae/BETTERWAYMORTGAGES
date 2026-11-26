import { NextResponse } from 'next/server';
import { fetchLiveCms } from '@/lib/cms-live';

export const revalidate = 60;

export async function GET() {
  const cms = await fetchLiveCms();
  return NextResponse.json(
    {
      connected: Boolean(cms),
      cms,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    },
  );
}
