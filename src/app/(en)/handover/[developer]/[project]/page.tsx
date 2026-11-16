import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Section, Facts, FaqList, CtaBand, LinkGrid } from '@/components/ui';
import Calculator from '@/components/calc/Calculator';
import { PROJECTS, devBy, projectsOf } from '@/data/handover';

export const dynamicParams = false;
export const generateStaticParams = () => PROJECTS.map((p) => ({ developer: p.dev, project: p.slug }));
const find = (d: string, s: string) => PROJECTS.find((p) => p.dev === d && p.slug === s);

export async function generateMetadata({ params }: { params: Promise<{ developer: string; project: string }> }): Promise<Metadata> {
  const { developer, project } = await params;
  const p = find(developer, project);
  const d = devBy(developer);
  return p && d
    ? {
        title: `${p.name} Handover Mortgage Guide — ${d.name} (${p.community})`,
        description: `Handover mortgage planning for ${p.name} by ${d.name} in ${p.community}: CBUAE completion LTV caps, Approved Project List verification and handover calculator.`,
        alternates: { canonical: `/handover/${developer}/${project}` },
      }
    : {};
}

export default async function Page({ params }: { params: Promise<{ developer: string; project: string }> }) {
  const { developer, project } = await params;
  const p = find(developer, project);
  const d = devBy(developer);
  if (!p || !d) notFound();
  const siblings = projectsOf(p.dev)
    .filter((x) => x.slug !== p.slug)
    .slice(0, 6);
  const crumbs = [
    { name: 'Off-plan handover', href: '/handover' },
    ...(d.hub ? [{ name: d.name, href: `/handover/${d.slug}` }] : []),
    { name: p.name, href: `/handover/${d.slug}/${p.slug}` },
  ];
  const capsule = `${p.name} by ${d.name} is located in ${p.community}. Under CBUAE mortgage rules, buyers financing their final completion instalment can apply for completed-property LTV limits (up to 80% for expat residents and 85% for UAE Nationals on a first home up to AED 5M) once the development is on a lender’s Approved Project List (APL) and open for valuation inspection.`;

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow={`${d.name} · ${p.community}`}
        title={`${p.name} handover mortgage guide: APL check, valuation & closing costs`}
        capsule={capsule}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            Request {p.name} APL check
          </Link>
          <Link href="/handover/dubai-off-plan-handover-mortgage-guide" className="btn btn-ghost">
            Handover mortgage guide
          </Link>
        </div>
      </PageHero>

      <Section title="Development & regulatory facts">
        <Facts
          facts={[
            ['Developer', d.name],
            ['Community', p.community],
            ['Escrow structure', d.escrow],
            ['Under-construction LTV', '50% max (CBUAE)'],
            ['Completion LTV (Expat 1st home)', 'Up to 80% (up to AED 5M)'],
            ['Tower APL & valuation', 'Confirmed per bank prior to filing'],
          ]}
        />
      </Section>

      <Section tone="mist" title={`Calculate your ${p.name} handover balance`}>
        <div className="rounded-card border border-line bg-white p-5 sm:p-8">
          <Calculator slug="handover-equity-release" />
        </div>
      </Section>

      <Section title={`${p.name} handover FAQ`}>
        <div className="max-w-3xl">
          <FaqList
            faqs={[
              {
                q: `When should I prepare my ${p.name} handover mortgage application?`,
                a: 'Begin preparing income documents, AECB credit checks and bank APL verification 60–90 days ahead of your anticipated completion notice so bank valuation and developer NOC steps align with the final payment due date.',
              },
              {
                q: 'Is the 4% DLD transfer fee charged again at handover?',
                a: 'Where the 4% Oqood registration fee was already settled at launch in Dubai, you do not pay the 4% transfer fee a second time at completion—only mortgage registration (0.25% of loan + AED 290), title-deed issuance, trustee and valuation charges apply.',
              },
              {
                q: 'What if the bank valuation differs from my SPA purchase price?',
                a: 'Each bank’s credit policy determines whether handover LTV is calculated against the lower of SPA price and valuation or against the fresh completion valuation. Confirm the valuation basis in writing before submitting an application.',
              },
            ]}
          />
        </div>
      </Section>

      {siblings.length > 0 && (
        <Section tone="mist" title={`More ${d.name} developments`}>
          <LinkGrid links={siblings.map((x) => ({ title: x.name, body: x.community, href: `/handover/${x.dev}/${x.slug}` }))} />
        </Section>
      )}
      <CtaBand title="Preparing for completion?" body="Ask an advisor to verify current bank Approved Project List status and required handover documents." />
    </>
  );
}
