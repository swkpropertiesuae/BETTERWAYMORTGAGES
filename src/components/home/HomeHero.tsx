'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Pause, Play, ShieldCheck, X } from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
import { Cta } from '@/components/ui';
import { BANKS } from '@/data/banks';
import { buildHeroDossier, HERO_SCENES, nextSceneIndex } from '@/lib/hero-showcase';

const fmtDate = (v: string) =>
  new Date(v + 'T12:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Dubai',
  });

const CORP_EASE = [0.22, 1, 0.36, 1] as const;
const CYCLE_MS = 6500;

export default function HomeHero() {
  const { data } = useBenchmark();
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const film = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const [sceneIdx, setSceneIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  const autoRun = !reduce && !paused && !hovered;

  useEffect(() => {
    if (!autoRun) return;
    const id = window.setInterval(() => {
      setSceneIdx((curr) => nextSceneIndex(curr, HERO_SCENES.length, 1));
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [autoRun]);

  const openFilm = () => {
    dialog.current?.showModal();
    film.current?.play().catch(() => {});
  };
  const closeFilm = () => {
    film.current?.pause();
    dialog.current?.close();
  };

  const scene = HERO_SCENES[sceneIdx] ?? HERO_SCENES[0];
  const dossier = buildHeroDossier(data.latest.threeMonth);

  return (
    <section
      ref={heroRef}
      className="bw-hero bw-hero--8b"
      data-8b-section="hero"
      aria-labelledby="hero-title"
    >
      <div className="bw-hero__rails" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="bw-hero__aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="wrap bw-hero__inner">
        <div className="bw-hero__copy">
          <p className="bw-hero__eyebrow">
            <span className="bw-hero__dot" aria-hidden="true" />
            <span>CBUAE-aligned mortgage advisory · Dubai &amp; UAE</span>
          </p>

          <h1 id="hero-title" className="bw-hero__headline">
            <span className="bw-8b-mask">
              <span>Private-grade clarity</span>
            </span>
            <span className="bw-8b-mask">
              <span>
                for your UAE <em>mortgage.</em>
              </span>
            </span>
          </h1>

          <p className="bw-hero__lead">
            Independent mortgage structuring across {BANKS.length} UAE lenders. Review statutory CBUAE rules, published EIBOR fixings, and itemised DLD closing costs before a single application is filed.
          </p>

          <div className="bw-hero__actions">
            <Cta href="#calculator" tone="gold">
              Build my mortgage plan
            </Cta>
            <button type="button" className="bw-hero__film-btn" onClick={openFilm}>
              <span className="bw-hero__play" aria-hidden="true">
                <Play size={13} fill="currentColor" />
              </span>
              <span>Watch 32s briefing</span>
            </button>
          </div>

          <dl className="bw-hero__metrics" aria-label="Advisory coverage">
            <div>
              <dt>Lender directory</dt>
              <dd className="num">{BANKS.length} UAE banks</dd>
            </div>
            <div>
              <dt>CBUAE DBR cap</dt>
              <dd className="num">50% max</dd>
            </div>
            <div>
              <dt>Advisory desks</dt>
              <dd>EN &amp; العربية</dd>
            </div>
          </dl>
        </div>

        <div
          className="bw-hero__visual"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="bw-hero__stage-frame">
            <div className="bw-hero__scene-bar">
              <div className="bw-hero__scene-tabs" role="group" aria-label="Advisory mandates">
                {HERO_SCENES.map((item, idx) => {
                  const active = idx === sceneIdx;
                  return (
                    <button
                      key={item.index}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSceneIdx(idx)}
                      className={`bw-hero__scene-tab ${active ? 'is-active' : ''}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="hero-scene-pill"
                          className="bw-hero__scene-pill"
                          transition={reduce ? { duration: 0 } : { duration: 0.28, ease: CORP_EASE }}
                        />
                      )}
                      <span className="relative z-[1] num text-[10.5px] opacity-75">{item.index}</span>
                      <span className="relative z-[1]">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className="bw-hero__pause"
                aria-pressed={paused}
                aria-label={paused ? 'Resume showcase rotation' : 'Pause showcase rotation'}
                onClick={() => setPaused((p) => !p)}
              >
                {paused ? <Play size={12} /> : <Pause size={12} />}
              </button>
            </div>

            <div className="bw-hero__viewport">
              <motion.div
                className="bw-hero__parallax"
                style={reduce ? undefined : { y: parallaxY }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={scene.src}
                    src={scene.src}
                    srcSet={scene.srcSet}
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    width={scene.width}
                    height={scene.height}
                    alt={scene.alt}
                    fetchPriority={sceneIdx === 0 ? 'high' : 'auto'}
                    decoding="sync"
                    initial={reduce ? false : { opacity: 0.25, scale: 1.025 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0.25 }}
                    transition={{ duration: reduce ? 0 : 0.55, ease: CORP_EASE }}
                  />
                </AnimatePresence>
              </motion.div>

              <div className="bw-hero__caption">
                <span className="num text-brass">{scene.index}</span>
                <span>{scene.location}</span>
                <span className="ms-auto text-[10.5px] text-white/65">Concept architecture</span>
              </div>

              {autoRun && (
                <div className="bw-hero__cycle" aria-hidden="true">
                  <motion.span
                    key={`${sceneIdx}-${paused}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bw-hero__dossier">
            <div className="bw-hero__dossier-head">
              <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brass">
                <ShieldCheck size={13} /> Official CBUAE benchmark &amp; statutory caps
              </span>
              <span className="text-[11px] text-white/65">Published {fmtDate(data.latest.date)}</span>
            </div>

            <div className="bw-hero__dossier-grid">
              <Link href="/rates/eibor-live-tracker" className="bw-hero__dossier-cell">
                <span className="bw-hero__dossier-label">Published 3M EIBOR</span>
                <strong className="num">{dossier.eiborFormatted}</strong>
                <span className="bw-hero__dossier-sub">
                  CBUAE daily fixing <ArrowUpRight size={12} />
                </span>
              </Link>

              <Link href="#calculator" className="bw-hero__dossier-cell">
                <span className="bw-hero__dossier-label">CBUAE First-Home LTV</span>
                <strong className="num">
                  Up to {dossier.residentMaxLtv} / {dossier.nationalMaxLtv}
                </strong>
                <span className="bw-hero__dossier-sub num">
                  Max DBR: {dossier.maxDbr} · 25-yr max tenure
                </span>
              </Link>
            </div>

            <div className="bw-hero__dossier-foot">
              <Link href={scene.href} className="bw-hero__mandate-link">
                <span className="num text-brass">{scene.index}</span>
                <span>{scene.mandate}</span>
                <ArrowUpRight size={14} className="ms-auto shrink-0 text-brass" />
              </Link>
              <p>Official CBUAE benchmark &amp; statutory limits · Individual bank offers confirmed in writing.</p>
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={dialog}
        className="bw-dialog"
        aria-label="Betterway explainer film"
        onCancel={() => film.current?.pause()}
        onClick={(e) => {
          if (e.target === dialog.current) closeFilm();
        }}
      >
        <button type="button" className="bw-dialog__close" aria-label="Close film" onClick={closeFilm}>
          <X size={18} />
        </button>
        <video ref={film} controls playsInline preload="none" poster="/video/betterway-explainer.jpg">
          <source src="/video/betterway-explainer.mp4" type="video/mp4" />
        </video>
        <p>How Betterway structures UAE mortgages · 32-second briefing</p>
      </dialog>
    </section>
  );
}
