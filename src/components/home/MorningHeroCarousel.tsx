'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

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
    alt: 'Bright morning daylight aerial view of Downtown Dubai, Burj Khalifa, and clear blue skies',
  },
  {
    id: 'luxury-villas',
    code: '02',
    label: 'Dubai Residences',
    labelAr: 'الفلل السكنية في دبي',
    maxW: 5120,
    maxH: 2880,
    base: '/images/hero-morning-02',
    alt: 'Sunlit morning architectural photograph of a modern white Dubai residence with palms and turquoise pool',
  },
  {
    id: 'dubai-marina',
    code: '03',
    label: 'Dubai Marina',
    labelAr: 'مرسى دبي',
    maxW: 5120,
    maxH: 2880,
    base: '/images/hero-morning-03',
    alt: 'Crisp morning sunlight over Dubai Marina waterfront residences, yachts, and timber promenade',
  },
  {
    id: 'palm-jumeirah',
    code: '04',
    label: 'Palm Jumeirah',
    labelAr: 'نخلة جميرا',
    maxW: 4500,
    maxH: 2531,
    base: '/images/hero-morning-04',
    alt: 'Clear morning view from Palm Jumeirah across turquoise Gulf waters toward Dubai Harbour',
  },
] as const;

const SLIDE_MS = 6500;

function buildSrcSet(scene: MorningScene, ext: 'avif' | 'webp'): string {
  return `${scene.base}-1280.${ext} 1280w, ${scene.base}-2048.${ext} 2048w, ${scene.base}-3840.${ext} 3840w, ${scene.base}-max.${ext} ${scene.maxW}w`;
}

/**
 * Radiant Morning Daylight Dubai Architectural Hero Backdrop.
 * - Multi-tier AVIF + WebP responsive <picture> (1280w -> 2048w -> 3840w -> native 4.1K–5.1K)
 * - Clean silent crossfades with zero distracting bottom chapter boxes
 * - Deferred idle hydration of slides 02–04 so initial LCP loads a single optimal AVIF
 */
export default function MorningHeroCarousel({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [deferredReady, setDeferredReady] = useState(false);

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
    if (reduce) return;
    const id = window.setInterval(() => {
      setDeferredReady(true);
      setIndex((i) => (i + 1) % MORNING_SCENES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <>
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
                opacity: { duration: reduce ? 0 : 1.15, ease: [0.22, 1, 0.36, 1] },
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

      {/* Feather-light sunlit morning veil: preserves full skyline clarity while ensuring crisp white headline contrast */}
      <div
        className={`holo-hero__scrim ${lang === 'ar' ? 'holo-hero__scrim--rtl' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
