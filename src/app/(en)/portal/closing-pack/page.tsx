import type { Metadata } from 'next';
import AppShell, { PORTAL_NAV } from '@/components/AppShell';
import Calculator from '@/components/calc/Calculator';

export const metadata: Metadata = { title: 'Transfer-Day Closing Checklist', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <AppShell title="Transaction guide" nav={PORTAL_NAV} active="/portal/closing-pack">
      <h1 className="mb-2 font-display text-2xl font-bold">Transfer-day cheque &amp; originals checklist</h1>
      <p className="mb-6 text-slate">
        Estimate standard manager’s cheque splits for a Dubai trustee transfer and review the original documents typically required on completion day.
      </p>
      <div className="card">
        <Calculator slug="transfer-day-cheque-calculator" />
      </div>
      <div className="card mt-6">
        <h2 className="font-display text-lg font-semibold">Originals typically requested at the trustee desk</h2>
        <ul className="mt-3 grid gap-2 text-sm text-ink sm:grid-cols-2">
          {[
            'Original passports & Emirates IDs for all buyers and sellers',
            'Executed Contract F (MOU) and signed annexures',
            'Valid Master Developer No-Objection Certificate (NOC)',
            'Executed Bank Final Offer Letter & mortgage registration pack',
            'Seller’s bank liability letter (where property is mortgaged)',
            'Original notarised & attested Power of Attorney (where applicable)',
          ].map((x) => (
            <li key={x}>• {x}</li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
