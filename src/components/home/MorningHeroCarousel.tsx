'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Pause, Play } from 'lucide-react';

export type MorningScene = {
  id: string;
  code: string;
  label: string;
  labelAr: string;
  district: string;
  districtAr: string;
  src2k: string;
  src4k: string;
  src8k: string;
  alt: string;
};

export const MORNING_8K_SCENES: readonly MorningScene[] = [
  {
    id: 'downtown-canal',
    code: '01',
    label: 'Downtown Canal',
    labelAr: 'قناة دبي',
    district: 'Dubai 2026–2027 Waterfront',
    districtAr: 'واجهة دبي المائية 2026–2027',
    src2k: '/images/hero-8k-morning-01-2k.webp',
    src4k: '/images/hero-8k-morning-01-4k.webp',
    src8k: '/images/hero-8k-morning-01-8k.webp',
    alt: 'Ultra-sharp 8K morning daylight view of 2026-2027 Dubai Water Canal waterfront residences and Downtown Burj Khalifa skyline',
  },
  {
    id: 'lagoon-villas',
    code: '02',
    label: 'Crystal Lagoon',
    labelAr: 'فلل البحيرات',
    district: 'The Oasis & Palm Jebel Ali',
    districtAr: 'ذا أواسيس ونخلة جبل علي',
    src2k: '/images/hero-8k-morning-02-2k.webp',
    src4k: '/images/hero-8k-morning-02-4k.webp',
    src8k: '/images/hero-8k-morning-02-8k.webp',
    alt: 'Ultra-sharp 8K morning daylight view of 2026-2027 Dubai limestone luxury villas lining a turquoise swimmable crystal lagoon',
  },
  {
    id: 'creek-towers',
    code: '03',
    label: 'Dubai Creek',
    labelAr: 'خور دبي',
    district: 'Creek Harbour & Marina',
    districtAr: 'خور دبي والمارينا',
    src2k: '/images/hero-8k-morning-03-2k.webp',
    src4k: '/images/hero-8k-morning-03-4k.webp',
    src8k: '/images/hero-8k-morning-03-8k.webp',
    alt: 'Ultra-sharp 8K morning daylight view of 2026-2027 sculptural Dubai Creek waterfront residential towers and superyacht marina',
  },
  {
    id: 'dubai-harbour',
    code: '04',
    label: 'Dubai Harbour',
    labelAr: 'دبي هاربور',
    district: 'Beachfront & Palm Horizon',
    districtAr: 'الواجهة البحرية ونخلة جميرا',
    src2k: '/images/hero-8k-morning-04-2k.webp',
    src4k: '/images/hero-8k-morning-04-4k.webp',
    src8k: '/images/hero-8k-morning-04-8k.webp',
    alt: 'Ultra-sharp 8K morning daylight view of 2026-2027 curved beachfront residences at Dubai Harbour overlooking Palm Jumeirah',
  },
] as const;

const SLIDE_MS = 6200;

/**
 * Ultra-sharp 8K UHD Morning Daylight Dubai 2026-2027 architectural transition layer.
 * Uses pure GPU opacity + micro-Ken Burns (zero blur filters, zero softness) with interactive switcher.
 */
export default function MorningHeroCarousel({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % MORNING_8K_SCENES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  return (
    <>
      {/* 8K UHD Layered Daylight Backdrop (Zero CSS blur, instant crisp LCP on Slide 0) */}
      <div className="holo-hero__bg" aria-hidden="true">
        {MORNING_8K_SCENES.map((scene, i) => {
          const active = i === index;
          return (
            <motion.div
              key={scene.id}
              initial={false}
              animate={{
                opacity: active ? 1 : 0,
                scale: reduce ? 1 : active ? 1.035 : 1.0,
              }}
              transition={{
                opacity: { duration: reduce ? 0 : 1.15, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: reduce ? 0 : 6.4, ease: 'linear' },
              }}
              className="absolute inset-0"
              style={{ zIndex: active ? 1 : 0 }}
            >
              <img
                src={scene.src4k}
                srcSet={`${scene.src2k} 2560w, ${scene.src4k} 3840w, ${scene.src8k} 7680w`}
                sizes="100vw"
                alt={i === 0 ? scene.alt : ''}
                width={7680}
                height={4320}
                fetchPriority={i === 0 ? 'high' : 'low'}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding={i === 0 ? 'sync' : 'async'}
                className="holo-hero__8k-img"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Crisp Directional Morning Scrim (Preserves Radiant Daylight Clarity on Right/Sky) */}
      <div
        className={`holo-hero__scrim ${lang === 'ar' ? 'holo-hero__scrim--rtl' : ''}`}
        aria-hidden="true"
      />

      {/* Interactive 8K Scene Switcher Rail (Bottom-End Corner on Desktop, Sleek Compact Bar on Mobile) */}
      <div
        className="holo-scene-switcher"
        role="region"
        aria-label={lang === 'ar' ? 'مشاريع دبي 2026-2027' : 'Dubai 2026-2027 morning architecture showcase'}
      >
        <div className="holo-scene-switcher__tabs" role="tablist">
          {MORNING_8K_SCENES.map((scene, i) => {
            const active = i === index;
            return (
              <button
                key={scene.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setIndex(i)}
                className={`holo-scene-tab ${active ? 'is-active' : ''}`}
              >
                <span className="holo-scene-tab__head">
                  <span className="num shrink-0 text-[10.5px] font-bold text-[#34dfac]">{scene.code}</span>
                  <span className="whitespace-nowrap text-[11.5px] font-semibold text-white">
                    {lang === 'ar' ? scene.labelAr : scene.label}
                  </span>
                </span>
                <span className="holo-scene-tab__bar" aria-hidden="true">
                  {active && !reduce && !paused && (
                    <motion.span
                      key={`prog-${index}`}
                      className="holo-scene-tab__fill"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                    />
                  )}
                  {active && (reduce || paused) && (
                    <span className="holo-scene-tab__fill" style={{ transform: 'scaleX(1)' }} />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? 'Resume 8K morning transition' : 'Pause 8K morning transition'}
          className="holo-scene-pause"
        >
          {paused ? <Play size={12} fill="currentColor" /> : <Pause size={12} />}
        </button>
      </div>
    </>
  );
}
