// Silo 03 — calculators & micro-tools. Server-safe metadata (titles, capsules). Logic lives in components/calc/registry.ts.
export type ToolMeta = { slug: string; base: 'calculators' | 'tools'; name: string; ar: string; title: string; capsule: string };

export const TOOLS: ToolMeta[] = [
  { slug: 'mortgage-calculator', base: 'calculators', name: 'Mortgage & Upfront Cost Calculator', ar: 'حاسبة التمويل والتكاليف المقدمة',
    title: 'UAE Mortgage EMI & Upfront DLD Cash Calculator',
    capsule: 'This calculator gives your monthly UAE mortgage payment and every dirham of cash needed to close: down payment, 4% DLD fee plus AED 580 title deed, 0.25% mortgage registration plus AED 290, AED 4,200 trustee fee, AED 3,150 valuation and 2.1% agency commission—no sign-up required.' },
  { slug: 'dbr-borrowing-power', base: 'calculators', name: 'DBR & Credit Card Optimiser', ar: 'حاسبة نسبة عبء الدين',
    title: 'CBUAE 50% DBR & Credit Card Limit Optimiser',
    capsule: 'Your maximum UAE mortgage is set by the CBUAE 50% debt burden ratio. Banks deduct existing loan EMIs and 5% of total credit card limits (3% at HSBC, ADCB and DIB) from half your gross salary, then stress-test the remainder. This tool shows how closing a card raises your limit.' },
  { slug: 'fixed-to-revert-analyzer', base: 'calculators', name: 'Fixed vs EIBOR Revert Analyser', ar: 'محلل الفائدة الثابتة مقابل المتغيرة',
    title: '24-Bank Fixed Rate vs 3M EIBOR Revert 5-Year Analyser',
    capsule: 'A cheap 1- or 2-year teaser rate can cost more over five years than a slightly higher rate with a low revert margin. This analyser runs every bank’s intro rate, EIBOR margin and floor through the same loan to rank true five-year cost.' },
  { slug: 'buyout-refinance-savings', base: 'calculators', name: 'Buyout Net-Savings Calculator', ar: 'حاسبة توفير نقل التمويل',
    title: 'Mortgage Buyout Net-Savings & 36-Month Clawback Tool',
    capsule: 'Switching banks in the UAE costs up to AED 10,500 in early-settlement fees (1% or AED 10,000 + VAT), plus 0.25% mortgage re-registration. This tool nets those costs against your monthly saving and shows the break-even month and 36-month net gain.' },
  { slug: 'handover-equity-release', base: 'calculators', name: 'Handover & Cash-Out Calculator', ar: 'حاسبة التسليم وتحرير السيولة',
    title: 'Off-Plan Handover (60/40, 70/30, 80/20) & Cash-Out Calculator',
    capsule: 'At handover, UAE banks can lend up to 80% of the fresh valuation for resident expats. This calculator shows the developer balance owed under your payment plan, the maximum loan on today’s valuation and the cash you could release—for example: AED 2.0M bought, AED 2.8M valued, AED 1.84M released.' },
  { slug: 'golden-visa-mortgage-calculator', base: 'calculators', name: 'Golden Visa Mortgage Calculator', ar: 'حاسبة الإقامة الذهبية',
    title: '2026 Golden Visa Mortgage & Family Fee Estimator',
    capsule: 'Under February 2026 rules a mortgaged property valued at AED 2M or more qualifies for the 10-year Golden Visa with no minimum paid equity. This estimator checks eligibility and totals DLD, GDRFA, Emirates ID, medical and bank NOC fees for you and your family.' },
  { slug: 'non-resident-rental-coverage', base: 'calculators', name: 'Non-Resident Rental Coverage', ar: 'حاسبة تغطية الإيجار',
    title: 'Non-Resident 50–65% LTV & Net Rental Coverage Simulator',
    capsule: 'Non-resident investors borrow 50–65% of value. This simulator compares the monthly EMI against net Dubai rent after service charges and management to show whether the property pays for itself and the cash yield on your down payment.' },
  { slug: 'rent-vs-buy-dubai', base: 'calculators', name: 'Rent vs Buy Calculator', ar: 'حاسبة الإيجار مقابل الشراء',
    title: 'Dubai Ejari Rent Escalation vs Mortgage Equity Calculator',
    capsule: 'This calculator compares cumulative Dubai rent, rising with Ejari escalation, against the net cost of owning—upfront fees, EMIs and service charges minus equity built and appreciation—to find the year buying becomes cheaper than renting.' },
  { slug: 'overpayment-early-settlement', base: 'calculators', name: 'Overpayment Calculator', ar: 'حاسبة السداد المبكر',
    title: 'Annual Free Partial Overpayment (10–25%) Calculator',
    capsule: 'Most UAE banks allow 10–25% of the balance to be repaid each year without penalty. This calculator shows how an annual lump sum shortens your term and how much interest it saves.' },
  { slug: 'form-f-clause-generator', base: 'tools', name: 'Form F Clause Generator', ar: 'مولد بنود نموذج F',
    title: 'RERA Form F (Contract F) Deposit Protection Clause Generator',
    capsule: 'Generate copy-paste special conditions for RERA Form F that make your purchase subject to bank valuation and a Final Offer Letter, extend the contract for bank or DLD delays, and keep your 10% deposit cheque uncashed until transfer. Have your conveyancer review before signing.' },
  { slug: 'life-insurance-assignment-audit', base: 'tools', name: 'Life Insurance Auditor', ar: 'مدقق التأمين على الحياة',
    title: 'Bank Life Insurance vs External Policy Auditor',
    capsule: 'Bank-bundled mortgage life cover costs about 0.65% of the balance a year. An assigned external decreasing-term policy averages about 0.26%. This auditor totals the difference across your loan—typically AED 80,000+ on an AED 2M, 15-year loan.' },
  { slug: 'transfer-day-cheque-calculator', base: 'tools', name: 'Transfer-Day Cheque Splitter', ar: 'حاسبة شيكات يوم النقل',
    title: 'DLD Trustee Office Transfer-Day Manager’s Cheque Splitter',
    capsule: 'On transfer day the buyer’s funds and bank loan are split into manager’s cheques for the seller, the seller’s bank, DLD and the trustee. Enter price, seller payoff and deposit to get the exact payee amounts to confirm 72 hours ahead.' },
];

export const toolBy = (slug: string) => TOOLS.find((t) => t.slug === slug);
export const toolHref = (t: ToolMeta) => `/${t.base}/${t.slug}`;
export const AR_CALCS = ['mortgage-calculator', 'dbr-borrowing-power', 'fixed-to-revert-analyzer', 'buyout-refinance-savings', 'handover-equity-release', 'golden-visa-mortgage-calculator', 'rent-vs-buy-dubai', 'overpayment-early-settlement'];
