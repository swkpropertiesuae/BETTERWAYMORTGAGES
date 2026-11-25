import type { Metadata } from 'next';
import { PageHero, Section, CtaBand, JsonLd } from '@/components/ui';
import { Photo } from '@/components/media';
import { TeamPortfolio } from '@/components/TeamPortfolio';
import { EXECUTIVE_LEADERSHIP, TEAM_SPECIALISTS } from '@/data/team';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Our Leadership & Mortgage Specialists | Betterway Mortgages Dubai',
  description:
    'Meet the Betterway Mortgages LLC leadership and Dubai specialist team: advisory, underwriting preparation, conveyancing coordination, digital growth, and operations.',
  alternates: { canonical: '/our-underwriters' },
};

const DESKS = [
  [
    'Resident & first-home desk',
    'Salaried expats and UAE Nationals; employer and income requirements.',
    ['Salary-transfer vs non-STL pricing', 'MRHE / SZHP top-ups', 'Pre-approval documents'],
  ],
  [
    'Non-resident desk',
    'Overseas income, tax documents and credit files.',
    ['Video PoA closing', 'Home-country credit files', 'FX costs'],
  ],
  [
    'Self-employed desk',
    'Freezone and mainland owners; corporate net profit and add-back presentation.',
    ['Audited financial review', 'Retained-earnings cases', 'Commercial premises'],
  ],
  [
    'Off-plan & handover desk',
    'Project eligibility, developer payments and valuation requirements.',
    ['APL coverage checks', 'Developer NOCs', 'Handover cash-out'],
  ],
  [
    'Islamic finance desk',
    'Ijara, Murabaha and Diminishing Musharaka across eight Islamic lenders.',
    ['Takaful assignment', 'Profit-rate comparison', 'Sharia board documentation'],
  ],
  [
    'Private client & commercial',
    'AED 15M+ trophy assets, portfolios and commercial property finance.',
    ['Relationship pricing', 'Property valuation', 'SPV structures'],
  ],
] as const;

export default function Page() {
  const personSchemas = [
    ...EXECUTIVE_LEADERSHIP.map((e) => ({
      '@type': 'Person',
      name: e.name,
      jobTitle: e.role,
      email: e.email,
      image: `${SITE.url}${e.portrait}`,
      description: e.bio,
      worksFor: { '@id': `${SITE.url}/#org` },
    })),
    ...TEAM_SPECIALISTS.map((s) => ({
      '@type': 'Person',
      name: s.name,
      jobTitle: s.designation,
      email: s.email,
      image: `${SITE.url}${s.portrait}`,
      worksFor: { '@id': `${SITE.url}/#org` },
    })),
  ];

  return (
    <>
      <PageHero
        crumbs={[{ name: 'Our team & underwriters', href: '/our-underwriters' }]}
        eyebrow="People & Portfolio"
        title="The team behind every UAE mortgage."
        aside={
          <Photo
            name="advisor-consultation"
            priority
            sizes="(min-width: 1024px) 540px, 100vw"
            alt="Concept image: an advisor reviewing a mortgage offer with a client"
            className="bw-window aspect-[16/10] w-full"
          />
        }
        capsule="Meet the leadership and specialist desks at Betterway Mortgages LLC in Dubai. Our advisors help you compare terms, structure documentation, and coordinate valuation and transfer; lending decisions rest solely with the licensed bank."
      />

      <Section
        tone="mist"
        eyebrow="Betterway Mortgages LLC · Dubai"
        title="Leadership &amp; *specialist portfolio.*"
        intro="Inspect each team member’s advisory focus, conveyancing desk, and high-resolution studio profile before booking your consultation."
      >
        <TeamPortfolio showLeadership />
      </Section>

      <Section title="Six specialist *advisory desks.*">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DESKS.map(([t, b, pts]) => (
            <div key={t} className="card">
              <p className="font-display text-lg font-semibold text-navy">{t}</p>
              <p className="mt-2 text-sm text-slate">{b}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-ink">
                {pts.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-teal">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand title="Speak to the right specialist *first time.*" />
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': personSchemas }} />
    </>
  );
}
