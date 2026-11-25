'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Building2, CheckCircle2, ChevronLeft, ChevronRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { BANKS } from '@/data/banks';
import { cashToClose } from '@/lib/math';

const CONVENTIONAL = BANKS.filter((b) => b.type === 'Conventional').slice(0, 6);
const ISLAMIC = BANKS.filter((b) => b.type === 'Islamic').slice(0, 6);

const BUYER_PROFILES = [
  { id: 'resident', label: 'Expat Resident', ltv: 80, downPct: 20, samplePrice: 2_000_000, note: 'Up to 80% LTV · 1st property up to AED 5M' },
  { id: 'national', label: 'UAE National', ltv: 85, downPct: 15, samplePrice: 2_500_000, note: 'Up to 85% LTV · 1st property up to AED 5M' },
  { id: 'overseas', label: 'Global Investor', ltv: 60, downPct: 40, samplePrice: 3_000_000, note: '25+ countries · Remote POA closing support' },
] as const;

function trackSpotlight(e: MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
}

/**
 * Symmetric, consistent 21st.dev interactive two-card showcase right below the hero.
 * Concise and illustrative by design (mirroring top brokerage simplicity): educates clients cleanly
 * on the two essentials, then routes deeper enquiries directly to 1-on-1 Dubai advisors.
 */
