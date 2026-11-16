import type { Metadata } from 'next';
import Link from 'next/link';
import AppShell, { PORTAL_NAV } from '@/components/AppShell';

export const metadata: Metadata = { title: 'UAE Mortgage Transaction Workflow', robots: { index: false, follow: false } };

const STAGES = [
  ['Stage 1', 'Budget & DBR review', 'Verify gross monthly income, existing loan repayments and credit card limits against the statutory 50% CBUAE Debt Burden Ratio cap.'],
  ['Stage 2', 'Bank pre-approval', 'Compile identity, income and AECB credit consent documents for formal underwriting before committing to a property purchase contract.'],
  ['Stage 3', 'Form F & property valuation', 'Include written valuation and Final Offer Letter protection clauses in Contract F (MOU), then instruct the bank’s independent valuation panel.'],
  ['Stage 4', 'Final Offer Letter & NOC', 'Review the binding fixed rate, EIBOR revert margin, floor rate and fees in the bank’s Final Offer Letter, and obtain the developer NOC (and seller liability letter if mortgaged).'],
  ['Stage 5', 'Trustee transfer & Title Deed', 'Coordinate manager’s cheques for the seller, seller’s bank, Dubai Land Department and trustee office to register the transfer and first-degree mortgage.'],
] as const;

export default function Page() {
  return (
    <AppShell title="Transaction guide" nav={PORTAL_NAV} active="/portal/dashboard">
      <div className="card">
        <h1 className="font-display text-2xl font-bold">Standard UAE mortgage progression stages</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate">
          Reference roadmap from initial affordability planning through Dubai Land Department trustee completion. Timelines depend on document readiness, lender underwriting, developer NOC procedures and seller mortgage clearance.
        </p>
        <ol className="mt-6 space-y-4">
          {STAGES.map(([step, title, desc]) => (
            <li key={step} className="rounded-xl border border-line bg-mist/50 p-4">
              <span className="eyebrow">{step}</span>
              <h2 className="mt-1 font-display text-lg font-semibold text-navy">{title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{desc}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/portal/vault" className="btn btn-ghost">
            View document checklist
          </Link>
          <Link href="/contact" className="btn btn-primary">
            Speak with an advisor
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
