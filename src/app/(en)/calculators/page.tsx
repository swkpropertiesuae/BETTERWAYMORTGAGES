import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { TOOLS, toolHref } from '@/data/tools';

export const metadata: Metadata = {
  title: 'UAE Mortgage Calculators & Closing Planning Tools',
  description: 'Twelve ungated UAE mortgage calculators built on statutory CBUAE and DLD rules: monthly repayments, upfront fees, 50% DBR, fixed-to-revert, buyout and handover.',
  alternates: { canonical: '/calculators' },
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Calculators', href: '/calculators' }]}
        eyebrow="Tools"
        title="Ungated UAE mortgage calculators & closing tools"
        capsule="Twelve interactive planning calculators and closing checklists built on statutory CBUAE and Dubai Land Department rules—covering monthly payments and upfront fees, 50% DBR borrowing capacity, fixed-to-revert offer testing, refinance break-even, handover balances and Form F protection clauses. No sign-up required."
      />
      <Section title="Calculators">
        <LinkGrid links={TOOLS.filter((t) => t.base === 'calculators').map((t) => ({ title: t.name, body: t.capsule.split('. ')[0] + '.', href: toolHref(t) }))} />
      </Section>
      <Section tone="mist" title="Closing & legal micro-tools">
        <LinkGrid links={TOOLS.filter((t) => t.base === 'tools').map((t) => ({ title: t.name, body: t.capsule.split('. ')[0] + '.', href: toolHref(t) }))} />
      </Section>
      <CtaBand />
    </>
  );
}
