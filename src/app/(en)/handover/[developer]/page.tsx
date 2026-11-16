import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero, Section, Facts, CtaBand, LinkGrid } from '@/components/ui';
import Calculator from '@/components/calc/Calculator';
import { DEVELOPERS, devBy, projectsOf } from '@/data/handover';

export const dynamicParams = false;
export const generateStaticParams = () => DEVELOPERS.filter((d) => d.hub).map((d) => ({ developer: d.slug }));

export async function generateMetadata({ params }: { params: Promise<{ developer: string }> }): Promise<Metadata> {
  const d = devBy((await params).developer);
  return d
    ? {
        title: `${d.name} Handover Mortgages — CBUAE Rules, Escrow & Developments`,
        description: `Handover mortgage guide for ${d.name} developments: CBUAE LTV rules, ${d.escrow} process, Approved Project List checks and tracked communities.`,
        alternates: { canonical: `/handover/${d.slug}` },
      }
    : {};
}

export default async function Page({ params }: { params: Promise<{ developer: string }> }) {
  const d = devBy((await params).developer);
  if (!d?.hub) notFound();
  const projects = projectsOf(d.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Off-plan handover', href: '/handover' },
          { name: d.name, href: `/handover/${d.slug}` },
        ]}
        eyebrow="Developer mortgage hub"
        title={`${d.name} handover mortgages: APL checks, escrow & completion rules`}
        capsule={`${d.blurb} Off-plan instalments are administered under ${d.escrow.toLowerCase()}. Before a completion notice is issued, buyers financing their final instalment should verify tower-level Approved Project List (APL) status, developer NOC requirements and bank valuation access across ${projects.length} tracked ${d.name} developments.`}
      />

      <Section title="Developer & statutory CBUAE summary">
        <Facts
          facts={[
            ['Developments tracked', String(projects.length)],
            ['Escrow framework', d.escrow],
            ['Under-construction LTV', '50% max (CBUAE)'],
            ['Completion LTV (Expat 1st home)', 'Up to 80% (up to AED 5M)'],
            ['Completion LTV (UAE National)', 'Up to 85% (up to AED 5M)'],
            ['Tower APL status', 'Verified per lender prior to application'],
          ]}
        />
      </Section>

      <Section tone="mist" title={`Model a ${d.name} handover payment`}>
        <div className="rounded-card border border-line bg-white p-5 sm:p-8">
          <Calculator slug="handover-equity-release" />
        </div>
      </Section>

      <Section title={`${d.name} developments`}>
        <LinkGrid
          links={projects.map((p) => ({
            title: p.name,
            body: p.community,
            href: `/handover/${d.slug}/${p.slug}`,
            tag: d.name,
          }))}
        />
      </Section>
      <CtaBand />
    </>
  );
}
