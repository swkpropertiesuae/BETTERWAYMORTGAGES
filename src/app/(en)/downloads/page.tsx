import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileDown, FileText, ShieldCheck } from 'lucide-react';
import { Cta, Crumbs, JsonLd, SectionTag } from '@/components/ui';
import { HotOffersTrigger } from '@/components/HotOffersPopup';
import { PDF_RESOURCES } from '@/data/seo-topics';
import { pdfCatalogSchema, speakablePageSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Free UAE Mortgage PDF Guides, DLD Checklists & Golden Visa Playbooks',
  description:
    'Download free executive PDF guides from Betterway Mortgages Dubai: 2026 UAE Mortgage Buyer Guide, Form F & DLD Transfer Day Checklist, and Non-Resident & AED 2M Golden Visa Playbook.',
  keywords: [
    'Dubai mortgage PDF guide',
    'UAE home loan checklist PDF',
    'Dubai DLD transfer day checklist',
    'Golden Visa AED 2M mortgage PDF',
  ],
  alternates: { canonical: '/downloads' },
};

export default function DownloadsPage() {
  return (
    <div className="holo-canvas pt-[112px] max-sm:pt-[94px]">
      <section className="holo-section">
        <div className="mx-auto max-w-[1160px] space-y-6">
          <Crumbs items={[{ name: 'PDF Guides & Downloads', href: '/downloads' }]} />
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <SectionTag>Executive PDF Library · Free Download</SectionTag>
              <h1 className="holo-display-h2">
                Printable UAE mortgage guides &amp; DLD checklists.
              </h1>
              <p className="holo-lead" data-aeo-answer="true">
                Zero email gate. Download Betterway’s CBUAE-aligned statutory reference PDFs covering 80% / 85% LTV
                caps, 50% DBR planning, 4% Dubai Land Department fees, Form F valuation addenda, and AED 2M Golden Visa
                rules.
              </p>
            </div>
            <HotOffersTrigger label="Open Hot Offers Desk" variant="dark" />
          </div>

          <div className="grid gap-6 pt-4 md:grid-cols-3">
            {PDF_RESOURCES.map((pdf) => (
              <div
                key={pdf.id}
                className="flex flex-col justify-between rounded-[24px] border border-[#e5e7eb] bg-[#f8f9fa] p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#070e1a] px-3 py-1 text-[11px] font-bold text-[#f1d57e]">
                      <FileText size={12} /> PDF Dossier
                    </span>
                    <span className="num text-xs font-semibold text-[#464c5c]">
                      {pdf.pages} {pdf.pages === 1 ? 'Page' : 'Pages'} · A4 Print Ready
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-bold leading-snug text-[#070e1a]">{pdf.title}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#464c5c]">{pdf.subtitle}</p>
                  <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#0e6954]">
                    <CheckCircle2 size={14} /> Built for: {pdf.audience}
                  </p>
                </div>

                <div className="mt-6 space-y-2.5 border-t border-[#e5e7eb] pt-5">
                  <a href={pdf.file} download className="homy-btn w-full justify-between">
                    <span className="inline-flex items-center gap-2">
                      <FileDown size={15} /> Download PDF
                    </span>
                    <span className="homy-btn__disc" aria-hidden="true">
                      <ArrowRight size={14} />
                    </span>
                  </a>
                  <a
                    href={pdf.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-xs font-semibold text-[#464c5c] hover:text-[#070e1a] hover:underline"
                  >
                    Open in browser tab ↗
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#d5e7e0] bg-[#eef7f4] p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#0e6954]" />
              <div>
                <p className="font-display text-base font-bold text-[#070e1a]">
                  Need an exact AED cash-to-close calculation for your specific unit?
                </p>
                <p className="text-sm text-[#464c5c]">
                  Run our free 60-second Pre-Approval Readiness Wizard or explore 36 UAE mortgage insight guides.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Cta href="/get-started" size="sm">
                Start 60s Check
              </Cta>
              <Link href="/insights" className="homy-btn homy-btn--outline bw-btn--sm">
                Browse 36 Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={pdfCatalogSchema()} />
      <JsonLd
        data={speakablePageSchema(
          '/downloads',
          'Free UAE Mortgage PDF Guides & DLD Checklists | Betterway Mortgages',
          'Download free CBUAE-compliant UAE mortgage buyer guides, DLD trustee transfer checklists, and Golden Visa playbooks.',
        )}
      />
    </div>
  );
}
