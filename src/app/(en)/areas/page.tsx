import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { COMMUNITIES, EMIRATES, type Emirate } from '@/data/communities';

export const metadata: Metadata = {
  title: 'UAE Freehold Community Mortgage Guides — Dubai, Abu Dhabi, RAK & Sharjah',
  description: '60 freehold residential communities across Dubai, Abu Dhabi, Ras Al Khaimah and Sharjah with land-registry rules, property types and mortgage planning tools.',
  alternates: { canonical: '/areas' },
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Areas', href: '/areas' }]}
        eyebrow="Freehold communities"
        title="60 UAE freehold communities & mortgage planning guides"
        capsule="Explore 60 designated freehold residential communities across Dubai, Abu Dhabi, Ras Al Khaimah and Sharjah. Each community guide covers property stock type, active master developers, land-registry transfer rules, statutory CBUAE LTV caps and an interactive mortgage calculator."
      />
      {(Object.keys(EMIRATES) as Emirate[]).map((k, i) => (
        <Section key={k} tone={i % 2 ? 'mist' : 'white'} title={EMIRATES[k].name} action={{ label: `All ${EMIRATES[k].name}`, href: `/areas/${k}` }}>
          <LinkGrid
            cols={4}
            links={COMMUNITIES.filter((c) => c.emirate === k).map((c) => ({
              title: c.name,
              body: `${c.stock} · ${c.devs}`,
              href: `/areas/${k}/${c.slug}`,
            }))}
          />
        </Section>
      ))}
      <CtaBand />
    </>
  );
}
