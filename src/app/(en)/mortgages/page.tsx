import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { PRODUCTS } from '@/data/products';
import { COUNTRIES } from '@/data/countries';

export const metadata: Metadata = {
  title: 'UAE Mortgage Products & Non-Resident Country Documentation Guides',
  description: 'All 14 UAE mortgage product guides with CBUAE statutory LTV & DBR rules, plus 25 non-resident country documentation checklists.',
  alternates: { canonical: '/mortgages' },
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Mortgages', href: '/mortgages' }]}
        eyebrow="Mortgages"
        title="UAE mortgage guides for residents, nationals & overseas buyers"
        capsule="Explore 14 UAE mortgage product structures across 24 licensed lenders—covering residential purchases, Islamic home finance, off-plan handovers, bank buyouts, equity release, non-resident applications and Golden Visa property thresholds. Each guide outlines statutory CBUAE rules, required documents and an interactive calculator."
      />
      <Section title="14 mortgage product guides">
        <LinkGrid links={PRODUCTS.map((p) => ({ title: p.name, body: p.card, href: `/mortgages/${p.slug}`, tag: p.badge }))} />
      </Section>
      <Section tone="mist" title="Non-resident documentation guides by country">
        <LinkGrid
          cols={4}
          links={COUNTRIES.map((c) => ({
            title: c.name,
            body: `${c.currency} · ${c.bureau}`,
            href: `/mortgages/non-resident-${c.slug}`,
          }))}
        />
      </Section>
      <CtaBand />
    </>
  );
}