export default function InteractiveAdvisoryCards() {
  const { currency, formatMoney, t } = useLocaleCurrency();
  const reduce = useReducedMotion();

  const [bankTrack, setBankTrack] = useState<'Conventional' | 'Islamic'>('Conventional');
  const [bankPage, setBankPage] = useState(0);
  const [profileIdx, setProfileIdx] = useState(0);

  const bankList = bankTrack === 'Conventional' ? CONVENTIONAL : ISLAMIC;
  const pageCount = Math.ceil(bankList.length / 3);
  const visibleBanks = bankList.slice(bankPage * 3, bankPage * 3 + 3);

  // Smooth gentle auto-rotation across the 2 pages of bank cards (pauses gracefully when reduced motion)
  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => {
      setBankPage((p) => (p + 1) % pageCount);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [pageCount, reduce, bankTrack]);

  const activeProfile = BUYER_PROFILES[profileIdx];
  const closing = cashToClose({
    price: activeProfile.samplePrice,
    downPct: activeProfile.downPct,
    agency: false,
    offPlanHandover: false,
  });

  return (
    <section className="holo-section" aria-labelledby="two-cards-title">
      <div className="mx-auto max-w-[1220px]">
        <div className="max-w-3xl space-y-3.5">
          <span className="homy-tag">
            <span className="homy-tag__ring" aria-hidden="true" />
            <span>{t.twoCards.eyebrow}</span>
          </span>
          <h2 id="two-cards-title" className="holo-display-h2">
            {t.twoCards.heading}
          </h2>
          <p className="holo-lead max-w-2xl" data-aeo-answer="true">
            {t.twoCards.sub}
          </p>
        </div>

        {/* Exact Symmetric 2-Column 21st.dev Interactive Cards */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* CARD 1: Interactive 24-Bank Conventional / Islamic Carousel */}
          <div onMouseMove={trackSpotlight} className="bw-21-card flex flex-col">
            <div className="holo-visual-stage !min-h-[340px] !rounded-none !border-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  <img src="/brand/icon.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
                  {t.twoCards.card1Badge}
                </span>

                {/* 21st.dev Morphing Track Switcher */}
                <div
                  role="tablist"
                  aria-label="Lender structure"
                  className="inline-flex rounded-full border border-white/15 bg-[#070e1a]/75 p-1"
                >
                  {(['Conventional', 'Islamic'] as const).map((track) => {
                    const active = bankTrack === track;
                    return (
                      <button
                        key={track}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => {
                          setBankTrack(track);
                          setBankPage(0);
                        }}
                        className={`relative rounded-full px-3 py-1 text-[11px] font-bold transition cursor-pointer ${
                          active ? 'text-[#0a1424]' : 'text-white/75 hover:text-white'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="bw-card1-track"
                            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32 }}
                            className="absolute inset-0 rounded-full bg-white"
                          />
                        )}
                        <span className="relative z-10">{track}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Animated 3-Row Bank Mini-Carousel (Instant zero-blank transition) */}
              <div className="my-5 min-h-[196px]">
                <motion.div
                  key={`${bankTrack}-${bankPage}`}
                  initial={reduce ? false : { opacity: 0.45, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-2.5"
                >
                  {visibleBanks.map((bank, idx) => (
                    <Link
                      key={bank.key}
                      href={`/rates/${bank.slug}`}
                      className={`flex items-center justify-between gap-3 rounded-[15px] border px-4 py-3 transition ${
                        idx === 0
                          ? 'border-[#d7b158]/60 bg-white text-[#0a1424] shadow-md'
                          : 'border-white/12 bg-white/[0.07] text-white hover:bg-white/[0.14]'
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="grid h-9 w-16 shrink-0 place-items-center rounded-[9px] bg-white p-1.5">
                          <img src={bank.logo} alt={bank.name} className="max-h-5 max-w-full object-contain" loading="lazy" />
                        </span>
                        <div className="min-w-0">
                          <p className={`truncate font-display text-sm font-bold ${idx === 0 ? 'text-[#0a1424]' : 'text-white'}`}>
                            {bank.name}
                          </p>
                          <p className={`text-[11.5px] ${idx === 0 ? 'text-[#4f596b]' : 'text-white/65'}`}>
                            {bank.type} · {bank.hq} · Written FOL terms
                          </p>
                        </div>
                      </div>
                      <ArrowRight size={15} className={`shrink-0 ${idx === 0 ? 'text-[#0e6954]' : 'text-white/65'}`} />
                    </Link>
                  ))}
                </motion.div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-[11.5px] text-white/65">Neutral 24-bank directory · Zero AECB score impact</p>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setBankPage((p) => (p - 1 + pageCount) % pageCount)}
                    aria-label="Previous banks"
                    className="grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-[#0a1424] cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setBankPage((p) => (p + 1) % pageCount)}
                    aria-label="Next banks"
                    className="grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-[#0a1424] cursor-pointer"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
              <div>
                <h3 className="font-display text-2xl font-bold leading-snug text-[#0a1424]">
                  {t.twoCards.card1Title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4f596b]">{t.twoCards.card1Desc}</p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/get-started" className="homy-btn">
                  <span>{t.twoCards.card1Cta}</span>
                  <span className="homy-btn__disc" aria-hidden="true">
                    <span className="homy-btn__arrow-track">
                      <ArrowRight size={14} strokeWidth={2.2} />
                      <ArrowRight size={14} strokeWidth={2.2} />
                    </span>
                  </span>
                </Link>
                <Link href="/rates" className="homy-btn homy-btn--outline">
                  {t.twoCards.card1Secondary}
                </Link>
              </div>
            </div>
          </div>

          {/* CARD 2: Interactive Multi-Currency BetterClose Upfront Cash & 4% DLD Snapshot */}
          <div onMouseMove={trackSpotlight} className="bw-21-card flex flex-col">
            <div className="holo-visual-stage !min-h-[340px] !rounded-none !border-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  <Building2 size={14} className="text-[#f1d57e]" />
                  {t.twoCards.card2Badge}
                </span>

                {/* 21st.dev Morphing Buyer Profile Switcher */}
                <div
                  role="tablist"
                  aria-label="Buyer profile"
                  className="inline-flex rounded-full border border-white/15 bg-[#070e1a]/75 p-1"
                >
                  {BUYER_PROFILES.map((prof, idx) => {
                    const active = profileIdx === idx;
                    return (
                      <button
                        key={prof.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setProfileIdx(idx)}
                        className={`relative rounded-full px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${
                          active ? 'text-[#0a1424]' : 'text-white/75 hover:text-white'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="bw-card2-profile"
                            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32 }}
                            className="absolute inset-0 rounded-full bg-white"
                          />
                        )}
                        <span className="relative z-10">{prof.label.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Animated Multi-Currency Deposit + 4% DLD Snapshot (Instant zero-blank switch) */}
              <div className="my-5 min-h-[196px]">
                <motion.div
                  key={`${activeProfile.id}-${currency}`}
                  initial={reduce ? false : { opacity: 0.45, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[18px] border border-white/15 bg-white/[0.07] p-5 backdrop-blur-md"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/12 pb-3.5">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#34dfac]">
                        {activeProfile.label} · {activeProfile.ltv}% Max LTV
                      </p>
                      <p className="num mt-1 font-display text-2xl font-extrabold text-white">
                        {formatMoney(activeProfile.samplePrice)} <span className="text-xs font-medium text-white/65">home</span>
                      </p>
                    </div>
                    <span className="rounded-full bg-[#179373]/25 px-3 py-1 text-xs font-bold text-[#f1d57e]">
                      {currency} Live View
                    </span>
                  </div>

                  <div className="mt-3.5 grid grid-cols-3 gap-2.5 text-xs">
                    <div className="rounded-[12px] bg-[#070e1a]/65 p-3">
                      <p className="text-[10.5px] text-white/60">Deposit ({activeProfile.downPct}%)</p>
                      <p className="num mt-1 font-bold text-white">{formatMoney(closing.down)}</p>
                    </div>
                    <div className="rounded-[12px] bg-[#070e1a]/65 p-3">
                      <p className="text-[10.5px] text-white/60">4% DLD + Title</p>
                      <p className="num mt-1 font-bold text-[#f1d57e]">{formatMoney(closing.dld)}</p>
                    </div>
                    <div className="rounded-[12px] bg-[#070e1a]/65 p-3">
                      <p className="text-[10.5px] text-white/60">Loan ({activeProfile.ltv}%)</p>
                      <p className="num mt-1 font-bold text-[#34dfac]">{formatMoney(closing.loan)}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="flex items-center justify-between gap-2 text-[11.5px] text-white/65">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#34dfac]" />
                  {activeProfile.note}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
              <div>
                <h3 className="font-display text-2xl font-bold leading-snug text-[#0a1424]">
                  {t.twoCards.card2Title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4f596b]">{t.twoCards.card2Desc}</p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/concierge" className="homy-btn">
                  <span>{t.twoCards.card2Cta}</span>
                  <span className="homy-btn__disc" aria-hidden="true">
                    <span className="homy-btn__arrow-track">
                      <ArrowRight size={14} strokeWidth={2.2} />
                      <ArrowRight size={14} strokeWidth={2.2} />
                    </span>
                  </span>
                </Link>
                <Link href="/contact" className="homy-btn homy-btn--outline">
                  {t.twoCards.card2Secondary}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Crisp 1-on-1 Concierge Strip ("Don't overload — for tailored policy guidance, contact us") */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#dce7e2] bg-[#eef7f4] px-6 py-4">
          <div className="flex items-center gap-3 text-sm font-medium text-[#0a1424]">
            <ShieldCheck size={18} className="shrink-0 text-[#0e6954]" />
            <span>{t.twoCards.moreInfoPrompt}</span>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#0a1424] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#0e6954]"
          >
            <MessageSquare size={13} className="text-[#f1d57e]" />
            <span>{t.twoCards.speakAdvisor}</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
