'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Calculator, Play } from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { VideoBriefingModal } from '@/components/ui/MotionPrimitives';
import PropertyMatchmakerModal from '@/components/ecosystem/PropertyMatchmakerModal';
import MorningHeroCarousel from '@/components/home/MorningHeroCarousel';
import FloatingDeviceMockups from '@/components/home/FloatingDeviceMockups';
import { HotOffersTrigger } from '@/components/HotOffersPopup';
import { buildHeroDossier } from '@/lib/hero-showcase';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HomeHero() {
  const { data } = useBenchmark();
  const { locale, currency, formatCompact, t } = useLocaleCurrency();
  const reduce = useReducedMotion();
  const dossier = buildHeroDossier(data.latest.threeMonth);
  const [videoOpen, setVideoOpen] = useState(false);
  const [matchmakerOpen, setMatchmakerOpen] = useState(false);

  return (
    <>
      <section className="holo-hero" aria-labelledby="hero-title">
        {/* Bright Morning Daylight Dubai Architectural Photography + Light Frosted Legibility Veil */}
        <MorningHeroCarousel lang={locale === 'ar' ? 'ar' : 'en'} />

        {/* Shared 1320px Header/Hero Rail — Split Executive Copy + Animated Floating Laptop & iPhone Dashboard */}
        <div className="holo-hero__inner">
          <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
            <div className="max-w-[680px]">
              {/* Live CBUAE EIBOR + Advisory Briefing + BetterDesk Bar */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mb-5 flex flex-wrap items-center gap-2.5"
              >
                <span className="bw-hero-chip">
                  <span className="bw-live-dot" aria-hidden="true" />
                  <span>{t.hero.eiborLabel}</span>
                  <strong className="num text-[#ffe074]">{dossier.eiborFormatted}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  className="bw-hero-chip bw-hero-chip--interactive"
                >
                  <Play size={11} fill="currentColor" className="text-[#00d69a]" />
                  <span>{t.hero.watchBriefing}</span>
                </button>
                <HotOffersTrigger label={t.hero.priorityDesk} variant="hero" />
              </motion.div>

              <motion.h1
                id="hero-title"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: 0.06, ease: EASE }}
                className="holo-hero__title !text-[clamp(36px,4.3vw,62px)]"
              >
                {t.hero.title}
              </motion.h1>

              <motion.p
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: 0.12, ease: EASE }}
                className="holo-hero__sub !text-[clamp(15.5px,1.25vw,18.5px)]"
              >
                {t.hero.subtitle}
                {currency !== 'AED' && (
                  <span className="ms-2 inline-flex items-center rounded-full border border-white/25 bg-[#070d19]/60 px-2.5 py-0.5 text-xs font-semibold text-[#ffe074] backdrop-blur-md">
                    1st-Home LTV up to {formatCompact(5_000_000)}
                  </span>
                )}
              </motion.p>

              {/* Executive Dual Action Cards — Flush Equal Height */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18, ease: EASE }}
                className="holo-hero__cards"
              >
                <Link href="/get-started" className="holo-cta-card">
                  <div>
                    <span className="holo-cta-card__title">{t.hero.card1Title}</span>
                    <span className="holo-cta-card__meta">{t.hero.card1Meta}</span>
                  </div>
                  <span className="holo-cta-card__arrow" aria-hidden="true">
                    <ArrowRight size={20} strokeWidth={2.2} />
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setMatchmakerOpen(true)}
                  className="holo-cta-card"
                >
                  <div>
                    <span className="holo-cta-card__title">{t.hero.card2Title}</span>
                    <span className="holo-cta-card__meta">{t.hero.card2Meta}</span>
                  </div>
                  <span className="holo-cta-card__arrow" aria-hidden="true">
                    <ArrowRight size={20} strokeWidth={2.2} />
                  </span>
                </button>
              </motion.div>

              {/* Executive Quick-Jump Links */}
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.26 }}
                className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-semibold text-white"
              >
                <a href="#calculator" className="bw-hero-link inline-flex items-center gap-1.5">
                  <Calculator size={14} className="text-[#00d69a]" />
                  <span>{t.hero.jumpCalc}</span>
                </a>
                <Link href="/rates/eibor-live-tracker" className="bw-hero-link">
                  {t.hero.jumpEibor}
                </Link>
                <Link href="/hub" className="bw-hero-link">
                  {t.hero.jumpHub}
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Animated Floating MacBook + iPhone Betterway Fintech Dashboard */}
            <div className="w-full">
              <FloatingDeviceMockups />
            </div>
          </div>
        </div>
      </section>

      <VideoBriefingModal open={videoOpen} onClose={() => setVideoOpen(false)} />
      <PropertyMatchmakerModal open={matchmakerOpen} onClose={() => setMatchmakerOpen(false)} />
    </>
  );
}
