'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Award, CreditCard, Gauge, ShieldCheck, Sparkles, Wallet } from 'lucide-react';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { BANKS } from '@/data/banks';
import { principalFromEmi } from '@/lib/math';

/**
 * 21st.dev Interactive UAE Mortgage Readiness & CBUAE 50% DBR Simulator.
 * Replaces the Team section on the Home Page with immediate, high-impact utility:
 * shows how unused credit card limits (assessed at 5%/mo under CBUAE rules) shift real borrowing power,
 * displays an animated semicircular DBR gauge, Golden Visa AED 2M badge, and live multi-currency output.
 */
export default function InteractiveReadinessStudio() {
  const { currency, formatMoney, formatCompact } = useLocaleCurrency();
  const reduce = useReducedMotion();

  const [incomeAed, setIncomeAed] = useState(35_000);
  const [cardLimitsAed, setCardLimitsAed] = useState(60_000);
  const [existingEmiAed, setExistingEmiAed] = useState(2_000);

  const metrics = useMemo(() => {
    const maxMonthlyDebt = incomeAed * 0.5; // CBUAE statutory 50% DBR cap
    const cardCommitment = cardLimitsAed * 0.05; // 5% monthly CBUAE credit card limit rule
    const usedMonthly = cardCommitment + existingEmiAed;
    const usedDbrPct = incomeAed > 0 ? Math.min(100, (usedMonthly / incomeAed) * 100) : 0;
    const remainingMonthlyForMortgage = Math.max(0, maxMonthlyDebt - usedMonthly);

    // Indicative stressed principal over 25 years at 5.75% stress rate (CBUAE buffer check)
    const maxLoanAed = principalFromEmi(remainingMonthlyForMortgage, 5.75, 25);
    const maxPropertyAt80Ltv = maxLoanAed / 0.8;
    const lostPowerFromCards = principalFromEmi(cardCommitment, 5.75, 25);
    const goldenVisaReady = maxPropertyAt80Ltv >= 2_000_000;

    return {
      maxMonthlyDebt,
      cardCommitment,
      usedMonthly,
      usedDbrPct,
      remainingMonthlyForMortgage,
      maxLoanAed,
      maxPropertyAt80Ltv,
      lostPowerFromCards,
      goldenVisaReady,
    };
  }, [incomeAed, cardLimitsAed, existingEmiAed]);

  // SVG semicircular arc progress (0..50% statutory cap)
  const arcLen = 251.2;
  const fillRatio = Math.min(1, metrics.usedDbrPct / 50);
  const dashOffset = arcLen * (1 - fillRatio);

  return (
    <section className="holo-section" aria-labelledby="readiness-studio-title">
      <div className="mx-auto max-w-[1220px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="homy-tag">
              <span className="homy-tag__ring" aria-hidden="true" />
              <span>Interactive CBUAE 50% DBR Studio</span>
            </span>
            <h2 id="readiness-studio-title" className="holo-display-h3">
              See how your income &amp; card limits shape real UAE borrowing power
            </h2>
            <p className="holo-lead">
              UAE banks count 5% of every active credit card limit as a monthly liability—even if paid in full. Test
              your headroom live before applying.
            </p>
          </div>
          <Link href="/calculators/dbr-borrowing-power" className="homy-btn homy-btn--outline bw-btn--sm">
            Open Full DBR Calculator
          </Link>
        </div>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          {/* Left: Interactive Sliders Console */}
          <div className="bw-beam-box flex flex-col justify-between p-7 sm:p-8">
            <div className="space-y-6">
              {/* Slider 1: Monthly Income */}
              <div>
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="studio-income" className="inline-flex items-center gap-2 text-sm font-bold text-[#070d19]">
                    <Wallet size={15} className="text-[#0e6954]" />
                    Monthly Gross Income
                  </label>
                  <span className="num rounded-full bg-[#eef7f4] px-3 py-1 text-sm font-extrabold text-[#0a4a3e]">
                    {formatMoney(incomeAed)}
                  </span>
                </div>
                <input
                  id="studio-income"
                  type="range"
                  min={15_000}
                  max={180_000}
                  step={2_500}
                  value={incomeAed}
                  onChange={(e) => setIncomeAed(Number(e.target.value))}
                  className="holo-slider mt-3"
                />
                <div className="mt-1.5 flex justify-between text-[11px] font-medium text-[#64748b]">
                  <span>{formatCompact(15_000)}/mo</span>
                  <span>CBUAE 50% cap: {formatMoney(metrics.maxMonthlyDebt)}/mo</span>
                  <span>{formatCompact(180_000)}/mo</span>
                </div>
              </div>

              {/* Slider 2: Total Credit Card Limits */}
              <div className="border-t border-[#eef0f3] pt-5">
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="studio-cards" className="inline-flex items-center gap-2 text-sm font-bold text-[#070d19]">
                    <CreditCard size={15} className="text-[#b45309]" />
                    Total Credit Card Limits (All Banks)
                  </label>
                  <span className="num rounded-full bg-[#fef3c7] px-3 py-1 text-sm font-extrabold text-[#92400e]">
                    {formatMoney(cardLimitsAed)}
                  </span>
                </div>
                <input
                  id="studio-cards"
                  type="range"
                  min={0}
                  max={300_000}
                  step={5_000}
                  value={cardLimitsAed}
                  onChange={(e) => setCardLimitsAed(Number(e.target.value))}
                  className="holo-slider mt-3"
                />
                <div className="mt-1.5 flex justify-between text-[11px] font-medium text-[#64748b]">
                  <span>5% CBUAE monthly deduction: {formatMoney(metrics.cardCommitment)}/mo</span>
                  <span className="font-semibold text-[#92400e]">
                    Reduces loan by ~{formatCompact(metrics.lostPowerFromCards)}
                  </span>
                </div>
              </div>

              {/* Slider 3: Auto / Personal Loans */}
              <div className="border-t border-[#eef0f3] pt-5">
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="studio-emi" className="inline-flex items-center gap-2 text-sm font-bold text-[#070d19]">
                    <Gauge size={15} className="text-[#334155]" />
                    Existing Auto / Personal Loan EMIs
                  </label>
                  <span className="num rounded-full bg-[#f1f5f9] px-3 py-1 text-sm font-extrabold text-[#070d19]">
                    {formatMoney(existingEmiAed)}
                  </span>
                </div>
                <input
                  id="studio-emi"
                  type="range"
                  min={0}
                  max={25_000}
                  step={500}
                  value={existingEmiAed}
                  onChange={(e) => setExistingEmiAed(Number(e.target.value))}
                  className="holo-slider mt-3"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[16px] border border-[#dce7e2] bg-[#eef7f4] px-4 py-3 text-xs text-[#0a4a3e]">
              <span className="inline-flex items-center gap-2 font-semibold">
                <Sparkles size={14} className="shrink-0 text-[#0e6954]" />
                Tip: Trimming unused card limits before applying unlocks instant loan capacity.
              </span>
            </div>
          </div>

          {/* Right: Live Corporate Obsidian Gauge & Borrowing Power Output */}
          <div className="bw-fintech-stage !min-h-0 !rounded-[26px] !p-7 sm:!p-8">
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                <ShieldCheck size={14} className="text-[#f1d57e]" />
                Live CBUAE Stressed Headroom
              </span>
              <span className="num rounded-full border border-[#f1d57e]/35 bg-white/10 px-3 py-1 text-[11px] font-bold text-[#f1d57e]">
                {currency} · {BANKS.length} UAE Banks
              </span>
            </div>

            {/* Animated Semicircular DBR Gauge */}
            <div className="relative z-10 my-5 flex flex-col items-center">
              <svg viewBox="0 0 200 112" className="h-[136px] w-[240px]" aria-hidden="true">
                <defs>
                  <linearGradient id="dbr-gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="55%" stopColor="#f1d57e" />
                    <stop offset="100%" stopColor="#d49b22" />
                  </linearGradient>
                </defs>
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <motion.path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="url(#dbr-gauge-grad)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={arcLen}
                  animate={{ strokeDashoffset: dashOffset }}
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 24 }}
                />
              </svg>
              <div className="-mt-14 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">
                  Existing Liabilities Used
                </p>
                <p className="num font-display text-3xl font-extrabold text-white">
                  {metrics.usedDbrPct.toFixed(1)}%{' '}
                  <span className="text-sm font-semibold text-white/55">/ 50%</span>
                </p>
              </div>
            </div>

            {/* Live Borrowing Power Metrics */}
            <div className="relative z-10 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[16px] border border-white/15 bg-white/[0.05] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                  Est. Max Mortgage (Stressed)
                </p>
                <p className="num mt-1 font-display text-2xl font-extrabold text-white">
                  {formatMoney(metrics.maxLoanAed)}
                </p>
                <p className="mt-1 text-[11px] text-white/60">
                  Monthly room: {formatMoney(metrics.remainingMonthlyForMortgage)}/mo
                </p>
              </div>

              <div className="rounded-[16px] border border-white/15 bg-white/[0.05] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                  Target Property (at 80% LTV)
                </p>
                <p className="num mt-1 font-display text-2xl font-extrabold text-[#f1d57e]">
                  {formatMoney(metrics.maxPropertyAt80Ltv)}
                </p>
                <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-white/80">
                  <Award size={12} className="text-[#f1d57e]" />
                  {metrics.goldenVisaReady ? 'Meets AED 2M Golden Visa threshold' : 'Below AED 2M Golden Visa mark'}
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/12 pt-5">
              <Link href="/get-started" className="homy-btn homy-btn--white flex-1 justify-between">
                <span>Lock In Written 24-Bank Pre-Approval</span>
                <span className="homy-btn__disc" aria-hidden="true">
                  <span className="homy-btn__arrow-track">
                    <ArrowRight size={14} strokeWidth={2.2} />
                    <ArrowRight size={14} strokeWidth={2.2} />
                  </span>
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-[46px] items-center justify-center rounded-[12px] border border-white/25 px-4 text-xs font-bold text-white transition hover:border-[#ffe074] hover:text-[#ffe074]"
              >
                Speak 1-on-1
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
