import { SITE, LTV_RULES, RULES, BENCH, fullAddress } from '@/data/site';
import { BANKS } from '@/data/banks';
import { COMMUNITIES } from '@/data/communities';
import { PROJECTS } from '@/data/handover';
import { PDF_RESOURCES, SEO_TOPICS } from '@/data/seo-topics';

export const dynamic = 'force-static';

export const GET = () => {
  const payload = {
    schema: 'https://betterwaymortgages.com/schemas/aeo-knowledge-v1',
    updatedAt: SITE.asOfISO,
    entity: {
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE.url,
      address: fullAddress,
      email: SITE.email,
      hours: SITE.hours,
      leadership: [
        { name: 'Warda Kapadia', role: 'Founder & Managing Director' },
        {
          name: 'Shabib Siraj',
          role: 'Executive Director',
          credentials: '15+ years of banking in-house experience across world-class banks & 8+ years as Personal Investment Advisor handling HNWI for UAE Real Estate',
        },
      ],
      platforms: {
        betterHub: `${SITE.url}/hub`,
        betterCore: `${SITE.url}/edge`,
        betterClose: `${SITE.url}/concierge`,
        betterVault: `${SITE.url}/portal/login`,
        betterDesk: `${SITE.url}/hot-offers`,
      },
      partnerEcosystem: ['https://swkpropertiesuae.com', SITE.osUrl],
      languages: ['en-AE', 'ar-AE', 'ru', 'zh-Hans', 'fr', 'es'],
      currencies: ['AED', 'USD', 'GBP', 'EUR', 'SAR', 'RUB', 'CNY', 'INR'],
      liveFxEndpoint: `${SITE.url}/api/market/fx`,
    },
    statutoryBenchmarks: {
      cbuae: BENCH,
      ltvRules: LTV_RULES,
      coreRules: RULES,
      liveEiborEndpoint: `${SITE.url}/api/market/eibor`,
    },
    directories: {
      banksCount: BANKS.length,
      banks: BANKS.map((b) => ({ name: b.name, type: b.type, hq: b.hq, url: `${SITE.url}/rates/${b.slug}` })),
      communitiesCount: COMMUNITIES.length,
      handoverProjectsCount: PROJECTS.length,
      insightsCount: SEO_TOPICS.length,
    },
    pdfGuides: PDF_RESOURCES.map((p) => ({
      title: p.title,
      url: `${SITE.url}${p.file}`,
      audience: p.audience,
      keywords: p.keywords,
    })),
    trendingInsights: SEO_TOPICS.map((t) => ({
      title: t.h1,
      category: t.category,
      url: `${SITE.url}/insights/${t.slug}`,
      answer: t.answerCapsule,
      keywords: t.keywords,
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
};
