import type { Community } from '@/data/communities';

/** Statutory CBUAE financing summary for a freehold community. */
export function communityFramework(c: Community) {
  return {
    stock: c.stock,
    developers: c.devs,
    residentFirstHomeLtv: 'Up to 80% (or 70% above AED 5M)',
    nationalFirstHomeLtv: 'Up to 85% (or 75% above AED 5M)',
    maxDbr: '50% of verified monthly income',
  };
}
