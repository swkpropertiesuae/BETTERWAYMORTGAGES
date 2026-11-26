'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ImageItem {
  src: string;
  alt: string;
  label?: string;
}

export interface PhoneCarouselProps {
  images: ImageItem[];
  className?: string;
  autoPlayMs?: number;
}

/**
 * 21st.dev 3-Phone Layered Depth Carousel:
 * - Active screen glides center stage at full scale & crisp focus
 * - Previous & Next phones wait smoothly behind on left/right as subtle translucent shadow silhouettes
 * - Continuously transitions forward on a calm, slow infinite cycle (also clickable & swipeable)
 */
export function PhoneCarousel({
  images,
  className,
  autoPlayMs = 4600,
}: PhoneCarouselProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = images.length;

  const step = useCallback(
    (dir: number) => {
      if (total <= 1) return;
      setIndex((prev) => (prev + dir + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (reduce || paused || total <= 1) return;
    const timer = window.setInterval(() => step(1), autoPlayMs);
    return () => window.clearInterval(timer);
  }, [autoPlayMs, paused, reduce, step, total]);

  if (!total) return null;
  const current = images[index];

  const getSlot = (idx: number): 'center' | 'prev' | 'next' | 'hidden' => {
    if (idx === index) return 'center';
    if (idx === (index - 1 + total) % total) return 'prev';
    if (idx === (index + 1) % total) return 'next';
    return 'hidden';
  };

  return (
    <div
      className={cn('relative mx-auto flex w-full max-w-[460px] flex-col items-center select-none', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 3-Phone Layered Depth Stage (Center Active + 2 Shadow Phones Waiting Behind) */}
      <div className="relative flex h-[488px] w-full items-center justify-center sm:h-[578px]">
        {/* Ambient Soft Light Behind Active Phone */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-white/24 via-[#f1d57e]/14 to-transparent blur-3xl"
        />

        {images.map((item, idx) => {
          const slot = getSlot(idx);
          const isCenter = slot === 'center';
          const isPrev = slot === 'prev';
          const isNext = slot === 'next';

          const animateState = isCenter
            ? { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, filter: 'brightness(1) blur(0px)' }
            : isPrev
              ? { x: '-44%', y: 18, scale: 0.83, rotate: -7, opacity: 0.44, filter: 'brightness(0.62) blur(0.6px)' }
              : isNext
                ? { x: '44%', y: 18, scale: 0.83, rotate: 7, opacity: 0.44, filter: 'brightness(0.62) blur(0.6px)' }
                : { x: 0, y: 28, scale: 0.72, rotate: 0, opacity: 0, filter: 'brightness(0.45) blur(2px)' };

          return (
            <motion.div
              key={item.src}
              initial={false}
              animate={animateState}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      type: 'spring',
                      stiffness: 170,
                      damping: 26,
                      mass: 1.05,
                    }
              }
              onClick={() => {
                if (!isCenter) setIndex(idx);
              }}
              drag={isCenter && !reduce ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_e, { offset, velocity }) => {
                if (!isCenter) return;
                if (offset.x < -40 || velocity.x < -260) step(1);
                else if (offset.x > 40 || velocity.x > 260) step(-1);
              }}
              aria-hidden={!isCenter}
              className={cn(
                'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                isCenter
                  ? 'z-20 cursor-grab active:cursor-grabbing'
                  : isPrev || isNext
                    ? 'z-10 cursor-pointer hover:opacity-65'
                    : 'pointer-events-none z-0',
              )}
              style={{ transformOrigin: 'center center' }}
            >
              {/* Side Hardware Buttons on Center Phone */}
              {isCenter && (
                <>
                  <span aria-hidden="true" className="absolute -start-[3px] top-[98px] h-6 w-[3px] rounded-s-sm bg-[#3b4252]" />
                  <span aria-hidden="true" className="absolute -start-[3px] top-[136px] h-10 w-[3px] rounded-s-sm bg-[#3b4252]" />
                  <span aria-hidden="true" className="absolute -start-[3px] top-[186px] h-10 w-[3px] rounded-s-sm bg-[#3b4252]" />
                  <span aria-hidden="true" className="absolute -end-[3px] top-[152px] h-14 w-[3px] rounded-e-sm bg-[#3b4252]" />
                </>
              )}

              {/* Titanium iPhone 16 Pro Outer Chassis */}
              <div
                className={cn(
                  'relative h-[466px] w-[220px] rounded-[40px] bg-gradient-to-b from-[#2b313e] via-[#121722] to-[#232936] p-[8px] sm:h-[556px] sm:w-[266px] sm:rounded-[48px] sm:p-[9px]',
                  isCenter
                    ? 'shadow-[0_36px_80px_-24px_rgba(4,9,18,0.82),0_0_0_1px_rgba(255,255,255,0.26)]'
                    : 'shadow-[0_26px_60px_-20px_rgba(4,9,18,0.68),0_0_0_1px_rgba(255,255,255,0.12)]',
                )}
              >
                {/* Inner Crisp Screen */}
                <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-white sm:rounded-[39px]">
                  {/* Dynamic Island */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute start-1/2 top-2.5 z-20 flex h-[20px] w-[76px] -translate-x-1/2 items-center justify-end rounded-full bg-[#090c12] px-2 shadow-[0_1px_4px_rgba(0,0,0,0.4)] sm:h-[22px] sm:w-[82px]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#1a2233] ring-1 ring-white/10" />
                  </div>

                  <img
                    src={item.src}
                    alt={item.alt}
                    width={900}
                    height={1950}
                    loading="eager"
                    decoding="sync"
                    draggable={false}
                    className="h-full w-full object-cover object-top"
                  />

                  {/* Subtle Specular Glass Sheen */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-10 rounded-[32px] bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.11] sm:rounded-[39px]"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls Bar: Prev + Active Caption + Next + Pagination Dots */}
      <div className="relative z-30 mt-3 flex flex-col items-center gap-2.5">
        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => step(-1)}
            aria-label="Previous Betterway screen"
            className="h-8 w-8 shrink-0 rounded-full border-white/25 bg-[#0a1120]/75 text-white shadow-md backdrop-blur-md transition hover:scale-105 hover:border-white/60 hover:bg-white hover:text-[#080b0f] cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {current.label && (
            <span className="rounded-full border border-white/22 bg-[#080f1d]/80 px-3.5 py-1.5 text-[11.5px] font-semibold tracking-wide text-white shadow-sm backdrop-blur-md">
              {current.label}
            </span>
          )}

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => step(1)}
            aria-label="Next Betterway screen"
            className="h-8 w-8 shrink-0 rounded-full border-white/25 bg-[#0a1120]/75 text-white shadow-md backdrop-blur-md transition hover:scale-105 hover:border-white/60 hover:bg-white hover:text-[#080b0f] cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div role="tablist" aria-label="Betterway app preview screens" className="flex items-center gap-2">
          {images.map((item, idx) => {
            const active = idx === index;
            return (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`View ${item.alt}`}
                onClick={() => setIndex(idx)}
                className={cn(
                  'h-2 rounded-full transition-all duration-300 cursor-pointer',
                  active ? 'w-7 bg-white shadow-[0_0_10px_rgba(255,255,255,0.65)]' : 'w-2 bg-white/40 hover:bg-white/70',
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
