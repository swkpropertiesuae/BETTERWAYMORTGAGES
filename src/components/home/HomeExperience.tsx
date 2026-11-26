'use client';

import { useState } from 'react';
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
import { HomyFaqAccordion } from '@/components/home/HomySections';
import HoloMortgageCalc from '@/components/ecosystem/HoloMortgageCalc';
import LogoMarquee from '@/components/LogoMarquee';
import FlagshipCta from '@/components/ui/FlagshipCta';
import {
  SPRING_INSTITUTIONAL,
  SwissReveal,
  VideoBriefingShowcase,
} from '@/components/ui/MotionPrimitives';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { BANKS } from '@/data/banks';
import { FEATURED_PDFS } from '@/data/seo-topics';
import { EXECUTIVE_LEADERSHIP } from '@/data/team';

/**
 * Betterway Mortgages Flagship 8-Band Swiss / DIFC Institutional Homepage.
 * Alternating tonal cadence: Navy -> White -> Stone -> White -> Navy -> White -> Stone -> Navy.
 * 100% localized across /, /ru, /zh, /fr, /es via useLocaleCurrency().
 */
export default function HomeExperience() {
  const { t, ext, swiss } = useLocaleCurrency();
  const reduce = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const hubIcons = [Smartphone, ShieldCheck, Building2, CheckCircle2] as const;
  const coreIcons = [Layers, ShieldCheck, Building2, CheckCircle2] as const;

  return (
    <div className="holo-canvas">
      {/* BAND 1 (MIDNIGHT NAVY): Institutional Hero + Live Pre-Check Console */}
      <HomeHero />

      {/* BAND 2 (PURE WHITE): 24-Bank Official Directory Marquee + 4 Institutional Proof Metrics */}
      <section
        aria-label="24 licensed UAE banks and statutory caps"
        className="border-b border-[#e3e7ee] bg-white py-12 lg:py-14"
      >
        <div className="wrap">
          <p className="mb-5 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4a5568]">
            {t.calc.marqueeTitle}
          </p>
          <LogoMarquee
            label="24 licensed UAE banks compared by Betterway Mortgages"
            items={BANKS.map((b) => ({ id: b.key, label: b.name, logo: b.logo, href: `/rates/${b.slug}` }))}
            speed={64}
          />

          <div className="mt-10 grid grid-cols-2 divide-y divide-[#e3e7ee] border-t border-[#e3e7ee] pt-8 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {swiss.metrics.map(([figure, caption], i) => (
              <div
                key={figure}
                className={`px-4 py-3 ${i % 2 === 0 ? 'lg:ps-6' : ''} ${i === 0 ? 'lg:ps-0' : 'lg:ps-8'}`}
              >
                <p className="num font-display text-2xl font-bold tracking-tight text-[#070e1a] sm:text-3xl">
                  {figure}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#4a5568]">{caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BAND 3 (ARCHITECTURAL STONE): Swiss 4-Mandate Bento + Preserved Bank & Buyer Workbench */}
      <InteractiveAdvisoryCards />

      {/* BAND 4 (PURE WHITE): Executive Multi-Currency Mortgage & 4% DLD Split Workbench */}
      <section id="calculator" className="holo-section" aria-label="Mortgage calculator and 4% DLD breakdown">
        <SwissReveal className="wrap">
          <HoloMortgageCalc />
        </SwissReveal>
      </section>

      {/* BAND 5 (MIDNIGHT NAVY): Interactive 50% DBR Studio + BetterHub & BetterCore + Briefing Film */}
      <section className="holo-section holo-section--dark" aria-labelledby="suite-title">
        <div className="wrap space-y-16 lg:space-y-20">
          {/* Part A: 50% DBR & Credit-Card 5% Rule Simulator */}
          <InteractiveReadinessStudio />

          {/* Divider */}
          <div className="h-px w-full bg-white/10" aria-hidden="true" />

          {/* Part B: BetterHub & BetterCore Platform Infrastructure */}
          <div>
            <div className="max-w-3xl space-y-3">
              <span className="homy-tag homy-tag--light">
                <span className="homy-tag__ring" aria-hidden="true" />
                <span>{t.suite.eyebrow}</span>
              </span>
              <h2 id="suite-title" className="holo-display-h3 !text-white">
                {t.suite.heading}
              </h2>
              <p className="max-w-2xl text-[15.5px] leading-relaxed text-white/70">{t.suite.sub}</p>
            </div>

            <div className="mt-9 grid items-stretch gap-6 lg:grid-cols-2">
              {/* BetterHub — For RERA Real Estate Agencies */}
              <div className="flex h-full flex-col justify-between rounded-[20px] border border-white/12 bg-[#0c1524] p-7 transition hover:border-[#d7b158]/45">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 rounded-[8px] border border-white/14 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-white">
                      <Smartphone size={14} className="text-[#d7b158]" /> {t.suite.betterHubTag}
                    </span>
                    <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#fcf1b7]">
                      {ext.suiteUi.hubPortalBadge}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    {ext.suiteUi.hubItems.map(([title, sub], idx) => {
                      const Comp = hubIcons[idx];
                      return (
                        <div
                          key={title}
                          className="rounded-[12px] border border-white/10 bg-[#070e1a] px-3.5 py-3"
                        >
                          <Comp size={14} className="text-[#34dfac]" />
                          <p className="mt-1.5 font-display text-xs font-semibold text-white">{title}</p>
                          <p className="mt-0.5 text-[11px] text-white/60">{sub}</p>
                        </div>
                      );
                    })}
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold leading-snug text-white">
                    {t.suite.betterHubTitle}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/70">{t.suite.betterHubDesc}</p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                  <Link href="/hub" className="homy-btn homy-btn--white bw-btn--sm">
                    <span>{t.suite.betterHubCta}</span>
                    <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
                      <ArrowRight size={13} strokeWidth={2.2} />
                    </span>
                  </Link>
                  <Link
                    href="/partners"
                    className="inline-flex h-10 items-center rounded-[10px] border border-white/20 px-4 text-xs font-semibold text-white transition hover:border-[#d7b158] hover:text-[#fcf1b7]"
                  >
                    {ext.suiteUi.hubSecondaryCta}
                  </Link>
                </div>
              </div>

              {/* BetterCore — Brokerage Operating Infrastructure */}
              <div className="flex h-full flex-col justify-between rounded-[20px] border border-white/12 bg-[#0c1524] p-7 transition hover:border-[#d7b158]/45">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 rounded-[8px] border border-white/14 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-white">
                      <Cpu size={14} className="text-[#d7b158]" /> {t.suite.betterCoreTag}
                    </span>
                    <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#fcf1b7]">
                      {ext.suiteUi.coreOsBadge}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    {ext.suiteUi.coreItems.map(([title, sub], idx) => {
                      const Comp = coreIcons[idx];
                      return (
                        <div
                          key={title}
                          className="rounded-[12px] border border-white/10 bg-[#070e1a] px-3.5 py-3"
                        >
                          <Comp size={14} className="text-[#d7b158]" />
                          <p className="mt-1.5 font-display text-xs font-semibold text-white">{title}</p>
                          <p className="mt-0.5 text-[11px] text-white/60">{sub}</p>
                        </div>
                      );
                    })}
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold leading-snug text-white">
                    {t.suite.betterCoreTitle}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/70">{t.suite.betterCoreDesc}</p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                  <Link href="/edge" className="homy-btn homy-btn--white bw-btn--sm">
                    <span>{t.suite.betterCoreCta}</span>
                    <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
                      <ArrowRight size={13} strokeWidth={2.2} />
                    </span>
                  </Link>
                  <Link
                    href="/portal/login"
                    className="inline-flex h-10 items-center rounded-[10px] border border-white/20 px-4 text-xs font-semibold text-white transition hover:border-[#d7b158] hover:text-[#fcf1b7]"
                  >
                    {ext.suiteUi.coreSecondaryCta}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Part C: Corporate Advisory Briefing Film */}
          <VideoBriefingShowcase />
        </div>
      </section>

      {/* BAND 6 (PURE WHITE): 3-Step 1-on-1 Advisory Process + Compact Localized Leadership Callout */}
      <section className="holo-section" aria-labelledby="education-title">
        <div className="wrap space-y-12">
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
            <Link href="/contact" className="homy-btn bw-btn--sm">
              <span>{t.education.cta}</span>
              <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
                <ArrowRight size={13} strokeWidth={2.2} />
              </span>
            </Link>
          </div>

          <div className="grid items-stretch gap-5 md:grid-cols-3">
            {t.education.steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`relative flex h-full flex-col justify-between overflow-hidden rounded-[16px] border p-7 text-start transition duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-[#070e1a] bg-[#070e1a] text-white shadow-[0_24px_54px_-24px_rgba(7,14,26,0.45)]'
                      : 'border-[#e3e7ee] bg-white text-[#070e1a] hover:border-[#070e1a]/35'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="bw-step-bar"
                      transition={reduce ? { duration: 0 } : SPRING_INSTITUTIONAL}
                      className="absolute inset-x-0 top-0 h-[2px] bg-[#d7b158]"
                      aria-hidden="true"
                    />
                  )}
                  <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span
                        className={`num inline-flex h-9 w-9 items-center justify-center rounded-[9px] text-xs font-bold ${
                          isSelected ? 'bg-[#d7b158] text-[#070e1a]' : 'bg-[#f7f8fa] text-[#070e1a]'
                        }`}
                      >
                        {step.num}
                      </span>
                      <span
                        className={`font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${
                          isSelected ? 'text-[#fcf1b7]' : 'text-[#0e6954]'
                        }`}
                      >
                        {ext.suiteUi.guidedBadge}
                      </span>
                    </div>
                    <h3
                      className={`mt-5 font-display text-xl font-bold leading-snug ${
                        isSelected ? 'text-white' : 'text-[#070e1a]'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className={`mt-2.5 text-sm leading-relaxed ${isSelected ? 'text-white/85' : 'text-[#4a5568]'}`}>
                      {step.summary}
                    </p>
                    <p className={`mt-3 pt-2 text-xs leading-relaxed ${isSelected ? 'text-white/62' : 'text-[#64748b]'}`}>
                      {step.detail}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Compact Localized Dubai Executive Desk Preview Strip */}
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[18px] border border-[#e3e7ee] bg-[#f7f8fa] p-6 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3 rtl:space-x-reverse">
                {EXECUTIVE_LEADERSHIP.map((exec) => (
                  <img
                    key={exec.slug}
                    src={exec.portrait}
                    alt={exec.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full border-2 border-white object-cover object-top shadow-sm"
                  />
                ))}
              </div>
              <div className="max-w-xl">
                <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#0e6954]">
                  {swiss.leadershipBanner.eyebrow}
                </p>
                <p className="mt-1 font-display text-base font-bold text-[#070e1a] sm:text-lg">
                  {swiss.leadershipBanner.heading}
                </p>
                <p className="mt-0.5 text-xs text-[#4a5568]">{swiss.leadershipBanner.sub}</p>
              </div>
            </div>
            <Link href="/about-us" className="homy-btn bw-btn--sm">
              <span>{swiss.leadershipBanner.cta}</span>
              <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
                <ArrowRight size={13} strokeWidth={2.2} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* BAND 7 (ARCHITECTURAL STONE): 52 Free CBUAE/DLD PDF Buyer Guides + Sticky Split FAQ */}
      <section id="faq" className="holo-section holo-section--mint" aria-labelledby="faq-title">
        <div className="wrap space-y-16">
          {/* Featured 6 from 52 Free CBUAE & DLD Buyer Guides */}
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl space-y-2.5">
                <span className="homy-tag">
                  <span className="homy-tag__ring" aria-hidden="true" />
                  <span>{ext.pdfShowcase.eyebrow}</span>
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight text-[#070e1a] sm:text-3xl">
                  {ext.pdfShowcase.heading}
                </h3>
                <p className="text-sm text-[#4a5568]">{ext.pdfShowcase.sub}</p>
              </div>
              <Link href="/downloads" className="homy-btn bw-btn--sm">
                <span>{ext.pdfShowcase.browseAllCta}</span>
                <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
                  <ArrowRight size={13} strokeWidth={2.2} />
                </span>
              </Link>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {FEATURED_PDFS.map((pdf) => (
                <a
                  key={pdf.id}
                  href={pdf.file}
                  download
                  className="bw-beam-box group flex flex-col justify-between p-5 transition duration-200 hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-[7px] bg-[#edf7f4] px-2.5 py-1 text-[10.5px] font-semibold text-[#0e6954]">
                        <FileDown size={12} /> {pdf.category}
                      </span>
                      <span className="num text-[11px] font-medium text-[#4a5568]">{pdf.pages}p PDF</span>
                    </div>
                    <h4 className="mt-3 font-display text-[15.5px] font-bold leading-snug text-[#070e1a] group-hover:text-[#0e6954]">
                      {pdf.title}
                    </h4>
                    <p className="mt-2.5 flex items-start gap-1.5 rounded-[10px] border border-[#f2e4c2] bg-[#fffcf4] px-3 py-2 text-[11.5px] leading-snug text-[#6a4e12]">
                      <AlertTriangle size={12} className="mt-0.5 shrink-0 text-[#b45309]" />
                      <span>{pdf.neglectedWhy}</span>
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#0e6954]">
                    {ext.pdfShowcase.downloadBtn}{' '}
                    <ArrowRight size={12} className="transition group-hover:translate-x-0.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-[#e3e7ee]" aria-hidden="true" />

          {/* Sticky Split FAQ Accordion */}
          <div className="homy-faq-grid">
            <div className="homy-faq-left">
              <span className="homy-tag">
                <span className="homy-tag__ring" aria-hidden="true" />
                <span>{t.faq.eyebrow}</span>
              </span>
              <h2 id="faq-title" className="holo-display-h3 mt-3.5">
                {t.faq.heading}
              </h2>
              <p className="holo-lead mt-3.5 max-w-sm">{t.faq.sub}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/get-started" className="homy-btn bw-btn--sm">
                  <span>{t.faq.cta1}</span>
                  <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
                    <ArrowRight size={13} strokeWidth={2.2} />
                  </span>
                </Link>
                <Link href="/contact" className="homy-btn homy-btn--outline bw-btn--sm">
                  {t.faq.cta2}
                </Link>
              </div>
            </div>

            <HomyFaqAccordion faqs={t.faq.items} />
          </div>
        </div>
      </section>

      {/* BAND 8 (WHITE FRAME -> MIDNIGHT NAVY CTA -> INSTITUTIONAL FOOTER) */}
      <div className="bg-white">
        <FlagshipCta />
      </div>
    </div>
  );
}
