import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { Cta, Crumbs, JsonLd, SectionTag } from '@/components/ui';
import { HotOffersTrigger } from '@/components/HotOffersPopup';
import PdfLibraryBrowser from '@/components/PdfLibraryBrowser';
import LogoMarquee from '@/components/LogoMarquee';
import FlagshipCta from '@/components/ui/FlagshipCta';
import { BANKS } from '@/data/banks';
import { PDF_CATEGORIES, PDF_RESOURCES } from '@/data/seo-topics';
import { pdfCatalogSchema, speakablePageSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: '52 Free UAE Mortgage PDF Guides, DLD Checklists & Neglected Policy Playbooks',
  description:
    'Download 52 free executive PDF guides from Betterway Mortgages Dubai with zero email gate: CBUAE 5% credit card DBR trap, Form F valuation addenda, EIBOR floor audits, off-plan handover roadmaps, self-employed add-backs, Islamic finance, and AED 2M Golden Visa playbooks.',
  keywords: [
    'Dubai mortgage PDF guides',
    'UAE home loan checklists PDF',
    '52 free UAE mortgage PDFs',
    'Dubai DLD transfer day checklist PDF',
    'CBUAE 5% credit card DBR rule PDF',
    'Golden Visa AED 2M mortgage PDF',
  ],
  alternates: { canonical: '/downloads' },
};

export default function DownloadsPage() {
  return (
    <div className="holo-canvas holo-canvas--page">
      <section className="holo-section">
        <div className="mx-auto max-w-[1220px] space-y-8">
          <Crumbs items={[{ name: '52 Free PDF Guides', href: '/downloads' }]} />

          {/* Hero Banner Over Global Pipo Background */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <SectionTag>Executive PDF Library · {PDF_RESOURCES.length} Free Guides · Zero Email Gate</SectionTag>
              <h1 className="holo-display-h2">
                {PDF_RESOURCES.length} essential &amp; neglected UAE mortgage PDF guides.
              </h1>
              <p className="holo-lead" data-aeo-answer="true">
                Every critical policy rule banks rarely explain before you sign Form F—written cleanly by our Dubai
                mortgage specialists across {PDF_CATEGORIES.length} practical categories. Download any A4 print-ready
                PDF instantly with zero email wall.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <HotOffersTrigger label="Open BetterDesk Offers" variant="dark" />
              <Cta href="/get-started" size="sm">
                Start 60s Check
              </Cta>
            </div>
          </div>

          {/* Searchable + 8-Category Animated Filterable Library */}
          <PdfLibraryBrowser />

          {/* 24 Licensed UAE Banks Marquee */}
          <div className="border-y border-[#0a1424]/[0.08] py-7">
            <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#4f596b]">
              Written rules cross-checked across {BANKS.length} licensed UAE conventional &amp; Islamic banks
            </p>
            <LogoMarquee
              label="24 licensed UAE banks compared by Betterway Mortgages"
              items={BANKS.map((b) => ({ id: b.key, label: b.name, logo: b.logo, href: `/rates/${b.slug}` }))}
              speed={64}
            />
          </div>

          {/* Need Unit-Specific AED Calculation Callout */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-[#cce5dc] bg-white/90 p-6 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <ShieldCheck size={22} className="mt-0.5 shrink-0 text-[#0e6954]" />
              <div>
                <p className="font-display text-base font-bold text-[#080b0f]">
                  Want an exact AED cash-to-close sheet for your specific unit?
                </p>
                <p className="text-sm text-[#4f596b]">
                  Run our free 60-second Pre-Approval Readiness Wizard or explore 36 deep UAE mortgage insight briefs.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Cta href="/get-started" size="sm">
                Start 60s Check
              </Cta>
              <Link href="/insights" className="homy-btn homy-btn--outline bw-btn--sm">
                Browse 36 Insights
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 pb-8 sm:px-6">
        <FlagshipCta />
      </div>

      <JsonLd data={pdfCatalogSchema()} />
      <JsonLd
        data={speakablePageSchema(
          '/downloads',
          '52 Free UAE Mortgage PDF Guides & DLD Checklists | Betterway Mortgages',
          'Download 52 free CBUAE-compliant UAE mortgage buyer guides, Form F checklists, credit card DBR traps, EIBOR floor audits, and Golden Visa playbooks.',
        )}
      />
    </div>
  );
}
