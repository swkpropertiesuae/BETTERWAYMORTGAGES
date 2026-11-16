import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Section, CtaBand, LinkGrid } from '@/components/ui';
import RateTable from '@/components/RateTable';
import Calculator from '@/components/calc/Calculator';
import { COMPARISONS, type Comparison } from '@/data/compare';
import { BANKS, bankBy, type Bank } from '@/data/banks';

export const dynamicParams = false;
export const generateStaticParams = () => COMPARISONS.map((c) => ({ slug: c.slug }));
const find = (s: string) => COMPARISONS.find((c) => c.slug === s);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = find((await params).slug);
  return c
    ? {
        title: `${c.title} — UAE Mortgage Structure Comparison`,
        description: `${c.title}: compare financing structure, statutory CBUAE rules, and written Final Offer Letter clauses side by side.`,
        alternates: { canonical: `/rates/compare/${c.slug}` },
      }
    : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const c = find((await params).slug);
  if (!c) notFound();
  const crumbs = [
    { name: 'Rates', href: '/rates' },
    { name: 'Compare', href: '/rates#compare' },
    { name: c.title, href: `/rates/compare/${c.slug}` },
  ];
  const more = COMPARISONS.filter((x) => x.slug !== c.slug)
    .slice(0, 6)
    .map((x) => ({ title: x.title, href: `/rates/compare/${x.slug}` }));
  return (
    <>
      {c.kind === 'banks' ? <BankPair c={c} crumbs={crumbs} /> : <Topic c={c} crumbs={crumbs} />}
      <Section tone="mist" title="More comparisons">
        <LinkGrid links={more} />
      </Section>
      <CtaBand />
    </>
  );
}

function BankPair({ c, crumbs }: { c: Comparison; crumbs: { name: string; href: string }[] }) {
  const a = bankBy(c.a!)!;
  const b = bankBy(c.b!)!;
  const rows: [string, (x: Bank) => string][] = [
    ['Financing structure', (x) => x.type],
    ['Headquarters', (x) => x.hq],
    ['Lending profile', (x) => x.note],
    ['Regulator', () => 'Central Bank of the UAE (CBUAE)'],
    ['Statutory DBR ceiling', () => '50% of verified monthly income'],
    ['Statutory early-settlement cap', () => '1% of balance or AED 10,000 (+5% VAT), whichever is lower'],
    ['Written terms to compare', () => 'Fixed rate & term, EIBOR margin, floor clause, processing & insurance terms'],
  ];
  const focusNote =
    c.focus === 'non-resident'
      ? 'For non-resident applicants, verify eligible residence countries, minimum monthly income, currency haircuts and maximum LTV directly with each bank.'
      : c.focus === 'self-employed'
        ? 'For business owners, compare audited financial statement requirements, company age minimums and annual partial-overpayment allowances in writing.'
        : 'Request dated written Final Offer Letters from both lenders on the same loan amount and tenure before comparing total cost.';

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Side-by-side comparison"
        title={`${c.title}: how to compare written offers`}
        capsule={`${a.name} (${a.type}, ${a.hq}) and ${b.name} (${b.type}, ${b.hq}) are both CBUAE-licensed UAE mortgage lenders. ${focusNote}`}
      />
      <Section title="Institutional profile & statutory framework">
        <div className="overflow-x-auto rounded-card border border-line bg-white">
          <table className="table-bw min-w-[560px]">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>
                  <Link href={`/rates/${a.slug}`} className="inline-flex items-center gap-2 text-teal">
                    <img src={a.logo} alt="" className="h-4 w-auto max-w-[60px] object-contain" />
                    <span>{a.name}</span>
                  </Link>
                </th>
                <th>
                  <Link href={`/rates/${b.slug}`} className="inline-flex items-center gap-2 text-teal">
                    <img src={b.logo} alt="" className="h-4 w-auto max-w-[60px] object-contain" />
                    <span>{b.name}</span>
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, f]) => (
                <tr key={k}>
                  <th scope="row" className="font-sans font-medium text-navy">
                    {k}
                  </th>
                  <td className="font-sans text-sm text-ink">{f(a)}</td>
                  <td className="font-sans text-sm text-ink">{f(b)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section title="Test both written quotes side by side">
        <div className="rounded-card border border-line p-5 sm:p-8">
          <Calculator slug="fixed-to-revert-analyzer" />
        </div>
      </Section>
    </>
  );
}

