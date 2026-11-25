'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Pause, Play } from 'lucide-react';

export type MorningScene = {
  id: string;
  code: string;
  label: string;
  labelAr: string;
  maxW: number;
  maxH: number;
  base: string;
  alt: string;
};

export const MORNING_SCENES: readonly MorningScene[] = [
  {
    id: 'downtown-dubai',
    code: '01',
    label: 'Downtown Dubai',
    labelAr: 'وسط مدينة دبي',
    maxW: 4140,
    maxH: 2329,
    base: '/images/hero-morning-01',
    alt: 'High-resolution bright morning daylight aerial view of Downtown Dubai, Burj Khalifa, and turquoise Burj Lake under clear blue skies',
  },
  {
    id: 'luxury-villas',
    code: '02',
    label: 'Luxury Pool Villas',
    labelAr: 'فلل المسابح الفاخرة',
    maxW: 5120,
    maxH: 2880,
    base: '/images/hero-morning-02',
    alt: 'High-resolution bright daylight architectural photography of a modern white Dubai luxury villa with glass balconies, palms, and turquoise lap pool',
  },
  {
    id: 'dubai-marina',
    code: '03',
    label: 'Dubai Marina',
    labelAr: 'مرسى دبي',
    maxW: 5120,
    maxH: 2880,
    base: '/images/hero-morning-03',
    alt: 'High-resolution bright morning photography of Dubai Marina waterfront residences, luxury yachts, wooden promenade, and high-rise skyline',
  },
  {
    id: 'palm-jumeirah',
    code: '04',
    label: 'Palm Jumeirah',
    labelAr: 'نخلة جميرا',
    maxW: 4500,
    maxH: 2531,
    base: '/images/hero-morning-04',
    alt: 'High-resolution bright morning view from Palm Jumeirah beachfront across turquoise Arabian Gulf waters toward the Dubai Harbour and Marina skyline',
  },
] as const;

const SLIDE_MS = 6200;

function buildSrcSet(scene: MorningScene, ext: 'avif' | 'webp'): string {
  return `${scene.base}-1280.${ext} 1280w, ${scene.base}-2048.${ext} 2048w, ${scene.base}-3840.${ext} 3840w, ${scene.base}-max.${ext} ${scene.maxW}w`;
}

/**
 * Real Full-Frame DSLR / Drone Morning Daylight Dubai Transition Hero.
 * - Multi-tier AVIF + WebP responsive <picture> (1280w -> 2048w -> 3840w -> native 4.1K-5.1K max)
 * - Zero fractional CSS scale transforms (exact 1:1 native pixel mapping for razor-sharp glass optics)
 * - Deferred idle hydration of slides 02-04 so initial LCP downloads only 1 single AVIF image
 */
export default function MorningHeroCarousel({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [deferredReady, setDeferredReady] = useState(false);

  // Hydrate slides 02-04 only after initial LCP paint so page load is unaffected
  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(() => setDeferredReady(true), { timeout: 1100 });
      return () => win.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setDeferredReady(true), 850);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setDeferredReady(true);
      setIndex((i) => (i + 1) % MORNING_SCENES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  const selectSlide = (i: number) => {
    setDeferredReady(true);
    setIndex(i);
  };

  return (
    <>
      {/* Native Optical DSLR / Drone Layered Morning Backdrop (Exact 1:1 Scale, Zero Blur) */}
      <div className="holo-hero__bg" aria-hidden="true">
        {MORNING_SCENES.map((scene, i) => {
          const active = i === index;
          const shouldMount = i === 0 || deferredReady || active;
          if (!shouldMount) return null;
          return (
            <motion.div
              key={scene.id}
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{
                opacity: { duration: reduce ? 0 : 1.0, ease: [0.22, 1, 0.36, 1] },
              }}
              className="absolute inset-0"
              style={{ zIndex: active ? 1 : 0 }}
            >
              <picture>
                <source type="image/avif" srcSet={buildSrcSet(scene, 'avif')} sizes="100vw" />
                <source type="image/webp" srcSet={buildSrcSet(scene, 'webp')} sizes="100vw" />
                <img
                  src={`${scene.base}-2048.webp`}
                  alt={i === 0 ? scene.alt : ''}
                  width={scene.maxW}
                  height={scene.maxH}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="holo-hero__8k-img"
                />
              </picture>
            </motion.div>
          );
        })}
      </div>

      {/* Crisp Directional Morning Scrim (Preserves Radiant Daylight Clarity on Right/Sky) */}
      <div
        className={`holo-hero__scrim ${lang === 'ar' ? 'holo-hero__scrim--rtl' : ''}`}
        aria-hidden="true"
      />

      {/* Flush Interactive Scene Switcher Rail */}
      <div
        className="holo-scene-switcher"
        role="region"
        aria-label={lang === 'ar' ? 'معالم دبي الصباحية' : 'Dubai morning real estate photography showcase'}
      >
        <div className="holo-scene-switcher__tabs" role="tablist">
          {MORNING_SCENES.map((scene, i) => {
            const active = i === index;
            return (
              <button
                key={scene.id}
                type="button"
                role="tab"
                aria-selected={active}
                onMouseEnter={() => setDeferredReady(true)}
                onClick={() => selectSlide(i)}
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
          aria-label={paused ? 'Resume morning showcase transition' : 'Pause morning showcase transition'}
          className="holo-scene-pause"
        >
          {paused ? <Play size={12} fill="currentColor" /> : <Pause size={12} />}
        </button>
      </div>
    </>
  );
}
