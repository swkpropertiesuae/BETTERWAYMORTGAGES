import { urlset } from '@/lib/feeds';
import { PDF_RESOURCES, SEO_TOPICS } from '@/data/seo-topics';

export const dynamic = 'force-static';

export const GET = () =>
  urlset([
    '/insights',
    '/downloads',
    '/hot-offers',
    '/get-started',
    '/concierge',
    '/hub',
    '/edge',
    ...SEO_TOPICS.map((t) => `/insights/${t.slug}`),
    ...PDF_RESOURCES.map((p) => p.file),
  ]);
