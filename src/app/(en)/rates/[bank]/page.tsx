import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Section, Facts, FaqList, CtaBand, LinkGrid } from '@/components/ui';
import Calculator from '@/components/calc/Calculator';
import { BANKS } from '@/data/banks';
import { COMPARISONS } from '@/data/compare';

export const dynamicParams = false;
export const generateStaticParams = () => BANKS.map((b) => ({ bank: b.slug }));
const find = (s: string) => BANKS.find((b) => b.slug === s);

export async function generateMetadata({ params }: { params: Promise<{ bank: string }> }): Promise<Metadata> {
  const b = find((await params).bank);
  return b
    ? {
        title: `${b.name} UAE Mortgage Guide — Structure, CBUAE Rules & Offer Checklist`,
        description: `${b.name} (${b.type}, ${b.hq}): UAE home finance structure, statutory CBUAE LTV & DBR limits, and written Final Offer Letter checklist.`,
        alternates: { canonical: `/rates/${b.slug}`, languages: { 'ar-AE': `/ar/rates/${b.slug}` } },
      }
    : {};
}

const OFFER_CHECKLIST = [
  ['Initial fixed rate & fixed period', 'Confirm the exact fixed rate or profit rate, how many years it lasts, and whether salary transfer is required to maintain it.'],
  ['Post-fixed EIBOR revert margin', 'Verify which EIBOR tenor applies (commonly 3-Month EIBOR), the fixed margin added on top, and the reset frequency.'],
  ['Minimum contractual floor rate', 'Check whether the Final Offer Letter specifies a minimum floor rate that prevents your rate from dropping below a threshold if EIBOR falls.'],
  ['Processing, valuation & insurance terms', 'Request a written breakdown of arrangement fees, RERA/bank valuation charges, and decreasing-term life/takaful assignment rules.'],
  ['Partial overpayment & settlement clauses', 'Confirm any annual penalty-free partial repayment allowance alongside the statutory CBUAE early-settlement cap (1% or AED 10,000 + VAT).'],
  ['Property & Approved Project List (APL) status', 'For off-plan handovers or niche communities, verify that your specific tower or master developer is currently approved by the bank.'],
] as const;

export default async function Page({ params }: { params: Promise<{ bank: string }> }) {
  const b = find((await params).bank);
  if (!b) notFound();
  const comps = COMPARISONS.filter((c) => c.a === b.key || c.b === b.key);
  const peers = BANKS.filter((x) => x.type === b.type && x.slug !== b.slug).slice(0, 4);

  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Rates', href: '/rates' },
          { name: b.name, href: `/rates/${b.slug}` },
        ]}
        eyebrow={`${b.type} · ${b.hq}`}
        title={`${b.name} mortgage guide & written offer checklist`}
        capsule={`${b.name} is a licensed ${b.type.toLowerCase()} lender headquartered in ${b.hq}. ${b.note} Because individual profit/interest rates, revert margins and fee waivers depend on your residency, employer category and loan size, confirm all terms directly in a written Final Offer Letter.`}
      >
        <div className="mt-6 inline-flex h-14 items-center rounded-2xl border border-line bg-white px-5 shadow-sm">
          <img src={b.logo} alt={`${b.name} logo`} className="h-8 w-auto max-w-[180px] object-contain" />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            Discuss {b.short} options with an advisor
          </Link>
          <Link href="/rates/uae-mortgage-rates-eibor-revert-bible" className="btn btn-ghost">
            View all 24 UAE lenders
          </Link>
        </div>
      </PageHero>

      <Section title={`${b.short} profile & statutory CBUAE limits`}>
        <Facts
          facts={[
            ['Financing structure', b.type],
            ['Headquarters', b.hq],
            ['Regulator', 'Central Bank of the UAE (CBUAE)'],
            ['Expat 1st-home LTV cap', 'Up to 80% (or 70% above AED 5M)'],
            ['UAE National 1st-home LTV', 'Up to 85% (or 75% above AED 5M)'],
            ['Maximum DBR ceiling', '50% of verified monthly income'],
          ]}
        />
        <p className="lead mt-8 max-w-3xl">{b.note}</p>
      </Section>

      <Section tone="mist" title={`What to verify in a ${b.short} Final Offer Letter`}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {OFFER_CHECKLIST.map(([h, p]) => (
            <div key={h} className="card">
              <h3 className="font-display text-base font-semibold text-navy">{h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Model repayments with your written offer">
        <div className="rounded-card border border-line p-5 sm:p-8">
          <Calculator slug="mortgage-calculator" />
        </div>
      </Section>

      <Section tone="mist" title={`${b.short} mortgage FAQ`}>
        <div className="max-w-3xl">
          <FaqList
            faqs={[
              {
                q: `How are ${b.name} mortgage rates determined?`,
                a: `${b.name} sets ${b.type === 'Islamic' ? 'profit rates' : 'interest rates'} based on your residency status, income profile, salary-transfer election, property value and current EIBOR funding conditions. Always rely on a dated written Final Offer Letter rather than generic rate tables.`,
              },
              {
                q: `What statutory caps apply to a ${b.short} home loan?`,
                a: 'All CBUAE-licensed lenders operate within Central Bank mortgage regulations, including the 50% maximum Debt Burden Ratio, up to 25-year tenure, statutory LTV ceilings, and the early-settlement fee cap of 1% of outstanding principal or AED 10,000 (+5% VAT), whichever is lower.',
              },
              {
                q: `How do I compare a ${b.short} quote against another bank?`,
                a: 'Enter the introductory fixed rate, fixed duration, EIBOR revert margin and minimum floor from each written quote into the Fixed-to-Revert Calculator to compare post-revert monthly payments and cumulative 5-year interest.',
              },
            ]}
          />
        </div>
      </Section>

      {comps.length > 0 && (
        <Section title="Side-by-side comparisons">
          <LinkGrid links={comps.map((c) => ({ title: c.title, href: `/rates/compare/${c.slug}` }))} />
        </Section>
      )}

      <Section tone={comps.length ? 'mist' : 'white'} title={`Other ${b.type.toLowerCase()} UAE lenders`}>
        <LinkGrid
          cols={4}
          links={peers.map((x) => ({
            title: x.name,
            logo: x.logo,
            body: `${x.type} · ${x.hq}`,
            href: `/rates/${x.slug}`,
          }))}
        />
      </Section>
      <CtaBand />
    </>
  );
}
