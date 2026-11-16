import type { Metadata } from 'next';
import AppShell, { PORTAL_NAV } from '@/components/AppShell';
import { VaultMatrix } from '@/components/AppClient';

export const metadata: Metadata = { title: 'Standard UAE Mortgage Document Checklist', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <AppShell title="Transaction guide" nav={PORTAL_NAV} active="/portal/vault">
      <h1 className="mb-2 font-display text-2xl font-bold">Standard UAE underwriting document checklist</h1>
      <p className="mb-6 text-slate">
        Select your applicant profile below to view the core documents UAE banks request during pre-approval. Do not upload personal documents through this website.
      </p>
      <VaultMatrix />
    </AppShell>
  );
}
