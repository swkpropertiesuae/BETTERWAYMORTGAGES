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
  { id: 'resident', label: 'Expat Resident', short: 'Expat', ltv: 80, downPct: 20, samplePrice: 2_000_000, note: 'Up to 80% LTV · 1st property up to AED 5M' },
  { id: 'national', label: 'UAE National', short: 'UAE', ltv: 85, downPct: 15, samplePrice: 2_500_000, note: 'Up to 85% LTV · 1st property up to AED 5M' },
  { id: 'overseas', label: 'Global Investor', short: 'Global', ltv: 60, downPct: 40, samplePrice: 3_000_000, note: '25+ countries · Remote POA closing support' },
] as const;

function trackSpotlight(e: MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
}

/**
 * 100% Pixel-Locked Symmetric 21st.dev Fintech Two-Card Showcase.
 * Both cards share identical dark fintech stage height (352px), exact header/body/footer grid geometry,
 * equalized 2-line heading height, equalized 3-line summary height, and flush-aligned CTA buttons.
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

        {/* Exact Pixel-Locked Symmetric 2-Column 21st.dev Fintech Cards */}
        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
          {/* CARD 1: 24-Bank Advisory Desk */}
          <div onMouseMove={trackSpotlight} className="bw-21-card flex h-full flex-col">
            <div className="bw-fintech-stage !h-[356px] !rounded-none !border-0">
              {/* Row 1: Identical 36px Stage Header */}
              <div className="relative z-10 flex h-9 items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  <img src="/brand/icon.png" alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                  {t.twoCards.card1Badge}
                </span>

                <div
                  role="tablist"
                  aria-label="Lender structure"
                  className="inline-flex rounded-full border border-white/15 bg-[#060c18]/80 p-1"
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
                          active ? 'text-[#070d19]' : 'text-white/75 hover:text-white'
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

              {/* Row 2: Identical 212px Center Interactive Fintech Canvas */}
              <div className="relative z-10 flex h-[212px] flex-col justify-center">
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
                      className={`flex h-[62px] items-center justify-between gap-3 rounded-[14px] border px-3.5 transition ${
                        idx === 0
                          ? 'border-[#ffe074]/55 bg-white text-[#070d19] shadow-md'
                          : 'border-white/12 bg-white/[0.06] text-white hover:bg-white/[0.12]'
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="grid h-9 w-16 shrink-0 place-items-center rounded-[8px] bg-white p-1.5">
                          <img src={bank.logo} alt={bank.name} className="max-h-5 max-w-full object-contain" loading="lazy" />
                        </span>
                        <div className="min-w-0">
                          <p className={`truncate font-display text-sm font-bold leading-tight ${idx === 0 ? 'text-[#070d19]' : 'text-white'}`}>
                            {bank.name}
                          </p>
                          <p className={`mt-0.5 truncate text-[11px] ${idx === 0 ? 'text-[#475569]' : 'text-white/65'}`}>
                            {bank.type} · {bank.hq} · Written FOL terms
                          </p>
                        </div>
                      </div>
                      <ArrowRight size={15} className={`shrink-0 ${idx === 0 ? 'text-[#0e6954]' : 'text-white/65'}`} />
                    </Link>
                  ))}
                </motion.div>
              </div>

              {/* Row 3: Identical 32px Stage Footer */}
              <div className="relative z-10 flex h-8 items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11.5px] text-white/70">
                  <CheckCircle2 size={13} className="text-[#00d69a]" />
                  Neutral 24-bank directory · Zero AECB score impact
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setBankPage((p) => (p - 1 + pageCount) % pageCount)}
                    aria-label="Previous banks"
                    className="grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-[#070d19] cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setBankPage((p) => (p + 1) % pageCount)}
                    aria-label="Next banks"
                    className="grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-[#070d19] cursor-pointer"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Pixel-Locked Bottom Card Body */}
            <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
              <div>
                <h3 className="min-h-[60px] font-display text-[23px] font-bold leading-[1.24] tracking-[-0.02em] text-[#070d19]">
                  {t.twoCards.card1Title}
                </h3>
                <p className="mt-3 min-h-[72px] text-[14.5px] leading-[1.6] text-[#475569]">
                  {t.twoCards.card1Desc}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#e5e7eb] pt-5">
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

          {/* CARD 2: BetterClose · Buying Desk (100% Pixel-Matched Geometry) */}
          <div onMouseMove={trackSpotlight} className="bw-21-card flex h-full flex-col">
            <div className="bw-fintech-stage !h-[356px] !rounded-none !border-0">
              {/* Row 1: Identical 36px Stage Header */}
              <div className="relative z-10 flex h-9 items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  <Building2 size={14} className="text-[#ffe074]" />
                  {t.twoCards.card2Badge}
                </span>

                <div
                  role="tablist"
                  aria-label="Buyer profile"
                  className="inline-flex rounded-full border border-white/15 bg-[#060c18]/80 p-1"
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
                        className={`relative rounded-full px-3 py-1 text-[11px] font-bold transition cursor-pointer ${
                          active ? 'text-[#070d19]' : 'text-white/75 hover:text-white'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="bw-card2-profile"
                            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32 }}
                            className="absolute inset-0 rounded-full bg-white"
                          />
                        )}
                        <span className="relative z-10">{prof.short}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 2: Identical 212px Center Interactive Fintech Canvas */}
              <div className="relative z-10 flex h-[212px] flex-col justify-center">
                <motion.div
                  key={`${activeProfile.id}-${currency}`}
                  initial={reduce ? false : { opacity: 0.45, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-[206px] flex-col justify-between rounded-[16px] border border-white/15 bg-white/[0.06] p-4 backdrop-blur-md"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/12 pb-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#00d69a]">
                        {activeProfile.label} · {activeProfile.ltv}% Max LTV
                      </p>
                      <p className="num mt-1 font-display text-2xl font-extrabold text-white">
                        {formatMoney(activeProfile.samplePrice)}{' '}
                        <span className="text-xs font-medium text-white/65">property</span>
                      </p>
                    </div>
                    <span className="rounded-full border border-[#ffe074]/35 bg-[#00d69a]/18 px-3 py-1 text-[11px] font-bold text-[#ffe074]">
                      {currency} Live View
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-xs">
                    <div className="rounded-[12px] border border-white/10 bg-[#060c18]/75 p-3">
                      <p className="text-[10.5px] text-white/60">Deposit ({activeProfile.downPct}%)</p>
                      <p className="num mt-1 font-bold text-white">{formatMoney(closing.down)}</p>
                    </div>
                    <div className="rounded-[12px] border border-white/10 bg-[#060c18]/75 p-3">
                      <p className="text-[10.5px] text-white/60">4% DLD + Title</p>
                      <p className="num mt-1 font-bold text-[#ffe074]">{formatMoney(closing.dld)}</p>
                    </div>
                    <div className="rounded-[12px] border border-white/10 bg-[#060c18]/75 p-3">
                      <p className="text-[10.5px] text-white/60">Loan ({activeProfile.ltv}%)</p>
                      <p className="num mt-1 font-bold text-[#00d69a]">{formatMoney(closing.loan)}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Row 3: Identical 32px Stage Footer */}
              <div className="relative z-10 flex h-8 items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11.5px] text-white/70">
                  <CheckCircle2 size={13} className="text-[#00d69a]" />
                  {activeProfile.note}
                </span>
                <span className="num rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[10.5px] font-semibold text-[#ffe074]">
                  Total {formatMoney(closing.total)}
                </span>
              </div>
            </div>

            {/* Pixel-Locked Bottom Card Body (100% Identical Metrics to Card 1) */}
            <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
              <div>
                <h3 className="min-h-[60px] font-display text-[23px] font-bold leading-[1.24] tracking-[-0.02em] text-[#070d19]">
                  {t.twoCards.card2Title}
                </h3>
                <p className="mt-3 min-h-[72px] text-[14.5px] leading-[1.6] text-[#475569]">
                  {t.twoCards.card2Desc}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#e5e7eb] pt-5">
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

        {/* Crisp 1-on-1 Concierge Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#dce7e2] bg-white/85 px-6 py-4 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-3 text-sm font-medium text-[#070d19]">
            <ShieldCheck size={18} className="shrink-0 text-[#0e6954]" />
            <span>{t.twoCards.moreInfoPrompt}</span>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#070d19] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#0e6954]"
          >
            <MessageSquare size={13} className="text-[#ffe074]" />
            <span>{t.twoCards.speakAdvisor}</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
