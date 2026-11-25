'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  CreditCard,
  Globe2,
  Home,
  KeyRound,
  Landmark,
  Minus,
  Plus,
  RefreshCw,
  Send,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import { BANKS } from '@/data/banks';
import { waLink } from '@/data/site';
import {
  buildJourneyDossier,
  clearSavedJourney,
  DEFAULT_JOURNEY,
  loadSavedJourney,
  minDownPaymentPct,
  saveJourney,
  type GoalKey,
  type JourneyState,
  type PropertyStageKey,
  type ResidencyKey,
} from '@/lib/journey';
import { EASE_HOMY } from '@/components/ui/MotionPrimitives';

const aed = (n: number) => `AED ${Math.round(n).toLocaleString('en-US')}`;

const GOALS: { key: GoalKey; title: string; desc: string; icon: typeof Home }[] = [
  { key: 'new-mortgage', title: 'Get a new mortgage', desc: 'Finance a ready villa, townhouse, or apartment in the UAE', icon: Home },
  { key: 'refinance', title: 'Refinance my current mortgage', desc: 'Switch banks to reduce your post-fixed EIBOR revert rate', icon: RefreshCw },
  { key: 'equity-release', title: 'Release equity', desc: 'Unlock capital from a UAE property you already own', icon: Wallet },
  { key: 'off-plan', title: 'Off-plan handover finance', desc: 'Prepare valuation & completion funding ahead of developer handover', icon: KeyRound },
];

const RESIDENCIES: { key: ResidencyKey; title: string; desc: string; cap: string }[] = [
  { key: 'resident', title: 'UAE Expat Resident', desc: 'Salaried or self-employed living in the UAE', cap: 'Up to 80% LTV' },
  { key: 'national', title: 'UAE National', desc: 'Emirati citizen first or next home finance', cap: 'Up to 85% LTV' },
  { key: 'gcc', title: 'GCC National', desc: 'Citizen of Saudi Arabia, Kuwait, Qatar, Bahrain, or Oman', cap: 'Up to 75% LTV' },
  { key: 'non-resident', title: 'Non-Resident / Overseas Buyer', desc: 'Salaried or business income earned outside the UAE', cap: 'Typical 60% LTV' },
];

const STAGES: { key: PropertyStageKey; title: string; desc: string }[] = [
  { key: 'found-ready', title: 'Yes — I found a ready property', desc: 'Ready to verify DBR, valuation & Form F clauses' },
  { key: 'off-plan-handover', title: 'Yes — off-plan approaching handover', desc: 'Need developer balance & fresh valuation check' },
  { key: 'exploring', title: 'Not yet — confirming my budget first', desc: 'Get pre-approval clarity before viewing homes' },
  { key: 'existing-owner', title: 'I already own the property', desc: 'Looking to buyout, refinance, or release equity' },
];

