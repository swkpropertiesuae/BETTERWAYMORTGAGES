'use client';
import { useState } from 'react';
import { Play } from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
import {
  AnimatedAnnouncementBar,
  HeroParallaxMedia,
  VideoBriefingModal,
} from '@/components/ui/MotionPrimitives';
import { Cta } from '@/components/ui';
import { BANKS } from '@/data/banks';
import { TEAM_SPECIALISTS } from '@/data/team';
import { buildHeroDossier } from '@/lib/hero-showcase';

export default function HomeHero() {
  const { data } = useBenchmark();
  const dossier = buildHeroDossier(data.latest.threeMonth);
  const avatars = TEAM_SPECIALISTS.slice(0, 3);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <section className="homy-hero" aria-labelledby="hero-title">
        {/* Soft drifting cloud atmosphere matching Homy Framer Hero */}
        <div className="homy-hero__clouds" aria-hidden="true">
          <span className="homy-hero__cloud homy-hero__cloud--1" />
          <span className="homy-hero__cloud homy-hero__cloud--2" />
          <span className="homy-hero__cloud homy-hero__cloud--3" />
        </div>

        {/* Centered Editorial Copy Stack — instant full-contrast LCP */}
        <div className="homy-hero__content">
          {/* 21st.dev Shimmer Border-Beam Live Announcement Pill */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="homy-hero__pill !hidden sm:!inline-flex">
              <span className="homy-hero__avatars" aria-hidden="true">
                {avatars.map((a) => (
                  <img key={a.slug} src={a.avatarWebp} alt="" width={26} height={26} />
                ))}
              </span>
              <span>
                {BANKS.length} UAE Lenders · Oud Metha, Dubai
              </span>
            </div>
            <AnimatedAnnouncementBar
              eiborText={dossier.eiborFormatted}
              onWatchVideo={() => setVideoOpen(true)}
            />
          </div>

          <h1 id="hero-title" className="homy-hero__title">
            Dubai Home Mortgages
          </h1>

          <p className="homy-hero__lead">
            Independent Dubai &amp; UAE mortgage structuring across {BANKS.length} lenders — transparent EIBOR fixings,
            CBUAE statutory clarity, and itemised DLD closing costs before you commit.
          </p>

          <div className="homy-hero__actions">
            <Cta href="#calculator">Calculate Mortgage</Cta>
            <Cta href="/contact" tone="ghost">
              Book a Consultation
            </Cta>
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="homy-btn homy-btn--glass !hidden sm:!inline-flex"
            >
              <Play size={13} fill="currentColor" />
              <span>Watch Briefing</span>
            </button>
          </div>
        </div>

        {/* Rising 4K UHD Dubai Waterfront Villa + Burj Khalifa Horizon with Scroll Parallax */}
        <HeroParallaxMedia>
          <img
            src="/images/hero-dubai-residence.webp"
            alt="Concept image: ultra-luxury cantilevered Dubai waterfront villa in warm sunlight with distant Burj Khalifa skyline"
            width={3840}
            height={2160}
            fetchPriority="high"
            decoding="sync"
          />
        </HeroParallaxMedia>
      </section>

      <VideoBriefingModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
}
