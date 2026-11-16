import type { Metadata } from 'next';
import { PageHero, Section, CtaBand, FaqList, Disclosure } from '@/components/ui';
import RateTable from '@/components/RateTable';
import Calculator from '@/components/calc/Calculator';
import { CostBars } from '@/components/Charts';

export const metadata: Metadata = {
  title: 'UAE 24-Bank Mortgage Lender Directory, EIBOR Revert & Floor Guide',
  description: 'Directory of all 24 UAE mortgage banks with original logos, plus how introductory fixed periods, 3M EIBOR revert margins and minimum floor clauses work.',
  alternates: { canonical: '/rates/uae-mortgage-rates-eibor-revert-bible' },
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Rates', href: '/rates' },
          { name: 'Lender & revert guide', href: '/rates/uae-mortgage-rates-eibor-revert-bible' },
        ]}
        eyebrow="UAE mortgage framework"
        title="UAE mortgage lenders: 24-bank directory, EIBOR revert margins & floor clauses"
        capsule="Most UAE residential mortgages combine an initial fixed period (commonly 1, 2, 3 or 5 years) with a variable revert rate linked to published CBUAE EIBOR plus a contractual bank margin, subject to any minimum floor rate stated in your Final Offer Letter. Compare all 24 licensed lenders below and test written quotes in the calculator."
      >
        <Disclosure />
      </PageHero>

      <Section title="All 24 UAE mortgage lenders">
        <RateTable />
      </Section>

      <Section
        id="margin-sensitivity"
        tone="mist"
        title="Why the revert margin matters alongside the introductory rate"
        intro="Two offers with similar introductory rates can diverge materially once the fixed period ends and the contractual EIBOR margin takes over."
      >
        <div className="card">
          <p className="mb-4 font-display text-lg font-semibold text-navy">
            Illustrative 5-year cumulative interest across margin tiers (AED 1.5M loan)
          </p>
          <CostBars limit={5} />
        </div>
      </Section>

      <Section title="Test your written bank offer">
        <div className="rounded-card border border-line p-5 sm:p-8">
          <Calculator slug="fixed-to-revert-analyzer" />
        </div>
      </Section>

      <Section tone="mist" title="Reading a UAE Final Offer Letter">
        <div className="max-w-3xl">
          <FaqList
            faqs={[
              {
                q: 'What is a revert margin?',
                a: 'The fixed percentage spread a lender adds to its chosen EIBOR benchmark (most commonly 3-Month EIBOR) once your initial fixed-rate period expires. It is defined in your Final Offer Letter for the remaining term of the loan.',
              },
              {
                q: 'What is a minimum floor rate?',
                a: 'A contractual lower bound on your variable rate after reversion. Even if published EIBOR falls substantially, your total rate will not drop below the floor percentage written in your loan agreement.',
              },
              {
                q: 'Why do we not publish single fixed rates for each bank?',
                a: 'UAE banks tier mortgage pricing by salary-transfer status, employer classification, residency, property value and campaign dates. Only a written Final Offer Letter issued after credit assessment confirms your binding rate and fees.',
              },
            ]}
          />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
