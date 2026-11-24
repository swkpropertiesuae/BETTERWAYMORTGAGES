import type { Metadata } from 'next';
import { Section, CtaBand, LinkGrid, SectionTag } from '@/components/ui';
import { TeamPortfolio } from '@/components/TeamPortfolio';
import LogoMarquee from '@/components/LogoMarquee';
import { BANKS } from '@/data/banks';

export const metadata: Metadata = {
  title: 'About Betterway Mortgages — Dubai & UAE',
  description:
    'Dubai mortgage advice for home buyers, overseas investors and homeowners. Meet the Betterway Mortgages LLC team and see how we structure UAE finance transparently.',
  alternates: { canonical: '/about-us' },
};

export default function Page() {
  return (
    <div className="bw-page-spacer bg-white">
      {/* Homy Asymmetric 2-Column About Hero */}
      <section className="py-12 lg:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="flex min-w-0 flex-col gap-6">
            <SectionTag>About Us</SectionTag>
            <h1 className="homy-h2 !text-[clamp(36px,4.2vw,54px)]">
              A clearer way to finance your Dubai home
            </h1>
            <p className="homy-sub max-w-lg">
              Betterway Mortgages helps UAE home buyers, residents, and international investors compare lender terms,
              statutory CBUAE rules, and transfer-day costs with total clarity.
            </p>
            <div className="mt-2 overflow-hidden rounded-[20px]">
              <img
                src="/images/dubai-waterfront-1280.webp"
                alt="Concept image: contemporary Dubai waterfront residence with Burj Khalifa horizon"
                width={1280}
                height={720}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-6">
            <div className="overflow-hidden rounded-[20px]">
              <img
                src="/images/villa-courtyard-1792.webp"
                alt="Concept image: calm Arabian courtyard villa with reflecting pool"
                width={1792}
                height={2400}
                className="aspect-[4/4.3] w-full object-cover"
              />
            </div>
            <div className="min-w-0 overflow-hidden rounded-[16px] bg-[#f6f6f6] px-5 py-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#4b5b63]">
                {BANKS.length} UAE Lenders Compared
              </p>
              <LogoMarquee
                label="UAE banks in the lender directory"
                items={BANKS.map((b) => ({ id: b.key, label: b.name, logo: b.logo, href: `/rates/${b.slug}` }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Homy Mission & Vision 2-Column Cards */}
      <Section eyebrow="Principles" title="Our mission and standard">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            [
              'Our Mission',
              'Deliver bank-neutral mortgage guidance across 24 UAE lenders so every borrower sees the true post-fixed cost before applying.',
            ],
            [
              'Our Vision',
              'Set the benchmark in Dubai for transparent, CBUAE-aligned digital tools and calm, prepared DLD trustee transfers.',
            ],
            [
              'Our Discipline',
              'Start with statutory DBR and LTV caps, verify documents early, and confirm every rate, floor, and fee in writing.',
            ],
          ].map(([h, p]) => (
            <div key={h} className="card">
              <h3 className="h3 text-[#080b0f]">{h}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#606060]">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        tone="mist"
        eyebrow="Leadership & Specialists"
        title="The people behind Betterway"
        intro="Led by Founder & Managing Director Shabib Siraj from our Oud Metha, Dubai office, our advisory, conveyancing, and operations specialists guide every file from initial check to DLD transfer."
        action={{ label: 'Full team portfolio', href: '/our-underwriters' }}
      >
        <TeamPortfolio showLeadership />
      </Section>

      <Section eyebrow="Next Steps" title="Explore Betterway">
        <LinkGrid
          links={[
            { title: 'Mortgage specialists & desks', body: 'Inspect individual profiles and specialist coverage.', href: '/our-underwriters' },
            { title: 'Mortgage examples', body: 'See worked scenarios and the assumptions behind them.', href: '/reviews' },
            { title: 'Contact the team', body: 'Discuss your property and finance plans.', href: '/contact' },
          ]}
        />
      </Section>

      <CtaBand />
    </div>
  );
}
