import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Clock, Home as HomeIcon, ShieldCheck } from 'lucide-react';
import HomeHero from '@/components/home/HomeHero';
import DisclosureToast from '@/components/home/DisclosureToast';
import RevertBriefing from '@/components/home/RevertBriefing';
import StatCounter from '@/components/home/StatCounter';
import Manifesto from '@/components/home/Manifesto';
import { HomyAdvisorsCarousel, HomyFaqAccordion, HomyServicesAccordion } from '@/components/home/HomySections';
import { LiveBenchmark } from '@/components/StartupExperience';
import LogoMarquee from '@/components/LogoMarquee';
import Calculator from '@/components/calc/Calculator';
import { Cta, JsonLd, SectionTag, aed } from '@/components/ui';
import { BANKS } from '@/data/banks';
import { COMMUNITIES } from '@/data/communities';
import { COUNTRIES } from '@/data/countries';
import { DEVELOPERS, PROJECTS } from '@/data/handover';
import { LTV_RULES } from '@/data/site';
import { cashToClose } from '@/lib/math';

export const metadata: Metadata = {
  title: 'Dubai Home Mortgages & UAE Advisory | Betterway Mortgages',
  description:
    'Independent Dubai & UAE mortgage advisory across 24 lenders. Compare EIBOR rates, CBUAE statutory caps, and upfront Dubai Land Department closing costs with Betterway.',
  alternates: { canonical: '/' },
};

const ltv = (match: string) => LTV_RULES.find((r) => r.profile.startsWith(match))?.ltv ?? '—';

/* Full-bleed Homy "Top Solutions" Showcase Slides */
const TOP_SOLUTIONS = [
  {
    pill: `Up to ${ltv('Expat resident — first home up to')} LTV`,
    title: 'Expat Resident Mortgages',
    subtitle: 'First-Home Dubai Financing · 50% CBUAE DBR · Up to 25-Year Tenure',
    href: '/mortgages/uae-residents',
    img: '/images/dubai-interior-2560.webp',
    alt: 'Concept image: sunlit luxury Dubai waterfront apartment living room overlooking the skyline',
  },
  {
    pill: `${COUNTRIES.length} Country Guides`,
    title: 'Non-Resident Dubai Mortgages',
    subtitle: 'Overseas Salaried & Business Income · International Buyers in Dubai',
    href: '/mortgages/non-resident-dubai',
    img: '/images/marina-evening-2752.webp',
    alt: 'Concept image: panoramic Dubai Marina waterfront skyline at blue hour from a private terrace',
  },
  {
    pill: `${PROJECTS.length} Handover Projects`,
    title: 'Off-Plan & Handover Finance',
    subtitle: `Completion Funding Across ${DEVELOPERS.length} Major UAE Developers & Valuation Readiness`,
    href: '/handover/dubai-off-plan-handover-mortgage-guide',
    img: '/images/offplan-dusk-2752.webp',
    alt: 'Concept image: luxury Dubai residential tower approaching completion at dusk',
  },
] as const;

/* Exact Homy 3-Card Interactive Expanding Services Accordion */
const HOMY_SERVICES = [
  {
    index: '.01',
    kicker: 'Buy a Home',
    title: 'Resident & Villa Mortgages',
    body: 'Compare fixed-rate periods, post-fixed EIBOR revert margins, minimum floors, and DLD fees across 24 UAE lenders before selecting an offer.',
    href: '/mortgages/uae-residents',
    img: '/images/dubai-waterfront-1280.webp',
    alt: 'Concept image: waterfront travertine Dubai villa with palm garden and Burj Khalifa skyline',
  },
  {
    index: '.02',
    kicker: 'Switch & Save',
    title: 'Buyout & Refinance Advisory',
    body: 'Audit your current revert rate against switching costs, valuation fees, and the statutory CBUAE 1% / AED 10,000 early settlement cap.',
    href: '/mortgages/mortgage-buyout-refinance',
    img: '/images/keys-handover-2752.webp',
    alt: 'Concept image: house keys laid on a travertine table during a Dubai mortgage closing',
  },
  {
    index: '.03',
    kicker: 'Plan Ahead',
    title: 'Calculators & EIBOR Tools',
    body: 'Model monthly instalments, stressed 50% DBR limits, Form F valuation clauses, and itemised transfer-day cheques with zero sign-up.',
    href: '/calculators/mortgage-calculator',
    img: '/images/guide-valuation-2752.webp',
    alt: 'Concept image: architectural drawings and brass scale inside a bright Dubai villa',
  },
] as const;

