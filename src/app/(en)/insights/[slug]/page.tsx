import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, FileDown, ShieldCheck } from 'lucide-react';
import { Cta, Crumbs, JsonLd, SectionTag } from '@/components/ui';
import { HotOffersTrigger } from '@/components/HotOffersPopup';
import { PDF_RESOURCES, SEO_TOPICS } from '@/data/seo-topics';
import { SITE } from '@/data/site';
import { speakablePageSchema } from '@/lib/seo-schema';

export function generateStaticParams() {
  return SEO_TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = SEO_TOPICS.find((t) => t.slug === slug);
  if (!topic) return {};
  return {
    title: topic.h1,
    description: topic.description,
    keywords: topic.keywords,
    alternates: { canonical: `/insights/${topic.slug}` },
    openGraph: {
      type: 'article',
      title: topic.title,
      description: topic.description,
      url: `${SITE.url}/insights/${topic.slug}`,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: topic.h1 }],
    },
  };
}

export default async function InsightTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = SEO_TOPICS.find((t) => t.slug === slug);
  if (!topic) notFound();

  const related = SEO_TOPICS.filter((t) => t.slug !== topic.slug && t.category === topic.category).slice(0, 3);
  const featuredPdf = PDF_RESOURCES[0];

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: topic.h1,
    description: topic.description,
    keywords: topic.keywords.join(', '),
    datePublished: SITE.asOfISO,
    dateModified: SITE.asOfISO,
    author: { '@type': 'Organization', name: SITE.legalName, url: SITE.url },
    publisher: { '@id': `${SITE.url}/#org` },
    mainEntityOfPage: `${SITE.url}/insights/${topic.slug}`,
    image: `${SITE.url}/og.png`,
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: topic.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: topic.h1,
    description: topic.description,
    step: topic.steps.map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: s.h,
      text: s.p,
    })),
  };

  return (
    <div className="holo-canvas holo-canvas--page">
      <article className="holo-section">
        <div className="mx-auto max-w-[960px] space-y-6">
          <Crumbs
            items={[
              { name: 'Insights', href: '/insights' },
              { name: topic.h1, href: `/insights/${topic.slug}` },
            ]}
          />
          <div className="flex flex-wrap items-center gap-2">
            <SectionTag>{topic.category}</SectionTag>
            <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-semibold text-[#0e6954]">
              CBUAE &amp; DLD Verified Reference
            </span>
          </div>

          <h1 className="holo-display-h2">{topic.h1}</h1>

          {/* Direct AEO / GEO / Speakable Answer Capsule */}
          <div
            data-aeo-answer="true"
            className="rounded-[20px] border-s-4 border-[#179373] bg-[#eef7f4] p-6 text-[16px] leading-relaxed text-[#070e1a]"
          >
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#0e6954]">
              Quick Answer · Betterway UAE Advisory
            </p>
            <p>{topic.answerCapsule}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Cta href={topic.primaryCalc}>{topic.primaryCalcLabel}</Cta>
            <Cta href="/get-started" tone="ghost">
              Start 60s Pre-Approval
            </Cta>
            <HotOffersTrigger label="Hot UAE Offers" variant="dark" />
          </div>

          {/* Key Statutory Facts */}
          <div className="rounded-[22px] border border-[#e5e7eb] bg-[#f8f9fa] p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-[#070e1a]">Key UAE Rules &amp; Planning Points</h2>
            <ul className="mt-4 space-y-3">
              {topic.keyFacts.map((fact) => (
                <li key={fact} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#1f2429]">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#179373]" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Structured Step-by-Step HowTo */}
          <div className="space-y-4 pt-2">
            <h2 className="font-display text-2xl font-bold text-[#070e1a]">Step-by-Step Borrower Action Plan</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {topic.steps.map((step) => (
                <div key={step.h} className="rounded-[18px] border border-[#e5e7eb] bg-white p-5">
                  <h3 className="font-display text-base font-bold text-[#070e1a]">{step.h}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#464c5c]">{step.p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-4 pt-2">
            <h2 className="font-display text-2xl font-bold text-[#070e1a]">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {topic.faqs.map((faq) => (
                <div key={faq.q} className="rounded-[18px] border border-[#e5e7eb] bg-[#f8f9fa] p-5">
                  <h3 className="font-display text-base font-bold text-[#070e1a]">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#464c5c]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Free Downloadable PDF Banner + Partner Property Bridge */}
          <div className="grid gap-4 pt-2 md:grid-cols-2">
            <a
              href={featuredPdf.file}
              download
              className="flex flex-col justify-between rounded-[20px] border border-[#d5e7e0] bg-[#eef7f4] p-6 transition-colors hover:border-[#179373]"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#0e6954]">
                  <FileDown size={14} /> Free Printable PDF Dossier
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-[#070e1a]">{featuredPdf.title}</h3>
                <p className="mt-1 text-sm text-[#464c5c]">{featuredPdf.subtitle}</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#070e1a]">
                Download PDF now <ArrowRight size={13} />
              </span>
            </a>

            <div className="flex flex-col justify-between rounded-[20px] border border-[#e5e7eb] bg-[#070e1a] p-6 text-white">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#f1d57e]">
                  <ShieldCheck size={14} /> BetterClose · Dubai Closing Desk
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-white">
                  Align 24-bank pre-approval before signing Form F
                </h3>
                <p className="mt-1 text-sm text-white/75">
                  Review 60 UAE freehold communities alongside CBUAE 50% DBR structuring and 1-on-1 closing support.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold">
                <Link href="/areas" className="text-[#34dfac] hover:underline">
                  60 UAE Communities →
                </Link>
                <Link href="/concierge" className="text-[#f1d57e] hover:underline">
                  Open BetterClose →
                </Link>
              </div>
            </div>
          </div>

          {/* Related Guides Mesh */}
          {related.length > 0 && (
            <div className="border-t border-[#e5e7eb] pt-8">
              <h2 className="font-display text-xl font-bold text-[#070e1a]">Related UAE Mortgage Guides</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/insights/${rel.slug}`}
                    className="rounded-[16px] border border-[#e5e7eb] bg-white p-4 transition-colors hover:border-[#179373]"
                  >
                    <p className="font-display text-sm font-bold text-[#070e1a]">{rel.h1}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#0e6954]">
                      Read guide <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <JsonLd data={articleLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={howToLd} />
      <JsonLd data={speakablePageSchema(`/insights/${topic.slug}`, topic.title, topic.description)} />
    </div>
  );
}
