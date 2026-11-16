// 24-bank UAE mortgage directory — factual institutional profiles without unverified hardcoded rate cards.

export type Bank = {
  slug: string; // /rates/[slug]
  key: string; // short id used by compare pages
  logo: string; // /banks/<key>.(svg|png)
  name: string;
  short: string;
  ar: string;
  type: 'Islamic' | 'Conventional' | 'Dual';
  hq: string;
  note: string;
};

const PNG_BANK_KEYS = new Set(['sib', 'dib', 'emirates-islamic', 'mashreq', 'ajman', 'nbf', 'al-hilal', 'invest-bank', 'cbi']);

const b = (
  slug: string,
  key: string,
  name: string,
  short: string,
  ar: string,
  type: Bank['type'],
  hq: string,
  note: string,
): Bank => ({
  slug,
  key,
  logo: `/banks/${key}.${PNG_BANK_KEYS.has(key) ? 'png' : 'svg'}`,
  name,
  short,
  ar,
  type,
  hq,
  note,
});

export const BANKS: Bank[] = [
  b('sharjah-islamic-bank-mortgage', 'sib', 'Sharjah Islamic Bank', 'SIB', 'مصرف الشارقة الإسلامي', 'Islamic', 'Sharjah',
    'Sharia-compliant home finance provider headquartered in Sharjah offering Ijara and Murabaha residential structures.'),
  b('emirates-nbd-mortgage', 'emirates-nbd', 'Emirates NBD', 'ENBD', 'بنك الإمارات دبي الوطني', 'Conventional', 'Dubai',
    'Major Dubai-headquartered banking group offering residential, handover and private-client home loans across UAE freehold zones.'),
  b('united-arab-bank-mortgage', 'uab', 'United Arab Bank', 'UAB', 'البنك العربي المتحد', 'Conventional', 'Sharjah',
    'Sharjah-headquartered commercial bank providing conventional residential mortgage facilities for UAE borrowers.'),
  b('first-abu-dhabi-bank-fab-mortgage', 'fab', 'First Abu Dhabi Bank', 'FAB', 'بنك أبوظبي الأول', 'Conventional', 'Abu Dhabi',
    'UAE’s largest banking group by assets, offering conventional and Islamic-window home finance across Abu Dhabi, Dubai and other emirates.'),
  b('abu-dhabi-islamic-bank-adib-mortgage', 'adib', 'Abu Dhabi Islamic Bank', 'ADIB', 'مصرف أبوظبي الإسلامي', 'Islamic', 'Abu Dhabi',
    'Abu Dhabi-based Islamic bank providing Sharia-compliant home finance for ready and eligible off-plan residential properties.'),
  b('hsbc-uae-mortgage', 'hsbc', 'HSBC UAE', 'HSBC', 'إتش إس بي سي الإمارات', 'Conventional', 'Dubai',
    'International retail and wealth lender in the UAE offering conventional residential mortgages for resident and eligible international clients.'),
  b('dubai-islamic-bank-dib-mortgage', 'dib', 'Dubai Islamic Bank', 'DIB', 'بنك دبي الإسلامي', 'Islamic', 'Dubai',
    'Established Dubai Islamic lender offering Sharia-compliant residential home finance across ready, buyout and developer handover properties.'),
  b('adcb-mortgage', 'adcb', 'ADCB', 'ADCB', 'بنك أبوظبي التجاري', 'Conventional', 'Abu Dhabi',
    'Abu Dhabi Commercial Bank provides conventional and Islamic residential property finance across Abu Dhabi, Dubai and Northern Emirates.'),
  b('standard-chartered-uae-mortgage', 'standard-chartered', 'Standard Chartered UAE', 'SC', 'ستاندرد تشارترد الإمارات', 'Conventional', 'Dubai',
    'International banking group active in UAE residential mortgages and priority-banking home finance.'),
  b('emirates-islamic-bank-mortgage', 'emirates-islamic', 'Emirates Islamic', 'EI', 'الإمارات الإسلامي', 'Islamic', 'Dubai',
    'Islamic banking arm of the Emirates NBD Group offering Sharia-compliant home finance across Dubai and the wider UAE.'),
  b('commercial-bank-of-dubai-cbd-mortgage', 'cbd', 'Commercial Bank of Dubai', 'CBD', 'بنك دبي التجاري', 'Conventional', 'Dubai',
    'Dubai-headquartered bank providing conventional and Islamic residential mortgages for salaried, business-owner and eligible overseas buyers.'),
  b('rakbank-mortgage', 'rakbank', 'RAKBANK', 'RAKBANK', 'بنك رأس الخيمة الوطني', 'Dual', 'Ras Al Khaimah',
    'National Bank of Ras Al Khaimah offering conventional and Islamic home finance options for salaried and self-employed applicants.'),
  b('mashreq-bank-mortgage', 'mashreq', 'Mashreq Bank', 'Mashreq', 'بنك المشرق', 'Dual', 'Dubai',
    'Dubai-based financial institution offering conventional and Islamic home loans for UAE residents and eligible non-resident buyers.'),
  b('ajman-bank-mortgage', 'ajman', 'Ajman Bank', 'Ajman', 'مصرف عجمان', 'Islamic', 'Ajman',
    'Sharia-compliant bank headquartered in Ajman providing Islamic home finance across UAE residential communities.'),
  b('national-bank-of-fujairah-nbf-mortgage', 'nbf', 'National Bank of Fujairah', 'NBF', 'بنك الفجيرة الوطني', 'Conventional', 'Fujairah',
    'Corporate and retail bank offering residential mortgage solutions for salaried and business-owner clients in the UAE.'),
  b('arab-bank-uae-mortgage', 'arab-bank', 'Arab Bank UAE', 'Arab Bank', 'البنك العربي', 'Conventional', 'Dubai',
    'Regional banking network operating across the UAE with residential mortgage products for residents and regional clients.'),
  b('rakislamic-mortgage', 'rakislamic', 'RAKislamic', 'RAKislamic', 'راك الإسلامي', 'Islamic', 'Ras Al Khaimah',
    'Islamic banking division of RAKBANK offering Sharia-compliant residential home finance structures.'),
  b('al-hilal-bank-mortgage', 'al-hilal', 'Al Hilal Bank', 'Al Hilal', 'مصرف الهلال', 'Islamic', 'Abu Dhabi',
    'Abu Dhabi Islamic retail bank (ADCB Group) offering Sharia-compliant home finance for UAE Nationals and residents.'),
  b('nbq-umm-al-qaiwain-mortgage', 'nbq', 'National Bank of Umm Al Qaiwain', 'NBQ', 'بنك أم القيوين الوطني', 'Conventional', 'Umm Al Quwain',
    'Umm Al Quwain-headquartered commercial bank providing residential property loans in the UAE.'),
  b('citibank-uae-mortgage', 'citi', 'Citibank UAE', 'Citi', 'سيتي بنك الإمارات', 'Conventional', 'Dubai',
    'Global retail and wealth bank offering UAE residential mortgages and refinancing options, particularly for relationship clients.'),
  b('bank-of-baroda-uae-mortgage', 'bank-of-baroda', 'Bank of Baroda UAE', 'BoB', 'بنك بارودا', 'Conventional', 'Dubai',
    'International bank with UAE branches offering residential home loans for UAE residents and eligible NRI applicants.'),
  b('invest-bank-mortgage', 'invest-bank', 'Invest Bank', 'Invest Bank', 'بنك الاستثمار', 'Conventional', 'Sharjah',
    'Sharjah-based commercial bank providing retail and corporate banking facilities including residential mortgages.'),
  b('cbi-commercial-bank-international-mortgage', 'cbi', 'Commercial Bank International', 'CBI', 'البنك التجاري الدولي', 'Conventional', 'Dubai',
    'Dubai-operated commercial bank offering conventional home loans and refinancing for UAE borrowers.'),
  b('amlak-finance-mortgage', 'amlak', 'Amlak Finance', 'Amlak', 'أملاك للتمويل', 'Islamic', 'Dubai',
    'Specialised Dubai Islamic real-estate financier offering Sharia-compliant property finance solutions.'),
];

export const bankBy = (key: string) => BANKS.find((x) => x.key === key || x.slug === key);
