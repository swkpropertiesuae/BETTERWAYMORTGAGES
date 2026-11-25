'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, Minus, Plus, ShieldCheck } from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { CURRENCIES } from '@/data/i18n';
import { cashToClose, emi } from '@/lib/math';
import { minDownPaymentPct, type ResidencyKey } from '@/lib/journey';

const aedExact = (n: number) => `AED ${Math.round(n).toLocaleString('en-US')}`;

const RESIDENCY_KEYS: { key: ResidencyKey; capLabel: string }[] = [
  { key: 'resident', capLabel: 'Up to 80% LTV' },
  { key: 'national', capLabel: 'Up to 85% LTV' },
  { key: 'non-resident', capLabel: 'Typical 60% LTV' },
];

export default function HoloMortgageCalc() {
  const { data } = useBenchmark();
  const { currency, setCurrency, formatMoney, t } = useLocaleCurrency();
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
    return { ctc, monthly, eibor3m, revertRate, revertMonthly };
  }, [price, safeDownPct, ratePct, years, data.latest.threeMonth]);

  const downAmount = Math.round(price * (safeDownPct / 100));
  const wizardHref = `/get-started?residency=${residency}&price=${price}&down=${safeDownPct}&years=${years}&rate=${ratePct}`;

  return (
    <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
      {/* Left: Crisp Client-Education Explanation + Live Multi-Currency Pills */}
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#eef7f4] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#0e6954]">
          <span className="h-2 w-2 rounded-full bg-[#179373]" />
          {t.calc.eyebrow}
        </span>
        <h2 className="holo-display-h2">{t.calc.heading}</h2>
        <p className="holo-lead max-w-md">{t.calc.sub}</p>

        {/* Inline Live Currency Strip inside Calculator */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748b]">
            Live Display Currency
          </p>
          <div className="flex flex-wrap gap-1.5">
            {CURRENCIES.map((cur) => {
              const active = cur.code === currency;
              return (
                <button
                  key={cur.code}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCurrency(cur.code)}
                  className="bw-cur-pill"
                >
                  {cur.code}
                </button>
              );
            })}
          </div>
          {currency !== 'AED' && (
            <p className="text-[11.5px] text-[#64748b]">{t.calc.fxNotice}</p>
          )}
        </div>

        <ul className="space-y-2.5 pt-1 text-sm text-[#4b5b63]">
          {[
            `CBUAE statutory LTV caps (${RESIDENCY_KEYS.find((k) => k.key === residency)?.capLabel})`,
            'Itemises 4% DLD transfer, 0.25% mortgage reg & trustee fee',
            `Live CBUAE 3M EIBOR fixing (${calc.eibor3m.toFixed(2)}%) shown in revert preview`,
          ].map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#eef7f4] text-[#0e6954]">
                <Check size={12} strokeWidth={2.8} />
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3 pt-1">
          <Link href="/contact" className="homy-btn homy-btn--outline !h-11 !text-[13.5px]">
            {t.calc.ctaSecondary}
          </Link>
        </div>
      </div>

      {/* Right: Interactive Tabbed Calculator Console */}
      <div className="w-full">
        <div className="holo-calc-tabs" role="tablist" aria-label="Residency status">
          {RESIDENCY_KEYS.map((tab, idx) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={residency === tab.key}
              onClick={() => switchResidency(tab.key)}
              className="holo-calc-tab"
            >
              {t.calc.tabs[idx]}
            </button>
          ))}
        </div>

        <div className="holo-calc-body space-y-6">
          {/* Property Value Input + Slider */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <label htmlFor="holo-prop-price" className="text-sm font-medium text-[#121217]">
                  {t.calc.priceLabel}
                </label>
                {currency !== 'AED' && (
                  <p className="num text-xs font-semibold text-[#0e6954]">≈ {formatMoney(price)}</p>
                )}
              </div>
              <div className="flex items-center gap-2 rounded-[12px] border border-[#e5e7eb] bg-[#f5f6f8] px-3.5 py-2">
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
                  className="num w-28 bg-transparent text-right text-[15px] font-bold text-[#121217] focus:outline-none"
                />
                <span className="text-xs font-semibold text-[#6c6c89]">AED</span>
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
              style={{
                background: `linear-gradient(to right, #179373 0%, #179373 ${((Math.min(15_000_000, price) - 500_000) / 14_500_000) * 100}%, #ebecef ${((Math.min(15_000_000, price) - 500_000) / 14_500_000) * 100}%, #ebecef 100%)`,
              }}
            />
          </div>

          {/* Stepper Controls */}
          <div className="grid gap-3.5 border-y border-[#eef0f3] py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#121217]">
                  {t.calc.downLabel} ({safeDownPct}%)
                </p>
                <p className="text-xs text-[#6c6c89]">Min CBUAE floor: {minDown}%</p>
              </div>
              <div className="holo-stepper">
                <button
                  type="button"
                  aria-label="Decrease down payment percentage"
                  onClick={() => setDownPct((d) => Math.max(minDown, d - 5))}
                >
                  <Minus size={14} />
                </button>
                <span className="num min-w-[126px] text-center text-sm font-bold text-[#121217]">
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
                <p className="text-sm font-medium text-[#121217]">{t.calc.tenureLabel}</p>
                <p className="text-xs text-[#6c6c89]">CBUAE max 25 {t.calc.years.toLowerCase()}</p>
              </div>
              <div className="holo-stepper">
                <button
                  type="button"
                  aria-label="Decrease loan duration"
                  onClick={() => setYears((y) => Math.max(5, y - 1))}
                >
                  <Minus size={14} />
                </button>
                <span className="num min-w-[126px] text-center text-sm font-bold text-[#121217]">
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
                <p className="text-sm font-medium text-[#121217]">{t.calc.rateLabel}</p>
                <p className="text-xs text-[#6c6c89]">Adjustable — written bank terms confirm final rate</p>
              </div>
              <div className="holo-stepper">
                <button
                  type="button"
                  aria-label="Decrease assumed interest rate"
                  onClick={() => setRatePct((r) => Math.max(2.5, Number((r - 0.1).toFixed(2))))}
                >
                  <Minus size={14} />
                </button>
                <span className="num min-w-[126px] text-center text-sm font-bold text-[#121217]">
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

          {/* 3-Mode Output Switcher with Animated Pill */}
          <div className="rounded-[18px] bg-[#f5f6f8] p-4">
            <div className="mb-4 grid grid-cols-3 gap-1 rounded-[12px] border border-[#e5e7eb] bg-white p-1">
              {(
                [
                  ['monthly', 'Monthly'],
                  ['upfront', 'Upfront + DLD'],
                  ['revert', 'EIBOR Revert'],
                ] as const
              ).map(([k, lbl]) => {
                const active = view === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setView(k)}
                    className={`relative rounded-[9px] px-2 py-2 text-xs font-semibold transition cursor-pointer ${
                      active ? 'text-white' : 'text-[#6c6c89] hover:text-[#121217]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="bw-calc-view-pill"
                        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 rounded-[9px] bg-[#0a1424]"
                      />
                    )}
                    <span className="relative z-10">{lbl}</span>
                  </button>
                );
              })}
            </div>

            {view === 'monthly' && (
              <div className="py-1 text-center" aria-live="polite">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6c6c89]">
                  {t.calc.monthlyLabel}
                </p>
                <p className="num mt-1 text-3xl font-extrabold tracking-tight text-[#0a1424] sm:text-4xl">
                  {formatMoney(calc.monthly)}
                </p>
                {currency !== 'AED' && (
                  <p className="num mt-0.5 text-[11.5px] font-semibold text-[#64748b]">
                    ({aedExact(calc.monthly)} / mo statutory AED)
                  </p>
                )}
                <p className="mt-2 text-xs text-[#4b5b63]">
                  {t.calc.loanAmount} <strong className="num text-[#0a1424]">{formatMoney(calc.ctc.loan)}</strong> ·{' '}
                  {t.calc.cashToClose} <strong className="num text-[#0e6954]">{formatMoney(calc.ctc.total)}</strong>
                </p>
              </div>
            )}

            {view === 'upfront' && (
              <div className="space-y-2 text-xs" aria-live="polite">
                <div className="flex justify-between border-b border-[#e5e7eb] pb-2 text-sm font-bold text-[#0a1424]">
                  <span>{t.calc.cashToClose}</span>
                  <span className="num text-[#0e6954]">{formatMoney(calc.ctc.total)}</span>
                </div>
                <div className="flex justify-between text-[#4b5b63]">
                  <span>
                    {t.calc.downLabel} ({safeDownPct}%)
                  </span>
                  <span className="num font-semibold text-[#0a1424]">{formatMoney(calc.ctc.down)}</span>
                </div>
                <div className="flex justify-between text-[#4b5b63]">
                  <span>DLD 4% transfer + title deed</span>
                  <span className="num font-semibold text-[#0a1424]">{formatMoney(calc.ctc.dld)}</span>
                </div>
                <div className="flex justify-between text-[#4b5b63]">
                  <span>Mortgage reg (0.25%) + trustee + valuation</span>
                  <span className="num font-semibold text-[#0a1424]">
                    {formatMoney(calc.ctc.mortgageReg + calc.ctc.trustee + calc.ctc.valuation)}
                  </span>
                </div>
                <div className="flex justify-between text-[#4b5b63]">
                  <span>Agency fee allowance (2% + VAT)</span>
                  <span className="num font-semibold text-[#0a1424]">{formatMoney(calc.ctc.agencyFee)}</span>
                </div>
              </div>
            )}

            {view === 'revert' && (
              <div className="space-y-2 text-xs" aria-live="polite">
                <div className="flex justify-between border-b border-[#e5e7eb] pb-2 text-sm font-bold text-[#0a1424]">
                  <span>After Fixed Period (3M EIBOR + 1.50%)</span>
                  <span className="num text-[#0a1424]">{formatMoney(calc.revertMonthly)}/mo</span>
                </div>
                <div className="flex justify-between text-[#4b5b63]">
                  <span>Published CBUAE 3M EIBOR</span>
                  <span className="num font-semibold text-[#0e6954]">{calc.eibor3m.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between text-[#4b5b63]">
                  <span>Illustrative revert rate (+1.50% margin)</span>
                  <span className="num font-semibold text-[#0a1424]">{calc.revertRate.toFixed(2)}%</span>
                </div>
                <p className="pt-1 text-[11px] text-[#6c6c89]">
                  Illustrative check only. Contact our Dubai desk to review written Final Offer Letter margins across 24 banks.
                </p>
              </div>
            )}
          </div>

          <Link href={wizardHref} className="homy-btn w-full justify-between !h-[54px] !rounded-[14px] !text-[15px]">
            <span>{t.calc.ctaPrimary}</span>
            <span className="homy-btn__disc" aria-hidden="true">
              <span className="homy-btn__arrow-track">
                <ArrowRight size={15} strokeWidth={2.2} />
                <ArrowRight size={15} strokeWidth={2.2} />
              </span>
            </span>
          </Link>

          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-xs text-[#6c6c89]">
            <span className="inline-flex items-center gap-1">
              <Check size={13} className="text-[#179373]" /> Zero commitment
            </span>
            <span className="inline-flex items-center gap-1">
              <Check size={13} className="text-[#179373]" /> Zero AECB credit impact
            </span>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck size={13} className="text-[#179373]" /> CBUAE-aligned math
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
