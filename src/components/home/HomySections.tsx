'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, CheckCircle2, Expand, Mail, X } from 'lucide-react';
import { EASE_SWISS } from '@/components/ui/MotionPrimitives';
import { ALL_TEAM_MEMBERS, type TeamSpecialist } from '@/data/team';

export type HomyServiceItem = {
  index: string;
  kicker: string;
  title: string;
  body: string;
  href: string;
  img: string;
  alt: string;
};

/** Clean 3-card Swiss selector kept exported for compatibility. */
export function HomyServicesAccordion({ items }: { items: readonly HomyServiceItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="grid gap-4 md:grid-cols-3" role="list">
      {items.map((item, idx) => {
        const active = idx === activeIdx;
        return (
          <div
            key={item.index}
            role="listitem"
            tabIndex={0}
            aria-expanded={active}
            onClick={() => setActiveIdx(idx)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveIdx(idx);
              }
            }}
            className={`relative overflow-hidden rounded-[16px] border p-6 transition cursor-pointer ${
              active
                ? 'border-[#070e1a] bg-[#070e1a] text-white'
                : 'border-[#e3e7ee] bg-white text-[#070e1a] hover:border-[#070e1a]/35'
            }`}
          >
            <span className="num text-xs font-semibold opacity-60">{item.index}</span>
            <p className={`mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] ${active ? 'text-[#d7b158]' : 'text-[#0e6954]'}`}>
              {item.kicker}
            </p>
            <h3 className={`mt-2 font-display text-xl font-bold ${active ? 'text-white' : 'text-[#070e1a]'}`}>
              {item.title}
            </h3>
            <p className={`mt-2.5 text-sm leading-relaxed ${active ? 'text-white/75' : 'text-[#4a5568]'}`}>
              {item.body}
            </p>
            <div className="mt-5">
              <Link
                href={item.href}
                onClick={(e) => e.stopPropagation()}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold ${active ? 'text-[#34dfac]' : 'text-[#070e1a]'}`}
              >
                Explore <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Swiss Hairline FAQ Accordion with smooth Framer Motion AnimatePresence reveal. */
export function HomyFaqAccordion({ faqs }: { faqs: readonly { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number>(0);
  const reduce = useReducedMotion();

  return (
    <div className="homy-faq-list">
      {faqs.map((f, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={f.q} className="homy-faq-item" data-open={isOpen ? 'true' : 'false'}>
            <button
              type="button"
              className="homy-faq-btn"
              aria-expanded={isOpen}
              onClick={() => setOpenIdx(isOpen ? -1 : idx)}
            >
              <span>{f.q}</span>
              <span
                className={`homy-faq-icon ${
                  isOpen ? 'border-[#070e1a] bg-[#070e1a] text-white' : 'bg-[#f7f8fa] text-[#070e1a]'
                }`}
                aria-hidden="true"
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.22, ease: EASE_SWISS }}
                  className="overflow-hidden"
                >
                  <p className="homy-faq-panel">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/** Exported for legacy compatibility if referenced on dedicated team pages. */
export function HomyAdvisorsCarousel() {
  const [selected, setSelected] = useState<TeamSpecialist | null>(null);
  const [view8k, setView8k] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelected(null);
        setView8k(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  const openProfile = (member: TeamSpecialist) => {
    setSelected(member);
    setView8k(false);
  };

  return (
    <>
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ALL_TEAM_MEMBERS.map((member, idx) => (
            <button
              key={member.slug}
              type="button"
              onClick={() => openProfile(member)}
              aria-label={`Inspect ${member.name} — ${member.designation}`}
              className="group relative aspect-[3/4] w-full overflow-hidden rounded-[16px] border border-[#e3e7ee] bg-[#070e1a] text-left transition duration-300 hover:-translate-y-1 hover:border-[#d7b158] cursor-pointer"
            >
              <img
                src={member.portrait}
                srcSet={`${member.portrait1080} 900w, ${member.portrait8k} 1500w`}
                sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 94vw"
                alt={`${member.name} — ${member.designation} at Betterway Mortgages Dubai`}
                width={900}
                height={1200}
                loading={idx < 4 ? 'eager' : 'lazy'}
                decoding="async"
                className="h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070e1a]/95 via-[#070e1a]/45 to-transparent"
              />
              <span className="absolute end-3.5 top-3.5 z-[2] grid h-8 w-8 place-items-center rounded-[9px] border border-white/25 bg-[#070e1a]/70 text-white backdrop-blur-md transition group-hover:border-[#d7b158] group-hover:text-[#fcf1b7]">
                <Expand size={13} />
              </span>
              <div className="absolute inset-x-4 bottom-4 z-[2] text-white">
                <h4 className="font-display text-lg font-semibold leading-tight text-white">{member.name}</h4>
                <p className="mt-0.5 text-xs font-medium text-[#fcf1b7]">{member.designation}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {mounted &&
        selected &&
        createPortal(
          <div
            onClick={() => {
              setSelected(null);
              setView8k(false);
            }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-[#070e1a]/82 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.name} specialist profile`}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative grid max-h-[90dvh] w-full max-w-4xl overflow-hidden rounded-[22px] border border-[#e3e7ee] bg-white shadow-2xl md:grid-cols-[0.95fr_1.05fr]"
            >
              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  setView8k(false);
                }}
                aria-label="Close specialist profile"
                className="absolute end-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-[10px] border border-[#e3e7ee] bg-white/95 text-[#070e1a] shadow-sm transition hover:border-[#070e1a] cursor-pointer"
              >
                <X size={17} />
              </button>

              <div className="relative aspect-[3/4] bg-[#070e1a] md:aspect-auto md:min-h-[520px]">
                <img
                  src={view8k ? selected.portrait8k : selected.portrait}
                  alt={`${selected.name} studio portrait`}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute bottom-3 start-3">
                  <button
                    type="button"
                    onClick={() => setView8k((v) => !v)}
                    className="rounded-[9px] border border-[#d7b158]/50 bg-[#070e1a]/85 px-3 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#fcf1b7] backdrop-blur-md cursor-pointer"
                  >
                    {view8k ? 'Ultra-HD Loaded' : 'Load Ultra-HD'}
                  </button>
                </div>
              </div>

              <div className="flex flex-col overflow-y-auto p-7 sm:p-9">
                <span className="inline-flex w-fit items-center rounded-[7px] bg-[#edf7f4] px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#0e6954]">
                  {selected.department}
                </span>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#070e1a]">
                  {selected.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#0e6954]">
                  {selected.designation} · <span lang="ar">{selected.nameAr}</span>
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-[#4a5568]">{selected.summary}</p>
                <div className="mt-5 rounded-[14px] border border-[#e3e7ee] bg-[#f7f8fa] p-5">
                  <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#4a5568]">
                    Core Focus Areas
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[#070e1a]">
                    {selected.specialties.map((s) => (
                      <li key={s} className="flex items-start gap-2.5">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#0e6954]" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  <Link
                    href={`/contact?advisor=${encodeURIComponent(selected.name)}`}
                    onClick={() => setSelected(null)}
                    className="homy-btn flex-1 justify-between"
                  >
                    <span>Book with {selected.name.split(' ')[0]}</span>
                    <span className="homy-btn__disc" aria-hidden="true">
                      <ArrowRight size={14} strokeWidth={2.2} />
                    </span>
                  </Link>
                  <a href={`mailto:${selected.email}`} className="homy-btn homy-btn--outline">
                    <Mail size={15} /> Email
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
