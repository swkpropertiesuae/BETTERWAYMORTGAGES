import type { Metadata } from 'next';
import Link from 'next/link';
import AppShell, { HUB_NAV } from '@/components/AppShell';

export const metadata: Metadata = { title: 'Agent Referral Workflow', robots: { index: false, follow: false } };

const WORKFLOW = [
  ['Step 1', 'Written introducer agreement', 'Execute a formal introducer agreement confirming RERA registration details, compliance obligations and commercial terms prior to referring clients.'],
  ['Step 2', 'Documented buyer consent', 'Obtain explicit buyer permission before sharing contact details or transaction parameters with an advisor.'],
  ['Step 3', 'Pre-offer affordability & DBR check', 'Confirm the buyer’s statutory 50% DBR capacity, deposit source and LTV limit before drafting Contract F (MOU).'],
  ['Step 4', 'Valuation, FOL & NOC coordination', 'Align Contract F special-condition timelines with bank valuation inspection, Final Offer Letter issuance and developer NOC steps.'],
] as const;

export default function Page() {
  return (
    <AppShell title="Partner Hub" nav={HUB_NAV} active="/partners/dashboard">
      <div className="card">
        <h1 className="font-display text-2xl font-bold">Real estate agent referral workflow</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate">
          How RERA-licensed brokers coordinate buyer mortgage readiness from initial viewing through DLD trustee transfer. Live partner pipeline tracking is available only to onboarded introducers under a written agreement.
        </p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          {WORKFLOW.map(([s, h, p]) => (
            <li key={s} className="rounded-xl border border-line bg-mist/50 p-4">
              <span className="eyebrow">{s}</span>
              <h2 className="mt-1 font-display text-base font-semibold text-navy">{h}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{p}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <Link href="/partners/register" className="btn btn-primary">
            Enquire about introducer onboarding
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
