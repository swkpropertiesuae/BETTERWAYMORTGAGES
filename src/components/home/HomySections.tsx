'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, CheckCircle2, Expand, Mail, X } from 'lucide-react';
import { TEAM_SPECIALISTS, type TeamSpecialist } from '@/data/team';
import { EASE_HOMY, SPRING_SNAPPY } from '@/components/ui/MotionPrimitives';

export type HomyServiceItem = {
  index: string;
  kicker: string;
  title: string;
  body: string;
  href: string;
  img: string;
  alt: string;
};

/** 21st.dev Spring-Animated Homy 3-Card Interactive Horizontal Expanding Services Accordion */
export function HomyServicesAccordion({ items }: { items: readonly HomyServiceItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className="homy-services-row" role="list">
      {items.map((item, idx) => {
        const active = idx === activeIdx;
        return (
          <div
            key={item.index}
            role="listitem"
            tabIndex={0}
            aria-expanded={active}
            onClick={() => setActiveIdx(idx)}
            onMouseEnter={() => setActiveIdx(idx)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveIdx(idx);
              }
            }}
            className={`homy-service-card ${active ? 'is-active' : ''}`}
          >
            <div className="homy-service-card__bg" aria-hidden="true">
              <img src={item.img} alt={item.alt} loading="lazy" decoding="async" />
            </div>
            <div className="homy-service-card__scrim" aria-hidden="true" />

            {/* Top Emerald-Gold active progress bar */}
            {active && (
              <motion.span
                layoutId="homy-svc-indicator"
                transition={reduce ? { duration: 0 } : SPRING_SNAPPY}
                className="absolute inset-x-0 top-0 z-[2] h-1 bg-gradient-to-r from-[#179373] via-[#34dfac] to-[#d7b158]"
                aria-hidden="true"
              />
            )}

            <span className="homy-service-card__idx" aria-hidden="true">
              {item.index}
            </span>

            <div className="relative z-[1]">
              <p className="homy-service-card__kicker">{item.kicker}</p>
              <h3 className="homy-service-card__title">{item.title}</h3>
              <AnimatePresence initial={false}>
                {active && (
                  <motion.div
                    key={`svc-body-${item.index}`}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: 8 }}
                    transition={{ duration: reduce ? 0 : 0.32, ease: EASE_HOMY }}
                  >
                    <p className="homy-service-card__desc">{item.body}</p>
                    <div className="mt-5">
                      <Link
                        href={item.href}
                        onClick={(e) => e.stopPropagation()}
                        className="homy-btn homy-btn--white !h-10 !text-[13.5px]"
                      >
                        <span>Explore</span>
                        <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
                          <span className="homy-btn__arrow-track">
                            <ArrowRight size={13} strokeWidth={2.2} />
                            <ArrowRight size={13} strokeWidth={2.2} />
                          </span>
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** 21st.dev Spring-Animated Homy Sticky 2-Column Single-Open FAQ Accordion */
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
              <motion.span
                animate={reduce ? undefined : { rotate: isOpen ? 45 : 0 }}
                transition={SPRING_SNAPPY}
                className={`homy-faq-icon rounded-full transition-colors ${
                  isOpen ? 'bg-[#080b0f] !text-white' : 'bg-white text-[#080b0f]'
                }`}
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key={`faq-panel-${idx}`}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.28, ease: EASE_HOMY }}
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

/** Exact Homy Infinite Specialist Carousel with 21st.dev Click-to-Inspect 8K Profile Modal Popup */
const ADVISORY_NOTES = [
  {
    quote:
      'Every borrower sees the fixed period, post-fixed EIBOR revert margin, floor clause, and DLD fees side by side before a single bank form is signed.',
    advisorIdx: 0,
  },
  {
    quote:
      'Understanding how credit card limits and existing liabilities impact your 50% CBUAE debt burden ratio prevents last-minute pre-approval surprises.',
    advisorIdx: 1,
  },
  {
    quote:
      'Document readiness starts on day one — salary certificates, six-month statements, and property papers checked cleanly before formal bank submission.',
    advisorIdx: 2,
  },
  {
    quote:
      'From bank valuation panels and developer NOCs to final offer letters and DLD trustee transfer, every milestone is tracked in one timeline.',
    advisorIdx: 3,
  },
] as const;

export function HomyAdvisorsCarousel() {
  const [selected, setSelected] = useState<TeamSpecialist | null>(null);
  const [view8k, setView8k] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

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

  const cards: Array<
    | { kind: 'quote'; id: string; quote: string; member: TeamSpecialist }
    | { kind: 'portrait'; id: string; member: TeamSpecialist }
  > = [];

  ADVISORY_NOTES.forEach((note, i) => {
    const sp = TEAM_SPECIALISTS[note.advisorIdx];
    const portraitMember = TEAM_SPECIALISTS[(i + 1) % TEAM_SPECIALISTS.length];
    if (sp) cards.push({ kind: 'quote', id: `q-${i}`, quote: note.quote, member: sp });
    if (portraitMember) cards.push({ kind: 'portrait', id: `p-${i}`, member: portraitMember });
  });

  const loopCards = [...cards, ...cards];

  const openProfile = (member: TeamSpecialist) => {
    setSelected(member);
    setView8k(false);
  };

  return (
    <>
      <div className="homy-reviews-wrap">
        <div className="homy-reviews-track">
          {loopCards.map((card, i) =>
            card.kind === 'quote' ? (
              <article
                key={`${card.id}-${i}`}
                className="homy-review-card group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                onClick={() => openProfile(card.member)}
                aria-hidden={i >= cards.length || undefined}
              >
                <div>
                  <span className="homy-review-card__mark" aria-hidden="true">
                    “
                  </span>
                  <p className="homy-review-card__quote">{card.quote}</p>
                </div>
                <div className="homy-review-card__author">
                  <img
                    src={card.member.avatarWebp}
                    alt={i < cards.length ? card.member.name : ''}
                    width={44}
                    height={44}
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-semibold text-[#0c0c0c] group-hover:text-[#0e6954]">
                      {card.member.name}
                    </p>
                    <p className="truncate text-xs text-[#606060]">{card.member.designation}</p>
                  </div>
                  <ArrowUpRight size={15} className="shrink-0 text-[#4b5b63] opacity-60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </div>
              </article>
            ) : (
              <button
                key={`${card.id}-${i}`}
                type="button"
                onClick={() => openProfile(card.member)}
                tabIndex={i >= cards.length ? -1 : undefined}
                aria-hidden={i >= cards.length || undefined}
                aria-label={`Inspect ${card.member.name} profile`}
                className="homy-portrait-card group text-left cursor-pointer"
              >
                <img
                  src={card.member.portrait1080}
                  alt={i < cards.length ? `${card.member.name} — ${card.member.designation}` : ''}
                  loading="lazy"
                />
                <span className="absolute right-4 top-4 z-[2] grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-[#080b0f]/55 text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100">
                  <Expand size={14} />
                </span>
                <div className="homy-portrait-card__meta">
                  <h4>{card.member.name}</h4>
                  <p>{card.member.designation}</p>
                </div>
              </button>
            ),
          )}
        </div>
      </div>

      {/* 21st.dev Animated 8K Specialist Quick-Inspect Popup Modal (Portaled to document.body above sticky header) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.2 }}
                onClick={() => {
                  setSelected(null);
                  setView8k(false);
                }}
                className="fixed inset-0 z-[120] flex items-center justify-center bg-[#080b0f]/82 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.name} specialist profile`}
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96, y: 10 }}
              transition={reduce ? { duration: 0 } : SPRING_SNAPPY}
              onClick={(e) => e.stopPropagation()}
              className="relative grid max-h-[90dvh] w-full max-w-4xl overflow-hidden rounded-[26px] border border-[#e5e7eb] bg-white shadow-2xl md:grid-cols-[0.95fr_1.05fr]"
            >
              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  setView8k(false);
                }}
                aria-label="Close specialist profile"
                className="absolute end-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-[#e5e7eb] bg-white/95 text-[#080b0f] shadow-md transition hover:border-[#080b0f] cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="relative min-h-[320px] bg-[#080b0f] md:min-h-[520px]">
                <img
                  src={view8k ? selected.portrait8k : selected.portrait}
                  alt={`${selected.name} studio portrait`}
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute bottom-3 start-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setView8k((v) => !v)}
                    className="rounded-full border border-[#d7b158]/50 bg-[#080b0f]/85 px-3 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#f1d57e] backdrop-blur-md transition hover:bg-[#141b24] cursor-pointer"
                  >
                    {view8k ? '8K UHD Master Loaded' : 'Load 8K UHD Master'}
                  </button>
                </div>
              </div>

              <div className="flex flex-col overflow-y-auto p-7 sm:p-9">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#edf7f4] px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#0a4a3e]">
                  {selected.department}
                </span>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#080b0f]">
                  {selected.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#0e6954]">
                  {selected.designation} · <span lang="ar">{selected.nameAr}</span>
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-[#4b5b63]">{selected.summary}</p>
                <div className="mt-5 rounded-[16px] bg-[#f6f6f6] p-5">
                  <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#4b5b63]">
                    Core Focus Areas
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[#080b0f]">
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
                      <span className="homy-btn__arrow-track">
                        <ArrowRight size={14} strokeWidth={2.2} />
                        <ArrowRight size={14} strokeWidth={2.2} />
                      </span>
                    </span>
                  </Link>
                  <a href={`mailto:${selected.email}`} className="homy-btn homy-btn--outline">
                    <Mail size={15} /> Email
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
