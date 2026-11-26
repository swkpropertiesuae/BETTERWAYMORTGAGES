'use client';

import { useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Cpu,
  FileDown,
  Layers,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import HomeHero from '@/components/home/HomeHero';
import InteractiveAdvisoryCards from '@/components/home/InteractiveAdvisoryCards';
import InteractiveReadinessStudio from '@/components/home/InteractiveReadinessStudio';
import DisclosureToast from '@/components/home/DisclosureToast';
import { HomyFaqAccordion } from '@/components/home/HomySections';
import HoloMortgageCalc from '@/components/ecosystem/HoloMortgageCalc';
import LogoMarquee from '@/components/LogoMarquee';
import FlagshipCta from '@/components/ui/FlagshipCta';
import { VideoBriefingShowcase } from '@/components/ui/MotionPrimitives';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { BANKS } from '@/data/banks';
import { FEATURED_PDFS, PDF_RESOURCES } from '@/data/seo-topics';

function trackSpotlight(e: MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
}

export default function HomeExperience() {
  const { t } = useLocaleCurrency();
  const reduce = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <div className="holo-canvas">
        {/* 1. MORNING DAYLIGHT DUBAI HERO — LIGHT FROSTED VEIL + FLOATING LAPTOP & IPHONE DASHBOARD */}
        <HomeHero />

        {/* 2. TWO 100% PIXEL-LOCKED SYMMETRIC 21st.dev FINTECH ADVISORY CARDS */}
        <InteractiveAdvisoryCards />

        {/* 3. MULTI-CURRENCY MORTGAGE & 4% DLD CALCULATOR + ENDLESS 24-BANK ORIGINAL LOGO MARQUEE */}
        <section id="calculator" className="holo-section" aria-label="Mortgage calculator and 24 UAE banks">
          <div className="mx-auto max-w-[1220px]">
            <HoloMortgageCalc />

            {/* Endless Slow Horizontal Infinite 24-Bank Marquee */}
            <div className="bw-beam-box mt-14 p-6 sm:p-8">
              <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#4f596b]">
                {t.calc.marqueeTitle}
              </p>
              <LogoMarquee
                label="24 licensed UAE banks compared by Betterway Mortgages"
                items={BANKS.map((b) => ({ id: b.key, label: b.name, logo: b.logo, href: `/rates/${b.slug}` }))}
                speed={64}
              />
            </div>
          </div>
        </section>

        {/* 4. ILLUSTRATIVE 1-ON-1 CLIENT EDUCATION (3 PIXEL-CONSISTENT FINTECH CARDS) */}
        <section className="holo-section holo-section--mint" aria-labelledby="education-title">
          <div className="mx-auto max-w-[1220px]">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <span className="homy-tag">
                  <span className="homy-tag__ring" aria-hidden="true" />
                  <span>{t.education.eyebrow}</span>
                </span>
                <h2 id="education-title" className="holo-display-h3">
                  {t.education.heading}
                </h2>
                <p className="holo-lead">{t.education.sub}</p>
              </div>
              <Link href="/contact" className="homy-btn">
                <span>{t.education.cta}</span>
                <span className="homy-btn__disc" aria-hidden="true">
                  <span className="homy-btn__arrow-track">
                    <ArrowRight size={14} strokeWidth={2.2} />
                    <ArrowRight size={14} strokeWidth={2.2} />
                  </span>
                </span>
              </Link>
            </div>

            <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
              {t.education.steps.map((step, idx) => {
                const isSelected = activeStep === idx;
                return (
                  <motion.button
                    key={step.num}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    whileHover={reduce ? undefined : { y: -4 }}
                    transition={{ duration: 0.24 }}
                    className={`flex h-full flex-col justify-between rounded-[24px] border p-7 text-left transition cursor-pointer ${
                      isSelected
                        ? 'bw-fintech-stage !min-h-0 !rounded-[24px] !border-[#d7b158]/40 text-white shadow-[0_26px_58px_-22px_rgba(7,13,25,0.45)]'
                        : 'bw-beam-box !rounded-[24px] text-[#0a1424] hover:border-[#d7b158]'
                    }`}
                  >
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-center justify-between">
                        <span
                          className={`num inline-flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-extrabold ${
                            isSelected ? 'bg-[#f1d57e] text-[#0b0f17]' : 'bg-[#f4f6f8] text-[#0a1424]'
                          }`}
                        >
                          {step.num}
                        </span>
                        <span
                          className={`text-[11px] font-bold uppercase tracking-[0.12em] ${
                            isSelected ? 'text-[#ffe074]' : 'text-[#64748b]'
                          }`}
                        >
                          1-on-1 Guided
                        </span>
                      </div>
                      <h3
                        className={`mt-5 min-h-[56px] font-display text-2xl font-bold leading-snug ${
                          isSelected ? 'text-white' : 'text-[#0a1424]'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className={`mt-2.5 text-sm font-medium leading-relaxed ${isSelected ? 'text-white/90' : 'text-[#334155]'}`}>
                        {step.summary}
                      </p>
                      <p className={`mt-3 pt-2 text-xs leading-relaxed ${isSelected ? 'text-white/70' : 'text-[#64748b]'}`}>
                        {step.detail}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. EXCLUSIVE BETTERWAY SUITE — 100% PIXEL-LOCKED BETTERHUB & BETTERCORE FINTECH CARDS */}
        <section className="holo-section" aria-labelledby="suite-title">
          <div className="mx-auto max-w-[1220px]">
            <div className="max-w-3xl space-y-3.5">
              <span className="homy-tag">
                <span className="homy-tag__ring" aria-hidden="true" />
                <span>{t.suite.eyebrow}</span>
              </span>
              <h2 id="suite-title" className="holo-display-h3">
                {t.suite.heading}
              </h2>
              <p className="holo-lead max-w-2xl">{t.suite.sub}</p>
            </div>

            <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
              {/* BetterHub — For RERA Real Estate Agencies */}
              <div onMouseMove={trackSpotlight} className="bw-21-card flex h-full flex-col">
                <div className="bw-fintech-stage !h-[304px] !rounded-none !border-0">
                  {/* Identical 36px Top Header Bar */}
                  <div className="relative z-10 flex h-9 items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                      <Smartphone size={14} className="text-[#f1d57e]" /> {t.suite.betterHubTag}
                    </span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold text-[#f1d57e]">
                      RERA Portal
                    </span>
                  </div>

                  {/* Identical 184px Center Stage Slot */}
                  <div className="relative z-10 my-auto flex h-[184px] items-center">
                    <div className="grid w-full grid-cols-2 gap-2.5">
                      {[
                        [Smartphone, 'Co-Branded Links', '60s buyer readiness check'],
                        [ShieldCheck, 'Verified Budgets', 'CBUAE 50% DBR cleared'],
                        [Building2, 'Form F → DLD', 'Valuation & NOC alerts'],
                        [CheckCircle2, '24-Bank Desk', 'Faster closing certainty'],
                      ].map(([Icon, title, sub]) => {
                        const Comp = Icon as typeof Smartphone;
                        return (
                          <div
                            key={title as string}
                            className="flex h-[84px] flex-col justify-center rounded-[14px] border border-white/12 bg-white/[0.05] px-3.5 py-2.5 backdrop-blur-md"
                          >
                            <Comp size={15} className="text-[#f1d57e]" />
                            <p className="mt-1.5 font-display text-xs font-bold text-white">{title as string}</p>
                            <p className="text-[10.5px] text-white/65">{sub as string}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Identical 28px Footer Row */}
                  <div className="relative z-10 flex h-7 items-center justify-between text-[11px] font-medium text-white/68">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#f1d57e]" />
                      Live Dubai agency portal · Zero cost to join
                    </span>
                    <span className="font-semibold text-white">BetterHub</span>
                  </div>
                </div>

                {/* Identical Card Copy & Flush-Bottom CTA Layout */}
                <div className="flex flex-1 flex-col justify-between bg-white/95 p-7 sm:p-8">
                  <div>
                    <h3 className="min-h-[60px] font-display text-[23px] font-bold leading-[1.24] tracking-[-0.02em] text-[#080b0f]">
                      {t.suite.betterHubTitle}
                    </h3>
                    <p className="mt-3 min-h-[76px] text-[14.5px] leading-[1.62] text-[#4f596b]">
                      {t.suite.betterHubDesc}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#ebf0ee] pt-5">
                    <Link href="/hub" className="homy-btn bw-btn--sm">
                      <span>{t.suite.betterHubCta}</span>
                      <span className="homy-btn__disc" aria-hidden="true">
                        <span className="homy-btn__arrow-track">
                          <ArrowRight size={14} strokeWidth={2.2} />
                          <ArrowRight size={14} strokeWidth={2.2} />
                        </span>
                      </span>
                    </Link>
                    <Link href="/partners" className="homy-btn homy-btn--outline bw-btn--sm">
                      Join Agency Network
                    </Link>
                  </div>
                </div>
              </div>

              {/* BetterCore — Brokerage Operating Infrastructure */}
              <div onMouseMove={trackSpotlight} className="bw-21-card flex h-full flex-col">
                <div className="bw-fintech-stage !h-[304px] !rounded-none !border-0">
                  {/* Identical 36px Top Header Bar */}
                  <div className="relative z-10 flex h-9 items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                      <Cpu size={14} className="text-[#ffe074]" /> {t.suite.betterCoreTag}
                    </span>
                    <span className="rounded-full border border-[#ffe074]/35 bg-[#ffe074]/15 px-3 py-1 text-[11px] font-bold text-[#ffe074]">
                      Betterway OS
                    </span>
                  </div>

                  {/* Identical 184px Center Stage Slot */}
                  <div className="relative z-10 my-auto flex h-[184px] items-center">
                    <div className="grid w-full grid-cols-2 gap-2.5">
                      {[
                        [Layers, '24-Bank Matrix', 'Conventional & Islamic'],
                        [ShieldCheck, 'CBUAE KFS Flow', 'Audit-ready dossiers'],
                        [Building2, '60 UAE Areas', 'Freehold & handover'],
                        [CheckCircle2, '6 Languages', 'EN · AR · RU · 中文 · FR · ES'],
                      ].map(([Icon, title, sub]) => {
                        const Comp = Icon as typeof Layers;
                        return (
                          <div
                            key={title as string}
                            className="flex h-[84px] flex-col justify-center rounded-[14px] border border-white/14 bg-white/[0.06] px-3.5 py-2.5 backdrop-blur-md"
                          >
                            <Comp size={15} className="text-[#ffe074]" />
                            <p className="mt-1.5 font-display text-xs font-bold text-white">{title as string}</p>
                            <p className="text-[10.5px] text-white/65">{sub as string}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Identical 28px Footer Row */}
                  <div className="relative z-10 flex h-7 items-center justify-between text-[11px] font-medium text-white/68">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ffe074]" />
                      Institutional underwriting &amp; live EIBOR engine
                    </span>
                    <span className="font-semibold text-white">BetterCore</span>
                  </div>
                </div>

                {/* Identical Card Copy & Flush-Bottom CTA Layout */}
                <div className="flex flex-1 flex-col justify-between bg-white/95 p-7 sm:p-8">
                  <div>
                    <h3 className="min-h-[60px] font-display text-[23px] font-bold leading-[1.24] tracking-[-0.02em] text-[#080b0f]">
                      {t.suite.betterCoreTitle}
                    </h3>
                    <p className="mt-3 min-h-[76px] text-[14.5px] leading-[1.62] text-[#4f596b]">
                      {t.suite.betterCoreDesc}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#ebf0ee] pt-5">
                    <Link href="/edge" className="homy-btn bw-btn--sm">
                      <span>{t.suite.betterCoreCta}</span>
                      <span className="homy-btn__disc" aria-hidden="true">
                        <span className="homy-btn__arrow-track">
                          <ArrowRight size={14} strokeWidth={2.2} />
                          <ArrowRight size={14} strokeWidth={2.2} />
                        </span>
                      </span>
                    </Link>
                    <Link href="/portal/login" className="homy-btn homy-btn--outline bw-btn--sm">
                      Open BetterVault
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate Advisory Briefing Film */}
            <div className="mt-10">
              <VideoBriefingShowcase />
            </div>
          </div>
        </section>

        {/* 6. INTERACTIVE 21st.dev CBUAE 50% DBR & CREDIT CARD LIMIT READINESS STUDIO (REPLACING HOME TEAM SECTION) */}
        <InteractiveReadinessStudio />

        {/* 7. FLAGSHIP BRAND-QUALITY EXECUTIVE CTA SHOWCASING BETTERWAY CRAFT */}
        <div className="px-4 py-6 sm:px-6">
          <FlagshipCta />
        </div>

        {/* 8. CONCISE FAQ + 52 FREE NEGLECTED UAE MORTGAGE PDF GUIDES */}
        <section id="faq" className="holo-section" aria-labelledby="faq-title">
          <div className="mx-auto max-w-[1220px]">
            <div className="homy-faq-grid">
              <div className="homy-faq-left">
                <span className="homy-tag">
                  <span className="homy-tag__ring" aria-hidden="true" />
                  <span>{t.faq.eyebrow}</span>
                </span>
                <h2 id="faq-title" className="holo-display-h3 mt-4">
                  {t.faq.heading}
                </h2>
                <p className="holo-lead mt-4 max-w-sm">{t.faq.sub}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/get-started" className="homy-btn bw-btn--sm">
                    <span>{t.faq.cta1}</span>
                    <span className="homy-btn__disc" aria-hidden="true">
                      <span className="homy-btn__arrow-track">
                        <ArrowRight size={14} strokeWidth={2.2} />
                        <ArrowRight size={14} strokeWidth={2.2} />
                      </span>
                    </span>
                  </Link>
                  <Link href="/contact" className="homy-btn homy-btn--outline bw-btn--sm">
                    {t.faq.cta2}
                  </Link>
                </div>
              </div>

              <HomyFaqAccordion faqs={t.faq.items} />
            </div>

            {/* Featured 6 from 52 Free Neglected & Essential UAE Mortgage PDFs */}
            <div className="mt-16 border-t border-[#dce7e2] pt-12">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-2xl space-y-2">
                  <span className="homy-tag">
                    <span className="homy-tag__ring" aria-hidden="true" />
                    <span>{PDF_RESOURCES.length} Free PDF Guides · Zero Email Gate</span>
                  </span>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-[#080b0f] sm:text-3xl">
                    Essential &amp; neglected UAE mortgage PDF playbooks
                  </h3>
                  <p className="text-sm text-[#4f596b]">
                    Credit card 5% DBR traps, post-fixed EIBOR floor audits, Form F valuation clauses, DLD trustee
                    cheque splitters, and {PDF_RESOURCES.length - 6} more free print-ready guides.
                  </p>
                </div>
                <Link href="/downloads" className="homy-btn bw-btn--sm">
                  <span>Explore All {PDF_RESOURCES.length} Free PDFs</span>
                  <span className="homy-btn__disc" aria-hidden="true">
                    <span className="homy-btn__arrow-track">
                      <ArrowRight size={14} strokeWidth={2.2} />
                      <ArrowRight size={14} strokeWidth={2.2} />
                    </span>
                  </span>
                </Link>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {FEATURED_PDFS.map((pdf) => (
                  <a
                    key={pdf.id}
                    href={pdf.file}
                    download
                    className="bw-beam-box group flex flex-col justify-between !rounded-[22px] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#d7b158]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef7f4] px-2.5 py-1 text-[10.5px] font-bold text-[#0e6954]">
                          <FileDown size={12} /> {pdf.category}
                        </span>
                        <span className="num text-[11px] font-semibold text-[#64748b]">{pdf.pages}p PDF</span>
                      </div>
                      <h4 className="mt-3 min-h-[46px] font-display text-[16px] font-bold leading-snug text-[#080b0f] group-hover:text-[#0e6954]">
                        {pdf.title}
                      </h4>
                      <p className="mt-2 flex items-start gap-1.5 rounded-[12px] bg-[#fffaf0] px-2.5 py-2 text-[11.5px] leading-snug text-[#59441a]">
                        <AlertTriangle size={12} className="mt-0.5 shrink-0 text-[#c99527]" />
                        <span>{pdf.neglectedWhy}</span>
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#0e6954]">
                      Download Free PDF <ArrowRight size={12} className="transition group-hover:translate-x-0.5" />
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-[#464c5c]">
                <span>Explore 60 freehold community briefs, 36 UAE policy insights, and our full team directory:</span>
                <div className="flex flex-wrap gap-4">
                  <Link href="/downloads" className="text-[#0e6954] hover:underline">
                    All {PDF_RESOURCES.length} Free PDF Guides →
                  </Link>
                  <Link href="/insights" className="text-[#070e1a] hover:underline">
                    36 UAE Insights →
                  </Link>
                  <Link href="/about-us" className="text-[#070e1a] hover:underline">
                    Meet Our Dubai Leadership →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <DisclosureToast />
    </>
  );
}
