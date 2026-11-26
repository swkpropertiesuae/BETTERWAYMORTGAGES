'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { SPRING_INSTITUTIONAL } from '@/components/ui/MotionPrimitives';
import { cashToClose, emi } from '@/lib/math';
import { minDownPaymentPct, type ResidencyKey } from '@/lib/journey';

const PRESETS = [1_500_000, 2_500_000, 4_000_000, 7_000_000] as const;
const HERO_ILLUSTRATIVE_RATE = 4.19;
const HERO_TENURE_YEARS = 25;

const RESIDENCIES: { key: ResidencyKey; idx: 0 | 1 | 2 }[] = [
  { key: 'resident', idx: 0 },
  { key: 'national', idx: 1 },
  { key: 'non-resident', idx: 2 },
];

/**
 * 21st.dev Swiss / DIFC Hero Instant Mortgage Preview Console.
 * Uses exact 4.19% illustrative rate (matching DEFAULT_JOURNEY.ratePct) and CBUAE statutory LTV floors,
 * handing off directly to /get-started with rate=4.19 so displayed EMI matches to the dirham.
 */
export default function HeroPreCheckConsole() {
  const { currency, formatMoney, formatCompact, swiss } = useLocaleCurrency();
  const reduce = useReducedMotion();
  const hc = swiss.heroConsole;

  const [residency, setResidency] = useState<ResidencyKey>('resident');
  const [price, setPrice] = useState<number>(2_500_000);
  const [downPct, setDownPct] = useState<number>(20);

  const minDown = minDownPaymentPct(residency, price);
  const safeDownPct = Math.max(minDown, Math.min(75, downPct));

  const switchResidency = (next: ResidencyKey) => {
    setResidency(next);
    setDownPct(minDownPaymentPct(next, price));
  };

  const setSafePrice = (nextPrice: number) => {
    const clamped = Math.max(750_000, Math.min(15_000_000, nextPrice));
    setPrice(clamped);
    const nextMin = minDownPaymentPct(residency, clamped);
    if (downPct < nextMin) setDownPct(nextMin);
  };

  const result = useMemo(() => {
    const ctc = cashToClose({ price, downPct: safeDownPct, agency: true, offPlanHandover: false });
    const monthly = emi(ctc.loan, HERO_ILLUSTRATIVE_RATE, HERO_TENURE_YEARS);
    const feesOnly = ctc.total - ctc.down;
    const ltv = 100 - safeDownPct;
    return { ctc, monthly, feesOnly, ltv };
  }, [price, safeDownPct]);

  const handoffHref = `/get-started?price=${price}&down=${safeDownPct}&rate=4.19&residency=${residency}`;

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-[#d7b158]/30 bg-[#0c1524] p-5 text-white shadow-[0_36px_90px_-30px_rgba(0,0,0,0.75)] sm:p-6">
      {/* Subtle 1px Top Champagne Gold Highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d7b158]/70 to-transparent"
      />

      {/* Console Header */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#d7b158]">
            {hc.heading}
          </p>
          <p className="mt-0.5 text-[11.5px] text-white/60">{hc.rateNote}</p>
        </div>
        <span className="num rounded-[8px] border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-[#34dfac]">
          {currency} · CBUAE
        </span>
      </div>

      {/* Residency Segmented Control */}
      <div
        role="tablist"
        aria-label="Buyer residency profile"
        className="mt-4 grid grid-cols-3 gap-1 rounded-[12px] border border-white/10 bg-[#070e1a] p-1"
      >
        {RESIDENCIES.map((item) => {
          const active = residency === item.key;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => switchResidency(item.key)}
              className={`relative rounded-[9px] px-2 py-2 text-[11px] font-semibold transition cursor-pointer sm:text-xs ${
                active ? 'text-[#070e1a]' : 'text-white/70 hover:text-white'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="bw-hero-residency-pill"
                  transition={reduce ? { duration: 0 } : SPRING_INSTITUTIONAL}
                  className="absolute inset-0 rounded-[9px] bg-white"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">{hc.residencyTabs[item.idx]}</span>
            </button>
          );
        })}
      </div>

      {/* Property Value Control */}
      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-2">
          <label htmlFor="hero-console-price" className="text-xs font-medium text-white/75">
            {hc.priceLabel}
          </label>
          <span className="num text-base font-bold text-white">{formatMoney(price)}</span>
        </div>
        <input
          id="hero-console-price"
          type="range"
          min={750_000}
          max={15_000_000}
          step={50_000}
          value={price}
          onChange={(e) => setSafePrice(Number(e.target.value))}
          className="holo-slider holo-slider--dark mt-2.5"
        />
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setSafePrice(preset)}
              className={`num rounded-[7px] border px-2 py-1 text-[10.5px] font-semibold transition cursor-pointer ${
                price === preset
                  ? 'border-[#34dfac]/60 bg-[#34dfac]/15 text-[#34dfac]'
                  : 'border-white/12 bg-white/[0.03] text-white/68 hover:border-white/30 hover:text-white'
              }`}
            >
              {formatCompact(preset)}
            </button>
          ))}
        </div>
      </div>

      {/* Down Payment Control */}
      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-2">
          <label htmlFor="hero-console-down" className="text-xs font-medium text-white/75">
            {hc.downLabel} <span className="num text-[#fcf1b7]">({safeDownPct}%)</span>
          </label>
          <span className="num text-sm font-semibold text-white/90">{formatMoney(result.ctc.down)}</span>
        </div>
        <input
          id="hero-console-down"
          type="range"
          min={minDown}
          max={75}
          step={5}
          value={safeDownPct}
          onChange={(e) => setDownPct(Number(e.target.value))}
          className="holo-slider holo-slider--dark mt-2"
        />
      </div>

      {/* 2x2 Swiss Tabular Output Ledger */}
      <div className="mt-5 grid grid-cols-2 gap-2.5" aria-live="polite">
        <div className="rounded-[12px] border border-white/12 bg-[#070e1a] p-3.5">
          <p className="text-[10.5px] font-medium text-white/60">{hc.monthlyLabel}</p>
          <p className="num mt-1 text-lg font-bold text-[#34dfac] sm:text-xl">
            {formatMoney(result.monthly)}
          </p>
        </div>
        <div className="rounded-[12px] border border-white/12 bg-[#070e1a] p-3.5">
          <p className="text-[10.5px] font-medium text-white/60">{hc.loanLabel}</p>
          <p className="num mt-1 text-base font-bold text-white sm:text-lg">
            {formatCompact(result.ctc.loan)} <span className="text-xs font-semibold text-[#d7b158]">· {result.ltv}%</span>
          </p>
        </div>
        <div className="rounded-[12px] border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
          <p className="text-[10.5px] text-white/58">{hc.dldLabel}</p>
          <p className="num mt-0.5 text-sm font-semibold text-white">{formatMoney(result.feesOnly)}</p>
        </div>
        <div className="rounded-[12px] border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
          <p className="text-[10.5px] text-white/58">{hc.totalCashLabel}</p>
          <p className="num mt-0.5 text-sm font-semibold text-[#fcf1b7]">{formatMoney(result.ctc.total)}</p>
        </div>
      </div>

      {/* Handoff CTA */}
      <Link href={handoffHref} className="homy-btn homy-btn--white mt-5 w-full justify-between">
        <span>{hc.ctaLabel}</span>
        <span className="homy-btn__disc" aria-hidden="true">
          <span className="homy-btn__arrow-track">
            <ArrowRight size={14} strokeWidth={2.2} />
            <ArrowRight size={14} strokeWidth={2.2} />
          </span>
        </span>
      </Link>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] text-white/52">
        <ShieldCheck size={12} className="shrink-0 text-[#34dfac]" />
        <span>Illustrative CBUAE &amp; DLD estimate · Zero AECB inquiry</span>
      </p>
    </div>
  );
}
