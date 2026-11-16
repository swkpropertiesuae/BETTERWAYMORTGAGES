// Silo 07 — Non-resident country document checklists (/mortgages/non-resident-[slug]).
// Factual home-country tax, employment and credit-bureau documentation examples; lender eligibility and LTV vary by bank.
export type Country = {
  slug: string;
  name: string;
  demonym: string;
  currency: string;
  salaried: string;
  selfEmp: string;
  bureau: string;
  note: string;
};

const c = (
  slug: string,
  name: string,
  demonym: string,
  currency: string,
  salaried: string,
  selfEmp: string,
  bureau: string,
  note: string,
): Country => ({ slug, name, demonym, currency, salaried, selfEmp, bureau, note });

export const COUNTRIES: Country[] = [
  c('uk', 'United Kingdom', 'British', 'GBP', 'HMRC P60, payslips & 6 months UK bank statements', 'SA302, Tax Year Overview & Companies House audited/certified accounts', 'Experian / Equifax / TransUnion UK',
    'Confirm participating UAE non-resident lenders, currency haircut applied to GBP income and notarisation requirements before signing Form F.'),
  c('india', 'India (NRI & Resident)', 'Indian', 'INR', 'Form 16, ITR acknowledgements & 6 months salary bank statements', 'ITR filings & Chartered Accountant-audited financial statements', 'TransUnion CIBIL',
    'Resident Indian buyers should also confirm RBI Liberalised Remittance Scheme (LRS) rules with their authorised dealer bank before remitting deposit funds.'),
  c('saudi-arabia', 'Saudi Arabia', 'Saudi', 'SAR', 'Employer salary letter, GOSI record & 6 months bank statements', 'Commercial Registration (CR) & SOCPA-audited financial statements', 'SIMAH',
    'SAR is USD-pegged; confirm participating UAE banks, GCC property ownership zones and document attestation steps.'),
  c('canada', 'Canada', 'Canadian', 'CAD', 'CRA Notice of Assessment, T4 slips & 6 months pay/bank records', 'T2 corporate returns & CPA-prepared financial statements', 'Equifax / TransUnion Canada',
    'Prepare recent CRA Notices of Assessment alongside six months of personal bank statements showing salary credits.'),
  c('germany', 'Germany & Austria', 'German', 'EUR', 'Lohnsteuerbescheinigung, Steuerbescheid & 6 months payslips/statements', 'Handelsregisterauszug & certified annual financial statements (Bilanz)', 'SCHUFA / KSV1870',
    'Non-English documents typically require certified translation into English or Arabic for UAE bank underwriting.'),
  c('france', 'France & Belgium', 'French', 'EUR', 'Avis d’Imposition, bulletins de salaire & 6 months bank statements', 'Extrait Kbis & certified company financial statements (bilans)', 'Banque de France / NBB',
    'Ensure tax notices and payslips are accompanied by certified English translations where required by the UAE lender.'),
  c('usa', 'United States', 'American', 'USD', 'IRS W-2, Form 1040 tax returns & 6 months bank statements', 'IRS Form 1120 / Schedule K-1 & CPA-reviewed financials', 'Experian / Equifax / TransUnion US',
    'US citizens and tax residents complete FATCA W-9 declarations at UAE bank account opening; not all UAE banks onboard US persons, so confirm lender eligibility first.'),
  c('singapore', 'Singapore', 'Singaporean', 'SGD', 'IRAS Notice of Assessment, CPF contribution history & bank statements', 'ACRA BizFile profile & 2 years audited accounts', 'Credit Bureau Singapore (CBS)',
    'Digital IRAS and CBS extracts make income verification straightforward at participating international and UAE banks.'),
  c('hong-kong', 'Hong Kong', 'Hong Kong', 'HKD', 'IRD Salaries Tax assessment, employer letter & 6 months statements', 'Business Registration Certificate & CPA-audited accounts', 'TransUnion Hong Kong',
    'Confirm participating UAE lenders and international relationship-banking options prior to paying a property deposit.'),
  c('australia', 'Australia', 'Australian', 'AUD', 'ATO Notices of Assessment, payslips & 6 months bank statements', 'ASIC company extract & Chartered Accountant financial statements', 'Equifax AU / Illion / Experian',
    'Download your two most recent ATO Notices of Assessment and credit report before submitting a pre-approval file.'),
  c('switzerland', 'Switzerland', 'Swiss', 'CHF', 'Lohnausweis, cantonal tax assessment & 6 months bank statements', 'ZEFIX commercial register extract & audited accounts', 'ZEK',
    'Documents in German, French or Italian generally require certified translation for UAE mortgage underwriting.'),
  c('netherlands', 'Netherlands', 'Dutch', 'EUR', 'Aanslag Inkomstenbelasting, Jaaropgaaf & 6 months payslips/statements', 'KVK uittreksel & certified annual accounts (jaarrekening)', 'Stichting BKR',
    'Prepare your BKR credit overview and translated tax filings for lender pre-screening.'),
  c('qatar-kuwait', 'Qatar, Kuwait & Bahrain', 'GCC', 'QAR / KWD / BHD', 'Employer salary certificate & 6 months bank statements', 'Commercial Registration, establishment card & audited financials', 'QCB / Ci-Net / Benefit',
    'Confirm participating UAE banks and required ministry or embassy attestations for GCC documents.'),
  c('italy-spain', 'Italy & Spain', 'Italian and Spanish', 'EUR', 'Modello 730 / Dichiarazione (IT) or IRPF (ES) + payslips & statements', 'Visura Camerale / Nota Simple & audited company accounts', 'CRIF (IT) / CIRBE (ES)',
    'Certified English translations of tax returns and company registries are normally requested by UAE credit teams.'),
  c('cis-kazakhstan', 'Kazakhstan & CIS', 'Kazakh and CIS', 'KZT / USD', 'Translated employment contract, tax certificate & bank statements', 'Company charter & IFRS-audited financial statements', 'First Credit Bureau (FCB) / national bureau',
    'Enhanced source-of-funds compliance, certified translations and country-eligibility checks apply—confirm lender appetite before committing to a property.'),
  c('china', 'Mainland China', 'Chinese', 'CNY', 'Individual Income Tax (IIT) record, employer letter & bank statements', 'Business licence & CPA-audited financial statements', 'PBOC Credit Reference Center',
    'Plan cross-border remittance compliance and certified translations well ahead of signing any purchase agreement.'),
  c('turkey', 'Turkey', 'Turkish', 'TRY', 'SGK employment statement, tax record & 6 months bank statements', 'Vergi Levhası, trade registry & audited financial statements', 'KKB / Findeks',
    'Confirm how participating UAE lenders assess local-currency vs foreign-currency income streams before applying.'),
  c('egypt', 'Egypt', 'Egyptian', 'EGP', 'Employer certificate, HR/tax confirmation & 6 months bank statements', 'Commercial register, tax card & audited financial statements', 'I-Score',
    'Lenders apply strict currency buffers and source-of-funds checks; confirm country and currency eligibility upfront.'),
  c('pakistan', 'Pakistan', 'Pakistani', 'PKR', 'FBR tax returns, employer letter & 6 months bank statements', 'NTN certificate, SECP/registrar filings & audited accounts', 'eCIB / Tasdeeq',
    'Verify active-taxpayer documentation, international remittance rules and participating UAE lender criteria before signing Form F.'),
  c('lebanon-and-jordan', 'Lebanon & Jordan', 'Lebanese and Jordanian', 'JOD / USD', 'Employer salary certificate & 6 months bank statements', 'Commercial registration & 2 years audited financial statements', 'CRIF Jordan / relevant bureau',
    'Country and currency eligibility vary substantially across UAE banks—obtain written pre-screening before paying a deposit.'),
  c('south-africa', 'South Africa', 'South African', 'ZAR', 'SARS IRP5, ITA34 assessment & 6 months payslips/bank statements', 'CIPC registration & 2 years signed financial statements', 'TransUnion / Experian SA',
    'Account for South African Reserve Bank (SARB) foreign investment allowance approvals when timing your deposit transfer.'),
  c('nigeria-and-kenya', 'Nigeria & Kenya', 'Nigerian and Kenyan', 'NGN / KES', 'Employer confirmation, tax clearance certificate & bank statements', 'CAC / BRS corporate filings & 2 years audited accounts', 'CRC / Metropol / TransUnion',
    'Only selected UAE financiers consider applications from these jurisdictions; confirm country, employer and currency eligibility first.'),
  c('sweden-norway-denmark', 'Sweden, Norway & Denmark', 'Nordic', 'SEK / NOK / DKK', 'Annual tax agency assessment, payslips & 6 months bank statements', 'Company registry extract & 2 years audited annual reports', 'UC / Experian / Bisnode',
    'Provide English-translated tax assessments and bank statements for UAE lender review.'),
  c('poland-and-central-europe', 'Poland & Central Europe', 'Central European', 'PLN / CZK / EUR', 'PIT tax filings, employment contract & 6 months bank statements', 'KRS / CEIDG extract & 2 years financial statements', 'BIK / BRKI',
    'Certified English translations of tax and corporate filings are required during underwriting.'),
  c('brazil-and-latin-america', 'Brazil & Latin America', 'Brazilian and Latin American', 'BRL / MXN / USD', 'IRPF tax declaration, payslips & 6 months bank statements', 'CNPJ / corporate registry & 2 years audited accounts', 'Serasa Experian / Buró de Crédito',
    'Confirm country eligibility, currency haircuts and apostille/legalisation steps with the lender prior to entering a sale contract.'),
];