function Topic({ c, crumbs }: { c: Comparison; crumbs: { name: string; href: string }[] }) {
  const t = c.topic!;
  if (t === 'conv-islamic') {
    return (
      <>
        <PageHero
          crumbs={crumbs}
          eyebrow="Structure guide"
          title={c.title}
          capsule="Conventional UAE mortgages charge interest on a loan principal, while Sharia-compliant home finance uses asset-based contracts—most commonly Ijara (lease-to-own, repricing off EIBOR after an initial fixed term) or Murabaha (deferred-payment sale with fixed profit). Both follow the same CBUAE LTV, 50% DBR and early-settlement caps."
        />
        <Section title="Islamic home finance lenders">
          <RateTable banks={BANKS.filter((x) => x.type === 'Islamic')} />
        </Section>
        <Section tone="mist" title="Conventional mortgage lenders">
          <RateTable banks={BANKS.filter((x) => x.type !== 'Islamic')} />
        </Section>
      </>
    );
  }
  if (t === 'fixed-terms') {
    return (
      <>
        <PageHero
          crumbs={crumbs}
          eyebrow="Structure guide"
          title={c.title}
          capsule="UAE lenders commonly offer 1-, 2-, 3- and 5-year initial fixed periods before the loan reverts to EIBOR plus a fixed bank margin. Shorter fixed terms expose you to revert pricing sooner, whereas 3- and 5-year fixes provide longer payment certainty if you plan to hold the property."
        />
        <Section title="Compare fixed duration & revert margin on your numbers">
          <div className="rounded-card border border-line p-5 sm:p-8">
            <Calculator slug="fixed-to-revert-analyzer" />
          </div>
        </Section>
        <Section tone="mist" title="All 24 UAE lenders">
          <RateTable />
        </Section>
      </>
    );
  }
  if (t === 'salary-transfer') {
    return (
      <>
        <PageHero
          crumbs={crumbs}
          eyebrow="Structure guide"
          title={c.title}
          capsule="Many UAE banks offer both salary-transfer (STL) and non-salary-transfer (NSTL) mortgage tiers. Transferring your monthly salary to the lending bank can unlock preferential pricing or fee waivers, whereas NSTL preserves banking flexibility if you change employers or earn from multiple sources."
        />
        <Section title="Model rate differences on your loan">
          <div className="rounded-card border border-line p-5 sm:p-8">
            <Calculator slug="mortgage-calculator" />
          </div>
        </Section>
      </>
    );
  }
  if (t === 'cc-dbr') {
    return (
      <>
        <PageHero
          crumbs={crumbs}
          eyebrow="Underwriting guide"
          title={c.title}
          capsule="Under the CBUAE 50% Debt Burden Ratio rule, banks include a percentage of your total granted credit card limits—even if your monthly statement balance is paid in full—when calculating monthly debt obligations. Lowering unused card limits or obtaining formal closure letters before applying directly increases borrowing capacity."
        />
        <Section title="Test card-limit impact on your borrowing capacity">
          <div className="rounded-card border border-line p-5 sm:p-8">
            <Calculator slug="dbr-borrowing-power" />
          </div>
        </Section>
      </>
    );
  }
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Insurance guide"
        title={c.title}
        capsule="UAE lenders require decreasing-term life (or family takaful) protection covering the outstanding mortgage balance. Depending on bank policy, borrowers may either enroll in the bank’s group scheme or assign an approved external UAE-licensed life policy—confirm acceptance and any administration fees in writing before applying."
      />
      <Section title="Compare two written policy quotes">
        <div className="rounded-card border border-line p-5 sm:p-8">
          <Calculator slug="life-insurance-assignment-audit" />
        </div>
      </Section>
    </>
  );
}
