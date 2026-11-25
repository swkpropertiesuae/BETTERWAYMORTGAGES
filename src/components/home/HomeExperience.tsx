'use client';

import { useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import {
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
import DisclosureToast from '@/components/home/DisclosureToast';
import { HomyAdvisorsCarousel, HomyFaqAccordion } from '@/components/home/HomySections';
import HoloMortgageCalc from '@/components/ecosystem/HoloMortgageCalc';
import LogoMarquee from '@/components/LogoMarquee';
import { VideoBriefingShowcase } from '@/components/ui/MotionPrimitives';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { BANKS } from '@/data/banks';
import { PDF_RESOURCES } from '@/data/seo-topics';

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
        {/* 1. MORNING DAYLIGHT DUBAI HERO — ALIGNED HEADER/HERO RAIL */}
        <HomeHero />

        {/* 2. TWO CONSISTENT ANIMATED 21st.dev INTERACTIVE ADVISORY CARDS */}
        <InteractiveAdvisoryCards />

        {/* 3. MULTI-CURRENCY MORTGAGE & 4% DLD CALCULATOR + ENDLESS 24-BANK MARQUEE */}
        <section id="calculator" className="holo-section" aria-label="Mortgage calculator and 24 UAE banks">
          <div className="mx-auto max-w-[1220px]">
            <HoloMortgageCalc />

            {/* Endless Slow Horizontal Infinite 24-Bank Marquee */}
            <div className="mt-16 border-t border-[#eef0f3] pt-10">
              <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#64748b]">
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

        {/* 4. ILLUSTRATIVE 1-ON-1 CLIENT EDUCATION (3 CLEAR STEPS) */}
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

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {t.education.steps.map((step, idx) => {
                const isSelected = activeStep === idx;
                return (
                  <motion.button
                    key={step.num}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    whileHover={reduce ? undefined : { y: -4 }}
                    transition={{ duration: 0.24 }}
                    className={`flex flex-col justify-between rounded-[24px] border p-7 text-left transition cursor-pointer ${
                      isSelected
                        ? 'border-[#0a1424] bg-[#0a1424] text-white shadow-[0_24px_56px_-22px_rgba(10,20,36,0.45)]'
                        : 'border-[#dce7e2] bg-white text-[#0a1424] hover:border-[#179373]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`num inline-flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-extrabold ${
                            isSelected ? 'bg-[#179373] text-white' : 'bg-[#eef7f4] text-[#0e6954]'
                          }`}
                        >
                          {step.num}
                        </span>
                        <span
                          className={`text-[11px] font-bold uppercase tracking-[0.12em] ${
                            isSelected ? 'text-[#f1d57e]' : 'text-[#64748b]'
                          }`}
                        >
                          1-on-1 Guided
                        </span>
                      </div>
                      <h3
                        className={`mt-5 font-display text-2xl font-bold leading-snug ${
                          isSelected ? 'text-white' : 'text-[#0a1424]'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className={`mt-2.5 text-sm font-medium leading-relaxed ${isSelected ? 'text-white/90' : 'text-[#334155]'}`}>
                        {step.summary}
                      </p>
                      <p className={`mt-3 text-xs leading-relaxed ${isSelected ? 'text-white/70' : 'text-[#64748b]'}`}>
                        {step.detail}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. EXCLUSIVE BETTERWAY SUITE — BETTERHUB & BETTERCORE */}
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

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {/* BetterHub — For RERA Real Estate Agencies */}
              <div onMouseMove={trackSpotlight} className="bw-21-card flex flex-col">
                <div className="holo-visual-stage !min-h-[260px] !rounded-none !border-0">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0a1424]">
                      <Smartphone size={14} className="text-[#0e6954]" /> {t.suite.betterHubTag}
                    </span>
                    <span className="text-xs font-semibold text-[#34dfac]">RERA Portal</span>
                  </div>
                  <div className="mx-auto my-5 w-full max-w-[330px] rounded-[18px] border border-white/18 bg-[#080b0f]/82 p-4 backdrop-blur-md">
                    <div className="flex items-center gap-2.5 border-b border-white/10 pb-2.5">
                      <img src="/brand/icon.png" alt="" width={22} height={22} className="h-5 w-5 object-contain" />
                      <div>
                        <p className="text-xs font-bold text-white">BetterHub · Buyer Verified</p>
                        <p className="text-[10.5px] text-white/60">CBUAE 50% DBR · 24-Bank Matrix</p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1.5 text-xs">
                      <div className="flex justify-between text-white/80">
                        <span>Co-branded readiness links</span>
                        <span className="font-semibold text-[#34dfac]">Live</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Transfer tracking</span>
                        <span className="font-semibold text-[#f1d57e]">Form F → DLD</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#0a1424]">{t.suite.betterHubTitle}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-[#4f596b]">{t.suite.betterHubDesc}</p>
                  </div>
                  <div className="mt-6">
                    <Link href="/hub" className="homy-btn">
                      <span>{t.suite.betterHubCta}</span>
                      <span className="homy-btn__disc" aria-hidden="true">
                        <span className="homy-btn__arrow-track">
                          <ArrowRight size={14} strokeWidth={2.2} />
                          <ArrowRight size={14} strokeWidth={2.2} />
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* BetterCore — Brokerage Operating Infrastructure */}
              <div onMouseMove={trackSpotlight} className="bw-21-card flex flex-col">
                <div className="holo-visual-stage !min-h-[260px] !rounded-none !border-0">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0a1424]">
                      <Cpu size={14} className="text-[#0e6954]" /> {t.suite.betterCoreTag}
                    </span>
                    <span className="text-xs font-semibold text-[#f1d57e]">Betterway OS</span>
                  </div>
                  <div className="my-5 grid grid-cols-2 gap-2.5">
                    {[
                      [Layers, '24-Bank Matrix', 'Conventional & Islamic'],
                      [ShieldCheck, 'CBUAE KFS Flow', 'Audit-ready dossiers'],
                      [Building2, '60 UAE Areas', 'Freehold & handover'],
                      [CheckCircle2, '6 Languages', 'EN · AR · RU · 中文 · FR · ES'],
                    ].map(([Icon, title, sub]) => {
                      const Comp = Icon as typeof Layers;
                      return (
                        <div key={title as string} className="rounded-[13px] border border-white/12 bg-white/[0.06] p-3">
                          <Comp size={15} className="text-[#34dfac]" />
                          <p className="mt-1.5 font-display text-xs font-bold text-white">{title as string}</p>
                          <p className="text-[10.5px] text-white/60">{sub as string}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#0a1424]">{t.suite.betterCoreTitle}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-[#4f596b]">{t.suite.betterCoreDesc}</p>
                  </div>
                  <div className="mt-6">
                    <Link href="/edge" className="homy-btn">
                      <span>{t.suite.betterCoreCta}</span>
                      <span className="homy-btn__disc" aria-hidden="true">
                        <span className="homy-btn__arrow-track">
                          <ArrowRight size={14} strokeWidth={2.2} />
                          <ArrowRight size={14} strokeWidth={2.2} />
                        </span>
                      </span>
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

        {/* 6. ALL 8 LEADERSHIP & DUBAI TEAM PORTRAITS — EXACT SAME EYE LEVEL */}
        <section className="holo-section" aria-labelledby="advisors-title">
          <div className="mx-auto max-w-[1220px]">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <span className="homy-tag">
                  <span className="homy-tag__ring" aria-hidden="true" />
                  <span>{t.team.eyebrow}</span>
                </span>
                <h2 id="advisors-title" className="holo-display-h3">
                  {t.team.heading}
                </h2>
                <p className="holo-lead">{t.team.sub}</p>
              </div>
              <Link href="/about-us" className="homy-btn bw-btn--sm">
                <span>{t.team.cta}</span>
                <span className="homy-btn__disc" aria-hidden="true">
                  <span className="homy-btn__arrow-track">
                    <ArrowRight size={14} strokeWidth={2.2} />
                    <ArrowRight size={14} strokeWidth={2.2} />
                  </span>
                </span>
              </Link>
            </div>
          </div>

          <HomyAdvisorsCarousel />
        </section>

        {/* 7. CONCISE FAQ + PRINTABLE PDF LIBRARY */}
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

            {/* Compact Printable PDF & Insights Footer Bar */}
            <div className="mt-14 grid gap-4 border-t border-[#e5e7eb] pt-10 md:grid-cols-3">
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
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#0e6954]">
                    Download Guide <ArrowRight size={12} />
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-[#464c5c]">
              <span>Explore in-depth UAE rules, 60 freehold community briefs, and free checklists:</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/insights" className="text-[#0e6954] hover:underline">
                  36 UAE Insights →
                </Link>
                <Link href="/guides" className="text-[#070e1a] hover:underline">
                  All Buying Guides →
                </Link>
                <Link href="/downloads" className="text-[#070e1a] hover:underline">
                  PDF Library →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <DisclosureToast />
    </>
  );
}
