'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator, Play } from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
import { VideoBriefingModal } from '@/components/ui/MotionPrimitives';
import PropertyMatchmakerModal from '@/components/ecosystem/PropertyMatchmakerModal';
import MorningHeroCarousel from '@/components/home/MorningHeroCarousel';
import { HotOffersTrigger } from '@/components/HotOffersPopup';
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
        {/* Bright Morning Daylight Dubai Architectural Photography (Zero Chapter Clutter) */}
        <MorningHeroCarousel lang="en" />

        {/* Exact Shared Header/Hero Alignment Rail — Left edge locks 1:1 with the Header Logo at every viewport */}
        <div className="holo-hero__inner">
          <div className="max-w-[780px]">
            {/* Institutional Live CBUAE EIBOR + 24s Briefing + Priority Offers Bar */}
            <div className="mb-6 flex flex-wrap items-center gap-2.5">
              <span className="bw-hero-chip">
                <span className="bw-live-dot" aria-hidden="true" />
                <span>{BANKS.length} UAE Banks · Live CBUAE 3M EIBOR</span>
                <strong className="num text-[#f1d57e]">{dossier.eiborFormatted}</strong>
              </span>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="bw-hero-chip bw-hero-chip--interactive"
              >
                <Play size={11} fill="currentColor" className="text-[#34dfac]" />
                <span>Watch 24s Briefing</span>
              </button>
              <HotOffersTrigger label="Priority Offers" variant="hero" />
            </div>

            <h1 id="hero-title" className="holo-hero__title">
              Structured UAE home finance, across 24 licensed banks.
            </h1>

            <p className="holo-hero__sub">
              Compare fixed periods, EIBOR revert margins, 4% DLD closing costs, and 50% CBUAE DBR headroom side by
              side with our Oud Metha advisory desk before signing Form F.
            </p>

            {/* Executive Dual Action Cards — Aligned Flush on the Same Vertical Rail */}
            <div className="holo-hero__cards">
              <Link href="/get-started" className="holo-cta-card">
                <div>
                  <span className="holo-cta-card__title">Assess your borrowing capacity</span>
                  <span className="holo-cta-card__meta">60-second CBUAE DBR &amp; 24-bank eligibility brief</span>
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
                  <span className="holo-cta-card__title">Match your budget to UAE areas</span>
                  <span className="holo-cta-card__meta">
                    Map deposit &amp; 4% DLD fees across {COMMUNITIES.length} freehold communities
                  </span>
                </div>
                <span className="holo-cta-card__arrow" aria-hidden="true">
                  <ArrowRight size={20} strokeWidth={2.2} />
                </span>
              </button>
            </div>

            {/* Clean Executive Quick-Jump Links */}
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-2.5 text-[13px] font-semibold text-white">
              <a
                href="#calculator"
                className="bw-hero-link inline-flex items-center gap-1.5"
              >
                <Calculator size={14} className="text-[#34dfac]" />
                <span>Mortgage &amp; 4% DLD Calculator ↓</span>
              </a>
              <Link href="/rates/eibor-live-tracker" className="bw-hero-link">
                Daily CBUAE EIBOR Fixings →
              </Link>
              <Link href="/hub" className="bw-hero-link">
                RERA Broker Partner Desk →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <VideoBriefingModal open={videoOpen} onClose={() => setVideoOpen(false)} />
      <PropertyMatchmakerModal open={matchmakerOpen} onClose={() => setMatchmakerOpen(false)} />
    </>
  );
}