export default function PreApprovalWizard() {
  const params = useSearchParams();
  const reduce = useReducedMotion();
  const [state, setState] = useState<JourneyState>(DEFAULT_JOURNEY);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Hydrate from URL params or saved localStorage journey
  useEffect(() => {
    const saved = loadSavedJourney();
    const qStep = params.get('q');
    const qRes = params.get('residency') as ResidencyKey | null;
    const qPrice = Number(params.get('price'));
    const qDown = Number(params.get('down'));
    const qYears = Number(params.get('years'));
    const qRate = Number(params.get('rate'));
    const qGoal = params.get('goal') as GoalKey | null;

    setState((prev) => {
      const base = saved ?? prev;
      const next: JourneyState = {
        ...base,
        ...(qGoal ? { goal: qGoal } : {}),
        ...(qRes && ['resident', 'national', 'gcc', 'non-resident'].includes(qRes) ? { residency: qRes } : {}),
        ...(Number.isFinite(qPrice) && qPrice >= 500_000 ? { propertyValue: qPrice } : {}),
        ...(Number.isFinite(qDown) && qDown >= 15 && qDown <= 80 ? { downPaymentPct: qDown } : {}),
        ...(Number.isFinite(qYears) && qYears >= 5 && qYears <= 25 ? { years: qYears } : {}),
        ...(Number.isFinite(qRate) && qRate >= 2 && qRate <= 9 ? { ratePct: qRate } : {}),
        ...(qStep !== null && Number.isFinite(Number(qStep))
          ? { step: Math.max(0, Math.min(5, Number(qStep))) }
          : qPrice >= 500_000
            ? { step: 4 }
            : {}),
      };
      return next;
    });
  }, [params]);

  const update = (patch: Partial<JourneyState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      saveJourney(next);
      return next;
    });
  };

  const dossier = useMemo(() => buildJourneyDossier(state), [state]);
  const progressPct = Math.round(((state.step + 1) / 6) * 100);

  const matchedBanks = useMemo(() => {
    return BANKS.filter((b) => {
      if (state.financePreference === 'islamic') return b.type === 'Islamic';
      if (state.financePreference === 'conventional') return b.type === 'Conventional';
      return true;
    }).slice(0, 6);
  }, [state.financePreference]);

  const submitDossier = async (e: React.FormEvent) => {
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
          topic: `Pre-Approval Dossier (${state.goal ?? 'new-mortgage'})`,
          residency: state.residency,
          propertyValue: state.propertyValue,
          notes: `Down ${dossier.effectiveDownPct}%, Loan ${aed(dossier.loan)}, Income ${aed(state.monthlyIncome)}, Stressed DBR ${dossier.dbrPct.toFixed(1)}%, Pref ${state.financePreference}`,
          source: 'betterway-6step-wizard',
        }),
      });
    } catch {}
    setSubmitting(false);
    setSubmitted(true);
    clearSavedJourney();
  };

  return (
    <div className="min-h-[calc(100svh-98px)] bg-white pt-[98px] max-sm:pt-[82px]">
      {/* Exact UseHolo Top Progress Rail (Emerald-to-Obsidian) */}
      <div className="sticky top-[98px] z-30 h-1.5 w-full bg-[#eef0f3] max-sm:top-[82px]">
        <motion.div
          className="h-full bg-gradient-to-r from-[#121217] via-[#179373] to-[#d7b158]"
          initial={false}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: reduce ? 0 : 0.35, ease: EASE_HOMY }}
        />
      </div>

      <div className="wrap py-10 sm:py-16">
        <div className={`mx-auto ${state.step === 5 ? 'max-w-[1040px]' : 'max-w-[640px]'}`}>
          {/* Step Counter + Back Navigation */}
          <div className="mb-6 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-[#6c6c89]">
            {state.step > 0 ? (
              <button
                type="button"
                onClick={() => update({ step: Math.max(0, state.step - 1) })}
                className="inline-flex items-center gap-1.5 text-[#121217] transition hover:text-[#0e6954] cursor-pointer"
              >
                <ArrowLeft size={14} /> Back
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[#0e6954]">
                <ShieldCheck size={14} /> Free 60-Second Eligibility Check
              </span>
            )}
            <span className="num">Step {state.step + 1} of 6 · {progressPct}%</span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {/* STEP 0: Goal (Auto-Advances on Click — Exact Holo UX) */}
            {state.step === 0 && (
              <motion.div
                key="step-0"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: EASE_HOMY }}
                className="space-y-4"
              >
                <h1 className="font-display text-center text-3xl font-extrabold tracking-tight text-[#121217] sm:text-5xl">
                  How can we help you?
                </h1>
                <p className="text-center text-[15px] text-[#6c6c89]">
                  Select your goal below to build a custom CBUAE &amp; 24-bank mortgage dossier.
                </p>

                <div className="space-y-3 pt-4">
                  {GOALS.map((g) => {
                    const selected = state.goal === g.key;
                    const Icon = g.icon;
                    return (
                      <button
                        key={g.key}
                        type="button"
                        onClick={() => update({ goal: g.key, step: 1 })}
                        className={`group flex w-full items-center justify-between gap-4 rounded-[18px] border p-5 text-left transition cursor-pointer ${
                          selected
                            ? 'border-[#179373] bg-[#eef7f4] shadow-sm'
                            : 'border-[#e5e7eb] bg-white hover:border-[#121217] hover:bg-[#fafafa]'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] bg-[#f5f6f8] text-[#121217] transition group-hover:bg-[#121217] group-hover:text-white">
                            <Icon size={20} />
                          </span>
                          <div>
                            <p className="font-display text-base font-bold text-[#121217]">{g.title}</p>
                            <p className="mt-0.5 text-sm text-[#6c6c89]">{g.desc}</p>
                          </div>
                        </div>
                        <span
                          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${
                            selected ? 'border-[#179373] bg-[#179373] text-white' : 'border-[#d1d5db]'
                          }`}
                        >
                          {selected && <span className="h-2 w-2 rounded-full bg-white" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 1: Residency Profile (Auto-Advances & Auto-Sets CBUAE LTV) */}
            {state.step === 1 && (
              <motion.div
                key="step-1"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: EASE_HOMY }}
                className="space-y-4"
              >
                <h1 className="font-display text-center text-3xl font-extrabold tracking-tight text-[#121217] sm:text-5xl">
                  What is your residency status?
                </h1>
                <p className="text-center text-[15px] text-[#6c6c89]">
                  Central Bank of the UAE (CBUAE) rules set your maximum loan-to-value by residency.
                </p>

                <div className="space-y-3 pt-4">
                  {RESIDENCIES.map((r) => {
                    const selected = state.residency === r.key;
                    return (
                      <button
                        key={r.key}
                        type="button"
                        onClick={() =>
                          update({
                            residency: r.key,
                            downPaymentPct: minDownPaymentPct(r.key, state.propertyValue),
                            step: 2,
                          })
                        }
                        className={`group flex w-full items-center justify-between gap-4 rounded-[18px] border p-5 text-left transition cursor-pointer ${
                          selected
                            ? 'border-[#179373] bg-[#eef7f4]'
                            : 'border-[#e5e7eb] bg-white hover:border-[#121217] hover:bg-[#fafafa]'
                        }`}
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-display text-base font-bold text-[#121217]">{r.title}</p>
                            <span className="rounded-full bg-[#eef7f4] px-2.5 py-0.5 text-[11px] font-bold text-[#0e6954]">
                              {r.cap}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-[#6c6c89]">{r.desc}</p>
                        </div>
                        <ArrowRight size={18} className="shrink-0 text-[#6c6c89] transition group-hover:translate-x-1 group-hover:text-[#121217]" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Property Stage (Auto-Advances) */}
            {state.step === 2 && (
              <motion.div
                key="step-2"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: EASE_HOMY }}
                className="space-y-4"
              >
                <h1 className="font-display text-center text-3xl font-extrabold tracking-tight text-[#121217] sm:text-5xl">
                  Have you found a property yet?
                </h1>
                <p className="text-center text-[15px] text-[#6c6c89]">
                  This determines whether we model 4% DLD transfer fees or off-plan handover fees.
                </p>

                <div className="space-y-3 pt-4">
                  {STAGES.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => update({ stage: s.key, step: 3 })}
                      className={`group flex w-full items-center justify-between gap-4 rounded-[18px] border p-5 text-left transition cursor-pointer ${
                        state.stage === s.key
                          ? 'border-[#179373] bg-[#eef7f4]'
                          : 'border-[#e5e7eb] bg-white hover:border-[#121217] hover:bg-[#fafafa]'
                      }`}
                    >
                      <div>
                        <p className="font-display text-base font-bold text-[#121217]">{s.title}</p>
                        <p className="mt-0.5 text-sm text-[#6c6c89]">{s.desc}</p>
                      </div>
                      <ArrowRight size={18} className="shrink-0 text-[#6c6c89] transition group-hover:translate-x-1 group-hover:text-[#121217]" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Property Budget & Down Payment */}
            {state.step === 3 && (
              <motion.div
                key="step-3"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: EASE_HOMY }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#121217] sm:text-5xl">
                    Set your target budget
                  </h1>
                  <p className="mt-2 text-[15px] text-[#6c6c89]">
                    We automatically calculate itemised DLD, trustee &amp; mortgage registration fees.
                  </p>
                </div>

                <div className="space-y-6 rounded-[24px] border border-[#e5e7eb] bg-[#fafafa] p-6 sm:p-8">
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <label htmlFor="wiz-price" className="text-sm font-semibold text-[#121217]">
                        Property value
                      </label>
                      <span className="num text-xl font-extrabold text-[#121217]">{aed(state.propertyValue)}</span>
                    </div>
                    <input
                      id="wiz-price"
                      type="range"
                      min={500_000}
                      max={15_000_000}
                      step={50_000}
                      value={Math.min(15_000_000, state.propertyValue)}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        const floor = minDownPaymentPct(state.residency, val);
                        update({
                          propertyValue: val,
                          downPaymentPct: Math.max(floor, state.downPaymentPct),
                        });
                      }}
                      className="holo-slider mt-3"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e7eb] pt-5">
                    <div>
                      <p className="text-sm font-semibold text-[#121217]">Down payment ({dossier.effectiveDownPct}%)</p>
                      <p className="text-xs text-[#6c6c89]">Min CBUAE requirement: {dossier.minDownPct}%</p>
                    </div>
                    <div className="holo-stepper">
                      <button
                        type="button"
                        onClick={() => update({ downPaymentPct: Math.max(dossier.minDownPct, dossier.effectiveDownPct - 5) })}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="num min-w-[120px] text-center text-sm font-bold text-[#121217]">
                        {aed(dossier.downPayment)}
                      </span>
                      <button
                        type="button"
                        onClick={() => update({ downPaymentPct: Math.min(80, dossier.effectiveDownPct + 5) })}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 rounded-[16px] bg-white p-4 border border-[#e5e7eb]">
                    <div>
                      <p className="text-xs text-[#6c6c89]">Mortgage loan ({100 - dossier.effectiveDownPct}% LTV)</p>
                      <p className="num mt-0.5 text-lg font-extrabold text-[#121217]">{aed(dossier.loan)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6c6c89]">Upfront cash incl. DLD</p>
                      <p className="num mt-0.5 text-lg font-extrabold text-[#0e6954]">{aed(dossier.totalCashToClose)}</p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#6c6c89]">Preferred financing structure</p>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          ['either', 'Compare All (24)'],
                          ['conventional', 'Conventional'],
                          ['islamic', 'Islamic / Sharia'],
                        ] as const
                      ).map(([k, lbl]) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => update({ financePreference: k })}
                          className={`rounded-[12px] border py-2.5 text-xs font-semibold transition cursor-pointer ${
                            state.financePreference === k
                              ? 'border-[#121217] bg-[#121217] text-white'
                              : 'border-[#e5e7eb] bg-white text-[#4b5b63] hover:border-[#121217]'
                          }`}
                        >
                          {lbl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => update({ step: 4 })}
                    className="homy-btn w-full justify-between !h-14 !rounded-[14px]"
                  >
                    <span>Continue to 50% DBR Income Check</span>
                    <span className="homy-btn__disc" aria-hidden="true">
                      <span className="homy-btn__arrow-track">
                        <ArrowRight size={14} strokeWidth={2.2} />
                        <ArrowRight size={14} strokeWidth={2.2} />
                      </span>
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Income, Existing EMIs & Credit Card Limits (Live CBUAE 50% DBR Gauge — Beats Holo!) */}
            {state.step === 4 && (
              <motion.div
                key="step-4"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: EASE_HOMY }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#121217] sm:text-5xl">
                    Check your 50% DBR headroom
                  </h1>
                  <p className="mt-2 text-[15px] text-[#6c6c89]">
                    UAE banks count 5% of total credit card limits towards your 50% CBUAE debt cap — even if paid in full every month.
                  </p>
                </div>

                <div className="space-y-5 rounded-[24px] border border-[#e5e7eb] bg-[#fafafa] p-6 sm:p-8">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <label htmlFor="wiz-income" className="text-sm font-semibold text-[#121217]">
                        Gross monthly income
                      </label>
                      <span className="num text-lg font-extrabold text-[#121217]">{aed(state.monthlyIncome)}/mo</span>
                    </div>
                    <input
                      id="wiz-income"
                      type="range"
                      min={10_000}
                      max={200_000}
                      step={2_500}
                      value={state.monthlyIncome}
                      onChange={(e) => update({ monthlyIncome: Number(e.target.value) })}
                      className="holo-slider mt-3"
                    />
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between">
                      <label htmlFor="wiz-emis" className="text-sm font-semibold text-[#121217]">
                        Existing monthly loan instalments (auto / personal)
                      </label>
                      <span className="num text-base font-bold text-[#121217]">{aed(state.existingEmis)}/mo</span>
                    </div>
                    <input
                      id="wiz-emis"
                      type="range"
                      min={0}
                      max={50_000}
                      step={500}
                      value={state.existingEmis}
                      onChange={(e) => update({ existingEmis: Number(e.target.value) })}
                      className="holo-slider mt-3"
                    />
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between">
                      <label htmlFor="wiz-cards" className="flex items-center gap-1.5 text-sm font-semibold text-[#121217]">
                        <CreditCard size={15} className="text-[#179373]" />
                        Total combined credit card limits
                      </label>
                      <span className="num text-base font-bold text-[#121217]">{aed(state.cardLimits)}</span>
                    </div>
                    <input
                      id="wiz-cards"
                      type="range"
                      min={0}
                      max={300_000}
                      step={5_000}
                      value={state.cardLimits}
                      onChange={(e) => update({ cardLimits: Number(e.target.value) })}
                      className="holo-slider mt-3"
                    />
                    <p className="mt-1.5 text-xs text-[#6c6c89]">
                      Assessed monthly DBR impact (5% rule): <strong className="num text-[#121217]">{aed(dossier.dbrCardImpact)}/mo</strong>
                    </p>
                  </div>

                  {/* Live CBUAE Stressed DBR Status Meter */}
                  <div className="rounded-[18px] bg-[#0b1117] p-5 text-white">
                    <div className="flex items-center justify-between text-xs">
                      <span className="uppercase tracking-wider text-white/65">Stressed CBUAE DBR Utilization</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-bold ${
                          dossier.dbrStatus === 'strong'
                            ? 'bg-[#179373]/25 text-[#34dfac]'
                            : dossier.dbrStatus === 'tight'
                              ? 'bg-[#d7b158]/25 text-[#f1d57e]'
                              : 'bg-red-500/25 text-red-300'
                        }`}
                      >
                        {dossier.dbrStatus === 'strong'
                          ? 'Strong Eligibility'
                          : dossier.dbrStatus === 'tight'
                            ? 'Within 50% Cap (Tight)'
                            : 'Above 50% CBUAE Cap'}
                      </span>
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="num text-3xl font-extrabold">{dossier.dbrPct.toFixed(1)}%</span>
                      <span className="text-xs text-white/70">
                        Max eligible loan: <strong className="num text-white">{aed(dossier.maxBorrowingPower)}</strong>
                      </span>
                    </div>
                    <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/15">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          dossier.dbrStatus === 'strong'
                            ? 'bg-[#34dfac]'
                            : dossier.dbrStatus === 'tight'
                              ? 'bg-[#d7b158]'
                              : 'bg-red-400'
                        }`}
                        style={{ width: `${Math.min(100, dossier.dbrPct)}%` }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => update({ step: 5 })}
                    className="homy-btn w-full justify-between !h-14 !rounded-[14px]"
                  >
                    <span>Generate My Personalised Betterway Dossier</span>
                    <span className="homy-btn__disc" aria-hidden="true">
                      <span className="homy-btn__arrow-track">
                        <ArrowRight size={14} strokeWidth={2.2} />
                        <ArrowRight size={14} strokeWidth={2.2} />
                      </span>
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Full Instant Private-Banker Dossier + Optional Submission */}
            {state.step === 5 && (
              <motion.div
                key="step-5"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE_HOMY }}
                className="space-y-8"
              >
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#eef0f3] pb-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0e6954]">
                      <CheckCircle2 size={13} /> Personalised Betterway Readiness Dossier
                    </span>
                    <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#121217] sm:text-4xl">
                      Your UAE Mortgage Blueprint
                    </h1>
                  </div>
                  <button
                    type="button"
                    onClick={() => update({ step: 3 })}
                    className="homy-btn homy-btn--outline !h-10 !text-xs"
                  >
                    Adjust numbers
                  </button>
                </div>

                {/* Top 4 Key Numbers */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-[20px] bg-[#0b1117] p-5 text-white">
                    <p className="text-xs text-white/65">Est. Monthly Payment</p>
                    <p className="num mt-1.5 text-2xl font-extrabold">{aed(dossier.monthlyPayment)}</p>
                    <p className="mt-1 text-[11px] text-[#34dfac]">{state.ratePct.toFixed(2)}% p.a. · {state.years} yrs</p>
                  </div>
                  <div className="rounded-[20px] border border-[#e5e7eb] bg-[#f8f9fa] p-5">
                    <p className="text-xs text-[#6c6c89]">Mortgage Loan ({100 - dossier.effectiveDownPct}% LTV)</p>
                    <p className="num mt-1.5 text-2xl font-extrabold text-[#121217]">{aed(dossier.loan)}</p>
                    <p className="mt-1 text-[11px] text-[#4b5b63]">Max DBR loan: {aed(dossier.maxBorrowingPower)}</p>
                  </div>
                  <div className="rounded-[20px] border border-[#e5e7eb] bg-[#f8f9fa] p-5">
                    <p className="text-xs text-[#6c6c89]">Total Upfront Cash (incl. DLD)</p>
                    <p className="num mt-1.5 text-2xl font-extrabold text-[#0e6954]">{aed(dossier.totalCashToClose)}</p>
                    <p className="mt-1 text-[11px] text-[#4b5b63]">Down + {aed(dossier.totalFees)} fees</p>
                  </div>
                  <div className="rounded-[20px] border border-[#e5e7eb] bg-[#f8f9fa] p-5">
                    <p className="text-xs text-[#6c6c89]">Stressed CBUAE DBR</p>
                    <p className="num mt-1.5 text-2xl font-extrabold text-[#121217]">{dossier.dbrPct.toFixed(1)}%</p>
                    <p className="mt-1 text-[11px] text-[#0e6954]">
                      {dossier.goldenVisaEligible ? '✓ Meets AED 2M Golden Visa' : `AED ${(dossier.goldenVisaGap / 1000).toFixed(0)}k below Golden Visa`}
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                  {/* Left: Itemised Closing Costs + Eligible UAE Lenders */}
                  <div className="space-y-6">
                    <div className="rounded-[22px] border border-[#e5e7eb] bg-white p-6">
                      <h2 className="font-display text-lg font-bold text-[#121217]">Itemised Dubai Closing Sheet</h2>
                      <dl className="mt-4 divide-y divide-[#eef0f3] text-sm">
                        {[
                          [`Down payment (${dossier.effectiveDownPct}%)`, dossier.downPayment],
                          ['DLD transfer (4%) + Title Deed', dossier.dldFee],
                          ['DLD mortgage registration (0.25% + 290)', dossier.mortgageReg],
                          ['Trustee office + Bank valuation allowance', dossier.trusteeFee + dossier.valuationFee],
                          ['Agency commission (2% + 5% VAT)', dossier.agencyFee],
                        ].map(([lbl, val]) => (
                          <div key={lbl as string} className="flex justify-between py-2.5">
                            <dt className="text-[#4b5b63]">{lbl as string}</dt>
                            <dd className="num font-semibold text-[#121217]">{aed(val as number)}</dd>
                          </div>
                        ))}
                        <div className="flex justify-between pt-3 text-base font-extrabold text-[#0e6954]">
                          <dt>Total Estimated Cash to Close</dt>
                          <dd className="num">{aed(dossier.totalCashToClose)}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="rounded-[22px] border border-[#e5e7eb] bg-white p-6">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="font-display text-lg font-bold text-[#121217]">
                          <Landmark size={18} className="mr-1.5 inline -translate-y-0.5 text-[#179373]" />
                          UAE Lenders in Panel ({matchedBanks.length} previewed of {BANKS.length})
                        </h2>
                        <Link href="/rates" className="text-xs font-semibold text-[#0e6954] hover:underline">
                          See all 24 →
                        </Link>
                      </div>
                      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                        {matchedBanks.map((b) => (
                          <Link
                            key={b.key}
                            href={`/rates/${b.slug}`}
                            className="flex items-center gap-3 rounded-[14px] border border-[#eef0f3] bg-[#f8f9fa] p-3 transition hover:border-[#179373] hover:bg-white"
                          >
                            <span className="grid h-10 w-16 shrink-0 place-items-center rounded-[10px] bg-white p-1.5 border border-[#eef0f3]">
                              <img src={b.logo} alt={b.name} className="max-h-7 max-w-full object-contain" />
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-xs font-bold text-[#121217]">{b.name}</p>
                              <p className="text-[11px] text-[#6c6c89]">{b.type} · {b.hq}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Send Dossier to Oud Metha Underwriting Desk */}
                  <div className="rounded-[24px] bg-[#eef7f4] p-6 sm:p-7">
                    {!submitted ? (
                      <form onSubmit={submitDossier} className="space-y-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0e6954]">
                          <Building2 size={13} /> Betterway OS Underwriting Desk
                        </span>
                        <h2 className="font-display text-2xl font-bold text-[#121217]">
                          Request written bank offer comparisons
                        </h2>
                        <p className="text-sm leading-relaxed text-[#4b5b63]">
                          Share your dossier with our Oud Metha, Dubai specialists to review written fixed rates, post-fixed EIBOR revert margins, and lender fee waivers.
                        </p>
                        <label className="block text-xs font-semibold text-[#121217]">
                          Full name
                          <input
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            className="mt-1.5 w-full rounded-[12px] border border-[#dce0e5] bg-white px-3.5 py-2.5 text-sm font-normal focus:border-[#121217] focus:outline-none"
                          />
                        </label>
                        <label className="block text-xs font-semibold text-[#121217]">
                          Email address
                          <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="mt-1.5 w-full rounded-[12px] border border-[#dce0e5] bg-white px-3.5 py-2.5 text-sm font-normal focus:border-[#121217] focus:outline-none"
                          />
                        </label>
                        <label className="block text-xs font-semibold text-[#121217]">
                          Mobile / WhatsApp
                          <input
                            required
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+971 50 000 0000"
                            className="mt-1.5 w-full rounded-[12px] border border-[#dce0e5] bg-white px-3.5 py-2.5 text-sm font-normal focus:border-[#121217] focus:outline-none"
                          />
                        </label>
                        <button type="submit" disabled={submitting} className="homy-btn w-full justify-between !h-13">
                          <span>{submitting ? 'Sending dossier…' : 'Send Dossier to Specialist'}</span>
                          <span className="homy-btn__disc" aria-hidden="true">
                            <span className="homy-btn__arrow-track">
                              <Send size={13} />
                              <Send size={13} />
                            </span>
                          </span>
                        </button>
                        <a
                          href={waLink(`Hi Betterway, I completed my mortgage dossier (${aed(state.propertyValue)}, ${100 - dossier.effectiveDownPct}% LTV, ${state.residency}).`)}
                          rel="noopener"
                          className="homy-btn homy-btn--outline w-full !h-11 !text-xs"
                        >
                          <Globe2 size={14} /> Or email/message an advisor directly
                        </a>
                        <p className="text-[11px] leading-relaxed text-[#4b5b63]">
                          Illustrative planning readout only — not a binding bank offer or credit approval. Lending decisions rest solely with the licensed UAE financial institution.
                        </p>
                      </form>
                    ) : (
                      <div className="py-6 text-center">
                        <CheckCircle2 size={46} className="mx-auto text-[#0e6954]" />
                        <h3 className="mt-4 font-display text-2xl font-bold text-[#121217]">Dossier sent</h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#4b5b63]">
                          Your personalised UAE mortgage blueprint has been routed to Betterway Mortgages LLC in Oud Metha, Dubai.
                        </p>
                        <div className="mt-6 flex flex-col gap-2.5">
                          <Link href="/tools/form-f-clause-generator" className="homy-btn w-full justify-between">
                            <span>Prepare Form F Mortgage Clauses</span>
                            <span className="homy-btn__disc" aria-hidden="true">
                              <span className="homy-btn__arrow-track">
                                <ArrowRight size={14} />
                                <ArrowRight size={14} />
                              </span>
                            </span>
                          </Link>
                          <Link href="/" className="homy-btn homy-btn--outline w-full">
                            Return to Homepage
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
