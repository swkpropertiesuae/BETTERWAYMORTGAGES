import { BANKS } from './banks';

export type NavLink = { label: string; href: string; desc?: string };
export type NavCol = { title: string; links: NavLink[] };
export type NavItem = {
  label: string;
  href: string;
  cols?: NavCol[];
  feature?: { title: string; body: string; href: string; cta: string };
};

export const NAV: NavItem[] = [
  {
    label: 'For Buyers',
    href: '/mortgages',
    cols: [
      {
        title: 'Mortgages & Financing',
        links: [
          { label: 'Priority Lender Desk', href: '/hot-offers', desc: '24-bank advisory' },
          { label: 'Pre-Approval Eligibility Check', href: '/get-started', desc: '60s DBR & DLD brief' },
          { label: 'UAE Resident Mortgages', href: '/mortgages/uae-residents', desc: 'Up to 80% LTV' },
          { label: 'UAE National Mortgages', href: '/mortgages/uae-nationals', desc: 'Up to 85% LTV' },
          { label: 'Non-Resident & Global Expats', href: '/mortgages/non-resident-dubai', desc: '25 countries' },
          { label: 'Islamic Home Finance', href: '/mortgages/islamic-home-finance', desc: 'Ijara & Murabaha' },
          { label: 'Switch Bank & Equity Release', href: '/mortgages/mortgage-buyout-refinance', desc: '1% / 10k cap' },
        ],
      },
      {
        title: 'Property & Closing Desk',
        links: [
          { label: 'Property Closing Desk', href: '/concierge', desc: 'Budget & Form F prep' },
          { label: 'Off-Plan & Handover Finance', href: '/handover/dubai-off-plan-handover-mortgage-guide', desc: '80+ projects' },
          { label: 'Commercial Property Finance', href: '/advisory/commercial-property-finance' },
          { label: 'RERA Conveyancing Services', href: '/advisory/rera-conveyancing-services' },
          { label: 'Golden Visa Mortgages', href: '/mortgages/golden-visa-mortgage', desc: 'AED 2M+ path' },
        ],
      },
      {
        title: 'Interactive Calculators',
        links: [
          { label: 'Mortgage & DLD Cost Calculator', href: '/calculators/mortgage-calculator', desc: 'Full upfront fees' },
          { label: 'Borrowing Power (50% DBR)', href: '/calculators/dbr-borrowing-power', desc: 'Card limit check' },
          { label: 'Rent vs Buy Calculator', href: '/calculators/rent-vs-buy-dubai', desc: '15-yr equity model' },
          { label: 'Refinance Savings Calculator', href: '/calculators/buyout-refinance-savings', desc: 'Break-even' },
          { label: 'Form F & Cheque Tools', href: '/tools/form-f-clause-generator', desc: 'Legal clauses' },
        ],
      },
    ],
    feature: {
      title: 'Instant Pre-Approval Readiness',
      body: 'Check your 50% CBUAE DBR headroom, itemised 4% DLD closing costs, and eligible UAE banks in under 60 seconds.',
      href: '/get-started',
      cta: 'Check eligibility now',
    },
  },
  {
    label: 'For Agents',
    href: '/hub',
    cols: [
      {
        title: 'Real Estate Agencies & Brokers',
        links: [
          { label: 'Betterway Partner Desk', href: '/hub', desc: 'RERA referral & buyer portal' },
          { label: 'Become a Partner', href: '/partners', desc: 'RERA agency onboarding' },
          { label: 'Co-Branded Calculators', href: '/partners/co-branded-tools', desc: 'Share with buyers' },
          { label: 'Partner Dashboard', href: '/partners/dashboard', desc: 'Live case milestones' },
        ],
      },
      {
        title: 'Brokerage Operating System',
        links: [
          { label: 'Betterway Brokerage Platform', href: '/edge', desc: 'Practice infrastructure' },
          { label: 'Betterway OS Login', href: '/portal/login', desc: 'Client & staff access' },
          { label: 'Conveyancing Desk', href: '/advisory/rera-conveyancing-services', desc: 'Trustee execution' },
        ],
      },
    ],
    feature: {
      title: 'Keep buyer deals moving to transfer',
      body: 'Confirm buyer DBR headroom ahead of viewings and track mortgage files from Form F to DLD trustee day.',
      href: '/hub',
      cta: 'Explore Partner Desk',
    },
  },
  {
    label: 'Resources',
    href: '/guides',
    cols: [
      {
        title: 'Rates & Lender Intelligence',
        links: [
          { label: 'Live CBUAE EIBOR Tracker', href: '/rates/eibor-live-tracker', desc: 'Daily official fixings' },
          { label: '24 UAE Banks & Revert Guide', href: '/rates/uae-mortgage-rates-eibor-revert-bible', desc: `${BANKS.length} lenders` },
          { label: 'Head-to-Head Bank Comparisons', href: '/rates#compare', desc: 'ENBD, FAB, DIB, HSBC' },
          { label: 'Betterway vs Going Direct', href: '/why-betterway-vs-direct-bank' },
        ],
      },
      {
        title: 'Market Guides & Areas',
        links: [
          { label: '36 Trending UAE Insights', href: '/insights', desc: '2026–2027 rules & areas' },
          { label: 'Free Printable PDF Guides', href: '/downloads', desc: 'Buyer, DLD & Visa PDFs' },
          { label: 'All UAE Buying Guides', href: '/guides', desc: 'DLD, Form F & DBR' },
          { label: '60 UAE Freehold Communities', href: '/areas', desc: 'Dubai, Abu Dhabi & North' },
          { label: 'Salary Affordability Guides', href: '/affordability', desc: 'AED 15k to 100k+' },
          { label: 'Frequently Asked Questions', href: '/#faq' },
        ],
      },
      {
        title: 'Company & Governance',
        links: [
          { label: 'About Betterway', href: '/about-us' },
          { label: 'Our Dubai Specialists', href: '/our-underwriters', desc: 'Oud Metha team' },
          { label: 'Worked Mortgage Examples', href: '/reviews' },
          { label: 'Contact & Visit Us', href: '/contact' },
        ],
      },
    ],
    feature: {
      title: 'Compare the whole mortgage offer',
      body: 'Never get caught by post-fixed EIBOR revert jumps or hidden DLD fees. Inspect every clause before signing.',
      href: '/rates/eibor-live-tracker',
      cta: 'View live EIBOR',
    },
  },
];
