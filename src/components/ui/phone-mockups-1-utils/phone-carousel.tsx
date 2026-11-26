'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
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

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    x: direction >= 0 ? '100%' : '-100%',
    opacity: 0.45,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? '-100%' : '100%',
    opacity: 0.45,
    scale: 0.97,
  }),
};

export function PhoneCarousel({
  images,
  className,
  autoPlayMs = 4600,
}: PhoneCarouselProps) {
  const reduce = useReducedMotion();
  const [[index, direction], setSlide] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const total = images.length;

  const paginate = useCallback(
    (dir: number) => {
      if (total <= 1) return;
      setSlide(([prev]) => [(prev + dir + total) % total, dir]);
    },
    [total],
  );

  const jumpTo = useCallback((target: number) => {
    setSlide(([prev]) => [target, target >= prev ? 1 : -1]);
  }, []);

  useEffect(() => {
    if (reduce || paused || total <= 1) return;
    const timer = window.setInterval(() => paginate(1), autoPlayMs);
    return () => window.clearInterval(timer);
  }, [autoPlayMs, paginate, paused, reduce, total]);

  if (!total) return null;
  const current = images[index];

  return (
    <div
      className={cn('relative mx-auto flex flex-col items-center select-none', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Phone Stage + Left/Right Interactive shadcn Controls */}
      <div className="relative flex max-w-full items-center justify-center gap-2 sm:gap-5">
        {/* Previous Button */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => paginate(-1)}
          aria-label="Previous Betterway screen"
          className="h-8 w-8 shrink-0 rounded-full border-white/25 bg-[#0a1120]/70 text-white shadow-[0_12px_28px_-10px_rgba(4,9,18,0.65)] backdrop-blur-md transition hover:scale-105 hover:border-white/55 hover:bg-white hover:text-[#080b0f] sm:h-10 sm:w-10 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Titanium iPhone 16 Pro Hardware Mockup */}
        <div className="relative">
          {/* Subtle Architectural Halo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 rounded-[58px] bg-gradient-to-b from-white/25 via-white/8 to-transparent blur-2xl"
          />

          {/* Side Hardware Buttons */}
          <span
            aria-hidden="true"
            className="absolute -start-[3px] top-[106px] h-7 w-[3px] rounded-s-sm bg-[#3b4252]"
          />
          <span
            aria-hidden="true"
            className="absolute -start-[3px] top-[148px] h-11 w-[3px] rounded-s-sm bg-[#3b4252]"
          />
          <span
            aria-hidden="true"
            className="absolute -start-[3px] top-[202px] h-11 w-[3px] rounded-s-sm bg-[#3b4252]"
          />
          <span
            aria-hidden="true"
            className="absolute -end-[3px] top-[162px] h-16 w-[3px] rounded-e-sm bg-[#3b4252]"
          />

          {/* Outer Titanium Chassis */}
          <div className="relative h-[476px] w-[226px] rounded-[42px] bg-gradient-to-b from-[#2b313e] via-[#121722] to-[#232936] p-[8px] shadow-[0_36px_80px_-24px_rgba(4,9,18,0.78),0_0_0_1px_rgba(255,255,255,0.22)] sm:h-[566px] sm:w-[278px] sm:rounded-[48px] sm:p-[9px]">
            {/* Inner Glass Viewport */}
            <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-white shadow-[inset_0_0_0_1px_rgba(8,11,15,0.08)] sm:rounded-[39px]">
              {/* Dynamic Island */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute start-1/2 top-2.5 z-20 flex h-[22px] w-[82px] -translate-x-1/2 items-center justify-end rounded-full bg-[#090c12] px-2 shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
              >
                <span className="h-2 w-2 rounded-full bg-[#1a2233] ring-1 ring-white/10" />
              </div>

              {/* Animated Screen Carousel */}
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={current.src}
                  custom={direction}
                  variants={reduce ? undefined : SLIDE_VARIANTS}
                  initial={reduce ? false : 'enter'}
                  animate="center"
                  exit={reduce ? undefined : 'exit'}
                  transition={{
                    x: { type: 'spring', stiffness: 320, damping: 32 },
                    opacity: { duration: 0.25 },
                    scale: { duration: 0.25 },
                  }}
                  drag={reduce ? false : 'x'}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.22}
                  onDragEnd={(_e, { offset, velocity }) => {
                    if (offset.x < -45 || velocity.x < -300) paginate(1);
                    else if (offset.x > 45 || velocity.x > 300) paginate(-1);
                  }}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                >
                  <img
                    src={current.src}
                    alt={current.alt}
                    width={900}
                    height={1950}
                    loading="eager"
                    decoding="sync"
                    draggable={false}
                    className="h-full w-full object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Subtle Top Glass Specular Sheen */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 rounded-[39px] bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.12]"
              />
            </div>
          </div>
        </div>

        {/* Next Button */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => paginate(1)}
          aria-label="Next Betterway screen"
          className="h-8 w-8 shrink-0 rounded-full border-white/25 bg-[#0a1120]/70 text-white shadow-[0_12px_28px_-10px_rgba(4,9,18,0.65)] backdrop-blur-md transition hover:scale-105 hover:border-white/55 hover:bg-white hover:text-[#080b0f] sm:h-10 sm:w-10 cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Screen Caption + Interactive Pagination Pills */}
      <div className="mt-4 flex flex-col items-center gap-2.5">
        {current.label && (
          <span className="rounded-full border border-white/20 bg-[#080f1d]/75 px-3.5 py-1 text-[11.5px] font-semibold tracking-wide text-white shadow-sm backdrop-blur-md">
            {current.label}
          </span>
        )}
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
                onClick={() => jumpTo(idx)}
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
