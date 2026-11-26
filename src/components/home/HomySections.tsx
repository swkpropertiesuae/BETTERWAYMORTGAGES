'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Expand, Mail, X } from 'lucide-react';
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

/**
 * Eye-level aligned 8-member leadership & advisor portrait grid (all 8 calibrated 3:4 portraits at y = 33.0%).
 * Clicking any portrait opens their full profile and 1-on-1 booking modal.
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
      <div className="mx-auto max-w-[1220px]">
        {/* Exact 3:4 Eye-Level Aligned 8-Person Team Grid (4x2 on Desktop) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ALL_TEAM_MEMBERS.map((member, idx) => (
            <button
              key={member.slug}
              type="button"
              onClick={() => openProfile(member)}
              aria-label={`Inspect ${member.name} — ${member.designation}`}
              className="group relative aspect-[3/4] w-full overflow-hidden rounded-[22px] border border-[#e5e7eb] bg-[#0a1424] text-left shadow-[0_14px_38px_-22px_rgba(10,20,36,0.38)] transition duration-300 hover:-translate-y-1 hover:border-[#c8a352] hover:shadow-[0_24px_52px_-20px_rgba(10,20,36,0.5)] cursor-pointer"
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
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080b0f]/94 via-[#080b0f]/45 to-transparent"
              />
              <span className="absolute end-3.5 top-3.5 z-[2] grid h-8 w-8 place-items-center rounded-full border border-white/25 bg-[#080b0f]/60 text-white backdrop-blur-md transition group-hover:border-[#f1d57e] group-hover:text-[#f1d57e]">
                <Expand size={13} />
              </span>
              <div className="absolute inset-x-4 bottom-4 z-[2] text-white">
                <h4 className="font-display text-lg font-semibold leading-tight text-white">{member.name}</h4>
                <p className="mt-0.5 text-xs font-medium text-[#f1d57e]">{member.designation}</p>
              </div>
            </button>
          ))}
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

              <div className="relative aspect-[3/4] bg-[#080b0f] md:aspect-auto md:min-h-[520px]">
                <img
                  src={view8k ? selected.portrait8k : selected.portrait}
                  alt={`${selected.name} studio portrait`}
                  className="h-full w-full object-cover object-center"
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
