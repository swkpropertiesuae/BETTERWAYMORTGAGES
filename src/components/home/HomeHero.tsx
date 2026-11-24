'use client';
import { useBenchmark } from '@/components/StartupExperience';
import { Cta } from '@/components/ui';
import { BANKS } from '@/data/banks';
import { TEAM_SPECIALISTS } from '@/data/team';
import { buildHeroDossier } from '@/lib/hero-showcase';

export default function HomeHero() {
  const { data } = useBenchmark();
  const dossier = buildHeroDossier(data.latest.threeMonth);
  const avatars = TEAM_SPECIALISTS.slice(0, 3);

  return (
    <section className="homy-hero" aria-labelledby="hero-title">
      {/* Soft drifting cloud atmosphere matching Homy Framer Hero */}
      <div className="homy-hero__clouds" aria-hidden="true">
        <span className="homy-hero__cloud homy-hero__cloud--1" />
        <span className="homy-hero__cloud homy-hero__cloud--2" />
        <span className="homy-hero__cloud homy-hero__cloud--3" />
      </div>

      {/* Centered Editorial Copy Stack — instant full-contrast LCP */}
      <div className="homy-hero__content">
        <div className="homy-hero__pill">
          <span className="homy-hero__avatars" aria-hidden="true">
            {avatars.map((a) => (
              <img key={a.slug} src={a.avatarWebp} alt="" width={26} height={26} />
            ))}
          </span>
          <span>
            {BANKS.length} UAE Lenders · 3M EIBOR{' '}
            <strong className="num font-semibold text-[#080b0f]">{dossier.eiborFormatted}</strong>
          </span>
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
        </div>
      </div>

      {/* Rising Cantilevered Dubai Residence + Misty Burj Khalifa Horizon */}
      <div className="homy-hero__media">
        <img
          src="/images/hero-dubai-residence.webp"
          alt="Concept image: modern cantilevered luxury Dubai villa with warm interior light and distant Burj Khalifa skyline"
          width={1376}
          height={768}
          fetchPriority="high"
          decoding="sync"
        />
      </div>
    </section>
  );
}
