'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle2, Expand, Mail, X } from 'lucide-react';
import { TEAM_SPECIALISTS, type TeamSpecialist } from '@/data/team';

export type HomyServiceItem = {
  index: string;
  kicker: string;
  title: string;
  body: string;
  href: string;
  img: string;
  alt: string;
};

/** Clean static 3-Card Services Selector (zero sliding/exiting card animations). */
export function HomyServicesAccordion({ items }: { items: readonly HomyServiceItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

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

            {active && (
              <span
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
              {active && (
                <div>
                  <p className="homy-service-card__desc">{item.body}</p>
                  <div className="mt-5">
                    <Link
                      href={item.href}
                      onClick={(e) => e.stopPropagation()}
                      className="homy-btn homy-btn--white !h-10 !text-[13.5px]"
                    >
                      <span>Explore</span>
                      <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
                        <ArrowRight size={13} strokeWidth={2.2} />
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Crisp instant Sticky 2-Column FAQ Accordion (zero collapse/exit animation jitter). */
export function HomyFaqAccordion({ faqs }: { faqs: readonly { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number>(0);

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
                className={`homy-faq-icon rounded-full ${
                  isOpen ? 'bg-[#080b0f] !text-white' : 'bg-white text-[#080b0f]'
                }`}
                aria-hidden="true"
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && <p className="homy-faq-panel">{f.a}</p>}
          </div>
        );
      })}
    </div>
  );
}

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

/**
 * Clean, static, zero-animation Advisor Portrait & Insight Grid (replaces infinite scrolling carousel).
 * Clicking any specialist card opens their high-resolution 8K studio profile modal.
 */
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
      <div className="space-y-6">
        {/* Clean Static 6-Specialist Studio Portrait Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_SPECIALISTS.map((member) => (
            <button
              key={member.slug}
              type="button"
              onClick={() => openProfile(member)}
              aria-label={`Inspect ${member.name} profile`}
              className="homy-portrait-card !w-full text-left cursor-pointer border border-[#e5e7eb]"
            >
              <img
                src={member.portrait1080}
                alt={`${member.name} — ${member.designation}`}
                loading="lazy"
                decoding="async"
              />
              <span className="absolute right-4 top-4 z-[2] grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-[#080b0f]/60 text-white backdrop-blur-md">
                <Expand size={14} />
              </span>
              <div className="homy-portrait-card__meta">
                <h4>{member.name}</h4>
                <p>{member.designation}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Clean Static 4-Column Advisory Principles Strip */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {ADVISORY_NOTES.map((note, i) => {
            const member = TEAM_SPECIALISTS[note.advisorIdx];
            if (!member) return null;
            return (
              <article
                key={`note-${i}`}
                onClick={() => openProfile(member)}
                className="flex cursor-pointer flex-col justify-between rounded-[20px] border border-[#e5e7eb] bg-[#f6f6f6] p-6 transition-colors hover:border-[#179373]"
              >
                <div>
                  <span className="homy-review-card__mark" aria-hidden="true">
                    “
                  </span>
                  <p className="text-[14.5px] leading-relaxed text-[#1f2429]">{note.quote}</p>
                </div>
                <div className="mt-5 flex items-center gap-3 border-t border-[#e5e7eb] pt-4">
                  <img
                    src={member.avatarWebp}
                    alt={member.name}
                    width={42}
                    height={42}
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-10 rounded-[10px] object-cover object-top"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-semibold text-[#0c0c0c]">{member.name}</p>
                    <p className="truncate text-xs text-[#606060]">{member.designation}</p>
                  </div>
                  <ArrowUpRight size={15} className="shrink-0 text-[#4b5b63]" />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Crisp Portaled Specialist Quick-Inspect Modal */}
      {mounted &&
        selected &&
        createPortal(
          <div
            onClick={() => {
              setSelected(null);
              setView8k(false);
            }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-[#080b0f]/82 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.name} specialist profile`}
          >
            <div
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
                className="absolute end-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-[#e5e7eb] bg-white/95 text-[#080b0f] shadow-md transition-colors hover:border-[#080b0f] cursor-pointer"
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
                    className="rounded-full border border-[#d7b158]/50 bg-[#080b0f]/85 px-3 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#f1d57e] backdrop-blur-md cursor-pointer"
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
