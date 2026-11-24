'use client';

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowRight, Play, ShieldCheck, Sparkles, X } from 'lucide-react';

export const SPRING_SNAPPY = { type: 'spring', stiffness: 380, damping: 32, mass: 0.85 } as const;
export const EASE_HOMY = [0.22, 1, 0.36, 1] as const;

/**
 * 21st.dev Cursor-Tracking Spotlight Card.
 * Tracks mouse position via CSS custom properties (zero re-renders per frame)
 * and applies a subtle champagne-gold / emerald edge sheen + spring lift.
 */
export function SpotlightCard({
  children,
  className = '',
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`bw-spotlight ${dark ? 'bw-spotlight--dark' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * 21st.dev Scroll-Linked Parallax & Scale Showcase wrapper
 * smoothly scales architectural media from 0.92 -> 1.02 as it enters the center viewport.
 */
export function ScrollScaleFrame({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.35 });
  const scale = useTransform(smooth, [0, 0.45, 1], [0.92, 1.0, 1.03]);
  const y = useTransform(smooth, [0, 1], [28, -28]);

  return (
    <div ref={ref} className={`w-full flex justify-center ${className}`}>
      <motion.div
        style={reduce ? undefined : { scale, y }}
        className="w-full flex justify-center will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * 21st.dev Scroll-Linked Parallax Hero Architecture Container.
 * Keeps opacity: 1 at t=0 for instant LCP while adding smooth depth parallax on scroll.
 */
export function HeroParallaxMedia({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -34]);
  const scale = useTransform(scrollY, [0, 700], [1, 1.045]);

  return (
    <motion.div
      ref={ref}
      className="homy-hero__media"
      style={reduce ? undefined : { y, scale }}
    >
      {children}
    </motion.div>
  );
}

/**
 * 21st.dev Animated Shimmer / Border-Beam Announcement Banner.
 * Dismissible live regulatory & briefing bar with animated light sweep.
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
      <span className="bw-announce-pill__beam" aria-hidden="true" />
      <span className="bw-announce-pill__dot" aria-hidden="true" />
      <span className="bw-announce-pill__text">
        Live CBUAE 3M EIBOR <strong className="num font-semibold text-[#080b0f]">{eiborText}</strong>
      </span>
      <span className="h-3.5 w-px bg-[#080b0f]/15" aria-hidden="true" />
      <button
        type="button"
        onClick={onWatchVideo}
        className="inline-flex items-center gap-1.5 font-semibold text-[#0a4a3e] transition hover:text-[#080b0f] cursor-pointer"
      >
        <Play size={11} fill="currentColor" />
        <span>Watch 24s Briefing</span>
      </button>
    </div>
  );
}

/**
 * 21st.dev Spring-Animated Cinema Video Briefing Modal Popup.
 * Plays our newly rendered 1080p Full-HD /video/betterway-explainer.mp4 with
 * Betterway's new logo, 24 UAE bank logos, and 4K Dubai residences.
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
          transition={{ duration: reduce ? 0 : 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#080b0f]/82 p-4 backdrop-blur-xl sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Betterway Mortgages 24-second corporate briefing video"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.96, y: 12 }}
            transition={reduce ? { duration: 0 } : SPRING_SNAPPY}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1040px] overflow-hidden rounded-[26px] border border-white/15 bg-[#0b1117] shadow-[0_48px_120px_-24px_rgba(0,0,0,0.8)]"
          >
            {/* Modal Header with New Betterway White Logo */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3.5">
                <img
                  src="/brand/logo-white.svg"
                  alt="Betterway Mortgages"
                  width={1450}
                  height={468}
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
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-white/40 hover:bg-white/20 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* 16:9 Cinema Video Frame */}
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

            {/* Footer Compliance Bar + Quick Actions */}
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
                    <span className="homy-btn__arrow-track">
                      <ArrowRight size={13} strokeWidth={2.2} />
                      <ArrowRight size={13} strokeWidth={2.2} />
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/**
 * Interactive Homepage Cinema Video Preview Card.
 * Opens the spring-animated 1080p Betterway Explainer Modal when clicked.
 */
export function VideoBriefingShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SpotlightCard dark className="bw-video-card">
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
                  <span className="homy-btn__arrow-track">
                    <ArrowRight size={14} strokeWidth={2.2} />
                    <ArrowRight size={14} strokeWidth={2.2} />
                  </span>
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
            className="group relative aspect-video w-full overflow-hidden rounded-[20px] border border-white/15 bg-[#080b0f] text-left shadow-[0_32px_70px_-24px_rgba(0,0,0,0.75)] cursor-pointer"
          >
            <img
              src="/video/betterway-explainer.jpg"
              alt="Preview of the Betterway Mortgages 24-second UAE lender comparison briefing"
              width={1920}
              height={1080}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080b0f]/70 via-[#080b0f]/20 to-transparent transition group-hover:from-[#080b0f]/55" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="bw-play-orb">
                <span className="bw-play-orb__pulse" aria-hidden="true" />
                <Play size={26} fill="currentColor" className="translate-x-0.5" />
              </span>
            </div>
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#080b0f]/75 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                <img src="/brand/icon-fullcolor.svg" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
                Betterway Mortgages · UAE Advisory Film
              </span>
              <span className="num rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#080b0f]">
                0:24 HD
              </span>
            </div>
          </button>
        </div>
      </SpotlightCard>

      <VideoBriefingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
