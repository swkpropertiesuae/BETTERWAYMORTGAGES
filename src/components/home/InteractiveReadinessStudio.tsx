'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Award, CreditCard, Gauge, ShieldCheck, Sparkles, Wallet } from 'lucide-react';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { principalFromEmi } from '@/lib/math';

/**
 * Band 5 Part A: Interactive CBUAE 50% DBR & Credit-Card 5% Rule Studio.
 * Preserves exact existing formula (principalFromEmi(..., 5.75, 25)) while elevating visuals
 * onto the Midnight Navy (#070E1A / #0C1524) executive band with dynamic DBR gauge thresholds.
 */
export default function InteractiveReadinessStudio() {
  const { currency, formatMoney, formatCompact, ext } = useLocaleCurrency();
  const reduce = useReducedMotion();
  const r = ext.readiness;

  const [incomeAed, setIncomeAed] = useState(35_000);
  const [cardLimitsAed, setCardLimitsAed] = useState(60_000);
  const [existingEmiAed, setExistingEmiAed] = useState(2_000);

  const metrics = useMemo(() => {
    const maxMonthlyDebt = incomeAed * 0.5;
    const cardCommitment = cardLimitsAed * 0.05;
    const usedMonthly = cardCommitment + existingEmiAed;
    const usedDbrPct = incomeAed > 0 ? Math.min(100, (usedMonthly / incomeAed) * 100) : 0;
    const remainingMonthlyForMortgage = Math.max(0, maxMonthlyDebt - usedMonthly);

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

  const arcLen = 251.2;
  const fillRatio = Math.min(1, metrics.usedDbrPct / 50);
  const dashOffset = arcLen * (1 - fillRatio);

  // Dynamic gauge stroke aligned to existing-debt DBR vs 50% CBUAE ceiling
  const gaugeStroke =
    metrics.usedDbrPct >= 40 ? '#f59e0b' : metrics.usedDbrPct >= 25 ? '#d7b158' : '#34dfac';

  return (
    <div aria-labelledby="readiness-studio-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <span className="homy-tag homy-tag--light">
            <span className="homy-tag__ring" aria-hidden="true" />
            <span>{r.eyebrow}</span>
          </span>
          <h2 id="readiness-studio-title" className="holo-display-h3 !text-white">
            {r.heading}
          </h2>
          <p className="text-[15.5px] leading-relaxed text-white/70">{r.sub}</p>
        </div>
        <Link
          href="/calculators/dbr-borrowing-power"
          className="inline-flex h-10 items-center rounded-[10px] border border-white/22 px-4 text-xs font-semibold text-white transition hover:border-[#d7b158] hover:text-[#fcf1b7]"
        >
          {r.fullCalcBtn} →
        </Link>
      </div>

      <div className="mt-9 grid items-stretch gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        {/* Left: Interactive Sliders Console (#0C1524 Elevated Panel) */}
        <div className="flex flex-col justify-between rounded-[20px] border border-white/12 bg-[#0c1524] p-6 sm:p-8">
          <div className="space-y-6">
            {/* Slider 1: Monthly Income */}
            <div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="studio-income" className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <Wallet size={15} className="text-[#34dfac]" />
                  {r.incomeLabel}
                </label>
                <span className="num rounded-[8px] border border-[#34dfac]/30 bg-[#34dfac]/10 px-3 py-1 text-sm font-bold text-[#34dfac]">
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
                className="holo-slider holo-slider--dark mt-3"
              />
              <div className="mt-1.5 flex justify-between text-[11px] text-white/55">
                <span className="num">{formatCompact(15_000)}/mo</span>
                <span className="num">
                  {r.cbuaeCap}: {formatMoney(metrics.maxMonthlyDebt)}/mo
                </span>
                <span className="num">{formatCompact(180_000)}/mo</span>
              </div>
            </div>

            {/* Slider 2: Total Credit Card Limits (5% CBUAE Rule) */}
            <div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="studio-cards" className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <CreditCard size={15} className="text-[#d7b158]" />
                  {r.cardsLabel}
                </label>
                <span className="num rounded-[8px] border border-[#d7b158]/35 bg-[#d7b158]/10 px-3 py-1 text-sm font-bold text-[#fcf1b7]">
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
                className="holo-slider holo-slider--dark mt-3"
              />
              <div className="mt-1.5 flex flex-wrap justify-between gap-2 text-[11px] text-white/58">
                <span className="num">
                  {r.cardDeduction}: {formatMoney(metrics.cardCommitment)}/mo
                </span>
                {metrics.lostPowerFromCards > 0 && (
                  <span className="num font-semibold text-[#fcf1b7]">
                    {r.reducesLoan} ~{formatCompact(metrics.lostPowerFromCards)}
                  </span>
                )}
              </div>
            </div>

            {/* Slider 3: Existing Auto / Personal Loan EMIs */}
            <div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="studio-loans" className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <Gauge size={15} className="text-white/70" />
                  {r.existingEmiLabel}
                </label>
                <span className="num rounded-[8px] border border-white/15 bg-white/[0.05] px-3 py-1 text-sm font-bold text-white">
                  {formatMoney(existingEmiAed)}
                </span>
              </div>
              <input
                id="studio-loans"
                type="range"
                min={0}
                max={25_000}
                step={500}
                value={existingEmiAed}
                onChange={(e) => setExistingEmiAed(Number(e.target.value))}
                className="holo-slider holo-slider--dark mt-3"
              />
            </div>
          </div>

          <div className="mt-6 flex items-start gap-2.5 rounded-[12px] border border-white/10 bg-[#070e1a] px-4 py-3 text-xs text-white/75">
            <Sparkles size={14} className="mt-0.5 shrink-0 text-[#d7b158]" />
            <span>{r.tip}</span>
          </div>
        </div>

        {/* Right: Existing-Debt DBR Gauge & Borrowing Power Output */}
        <div className="flex flex-col justify-between rounded-[20px] border border-[#d7b158]/28 bg-[#0c1524] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 rounded-[8px] border border-white/14 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-white">
              <ShieldCheck size={14} className="text-[#d7b158]" />
              {r.stressedBadge}
            </span>
            <span className="num rounded-[8px] border border-[#d7b158]/30 bg-[#070e1a] px-2.5 py-1 text-[11px] font-semibold text-[#fcf1b7]">
              {currency} · {r.banksLabel}
            </span>
          </div>

          <div className="my-5 flex flex-col items-center">
            <svg viewBox="0 0 200 112" className="h-[132px] w-[236px]" aria-hidden="true">
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <motion.path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke={gaugeStroke}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={arcLen}
                animate={{ strokeDashoffset: dashOffset }}
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 24 }}
              />
            </svg>
            <div className="-mt-14 text-center">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">
                {r.usedLabel}
              </p>
              <p className="num font-display text-3xl font-bold text-white">
                {metrics.usedDbrPct.toFixed(1)}%{' '}
                <span className="text-sm font-semibold text-white/55">/ 50%</span>
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[14px] border border-white/12 bg-[#070e1a] p-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">
                {r.maxLoanLabel}
              </p>
              <p className="num mt-1 font-display text-2xl font-bold text-white">
                {formatMoney(metrics.maxLoanAed)}
              </p>
              <p className="num mt-1 text-[11px] text-[#34dfac]">
                {r.monthlyRoom}: {formatMoney(metrics.remainingMonthlyForMortgage)}/mo
              </p>
            </div>

            <div className="rounded-[14px] border border-white/12 bg-[#070e1a] p-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">
                {r.targetPropLabel}
              </p>
              <p className="num mt-1 font-display text-2xl font-bold text-[#fcf1b7]">
                {formatMoney(metrics.maxPropertyAt80Ltv)}
              </p>
              <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-white/80">
                <Award size={12} className="text-[#d7b158]" />
                {metrics.goldenVisaReady ? r.gvPass : r.gvBelow}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/12 pt-5">
            <Link href="/get-started" className="homy-btn homy-btn--white flex-1 justify-between">
              <span>{r.primaryCta}</span>
              <span className="homy-btn__disc" aria-hidden="true">
                <span className="homy-btn__arrow-track">
                  <ArrowRight size={14} strokeWidth={2.2} />
                  <ArrowRight size={14} strokeWidth={2.2} />
                </span>
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-[46px] items-center justify-center rounded-[10px] border border-white/22 px-4 text-xs font-semibold text-white transition hover:border-[#d7b158] hover:text-[#fcf1b7]"
            >
              {r.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
