'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Building2, CheckCircle2, MapPin, Send, ShieldCheck, X } from 'lucide-react';
import { COMMUNITIES } from '@/data/communities';
import { cashToClose, emi } from '@/lib/math';
import { minDownPaymentPct, type ResidencyKey } from '@/lib/journey';
import { SPRING_INSTITUTIONAL } from '@/components/ui/MotionPrimitives';

const aed = (n: number) => `AED ${Math.round(n).toLocaleString('en-US')}`;

type StockPref = 'all' | 'Villas & townhouses' | 'Apartments' | 'Mixed';

export default function PropertyMatchmakerModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [budget, setBudget] = useState(2_500_000);
  const [residency, setResidency] = useState<ResidencyKey>('resident');
  const [stock, setStock] = useState<StockPref>('all');
  const [step, setStep] = useState<'match' | 'contact' | 'done'>('match');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setStep('match');
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const downPct = minDownPaymentPct(residency, budget);
  const ctc = useMemo(() => cashToClose({ price: budget, downPct, agency: true }), [budget, downPct]);
  const monthly = useMemo(() => emi(ctc.loan, 4.19, 25), [ctc.loan]);

  const matchedAreas = useMemo(() => {
    const filtered = COMMUNITIES.filter((c) => {
      if (stock === 'all') return true;
      return c.stock === stock;
    });
    return filtered.slice(0, 4);
  }, [stock]);

  const submitBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/os/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          topic: 'Property & Mortgage Budget Matchmaker',
          residency,
          propertyValue: budget,
          notes: `Preferred stock: ${stock}. Matched areas: ${matchedAreas.map((a) => a.name).join(', ')}`,
          source: 'swiss-matchmaker-modal',
        }),
      });
    } catch {}
    setSubmitting(false);
    setStep('done');
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="bw-matchmaker-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#070e1a]/80 p-4 backdrop-blur-lg"
          role="dialog"
          aria-modal="true"
          aria-label="Dubai property and mortgage budget matchmaker"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.97, y: 8 }}
            transition={reduce ? { duration: 0 } : SPRING_INSTITUTIONAL}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90dvh] w-full max-w-[740px] overflow-y-auto rounded-[20px] border border-[#e3e7ee] bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#e3e7ee] pb-4">
              <div className="flex items-center gap-3">
                <img src="/brand/icon.png" alt="" width={34} height={34} className="h-8 w-8 object-contain" />
                <div>
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#0e6954]">
                    Betterway Property &amp; Budget Advisory
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#070e1a]">
                    {step === 'match'
                      ? 'Match your budget to Dubai areas & financing'
                      : step === 'contact'
                        ? 'Send your property & mortgage brief'
                        : 'Your brief is with our Dubai desk'}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close matchmaker"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-[#e3e7ee] bg-[#f7f8fa] text-[#070e1a] transition hover:border-[#070e1a] cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>

            {step === 'match' && (
              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <label htmlFor="mm-budget" className="text-sm font-semibold text-[#070e1a]">
                      Target property budget
                    </label>
                    <span className="num text-lg font-bold text-[#0e6954]">{aed(budget)}</span>
                  </div>
                  <input
                    id="mm-budget"
                    type="range"
                    min={750_000}
                    max={15_000_000}
                    step={50_000}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="holo-slider mt-3"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#4a5568]">
                      Residency tier
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(
                        [
                          ['resident', 'UAE Resident'],
                          ['national', 'UAE National'],
                          ['non-resident', 'Non-Resident'],
                        ] as const
                      ).map(([k, lbl]) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setResidency(k)}
                          className={`rounded-[9px] px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                            residency === k
                              ? 'bg-[#070e1a] text-white'
                              : 'border border-[#e3e7ee] bg-[#f7f8fa] text-[#4a5568] hover:text-[#070e1a]'
                          }`}
                        >
                          {lbl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#4a5568]">
                      Property style
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(
                        [
                          ['all', 'All'],
                          ['Villas & townhouses', 'Villas'],
                          ['Apartments', 'Apartments'],
                          ['Mixed', 'Master Communities'],
                        ] as const
                      ).map(([k, lbl]) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setStock(k)}
                          className={`rounded-[9px] px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                            stock === k
                              ? 'bg-[#070e1a] text-white'
                              : 'border border-[#e3e7ee] bg-[#f7f8fa] text-[#4a5568] hover:text-[#070e1a]'
                          }`}
                        >
                          {lbl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 rounded-[16px] bg-[#070e1a] p-4 text-white">
                  <div>
                    <p className="text-[11px] text-white/60">Est. monthly (4.19% · 25y)</p>
                    <p className="num mt-0.5 text-base font-bold sm:text-lg">{aed(monthly)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-white/60">Upfront incl. 4% DLD</p>
                    <p className="num mt-0.5 text-base font-bold text-[#34dfac] sm:text-lg">{aed(ctc.total)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-white/60">Max CBUAE LTV</p>
                    <p className="num mt-0.5 text-base font-bold text-[#fcf1b7] sm:text-lg">{100 - downPct}%</p>
                  </div>
                </div>

                <div>
                  <p className="mb-2.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#4a5568]">
                    Matching UAE Freehold Communities ({COMMUNITIES.length} mapped)
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {matchedAreas.map((area) => (
                      <Link
                        key={area.slug}
                        href={`/areas/${area.emirate}/${area.slug}`}
                        onClick={onClose}
                        className="group flex items-center justify-between rounded-[12px] border border-[#e3e7ee] bg-[#f7f8fa] px-4 py-3 transition hover:border-[#070e1a] hover:bg-white"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-display text-sm font-bold text-[#070e1a] group-hover:text-[#0e6954]">
                            <MapPin size={13} className="mr-1 inline -translate-y-px text-[#0e6954]" />
                            {area.name}
                          </p>
                          <p className="truncate text-xs text-[#4a5568]">{area.devs}</p>
                        </div>
                        <ArrowRight size={14} className="shrink-0 text-[#4a5568] transition group-hover:translate-x-0.5 group-hover:text-[#0e6954]" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <Link
                    href={`/get-started?residency=${residency}&price=${budget}&down=${downPct}&rate=4.19`}
                    onClick={onClose}
                    className="homy-btn homy-btn--outline"
                  >
                    <Building2 size={15} /> Check 50% DBR Eligibility
                  </Link>
                  <button type="button" onClick={() => setStep('contact')} className="homy-btn">
                    <span>Speak to a Property &amp; Mortgage Advisor</span>
                    <span className="homy-btn__disc" aria-hidden="true">
                      <span className="homy-btn__arrow-track">
                        <ArrowRight size={14} strokeWidth={2.2} />
                        <ArrowRight size={14} strokeWidth={2.2} />
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            )}

            {step === 'contact' && (
              <form onSubmit={submitBrief} className="mt-6 space-y-4">
                <div className="rounded-[12px] border border-[#0e6954]/20 bg-[#edf7f4] px-4 py-3 text-xs text-[#0a4a3e]">
                  Selected budget: <strong className="num">{aed(budget)}</strong> · {100 - downPct}% LTV · Est. Cash-to-Close{' '}
                  <strong className="num">{aed(ctc.total)}</strong>
                </div>
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <label className="block text-xs font-semibold text-[#070e1a]">
                    Full name
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="mt-1.5 w-full rounded-[10px] border border-[#d6dce6] px-3.5 py-2.5 text-sm font-normal focus:border-[#070e1a] focus:outline-none"
                    />
                  </label>
                  <label className="block text-xs font-semibold text-[#070e1a]">
                    Email address
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-1.5 w-full rounded-[10px] border border-[#d6dce6] px-3.5 py-2.5 text-sm font-normal focus:border-[#070e1a] focus:outline-none"
                    />
                  </label>
                </div>
                <label className="block text-xs font-semibold text-[#070e1a]">
                  UAE or international mobile (WhatsApp preferred)
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 000 0000"
                    className="mt-1.5 w-full rounded-[10px] border border-[#d6dce6] px-3.5 py-2.5 text-sm font-normal focus:border-[#070e1a] focus:outline-none"
                  />
                </label>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button type="button" onClick={() => setStep('match')} className="homy-btn homy-btn--outline">
                    Back to budget
                  </button>
                  <button type="submit" disabled={submitting} className="homy-btn">
                    <Send size={14} />
                    <span>{submitting ? 'Sending brief…' : 'Send to Betterway Desk'}</span>
                  </button>
                </div>
                <p className="flex items-center gap-1.5 text-[11.5px] text-[#4a5568]">
                  <ShieldCheck size={14} className="text-[#0e6954]" />
                  No obligation. Betterway is an independent mortgage adviser; bank lending decisions are issued in writing.
                </p>
              </form>
            )}

            {step === 'done' && (
              <div className="mt-6 rounded-[16px] border border-[#0e6954]/20 bg-[#edf7f4] p-6 text-center">
                <CheckCircle2 size={38} className="mx-auto text-[#0e6954]" />
                <h4 className="mt-3 font-display text-xl font-bold text-[#070e1a]">Brief received</h4>
                <p className="mx-auto mt-2 max-w-md text-sm text-[#4a5568]">
                  Our Oud Metha, Dubai advisory desk has logged your {aed(budget)} property &amp; mortgage parameters.
                  You can also inspect your full 50% DBR dossier right now.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <Link
                    href={`/get-started?residency=${residency}&price=${budget}&down=${downPct}&rate=4.19`}
                    onClick={onClose}
                    className="homy-btn"
                  >
                    <span>Open Full 60s Dossier</span>
                    <span className="homy-btn__disc" aria-hidden="true">
                      <ArrowRight size={14} strokeWidth={2.2} />
                    </span>
                  </Link>
                  <button type="button" onClick={onClose} className="homy-btn homy-btn--outline">
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
