'use client';
import { useState } from 'react';
import { Check, Copy, FileText } from 'lucide-react';

const CHECKLIST: Record<string, [string, string, string][]> = {
  'Salaried resident': [
    ['Passport, UAE residence visa & Emirates ID', 'Valid identity documents', 'Names and passport numbers must match across all records'],
    ['Employer salary certificate', 'Addressed to the chosen bank (dated within 30 days)', 'Confirms designation, joining date and monthly salary breakdown'],
    ['6 months salary payslips', 'Consecutive recent months', 'Supports variable allowances or bonus income where applicable'],
    ['6 months personal bank statements', 'Official stamped or digital bank PDF', 'Shows salary credits and existing loan or card repayments'],
    ['Al Etihad Credit Bureau (AECB) consent', 'Authorised during formal bank application', 'Allows the lender to verify active credit facilities for DBR'],
  ],
  'Self-employed resident': [
    ['Passport, UAE residence visa & Emirates ID', 'All company signatories / applicants', 'Valid identity documents for underwriting'],
    ['Trade licence, MOA & share certificates', 'Current commercial registration pack', 'Confirms ownership percentage and operating history'],
    ['Audited financial statements', 'Typically 2 years (per lender policy)', 'Prepared by a UAE-accredited audit firm'],
    ['6m personal + 12m corporate bank statements', 'Official bank PDFs', 'Demonstrates business cash flow and account conduct'],
    ['Personal & corporate AECB consent', 'Authorised during formal bank application', 'Verifies personal and company credit facilities'],
  ],
  'Non-resident': [
    ['Valid passport', 'Clear colour copy', 'Minimum 6 months remaining validity'],
    ['Employment contract / payslips or tax returns', 'Home-country income evidence', 'Attestation or certified translation may be required'],
    ['6 months personal bank statements', 'Showing regular income credits and IBAN', 'Demonstrates income continuity and down-payment funds'],
    ['Home-country credit bureau report', 'Official report from local bureau', 'Used alongside international debt declarations'],
  ],
};

export function VaultMatrix() {
  const [p, setP] = useState('Salaried resident');
  const rows = CHECKLIST[p];
  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {Object.keys(CHECKLIST).map((k) => (
          <button key={k} type="button" className={`chip ${p === k ? 'chip-on' : ''}`} onClick={() => setP(k)}>
            {k}
          </button>
        ))}
      </div>
      <p className="mb-3 text-sm text-slate">
        Standard UAE underwriting checklist ({rows.length} core items). Do not upload sensitive documents here; request the approved intake channel from your advisor.
      </p>
      <div className="divide-y divide-line rounded-card border border-line bg-white">
        {rows.map(([doc, spec, rule]) => (
          <div key={doc} className="grid gap-2 p-4 sm:grid-cols-[1.2fr_1fr_1.4fr_auto] sm:items-center">
            <p className="font-medium text-navy">{doc}</p>
            <p className="text-sm text-slate">{spec}</p>
            <p className="text-sm text-slate">{rule}</p>
            <span className="tag">
              <FileText size={13} className="me-1" /> Standard item
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CoBrandLink() {
  const [name, setName] = useState('');
  const [brn, setBrn] = useState('');
  const [copied, setCopied] = useState(false);
  const slug = (name.trim() || 'advisor').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const brnClean = brn.replace(/\D/g, '');
  const url = `https://betterwaymortgages.com/calculators/mortgage-calculator?ref=${encodeURIComponent(slug)}${brnClean ? `-brn${encodeURIComponent(brnClean)}` : ''}`;
  const field = 'mt-1.5 w-full rounded-btn border border-line bg-white px-3.5 py-3 text-[15px] outline-none focus:border-teal';
  return (
    <div className="card grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-navy">
          Broker / agency reference
          <input className={field} placeholder="e.g. Marina Advisory Desk" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="text-sm font-medium text-navy">
          RERA BRN (optional)
          <input className={field} inputMode="numeric" placeholder="e.g. 12345" value={brn} onChange={(e) => setBrn(e.target.value.replace(/\D/g, ''))} />
        </label>
      </div>
      <div className="flex items-center gap-2 rounded-btn bg-mist p-3">
        <code className="min-w-0 flex-1 truncate font-sans text-sm text-navy">{url}</code>
        <button
          type="button"
          className="btn btn-dark !py-2"
          onClick={() => {
            navigator.clipboard?.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />} Copy
        </button>
      </div>
      <p className="text-xs text-slate">
        Shareable calculator link generator. Referral attribution and commercial terms apply only where a written introducer agreement is in place.
      </p>
    </div>
  );
}
