import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Section, CtaBand } from '@/components/ui';
import { COMMUNITIES, EMIRATES, type Emirate } from '@/data/communities';

export const dynamicParams = false;
export const generateStaticParams = () => (Object.keys(EMIRATES) as Emirate[]).map((emirate) => ({ emirate }));

export async function generateMetadata({ params }: { params: Promise<{ emirate: string }> }): Promise<Metadata> {
  const key = (await params).emirate as Emirate;
  const e = EMIRATES[key];
  return e
    ? {
        title: `${e.name} Freehold Communities — Land Registry & Mortgage Guide`,
        description: `Directory of ${e.name} freehold communities registered under ${e.regulator}, including property types, master developers and CBUAE mortgage rules.`,
        alternates: { canonical: `/areas/${key}` },
      }
    : {};
}

export default async function Page({ params }: { params: Promise<{ emirate: string }> }) {
  const key = (await params).emirate as Emirate;
  const e = EMIRATES[key];
  if (!e) notFound();
  const list = COMMUNITIES.filter((c) => c.emirate === key);
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Areas', href: '/areas' },
          { name: e.name, href: `/areas/${key}` },
        ]}
        eyebrow="Freehold communities"
        title={`${e.name} freehold communities & land-registry mortgage guide`}
        capsule={`Overview of ${list.length} designated freehold residential communities in ${e.name}. Property transfers and first-degree mortgage registrations are overseen by ${e.regulator} (${e.transferFee}). Open any community below to model your deposit and closing budget.`}
      />
      <Section title={`${list.length} freehold communities in ${e.name}`}>
        <div className="overflow-x-auto rounded-card border border-line bg-white">
          <table className="table-bw min-w-[640px]">
            <thead>
              <tr>
                <th>Community</th>
                <th>Property stock</th>
                <th>Notable developers</th>
                <th>Land registry</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.slug}>
                  <th scope="row" className="font-sans">
                    <Link href={`/areas/${key}/${c.slug}`} className="font-semibold text-navy hover:text-teal">
                      {c.name}
                    </Link>
                  </th>
                  <td className="font-sans text-slate">{c.stock}</td>
                  <td className="font-sans text-sm text-slate">{c.devs}</td>
                  <td className="font-sans text-sm text-slate">{e.regulator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