/* Exact Homy 2x2 Listings Card Grid tailored to Dubai Mortgage Programs */
const MORTGAGE_PROGRAMS = [
  {
    badge: 'First Home',
    title: 'UAE National & Expat First Home',
    figure: `Up to ${ltv('UAE National — first home up to')} / ${ltv('Expat resident — first home up to')} LTV`,
    specs: ['50% Max DBR', '25 Yrs Max', '4% DLD Fee'],
    href: '/mortgages/uae-nationals',
    img: '/images/dubai-waterfront-1280.webp',
    alt: 'Concept image: modern Dubai waterfront villa overlooking the skyline',
  },
  {
    badge: 'Islamic Finance',
    title: 'Sharia-Compliant Home Finance',
    figure: `${BANKS.length} UAE Banks`,
    specs: ['Ijara & Murabaha', 'CBUAE Regulated', 'Fixed & Variable'],
    href: '/mortgages/islamic-home-finance',
    img: '/images/villa-courtyard-1792.webp',
    alt: 'Concept image: tranquil Arabian courtyard villa with reflecting pool and palm trees',
  },
  {
    badge: 'Refinance',
    title: 'Mortgage Buyout & Equity Release',
    figure: '1% / AED 10k Cap',
    specs: ['Early Exit Cap', 'Revert Check', 'Break-Even Tool'],
    href: '/mortgages/equity-release',
    img: '/images/guide-transfer-day-2752.webp',
    alt: 'Concept image: modern Dubai boardroom overlooking Palm Jumeirah on transfer day',
  },
  {
    badge: 'Golden Visa',
    title: 'AED 2M+ Property Mortgage Path',
    figure: 'AED 2,000,000+',
    specs: ['10-Yr Residency Path', 'Freehold Dubai', 'Valuation Guide'],
    href: '/mortgages/golden-visa-mortgage',
    img: '/images/guide-dbr-planning-2752.webp',
    alt: 'Concept image: bright modern Dubai residence overlooking Downtown towers',
  },
] as const;

const FAQS = [
  {
    q: 'How does a mortgage broker in Dubai help?',
    a: 'A broker helps you compare suitable UAE lenders, prepare your documents cleanly, and understand fixed, variable, and revert terms before you apply. The licensed bank makes the lending decision and issues your final written offer.',
  },
  {
    q: 'How much upfront cash do I need for an AED 2M Dubai home?',
    a: `With a 20% deposit, our calculator estimates ${aed(cashToClose({ price: 2_000_000, downPct: 20 }).total)} including the down payment and typical Dubai Land Department purchase charges. Bank processing fees, valuation, and insurance may add to this total.`,
  },
  {
    q: 'Can non-residents get a mortgage in Dubai?',
    a: 'Yes — selected UAE banks finance non-resident buyers earning salaried or business income abroad. Your country of residence, income currency, credit profile, and property type govern lender LTV caps and documentation.',
  },
  {
    q: 'What should I compare besides the introductory mortgage rate?',
    a: 'Always compare the post-fixed EIBOR revert margin, minimum rate floor, bank processing fees, mandatory life and property insurance terms, and partial settlement allowances alongside the headline fixed rate.',
  },
  {
    q: 'What are the official CBUAE borrowing limits?',
    a: 'Central Bank of the UAE regulations cap total Debt Burden Ratio (DBR) at 50% of gross monthly income, limit maximum mortgage tenure to 25 years, cap early settlement fees at 1% or AED 10,000 (whichever is lower), and require the deposit from own funds.',
  },
  {
    q: 'Do I need an account to use the calculators or compare lenders?',
    a: 'No. Every calculator, live CBUAE EIBOR tracker, community guide, and lender comparison profile on Betterway Mortgages is open and free to use without submitting personal details.',
  },
];

