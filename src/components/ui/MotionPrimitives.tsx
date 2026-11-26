'use client';

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Play, ShieldCheck, X } from 'lucide-react';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';

export const SPRING_INSTITUTIONAL = { type: 'spring', stiffness: 360, damping: 34, mass: 0.9 } as const;
export const EASE_SWISS = [0.22, 1, 0.36, 1] as const;

// Backwards-compatible aliases
export const SPRING_SNAPPY = SPRING_INSTITUTIONAL;
export const EASE_HOMY = EASE_SWISS;

/**
 * GPU-composited Swiss institutional scroll reveal (transform + opacity only).
 */
export function SwissReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.44, delay, ease: EASE_SWISS }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * 21st.dev restrained hairline spotlight card (zero React re-renders on mousemove).
 */
export function SwissSpotlightCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };
  return (
    <div onMouseMove={handleMove} className={`bw-swiss-card ${className}`}>
      {children}
    </div>
  );
}

export function SpotlightCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return <SwissSpotlightCard className={className}>{children}</SwissSpotlightCard>;
}

export function ScrollScaleFrame({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`flex w-full justify-center ${className}`}>{children}</div>;
}

export function HeroParallaxMedia({ children }: { children: ReactNode }) {
  return <div className="relative">{children}</div>;
}

export function AnimatedAnnouncementBar({
  eiborText,
  onWatchVideo,
}: {
  eiborText: string;
  onWatchVideo: () => void;
}) {
  return (
    <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-[#e3e7ee] bg-white px-3.5 py-1.5 text-xs text-[#4a5568]">
      <span className="bw-live-dot" aria-hidden="true" />
      <span>
        Live CBUAE 3M EIBOR <strong className="num font-semibold text-[#070e1a]">{eiborText}</strong>
      </span>
      <span className="h-3.5 w-px bg-[#e3e7ee]" aria-hidden="true" />
      <button
        type="button"
        onClick={onWatchVideo}
        className="inline-flex items-center gap-1.5 font-semibold text-[#0e6954] transition-colors hover:text-[#070e1a] cursor-pointer"
      >
        <Play size={11} fill="currentColor" />
        <span>Watch Briefing</span>
      </button>
    </div>
  );
}

/**
 * Corporate Video Briefing Modal (portaled cleanly above sticky header).
 */
export function VideoBriefingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    const playTimer = window.setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 120);
    return () => {
      window.clearTimeout(playTimer);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="video-briefing-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#070e1a]/82 p-4 backdrop-blur-lg sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Betterway Mortgages corporate advisory briefing"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: EASE_SWISS }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1020px] overflow-hidden rounded-[20px] border border-white/15 bg-[#0c1524] shadow-[0_48px_120px_-24px_rgba(0,0,0,0.85)]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3.5">
                <img
                  src="/brand/logo-horizontal-dark.png"
                  alt="Betterway Mortgages"
                  width={1400}
                  height={459}
                  className="h-8 w-auto sm:h-9"
                />
                <span className="hidden rounded-full border border-[#d7b158]/35 bg-white/[0.05] px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#fcf1b7] sm:inline-flex">
                  Advisory Briefing
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close briefing video"
                className="grid h-9 w-9 place-items-center rounded-[10px] border border-white/15 bg-white/5 text-white transition-colors hover:border-white/40 hover:bg-white/15 cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <video
                ref={videoRef}
                controls
                playsInline
                preload="metadata"
                poster="/video/betterway-explainer.jpg"
                className="h-full w-full object-contain"
              >
                <source src="/video/betterway-explainer.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-[#070e1a] px-5 py-4 sm:px-7">
              <p className="flex items-center gap-2 text-xs text-white/65">
                <ShieldCheck size={15} className="shrink-0 text-[#d7b158]" />
                <span>
                  Statutory CBUAE &amp; DLD planning overview across 24 UAE lenders. Final offers are issued in writing by the bank.
                </span>
              </p>
              <Link
                href="/calculators/mortgage-calculator"
                onClick={onClose}
                className="homy-btn homy-btn--white bw-btn--sm"
              >
                <span>Run Calculator</span>
                <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
                  <ArrowRight size={13} strokeWidth={2.2} />
                </span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/**
 * Swiss Institutional Advisory Briefing Card (embedded in Band 5).
 */
export function VideoBriefingShowcase() {
  const [open, setOpen] = useState(false);
  const { ext } = useLocaleCurrency();
  const b = ext.briefing;

  return (
    <>
      <div className="bw-video-card">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="space-y-4 text-white">
            <span className="homy-tag homy-tag--light">
              <span className="homy-tag__ring" aria-hidden="true" />
              <span>{b.badge}</span>
            </span>
            <h3 className="font-display text-[clamp(24px,2.6vw,34px)] font-semibold leading-[1.15] tracking-[-0.024em] text-white">
              {b.heading}
            </h3>
            <p className="text-[15px] leading-relaxed text-white/70">{b.sub}</p>
            <div className="pt-1">
              <button type="button" onClick={() => setOpen(true)} className="homy-btn homy-btn--white">
                <Play size={13} fill="currentColor" />
                <span>{b.playCta}</span>
                <span className="homy-btn__disc" aria-hidden="true">
                  <span className="homy-btn__arrow-track">
                    <ArrowRight size={14} strokeWidth={2.2} />
                    <ArrowRight size={14} strokeWidth={2.2} />
                  </span>
                </span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Play Betterway Mortgages advisory briefing"
            className="group relative aspect-video w-full overflow-hidden rounded-[16px] border border-white/15 bg-[#070e1a] text-left shadow-[0_28px_60px_-24px_rgba(0,0,0,0.7)] cursor-pointer"
          >
            <img
              src="/video/betterway-explainer.jpg"
              alt="Preview of the Betterway Mortgages UAE lender comparison briefing"
              width={1920}
              height={1080}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070e1a]/75 via-[#070e1a]/20 to-transparent" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="bw-play-orb">
                <Play size={24} fill="currentColor" className="translate-x-0.5" />
              </span>
            </div>
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#070e1a]/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                <img src="/brand/icon.png" alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                Betterway Mortgages · Advisory Briefing
              </span>
              <span className="rounded-[8px] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#070e1a]">
                Play
              </span>
            </div>
          </button>
        </div>
      </div>

      <VideoBriefingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
