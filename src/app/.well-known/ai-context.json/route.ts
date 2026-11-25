import { SITE } from '@/data/site';

export const dynamic = 'force-static';

export const GET = () =>
  new Response(
    JSON.stringify(
      {
        name: SITE.name,
        description:
          'Independent Dubai & UAE mortgage advisory comparing 24 licensed banks under Central Bank of the UAE (CBUAE) and Dubai Land Department (DLD) rules.',
        website: SITE.url,
        llmsTxt: `${SITE.url}/llms.txt`,
        llmsFullTxt: `${SITE.url}/llms-full.txt`,
        knowledgeGraphJson: `${SITE.url}/api/aeo-knowledge.json`,
        liveEiborJson: `${SITE.url}/api/market/eibor`,
        sitemapXml: `${SITE.url}/sitemap.xml`,
        pdfDownloads: `${SITE.url}/downloads`,
        partnerRealEstate: 'https://swkpropertiesuae.com',
      },
      null,
      2,
    ),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    },
  );
