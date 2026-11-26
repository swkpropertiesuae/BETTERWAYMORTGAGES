'use client';

import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, Lock, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { BANKS } from '@/data/banks';

const SAMPLE_BANKS = [
  BANKS.find((b) => b.key === 'ENBD') ?? BANKS[0],
  BANKS.find((b) => b.key === 'FAB') ?? BANKS[1],
  BANKS.find((b) => b.key === 'DIB') ?? BANKS[2],
];

/**
 * 21st.dev Animated Floating MacBook + iPhone Betterway Fintech Dashboard Mockup.
 * Syncs live with CBUAE 3M EIBOR and the user's selected display currency (AED/USD/GBP/EUR/SAR/RUB/CNY/INR).
 */
export default function FloatingDeviceMockups() {
  const { data } = useBenchmark();
  const { currency, formatMoney, formatCompact } = useLocaleCurrency();
  const reduce = useReducedMotion();

  const eibor = data.latest.threeMonth.toFixed(2);

  return (
    <div
      className="relative mx-auto w-full max-w-[560px] select-none py-4 lg:py-2"
      aria-label="Interactive preview of Betterway Mortgages desktop and mobile dashboard"
    >
      {/* Ambient Fintech Halo behind Floating Devices */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-full opacity-75 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 38% 35%, rgba(0, 214, 154, 0.28), transparent 58%), radial-gradient(circle at 75% 70%, rgba(247, 195, 62, 0.26), transparent 56%)',
        }}
      />

      {/* Top Floating Micro-Pill: Live CBUAE Status */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-2 end-2 z-20 hidden items-center gap-2 rounded-full border border-white/25 bg-[#070d19]/85 px-3.5 py-1.5 text-[11px] font-bold text-white shadow-[0_14px_34px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:inline-flex"
      >
        <span className="h-2 w-2 rounded-full bg-[#00d69a] shadow-[0_0_8px_#00d69a]" />
        <span>BetterCore Live</span>
        <span className="num text-[#ffe074]">3M EIBOR {eibor}%</span>
      </motion.div>

      {/* FLOATING LAPTOP FRAME (MacBook Pro Fintech Console) */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20, scale: 0.97 }}
        animate={reduce ? undefined : { opacity: 1, y: [0, -7, 0], scale: 1 }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 6.4, repeat: Infinity, ease: 'easeInOut' },
              }
        }
        className="relative z-10 w-[92%] sm:w-[90%]"
      >
        {/* Metallic Outer Lid */}
        <div className="rounded-[20px] border border-white/25 bg-gradient-to-b from-[#1e293b] to-[#0b1220] p-[7px] shadow-[0_36px_80px_-24px_rgba(4,9,20,0.85)]">
          {/* Inner Fintech Dashboard Screen */}
          <div className="bw-fintech-stage !min-h-0 !rounded-[14px] !p-4 sm:!p-5">
            {/* Browser Top Chrome */}
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-[10px] font-medium text-white/80">
                <Lock size={9} className="text-[#00d69a]" />
                <span>betterwaymortgages.com/bettercore</span>
              </div>
              <img
                src="/brand/icon.png"
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] object-contain"
              />
            </div>

            {/* Live KPI Bento Row */}
            <div className="mt-3.5 grid grid-cols-2 gap-2.5">
              <div className="rounded-[12px] border border-white/12 bg-white/[0.06] p-3">
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-white/60">
                  <span>Max 80% LTV Plan</span>
                  <TrendingUp size={11} className="text-[#00d69a]" />
                </div>
                <p className="num mt-1 font-display text-lg font-extrabold text-white sm:text-xl">
                  {formatCompact(2_000_000)}
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[80%] rounded-full bg-gradient-to-r from-[#00d69a] to-[#ffe074]" />
                </div>
              </div>

              <div className="rounded-[12px] border border-white/12 bg-white/[0.06] p-3">
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-white/60">
                  <span>CBUAE DBR Cap</span>
                  <ShieldCheck size={11} className="text-[#ffe074]" />
                </div>
                <p className="num mt-1 font-display text-lg font-extrabold text-[#00d69a] sm:text-xl">
                  50% Safe
                </p>
                <p className="mt-1.5 text-[10px] text-white/65">
                  24 Banks · {currency} Live View
                </p>
              </div>
            </div>

            {/* Live 24-Bank Neutral Panel Preview */}
            <div className="mt-3 space-y-1.5">
              {SAMPLE_BANKS.map((bank, i) => (
                <div
                  key={bank.key}
                  className={`flex items-center justify-between gap-2 rounded-[11px] border px-2.5 py-2 ${
                    i === 0
                      ? 'border-[#ffe074]/45 bg-white text-[#070d19]'
                      : 'border-white/10 bg-white/[0.05] text-white'
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="grid h-6 w-12 shrink-0 place-items-center rounded-[6px] bg-white p-1">
                      <img src={bank.logo} alt={bank.name} className="max-h-4 max-w-full object-contain" />
                    </span>
                    <div className="min-w-0">
                      <p className={`truncate text-[11px] font-bold ${i === 0 ? 'text-[#070d19]' : 'text-white'}`}>
                        {bank.name}
                      </p>
                      <p className={`text-[9.5px] ${i === 0 ? 'text-[#475569]' : 'text-white/60'}`}>
                        {bank.type} · Written FOL audit
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-bold ${
                      i === 0 ? 'bg-[#eef7f4] text-[#0a664d]' : 'bg-white/10 text-[#00d69a]'
                    }`}
                  >
                    Matched
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sleek MacBook Aluminum Hinge & Deck Base */}
        <div className="mx-auto h-2.5 w-[104%] -translate-x-[2%] rounded-b-[14px] border-t border-white/30 bg-gradient-to-b from-[#cbd5e1] via-[#94a3b8] to-[#64748b] shadow-[0_14px_28px_-10px_rgba(0,0,0,0.65)]">
          <div className="mx-auto h-1 w-16 rounded-b-full bg-[#475569]/75" />
        </div>
      </motion.div>

      {/* FLOATING OVERLAPPING IPHONE 16 PRO MOCKUP (BetterVault Mobile App) */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 26, scale: 0.94 }}
        animate={reduce ? undefined : { opacity: 1, y: [0, 8, 0], scale: 1 }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                opacity: { duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 5.2, repeat: Infinity, ease: 'easeInOut' },
              }
        }
        className="absolute -bottom-3 end-0 z-20 w-[166px] sm:-bottom-4 sm:end-1 sm:w-[192px]"
      >
        <div className="rounded-[28px] border-[2px] border-white/35 bg-[#090f1d] p-[6px] shadow-[0_32px_68px_-16px_rgba(0,0,0,0.88)]">
          <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-b from-[#0b162a] via-[#070e1c] to-[#050914] px-3 pb-3.5 pt-5 text-white">
            {/* Dynamic Island */}
            <div className="mx-auto mb-2.5 h-2.5 w-12 rounded-full bg-black" />

            {/* Mobile App Header */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-[#ffe074]">
                <Sparkles size={10} /> BetterVault
              </span>
              <span className="rounded-full bg-[#00d69a]/20 px-1.5 py-0.5 text-[8.5px] font-bold text-[#00d69a]">
                LIVE
              </span>
            </div>

            {/* Live Monthly Snapshot */}
            <div className="mt-2 rounded-[12px] border border-white/12 bg-white/[0.07] p-2.5">
              <p className="text-[8.5px] font-semibold uppercase tracking-wider text-white/60">
                Est. Monthly ({currency})
              </p>
              <p className="num mt-0.5 font-display text-sm font-extrabold text-white sm:text-base">
                {formatMoney(8_614)}
              </p>
              <p className="num mt-0.5 text-[8.5px] text-[#00d69a]">
                4% DLD {formatCompact(80_580)}
              </p>
            </div>

            {/* 3-Stage Live Tracker */}
            <ul className="mt-2.5 space-y-1.5 text-[9.5px]">
              {[
                ['50% DBR Verified', true],
                ['24 Banks Ranked', true],
                ['DLD Keys Ready', false],
              ].map(([lbl, done]) => (
                <li key={lbl as string} className="flex items-center gap-1.5 text-white/85">
                  <CheckCircle2
                    size={11}
                    className={done ? 'shrink-0 text-[#00d69a]' : 'shrink-0 text-[#ffe074]'}
                  />
                  <span className="truncate font-medium">{lbl as string}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Bottom-Left Floating Trust Badge */}
      <motion.div
        animate={reduce ? undefined : { y: [0, 5, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-2 start-2 z-20 hidden items-center gap-2 rounded-full border border-white/20 bg-white/92 px-3 py-1.5 text-[11px] font-bold text-[#070d19] shadow-xl backdrop-blur-md sm:inline-flex"
      >
        <ShieldCheck size={13} className="text-[#0e6954]" />
        <span>Zero AECB Credit Impact</span>
      </motion.div>
    </div>
  );
}