export default function Home() {
  return (
    <>
      {/* 1. EXACT HOMY STICKY SKY HERO (DUBAI HOME MORTGAGES) */}
      <HomeHero />
      <DisclosureToast />

      {/* Scrolling crisp white curtain gliding cleanly over the sticky sky Hero */}
      <div className="homy-curtain">
        {/* 2. OUR IMPACT (Exact 3-Col Row: Photo | 3 #eeeff0 Stat Cards | Photo + Bank Marquee) */}
        <section className="homy-section" aria-labelledby="impact-title">
          <div className="wrap">
            <div className="homy-head">
              <div className="homy-head__left">
                <SectionTag>Our Impact</SectionTag>
                <h2 id="impact-title" className="homy-h2" data-reveal="rise">
                  Real clarity behind every mortgage decision
                </h2>
              </div>
              <div className="homy-head__right">
                <p className="homy-sub">
                  Built to make Dubai &amp; UAE mortgage structuring transparent, CBUAE-aligned, and straightforward for
                  every buyer.
                </p>
              </div>
            </div>

            <div className="homy-impact-grid">
              <div className="homy-impact-photo" data-reveal="rise">
                <img
                  src="/images/dubai-waterfront-1280.webp"
                  alt="Concept image: luxury Dubai waterfront residence with Burj Khalifa horizon"
                  width={1280}
                  height={720}
                  loading="lazy"
                />
              </div>

              <div className="homy-impact-stats" data-reveal="rise" style={{ ['--i' as string]: 1 }}>
                <div className="homy-stat-card">
                  <span className="homy-stat-card__num">
                    <StatCounter value={BANKS.length} />
                  </span>
                  <span className="homy-stat-card__label">UAE Lenders</span>
                </div>
                <div className="homy-stat-card">
                  <span className="homy-stat-card__num">
                    <StatCounter value={COMMUNITIES.length} suffix="+" />
                  </span>
                  <span className="homy-stat-card__label">Freehold Areas</span>
                </div>
                <div className="homy-stat-card">
                  <span className="homy-stat-card__num">
                    <StatCounter value={50} suffix="%" />
                  </span>
                  <span className="homy-stat-card__label">CBUAE Max DBR</span>
                </div>
              </div>

              <div className="homy-impact-photo" data-reveal="rise" style={{ ['--i' as string]: 2 }}>
                <img
                  src="/images/villa-courtyard-1792.webp"
                  alt="Concept image: calm Arabian courtyard villa with reflecting pool"
                  width={1792}
                  height={2400}
                  loading="lazy"
                />
              </div>
            </div>

            {/* 24 UAE Banks Directory Strip */}
            <div className="mt-14 border-t border-[#efefef] pt-10">
              <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.14em] text-[#606060]">
                Comparing mortgage structures across {BANKS.length} UAE lenders in one directory
              </p>
              <LogoMarquee
                label="UAE banks in the lender directory"
                items={BANKS.map((b) => ({ id: b.key, label: b.name, logo: b.logo, href: `/rates/${b.slug}` }))}
              />
              <p className="mt-3 text-center text-[11.5px] text-[#606060]">
                Directory listing is for informational comparison and is not a live bank offer. Confirm current terms in writing.
              </p>
            </div>
          </div>
        </section>

        {/* 3. ABOUT / SCROLL-REVEAL MANIFESTO STATEMENT */}
        <section className="homy-manifesto-band" aria-label="Our approach">
          <div className="wrap">
            <Manifesto text="Focused on *clarity,* built for real choices. We structure Dubai *mortgages* across 24 UAE lenders so buyers compare real costs, understand CBUAE rules, and move forward with confidence." />
          </div>
        </section>

        {/* 4. TOP MORTGAGE SOLUTIONS (Full-Bleed Stacked Slides with Centered Frosted Glass Card) */}
        <section className="bg-white pt-16 lg:pt-20" aria-labelledby="top-solutions-title">
          <div className="wrap">
            <div className="homy-head">
              <div className="homy-head__left">
                <SectionTag>Top Solutions</SectionTag>
                <h2 id="top-solutions-title" className="homy-h2" data-reveal="rise">
                  Explore our flagship pathways for Dubai buyers
                </h2>
              </div>
              <div className="homy-head__right">
                <p className="homy-sub">
                  Dedicated mortgage structuring for UAE residents, international investors, and off-plan handover
                  buyers.
                </p>
              </div>
            </div>
          </div>

          <div className="homy-showcase-stack">
            {TOP_SOLUTIONS.map((slide) => (
              <article key={slide.title} className="homy-showcase-slide">
                <img src={slide.img} alt={slide.alt} loading="lazy" decoding="async" />
                <div className="homy-glass-card" data-reveal="frost">
                  <span className="homy-glass-card__pill">{slide.pill}</span>
                  <h3>{slide.title}</h3>
                  <p>{slide.subtitle}</p>
                  <div className="mt-2">
                    <Cta href={slide.href} tone="light">
                      Explore
                    </Cta>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 5. OUR SERVICES — Exact Homy 3-Card Interactive Expanding Horizontal Accordion */}
        <section className="homy-section" aria-labelledby="services-title">
          <div className="wrap">
            <div className="homy-head">
              <div className="homy-head__left">
                <SectionTag>Our Services</SectionTag>
                <h2 id="services-title" className="homy-h2" data-reveal="rise">
                  Everything you need for your mortgage
                </h2>
              </div>
              <div className="homy-head__right">
                <p className="homy-sub">
                  Whether you are purchasing your first Dubai residence, refinancing to a lower margin, or modelling
                  upfront DLD fees.
                </p>
              </div>
            </div>

            <HomyServicesAccordion items={HOMY_SERVICES} />
          </div>
        </section>

        {/* 6. MORTGAGE PROGRAMS — Exact Homy 2x2 Photo Cards Grid */}
        <section className="homy-section pt-4" aria-labelledby="programs-title">
          <div className="wrap">
            <div className="homy-head">
              <div className="homy-head__left">
                <SectionTag>Mortgage Programs</SectionTag>
                <h2 id="programs-title" className="homy-h2" data-reveal="rise">
                  Discover financing that fits your lifestyle
                </h2>
              </div>
              <div className="homy-head__right">
                <p className="homy-sub">
                  Explore CBUAE-aligned lending frameworks designed for residents, investors, and long-term UAE
                  homeowners.
                </p>
                <Cta href="/mortgages" size="sm">
                  Explore All
                </Cta>
              </div>
            </div>

            <div className="homy-listings-grid">
              {MORTGAGE_PROGRAMS.map((item, i) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="homy-listing-card group"
                  data-reveal="rise"
                  style={{ ['--i' as string]: i % 2 }}
                >
                  <img src={item.img} alt={item.alt} decoding="async" />
                  <span className="homy-listing-card__badge">
                    <HomeIcon size={13} strokeWidth={2.2} />
                    {item.badge}
                  </span>
                  <div className="homy-listing-card__overlay">
                    <span className="homy-listing-card__name">{item.title}</span>
                    <strong className="homy-listing-card__figure">{item.figure}</strong>
                    <div className="homy-listing-card__specs">
                      <span>
                        <ShieldCheck size={14} /> {item.specs[0]}
                      </span>
                      <span className="homy-listing-card__sep" aria-hidden="true">
                        |
                      </span>
                      <span>
                        <Clock size={14} /> {item.specs[1]}
                      </span>
                      <span className="homy-listing-card__sep" aria-hidden="true">
                        |
                      </span>
                      <span>
                        <Building2 size={14} /> {item.specs[2]}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-5 text-xs text-[#606060]">
              LTV figures reflect statutory CBUAE caps for typical profiles. Individual lender policies may vary. Concept
              architecture images are AI-generated.
            </p>
          </div>
        </section>

        {/* 7. INTERACTIVE DUBAI MORTGAGE CALCULATOR & LIVE CBUAE EIBOR BENCHMARK */}
        <section id="calculator" className="homy-section" aria-labelledby="calc-title">
          <div className="wrap">
            <div className="homy-head">
              <div className="homy-head__left">
                <SectionTag>Mortgage Calculator &amp; EIBOR</SectionTag>
                <h2 id="calc-title" className="homy-h2" data-reveal="rise">
                  Run the numbers before the bank does
                </h2>
              </div>
              <div className="homy-head__right">
                <p className="homy-sub">
                  Monthly instalments, upfront DLD fees, and live published CBUAE EIBOR fixings in one transparent view.
                </p>
                <Cta href="/rates/eibor-live-tracker" size="sm" tone="ghost">
                  Live EIBOR Tracker
                </Cta>
              </div>
            </div>

            <div className="bw-calc-shell" data-reveal="rise">
              <Calculator slug="mortgage-calculator" />
            </div>

            <div className="bw-bench mt-8">
              <div className="bw-bench__panel" data-reveal="frost">
                <LiveBenchmark />
                <dl className="bw-bench__rules" aria-label="How EIBOR applies to UAE mortgages">
                  <div className="bw-bench__rule">
                    <dt>Publication cadence</dt>
                    <dd>Every UAE business day</dd>
                  </div>
                  <div className="bw-bench__rule">
                    <dt>Variable-rate formula</dt>
                    <dd className="num">3M EIBOR + bank margin</dd>
                  </div>
                  <div className="bw-bench__rule">
                    <dt>Minimum rate floor</dt>
                    <dd>Stated in written offer letter</dd>
                  </div>
                </dl>
              </div>
              <div className="bw-bench__panel" data-reveal="frost" style={{ ['--i' as string]: 1 }}>
                <RevertBriefing />
              </div>
            </div>
          </div>
        </section>

        {/* 8. HIGHLIGHTED ADVISORY — Exact Homy Infinite Text Marquee behind Rounded Architecture */}
        <section className="homy-section" aria-labelledby="highlight-title">
          <div className="wrap">
            <div className="homy-head">
              <div className="homy-head__left">
                <SectionTag>Highlighted Advisory</SectionTag>
                <h2 id="highlight-title" className="homy-h2" data-reveal="rise">
                  Modern financing, designed to live better
                </h2>
              </div>
              <div className="homy-head__right">
                <p className="homy-sub">
                  Explore how structured pre-approval across {COMMUNITIES.length} UAE freehold communities keeps transfer
                  day calm and predictable.
                </p>
              </div>
            </div>
          </div>

          <div className="homy-highlight-stage">
            <div className="homy-marquee-bg" aria-hidden="true">
              <div className="homy-marquee-track">
                {[0, 1].map((dup) => (
                  <span key={dup}>
                    Compare 24 UAE Banks · Live CBUAE EIBOR · Upfront DLD Clarity · Seamless Transfer Day ·{' '}
                  </span>
                ))}
              </div>
            </div>
            <Link href="/areas" className="homy-highlight-frame block" aria-label="Explore UAE freehold communities">
              <img
                src="/images/abudhabi-corniche-1792.webp"
                alt="Concept image: coastal UAE waterfront villas along turquoise water and skyline"
                width={1792}
                height={2400}
                loading="lazy"
              />
            </Link>
          </div>
        </section>

        {/* 9. OUR DUBAI ADVISORS & INSIGHTS — Exact Homy Infinite Alternating Carousel */}
        <section className="homy-section" aria-labelledby="advisors-title">
          <div className="wrap">
            <div className="homy-head">
              <div className="homy-head__left">
                <SectionTag>Our Dubai Specialists</SectionTag>
                <h2 id="advisors-title" className="homy-h2" data-reveal="rise">
                  The advisors behind every mortgage file
                </h2>
              </div>
              <div className="homy-head__right">
                <p className="homy-sub">
                  Led by Founder &amp; Managing Director Shabib Siraj in Oud Metha, Dubai — guiding every case from DBR
                  check to DLD transfer.
                </p>
                <Cta href="/our-underwriters" size="sm">
                  Meet Full Team
                </Cta>
              </div>
            </div>
          </div>

          <HomyAdvisorsCarousel />
        </section>

        {/* 10. FAQ — Exact Homy Sticky 2-Column Single-Open #f6f6f6 Accordion */}
        <section className="homy-section" aria-labelledby="faq-title">
          <div className="wrap homy-faq-grid">
            <div className="homy-faq-left">
              <SectionTag>FAQ</SectionTag>
              <h2 id="faq-title" className="homy-h2 mt-4" data-reveal="rise">
                Things You Should Know
              </h2>
              <p className="homy-sub mt-4 max-w-sm">
                We have answered the most common Dubai mortgage questions so you can move ahead with complete clarity.
              </p>
              <div className="mt-7">
                <Cta href="/contact" tone="ghost" size="sm">
                  Ask an Advisor
                </Cta>
              </div>
            </div>

            <HomyFaqAccordion faqs={FAQS} />

            <JsonLd
              data={{
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: FAQS.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              }}
            />
          </div>
        </section>
      </div>
    </>
  );
}
