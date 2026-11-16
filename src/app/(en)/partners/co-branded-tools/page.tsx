import type { Metadata } from 'next';
import AppShell, { HUB_NAV } from '@/components/AppShell';
import { CoBrandLink } from '@/components/AppClient';

export const metadata: Metadata = { title: 'Shareable Buyer Calculator Links', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <AppShell title="Partner Hub" nav={HUB_NAV} active="/partners/co-branded-tools">
      <h1 className="mb-2 font-display text-2xl font-bold">Shareable buyer calculator link</h1>
      <p className="mb-6 max-w-2xl text-slate">
        Generate a direct link to the statutory UAE mortgage and closing-cost calculator for your buyers. Referral attribution applies only where a written introducer agreement has been executed.
      </p>
      <CoBrandLink />
    </AppShell>
  );
}
