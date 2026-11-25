import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Cpu,
  FileDown,
  Layers,
  MapPin,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';
import HomeHero from '@/components/home/HomeHero';
import DisclosureToast from '@/components/home/DisclosureToast';
import RevertBriefing from '@/components/home/RevertBriefing';
import StatCounter from '@/components/home/StatCounter';
import { HomyAdvisorsCarousel, HomyFaqAccordion } from '@/components/home/HomySections';
import HoloMortgageCalc from '@/components/ecosystem/HoloMortgageCalc';
import { LiveBenchmark } from '@/components/StartupExperience';
import LogoMarquee from '@/components/LogoMarquee';
import { ScrollScaleFrame, SpotlightCard, VideoBriefingShowcase } from '@/components/ui/MotionPrimitives';
import { Cta, JsonLd, SectionTag, aed } from '@/components/ui';
import { BANKS } from '@/data/banks';
import { COMMUNITIES } from '@/data/communities';
import { PROJECTS } from '@/data/handover';
import { PDF_RESOURCES } from '@/data/seo-topics';
import { TRENDING_UAE_KEYWORDS, pdfCatalogSchema, speakablePageSchema } from '@/lib/seo-schema';
import { cashToClose } from '@/lib/math';

export const metadata: Metadata = {
  title: 'Betterway Mortgages — Independent Dubai & UAE Mortgage Advisory across 24 Banks',
  description:
    'Independent Dubai & UAE mortgage advisory comparing 24 licensed conventional and Islamic lenders. Review CBUAE 50% DBR limits, itemised 4% DLD closing costs, live EIBOR fixings, and printable 2026 PDF guides.',
  keywords: TRENDING_UAE_KEYWORDS,
  alternates: { canonical: '/' },
};

const COMPARE_ROWS = [
  ['Compare across 24 licensed UAE conventional & Islamic banks', true, false],
  ['Full post-fixed EIBOR revert margin & minimum floor audit', true, false],
  ['Itemised 4% DLD, trustee & mortgage registration fee sheet upfront', true, false],
  ['50% CBUAE DBR & credit card 5% limit stress-testing before applying', true, false],
  ['Form F valuation protection clauses & DLD transfer cheque splitter', true, false],
  ['Bilingual EN / العربية client portal & Betterway OS milestone tracking', true, false],
] as const;

const EDITORIAL_GUIDES = [
  {
    tag: 'Valuation & Legal',
    readTime: '6 min read',
    title: 'Dubai Form F Mortgage Valuation Protection Clause Guide',
    excerpt: 'How to protect your 10% security cheque if an independent bank valuation lands below the MOU price.',
    href: '/guides/dubai-form-f-mortgage-valuation-protection-clause',
    img: '/images/guide-valuation.webp',
    img2x: '/images/guide-valuation-2752.webp',
  },
  {
    tag: 'CBUAE Rules',
    readTime: '5 min read',
    title: 'How Credit Card Limits Quietly Shrink Your UAE Mortgage Power',
    excerpt: 'Why unused credit card limits are assessed at 5% monthly under CBUAE DBR rules — and how to fix it before applying.',
    href: '/guides/how-credit-card-limits-reduce-uae-mortgage-dbr',
    img: '/images/guide-dbr-planning.webp',
    img2x: '/images/guide-dbr-planning-2752.webp',
  },
  {
    tag: 'Closing Day',
    readTime: '7 min read',
    title: 'Complete Dubai Land Department Trustee Transfer Day Checklist',
    excerpt: 'Manager’s cheques, developer NOC, seller liability letters, and exact timing at the DLD trustee office.',
    href: '/guides/complete-dld-trustee-transfer-day-checklist',
    img: '/images/guide-transfer-day.webp',
    img2x: '/images/guide-transfer-day-2752.webp',
  },
  {
    tag: 'Off-Plan',
    readTime: '8 min read',
    title: 'Dubai Off-Plan Handover Mortgage & Equity Uplift Guide',
    excerpt: 'Preparing bank valuation and completion finance 90–120 days ahead of Emaar, Sobha, Meraas, or DAMAC handover.',
    href: '/handover/dubai-off-plan-handover-mortgage-guide',
    img: '/images/offplan-dusk.webp',
    img2x: '/images/offplan-dusk-2752.webp',
  },
  {
    tag: 'Refinancing',
    readTime: '5 min read',
    title: 'UAE Mortgage Buyout & 1% / AED 10,000 Early Settlement Cap',
    excerpt: 'Calculating your exact break-even timeline when switching off a high post-fixed EIBOR revert rate.',
    href: '/mortgages/mortgage-buyout-refinance',
    img: '/images/keys-handover.webp',
    img2x: '/images/keys-handover-2752.webp',
  },
] as const;

