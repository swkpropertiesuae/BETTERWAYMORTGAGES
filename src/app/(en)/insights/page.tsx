import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileDown, Flame, Sparkles } from 'lucide-react';
import { Cta, Crumbs, JsonLd, SectionTag } from '@/components/ui';
import { HotOffersTrigger } from '@/components/HotOffersPopup';
import { PDF_RESOURCES, SEO_TOPICS } from '@/data/seo-topics';
import { speakablePageSchema, pdfCatalogSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Dubai & UAE Mortgage Insights, Trending 2026 Rules & Guides',
  description:
    '36 in-depth Dubai & UAE mortgage intelligence guides covering 2026 EIBOR rates, CBUAE 50% DBR caps, 4% DLD fees, Islamic finance, non-resident buyers, Golden Visa AED 2M rules, and top freehold communities.',
  keywords: [
    'Dubai mortgage guide 2026',
    'UAE home loan rules',
    'CBUAE LTV DBR guide',
    'Dubai DLD 4% fees',
    'non-resident mortgage Dubai',
    'Islamic home finance UAE',
  ],
  alternates: { canonical: '/insights' },
};

const CATEGORIES = [
  'Rates & CBUAE Rules',
  'Dubai Communities',
  'Non-Resident & Golden Visa',
  'Refinance, Off-Plan & Closing',
] as const;

export default function InsightsHubPage() {
  return (
    <div className="holo-canvas pt-[112px] max-sm:pt-[94px]">
      <section className="holo-section">
        <div className="mx-auto max-w-[1220px] space-y-6">
          <Crumbs items={[{ name: 'Insights & Guides', href: '/insights' }]} />
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <SectionTag>UAE Mortgage Intelligence · 36 Deep Guides</SectionTag>
              <h1 className="holo-display-h2">
                Dubai &amp; UAE mortgage insights built for clear decisions.
              </h1>
              <p className="holo-lead" data-aeo-answer="true">
                Explore {SEO_TOPICS.length} CBUAE-grounded guides covering live EIBOR revert rules, 80% / 85% LTV caps,
                4% Dubai Land Department fees, Islamic Ijara vs Murabaha structures, overseas buyer rules, and community
                financing across Dubai, Abu Dhabi, and Ras Al Khaimah.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <HotOffersTrigger label="Open Hot Offers Desk" variant="dark" />
              <Cta href="/downloads" tone="ghost" size="sm">
                Download Free PDF Guides
              </Cta>
            </div>
          </div>
        </div>
      </section>

      {CATEGORIES.map((cat) => {
        const items = SEO_TOPICS.filter((t) => t.category === cat);
        return (
          <section key={cat} className="holo-section">
            <div className="mx-auto max-w-[1220px]">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                <h2 className="holo-display-h3">{cat}</h2>
                <span className="num rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-bold text-[#0e6954]">
                  {items.length} Guides
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/insights/${topic.slug}`}
                    className="flex flex-col justify-between rounded-[20px] border border-[#e5e7eb] bg-[#f8f9fa] p-6 transition-colors hover:border-[#179373] hover:bg-white"
                  >
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#0e6954] border border-[#e5e7eb]">
                        <Sparkles size={11} /> {topic.category}
                      </span>
                      <h3 className="mt-3 font-display text-lg font-bold leading-snug text-[#070e1a]">
                        {topic.h1}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#464c5c]">{topic.description}</p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0e6954]">
                      Read full guide <ArrowRight size={13} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Printable PDF Dossier Strip */}
      <section className="holo-section holo-section--mint">
        <div className="mx-auto max-w-[1220px]">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <SectionTag>Executive PDF Library</SectionTag>
              <h2 className="holo-display-h3">Download printable UAE mortgage dossiers</h2>
            </div>
            <Link href="/hot-offers" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0e6954] hover:underline">
              <Flame size={15} /> View Hot UAE Mortgage Offers →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {PDF_RESOURCES.map((pdf) => (
              <a
                key={pdf.id}
                href={pdf.file}
                download
                className="flex flex-col justify-between rounded-[20px] border border-[#d5e7e0] bg-white p-6 transition-colors hover:border-[#179373]"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef7f4] px-3 py-1 text-[11px] font-bold text-[#0e6954]">
                    <FileDown size={12} /> PDF · {pdf.pages} {pdf.pages === 1 ? 'Page' : 'Pages'}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-[#070e1a]">{pdf.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#464c5c]">{pdf.subtitle}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#070e1a]">
                  Download PDF <ArrowRight size={13} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={speakablePageSchema(
          '/insights',
          'Dubai & UAE Mortgage Insights & Guides | Betterway Mortgages',
          '36 CBUAE-compliant UAE & Dubai mortgage intelligence guides, calculators, and downloadable PDF checklists.',
        )}
      />
      <JsonLd data={pdfCatalogSchema()} />
    </div>
  );
}
