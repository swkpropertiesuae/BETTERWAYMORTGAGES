'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Play, ShieldCheck, Sparkles, X } from 'lucide-react';

export const SPRING_SNAPPY = { type: 'spring', stiffness: 380, damping: 32, mass: 0.85 } as const;
export const EASE_HOMY = [0.22, 1, 0.36, 1] as const;

/**
 * Clean static card container (zero cursor-tracking glow, zero hover translate/scale animations).
 */
export function SpotlightCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return <div className={className}>{children}</div>;
}

/**
 * Clean static showcase frame (exact 1:1 native pixel clarity, zero scroll-linked zoom/parallax).
 */
export function ScrollScaleFrame({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`flex w-full justify-center ${className}`}>{children}</div>;
}

/**
 * Static hero media container (zero scroll-linked scale/y blur).
 */
export function HeroParallaxMedia({ children }: { children: ReactNode }) {
  return <div className="homy-hero__media">{children}</div>;
}

/**
 * Clean static announcement pill with live CBUAE 3M EIBOR & briefing trigger.
 */
export function AnimatedAnnouncementBar({
  eiborText,
  onWatchVideo,
}: {
  eiborText: string;
  onWatchVideo: () => void;
}) {
  return (
    <div className="bw-announce-pill">
      <span className="bw-announce-pill__dot" aria-hidden="true" />
      <span className="bw-announce-pill__text">
        Live CBUAE 3M EIBOR <strong className="num font-semibold text-[#080b0f]">{eiborText}</strong>
      </span>
      <span className="h-3.5 w-px bg-[#080b0f]/15" aria-hidden="true" />
      <button
        type="button"
        onClick={onWatchVideo}
        className="inline-flex items-center gap-1.5 font-semibold text-[#0a4a3e] transition-colors hover:text-[#080b0f] cursor-pointer"
      >
        <Play size={11} fill="currentColor" />
        <span>Watch 24s Briefing</span>
      </button>
    </div>
  );
}

/**
 * Cinema Video Briefing Modal Popup (portaled cleanly above sticky header).
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
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#080b0f]/82 p-4 backdrop-blur-xl sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Betterway Mortgages 24-second corporate briefing video"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1040px] overflow-hidden rounded-[26px] border border-white/15 bg-[#0b1117] shadow-[0_48px_120px_-24px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3.5">
                <img
                  src="/brand/logo-horizontal-dark.png"
                  alt="Betterway Mortgages"
                  width={1400}
                  height={403}
                  className="h-8 w-auto sm:h-9"
                />
                <span className="hidden rounded-full border border-[#179373]/40 bg-[#179373]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#34dfac] sm:inline-flex">
                  Full HD 1080p Briefing
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close briefing video"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:border-white/40 hover:bg-white/20 cursor-pointer"
              >
                <X size={18} />
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

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-[#080b0f] px-5 py-4 sm:px-7">
              <p className="flex items-center gap-2 text-xs text-white/65">
                <ShieldCheck size={15} className="shrink-0 text-[#d7b158]" />
                <span>
                  Statutory CBUAE &amp; DLD planning overview across 24 UAE lenders. Final offers are issued by the bank.
                </span>
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/calculators/mortgage-calculator"
                  onClick={onClose}
                  className="homy-btn homy-btn--white !h-10 !text-[13px]"
                >
                  <span>Run Calculator</span>
                  <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
                    <ArrowRight size={13} strokeWidth={2.2} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/**
 * Static crisp Homepage Cinema Video Preview Card (zero image zoom or pulsing animations).
 */
export function VideoBriefingShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bw-video-card">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-5 text-white">
            <span className="homy-tag homy-tag--light">
              <span className="homy-tag__ring" aria-hidden="true" />
              <span>24-Second Briefing</span>
            </span>
            <h2 className="font-display text-[clamp(28px,3.2vw,42px)] font-semibold leading-[1.12] tracking-[-0.025em] text-white">
              How Betterway compares 24 UAE banks in one clear dossier
            </h2>
            <p className="text-[15.5px] leading-relaxed text-white/75">
              See how we line up fixed periods, post-fixed EIBOR revert margins, statutory 80% / 85% CBUAE caps, and
              itemised Dubai Land Department transfer fees before you sign a single bank form.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="homy-btn homy-btn--white"
              >
                <Play size={14} fill="currentColor" />
                <span>Play 1080p Briefing</span>
                <span className="homy-btn__disc" aria-hidden="true">
                  <ArrowRight size={14} strokeWidth={2.2} />
                </span>
              </button>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/80">
                <Sparkles size={13} className="text-[#d7b158]" />
                0:24 · Zero sign-up required
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Play Betterway Mortgages 24-second HD briefing video"
            className="relative aspect-video w-full overflow-hidden rounded-[20px] border border-white/15 bg-[#080b0f] text-left shadow-[0_32px_70px_-24px_rgba(0,0,0,0.75)] cursor-pointer"
          >
            <img
              src="/video/betterway-explainer.jpg"
              alt="Preview of the Betterway Mortgages 24-second UAE lender comparison briefing"
              width={1920}
              height={1080}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080b0f]/70 via-[#080b0f]/20 to-transparent" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="bw-play-orb">
                <Play size={26} fill="currentColor" className="translate-x-0.5" />
              </span>
            </div>
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#080b0f]/75 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                <img src="/brand/icon.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
                Betterway Mortgages · UAE Advisory Film
              </span>
              <span className="num rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#080b0f]">
                0:24 HD
              </span>
            </div>
          </button>
        </div>
      </div>

      <VideoBriefingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
