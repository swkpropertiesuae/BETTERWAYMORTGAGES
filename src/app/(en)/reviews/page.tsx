import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, Section, CtaBand, aed } from '@/components/ui';
import { Filter } from '@/components/client';
import { buyoutSavings, borrowingPower, cashToClose } from '@/lib/math';

export const metadata: Metadata = {
  title: 'Worked UAE Mortgage Scenarios & Reviews',
  description: 'Illustrative UAE mortgage planning scenarios applying statutory CBUAE 50% DBR, LTV and early-settlement rules.',
  alternates: { canonical: '/reviews' },
};

const bo = buyoutSavings({ balance: 1_500_000, currentRate: 6.0, newRate: 4.25, yearsLeft: 20 });
const purchase = cashToClose({ price: 2_000_000, downPct: 20 });
const cards = borrowingPower({ salary: 38_000, existingEmis: 0, cardLimits: 120_000, years: 25 });
const noCards = borrowingPower({ salary: 38_000, existingEmis: 0, cardLimits: 0, years: 25 });

const CASES = [
  {
    tags: ['Buyout'],
    title: 'Evaluating a refinance under the statutory exit-fee cap',
    body: `Illustrative calculation on an AED 1.5M balance with 20 years remaining: moving from an assumed 6.00% variable rate to an assumed 4.25% rate lowers monthly repayments by ${aed(bo.monthly)}/mo against ${aed(bo.switchCost)} in statutory exit and registration allowances.`,
    href: '/calculators/buyout-refinance-savings',
  },
  {
    tags: ['Resident'],
    title: 'Statutory cash-to-close on an AED 2.0M Dubai purchase',
    body: `At the CBUAE 80% first-home LTV cap (20% deposit of ${aed(purchase.down)}), adding the 4% DLD transfer fee, mortgage registration, trustee, valuation and agency commission brings estimated cash to close to ${aed(purchase.total)}.`,
    href: '/calculators/mortgage-calculator',
  },
  {
    tags: ['Resident'],
    title: 'How unused credit card limits affect 50% DBR',
    body: `Under the 50% CBUAE DBR rule on an illustrative AED 38,000 monthly salary, AED 120,000 in credit card limits (assessed at 5%) reduces modelled borrowing capacity from ${aed(noCards.maxLoan)} to ${aed(cards.maxLoan)}.`,
    href: '/calculators/dbr-borrowing-power',
  },
  {
    tags: ['Self-employed'],
    title: 'Preparing mainland or freezone business accounts',
    body: 'Self-employed applicants typically prepare a valid trade licence, MOA, 2 years of audited financial statements and 12 months of corporate bank statements so lenders can assess sustainable business income.',
    href: '/mortgages/self-employed',
  },
  {
    tags: ['Handover'],
    title: 'Transitioning from 50% off-plan LTV to completion LTV',
    body: 'CBUAE caps under-construction borrowing at 50% LTV, shifting to completed-property LTV limits (up to 80% for expat residents) once the tower is on a lender’s Approved Project List and open for valuation.',
    href: '/handover/dubai-off-plan-handover-mortgage-guide',
  },
  {
    tags: ['Non-resident', 'Golden Visa'],
    title: 'Coordinating overseas documentation & AED 2M threshold',
    body: 'Overseas buyers prepare home-country tax filings, bank statements and credit bureau reports for lender underwriting, while separately verifying DLD and ICP/GDRFA Golden Visa rules on properties valued at AED 2,000,000 or above.',
    href: '/mortgages/golden-visa-mortgage',
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Reviews', href: '/reviews' }]}
        eyebrow="Scenarios & reviews"
        title="Worked statutory mortgage scenarios"
        capsule="Illustrative planning examples demonstrating how CBUAE Debt Burden Ratio, Loan-to-Value and Dubai Land Department fee rules operate in practice. These are educational illustrations, not customer testimonials or guaranteed lending outcomes."
      />
      <Section title="Google Maps listing">
        <div className="card flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-slate">View Betterway Mortgages at Al Nasr Plaza on Google Maps to verify office location details and public reviews.</p>
          <a href="https://www.google.com/maps/search/Betterway+Mortgages+Al+Nasr+Plaza" rel="noopener" className="btn btn-ghost">
            Find Betterway on Google Maps
          </a>
        </div>
      </Section>
      <Section tone="mist" title="Worked rulebook scenarios by profile">
        <Filter
          tags={['Resident', 'Non-resident', 'Self-employed', 'Handover', 'Buyout', 'Golden Visa']}
          items={CASES.map((c) => ({
            tags: c.tags,
            node: (
              <Link key={c.title} href={c.href} className="card">
                <span className="flex gap-2">
                  {c.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </span>
                <span className="mt-3 block font-display text-lg font-semibold text-navy">{c.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-slate">{c.body}</span>
              </Link>
            ),
          }))}
        />
      </Section>
      <CtaBand />
    </>
  );
}
