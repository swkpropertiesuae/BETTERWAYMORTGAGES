import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero, Section, Facts, FaqList, CtaBand, LinkGrid } from '@/components/ui';
import Calculator from '@/components/calc/Calculator';
import { COMMUNITIES, EMIRATES, AR_COMMUNITIES, communityBy } from '@/data/communities';
import { PROJECTS } from '@/data/handover';
import { communityFramework } from '@/lib/derive';

export const dynamicParams = false;
export const generateStaticParams = () => COMMUNITIES.map((c) => ({ emirate: c.emirate, community: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ emirate: string; community: string }> }): Promise<Metadata> {
  const { emirate, community } = await params;
  const c = communityBy(emirate, community);
  return c
    ? {
        title: `${c.name} Mortgage Guide — ${EMIRATES[c.emirate].name} Freehold Financing & Closing Costs`,
        description: `Buying in ${c.name} (${EMIRATES[c.emirate].name}) with a UAE mortgage: CBUAE LTV limits, ${EMIRATES[c.emirate].regulator} transfer rules, developers and budget calculator.`,
        alternates: {
          canonical: `/areas/${emirate}/${community}`,
          ...(AR_COMMUNITIES.includes(c.slug) ? { languages: { 'ar-AE': `/ar/areas/${emirate}/${community}` } } : {}),
        },
      }
    : {};
}

export default async function Page({ params }: { params: Promise<{ emirate: string; community: string }> }) {
  const { emirate, community } = await params;
  const c = communityBy(emirate, community);
  if (!c) notFound();
  const e = EMIRATES[c.emirate];
  const fw = communityFramework(c);
  const key = c.name.split(/[ (&,]/)[0].toLowerCase();
  const projects = PROJECTS.filter((p) => p.community.toLowerCase().includes(key)).slice(0, 6);
  const nearby = COMMUNITIES.filter((x) => x.emirate === c.emirate && x.slug !== c.slug && x.stock === c.stock).slice(0, 4);

  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Areas', href: '/areas' },
          { name: e.name, href: `/areas/${c.emirate}` },
          { name: c.name, href: `/areas/${c.emirate}/${c.slug}` },
        ]}
        eyebrow={`${e.name} · ${c.stock}`}
        title={`Buying in ${c.name} with a UAE mortgage: CBUAE rules & closing costs`}
        capsule={`${c.name} is a designated freehold community in ${e.name} registered under ${e.regulator}, featuring ${c.stock.toLowerCase()} by developers including ${c.devs}. Completed properties qualify for statutory CBUAE first-home financing up to 80% LTV for expat residents and 85% LTV for UAE Nationals, subject to bank property valuation and 50% DBR.`}
      />

      <Section title={`${c.name} financing & registration framework`}>
        <Facts
          facts={[
            ['Property stock', fw.stock],
            ['Notable developers', fw.developers],
            ['Land registry', e.regulator],
            ['Transfer fee schedule', e.transferFee],
            ['Expat 1st-home LTV', fw.residentFirstHomeLtv],
            ['UAE National 1st-home LTV', fw.nationalFirstHomeLtv],
          ]}
        />
        <p className="mt-4 text-xs text-slate">
          Lenders base mortgage LTV on the lower of the agreed purchase price or an independent RERA/bank-panel property valuation.
        </p>
      </Section>

      <Section tone="mist" title={`Calculate repayments & upfront costs for ${c.name}`}>
        <div className="rounded-card border border-line bg-white p-5 sm:p-8">
          <Calculator slug="mortgage-calculator" />
        </div>
      </Section>

      {projects.length > 0 && (
        <Section title={`Off-plan & handover developments in ${c.name}`}>
          <LinkGrid links={projects.map((p) => ({ title: p.name, body: p.community, href: `/handover/${p.dev}/${p.slug}` }))} />
        </Section>
      )}

      <Section tone={projects.length ? 'mist' : 'white'} title={`${c.name} mortgage FAQ`}>
        <div className="max-w-3xl">
          <FaqList
            faqs={[
              {
                q: `Can expats and non-residents get a mortgage in ${c.name}?`,
                a: `Yes. ${c.name} is a designated freehold area. UAE expat residents can apply up to the statutory 80% CBUAE first-home LTV cap (70% above AED 5M), while non-resident eligibility and LTV depend on individual bank credit policy.`,
              },
              {
                q: `How do banks value properties in ${c.name}?`,
                a: 'Once a Memorandum of Understanding (Form F in Dubai) is signed, the lending bank instructs an accredited valuation firm to inspect the unit and review recent comparable land-registry transfers. Include a valuation protection clause in your purchase contract before handing over a deposit cheque.',
              },
            ]}
          />
        </div>
      </Section>

      {nearby.length > 0 && (
        <Section tone={projects.length ? 'white' : 'mist'} title={`Other ${e.name} communities`}>
          <LinkGrid
            cols={4}
            links={nearby.map((x) => ({
              title: x.name,
              body: `${x.stock} · ${x.devs}`,
              href: `/areas/${x.emirate}/${x.slug}`,
            }))}
          />
        </Section>
      )}
      <CtaBand title={`Planning to buy in ${c.name}?`} />
    </>
  );
}
