import { SITE, fullAddress, BENCH } from '@/data/site';
import { PDF_RESOURCES } from '@/data/seo-topics';

export const TRENDING_UAE_KEYWORDS: string[] = [
  'Dubai mortgage broker',
  'UAE mortgage calculator',
  'Dubai home loan rates 2026',
  'CBUAE EIBOR live tracker',
  'DLD 4% fee calculator Dubai',
  'Dubai mortgage pre-approval',
  'Islamic home finance UAE',
  'non-resident mortgage Dubai',
  'Golden Visa AED 2M mortgage',
  'Dubai off-plan handover mortgage',
  'UAE mortgage refinance buyout',
  '50% CBUAE DBR calculator',
  'Betterway Mortgages Dubai',
  'SWK Properties UAE mortgage partner',
];

/** Complete Organization + FinancialService + LocalBusiness + GeoCoordinates + OfferCatalog JSON-LD */
export function enhancedOrgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['FinancialService', 'LocalBusiness', 'Organization'],
    '@id': `${SITE.url}/#org`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE.url}/brand/logo-light-4k.png`,
      width: 3200,
      height: 962,
    },
    image: `${SITE.url}/og.png`,
    description:
      'Independent Dubai & UAE mortgage advisory comparing 24 licensed conventional and Islamic lenders under Central Bank of the UAE (CBUAE) and Dubai Land Department (DLD) rules.',
    ...(SITE.phone ? { telephone: SITE.phone } : {}),
    email: SITE.email,
    priceRange: 'AED',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE.address.building}, ${SITE.address.plot}, ${SITE.address.street}`,
      addressLocality: SITE.address.district,
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.2361,
      longitude: 55.3084,
    },
    areaServed: [
      'Dubai',
      'Abu Dhabi',
      'Sharjah',
      'Ras Al Khaimah',
      'Ajman',
      'Umm Al Quwain',
      'Fujairah',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    knowsAbout: [
      'UAE Residential Mortgages',
      'Central Bank of the UAE Mortgage Loan Regulations',
      'CBUAE EIBOR Benchmark Rates',
      'Dubai Land Department Transfer & Mortgage Registration Fees',
      'Islamic Home Finance (Ijara & Murabaha)',
      'Non-Resident Dubai Property Financing',
      'UAE 10-Year Golden Visa Mortgaged Property Eligibility',
      'Off-Plan Handover Mortgage Financing',
    ],
    sameAs: ['https://swkpropertiesuae.com', SITE.osUrl],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'UAE Mortgage Advisory & Digital Tools',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'LoanOrCredit',
            name: 'UAE First-Home Resident Mortgage Comparison (24 Banks)',
            description: `Up to ${BENCH.expatFirstHomeLtv}% Expat LTV / ${BENCH.nationalFirstHomeLtv}% UAE National LTV up to AED 5M under CBUAE regulations.`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'LoanOrCredit',
            name: 'UAE Mortgage Buyout & Post-Fixed EIBOR Revert Audit',
            description: 'Refinance break-even analysis respecting the CBUAE 1% / AED 10,000 early settlement cap.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'LoanOrCredit',
            name: 'Non-Resident & AED 2M Golden Visa Dubai Property Finance',
            description: 'International buyer documentation and DLD/NOC planning across 25 jurisdictions.',
          },
        },
      ],
    },
    founder: {
      '@type': 'Person',
      name: 'Warda Kapadia',
      jobTitle: 'Founder & Managing Director',
    },
    employee: [
      {
        '@type': 'Person',
        name: 'Warda Kapadia',
        jobTitle: 'Founder & Managing Director',
      },
      {
        '@type': 'Person',
        name: 'Shabib Siraj',
        jobTitle: 'Executive Director',
        description:
          '15+ years of banking in-house experience across world-class banks and 8+ years as a Personal Investment Advisor handling HNWI for UAE Real Estate.',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: SITE.email,
      areaServed: 'AE',
      availableLanguage: ['English', 'Arabic', 'Russian', 'Chinese', 'French', 'Spanish'],
    },
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Office Address',
      value: fullAddress,
    },
  };
}

/** WebSite + SearchAction JSON-LD for Google Sitelinks & AI Search Engine discovery */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    alternateName: ['Betterway Mortgages Dubai', 'بيترواي للتمويل العقاري'],
    inLanguage: ['en-AE', 'ar-AE', 'ru', 'zh-Hans', 'fr', 'es'],
    publisher: { '@id': `${SITE.url}/#org` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/insights?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** SpeakableSpecification + WebPage AEO/Voice Answer Schema */
export function speakablePageSchema(urlPath: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${SITE.url}${urlPath}`,
    name,
    description,
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#org` },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '[data-aeo-answer="true"]'],
    },
  };
}

/** DigitalDocument JSON-LD catalog for all downloadable PDF guides */
export function pdfCatalogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Betterway Mortgages Free UAE PDF Guides & Checklists',
    itemListElement: PDF_RESOURCES.map((pdf, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'DigitalDocument',
        name: pdf.title,
        description: pdf.subtitle,
        encodingFormat: 'application/pdf',
        url: `${SITE.url}${pdf.file}`,
        inLanguage: 'en-AE',
        publisher: { '@id': `${SITE.url}/#org` },
        keywords: pdf.keywords.join(', '),
      },
    })),
  };
}
