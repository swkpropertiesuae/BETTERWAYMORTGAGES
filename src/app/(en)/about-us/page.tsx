import type { Metadata } from 'next';
import { PageHero, Section, CtaBand, LinkGrid } from '@/components/ui';
import { Photo } from '@/components/media';
import { TeamPortfolio } from '@/components/TeamPortfolio';

export const metadata: Metadata = {
  title: 'About Betterway Mortgages — Dubai & UAE',
  description:
    'Dubai mortgage advice for home buyers, overseas investors and homeowners. Meet the Betterway Mortgages LLC team and see how we structure UAE finance transparently.',
  alternates: { canonical: '/about-us' },
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'About us', href: '/about-us' }]}
        eyebrow="About Betterway"
        title="A clearer way to your mortgage."
        aside={
          <Photo
            name="advisor-consultation"
            priority
            sizes="(min-width: 1024px) 540px, 100vw"
            alt="Concept image: an advisor reviewing a mortgage offer with a client"
            className="bw-window aspect-[16/10] w-full"
          />
        }
        capsule="Betterway Mortgages helps UAE home buyers and homeowners understand their finance options. Start with your budget, compare lender terms and prepare for the steps from application to property transfer."
      />

      <Section title="Clarity at *every step.*">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Your full budget', 'Understand the deposit, monthly payment and purchase fees before committing.'],
            ['A useful comparison', 'Look at the fixed period, revert margin, floor rate and fees together.'],
            ['A prepared application', 'Understand the documents and property checks lenders need.'],
          ].map(([h, p]) => (
            <div key={h} className="card">
              <h3 className="h3">{h}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        tone="mist"
        eyebrow="Leadership & Specialists"
        title="The people behind *Betterway.*"
        intro="Led by Founder & Managing Director Shabib Siraj from our Oud Metha, Dubai office, our advisory, conveyancing, and operations specialists guide every file from initial check to DLD transfer."
        action={{ label: 'Full team portfolio', href: '/our-underwriters' }}
      >
        <TeamPortfolio showLeadership />
      </Section>

      <Section title="Explore *Betterway.*">
        <LinkGrid
          links={[
            { title: 'Mortgage specialists & desks', body: 'Inspect individual profiles and specialist coverage.', href: '/our-underwriters' },
            { title: 'Mortgage examples', body: 'See worked scenarios and the assumptions behind them.', href: '/reviews' },
            { title: 'Contact the team', body: 'Discuss your property and finance plans.', href: '/contact' },
          ]}
        />
      </Section>

      <CtaBand />
    </>
  );
}
