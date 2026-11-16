import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Section, Facts, FaqList, CtaBand, LinkGrid, JsonLd } from '@/components/ui';
import Calculator from '@/components/calc/Calculator';
import RateTable from '@/components/RateTable';
import { PRODUCTS, productBy } from '@/data/products';
import { COUNTRIES } from '@/data/countries';
import { BANKS } from '@/data/banks';
import { toolBy } from '@/data/tools';
import { SITE } from '@/data/site';

export const dynamicParams = false;
const NR = 'non-resident-';
const countryOf = (slug: string) => (slug.startsWith(NR) && slug !== 'non-resident-dubai' ? COUNTRIES.find((c) => c.slug === slug.slice(NR.length)) : undefined);

export function generateStaticParams() {
  return [...PRODUCTS.map((p) => ({ slug: p.slug })), ...COUNTRIES.map((c) => ({ slug: NR + c.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = countryOf(slug);
  if (c)
    return {
      title: `Dubai Mortgage for ${c.demonym} Non-Residents — Documents & Credit Bureau Guide`,
      description: `UAE mortgage documentation guide for ${c.demonym} buyers residing in ${c.name}: ${c.currency} income records, ${c.bureau} credit report and freehold closing steps.`,
      alternates: { canonical: `/mortgages/${slug}` },
    };
  const p = productBy(slug);
  return p ? { title: p.title, description: p.capsule.slice(0, 158), alternates: { canonical: `/mortgages/${slug}`, languages: { 'ar-AE': `/ar/mortgages/${slug}` } } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = countryOf(slug);
  if (c) return <CountryPage slug={slug} c={c} />;
  const p = productBy(slug);
  if (!p) notFound();
  const tool = toolBy(p.calc)!;
  const related = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 6);
  return (
    <>
      <PageHero crumbs={[{ name: 'Mortgages', href: '/mortgages' }, { name: p.name, href: `/mortgages/${p.slug}` }]} eyebrow={p.badge} title={p.title} capsule={p.capsule}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            {p.cta}
          </Link>
          <Link href={`/${tool.base}/${tool.slug}`} className="btn btn-ghost">
            {tool.name}
          </Link>
        </div>
      </PageHero>
      <Section title={`${p.name}: statutory framework`}>
        <Facts facts={p.facts} />
      </Section>
      <Section tone="mist" title="How it works">
        <div className="grid gap-6 lg:grid-cols-3">
          {p.sections.map((s) => (
            <div key={s.h} className="card">
              <h3 className="h3">{s.h}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate">{s.p}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title={tool.name} intro={tool.capsule}>
        <div className="rounded-card border border-line p-5 sm:p-8">
          <Calculator slug={p.calc} />
        </div>
      </Section>
      {slug === 'non-resident-dubai' && (
        <Section tone="mist" title="Non-resident documentation guides by country" intro="Typical income records, tax filings and credit bureaus across 25 jurisdictions.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COUNTRIES.map((x) => (
              <Link key={x.slug} href={`/mortgages/${NR}${x.slug}`} className="card !p-4">
                <span className="font-semibold text-navy">{x.name}</span>
                <span className="mt-1 block text-sm text-slate">
                  {x.currency} · {x.bureau}
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}
      {slug === 'islamic-home-finance' && (
        <Section tone="mist" title="Islamic home finance lenders in the UAE">
          <RateTable banks={BANKS.filter((b) => b.type === 'Islamic')} />
        </Section>
      )}
      <Section title="Frequently asked">
        <div className="max-w-3xl">
          <FaqList faqs={p.faqs} />
        </div>
      </Section>
      <Section tone="mist" title="Related mortgages">
        <LinkGrid links={related.map((r) => ({ title: r.name, body: r.card, href: `/mortgages/${r.slug}`, tag: r.badge }))} />
      </Section>
      <CtaBand />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FinancialProduct',
          name: p.name,
          description: p.capsule,
          provider: { '@id': `${SITE.url}/#org` },
          feesAndCommissionsSpecification: 'Confirm broker and bank fees in writing; lender terms apply.',
          url: `${SITE.url}/mortgages/${p.slug}`,
        }}
      />
    </>
  );
}

function CountryPage({ slug, c }: { slug: string; c: (typeof COUNTRIES)[number] }) {
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Mortgages', href: '/mortgages' },
          { name: 'Non-resident', href: '/mortgages/non-resident-dubai' },
          { name: c.name, href: `/mortgages/${slug}` },
        ]}
        eyebrow={`Non-resident · ${c.name}`}
        title={`Dubai mortgages for ${c.demonym} non-residents: documents, income & credit bureau`}
        capsule={`${c.demonym} applicants residing in ${c.name} (${c.currency}) can apply for UAE freehold property finance with participating UAE banks. Lenders typically review ${c.salaried.toLowerCase()}, home-country credit records (${c.bureau}) and 6 months of bank statements, applying bank-specific foreign-currency buffers and non-resident LTV limits.`}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            Discuss {c.demonym} eligibility
          </Link>
          <Link href="/calculators/non-resident-rental-coverage" className="btn btn-ghost">
            Rental coverage calculator
          </Link>
        </div>
      </PageHero>

      <Section title={`Documentation checklist for ${c.demonym} applicants`}>
        <Facts
          facts={[
            ['Income currency', c.currency],
            ['Home credit bureau', c.bureau],
            ['Salaried income proof', c.salaried],
            ['Self-employed proof', c.selfEmp],
            ['CBUAE DBR ceiling', '50% max across global obligations'],
            ['Maximum LTV', 'Set by individual lender policy'],
          ]}
        />
        <p className="lead mt-8 max-w-3xl">{c.note}</p>
      </Section>

      <Section tone="mist" title="UAE mortgage lender directory">
        <RateTable limit={10} />
      </Section>

      <Section title="Model property cash flow & closing costs">
        <div className="rounded-card border border-line p-5 sm:p-8">
          <Calculator slug="non-resident-rental-coverage" />
        </div>
      </Section>

      <Section tone="mist" title="Frequently asked">
        <div className="max-w-3xl">
          <FaqList
            faqs={[
              {
                q: `Can ${c.demonym} citizens own freehold property in Dubai and the UAE?`,
                a: 'Yes. Foreign nationals may hold full freehold title in designated freehold zones across Dubai, Abu Dhabi and the Northern Emirates.',
              },
              {
                q: 'Can a non-resident complete a purchase via Power of Attorney?',
                a: 'Many buyers appoint a representative under a duly notarised and attested Power of Attorney that explicitly includes borrowing and first-degree mortgage registration powers, subject to lender approval of PoA wording.',
              },
              {
                q: `How do UAE banks assess ${c.currency} income?`,
                a: 'Lenders convert verified overseas income into AED and typically apply a currency buffer (haircut) alongside minimum monthly income thresholds and country-risk rules. Confirm exact criteria in writing with your chosen bank.',
              },
            ]}
          />
        </div>
      </Section>

      <Section title="Other non-resident country guides">
        <LinkGrid
          cols={4}
          links={COUNTRIES.filter((x) => x.slug !== c.slug)
            .slice(0, 8)
            .map((x) => ({
              title: x.name,
              body: `${x.currency} · ${x.bureau}`,
              href: `/mortgages/${NR}${x.slug}`,
            }))}
        />
      </Section>
      <CtaBand title={`Planning a UAE purchase from ${c.name}?`} />
    </>
  );
}