const FAQS = [
  {
    q: 'How is Betterway Mortgages different from applying directly to a single UAE bank?',
    a: 'Going direct shows you one lender’s credit policy and one rate sheet. Betterway structures your file across 24 licensed UAE conventional and Islamic lenders — comparing fixed periods, post-fixed EIBOR revert margins, minimum floors, bank fees, and insurance side by side before you submit a single application.',
  },
  {
    q: 'How much upfront cash do I need for an AED 2,000,000 Dubai home?',
    a: `At a 20% resident down payment, our calculator estimates ${aed(cashToClose({ price: 2_000_000, downPct: 20 }).total)} total cash to close — including the down payment, 4% DLD transfer fee, title deed, 0.25% mortgage registration, AED 4,200 trustee fee, valuation allowance, and agency commission.`,
  },
  {
    q: 'Does checking my eligibility on Betterway affect my AECB credit score?',
    a: 'No. Using our 60-second Pre-Approval Readiness Wizard, DBR calculator, or DLD fee sheet has zero impact on your Al Etihad Credit Bureau (AECB) credit report. Credit checks only happen when you formally authorise a bank application.',
  },
  {
    q: 'Can non-residents and overseas investors get a mortgage in Dubai?',
    a: 'Yes. Selected UAE lenders finance international buyers earning salaried or business income abroad. Lender LTV policies, eligible countries, and minimum income thresholds vary by bank — we map 25 country profiles and compare eligible lenders upfront.',
  },
  {
    q: 'What are the official Central Bank of the UAE (CBUAE) borrowing rules?',
    a: 'CBUAE Mortgage Regulations cap total Debt Burden Ratio (DBR) at 50% of gross monthly income, cap first-home LTV at 80% for expats and 85% for UAE Nationals (up to AED 5M), cap maximum tenure at 25 years, and cap early settlement exit fees at 1% or AED 10,000 (+5% VAT), whichever is lower.',
  },
  {
    q: 'How do RERA real estate agents and brokerages partner with Betterway?',
    a: 'Through the Betterway Partner Desk, RERA agents share co-branded calculators, verify buyer DBR readiness before viewings, and track referred files live from Form F to DLD trustee day inside Betterway OS.',
  },
];

