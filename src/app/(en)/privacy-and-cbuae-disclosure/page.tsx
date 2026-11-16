import type { Metadata } from 'next';
import { PageHero, Section } from '@/components/ui';
import { SITE, DISCLOSURE_FULL, RULES, fullAddress } from '@/data/site';

export const metadata: Metadata = {
  title: 'CBUAE Consumer Protection Disclosure, Privacy Policy & Terms',
  description: 'How Betterway Mortgages presents statutory rules, published EIBOR data, fee disclosures and personal data protections.',
  alternates: { canonical: '/privacy-and-cbuae-disclosure' },
};

const BLOCKS: [string, string[]][] = [
  [
    'How we are remunerated',
    [
      'Always request written confirmation of any broker fees and lender remuneration before proceeding with an application. Your bank’s written Final Offer Letter sets out all binding bank fees, profit/interest rates and repayment terms.',
    ],
  ],
  [
    'How benchmarks & calculators are presented',
    [
      DISCLOSURE_FULL,
      'Individual profit/interest rates, revert margins and minimum floors depend on borrower eligibility and are confirmed solely in the lending bank’s written Final Offer Letter.',
    ],
  ],
  ['Key statutory CBUAE & DLD rules referenced', RULES.map((r) => `${r.k}: ${r.v}.`)],
  [
    'Personal data & document security',
    [
      'When you engage an advisor, we request only the identity, income, credit-liability and property records required by licensed UAE financial institutions.',
      'This public website does not operate a live document upload portal. Never submit passport copies or bank statements through an unverified web form; request the approved secure intake channel directly from your advisor.',
      'You may request access to, correction of, or deletion of your contact enquiries at any time by writing to ' + SITE.email + '.',
    ],
  ],
  [
    'Queries & complaints',
    [
      'Please raise any service query or complaint with our office first so we can investigate promptly. For matters involving licensed financial institutions, consumers may also consult official CBUAE consumer protection channels or Sanadak.',
      `Office address: ${fullAddress}.${SITE.licence ? ` ${SITE.licence}.` : ''}`,
    ],
  ],
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Privacy & CBUAE disclosure', href: '/privacy-and-cbuae-disclosure' }]}
        eyebrow="Legal & compliance"
        aside={false}
        title="CBUAE consumer protection disclosure, privacy policy & terms"
        capsule="Review the regulatory assumptions used across our calculators, our written-fee transparency policy, and how to share application documents safely. Binding mortgage terms are issued exclusively by licensed lenders in writing."
      />
      <Section title="Full regulatory & privacy disclosure">
        <div className="max-w-3xl space-y-10">
          {BLOCKS.map(([h, ps]) => (
            <div key={h}>
              <h3 className="font-display text-xl font-semibold">{h}</h3>
              <div className="prose-bw mt-3">
                {ps.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
