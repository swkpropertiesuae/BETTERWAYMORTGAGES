import { text } from '@/lib/feeds';
import { SITE } from '@/data/site';

export const dynamic = 'force-static';

const bots = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'Bingbot',
  'Googlebot',
];

export const GET = () =>
  text(`${bots
    .map(
      (b) =>
        `User-agent: ${b}\nAllow: /\nDisallow: /portal/\nDisallow: /partners/dashboard\nDisallow: /partners/payouts\n`,
    )
    .join('\n')}
User-agent: *
Allow: /
Disallow: /portal/
Disallow: /partners/dashboard
Disallow: /partners/payouts

Sitemap: ${SITE.url}/sitemap.xml
# LLMs index: ${SITE.url}/llms.txt
# LLMs full reference: ${SITE.url}/llms-full.txt
# AI Knowledge Graph JSON: ${SITE.url}/api/aeo-knowledge.json
# Well-Known AI Context: ${SITE.url}/.well-known/ai-context.json
`);
