'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator, Play } from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
import { VideoBriefingModal } from '@/components/ui/MotionPrimitives';
import PropertyMatchmakerModal from '@/components/ecosystem/PropertyMatchmakerModal';
import MorningHeroCarousel from '@/components/home/MorningHeroCarousel';
import { BANKS } from '@/data/banks';
import { COMMUNITIES } from '@/data/communities';
import { buildHeroDossier } from '@/lib/hero-showcase';

export default function HomeHero() {
  const { data } = useBenchmark();
  const dossier = buildHeroDossier(data.latest.threeMonth);
  const [videoOpen, setVideoOpen] = useState(false);
  const [matchmakerOpen, setMatchmakerOpen] = useState(false);

  return (
    <>
      <section className="holo-hero" aria-labelledby="hero-title">
        {/* Ultra-Sharp 8K UHD Morning Daylight Dubai 2026-2027 Transition Layer */}
        <MorningHeroCarousel lang="en" />

        <div className="relative z-[2] max-w-[820px]">
          {/* Live CBUAE EIBOR + 24s Film Pill */}
          <div className="mb-5 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/28 bg-[#080b0f]/58 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#34dfac]" />
              <span>{BANKS.length} UAE Banks · Live CBUAE 3M EIBOR</span>
              <strong className="num text-[#f1d57e]">{dossier.eiborFormatted}</strong>
            </span>
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/28 bg-[#080b0f]/58 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition hover:border-[#34dfac] hover:bg-[#080b0f]/80 cursor-pointer"
            >
              <Play size={11} fill="currentColor" className="text-[#34dfac]" />
              <span>Watch 24s Briefing</span>
            </button>
          </div>

          <h1 id="hero-title" className="holo-hero__title">
            Everything you need to finance &amp; buy property in the UAE.
          </h1>

          <p className="holo-hero__sub">
            24 UAE lenders compared, upfront 4% DLD fee clarity, CBUAE-aligned advisors, and modern mortgage technology
            — all in one place.
          </p>

          {/* Iconic Dual White Split-Card Hero CTAs */}
          <div className="holo-hero__cards">
            <Link href="/get-started" className="holo-cta-card">
              <div>
                <span className="holo-cta-card__title">I’m looking for a mortgage</span>
                <span className="holo-cta-card__meta">60s DBR check &amp; 24-bank dossier</span>
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
                <span className="holo-cta-card__title">Help me find &amp; budget a home</span>
                <span className="holo-cta-card__meta">Match AED budget to {COMMUNITIES.length} UAE areas</span>
              </div>
              <span className="holo-cta-card__arrow" aria-hidden="true">
                <ArrowRight size={20} strokeWidth={2.2} />
              </span>
            </button>
          </div>

          {/* Instant Transparent Jump Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-white">
            <a href="#calculator" className="inline-flex items-center gap-1.5 drop-shadow-[0_1px_6px_rgba(8,11,15,0.65)] transition hover:text-[#f1d57e]">
              <Calculator size={14} className="text-[#34dfac]" />
              <span>Run instant Mortgage + 4% DLD Calculator ↓</span>
            </a>
            <Link href="/rates/eibor-live-tracker" className="drop-shadow-[0_1px_6px_rgba(8,11,15,0.65)] transition hover:text-[#f1d57e]">
              Live CBUAE EIBOR Tracker →
            </Link>
            <Link href="/hub" className="drop-shadow-[0_1px_6px_rgba(8,11,15,0.65)] transition hover:text-[#f1d57e]">
              For RERA Agents (Betterway Hub) →
            </Link>
          </div>
        </div>
      </section>

      <VideoBriefingModal open={videoOpen} onClose={() => setVideoOpen(false)} />
      <PropertyMatchmakerModal open={matchmakerOpen} onClose={() => setMatchmakerOpen(false)} />
    </>
  );
}
