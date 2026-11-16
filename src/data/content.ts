// Silos 08, 09, 10 — affordability brackets, advisory desk, cornerstone guides.
import type { Faq } from './products';

export type Afford = { slug: string; kind: 'salary' | 'price'; amount: number; title: string; plus?: boolean; golden?: boolean };

export const AFFORD: Afford[] = [
  { slug: '15000-aed-salary-mortgage-dubai', kind: 'salary', amount: 15000, title: 'UAE Mortgage Planning on a AED 15,000 Monthly Salary' },
  { slug: '20000-aed-salary-mortgage-dubai', kind: 'salary', amount: 20000, title: 'UAE Mortgage Planning on a AED 20,000 Monthly Salary' },
  { slug: '25000-aed-salary-mortgage-dubai', kind: 'salary', amount: 25000, title: 'UAE Mortgage Planning on a AED 25,000 Monthly Salary' },
  { slug: '30000-aed-salary-mortgage-dubai', kind: 'salary', amount: 30000, title: 'UAE Mortgage Planning on a AED 30,000 Monthly Salary' },
  { slug: '40000-aed-salary-mortgage-dubai', kind: 'salary', amount: 40000, title: 'UAE Mortgage Planning on a AED 40,000 Monthly Salary' },
  { slug: '50000-aed-salary-mortgage-dubai', kind: 'salary', amount: 50000, title: 'UAE Mortgage Planning on a AED 50,000 Monthly Salary' },
  { slug: '75000-aed-salary-mortgage-dubai', kind: 'salary', amount: 75000, title: 'UAE Mortgage Planning on a AED 75,000 Monthly Salary' },
  { slug: '100000-aed-plus-salary-mortgage-dubai', kind: 'salary', amount: 100000, plus: true, title: 'Mortgages for AED 100,000+ Monthly Salaries in Dubai' },
  { slug: '1-million-aed-property-mortgage-upfront-costs', kind: 'price', amount: 1_000_000, title: 'Buying a AED 1 Million Property in Dubai: Deposit & DLD Costs' },
  { slug: '1-5-million-aed-property-mortgage-upfront-costs', kind: 'price', amount: 1_500_000, title: 'Buying a AED 1.5 Million Property in Dubai: Deposit & DLD Costs' },
  { slug: '2-million-aed-golden-visa-property-mortgage', kind: 'price', amount: 2_000_000, golden: true, title: 'AED 2 Million Property Purchase: Mortgage & DLD Costs' },
  { slug: '3-million-aed-villa-mortgage-upfront-costs', kind: 'price', amount: 3_000_000, title: 'Buying a AED 3 Million Villa in Dubai: Deposit & DLD Costs' },
  { slug: '5-million-aed-ltv-threshold-mortgage', kind: 'price', amount: 5_000_000, title: 'AED 5 Million: The CBUAE LTV Threshold Explained' },
  { slug: '10-million-aed-luxury-villa-mortgage', kind: 'price', amount: 10_000_000, title: 'Financing a AED 10 Million Villa in Dubai' },
  { slug: '20-million-aed-plus-mansion-mortgage', kind: 'price', amount: 20_000_000, plus: true, title: 'Financing a AED 20 Million+ Residence in Dubai' },
];

export type Advisory = { slug: string; name: string; title: string; capsule: string; points: string[]; faqs: Faq[] };

