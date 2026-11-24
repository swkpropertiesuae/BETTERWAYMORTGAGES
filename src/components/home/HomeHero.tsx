'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator, Play } from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
import { VideoBriefingModal } from '@/components/ui/MotionPrimitives';
import PropertyMatchmakerModal from '@/components/ecosystem/PropertyMatchmakerModal';
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
        {/* 4K Dubai Marina Twilight Skyline — crisp instant LCP */}
        <div className="holo-hero__bg" aria-hidden="true">
          <img
            src="/images/marina-evening-2752.webp"
            srcSet="/images/marina-evening.webp 1376w, /images/marina-evening-2752.webp 2752w"
            sizes="100vw"
            alt=""
            width={2752}
            height={1536}
            fetchPriority="high"
            decoding="sync"
          />
        </div>
        <div className="holo-hero__scrim" aria-hidden="true" />

        <div className="relative z-[2] max-w-[920px]">
          {/* Live CBUAE EIBOR + 24s Film Shimmer Strip */}
          <div className="mb-6 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#34dfac]" />
              <span>{BANKS.length} UAE Banks · Live CBUAE 3M EIBOR</span>
              <strong className="num text-[#f1d57e]">{dossier.eiborFormatted}</strong>
            </span>
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition hover:border-[#34dfac] hover:bg-black/55 cursor-pointer"
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

          {/* Exact UseHolo Iconic Dual White Split-Card Hero CTAs (Upgraded with Smart Actions) */}
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
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-white/80">
            <a href="#calculator" className="inline-flex items-center gap-1.5 transition hover:text-white">
              <Calculator size={14} className="text-[#34dfac]" />
              <span>Run instant Mortgage + 4% DLD Calculator ↓</span>
            </a>
            <Link href="/rates/eibor-live-tracker" className="transition hover:text-white">
              Live CBUAE EIBOR Tracker →
            </Link>
            <Link href="/hub" className="transition hover:text-white">
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
