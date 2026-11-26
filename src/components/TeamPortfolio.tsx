'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Award, Briefcase, CheckCircle2, Expand, Mail, ShieldCheck, X } from 'lucide-react';
import { EASE_SWISS, SPRING_INSTITUTIONAL } from '@/components/ui/MotionPrimitives';
import { ALL_TEAM_MEMBERS, EXECUTIVE_LEADERSHIP, type TeamSpecialist } from '@/data/team';

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
      {/* Executive Leadership — Midnight Navy Swiss Architectural Split Cards */}
      {showLeadership && !compact && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Executive Leadership</p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                Founder &amp; <span className="serif font-normal">executive direction.</span>
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-[9px] border border-[#e3e7ee] bg-[#edf7f4] px-3.5 py-1.5 text-xs font-semibold text-[#0e6954]">
              <ShieldCheck size={14} /> Betterway Mortgages LLC · Dubai
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {EXECUTIVE_LEADERSHIP.map((exec, idx) => {
              const asMember = ALL_TEAM_MEMBERS.find((m) => m.slug === exec.slug)!;
              return (
                <motion.article
                  key={exec.slug}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE_SWISS }}
                  className="bw-hot-beam-shell group relative overflow-hidden p-[1px] shadow-[0_24px_56px_-28px_rgba(7,14,26,0.55)]"
                >
                  <div className="grid overflow-hidden rounded-[21px] bg-[#070e1a] text-white sm:grid-cols-[210px_1fr]">
                    <button
                      type="button"
                      onClick={() => openMember(asMember)}
                      aria-label={`Inspect ${exec.name} full executive profile`}
                      className="relative aspect-[3/4] w-full overflow-hidden bg-[#0c1524] sm:h-full sm:aspect-auto cursor-pointer"
                    >
                      <img
                        src={exec.portrait}
                        alt={`${exec.name} — ${exec.role} at Betterway Mortgages Dubai`}
                        width={900}
                        height={1200}
                        loading="eager"
                        className="h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-[1.02]"
                      />
                      <span className="absolute bottom-3 start-3 inline-flex items-center gap-1 rounded-[7px] border border-white/20 bg-[#070e1a]/80 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#fcf1b7] backdrop-blur-md">
                        <Expand size={11} /> Profile
                      </span>
                    </button>

                    <div className="relative z-10 flex flex-col justify-between p-6 sm:p-7">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-[7px] border border-[#d7b158]/35 bg-[#0c1524] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#d7b158]">
                            <Award size={11} /> {exec.tier}
                          </span>
                          <span className="font-mono text-xs text-white/45" lang="ar">
                            {exec.nameAr}
                          </span>
                        </div>

                        <h3 className="mt-3 font-display text-2xl font-bold text-white">{exec.name}</h3>
                        <p className="text-sm font-medium text-[#fcf1b7]">{exec.role}</p>

                        <p className="mt-3.5 text-sm leading-relaxed text-white/75">{exec.bio}</p>

                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {exec.focus.map((item) => (
                            <li
                              key={item}
                              className="rounded-[7px] border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/82"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs">
                        <a
                          href={`mailto:${exec.email}`}
                          className="inline-flex items-center gap-1.5 font-semibold text-[#d7b158] transition hover:text-[#fcf1b7]"
                        >
                          <Mail size={13} /> {exec.email}
                        </a>
                        <Link
                          href={`/contact?advisor=${encodeURIComponent(exec.name)}`}
                          className="inline-flex items-center gap-1 font-semibold text-white hover:text-[#34dfac]"
                        >
                          Consult 1-on-1 <ArrowUpRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      )}

      {/* Full 8-Member Eye-Level Aligned Swiss Studio Portrait Gallery */}
      <div className="space-y-7">
        {!compact && (
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">Betterway Dubai Team · All 8 Specialists</p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                Every leader &amp; advisor <span className="serif font-normal">behind your mortgage.</span>
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Filter Betterway team by department"
              className="inline-flex flex-wrap items-center gap-1 rounded-[12px] border border-[#e3e7ee] bg-[#f7f8fa] p-1"
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
                    className={`relative rounded-[9px] px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                      active ? 'text-white' : 'text-[#4a5568] hover:text-[#070e1a]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="bw-team-filter-pill"
                        transition={reduce ? { duration: 0 } : SPRING_INSTITUTIONAL}
                        className="absolute inset-0 rounded-[9px] bg-[#070e1a]"
                      />
                    )}
                    <span className="relative z-10">{c}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((member, idx) => (
              <motion.article
                layout
                key={member.slug}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  layout: { type: 'spring', stiffness: 320, damping: 30 },
                  duration: 0.42,
                  delay: Math.min(idx * 0.04, 0.25),
                  ease: EASE_SWISS,
                }}
                className="group flex flex-col overflow-hidden rounded-[16px] border border-[#e3e7ee] bg-white transition duration-200 hover:-translate-y-1 hover:border-[#070e1a]/35 hover:shadow-[0_24px_50px_-28px_rgba(7,14,26,0.25)]"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#070e1a]">
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
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#070e1a]/94 via-[#070e1a]/35 to-transparent"
                  />
                  <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
                    <span className="rounded-[7px] border border-white/20 bg-[#070e1a]/75 px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[#fcf1b7] backdrop-blur-md">
                      {member.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => openMember(member)}
                      aria-label={`Inspect ${member.name} full profile`}
                      className="grid h-8 w-8 place-items-center rounded-[9px] border border-white/25 bg-[#070e1a]/70 text-white backdrop-blur-md transition hover:border-[#d7b158] hover:text-[#fcf1b7] cursor-pointer"
                    >
                      <Expand size={13} />
                    </button>
                  </div>
                  <div className="absolute inset-x-4 bottom-3.5">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-white">{member.name}</h3>
                    <p className="mt-0.5 text-xs font-medium text-[#fcf1b7]">{member.designation}</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0e6954]">
                    <Briefcase size={11} /> {member.department}
                  </p>
                  <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-[#4a5568]">{member.summary}</p>

                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#e3e7ee] pt-4">
                    <button
                      type="button"
                      onClick={() => openMember(member)}
                      className="text-xs font-semibold text-[#070e1a] underline decoration-[#d7b158] underline-offset-4 transition hover:text-[#0e6954] cursor-pointer"
                    >
                      Full profile
                    </button>
                    <Link
                      href={`/contact?advisor=${encodeURIComponent(member.name)}`}
                      className="inline-flex items-center gap-1 rounded-[8px] bg-[#070e1a] px-3 py-1.5 text-[11.5px] font-semibold text-white transition hover:bg-[#101c31]"
                    >
                      Consult <ArrowUpRight size={12} className="text-[#d7b158]" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Swiss Profile Modal */}
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
                className="fixed inset-0 z-[120] flex items-center justify-center bg-[#070e1a]/82 p-4 backdrop-blur-md"
                role="dialog"
                aria-modal="true"
                aria-label={`${selected.name} profile`}
              >
                <motion.div
                  initial={reduce ? false : { opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.97, y: 8 }}
                  transition={{ duration: 0.25, ease: EASE_SWISS }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative grid max-h-[90dvh] w-full max-w-4xl overflow-hidden rounded-[22px] border border-[#e3e7ee] bg-white shadow-2xl md:grid-cols-[0.95fr_1.05fr]"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(null);
                      setView8k(false);
                    }}
                    aria-label="Close profile"
                    className="absolute end-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-[10px] border border-[#e3e7ee] bg-white/95 text-[#070e1a] shadow-sm transition hover:border-[#070e1a] cursor-pointer"
                  >
                    <X size={17} />
                  </button>

                  <div className="relative aspect-[3/4] bg-[#070e1a] md:aspect-auto md:min-h-[540px]">
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
                    <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#070e1a]">
                      {selected.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#0e6954]">
                      {selected.designation} · <span lang="ar">{selected.nameAr}</span>
                    </p>

                    <p className="mt-5 text-[15px] leading-relaxed text-[#4a5568]">{selected.summary}</p>

                    <div className="mt-6 rounded-[14px] border border-[#e3e7ee] bg-[#f7f8fa] p-5">
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

                    <div className="mt-6 space-y-2 text-xs text-[#4a5568]">
                      <p>
                        <strong className="text-[#070e1a]">Office:</strong> Betterway Mortgages LLC · Al Nasr Plaza,
                        Oud Metha, Dubai, UAE
                      </p>
                      <p>
                        <strong className="text-[#070e1a]">Direct Email:</strong>{' '}
                        <a href={`mailto:${selected.email}`} className="font-semibold text-[#0e6954] underline">
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
                        Speak 1-on-1 with {selected.name.split(' ')[0]} <ArrowUpRight size={15} className="text-[#d7b158]" />
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
