'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Building2, Calculator, Play } from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { EASE_SWISS, VideoBriefingModal } from '@/components/ui/MotionPrimitives';
import PropertyMatchmakerModal from '@/components/ecosystem/PropertyMatchmakerModal';
import HeroPreCheckConsole from '@/components/home/HeroPreCheckConsole';
import { HotOffersTrigger } from '@/components/HotOffersPopup';
import { buildHeroDossier } from '@/lib/hero-showcase';

/**
 * Band 1: Swiss / DIFC Midnight Navy Institutional Hero (#070E1A).
 * Pulls seamlessly beneath the transparent 80px sticky header on scrollY = 0,
 * pairs editorial authority on the left with the live HeroPreCheckConsole on the right.
 */
export default function HomeHero() {
  const { data } = useBenchmark();
  const { currency, formatCompact, t, swiss } = useLocaleCurrency();
  const reduce = useReducedMotion();
  const dossier = buildHeroDossier(data.latest.threeMonth);
  const [videoOpen, setVideoOpen] = useState(false);
  const [matchmakerOpen, setMatchmakerOpen] = useState(false);

  return (
    <>
      <section
        className="holo-hero bw-swiss-grid -mt-[80px] pb-20 pt-[124px] max-sm:-mt-[68px] max-sm:pb-16 max-sm:pt-[100px] lg:pb-24 lg:pt-[136px]"
        aria-labelledby="hero-title"
      >
        {/* Ultra-subtle architectural Dubai skyline vignette masked cleanly into Midnight Navy */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 end-0 hidden w-[46%] overflow-hidden opacity-[0.13] lg:block"
        >
          <img
            src="/images/hero-dubai-residence.webp"
            alt=""
            width={1920}
            height={1080}
            className="h-full w-full object-cover object-center grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070e1a] via-[#070e1a]/55 to-[#070e1a]/30 rtl:bg-gradient-to-l" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e1a] via-transparent to-[#070e1a]/70" />
        </div>

        <div className="holo-hero__inner">
          <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            {/* Left Column: Authoritative Editorial Narrative */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.46, ease: EASE_SWISS }}
              className="min-w-0 max-w-[660px]"
            >
              {/* Live CBUAE EIBOR + Briefing + Priority Desk */}
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="bw-hero-chip">
                  <span className="bw-live-dot" aria-hidden="true" />
                  <span>{t.hero.eiborLabel}</span>
                  <strong className="num text-[#fcf1b7]">{dossier.eiborFormatted}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  className="bw-hero-chip bw-hero-chip--interactive"
                >
                  <Play size={11} fill="currentColor" className="text-[#34dfac]" />
                  <span>{t.hero.watchBriefing}</span>
                </button>
                <HotOffersTrigger label={t.hero.priorityDesk} variant="hero" />
              </div>

              <h1
                id="hero-title"
                className="font-display text-[clamp(2.35rem,4.3vw,3.8rem)] font-bold leading-[1.06] tracking-[-0.03em] text-white"
              >
                {t.hero.title}
              </h1>

              <p className="mt-5 max-w-xl text-[clamp(15.5px,1.2vw,18px)] leading-[1.65] text-white/74">
                {t.hero.subtitle}
                {currency !== 'AED' && (
                  <span className="ms-2 inline-flex items-center rounded-[7px] border border-[#d7b158]/35 bg-[#0c1524] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#fcf1b7]">
                    ≤ {formatCompact(5_000_000)}
                  </span>
                )}
              </p>

              {/* Primary & Secondary Institutional CTAs (preserves PropertyMatchmakerModal) */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/get-started" className="homy-btn homy-btn--white !h-12 !px-5">
                  <span>{t.hero.card1Title}</span>
                  <span className="homy-btn__disc" aria-hidden="true">
                    <span className="homy-btn__arrow-track">
                      <ArrowRight size={14} strokeWidth={2.2} />
                      <ArrowRight size={14} strokeWidth={2.2} />
                    </span>
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setMatchmakerOpen(true)}
                  className="inline-flex h-12 items-center gap-2 rounded-[10px] border border-white/22 bg-white/[0.05] px-5 text-sm font-semibold text-white transition hover:border-[#d7b158]/65 hover:bg-white/[0.1] cursor-pointer"
                >
                  <Building2 size={15} className="text-[#d7b158]" />
                  <span>{t.hero.card2Title}</span>
                </button>
              </div>

              {/* Clean Utility Jump Links */}
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-xs font-semibold text-white/75">
                <a href="#calculator" className="inline-flex items-center gap-1.5 transition hover:text-white">
                  <Calculator size={13} className="text-[#34dfac]" />
                  <span>{t.hero.jumpCalc}</span>
                </a>
                <Link href="/rates/eibor-live-tracker" className="transition hover:text-white">
                  {t.hero.jumpEibor}
                </Link>
                <Link href="/hub" className="transition hover:text-white">
                  {t.hero.jumpHub}
                </Link>
              </div>

              {/* Permanent Regulatory Disclosure Line (replaces floating DisclosureToast) */}
              <p className="mt-5 max-w-xl text-[11.5px] leading-relaxed text-white/50">
                {swiss.regulatoryMicro}
              </p>
            </motion.div>

            {/* Right Column: Live Interactive Pre-Check Console */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE_SWISS }}
              className="min-w-0 w-full"
            >
              <HeroPreCheckConsole />
            </motion.div>
          </div>
        </div>
      </section>

      <VideoBriefingModal open={videoOpen} onClose={() => setVideoOpen(false)} />
      <PropertyMatchmakerModal open={matchmakerOpen} onClose={() => setMatchmakerOpen(false)} />
    </>
  );
}