export const ADVISORY: Advisory[] = [
  {
    slug: 'commercial-property-finance',
    name: 'Commercial Property Finance',
    title: 'Commercial Property Finance in the UAE: Offices, Warehouses & Retail',
    capsule: 'Betterway advises corporate and investor borrowers on commercial property acquisition and refinancing across offices, warehouses, retail and income-producing assets, subject to lender credit policy, property valuation and debt-service coverage.',
    points: ['Owner-occupied and leased commercial premises', 'Corporate and SPV borrowing structures', 'Rental-income and operating cash-flow assessment', 'Independent RERA/RICS commercial valuation requirements', 'Written confirmation of lender LTV, tenure and fees'],
    faqs: [{ q: 'Can a UAE company apply for commercial property finance?', a: 'Yes—commercial property loans are commonly structured through an operating company or SPV, often supported by shareholder guarantees depending on the bank.' }],
  },
  {
    slug: 'sme-and-corporate-lending',
    name: 'SME & Corporate Lending',
    title: 'SME & Corporate Lending Support for UAE Business Owners',
    capsule: 'Business owners often need personal residential mortgage applications and corporate credit lines planned in sequence. We help prepare financial documentation so personal Debt Burden Ratio rules and corporate liabilities are reviewed clearly.',
    points: ['Personal DBR review alongside guaranteed company debt', 'Preparation of audited financial statements', 'Owner-occupied commercial premises guidance', 'Sequencing residential and corporate applications', 'Lender eligibility check by trade-licence jurisdiction'],
    faqs: [{ q: 'Do business loans affect my personal mortgage?', a: 'Personally guaranteed business facilities can be counted in your personal credit bureau assessment; confirm how each lender treats them before applying.' }],
  },
  {
    slug: 'rera-conveyancing-services',
    name: 'RERA Conveyancing',
    title: 'Property Transfer & Conveyancing Coordination in Dubai',
    capsule: 'A mortgaged property transfer in Dubai involves seller clearance, developer NOCs, bank Final Offer Letters, manager’s cheques and a DLD trustee appointment. Coordinating timelines early reduces the risk of contract expiry.',
    points: ['Form F timeline and condition planning', 'Developer NOC document checklist', 'Seller bank liability letter coordination', 'Manager’s cheque payee verification', 'DLD trustee appointment preparation'],
    faqs: [{ q: 'Is independent conveyancing mandatory?', a: 'While not mandatory by law, professional conveyancing or legal review is advisable—especially on mortgage-to-mortgage transfers involving two banks.' }],
  },
  {
    slug: 'difc-wills-and-estate-planning',
    name: 'DIFC Wills & Estate Planning',
    title: 'Wills & Estate Planning Considerations for Mortgaged UAE Property',
    capsule: 'Property owners in the UAE often review succession arrangements—such as registering a will with the DIFC Courts Wills Service or Abu Dhabi Judicial Department—alongside mortgage life cover. Consult a licensed legal practitioner for estate advice.',
    points: ['Succession planning for solo and joint owners', 'Single-property and full-estate registration options', 'Alignment with mortgage life or Takaful cover', 'Referral to licensed UAE legal practitioners', 'Document preparation checklist'],
    faqs: [{ q: 'Does Betterway draft legal wills?', a: 'No—estate planning and will drafting must be performed by a qualified legal practitioner or registered wills service.' }],
  },
  {
    slug: 'external-mortgage-life-insurance',
    name: 'External Mortgage Life Insurance',
    title: 'Mortgage Life Cover & Takaful Policy Assignment Explained',
    capsule: 'UAE lenders require life or Takaful protection on residential mortgages. Depending on the bank’s credit policy, borrowers may either use the bank’s group scheme or request permission to assign an external decreasing-term policy.',
    points: ['Reviewing bank-bundled vs external policy terms', 'Confirming whether a lender accepts policy assignment', 'Decreasing-term vs level cover structures', 'Conventional life and Sharia-compliant Takaful options', 'Comparing written policy schedules and exclusions'],
    faqs: [{ q: 'Do all UAE banks accept an external life policy?', a: 'No—acceptance depends on each bank’s current policy and approved insurer list. Always confirm in writing before purchasing an external policy.' }],
  },
  {
    slug: 'wholesale-fx-currency-exchange',
    name: 'Currency & Remittance Planning',
    title: 'Foreign Currency & Down-Payment Transfer Planning for Overseas Buyers',
    capsule: 'Overseas buyers funding deposits and DLD completion charges from abroad must plan international remittance timing, proof-of-funds trails and currency conversion spreads ahead of their trustee appointment.',
    points: ['Source-of-funds documentation for UAE compliance', 'Planning transfer lead times before completion', 'Comparing bank vs regulated FX provider quotes', 'Aligning currency transfers with Form F milestones', 'Setting up a UAE account for monthly instalments'],
    faqs: [{ q: 'Can I pay the seller directly from an overseas account?', a: 'Dubai trustee transfers require UAE dirham manager’s cheques issued locally; confirm the exact settlement route with your bank and conveyancer well in advance.' }],
  },
  {
    slug: 'remote-power-of-attorney-closing',
    name: 'Remote Power of Attorney Closing',
    title: 'Closing a UAE Mortgage via Power of Attorney',
    capsule: 'Buyers who cannot attend transfer day in person may appoint an attorney under a duly notarised Power of Attorney, provided both the lending bank and the land registry accept the specific PoA wording and validity period.',
    points: ['Confirming lender-approved PoA clauses in advance', 'Dubai Courts / UAE notary and legalisation requirements', 'Specific borrowing and mortgage-registration powers', 'Validity-period rules at DLD trustee offices', 'Original document custody for transfer day'],
    faqs: [{ q: 'Will any general Power of Attorney work for a mortgage?', a: 'Usually not—most banks require explicit borrowing and mortgage-registration clauses pre-approved by their legal department before completion.' }],
  },
  {
    slug: 'property-valuation-appeal-desk',
    name: 'Property Valuation Review',
    title: 'Understanding Bank Property Valuations in the UAE',
    capsule: 'Every UAE mortgage requires an independent valuation instructed by the lending bank. Because the bank lends against the lower of purchase price or valuation, buyers should prepare recent comparable sales and protective contract clauses.',
    points: ['How bank-panel valuers assess residential units', 'Preparing comparable registered DLD transaction data', 'Understanding lender valuation-review procedures', 'Including valuation contingencies in Form F', 'Planning deposit buffer in case of a shortfall'],
    faqs: [{ q: 'Does a valuation appeal guarantee a higher figure?', a: 'No—valuers act independently for the bank, and there is no guarantee an assessment will be revised.' }],
  },
];

