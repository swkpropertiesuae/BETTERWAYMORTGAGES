// Silo 03 — calculators & micro-tools. Server-safe metadata (titles, capsules, plain-English scope notes).
export type ToolMeta = { slug: string; base: 'calculators' | 'tools'; name: string; ar: string; title: string; capsule: string; method: string[] };

export const TOOLS: ToolMeta[] = [
  {
    slug: 'mortgage-calculator',
    base: 'calculators',
    name: 'Mortgage & Upfront Cost Calculator',
    ar: 'حاسبة التمويل والتكاليف المقدمة',
    title: 'UAE Mortgage Payment & Upfront DLD Cost Calculator',
    capsule: 'Estimate monthly repayments based on your chosen property price, deposit, interest rate and tenure alongside standard Dubai Land Department registration charges—no sign-up required.',
    method: [
      'Calculates standard monthly principal-and-interest instalments from the loan amount, annual interest rate and loan tenure you select.',
      'Applies published Dubai Land Department registration charges: 4% transfer fee plus AED 580 title deed admin fee, and 0.25% mortgage registration plus AED 290.',
      'Includes DLD trustee registration fees and optional valuation and brokerage inputs so you can review upfront cash requirements before applying.',
    ],
  },
  {
    slug: 'dbr-borrowing-power',
    base: 'calculators',
    name: 'DBR & Credit Card Optimiser',
    ar: 'حاسبة نسبة عبء الدين',
    title: 'CBUAE 50% DBR & Credit Card Limit Calculator',
    capsule: 'Under UAE Central Bank regulations, total monthly debt obligations—including existing loans and a lender-assessed percentage of credit card limits—cannot exceed 50% of gross monthly income.',
    method: [
      'Applies the UAE Central Bank 50% Debt Burden Ratio cap to the gross monthly income you enter.',
      'Deducts existing monthly loan instalments and the selected credit card limit percentage assessed by lenders.',
      'Estimates indicative borrowing capacity across your chosen tenure and stress-test rate, subject to individual lender underwriting.',
    ],
  },
  {
    slug: 'fixed-to-revert-analyzer',
    base: 'calculators',
    name: 'Fixed vs EIBOR Revert Analyser',
    ar: 'محلل الفائدة الثابتة مقابل المتغيرة',
    title: 'Fixed Period vs EIBOR Revert Payment Analyser',
    capsule: 'Compare your monthly payment during an introductory fixed period against the variable payment once your loan switches to a 3-month EIBOR benchmark plus the lender’s contractual margin and minimum floor.',
    method: [
      'Models monthly instalments during your chosen introductory fixed-rate term.',
      'Applies your entered 3-month EIBOR assumption plus bank margin—or the contractual minimum floor rate if higher—after the fixed term ends.',
      'Summarises five-year cumulative interest based strictly on the rate, margin and floor inputs you provide.',
    ],
  },
  {
    slug: 'buyout-refinance-savings',
    base: 'calculators',
    name: 'Buyout Net-Savings Calculator',
    ar: 'حاسبة توفير نقل التمويل',
    title: 'Mortgage Buyout & Switching Cost Calculator',
    capsule: 'Compare your current monthly mortgage payment against a proposed refinance rate after accounting for the UAE Central Bank early-settlement fee cap and DLD mortgage re-registration charges.',
    method: [
      'Applies the UAE Central Bank early-settlement cap of 1% of the outstanding balance or AED 10,000 (whichever is lower), plus 5% VAT.',
      'Adds Dubai Land Department mortgage registration of 0.25% of the loan amount plus AED 290 and any new lender processing fee you enter.',
      'Compares monthly payment reduction against estimated switching costs over a three-year planning horizon.',
    ],
  },
  {
    slug: 'handover-equity-release',
    base: 'calculators',
    name: 'Handover & Completion Calculator',
    ar: 'حاسبة تمويل التسليم',
    title: 'Off-Plan Handover Mortgage & Balance Calculator',
    capsule: 'Estimate the final developer instalment due at completion alongside indicative mortgage capacity based on your property valuation and applicable CBUAE loan-to-value limit.',
    method: [
      'Determines the remaining developer completion balance from your original purchase price and payment plan split.',
      'Applies your selected loan-to-value percentage to the completion valuation you enter.',
      'Includes standard Dubai mortgage registration, title deed, trustee and valuation charges where Oqood was already paid at launch.',
    ],
  },
  {
    slug: 'golden-visa-mortgage-calculator',
    base: 'calculators',
    name: 'Golden Visa Property Threshold Check',
    ar: 'حاسبة حد عقار الإقامة الذهبية',
    title: 'UAE Property Value Threshold & Upfront Cost Planner',
    capsule: 'Check whether your target property purchase meets the AED 2,000,000 property value threshold and review standard DLD purchase costs alongside your mortgage deposit.',
    method: [
      'Checks the property value you enter against the AED 2,000,000 real-estate threshold.',
      'Calculates loan amount and standard Dubai Land Department closing charges for your selected deposit percentage.',
      'Residency eligibility, bank NOC rules and government visa fees are separate from mortgage approval and must be confirmed with DLD and ICP/GDRFA.',
    ],
  },
  {
    slug: 'non-resident-rental-coverage',
    base: 'calculators',
    name: 'Non-Resident Rental Coverage',
    ar: 'حاسبة تغطية الإيجار',
    title: 'Rental Income vs Mortgage Payment Simulator',
    capsule: 'Compare your estimated monthly mortgage payment against net rental income using your own property price, LTV, interest rate, expected rent and annual service charges.',
    method: [
      'Calculates monthly mortgage repayments from the property price, loan-to-value ratio, rate and tenure you enter.',
      'Deducts annual building service charges and property management allowance from your gross rental assumption.',
      'Compares estimated net monthly rent against the monthly mortgage instalment.',
    ],
  },
  {
    slug: 'rent-vs-buy-dubai',
    base: 'calculators',
    name: 'Rent vs Buy Calculator',
    ar: 'حاسبة الإيجار مقابل الشراء',
    title: 'Dubai Rent vs Mortgage Ownership Comparison Tool',
    capsule: 'Compare cumulative rent payments against the net cost of buying with a mortgage using your own assumptions for property price, current rent, rent changes and tenure.',
    method: [
      'Projects annual rental outlay across a fifteen-year horizon using your entered rent and annual adjustment assumption.',
      'Tracks upfront DLD purchase fees, mortgage payments, service charges and principal amortisation.',
      'Identifies when cumulative ownership outlay net of loan amortisation compares favourably to renting under your chosen assumptions.',
    ],
  },
  {
    slug: 'overpayment-early-settlement',
    base: 'calculators',
    name: 'Overpayment Calculator',
    ar: 'حاسبة السداد الجزئي المبكر',
    title: 'Annual Partial Mortgage Overpayment Calculator',
    capsule: 'Many UAE mortgage offers include an annual partial prepayment allowance. Enter your loan balance, rate and planned annual lump sum to see how prepayments shorten your term.',
    method: [
      'Calculates standard monthly amortisation across your entered loan amount, rate and tenure.',
      'Applies your chosen annual prepayment once per year to reduce principal.',
      'Confirm your lender’s free partial settlement allowance and CBUAE early-settlement fee terms in your Final Offer Letter.',
    ],
  },
  {
    slug: 'form-f-clause-generator',
    base: 'tools',
    name: 'Form F Clause Generator',
    ar: 'مولد بنود نموذج F',
    title: 'RERA Form F (Contract F) Special Condition Drafts',
    capsule: 'Generate illustrative draft clauses for RERA Form F covering bank valuation, Final Offer Letter timelines and security deposit cheque handling to review with your licensed conveyancer or legal adviser.',
    method: [
      'Drafts a valuation and Final Offer Letter condition using the minimum valuation and timeframe you select.',
      'Includes seller mortgage clearance and administrative extension wording where applicable.',
      'Draft template for discussion only—always have a qualified UAE legal professional or licensed conveyancer review contract terms before signing.',
    ],
  },
  {
    slug: 'life-insurance-assignment-audit',
    base: 'tools',
    name: 'Life Insurance Quote Comparison',
    ar: 'مقارنة عروض التأمين على الحياة',
    title: 'Decreasing-Term Mortgage Life Cover Comparison Tool',
    capsule: 'Compare two annual life-cover or Takaful premium rates across an amortising mortgage balance using the written quotes provided by your lender and insurer.',
    method: [
      'Tracks the reducing principal balance across each year of your selected loan term.',
      'Applies the two annual percentage rates you enter from your written insurance quotes.',
      'Whether an external policy can be assigned depends on each bank’s current credit policy and must be confirmed in writing.',
    ],
  },
  {
    slug: 'transfer-day-cheque-calculator',
    base: 'tools',
    name: 'Transfer-Day Cheque Splitter',
    ar: 'حاسبة شيكات يوم النقل',
    title: 'DLD Trustee Transfer-Day Manager’s Cheque Planner',
    capsule: 'Plan the indicative manager’s cheque breakdown for seller payoff, net seller proceeds, Dubai Land Department fees and trustee registration ahead of completion.',
    method: [
      'Allocates the seller’s bank payoff amount from the official liability letter and net balance to the seller after the agreed deposit.',
      'Calculates standard Dubai Land Department 4% transfer fee plus AED 580 and 0.25% mortgage registration plus AED 290.',
      'Always verify exact payee names and final dirham amounts with your bank, conveyancer and DLD trustee office prior to transfer.',
    ],
  },
];

export const toolBy = (slug: string) => TOOLS.find((t) => t.slug === slug);
export const toolHref = (t: ToolMeta) => `/${t.base}/${t.slug}`;
export const AR_CALCS = ['mortgage-calculator', 'dbr-borrowing-power', 'fixed-to-revert-analyzer', 'buyout-refinance-savings', 'handover-equity-release', 'golden-visa-mortgage-calculator', 'rent-vs-buy-dubai', 'overpayment-early-settlement'];
