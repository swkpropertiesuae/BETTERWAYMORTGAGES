'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, Minus, Plus, ShieldCheck } from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { SPRING_INSTITUTIONAL } from '@/components/ui/MotionPrimitives';
import { CURRENCIES } from '@/data/i18n';
import { cashToClose, emi } from '@/lib/math';
import { minDownPaymentPct, type ResidencyKey } from '@/lib/journey';

const aedExact = (n: number) => `AED ${Math.round(n).toLocaleString('en-US')}`;

const RESIDENCY_KEYS: { key: ResidencyKey; idx: 0 | 1 | 2 }[] = [
  { key: 'resident', idx: 0 },
  { key: 'national', idx: 1 },
  { key: 'non-resident', idx: 2 },
];

/**
 * Band 4: Swiss Private-Bank Split Financial Workbench.
 * Pure White structured inputs on the left, Midnight Navy (#070E1A) 3-tab tabular ledger on the right.
 */
export default function HoloMortgageCalc() {
  const { data } = useBenchmark();
  const { currency, setCurrency, formatMoney, t, ext } = useLocaleCurrency();
  const reduce = useReducedMotion();

  const [residency, setResidency] = useState<ResidencyKey>('resident');
  const [price, setPrice] = useState(2_000_000);
  const [downPct, setDownPct] = useState(20);
  const [years, setYears] = useState(25);
  const [ratePct, setRatePct] = useState(4.19);
  const [view, setView] = useState<'monthly' | 'upfront' | 'revert'>('monthly');

  const minDown = minDownPaymentPct(residency, price);
  const safeDownPct = Math.max(minDown, Math.min(80, downPct));

  const switchResidency = (next: ResidencyKey) => {
    setResidency(next);
    setDownPct(minDownPaymentPct(next, price));
  };

  const handlePriceChange = (nextPrice: number) => {
    const clamped = Math.max(500_000, Math.min(25_000_000, nextPrice));
    setPrice(clamped);
    const nextMin = minDownPaymentPct(residency, clamped);
    if (downPct < nextMin) setDownPct(nextMin);
  };

  const calc = useMemo(() => {
    const ctc = cashToClose({ price, downPct: safeDownPct, agency: true, offPlanHandover: false });
    const monthly = emi(ctc.loan, ratePct, years);
    const eibor3m = data.latest.threeMonth;
    const revertRate = eibor3m + 1.5;
    const revertMonthly = emi(ctc.loan, revertRate, Math.max(1, years - 3));
    const totalFees = ctc.total - ctc.down;
    return { ctc, monthly, eibor3m, revertRate, revertMonthly, totalFees };
  }, [price, safeDownPct, ratePct, years, data.latest.threeMonth]);

  const downAmount = Math.round(price * (safeDownPct / 100));
  const wizardHref = `/get-started?residency=${residency}&price=${price}&down=${safeDownPct}&years=${years}&rate=${ratePct}`;

  const downShare = Math.min(85, Math.max(15, (calc.ctc.down / Math.max(1, calc.ctc.total)) * 100));
  const dldShare = Math.min(40, (calc.ctc.dld / Math.max(1, calc.ctc.total)) * 100);

  return (
    <div className="space-y-8">
      {/* Header Row + Live 8-Currency Selector */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <span className="homy-tag">
            <span className="homy-tag__ring" aria-hidden="true" />
            <span>{t.calc.eyebrow}</span>
          </span>
          <h2 className="holo-display-h2">{t.calc.heading}</h2>
          <p className="holo-lead">{t.calc.sub}</p>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#4a5568]">
            {ext.calcUi.liveDisplayCurrency}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {CURRENCIES.map((cur) => (
              <button
                key={cur.code}
                type="button"
                aria-pressed={cur.code === currency}
                onClick={() => setCurrency(cur.code)}
                className="bw-cur-pill"
              >
                {cur.code}
              </button>
            ))}
          </div>
          {currency !== 'AED' && <p className="text-[11px] text-[#4a5568]">{t.calc.fxNotice}</p>}
        </div>
      </div>

      {/* Split Financial Workbench */}
      <div className="grid overflow-hidden rounded-[20px] border border-[#e3e7ee] bg-white shadow-[0_24px_60px_-36px_rgba(7,14,26,0.18)] lg:grid-cols-[1.04fr_0.96fr]">
        {/* LEFT: Pure White Structured Inputs */}
        <div className="space-y-6 p-6 sm:p-8">
          {/* Residency Tabs */}
          <div
            role="tablist"
            aria-label="Residency status"
            className="grid grid-cols-3 gap-1 rounded-[12px] border border-[#e3e7ee] bg-[#f7f8fa] p-1"
          >
            {RESIDENCY_KEYS.map((tab) => {
              const active = residency === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => switchResidency(tab.key)}
                  className={`relative rounded-[9px] px-2.5 py-2 text-xs font-semibold transition cursor-pointer ${
                    active ? 'text-white' : 'text-[#4a5568] hover:text-[#070e1a]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="bw-calc-residency-tab"
                      transition={reduce ? { duration: 0 } : SPRING_INSTITUTIONAL}
                      className="absolute inset-0 rounded-[9px] bg-[#070e1a]"
                    />
                  )}
                  <span className="relative z-10">{t.calc.tabs[tab.idx]}</span>
                </button>
              );
            })}
          </div>

          {/* Property Value Slider & Numeric Input */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <label htmlFor="holo-prop-price" className="text-sm font-semibold text-[#070e1a]">
                  {t.calc.priceLabel}
                </label>
                {currency !== 'AED' && (
                  <p className="num text-xs font-semibold text-[#0e6954]">≈ {formatMoney(price)}</p>
                )}
              </div>
              <div className="flex items-center gap-2 rounded-[10px] border border-[#d6dce6] bg-[#f7f8fa] px-3.5 py-2">
                <input
                  id="holo-prop-price"
                  type="text"
                  inputMode="numeric"
                  aria-label="Property value in AED"
                  value={price.toLocaleString('en-US')}
                  onChange={(e) => {
                    const num = Number(e.target.value.replace(/[^\d]/g, ''));
                    if (Number.isFinite(num) && num > 0) handlePriceChange(num);
                  }}
                  className="num w-28 bg-transparent text-right text-[15px] font-bold text-[#070e1a] focus:outline-none"
                />
                <span className="font-mono text-xs font-semibold text-[#4a5568]">AED</span>
              </div>
            </div>
            <input
              type="range"
              aria-label="Property value slider"
              min={500_000}
              max={15_000_000}
              step={50_000}
              value={Math.min(15_000_000, price)}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="holo-slider mt-4"
            />
          </div>

          {/* Stepper Controls */}
          <div className="grid gap-4 border-y border-[#e3e7ee] py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#070e1a]">
                  {t.calc.downLabel} <span className="num text-[#0e6954]">({safeDownPct}%)</span>
                </p>
                <p className="text-xs text-[#4a5568]">
                  {ext.calcUi.minDownNote}: {minDown}%
                </p>
              </div>
              <div className="holo-stepper">
                <button
                  type="button"
                  aria-label="Decrease down payment percentage"
                  onClick={() => setDownPct((d) => Math.max(minDown, d - 5))}
                >
                  <Minus size={14} />
                </button>
                <span className="num min-w-[126px] text-center text-sm font-bold text-[#070e1a]">
                  {formatMoney(downAmount)}
                </span>
                <button
                  type="button"
                  aria-label="Increase down payment percentage"
                  onClick={() => setDownPct((d) => Math.min(80, d + 5))}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#070e1a]">{t.calc.tenureLabel}</p>
                <p className="text-xs text-[#4a5568]">CBUAE max 25 {t.calc.years.toLowerCase()}</p>
              </div>
              <div className="holo-stepper">
                <button
                  type="button"
                  aria-label="Decrease loan duration"
                  onClick={() => setYears((y) => Math.max(5, y - 1))}
                >
                  <Minus size={14} />
                </button>
                <span className="num min-w-[126px] text-center text-sm font-bold text-[#070e1a]">
                  {years} {t.calc.years}
                </span>
                <button
                  type="button"
                  aria-label="Increase loan duration"
                  onClick={() => setYears((y) => Math.min(25, y + 1))}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#070e1a]">{t.calc.rateLabel}</p>
                <p className="text-xs text-[#4a5568]">
                  Live CBUAE 3M EIBOR: <strong className="num text-[#0e6954]">{calc.eibor3m.toFixed(2)}%</strong>
                </p>
              </div>
              <div className="holo-stepper">
                <button
                  type="button"
                  aria-label="Decrease assumed interest rate"
                  onClick={() => setRatePct((r) => Math.max(2.5, Number((r - 0.1).toFixed(2))))}
                >
                  <Minus size={14} />
                </button>
                <span className="num min-w-[126px] text-center text-sm font-bold text-[#070e1a]">
                  {ratePct.toFixed(2)}%
                </span>
                <button
                  type="button"
                  aria-label="Increase assumed interest rate"
                  onClick={() => setRatePct((r) => Math.min(8.5, Number((r + 0.1).toFixed(2))))}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          <ul className="space-y-2 text-xs text-[#4a5568]">
            {[
              `${ext.calcUi.bullet1} (${ext.calcUi.residencyCaps[RESIDENCY_KEYS.findIndex((k) => k.key === residency)]})`,
              ext.calcUi.bullet2,
              `${ext.calcUi.bullet3} (${calc.eibor3m.toFixed(2)}%)`,
            ].map((point) => (
              <li key={point} className="flex items-start gap-2">
                <Check size={14} className="mt-0.5 shrink-0 text-[#0e6954]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: Midnight Navy (#070E1A) Tabular Summary Ledger */}
        <div className="flex flex-col justify-between bg-[#070e1a] p-6 text-white sm:p-8">
          <div>
            {/* 3-Mode Ledger Tabs */}
            <div className="grid grid-cols-3 gap-1 rounded-[12px] border border-white/12 bg-[#0c1524] p-1">
              {(
                [
                  ['monthly', ext.calcUi.viewTabs[0]],
                  ['upfront', ext.calcUi.viewTabs[1]],
                  ['revert', ext.calcUi.viewTabs[2]],
                ] as const
              ).map(([k, lbl]) => {
                const active = view === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setView(k)}
                    className={`relative rounded-[9px] px-2 py-2 text-xs font-semibold transition cursor-pointer ${
                      active ? 'text-[#070e1a]' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="bw-calc-view-pill"
                        transition={reduce ? { duration: 0 } : SPRING_INSTITUTIONAL}
                        className="absolute inset-0 rounded-[9px] bg-white"
                      />
                    )}
                    <span className="relative z-10">{lbl}</span>
                  </button>
                );
              })}
            </div>

            {view === 'monthly' && (
              <div className="mt-8 space-y-6" aria-live="polite">
                <div>
                  <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#d7b158]">
                    {t.calc.monthlyLabel}
                  </p>
                  <p className="num mt-2 text-4xl font-bold tracking-tight text-white sm:text-[42px]">
                    {formatMoney(calc.monthly)}
                  </p>
                  {currency !== 'AED' && (
                    <p className="num mt-1 text-xs text-white/55">({aedExact(calc.monthly)} / mo statutory AED)</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[12px] border border-white/12 bg-[#0c1524] p-4">
                    <p className="text-[11px] text-white/60">{t.calc.loanAmount}</p>
                    <p className="num mt-1 text-lg font-bold text-white">{formatMoney(calc.ctc.loan)}</p>
                    <p className="num mt-0.5 text-[11px] text-[#34dfac]">{100 - safeDownPct}% LTV</p>
                  </div>
                  <div className="rounded-[12px] border border-white/12 bg-[#0c1524] p-4">
                    <p className="text-[11px] text-white/60">{t.calc.cashToClose}</p>
                    <p className="num mt-1 text-lg font-bold text-[#fcf1b7]">{formatMoney(calc.ctc.total)}</p>
                    <p className="num mt-0.5 text-[11px] text-white/55">Incl. {formatMoney(calc.totalFees)} fees</p>
                  </div>
                </div>

                {/* Proportional Upfront Bar */}
                <div className="space-y-2">
                  <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div style={{ width: `${downShare}%` }} className="bg-[#34dfac]" />
                    <div style={{ width: `${dldShare}%` }} className="bg-[#d7b158]" />
                    <div className="flex-1 bg-white/35" />
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 text-[11px] text-white/60">
                    <span className="inline-flex items-center gap-1.5">
                      <i className="h-2 w-2 rounded-full bg-[#34dfac]" /> Deposit ({safeDownPct}%)
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <i className="h-2 w-2 rounded-full bg-[#d7b158]" /> 4% DLD
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <i className="h-2 w-2 rounded-full bg-white/40" /> Reg / Trustee / Agency
                    </span>
                  </div>
                </div>
              </div>
            )}

            {view === 'upfront' && (
              <div className="mt-7 space-y-3 text-sm" aria-live="polite">
                <div className="flex justify-between border-b border-white/12 pb-3 text-base font-bold">
                  <span>{t.calc.cashToClose}</span>
                  <span className="num text-[#34dfac]">{formatMoney(calc.ctc.total)}</span>
                </div>
                <div className="flex justify-between text-white/75">
                  <span>
                    {t.calc.downLabel} ({safeDownPct}%)
                  </span>
                  <span className="num font-semibold text-white">{formatMoney(calc.ctc.down)}</span>
                </div>
                <div className="flex justify-between text-white/75">
                  <span>DLD 4% transfer + title deed</span>
                  <span className="num font-semibold text-white">{formatMoney(calc.ctc.dld)}</span>
                </div>
                <div className="flex justify-between text-white/75">
                  <span>Mortgage reg (0.25%) + trustee + valuation</span>
                  <span className="num font-semibold text-white">
                    {formatMoney(calc.ctc.mortgageReg + calc.ctc.trustee + calc.ctc.valuation)}
                  </span>
                </div>
                <div className="flex justify-between text-white/75">
                  <span>Agency fee allowance (2% + VAT)</span>
                  <span className="num font-semibold text-white">{formatMoney(calc.ctc.agencyFee)}</span>
                </div>
              </div>
            )}

            {view === 'revert' && (
              <div className="mt-7 space-y-3.5 text-sm" aria-live="polite">
                <div className="flex justify-between border-b border-white/12 pb-3 text-base font-bold">
                  <span>{ext.calcUi.afterFixed}</span>
                  <span className="num text-[#fcf1b7]">{formatMoney(calc.revertMonthly)}/mo</span>
                </div>
                <div className="flex justify-between text-white/75">
                  <span>Published CBUAE 3M EIBOR</span>
                  <span className="num font-semibold text-[#34dfac]">{calc.eibor3m.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between text-white/75">
                  <span>Illustrative revert rate (+1.50% margin)</span>
                  <span className="num font-semibold text-white">{calc.revertRate.toFixed(2)}%</span>
                </div>
                <p className="rounded-[12px] border border-white/10 bg-[#0c1524] p-3.5 text-xs leading-relaxed text-white/65">
                  Illustrative planning check only. Contact our Dubai desk to review written Final Offer Letter revert
                  margins and floors across 24 UAE banks.
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-3 border-t border-white/12 pt-6">
            <Link href={wizardHref} className="homy-btn homy-btn--white w-full justify-between !h-12">
              <span>{t.calc.ctaPrimary}</span>
              <span className="homy-btn__disc" aria-hidden="true">
                <span className="homy-btn__arrow-track">
                  <ArrowRight size={14} strokeWidth={2.2} />
                  <ArrowRight size={14} strokeWidth={2.2} />
                </span>
              </span>
            </Link>
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-[#34dfac]" /> CBUAE-aligned statutory math · Zero AECB inquiry
              </span>
              <Link href="/calculators/mortgage-calculator" className="font-semibold text-[#fcf1b7] hover:underline">
                Full Calculator →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