export type Guide = { slug: string; title: string; capsule: string; steps: { h: string; p: string }[]; faqs: Faq[]; tool?: string };

export const GUIDES: Guide[] = [
  {
    slug: 'dubai-form-f-mortgage-valuation-protection-clause',
    tool: 'form-f-clause-generator',
    title: 'Dubai Form F Mortgage & Valuation Clauses: Buyer Guide',
    capsule: 'RERA Form F (Contract F) governs secondary-market property sales in Dubai. Mortgage buyers commonly ask their licensed conveyancer or legal adviser to include written conditions covering bank valuation and Final Offer Letter issuance.',
    steps: [
      { h: 'Valuation & Final Offer Letter condition', p: 'Discuss making the agreement subject to obtaining a bank valuation and written Final Offer Letter within an agreed number of calendar days, with clear deposit-return terms if finance is declined.' },
      { h: 'Seller mortgage & administrative timeline', p: 'Where the property is already mortgaged, coordinate the seller’s bank liability letter and developer NOC windows so the contract does not lapse during bank processing.' },
      { h: 'Security deposit cheque handling', p: 'Confirm in writing how the stakeholder brokerage holds the security deposit cheque prior to DLD transfer, and have a licensed legal professional review all special conditions.' },
    ],
    faqs: [{ q: 'Are draft clauses a substitute for legal advice?', a: 'No—both buyer and seller must agree to contract terms, and a qualified UAE legal adviser or RERA-licensed practitioner should review Form F before signing.' }],
  },
  {
    slug: 'how-credit-card-limits-reduce-uae-mortgage-dbr',
    tool: 'dbr-borrowing-power',
    title: 'How Credit Card Limits Affect Your UAE Mortgage DBR',
    capsule: 'Under the UAE Central Bank 50% Debt Burden Ratio cap, banks include existing loan repayments plus a percentage of your total active credit card limits—even when card balances are paid in full each month.',
    steps: [
      { h: 'The 50% CBUAE rule', p: 'Total monthly debt obligations, including your proposed mortgage instalment, cannot exceed 50% of gross eligible monthly income.' },
      { h: 'Review your Al Etihad Credit Bureau report', p: 'Check every active credit card and facility limit appearing on your AECB report before submitting a mortgage application, as closed cards can take several weeks to update.' },
      { h: 'Confirm each lender’s card-limit policy', p: 'Lenders assess a monthly percentage of total approved credit card limits when calculating DBR; ask your bank or adviser how your limits will be treated.' },
    ],
    faqs: [{ q: 'Does a zero-balance credit card still count?', a: 'Yes—UAE banks assess the approved credit limit as potential liability, not just the current statement balance.' }],
  },
  {
    slug: 'mortgage-to-mortgage-transfer-seller-liability-letter',
    title: 'Mortgage-to-Mortgage Transfers: The Seller Liability Letter Explained',
    capsule: 'When buying a property that already has a mortgage, the seller’s bank issues an official liability letter stating the payoff figure and validity window so the buyer’s bank can prepare settlement cheques.',
    steps: [
      { h: 'Sequence of milestones', p: 'Buyer Final Offer Letter → seller requests liability letter → developer NOC → buyer’s bank prepares manager’s cheques → DLD trustee transfer.' },
      { h: 'Managing validity windows', p: 'Liability letters carry a strict expiry window set by the issuing bank; NOC and cheque issuance should be aligned so the letter does not expire before transfer.' },
    ],
    faqs: [{ q: 'What happens if a liability letter expires before transfer?', a: 'The seller must request an updated liability letter from their bank, which can delay completion and require revised cheque figures.' }],
  },
  {
    slug: '3-year-clawback-clause-on-uae-mortgage-buyouts',
    tool: 'buyout-refinance-savings',
    title: 'Understanding Fee Clawback Clauses on UAE Mortgage Buyouts',
    capsule: 'Alongside the UAE Central Bank early-settlement fee cap, some mortgage offers include contractual clawback terms if the bank waived upfront fees or provided incentives and the loan is closed within an agreed period.',
    steps: [
      { h: 'Check your Final Offer Letter', p: 'Review both the statutory CBUAE early-settlement fee cap (1% of balance or AED 10,000, whichever is lower, plus VAT) and any incentive-recovery schedule in your contract.' },
      { h: 'Compare total switching cost', p: 'Include exit fees, DLD mortgage re-registration (0.25% + AED 290), valuation, processing fees and any contractual clawback before refinancing.' },
    ],
    faqs: [{ q: 'Are incentive clawbacks separate from the CBUAE early-settlement cap?', a: 'Check your written Final Offer Letter carefully and request an official payoff breakdown from your current bank before committing to switch.' }],
  },
  {
    slug: 'how-uae-banks-assess-bonuses-commissions-and-rental-income',
    title: 'How UAE Banks Assess Bonuses, Commissions and Rental Income',
    capsule: 'While fixed monthly salary and guaranteed allowances form the core of salaried mortgage underwriting, UAE banks apply lender-specific haircuts and track-record rules to variable bonuses, commissions and rental income.',
    steps: [
      { h: 'Annual bonuses', p: 'Banks typically request multi-year bonus history evidenced on salary certificates and bank statements, counting an averaged portion per policy.' },
      { h: 'Sales commissions', p: 'Consistent monthly or quarterly commission credits over 6–12+ months are reviewed against employer category and bank caps.' },
      { h: 'Registered rental income', p: 'Leased UAE property usually requires active Ejari/Tawtheeq registration, title deed proof and bank statements showing rent credits.' },
    ],
    faqs: [{ q: 'Do all banks treat variable pay the same way?', a: 'No—each UAE bank sets its own income-averaging and haircut rules, which must be confirmed during pre-approval.' }],
  },
  {
    slug: 'aecb-credit-score-minimum-for-uae-mortgage',
    title: 'Preparing Your AECB Credit Profile for a UAE Mortgage',
    capsule: 'UAE banks review your Al Etihad Credit Bureau (AECB) report and score as part of every resident mortgage assessment, checking payment history, credit utilisation, active limits and any returned cheques.',
    steps: [
      { h: 'Check your report early', p: 'Download your AECB report before house-hunting so any outdated limits, closed loans or administrative discrepancies can be resolved with the reporting institution.' },
      { h: 'Maintain clean repayment conduct', p: 'Avoid late card or loan payments, keep card utilisation conservative and avoid taking new personal credit ahead of a mortgage application.' },
    ],
    faqs: [{ q: 'How are non-resident applicants checked if they have no UAE credit history?', a: 'Lenders that offer non-resident mortgages typically request an official credit bureau report from the applicant’s country of residence.' }],
  },
  {
    slug: 'joint-mortgage-dubai-husband-wife-co-borrowers',
    title: 'Joint Mortgages in Dubai: Spouses & Co-Borrowers',
    capsule: 'Co-borrowers—most commonly spouses or immediate family members—can apply jointly with participating UAE banks to combine eligible income, with all borrowers’ debts assessed together under the 50% DBR rule.',
    steps: [
      { h: 'Eligible co-borrower relationships', p: 'Spouses and first-degree relatives are widely considered; unrelated co-buyers are accepted by fewer lenders and should be confirmed upfront.' },
      { h: 'Combined DBR & age-at-maturity rules', p: 'Banks combine both incomes and liabilities under the 50% DBR cap, and maximum loan tenure is typically tied to the older applicant’s age at maturity.' },
    ],
    faqs: [{ q: 'Must all co-borrowers be on the title deed?', a: 'Requirements vary by bank—some require every co-borrower on title, while others permit specific guarantor structures for spouses.' }],
  },
  {
    slug: 'buying-out-developer-post-handover-payment-plan',
    tool: 'handover-equity-release',
    title: 'Refinancing a Developer Post-Handover Payment Plan',
    capsule: 'Buyers on a developer post-handover payment plan may apply for a residential mortgage to settle the remaining developer balance once completion and title criteria are met, spreading repayments over a longer bank tenure.',
    steps: [
      { h: 'Obtain the developer statement', p: 'Request an official statement confirming the outstanding balance and title/NOC procedure upon settlement.' },
      { h: 'Compare total borrowing cost', p: 'Weigh interest/profit charges, valuation, bank processing and DLD mortgage registration fees against remaining interest-free developer instalments.' },
    ],
    faqs: [{ q: 'Is the 4% DLD transfer fee payable again?', a: 'Where Oqood or title registration was already paid on your purchase, confirm with DLD and your conveyancer that only mortgage registration and title issuance fees apply.' }],
  },
  {
    slug: 'bank-noc-for-dubai-golden-visa-step-by-step',
    tool: 'golden-visa-mortgage-calculator',
    title: 'Mortgaged Property & UAE Golden Visa Applications: Key Steps',
    capsule: 'Applying for a real-estate investor residency visa on a mortgaged property is a separate government process from your home loan and typically requires a bank No Objection Certificate alongside DLD and immigration documentation.',
    steps: [
      { h: 'Verify current DLD & ICP/GDRFA rules', p: 'Confirm current minimum property value, paid-equity or valuation criteria and official government fee schedules directly with Dubai Land Department and immigration authorities.' },
      { h: 'Request your lender’s NOC', p: 'Contact your mortgage bank to confirm its requirements, processing time and any administrative charge for issuing a residency NOC.' },
    ],
    faqs: [{ q: 'Does a mortgage broker issue or guarantee residency visas?', a: 'No—residency eligibility and approvals are determined exclusively by DLD and UAE federal/emirate immigration authorities.' }],
  },
  {
    slug: 'complete-dld-trustee-transfer-day-checklist',
    tool: 'transfer-day-cheque-calculator',
    title: 'Complete DLD Trustee Transfer-Day Checklist',
    capsule: 'Completion at a Dubai Land Department Real Estate Registration Trustee office requires original identification, developer NOC, bank Final Offer Letter and verified manager’s cheques matching agreed payee figures.',
    steps: [
      { h: 'Advance verification', p: 'Confirm exact cheque payees and amounts with your bank, conveyancer and trustee office: seller payoff, net seller balance, 4% DLD + AED 580, 0.25% + AED 290 mortgage registration and trustee fee.' },
      { h: 'Originals on transfer day', p: 'Bring original passports, Emirates IDs (where applicable), signed Form F, developer NOC, bank FOL, manager’s cheques and any pre-approved Power of Attorney originals.' },
    ],
    faqs: [{ q: 'How are DLD fees settled at the trustee office?', a: 'Confirm accepted payment methods (manager’s cheque, ePay or card limits) directly with your chosen DLD trustee office ahead of the appointment.' }],
  },
];
