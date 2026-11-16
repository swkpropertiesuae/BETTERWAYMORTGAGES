import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, Section, CtaBand } from '@/components/ui';
import { DEVELOPERS, PROJECTS } from '@/data/handover';

export const metadata: Metadata = {
  title: 'UAE Off-Plan Handover Projects & Developer Mortgage Guides',
  description: '80 UAE off-plan developments and 14 master-developer hubs with CBUAE handover LTV rules, escrow structure and Approved Project List (APL) checklists.',
  alternates: { canonical: '/handover' },
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Off-plan handover', href: '/handover' }]}
        eyebrow="Off-plan completion"
        title="80 off-plan handover guides & 14 master-developer hubs"
        capsule="Under CBUAE regulations, under-construction off-plan borrowing is capped at 50% LTV, whereas units reaching handover can qualify for standard completed-property LTV limits (up to 80% for expat residents and 85% for UAE Nationals) when the building appears on a bank’s Approved Project List (APL)."
      >
        <div className="mt-8">
          <Link href="/handover/dubai-off-plan-handover-mortgage-guide" className="btn btn-primary">
            Read the handover mortgage guide
          </Link>
        </div>
      </PageHero>

      {DEVELOPERS.filter((d) => PROJECTS.some((p) => p.dev === d.slug)).map((d, i) => (
        <Section
          key={d.slug}
          tone={i % 2 ? 'mist' : 'white'}
          title={d.name}
          action={d.hub ? { label: `${d.name} hub`, href: `/handover/${d.slug}` } : undefined}
        >
          <div className="overflow-x-auto rounded-card border border-line bg-white">
            <table className="table-bw min-w-[560px]">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Community</th>
                  <th>Escrow framework</th>
                  <th>Completion LTV</th>
                </tr>
              </thead>
              <tbody>
                {PROJECTS.filter((p) => p.dev === d.slug).map((p) => (
                  <tr key={p.slug}>
                    <th scope="row">
                      <Link href={`/handover/${p.dev}/${p.slug}`} className="font-semibold text-navy hover:text-teal">
                        {p.name}
                      </Link>
                    </th>
                    <td className="text-slate">{p.community}</td>
                    <td className="text-sm text-slate">{d.escrow}</td>
                    <td className="text-sm text-slate">Subject to bank APL &amp; valuation</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      ))}
      <CtaBand />
    </>
  );
}
