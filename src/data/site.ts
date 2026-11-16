// Single source of truth for corporate details and statutory CBUAE / DLD mortgage rules.

export const SITE = {
  name: 'Betterway Mortgages',
  legalName: 'Betterway Mortgages',
  url: 'https://betterwaymortgages.com',
  portalUrl: 'https://portal.betterwaymortgages.com',
  hubUrl: 'https://hub.betterwaymortgages.com',
  address: {
    building: 'Al Nasr Plaza',
    plot: 'Plot 319-310',
    street: 'Oud Metha Road',
    district: 'Oud Metha',
    city: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
  },
  phone: '',
  phoneHref: '',
  whatsapp: '',
  email: 'hello@betterwaymortgages.com',
  licence: '',
  hours: 'Mon–Sat 09:00–19:00 GST',
  asOf: 'CBUAE & DLD statutory framework',
  asOfISO: '2025-01-01',
} as const;

export const fullAddress = `${SITE.address.building}, ${SITE.address.plot}, ${SITE.address.street}, ${SITE.address.district}, ${SITE.address.city}, UAE`;

export const waLink = (text = 'Hi Betterway, I would like to discuss my UAE mortgage options.') =>
  SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}` : `mailto:${SITE.email}?subject=Mortgage%20enquiry&body=${encodeURIComponent(text)}`;

/** Statutory CBUAE caps & directory counts (no unverified bank rates or market volume claims). */
export const BENCH = {
  maxDbrPct: 50,
  expatFirstHomeLtv: 80,
  nationalFirstHomeLtv: 85,
  maxTenureYears: 25,
  bankCount: 24,
} as const;

/** CBUAE LTV caps (Mortgage Loan Regulations). */
export const LTV_RULES = [
  { profile: 'UAE National — first home up to AED 5M', ltv: '85%', down: '15%' },
  { profile: 'UAE National — first home above AED 5M', ltv: '75%', down: '25%' },
  { profile: 'Expat resident — first home up to AED 5M', ltv: '80%', down: '20%' },
  { profile: 'Expat resident — first home above AED 5M', ltv: '70%', down: '30%' },
  { profile: 'Second or investment property', ltv: '60–65%', down: '35–40%' },
  { profile: 'Non-resident applicant', ltv: 'Lender policy', down: 'Lender policy' },
  { profile: 'Off-plan under construction', ltv: '50%', down: '50%' },
];

export const RULES = [
  { k: 'Maximum Debt Burden Ratio', v: '50% of gross monthly income across all debt obligations' },
  { k: 'Credit card limits in DBR', v: 'Assessed as a monthly liability per individual lender credit policy' },
  { k: 'Maximum mortgage tenure', v: 'Up to 25 years, subject to lender age-at-maturity limits' },
  { k: 'Early settlement fee cap', v: '1% of outstanding balance or AED 10,000, whichever is lower (+5% VAT)' },
  { k: 'Down payment source', v: 'Must come from own funds; cannot be financed by a UAE personal loan' },
  { k: 'Dubai Land Department fees', v: '4% transfer fee + AED 580 title deed; 0.25% mortgage registration + AED 290' },
];

export const DISCLOSURE_SHORT =
  'Planning estimates based on user inputs and statutory rules—not binding bank offers. Lenders confirm eligibility and pricing in writing.';

export const DISCLOSURE_FULL =
  'Published EIBOR fixings display their official CBUAE source date. Calculators model user-selected assumptions alongside published CBUAE and land-registry rules for planning purposes only and do not constitute a mortgage offer or financial advice. Confirm current interest/profit rates, revert margins, floor clauses, bank fees, insurance requirements and any broker remuneration in writing before applying. Lending and valuation decisions rest solely with the licensed financial institution.';
