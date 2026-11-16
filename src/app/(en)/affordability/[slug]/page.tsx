import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Section, Facts, FaqList, CtaBand, LinkGrid, aed } from '@/components/ui';
import Calculator from '@/components/calc/Calculator';
import { AFFORD } from '@/data/content';
import { borrowingPower, cashToClose, emi, STRESS_RATE } from '@/lib/math';

export const dynamicParams = false;
export const generateStaticParams = () => AFFORD.map((a) => ({ slug: a.slug }));
const find = (s: string) => AFFORD.find((a) => a.slug === s);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = find((await params).slug);
  return a
    ? {
        title: a.title,
        description:
          a.kind === 'salary'
            ? `Illustrative UAE mortgage capacity on an AED ${a.amount.toLocaleString('en-US')} monthly salary under the statutory CBUAE 50% DBR rule.`
            : `Statutory CBUAE down payment, DLD transfer fees and closing cash estimate for an AED ${(a.amount / 1e6).toLocaleString('en-US')}M Dubai property.`,
        alternates: { canonical: `/affordability/${a.slug}` },
      }
    : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const a = find((await params).slug);
  if (!a) notFound();
  const crumbs = [
    { name: 'Affordability', href: '/affordability' },
    { name: a.title.replace(/\?$/, ''), href: `/affordability/${a.slug}` },
  ];
  const others = AFFORD.filter((x) => x.kind === a.kind && x.slug !== a.slug).map((x) => ({
    title: x.title.replace(' in Dubai?', '').replace('How Much Mortgage Can I Get on a ', ''),
    href: `/affordability/${x.slug}`,
  }));

  if (a.kind === 'salary') {
    const s = a.amount;
    const clean = borrowingPower({ salary: s, existingEmis: 0, cardLimits: 0, years: 25 });
    const typical = borrowingPower({ salary: s, existingEmis: s * 0.1, cardLimits: s * 2, years: 25 });
    const maxPrice = clean.maxLoan / 0.8 <= 5_000_000 ? clean.maxLoan / 0.8 : clean.maxLoan / 0.7;
    return (
      <>
        <PageHero
          crumbs={crumbs}
          eyebrow="Affordability by salary"
          title={a.title}
          capsule={`Under the statutory CBUAE 50% Debt Burden Ratio rule, a gross monthly salary of AED ${s.toLocaleString('en-US')} permits up to AED ${(s / 2).toLocaleString('en-US')} per month across all debt obligations. With zero existing debts or card limits, an illustrative ${STRESS_RATE}% bank stress test over 25 years models a loan near ${aed(clean.maxLoan)}.`}
        />
        <Section title="Statutory 50% DBR planning illustration">
          <Facts
            facts={[
              ['50% CBUAE DBR ceiling', `${aed(s / 2)}/mo`],
              ['Indicative max loan (no debts)', aed(clean.maxLoan)],
              ['Indicative property (80%/70% LTV)', aed(maxPrice)],
              ['With illustrative car loan & cards*', aed(typical.maxLoan)],
              ['Statutory max tenure', 'Up to 25 years'],
              ['Cash to close at max property', aed(cashToClose({ price: maxPrice, downPct: maxPrice > 5_000_000 ? 30 : 20 }).total)],
            ]}
          />
          <p className="mt-3 text-xs text-slate">
            *Illustrative comparison assuming existing loan repayments of 10% of salary and total credit card limits of 2x monthly salary. Individual banks apply their own stress rates and income multiples.
          </p>
        </Section>
        <Section tone="mist" title="Enter your exact obligations & card limits">
          <div className="rounded-card border border-line bg-white p-5 sm:p-8">
            <Calculator slug="dbr-borrowing-power" initial={{ salary: Math.min(300_000, s) }} />
          </div>
        </Section>
        <Section title="FAQ">
          <div className="max-w-3xl">
            <FaqList
              faqs={[
                {
                  q: `Does an AED ${s.toLocaleString('en-US')} salary qualify for a UAE mortgage?`,
                  a: 'Minimum salary thresholds vary by bank, employer category and whether you elect salary transfer. Confirm eligibility directly with a licensed lender.',
                },
                {
                  q: 'How can borrowers improve DBR capacity?',
                  a: 'Reducing unused credit card limits (with written closure or limit-reduction confirmation), clearing short-term personal or auto loans, or adding an eligible co-borrower directly increases available capacity within the 50% CBUAE cap.',
                },
              ]}
            />
          </div>
        </Section>
        <Section tone="mist" title="Other salary illustrations">
          <LinkGrid cols={4} links={others} />
        </Section>
        <CtaBand />
      </>
    );
  }

  const p = a.amount;
  const ltv = p > 5_000_000 ? 70 : 80;
  const c = cashToClose({ price: p, downPct: 100 - ltv });
  const e = emi(c.loan, 4.25, 25);
  const salaryNeeded = Math.max(emi(c.loan, STRESS_RATE, 25) / 0.5, c.loan / 84);
  const meetsGvThreshold = p >= 2_000_000;

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Affordability by property price"
        title={a.title}
        capsule={`For an expat resident buying a first home at AED ${p.toLocaleString('en-US')} in Dubai, CBUAE regulations cap LTV at ${ltv}%—requiring at least ${100 - ltv}% down (${aed(c.down)}). Adding the 4% DLD transfer fee, mortgage registration, trustee, valuation and standard agency commission brings estimated cash to close to ${aed(c.total)}.`}
      />
      <Section title="Statutory down payment & Dubai closing costs">
        <div className="overflow-hidden rounded-card border border-line bg-white">
          <table className="table-bw">
            <tbody className="num">
              {[
                ['Minimum down payment', c.down],
                ['DLD 4% transfer + AED 580 title deed', c.dld],
                ['Mortgage registration (0.25% + AED 290)', c.mortgageReg],
                ['Trustee fee (incl. VAT)', c.trustee],
                ['Valuation allowance (incl. VAT)', c.valuation],
                ['Agency commission (2% + VAT)', c.agencyFee],
              ].map(([k, v]) => (
                <tr key={k as string}>
                  <td className="font-sans">{k}</td>
                  <td className="text-end">{aed(v as number)}</td>
                </tr>
              ))}
              <tr>
                <td className="font-sans font-semibold text-navy">Estimated total cash to close</td>
                <td className="text-end font-semibold text-teal">{aed(c.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <Facts
            facts={[
              ['Expat 1st-home LTV cap', `${ltv}%`],
              ['UAE National 1st-home LTV', p > 5_000_000 ? '75%' : '85%'],
              ['Maximum loan amount', aed(c.loan)],
              ['Illustrative payment (4.25% / 25y)', `${aed(e)}/mo`],
              ['Indicative gross salary (50% DBR)*', `${aed(salaryNeeded)}/mo`],
              ['AED 2M Golden Visa threshold', meetsGvThreshold ? 'Meets AED 2M threshold' : `Short by ${aed(2_000_000 - p)}`],
            ]}
          />
        </div>
      </Section>
      <Section tone="mist" title="Adjust rate, deposit & tenure">
        <div className="rounded-card border border-line bg-white p-5 sm:p-8">
          <Calculator slug="mortgage-calculator" initial={{ price: Math.min(30_000_000, p), down: 100 - ltv }} />
        </div>
      </Section>
      {a.golden && (
        <Section title="Golden Visa property threshold">
          <p className="lead max-w-3xl">
            At AED 2,000,000 or above, the purchase price meets the statutory Dubai real estate investor threshold. Mortgaged properties generally require a lender No-Objection Certificate alongside Title Deed or registered Oqood documentation; confirm current application fees and eligibility rules directly with DLD and ICP/GDRFA.{' '}
            <Link className="text-teal underline" href="/mortgages/golden-visa-mortgage">
              Read the Golden Visa mortgage guide
            </Link>
            .
          </p>
        </Section>
      )}
      <Section tone={a.golden ? 'mist' : 'white'} title="Other property budgets">
        <LinkGrid cols={4} links={others} />
      </Section>
      <CtaBand />
    </>
  );
}
