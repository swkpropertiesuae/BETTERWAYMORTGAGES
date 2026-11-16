import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { ADVISORY } from '@/data/content';

export const metadata: Metadata = {
  title: 'Private Client, Conveyancing & Commercial Property Advisory Desk',
  description: 'Commercial property finance, SME lending, RERA conveyancing, DIFC wills coordination, life insurance assignment, FX planning, PoA closings and valuation reviews.',
  alternates: { canonical: '/advisory' },
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Advisory', href: '/advisory' }]}
        eyebrow="Advisory"
        title="Specialist support around your UAE property transaction"
        capsule="Alongside residential mortgage broking, Betterway’s advisory desk coordinates commercial property finance, SME business facilities, RERA-aligned conveyancing, DIFC wills referrals, decreasing-term life policy comparisons, cross-border FX planning, Power of Attorney closings and valuation review packs."
      />
      <Section title="Eight specialist advisory guides">
        <LinkGrid cols={4} links={ADVISORY.map((a) => ({ title: a.name, body: a.capsule.split('. ')[0] + '.', href: `/advisory/${a.slug}` }))} />
      </Section>
      <CtaBand />
    </>
  );
}
