'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Award, Briefcase, CheckCircle2, Expand, Mail, ShieldCheck, X } from 'lucide-react';
import { EXECUTIVE_LEADERSHIP, TEAM_SPECIALISTS, type TeamSpecialist } from '@/data/team';

const EASE_EXPO = [0.22, 1, 0.36, 1] as const;
const CATEGORIES = ['All', 'Advisory', 'Operations', 'Growth & People'] as const;
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

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelected(null);
        setView8k(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  const visible =
    cat === 'All' ? TEAM_SPECIALISTS : TEAM_SPECIALISTS.filter((m) => m.category === cat);

  return (
    <div className="space-y-12">
      {/* Executive Leadership Tier — Owner Shabib Siraj & Executive Director Warda */}
      {showLeadership && !compact && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Executive Governance</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
                Ownership &amp; <span className="serif font-normal">leadership.</span>
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brass/40 bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-700">
              <ShieldCheck size={14} /> Betterway Mortgages LLC · Dubai
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {EXECUTIVE_LEADERSHIP.map((exec, idx) => (
              <motion.article
                key={exec.slug}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE_EXPO }}
                className="relative overflow-hidden rounded-[26px] border border-brass/30 bg-navy p-7 text-white shadow-[0_28px_60px_-28px_rgb(2_17_37/0.72)]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -end-20 -top-20 h-56 w-56 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(215, 176, 78, 0.22) 0%, transparent 70%)',
                  }}
                />
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-brass/50 bg-[#072244] font-display text-lg font-bold tracking-tight text-brass shadow-inner">
                      {exec.initials}
                    </span>
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-brass/35 bg-white/[0.06] px-2.5 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-brass">
                        <Award size={11} /> {exec.tier}
                      </span>
                      <h3 className="mt-1.5 font-display text-xl font-semibold text-white">{exec.name}</h3>
                      <p className="text-sm font-medium text-brass-200">{exec.role}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-white/45" lang="ar">
                    {exec.nameAr}
                  </span>
                </div>

                <p className="relative z-10 mt-5 text-sm leading-relaxed text-white/75">{exec.bio}</p>

                <ul className="relative z-10 mt-5 flex flex-wrap gap-2">
                  {exec.focus.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-xs font-medium text-white/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                  <span className="text-white/55">{exec.department}</span>
                  <a
                    href={`mailto:${exec.email}`}
                    className="inline-flex items-center gap-1.5 font-semibold text-brass transition hover:text-brass-200"
                  >
                    <Mail size={13} /> {exec.email}
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      )}

      {/* Specialist Portfolio Grid with 21st.dev morphing filter pills */}
      <div className="space-y-7">
        {!compact && (
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">Dubai Specialist Portfolio</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
                Meet the specialists <span className="serif font-normal">behind every file.</span>
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
                    className={`relative rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition cursor-pointer ${
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((member, idx) => (
            <motion.article
              key={member.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: (idx % 3) * 0.07, ease: EASE_EXPO }}
              className="bw-team-card group flex flex-col overflow-hidden rounded-[26px] border border-line bg-white shadow-[0_18px_46px_-26px_rgb(2_17_37/0.22)] transition duration-300 hover:-translate-y-1 hover:border-brass/60 hover:shadow-[0_30px_64px_-28px_rgb(2_17_37/0.34)]"
            >
              {/* Full Studio Portrait — authentic uploaded photography remastered to 8K */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy">
                <img
                  src={member.portrait1080}
                  srcSet={`${member.portrait1080} 1080w, ${member.portrait} 2400w`}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                  alt={`${member.name} — ${member.designation} at Betterway Mortgages Dubai`}
                  loading={idx < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#021125]/92 via-[#021125]/40 to-transparent"
                />
                <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
                  <span className="rounded-full border border-white/20 bg-[#021125]/70 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-brass backdrop-blur-md">
                    {member.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(member);
                      setView8k(false);
                    }}
                    aria-label={`Inspect ${member.name} full profile and 8K portrait`}
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/25 bg-[#021125]/65 text-white backdrop-blur-md transition hover:border-brass hover:text-brass cursor-pointer"
                  >
                    <Expand size={14} />
                  </button>
                </div>
                <div className="absolute inset-x-5 bottom-4">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-brass-200">{member.designation}</p>
                </div>
              </div>

              {/* Editorial Profile Body */}
              <div className="flex flex-1 flex-col p-6">
                <p className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-teal-700">
                  <Briefcase size={12} /> {member.department}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate">{member.summary}</p>

                <ul className="mt-4 space-y-1.5 border-t border-line pt-4 text-xs text-ink">
                  {member.specialties.map((spec) => (
                    <li key={spec} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-teal-700" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(member);
                      setView8k(false);
                    }}
                    className="text-xs font-semibold text-navy underline decoration-brass/60 underline-offset-4 transition hover:text-teal-700 cursor-pointer"
                  >
                    View full profile
                  </button>
                  <Link
                    href={`/contact?advisor=${encodeURIComponent(member.name)}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-navy-800"
                  >
                    Consult <ArrowUpRight size={13} className="text-brass" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Full Profile & 8K Master Portrait Modal */}
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
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#010915]/80 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.name} specialist profile`}
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
                aria-label="Close specialist profile"
                className="absolute end-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-line bg-white/95 text-navy shadow-md transition hover:border-navy cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="relative min-h-[340px] bg-navy md:min-h-[540px]">
                <img
                  src={view8k ? selected.portrait8k : selected.portrait}
                  alt={`${selected.name} studio portrait`}
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute bottom-3 start-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setView8k((v) => !v)}
                    className="rounded-full border border-brass/50 bg-[#021125]/85 px-3 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brass backdrop-blur-md transition hover:bg-[#072244] cursor-pointer"
                  >
                    {view8k ? '8K UHD Master Loaded' : 'Load 8K UHD Master'}
                  </button>
                  <a
                    href={selected.portrait8k}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/25 bg-[#021125]/75 px-3 py-1.5 font-mono text-[10.5px] font-semibold text-white backdrop-blur-md hover:border-brass hover:text-brass"
                  >
                    Open 8K ↗
                  </a>
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
                    Book consultation with {selected.name.split(' ')[0]} <ArrowUpRight size={15} className="text-brass" />
                  </Link>
                  <a href={`mailto:${selected.email}`} className="btn btn-ghost">
                    <Mail size={15} /> Email
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
