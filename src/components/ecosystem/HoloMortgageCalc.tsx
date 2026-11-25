'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Minus, Plus, ShieldCheck } from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
import { cashToClose, emi } from '@/lib/math';
import { minDownPaymentPct, type ResidencyKey } from '@/lib/journey';

const aed = (n: number) => `${Math.round(n).toLocaleString('en-US')} AED`;

const TABS: { key: ResidencyKey; label: string; capLabel: string }[] = [
  { key: 'resident', label: 'UAE Resident', capLabel: 'Up to 80% LTV' },
  { key: 'national', label: 'UAE National', capLabel: 'Up to 85% LTV' },
  { key: 'non-resident', label: 'Non-Resident', capLabel: 'Typical 60% LTV' },
];

export default function HoloMortgageCalc() {
  const { data } = useBenchmark();
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
      {/* Left: Exact UseHolo Commanding Split Copy + Betterway Transparency Differentiator */}
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#eef7f4] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#0e6954]">
          <span className="h-2 w-2 rounded-full bg-[#179373]" />
          Instant Dubai Mortgage &amp; DLD Calculator
        </span>
        <h2 className="holo-display-h2">
          Mortgage calculator
        </h2>
        <p className="holo-lead max-w-md">
          Plan your home financing instantly — with what other calculators hide: full 4% Dubai Land Department fees,
          trustee charges, and live CBUAE 3M EIBOR revert impact.
        </p>

        <ul className="space-y-2.5 pt-1 text-sm text-[#4b5b63]">
          {[
            `Auto-applies official CBUAE LTV caps (${TABS.find((t) => t.key === residency)?.capLabel})`,
            'Itemises 4% DLD transfer, 0.25% mortgage reg & AED 4,200 trustee fee',
            `Live CBUAE 3M EIBOR fixing (${calc.eibor3m.toFixed(2)}%) built into revert preview`,
          ].map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#eef7f4] text-[#0e6954]">
                <Check size={12} strokeWidth={2.8} />
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/calculators/dbr-borrowing-power" className="homy-btn homy-btn--outline !h-11 !text-[13.5px]">
            Check 50% DBR Borrowing Power
          </Link>
          <Link href="/calculators/rent-vs-buy-dubai" className="homy-btn homy-btn--outline !h-11 !text-[13.5px]">
            Rent vs Buy Calculator
          </Link>
        </div>
      </div>

      {/* Right: Exact Holo Tabbed Floating Calculator Card — Supercharged with Upfront DLD & Revert Tabs */}
      <div className="w-full">
        <div className="holo-calc-tabs" role="tablist" aria-label="Residency status">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={residency === tab.key}
              onClick={() => switchResidency(tab.key)}
              className="holo-calc-tab"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="holo-calc-body space-y-6">
          {/* Property Value Input + Custom Emerald-Bordered Holo Slider */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="holo-prop-price" className="text-sm font-medium text-[#121217]">
                Property value
              </label>
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

          {/* Stepper Controls: Down Payment, Tenure, & Assumed Rate (Transparent!) */}
          <div className="grid gap-3.5 border-y border-[#eef0f3] py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#121217]">Down payment ({safeDownPct}%)</p>
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
                <span className="num min-w-[116px] text-center text-sm font-bold text-[#121217]">
                  {downAmount.toLocaleString('en-US')}
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
                <p className="text-sm font-medium text-[#121217]">Loan duration</p>
                <p className="text-xs text-[#6c6c89]">CBUAE max 25 years</p>
              </div>
              <div className="holo-stepper">
                <button
                  type="button"
                  aria-label="Decrease loan duration"
                  onClick={() => setYears((y) => Math.max(5, y - 1))}
                >
                  <Minus size={14} />
                </button>
                <span className="num min-w-[116px] text-center text-sm font-bold text-[#121217]">
                  {years} years
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
                <p className="text-sm font-medium text-[#121217]">Illustrative rate (p.a.)</p>
                <p className="text-xs text-[#6c6c89]">Adjustable — bank confirms final pricing</p>
              </div>
              <div className="holo-stepper">
                <button
                  type="button"
                  aria-label="Decrease assumed interest rate"
                  onClick={() => setRatePct((r) => Math.max(2.5, Number((r - 0.1).toFixed(2))))}
                >
                  <Minus size={14} />
                </button>
                <span className="num min-w-[116px] text-center text-sm font-bold text-[#121217]">
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

          {/* Betterway Competitive Edge: 3-Mode Output Switcher (Monthly / Full Upfront DLD / Revert Check) */}
          <div className="rounded-[18px] bg-[#f5f6f8] p-4">
            <div className="mb-4 grid grid-cols-3 gap-1 rounded-[12px] bg-white p-1 border border-[#e5e7eb]">
              {(
                [
                  ['monthly', 'Monthly cost'],
                  ['upfront', 'Upfront + DLD'],
                  ['revert', 'EIBOR revert'],
                ] as const
              ).map(([k, lbl]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setView(k)}
                  className={`rounded-[9px] px-2 py-2 text-xs font-semibold transition cursor-pointer ${
                    view === k ? 'bg-[#121217] text-white shadow-sm' : 'text-[#6c6c89] hover:text-[#121217]'
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>

            {view === 'monthly' && (
              <div className="text-center py-1" aria-live="polite">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6c6c89]">Estimated monthly payment</p>
                <p className="num mt-1 text-3xl font-extrabold tracking-tight text-[#121217] sm:text-4xl">
                  {aed(calc.monthly)}
                </p>
                <p className="mt-1.5 text-xs text-[#4b5b63]">
                  Loan amount <strong className="num text-[#121217]">{aed(calc.ctc.loan)}</strong> · Total cash needed incl. DLD{' '}
                  <strong className="num text-[#0e6954]">{aed(calc.ctc.total)}</strong>
                </p>
              </div>
            )}

            {view === 'upfront' && (
              <div className="space-y-2 text-xs" aria-live="polite">
                <div className="flex justify-between font-bold text-[#121217] text-sm pb-2 border-b border-[#e5e7eb]">
                  <span>Total Cash Required to Close</span>
                  <span className="num text-[#0e6954]">{aed(calc.ctc.total)}</span>
                </div>
                <div className="flex justify-between text-[#4b5b63]">
                  <span>Down payment ({safeDownPct}%)</span>
                  <span className="num font-semibold text-[#121217]">{aed(calc.ctc.down)}</span>
                </div>
                <div className="flex justify-between text-[#4b5b63]">
                  <span>DLD 4% transfer + title deed</span>
                  <span className="num font-semibold text-[#121217]">{aed(calc.ctc.dld)}</span>
                </div>
                <div className="flex justify-between text-[#4b5b63]">
                  <span>Mortgage reg (0.25%) + trustee + valuation</span>
                  <span className="num font-semibold text-[#121217]">
                    {aed(calc.ctc.mortgageReg + calc.ctc.trustee + calc.ctc.valuation)}
                  </span>
                </div>
                <div className="flex justify-between text-[#4b5b63]">
                  <span>Agency fee allowance (2% + VAT)</span>
                  <span className="num font-semibold text-[#121217]">{aed(calc.ctc.agencyFee)}</span>
                </div>
              </div>
            )}

            {view === 'revert' && (
              <div className="space-y-2 text-xs" aria-live="polite">
                <div className="flex justify-between font-bold text-[#121217] text-sm pb-2 border-b border-[#e5e7eb]">
                  <span>After Fixed Period (3M EIBOR + 1.50%)</span>
                  <span className="num text-[#121217]">{aed(calc.revertMonthly)}/mo</span>
                </div>
                <div className="flex justify-between text-[#4b5b63]">
                  <span>Published CBUAE 3M EIBOR</span>
                  <span className="num font-semibold text-[#0e6954]">{calc.eibor3m.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between text-[#4b5b63]">
                  <span>Illustrative revert rate (+1.50% margin)</span>
                  <span className="num font-semibold text-[#121217]">{calc.revertRate.toFixed(2)}%</span>
                </div>
                <p className="pt-1 text-[11px] text-[#6c6c89]">
                  Illustrative planning check only. Compare actual written Final Offer Letter revert margins &amp; floors across 24 banks.
                </p>
              </div>
            )}
          </div>

          <Link href={wizardHref} className="homy-btn w-full justify-between !h-[54px] !rounded-[14px] !text-[15px]">
            <span>See my personalised 24-bank dossier</span>
            <span className="homy-btn__disc" aria-hidden="true">
              <span className="homy-btn__arrow-track">
                <ArrowRight size={15} strokeWidth={2.2} />
                <ArrowRight size={15} strokeWidth={2.2} />
              </span>
            </span>
          </Link>

          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-xs text-[#6c6c89]">
            <span className="inline-flex items-center gap-1">
              <Check size={13} className="text-[#179373]" /> No commitment
            </span>
            <span className="inline-flex items-center gap-1">
              <Check size={13} className="text-[#179373]" /> Zero AECB credit score impact
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