export default function Home() {
  const featuredBanks = BANKS.slice(0, 4);
  const featuredCommunities = COMMUNITIES.slice(0, 6);

  return (
    <>
      <link
        rel="preload"
        as="image"
        type="image/avif"
        imageSrcSet="/images/hero-morning-01-1280.avif 1280w, /images/hero-morning-01-2048.avif 2048w, /images/hero-morning-01-3840.avif 3840w, /images/hero-morning-01-max.avif 4140w"
        imageSizes="100vw"
        fetchPriority="high"
      />
      <div className="holo-canvas">
        {/* 1. BRIGHT MORNING DAYLIGHT DUBAI HERO — ALIGNED HEADER/HERO RAIL */}
        <HomeHero />

        {/* 2. INDEPENDENT UAE ADVISORY — TWO-ROW STRUCTURED FINANCE BRIEF */}
        <section className="holo-section" aria-labelledby="ecosystem-title">
          <div className="mx-auto max-w-[1220px]">
            <div className="max-w-3xl space-y-4">
              <SectionTag>Independent UAE Advisory</SectionTag>
              <h2 id="ecosystem-title" className="holo-display-h2">
                Clarity before you commit.
              </h2>
              <p className="holo-lead max-w-2xl" data-aeo-answer="true">
                Before paying a booking deposit or signing RERA Form F, our Oud Metha advisory desk lays out your real
                50% CBUAE DBR capacity, itemised 4% DLD closing costs, and side-by-side lender terms across 24 UAE
                banks and {COMMUNITIES.length} freehold communities.
              </p>
            </div>

            <div className="mt-14 space-y-14 lg:space-y-20">
              {/* Row 1: Deep Gradient Live Bank Comparison UI Card + Financing Copy */}
              <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div className="holo-visual-stage" data-reveal="frost">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                      <img src="/brand/icon.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
                      24-Bank Comparison Engine
                    </span>
                    <span className="rounded-full bg-[#179373]/25 px-3 py-1 text-[11px] font-bold text-[#34dfac]">
                      Conventional &amp; Islamic
                    </span>
                  </div>

                  <div className="my-6 space-y-2.5">
                    {featuredBanks.map((bank, idx) => (
                      <Link
                        key={bank.key}
                        href={`/rates/${bank.slug}`}
                        className={`flex items-center justify-between gap-3 rounded-[16px] border px-4 py-3.5 transition ${
                          idx === 0
                            ? 'border-[#d7b158]/55 bg-white text-[#121217] shadow-lg'
                            : 'border-white/12 bg-white/[0.06] text-white hover:bg-white/[0.12]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="grid h-10 w-16 shrink-0 place-items-center rounded-[10px] bg-white p-1.5">
                            <img src={bank.logo} alt={bank.name} className="max-h-6 max-w-full object-contain" loading="lazy" />
                          </span>
                          <div className="min-w-0">
                            <p className={`truncate font-display text-sm font-bold ${idx === 0 ? 'text-[#121217]' : 'text-white'}`}>
                              {bank.name}
                            </p>
                            <p className={`text-xs ${idx === 0 ? 'text-[#6c6c89]' : 'text-white/65'}`}>
                              {bank.type} · Written FOL &amp; EIBOR revert audit
                            </p>
                          </div>
                        </div>
                        <ArrowRight size={15} className={`shrink-0 ${idx === 0 ? 'text-[#0e6954]' : 'text-white/60'}`} />
                      </Link>
                    ))}
                  </div>

                  <p className="text-[11.5px] text-white/60">
                    Bank-neutral directory comparison · Written lender terms confirmed prior to application.
                  </p>
                </div>

                <div className="space-y-6 lg:pl-6">
                  <h3 className="holo-display-h3">Twenty-four UAE lenders reviewed on one desk</h3>
                  <p className="holo-lead">
                    Every bank advertises its introductory fixed rate. We examine what follows it — post-fixed EIBOR
                    revert margins, minimum rate floors, valuation terms, and insurance assignment rules in clear
                    written schedules.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <Cta href="/get-started">Start eligibility brief</Cta>
                    <Cta href="/rates" tone="ghost">
                      Review all 24 lenders
                    </Cta>
                  </div>
                </div>
              </div>

              {/* Row 2: Deep Gradient Property & DLD Budget Visual Card + Concierge Copy */}
              <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div className="holo-visual-stage" data-reveal="frost">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                      <Building2 size={14} className="text-[#f1d57e]" />
                      Dubai &amp; UAE Property Finance Map
                    </span>
                    <span className="num rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/85">
                      {COMMUNITIES.length} Freehold Areas
                    </span>
                  </div>

                  <div className="my-5 overflow-hidden rounded-[16px] border border-white/15">
                    <img
                      src="/images/dubai-waterfront-1672.webp"
                      srcSet="/images/dubai-waterfront-1280.webp 1280w, /images/dubai-waterfront-1672.webp 1672w"
                      sizes="(min-width: 1024px) 42vw, 92vw"
                      alt="Dubai waterfront residential architecture overlooking the marina skyline"
                      width={1672}
                      height={941}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {featuredCommunities.map((area) => (
                      <Link
                        key={area.slug}
                        href={`/areas/${area.emirate}/${area.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition hover:border-[#34dfac] hover:bg-white/20"
                      >
                        <MapPin size={11} className="text-[#34dfac]" />
                        {area.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 lg:pl-6">
                  <h3 className="holo-display-h3">Protect your deposit before signing Form F</h3>
                  <p className="holo-lead">
                    Most transaction setbacks in Dubai stem from an unverified DBR cap or an unexpected valuation gap.
                    We structure mortgage-contingent Form F addenda and verify every trustee cheque ahead of transfer.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <Cta href="/concierge">Explore Property Closing Desk</Cta>
                    <Cta href="/tools/form-f-clause-generator" tone="ghost">
                      Form F Clause Tool
                    </Cta>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. INTERACTIVE HOLO-STYLE SPLIT MORTGAGE + 4% DLD CALCULATOR + 24 UAE BANKS + LIVE EIBOR */}
        <section id="calculator" className="holo-section" aria-label="Mortgage calculator and live CBUAE EIBOR">
          <div className="mx-auto max-w-[1220px]">
            <HoloMortgageCalc />

            {/* 24 Authentic UAE Bank Logos Marquee */}
            <div className="mt-16 border-t border-[#eef0f3] pt-10">
              <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#6c6c89]">
                Comparing mortgage structures across {BANKS.length} licensed UAE lenders
              </p>
              <LogoMarquee
                label="UAE banks in the lender directory"
                items={BANKS.map((b) => ({ id: b.key, label: b.name, logo: b.logo, href: `/rates/${b.slug}` }))}
              />
            </div>

            {/* Live CBUAE EIBOR Fixing & Revert Margin Transparency */}
            <div className="bw-bench mt-12">
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
                    <dt>Early settlement cap</dt>
                    <dd>1% or AED 10,000 (+5% VAT)</dd>
                  </div>
                </dl>
              </div>
              <div className="bw-bench__panel" data-reveal="frost" style={{ ['--i' as string]: 1 }}>
                <RevertBriefing />
              </div>
            </div>
          </div>
        </section>

        {/* 4. INSTITUTIONAL PARTNER DESK & BROKERAGE PLATFORM */}
        <section className="holo-section holo-section--mint" aria-labelledby="b2b-title">
          <div className="mx-auto max-w-[1220px]">
            <div className="max-w-3xl space-y-4">
              <SectionTag>For RERA Brokerages &amp; Advisors</SectionTag>
              <h2 id="b2b-title" className="holo-display-h2">
                Built for Dubai brokerages and advisors
              </h2>
              <p className="holo-lead max-w-2xl">
                Direct 24-bank underwriting coordination and Betterway OS case tracking that help RERA agencies and
                independent mortgage consultants bring qualified buyers cleanly to transfer.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {/* Card 1: Betterway Partner Desk (For Real Estate Agencies) */}
              <SpotlightCard className="flex flex-col overflow-hidden rounded-[26px] border border-[#dce7e2] bg-white shadow-sm">
                <div className="holo-visual-stage !min-h-[300px] !rounded-none">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#121217]">
                      <Smartphone size={14} className="text-[#0e6954]" /> Betterway Partner Desk
                    </span>
                    <span className="text-xs font-semibold text-[#34dfac]">RERA Agency Portal</span>
                  </div>
                  <div className="mx-auto my-5 w-full max-w-[320px] rounded-[22px] border border-white/20 bg-[#080b0f]/85 p-5 shadow-2xl backdrop-blur-md">
                    <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                      <img src="/brand/icon.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                      <div>
                        <p className="text-xs font-bold text-white">Buyer Readiness Verified</p>
                        <p className="text-[10.5px] text-white/60">CBUAE 50% DBR · 24-Bank Panel</p>
                      </div>
                    </div>
                    <div className="mt-3.5 space-y-2 text-xs">
                      <div className="flex justify-between text-white/80">
                        <span>Co-branded calculators</span>
                        <span className="font-semibold text-[#34dfac]">Active</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Milestone tracking</span>
                        <span className="font-semibold text-[#f1d57e]">Form F → DLD</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-white/55">Built for Dubai &amp; UAE RERA brokerages</span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#121217] sm:text-3xl">
                      Keep buyer deals moving to transfer
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#6c6c89]">
                      Equip your sales team with co-branded DBR and 4% DLD calculators, confirm financing capacity
                      before viewings, and monitor every referred case inside Betterway OS.
                    </p>
                  </div>
                  <div className="mt-6">
                    <Cta href="/hub">Explore Partner Desk</Cta>
                  </div>
                </div>
              </SpotlightCard>

              {/* Card 2: Betterway Brokerage Platform (Betterway OS Infrastructure) */}
              <SpotlightCard className="flex flex-col overflow-hidden rounded-[26px] border border-[#dce7e2] bg-white shadow-sm">
                <div className="holo-visual-stage !min-h-[300px] !rounded-none">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#121217]">
                      <Cpu size={14} className="text-[#0e6954]" /> Betterway Brokerage Platform
                    </span>
                    <span className="text-xs font-semibold text-[#f1d57e]">Betterway OS</span>
                  </div>
                  <div className="my-5 grid grid-cols-2 gap-3">
                    {[
                      [Layers, '24-Lender Matrix', 'Conventional & Islamic'],
                      [ShieldCheck, 'CBUAE KFS Flow', 'Audit-ready files'],
                      [Building2, '60 UAE Areas', 'Freehold & handover'],
                      [CheckCircle2, 'EN & العربية', 'Bilingual client vault'],
                    ].map(([Icon, t, s]) => {
                      const Comp = Icon as typeof Layers;
                      return (
                        <div key={t as string} className="rounded-[14px] border border-white/12 bg-white/[0.06] p-3.5">
                          <Comp size={16} className="text-[#34dfac]" />
                          <p className="mt-2 font-display text-xs font-bold text-white">{t as string}</p>
                          <p className="text-[10.5px] text-white/60">{s as string}</p>
                        </div>
                      );
                    })}
                  </div>
                  <span className="text-[11px] text-white/55">Independent advisor &amp; multi-desk brokerage tiers</span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#121217] sm:text-3xl">
                      Institutional infrastructure for mortgage teams
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#6c6c89]">
                      Operate your UAE mortgage practice on Betterway OS with CBUAE Key Facts Statement workflows,
                      deterministic underwriting calculators, and our 24-bank directory.
                    </p>
                  </div>
                  <div className="mt-6">
                    <Cta href="/edge">Explore Brokerage Platform</Cta>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* 5. INDEPENDENT COMPARISON + 24-SECOND BRIEFING FILM */}
        <section className="holo-section" aria-labelledby="compare-title">
          <div className="mx-auto max-w-[1220px] space-y-14">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div className="space-y-5">
                <SectionTag>Independent Comparison</SectionTag>
                <h2 id="compare-title" className="holo-display-h3">
                  Why borrowers compare twenty-four banks before applying to one
                </h2>
                <p className="holo-lead">
                  Applying directly shows one lender’s credit box and introductory rate. Post-fixed revert margins,
                  DLD outlays, and credit-card DBR deductions are far easier to address before an application is lodged.
                </p>
                <Cta href="/why-betterway-vs-direct-bank" tone="ghost" size="sm">
                  Read Full Comparison
                </Cta>
              </div>

              <div className="overflow-hidden rounded-[22px] border border-[#e5e7eb] bg-[#f8f9fa]">
                <div className="grid grid-cols-[1fr_100px_100px] border-b border-[#e5e7eb] bg-white px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#6c6c89]">
                  <span>Feature</span>
                  <span className="text-center text-[#0e6954]">Betterway</span>
                  <span className="text-center">1 Bank</span>
                </div>
                <div className="divide-y divide-[#eceef2]">
                  {COMPARE_ROWS.map(([feat, bw, direct]) => (
                    <div
                      key={feat}
                      className="grid grid-cols-[1fr_100px_100px] items-center px-5 py-4 text-sm text-[#121217]"
                    >
                      <span className="font-medium pr-3">{feat}</span>
                      <span className="grid place-items-center">
                        {bw && (
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#179373] text-white">
                            <Check size={15} strokeWidth={2.8} />
                          </span>
                        )}
                      </span>
                      <span className="grid place-items-center">
                        {!direct && (
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#e5e7eb] text-[#6c6c89]">
                            <X size={14} strokeWidth={2.5} />
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 24-Second Full-HD Corporate Briefing Film */}
            <VideoBriefingShowcase />
          </div>
        </section>

        {/* 6. OUD METHA DUBAI SPECIALISTS DESK */}
        <section className="holo-section" aria-labelledby="advisors-title">
          <div className="mx-auto max-w-[1220px]">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <SectionTag>Our Oud Metha, Dubai Desk</SectionTag>
                <h2 id="advisors-title" className="holo-display-h3">
                  The specialists managing your file from valuation to keys
                </h2>
                <p className="holo-lead">
                  Led by Founder &amp; Managing Director Shabib Siraj from Al Nasr Plaza, Oud Metha — select any
                  advisor below to review their desk remit and qualifications.
                </p>
              </div>
              <Cta href="/our-underwriters" size="sm">
                Meet Full Team
              </Cta>
            </div>
          </div>

          <HomyAdvisorsCarousel />
        </section>

        {/* 7. FACTUAL UAE COVERAGE METRICS */}
        <section className="holo-section holo-section--dark" aria-label="Betterway advisory coverage">
          <div className="mx-auto max-w-[1220px] grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                <StatCounter value={BANKS.length} />
              </p>
              <p className="mt-2 text-sm font-medium text-white/70">Licensed UAE lenders compared</p>
            </div>
            <div>
              <p className="font-display text-5xl font-extrabold tracking-tight text-[#34dfac] sm:text-6xl">
                <StatCounter value={COMMUNITIES.length} suffix="+" />
              </p>
              <p className="mt-2 text-sm font-medium text-white/70">UAE freehold areas mapped</p>
            </div>
            <div>
              <p className="font-display text-5xl font-extrabold tracking-tight text-[#f1d57e] sm:text-6xl">
                <StatCounter value={PROJECTS.length} suffix="+" />
              </p>
              <p className="mt-2 text-sm font-medium text-white/70">Off-plan handover projects</p>
            </div>
            <div>
              <p className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                <StatCounter value={50} suffix="%" />
              </p>
              <p className="mt-2 text-sm font-medium text-white/70">CBUAE statutory DBR enforced</p>
            </div>
          </div>
        </section>

        {/* 8. UAE EMIRATES COVERAGE SHOWCASE */}
        <section className="holo-section overflow-hidden" aria-labelledby="highlight-title">
          <div className="mx-auto max-w-[1220px] mb-6 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <SectionTag>Across Dubai, Abu Dhabi &amp; Northern Emirates</SectionTag>
              <h2 id="highlight-title" className="holo-display-h3">
                Prepared well ahead of bank valuation and trustee day
              </h2>
            </div>
            <Cta href="/areas" size="sm" tone="ghost">
              Browse 60 Communities
            </Cta>
          </div>
          <div className="homy-highlight-stage">
            <div className="homy-marquee-bg" aria-hidden="true">
              <div className="homy-marquee-track">
                <span>24 UAE Banks Compared · Live CBUAE EIBOR · Upfront 4% DLD Clarity</span>
              </div>
            </div>
            <ScrollScaleFrame>
              <Link href="/areas" className="homy-highlight-frame block" aria-label="Explore UAE freehold communities">
                <img
                  src="/images/abudhabi-corniche-1792.webp"
                  srcSet="/images/abudhabi-corniche.webp 1376w, /images/abudhabi-corniche-1792.webp 1792w, /images/abudhabi-corniche-2752.webp 2752w"
                  sizes="(min-width: 960px) 920px, 95vw"
                  alt="Aerial daylight view of the Abu Dhabi Corniche beachfront, turquoise Gulf water, and UAE skyline"
                  width={2752}
                  height={1548}
                  loading="lazy"
                  decoding="async"
                />
              </Link>
            </ScrollScaleFrame>
          </div>
        </section>

        {/* 9. REGULATORY BRIEFINGS & PRINTABLE PDF GUIDES */}
        <section className="holo-section" aria-labelledby="guides-title">
          <div className="mx-auto max-w-[1220px]">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div className="space-y-3">
                <SectionTag>Regulatory &amp; Market Briefings</SectionTag>
                <h2 id="guides-title" className="holo-display-h2">
                  UAE mortgage rules, written in plain English
                </h2>
              </div>
              <Cta href="/guides" tone="ghost" size="sm">
                Read all guides
              </Cta>
            </div>

            <div className="holo-news-track">
              {EDITORIAL_GUIDES.map((g) => (
                <Link key={g.href} href={g.href} className="holo-news-card group">
                  <div className="aspect-[16/10] w-full overflow-hidden bg-[#eef0f3]">
                    <img
                      src={g.img}
                      srcSet={`${g.img} 1376w, ${g.img2x} 2752w`}
                      sizes="(max-width: 640px) 82vw, 360px"
                      alt={g.title}
                      width={1376}
                      height={774}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#6c6c89]">
                      <span className="rounded-full bg-[#eef7f4] px-2.5 py-0.5 text-[#0e6954]">{g.tag}</span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} /> {g.readTime}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug text-[#121217] group-hover:text-[#0e6954]">
                      {g.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6c6c89]">{g.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-bold text-[#121217] group-hover:text-[#0e6954]">
                      Read guide <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Free Printable 2026 UAE Mortgage PDF Dossiers + 36 Trending Insights Strip */}
            <div className="mt-8 grid gap-4 border-t border-[#e5e7eb] pt-8 md:grid-cols-3">
              {PDF_RESOURCES.map((pdf) => (
                <a
                  key={pdf.id}
                  href={pdf.file}
                  download
                  className="flex flex-col justify-between rounded-[18px] border border-[#e5e7eb] bg-[#f8f9fa] p-5 transition-colors hover:border-[#179373] hover:bg-white"
                >
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef7f4] px-2.5 py-1 text-[11px] font-bold text-[#0e6954]">
                      <FileDown size={12} /> Free PDF · {pdf.pages} {pdf.pages === 1 ? 'Page' : 'Pages'}
                    </span>
                    <h3 className="mt-2.5 font-display text-base font-bold text-[#070e1a]">{pdf.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#464c5c]">{pdf.subtitle}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#0e6954]">
                    Download PDF <ArrowRight size={12} />
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-[#464c5c]">
              <span>Explore 36 trending 2026–2027 UAE mortgage guides, community rules, and non-resident playbooks:</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/insights" className="text-[#0e6954] hover:underline">
                  All 36 UAE Insights →
                </Link>
                <Link href="/downloads" className="text-[#070e1a] hover:underline">
                  PDF Library →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <JsonLd
          data={speakablePageSchema(
            '/',
            'Dubai & UAE Property & Mortgage Ecosystem | Betterway Mortgages',
            'Compare 24 UAE banks, check 50% CBUAE DBR, itemise 4% DLD closing fees, and download free 2026 mortgage PDF guides.',
          )}
        />
        <JsonLd data={pdfCatalogSchema()} />

        {/* 10. STICKY FAQ ACCORDION */}
        <section id="faq" className="holo-section" aria-labelledby="faq-title">
          <div className="mx-auto max-w-[1220px] homy-faq-grid">
            <div className="homy-faq-left">
              <SectionTag>Frequently Asked Questions</SectionTag>
              <h2 id="faq-title" className="holo-display-h3 mt-4">
                Direct answers to the questions buyers ask first
              </h2>
              <p className="holo-lead mt-4 max-w-sm">
                Grounded in Central Bank of the UAE (CBUAE) Mortgage Loan Regulations and Dubai Land Department fee
                schedules.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Cta href="/get-started" size="sm">
                  Start 60s Check
                </Cta>
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

      <DisclosureToast />
    </>
  );
}
