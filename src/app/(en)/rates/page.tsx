import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import LogoMarquee from '@/components/LogoMarquee';
import { BANKS } from '@/data/banks';
import { COMPARISONS } from '@/data/compare';

export const metadata: Metadata = {
  title: 'UAE Mortgage Lenders, EIBOR Benchmark & Offer Comparison Guide',
  description: 'Directory of 24 UAE mortgage banks, published CBUAE EIBOR fixings, and 15 side-by-side underwriting and structure comparisons.',
  alternates: { canonical: '/rates' },
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Rates', href: '/rates' }]}
        eyebrow="Lenders & benchmarks"
        title="UAE mortgage lenders, EIBOR fixings and offer structures"
        capsule="Betterway covers 24 licensed conventional and Islamic mortgage lenders across the UAE alongside daily published CBUAE EIBOR fixings. Because banks revise pricing by borrower profile, property tier and salary-transfer status, always compare written Final Offer Letters across fixed period, revert margin, minimum floor rate and fees."
      />
      <Section title="Benchmarks & lender directory">
        <LinkGrid
          cols={2}
          links={[
            {
              title: '24-Bank Lender Directory & Revert Guide',
              body: 'Full directory of UAE conventional and Islamic mortgage lenders plus how EIBOR revert margins and floors work.',
              href: '/rates/uae-mortgage-rates-eibor-revert-bible',
              tag: '24 UAE banks',
            },
            {
              title: 'Published CBUAE EIBOR Tracker',
              body: 'Daily 1M, 3M and 6M EIBOR fixings from the Central Bank of the UAE with source dates.',
              href: '/rates/eibor-live-tracker',
              tag: 'Official CBUAE feed',
            },
          ]}
        />
      </Section>
      <Section tone="mist" title="24 UAE mortgage lenders">
        <div className="mb-10 border-y border-[#0a1424]/[0.08] py-6">
          <LogoMarquee
            label="24 licensed UAE conventional and Islamic banks"
            items={BANKS.map((b) => ({ id: b.key, label: b.name, logo: b.logo, href: `/rates/${b.slug}` }))}
            speed={64}
          />
        </div>
        <LinkGrid
          cols={4}
          links={BANKS.map((b) => ({
            title: b.name,
            logo: b.logo,
            body: `${b.type} · ${b.hq}`,
            href: `/rates/${b.slug}`,
          }))}
        />
      </Section>
      <Section id="compare" title="15 side-by-side comparisons">
        <LinkGrid links={COMPARISONS.map((c) => ({ title: c.title, href: `/rates/compare/${c.slug}` }))} />
      </Section>
      <CtaBand />
    </>
  );
}
