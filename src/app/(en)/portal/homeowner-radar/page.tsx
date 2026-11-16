import type { Metadata } from 'next';
import Link from 'next/link';
import AppShell, { PORTAL_NAV } from '@/components/AppShell';
import Calculator from '@/components/calc/Calculator';

export const metadata: Metadata = { title: 'Refinance & Revert-Date Review Guide', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <AppShell title="Transaction guide" nav={PORTAL_NAV} active="/portal/homeowner-radar">
      <h1 className="mb-2 font-display text-2xl font-bold">Fixed-period expiry &amp; refinance review</h1>
      <p className="mb-6 max-w-2xl text-slate">
        Check your Final Offer Letter for the exact date your initial fixed period ends, compare published CBUAE EIBOR fixings against your contractual revert margin, and model switching costs below.
      </p>
      <div className="card">
        <h2 className="mb-5 font-display text-lg font-semibold">Compare your current loan against a proposed refinance quote</h2>
        <Calculator slug="buyout-refinance-savings" />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link href="/rates/eibor-live-tracker" className="card">
          <p className="font-semibold text-navy">Published CBUAE EIBOR tracker</p>
          <p className="mt-1 text-sm text-slate">Check daily 1M, 3M and 6M EIBOR fixings from the Central Bank of the UAE.</p>
        </Link>
        <Link href="/advisory/difc-wills-and-estate-planning" className="card">
          <p className="font-semibold text-navy">DIFC wills &amp; estate coordination</p>
          <p className="mt-1 text-sm text-slate">Understand guardianship and succession planning considerations for UAE property owners.</p>
        </Link>
      </div>
    </AppShell>
  );
}
