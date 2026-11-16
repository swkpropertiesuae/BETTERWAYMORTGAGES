import type { Metadata } from 'next';
import { PageHero, Section, Facts, FaqList, CtaBand, LinkGrid } from '@/components/ui';
import Calculator from '@/components/calc/Calculator';
import { DEVELOPERS, PROJECTS } from '@/data/handover';

export const metadata: Metadata = {
  title: 'Dubai Off-Plan Handover Mortgage Guide — CBUAE 50% vs 80% LTV Rules',
  description: 'How CBUAE’s 50% under-construction LTV cap transitions to completed-property LTV at handover, Oqood-to-Title-Deed registration fees and APL checks.',
  alternates: { canonical: '/handover/dubai-off-plan-handover-mortgage-guide' },
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Off-plan handover', href: '/handover' },
          { name: 'Handover guide', href: '/handover/dubai-off-plan-handover-mortgage-guide' },
        ]}
        eyebrow="Master guide"
        title="Dubai off-plan handover mortgage guide: CBUAE LTV rules, APL checks & closing fees"
        capsule="CBUAE mortgage regulations cap lending on under-construction off-plan properties at 50% LTV. As a project approaches completion and Building Completion Certificate issuance, banks that hold the tower on their Approved Project List (APL) can finance the final developer instalment under completed-property LTV caps (up to 80% for expat residents and 85% for UAE Nationals)."
      />

      <Section title="Statutory CBUAE & DLD handover rules">
        <Facts
          facts={[
            ['Under-construction LTV', '50% max (CBUAE)'],
            ['Completion LTV (Expat 1st home)', 'Up to 80% (up to AED 5M)'],
            ['Completion LTV (UAE National)', 'Up to 85% (up to AED 5M)'],
            ['Non-resident completion LTV', 'Set by lender policy'],
            ['4% DLD fee at handover', 'Not payable again if Oqood registered'],
            ['Dubai mortgage registration', '0.25% of loan + AED 290'],
          ]}
        />
      </Section>

      <Section tone="mist" title="Five stages of an off-plan handover mortgage">
        <ol className="grid gap-4 md:grid-cols-5">
          {[
            'Verify bank Approved Project List (APL) status for your specific tower',
            'Submit income & AECB documentation 60–90 days before completion notice',
            'Instruct independent bank valuation once site access is granted',
            'Execute Final Offer Letter & request developer NOC',
            'Disburse final developer balance & convert Oqood to Title Deed',
          ].map((s, i) => (
            <li key={s} className="card">
              <span className="eyebrow">Step {i + 1}</span>
              <p className="mt-2 font-medium text-navy">{s}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        title="Model your final developer payment & valuation"
        intro="Enter your SPA price, remaining handover instalment percentage and assumed bank valuation to estimate loan capacity and registration costs."
      >
        <div className="rounded-card border border-line p-5 sm:p-8">
          <Calculator slug="handover-equity-release" />
        </div>
      </Section>

      <Section tone="mist" title="14 master-developer hubs">
        <LinkGrid
          cols={4}
          links={DEVELOPERS.filter((d) => d.hub).map((d) => ({
            title: d.name,
            body: `${PROJECTS.filter((p) => p.dev === d.slug).length} tracked developments`,
            href: `/handover/${d.slug}`,
          }))}
        />
      </Section>

      <Section title="Off-plan handover FAQ">
        <div className="max-w-3xl">
          <FaqList
            faqs={[
              {
                q: 'What is a bank Approved Project List (APL)?',
                a: 'Each UAE bank maintains an internal register of master developers and individual towers approved for handover and post-completion mortgage lending. Because APL status is tower-specific and subject to change, confirm eligibility with the bank before your completion notice arrives.',
              },
              {
                q: 'Can a handover loan exceed the final developer instalment?',
                a: 'Some UAE lenders calculate maximum LTV against the current bank valuation rather than the original SPA price, while others cap lending at the original purchase price or remaining balance due. Any surplus release remains subject to bank policy and the 50% CBUAE DBR cap.',
              },
              {
                q: 'What happens if I have a post-handover payment plan?',
                a: 'Buyers on a post-handover payment plan can either continue scheduled developer instalments or apply to settle the remaining developer balance via a mortgage once the Title Deed can be issued.',
              },
            ]}
          />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
