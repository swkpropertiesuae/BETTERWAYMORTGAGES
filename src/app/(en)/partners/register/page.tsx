import type { Metadata } from 'next';
import AppShell, { HUB_NAV } from '@/components/AppShell';
import { LeadForm } from '@/components/client';

export const metadata: Metadata = { title: 'Partner Programme Enquiry', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <AppShell title="Partner Hub" nav={HUB_NAV} active="/partners/register">
      <h1 className="mb-2 font-display text-2xl font-bold">Enquire about our real estate partner programme</h1>
      <p className="mb-6 max-w-2xl text-slate">
        Share your brokerage name, RERA registration details and contact information. Our team will respond with onboarding requirements and written introducer terms.
      </p>
      <div className="max-w-xl">
        <LeadForm topic="Partner Hub enquiry (include agency & RERA BRN)" />
      </div>
    </AppShell>
  );
}
