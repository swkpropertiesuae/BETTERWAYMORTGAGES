'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Award, Briefcase, CheckCircle2, Expand, Mail, ShieldCheck, X } from 'lucide-react';
import { ALL_TEAM_MEMBERS, EXECUTIVE_LEADERSHIP, type TeamSpecialist } from '@/data/team';

const EASE_EXPO = [0.22, 1, 0.36, 1] as const;
const CATEGORIES = ['All', 'Leadership', 'Advisory', 'Operations', 'Growth & People'] as const;
type Category = (typeof CATEGORIES)[number];

export function TeamPortfolio({
  compact = false,
  showLeadership = true,
}: {
  compact?: boolean;
  showLeadership?: boolean;
}) {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<Category>('All');
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

  const visible =
    cat === 'All' ? ALL_TEAM_MEMBERS : ALL_TEAM_MEMBERS.filter((m) => m.category === cat);

  const openMember = (member: TeamSpecialist) => {
    setSelected(member);
    setView8k(false);
  };

  return (
    <div className="space-y-14">
      {/* Executive Leadership Highlight — Warda Kapadia & Shabib Siraj with Exact Same Eye-Level 3:4 Portraits */}
      {showLeadership && !compact && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Executive Leadership</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
                Founder &amp; <span className="serif font-normal">executive direction.</span>
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brass/40 bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-700">
              <ShieldCheck size={14} /> Betterway Mortgages LLC · Dubai
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {EXECUTIVE_LEADERSHIP.map((exec, idx) => {
              const asMember = ALL_TEAM_MEMBERS.find((m) => m.slug === exec.slug)!;
              return (
                <article
                  key={exec.slug}
                  className="group relative grid overflow-hidden rounded-[26px] border border-brass/30 bg-navy text-white shadow-[0_28px_60px_-28px_rgb(2_17_37/0.72)] sm:grid-cols-[210px_1fr]"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -end-20 -top-20 h-56 w-56 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(215, 176, 78, 0.18) 0%, transparent 70%)',
                    }}
                  />
                  {/* Exact 3:4 eye-level calibrated executive portrait */}
                  <button
                    type="button"
                    onClick={() => openMember(asMember)}
                    aria-label={`Inspect ${exec.name} full executive profile`}
                    className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a1424] sm:h-full sm:aspect-auto cursor-pointer"
                  >
                    <img
                      src={exec.portrait}
                      alt={`${exec.name} — ${exec.role} at Betterway Mortgages Dubai`}
                      width={900}
                      height={1200}
                      loading="eager"
                      className="h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-[1.02]"
                    />
                    <span className="absolute bottom-3 start-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-[#080b0f]/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brass backdrop-blur-md">
                      <Expand size={11} /> Profile
                    </span>
                  </button>

                  <div className="relative z-10 flex flex-col justify-between p-6 sm:p-7">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-brass/35 bg-white/[0.06] px-2.5 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-brass">
                          <Award size={11} /> {exec.tier}
                        </span>
                        <span className="font-mono text-xs text-white/45" lang="ar">
                          {exec.nameAr}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-2xl font-semibold text-white">{exec.name}</h3>
                      <p className="text-sm font-medium text-brass-200">{exec.role}</p>

                      <p className="mt-3.5 text-sm leading-relaxed text-white/80">{exec.bio}</p>

                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {exec.focus.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-white/12 bg-white/[0.05] px-2.5 py-1 text-[11.5px] font-medium text-white/85"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs">
                      <a
                        href={`mailto:${exec.email}`}
                        className="inline-flex items-center gap-1.5 font-semibold text-brass transition hover:text-brass-200"
                      >
                        <Mail size={13} /> {exec.email}
                      </a>
                      <Link
                        href={`/contact?advisor=${encodeURIComponent(exec.name)}`}
                        className="inline-flex items-center gap-1 font-semibold text-white/90 hover:text-[#34dfac]"
                      >
                        Consult 1-on-1 <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* Full 8-Member Eye-Level Aligned Studio Portrait Grid (ALL 8 faces at identical y = 33.0% horizon) */}
      <div className="space-y-7">
        {!compact && (
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">Betterway Dubai Team · All 8 Specialists</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
                Every leader &amp; advisor <span className="serif font-normal">behind your mortgage.</span>
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Filter Betterway team by department"
              className="inline-flex flex-wrap items-center gap-1 rounded-full border border-line bg-white p-1.5 shadow-[0_8px_24px_-16px_rgb(2_17_37/0.25)]"
            >
              {CATEGORIES.map((c) => {
                const active = cat === c;
                return (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCat(c)}
                    className={`relative rounded-full px-3.5 py-2 text-xs font-semibold tracking-wide transition cursor-pointer ${
                      active ? 'text-white' : 'text-slate hover:text-navy'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="bw-team-filter-pill"
                        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-navy shadow-sm"
                      />
                    )}
                    <span className="relative z-10">{c}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((member, idx) => (
            <article
              key={member.slug}
              className="bw-team-card group flex flex-col overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_18px_46px_-26px_rgb(2_17_37/0.2)] transition duration-300 hover:-translate-y-1 hover:border-brass/60 hover:shadow-[0_28px_60px_-28px_rgb(2_17_37/0.32)]"
            >
              {/* Exact 3:4 Portrait Container matching 900x1200 eye-level aligned master => identical eye-line across all 8 cards */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a1424]">
                <img
                  src={member.portrait}
                  alt={`${member.name} — ${member.designation} at Betterway Mortgages Dubai`}
                  width={900}
                  height={1200}
                  loading="eager"
                  decoding="sync"
                  className="h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080b0f]/92 via-[#080b0f]/35 to-transparent"
                />
                <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
                  <span className="rounded-full border border-white/20 bg-[#080b0f]/72 px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-brass backdrop-blur-md">
                    {member.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => openMember(member)}
                    aria-label={`Inspect ${member.name} full profile`}
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/25 bg-[#080b0f]/65 text-white backdrop-blur-md transition hover:border-brass hover:text-brass cursor-pointer"
                  >
                    <Expand size={13} />
                  </button>
                </div>
                <div className="absolute inset-x-4 bottom-3.5">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-brass-200">{member.designation}</p>
                </div>
              </div>

              {/* Clean Concise Profile Footer */}
              <div className="flex flex-1 flex-col p-5">
                <p className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-teal-700">
                  <Briefcase size={11} /> {member.department}
                </p>
                <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-slate">{member.summary}</p>

                <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-4">
                  <button
                    type="button"
                    onClick={() => openMember(member)}
                    className="text-xs font-semibold text-navy underline decoration-brass/60 underline-offset-4 transition hover:text-teal-700 cursor-pointer"
                  >
                    Full profile
                  </button>
                  <Link
                    href={`/contact?advisor=${encodeURIComponent(member.name)}`}
                    className="inline-flex items-center gap-1 rounded-full bg-navy px-3 py-1.5 text-[11.5px] font-semibold text-white transition hover:bg-navy-800"
                  >
                    Consult <ArrowUpRight size={12} className="text-brass" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Profile & High-Resolution Portrait Modal */}
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
                aria-label={`${selected.name} profile`}
              >
                <motion.div
                  initial={reduce ? false : { opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.97, y: 8 }}
                  transition={{ duration: 0.28, ease: EASE_EXPO }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative grid max-h-[90dvh] w-full max-w-4xl overflow-hidden rounded-[28px] border border-brass/35 bg-white shadow-2xl md:grid-cols-[0.95fr_1.05fr]"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(null);
                      setView8k(false);
                    }}
                    aria-label="Close profile"
                    className="absolute end-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-line bg-white/95 text-navy shadow-md transition hover:border-navy cursor-pointer"
                  >
                    <X size={18} />
                  </button>

                  <div className="relative aspect-[3/4] bg-[#0a1424] md:aspect-auto md:min-h-[540px]">
                    <img
                      src={view8k ? selected.portrait8k : selected.portrait}
                      alt={`${selected.name} studio portrait`}
                      className="h-full w-full object-cover object-center"
                    />
                    <div className="absolute bottom-3 start-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setView8k((v) => !v)}
                        className="rounded-full border border-brass/50 bg-[#080b0f]/85 px-3 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brass backdrop-blur-md transition hover:bg-[#141b24] cursor-pointer"
                      >
                        {view8k ? 'Ultra-HD Loaded' : 'Load Ultra-HD'}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col overflow-y-auto p-7 sm:p-9">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-teal-700">
                      {selected.department}
                    </span>
                    <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-navy">
                      {selected.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-teal-700">
                      {selected.designation} · <span lang="ar">{selected.nameAr}</span>
                    </p>

                    <p className="mt-5 text-[15px] leading-relaxed text-slate">{selected.summary}</p>

                    <div className="mt-6 rounded-2xl border border-line bg-mist p-5">
                      <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">
                        Core Focus Areas
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-navy">
                        {selected.specialties.map((s) => (
                          <li key={s} className="flex items-start gap-2.5">
                            <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-teal-700" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 space-y-2 text-xs text-slate">
                      <p>
                        <strong className="text-navy">Office:</strong> Betterway Mortgages LLC · Al Nasr Plaza, Oud Metha, Dubai, UAE
                      </p>
                      <p>
                        <strong className="text-navy">Direct Email:</strong>{' '}
                        <a href={`mailto:${selected.email}`} className="font-semibold text-teal-700 underline">
                          {selected.email}
                        </a>
                      </p>
                    </div>

                    <div className="mt-auto flex flex-wrap gap-3 pt-7">
                      <Link
                        href={`/contact?advisor=${encodeURIComponent(selected.name)}`}
                        onClick={() => setSelected(null)}
                        className="btn btn-primary flex-1"
                      >
                        Speak 1-on-1 with {selected.name.split(' ')[0]} <ArrowUpRight size={15} className="text-brass" />
                      </Link>
                      <a href={`mailto:${selected.email}`} className="btn btn-ghost">
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
    </div>
  );
}
