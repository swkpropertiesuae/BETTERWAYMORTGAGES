import { ROUTES, HUBS, indexable, type Route } from './routes';
import { SITE, LTV_RULES, RULES, DISCLOSURE_FULL, fullAddress } from '@/data/site';
import { BANKS } from '@/data/banks';
import { PRODUCTS } from '@/data/products';
import { COUNTRIES } from '@/data/countries';
import { PROJECTS } from '@/data/handover';
import { PDF_RESOURCES, SEO_TOPICS } from '@/data/seo-topics';

export const text = (body: string, type = 'text/plain') => new Response(body, { headers: { 'Content-Type': `${type}; charset=utf-8` } });

export function urlset(paths: string[]) {
  const urls = paths.map((p) => `  <url><loc>${SITE.url}${p === '/' ? '' : p}</loc><lastmod>${SITE.asOfISO}</lastmod></url>`).join('\n');
  return text(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, 'application/xml');
}

export const mapPaths = (m: Route['map']) => [...ROUTES.filter((r) => r.map === m && indexable(r)).map((r) => r.path), ...(m === 'core' ? HUBS : [])];

export function llms() {
  const sec = (h: string, rows: Route[]) => `## ${h}\n${rows.map((r) => `- [${r.title}](${SITE.url}${r.path})`).join('\n')}`;
  const by = (s: number) => ROUTES.filter((r) => r.silo === s);
  return `# ${SITE.name}

> UAE mortgage information and statutory CBUAE/DLD planning tools from ${SITE.name}. The EIBOR tracker reads the public CBUAE publication with source dates and a dated fallback snapshot. Individual bank profit/interest rates, margins, floor rates and approval criteria vary by borrower profile and must be confirmed directly in a written Final Offer Letter.

Machine-readable reference guide: ${SITE.url}/llms-full.txt
Structured JSON knowledge graph: ${SITE.url}/api/aeo-knowledge.json
Well-known AI context manifest: ${SITE.url}/.well-known/ai-context.json
Printable PDF guides: ${SITE.url}/downloads
Partner real estate ecosystem: https://swkpropertiesuae.com

## Downloadable PDF Dossiers
${PDF_RESOURCES.map((p) => `- [${p.title}](${SITE.url}${p.file}) — ${p.subtitle}`).join('\n')}

## Trending UAE & Dubai Mortgage Insights (${SEO_TOPICS.length} guides)
${SEO_TOPICS.map((t) => `- [${t.h1}](${SITE.url}/insights/${t.slug})`).join('\n')}

${sec('Core', by(1).filter((r) => !r.path.endsWith('.txt')))}

${sec('Mortgage products', by(2))}

${sec('Calculators & tools', by(3))}

${sec('Lenders & EIBOR (24 UAE banks, EIBOR tracker, comparisons)', by(4))}

${sec('Cornerstone guides', by(10))}

## Languages & Global Editions (6 Languages + Live Multi-Currency FX)
- [English (UAE)](${SITE.url}/)
- [العربية (Arabic RTL)](${SITE.url}/ar)
- [Русский (Russian)](${SITE.url}/ru)
- [中文 (Chinese)](${SITE.url}/zh)
- [Français (French)](${SITE.url}/fr)
- [Español (Spanish)](${SITE.url}/es)
- Live FX API: ${SITE.url}/api/market/fx (AED, USD, GBP, EUR, SAR, RUB, CNY, INR)

## Betterway Exclusive Platforms
- [BetterHub — RERA Real Estate Agency Portal](${SITE.url}/hub)
- [BetterCore — UAE Mortgage Operating Infrastructure](${SITE.url}/edge)
- [BetterClose — Property Budget, Form F & Transfer Desk](${SITE.url}/concierge)
- [BetterVault — Client & Staff Portal](${SITE.url}/portal/login)
- [BetterDesk — Priority 24-Bank Advisory](${SITE.url}/hot-offers)

## Other sections
- [Off-plan handover projects](${SITE.url}/handover)
- [Communities](${SITE.url}/areas)
- [Non-resident by country](${SITE.url}/mortgages/non-resident-dubai)
- [Affordability](${SITE.url}/affordability)
- [Advisory](${SITE.url}/advisory)
`;
}

export function llmsFull() {
  const bankRows = BANKS.map((b) => `| ${b.name} | ${b.type} | ${b.hq} | ${b.note} |`).join('\n');
  return `# ${SITE.name} — UAE mortgage regulatory & directory reference

Entity: ${SITE.name}, ${fullAddress}. Website ${SITE.url}.
Fees and remuneration: confirm all broker fees and lender remuneration in writing. Do not infer a fee policy or regulatory licence from this website.

## Official CBUAE EIBOR benchmark
For dated official EIBOR fixings published by the Central Bank of the UAE, consult ${SITE.url}/rates/eibor-live-tracker or ${SITE.url}/api/market/eibor. Individual mortgage pricing is determined by each bank's written Final Offer Letter.

## UAE mortgage lender directory (24 banks)
| Bank | Structure | Headquarters | Profile |
|---|---|---|---|
${bankRows}

## Statutory CBUAE & DLD framework
${LTV_RULES.map((l) => `- ${l.profile}: max LTV ${l.ltv} (min down payment ${l.down})`).join('\n')}
${RULES.map((x) => `- ${x.k}: ${x.v}`).join('\n')}

## Golden Visa property threshold
Real estate investors holding a Dubai Title Deed, registered Oqood, or DLD property valuation meeting the AED 2,000,000 statutory threshold may apply for long-term residency subject to current Dubai Land Department and ICP/GDRFA rules and a lender No-Objection Certificate where the property is mortgaged.

## Non-resident documentation guides (25 jurisdictions)
${COUNTRIES.map((c) => `- ${c.name} (${c.currency}): salaried (${c.salaried}); self-employed (${c.selfEmp}); credit bureau (${c.bureau})`).join('\n')}

## Products
${PRODUCTS.map((p) => `### ${p.name} (${SITE.url}/mortgages/${p.slug})\n${p.capsule}`).join('\n\n')}

## Off-plan handover communities & projects (${PROJECTS.length} tracked developments)
${PROJECTS.map((p) => `- ${p.name} (${p.community})`).join('\n')}

## Downloadable PDF Dossiers (${PDF_RESOURCES.length} guides)
${PDF_RESOURCES.map((p) => `- ${p.title}: ${SITE.url}${p.file} (${p.subtitle})`).join('\n')}

## Trending UAE Mortgage Intelligence (${SEO_TOPICS.length} AEO/GEO guides)
${SEO_TOPICS.map((t) => `### ${t.h1} (${SITE.url}/insights/${t.slug})\n${t.answerCapsule}`).join('\n\n')}

## Disclosure
${DISCLOSURE_FULL}
`;
}
