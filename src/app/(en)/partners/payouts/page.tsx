import type { Metadata } from 'next';
import Link from 'next/link';
import AppShell, { HUB_NAV } from '@/components/AppShell';

export const metadata: Metadata = { title: 'Partner Commercial & Settlement Terms', robots: { index: false, follow: false } };

const TERMS = [
  ['Written introducer agreement', 'Any referral fee share, eligibility criteria and settlement schedule are governed strictly by a signed written agreement between Betterway and the licensed brokerage or introducer.'],
  ['Client disclosure & consent', 'Buyers must consent to the introduction and may request written disclosure of any referral remuneration in accordance with UAE consumer protection principles.'],
  ['Disbursement & invoice verification', 'Referral settlements apply only to completed loans after bank disbursement, lender commission receipt and submission of a compliant UAE corporate tax invoice.'],
] as const;

export default function Page() {
  return (
    <AppShell title="Partner Hub" nav={HUB_NAV} active="/partners/payouts">
      <div className="card">
        <h1 className="font-display text-2xl font-bold">Commercial &amp; settlement principles</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate">
          We do not publish generic commission percentages or sample payout tables online. Commercial schedules are agreed in writing with verified corporate partners.
        </p>
        <div className="mt-6 space-y-4">
          {TERMS.map(([h, p]) => (
            <div key={h} className="rounded-xl border border-line bg-mist/50 p-4">
              <h2 className="font-display text-base font-semibold text-navy">{h}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{p}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/partners/register" className="btn btn-primary">
            Request written partner terms
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
