'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Building2, CheckCircle2, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { SPRING_INSTITUTIONAL, SwissSpotlightCard } from '@/components/ui/MotionPrimitives';
import { BANKS } from '@/data/banks';
import { cashToClose } from '@/lib/math';

const CONVENTIONAL = BANKS.filter((b) => b.type === 'Conventional').slice(0, 6);
const ISLAMIC = BANKS.filter((b) => b.type === 'Islamic').slice(0, 6);

const BUYER_PROFILES = [
  { id: 'resident', idx: 0, ltv: 80, downPct: 20, samplePrice: 2_000_000 },
  { id: 'national', idx: 1, ltv: 85, downPct: 15, samplePrice: 2_500_000 },
  { id: 'overseas', idx: 2, ltv: 60, downPct: 40, samplePrice: 3_000_000 },
] as const;

/**
 * Band 3 (Architectural Stone #F7F8FA):
 * Part A — 4-Mandate Swiss Hairline Spotlight Bento Grid (100% localized across 6 languages).
 * Part B — Preserved Interactive 2-Column Institutional Workbench:
 *   Card 1: Conventional vs Islamic 24-Bank Switcher & Logo Pagination
 *   Card 2: Expat / UAE National / Global Investor 4% DLD & Closing-Cost Breakdown + BetterClose Concierge
 */
export default function InteractiveAdvisoryCards() {
  const { currency, formatMoney, t, ext, swiss } = useLocaleCurrency();
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
    }, 5600);
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
    <section className="holo-section holo-section--mint" aria-labelledby="two-cards-title">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="homy-tag">
              <span className="homy-tag__ring" aria-hidden="true" />
              <span>{t.twoCards.eyebrow}</span>
            </span>
            <h2 id="two-cards-title" className="holo-display-h2">
              {t.twoCards.heading}
            </h2>
            <p className="holo-lead max-w-xl" data-aeo-answer="true">
              {t.twoCards.sub}
            </p>
          </div>
          <Link href="/mortgages" className="homy-btn homy-btn--outline bw-btn--sm">
            <span>{t.twoCards.card1Secondary}</span>
          </Link>
        </div>

        {/* Part A: 4-Mandate Swiss Hairline Spotlight Bento Grid */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {swiss.mandates.map((item, idx) => (
            <SwissSpotlightCard key={item.href} className="flex h-full flex-col justify-between p-6">
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-[7px] bg-[#edf7f4] px-2.5 py-1 font-mono text-[10.5px] font-semibold text-[#0e6954]">
                    {item.badge}
                  </span>
                  <span className="num text-[11px] font-medium text-[#94a3b8]">0{idx + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-[#070e1a]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#4a5568]">{item.body}</p>
              </div>
              <Link
                href={item.href}
                className="relative z-10 mt-5 inline-flex items-center gap-1.5 border-t border-[#e3e7ee] pt-4 text-xs font-semibold text-[#070e1a] transition hover:text-[#0e6954]"
              >
                <span>{item.cta}</span>
                <ArrowRight size={13} />
              </Link>
            </SwissSpotlightCard>
          ))}
        </div>

        {/* Part B: Preserved Interactive 2-Column Institutional Workbench */}
        <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-2">
          {/* Card 1: Interactive 24-Bank Conventional / Islamic Directory Switcher */}
          <SwissSpotlightCard className="flex h-full flex-col">
            <div className="bw-fintech-stage !rounded-none !border-0 !border-b !border-white/10 p-6">
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-white">
                  <img src="/brand/icon.png" alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                  {t.twoCards.card1Badge}
                </span>

                <div
                  role="tablist"
                  aria-label="Lender structure"
                  className="inline-flex rounded-[10px] border border-white/15 bg-[#070e1a] p-1"
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
                        className={`relative rounded-[7px] px-3 py-1 text-[11px] font-semibold transition cursor-pointer ${
                          active ? 'text-[#070e1a]' : 'text-white/75 hover:text-white'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="bw-card1-track"
                            transition={reduce ? { duration: 0 } : SPRING_INSTITUTIONAL}
                            className="absolute inset-0 rounded-[7px] bg-white"
                          />
                        )}
                        <span className="relative z-10">
                          {track === 'Conventional' ? ext.cardsUi.conventional : ext.cardsUi.islamic}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative z-10 mt-5 grid grid-cols-3 gap-2.5">
                {visibleBanks.map((bank) => (
                  <Link
                    key={bank.key}
                    href={`/rates/${bank.slug}`}
                    className="flex flex-col items-center justify-between rounded-[12px] border border-white/12 bg-white p-3 text-center transition hover:border-[#d7b158]"
                  >
                    <div className="flex h-9 w-full items-center justify-center">
                      <img
                        src={bank.logo}
                        alt={bank.name}
                        width={96}
                        height={24}
                        className="h-6 w-[96px] object-contain"
                      />
                    </div>
                    <span className="mt-2 truncate w-full text-[11px] font-semibold text-[#070e1a]">
                      {bank.name}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="relative z-10 mt-4 flex items-center justify-between text-[11px] text-white/68">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-[#34dfac]" />
                  {ext.cardsUi.writtenFol}
                </span>
                <div className="inline-flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Previous banks"
                    onClick={() => setBankPage((p) => (p - 1 + pageCount) % pageCount)}
                    className="grid h-7 w-7 place-items-center rounded-[7px] border border-white/15 bg-white/5 text-white hover:bg-white/15 cursor-pointer"
                  >
                    <ChevronLeft size={13} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next banks"
                    onClick={() => setBankPage((p) => (p + 1) % pageCount)}
                    className="grid h-7 w-7 place-items-center rounded-[7px] border border-white/15 bg-white/5 text-white hover:bg-white/15 cursor-pointer"
                  >
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-1 flex-col justify-between bg-white p-6 sm:p-7">
              <div>
                <h3 className="font-display text-xl font-bold leading-snug text-[#070e1a]">
                  {t.twoCards.card1Title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#4a5568]">{t.twoCards.card1Desc}</p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#e3e7ee] pt-5">
                <Link href="/get-started" className="homy-btn bw-btn--sm">
                  <span>{t.twoCards.card1Cta}</span>
                  <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
                    <span className="homy-btn__arrow-track">
                      <ArrowRight size={13} strokeWidth={2.2} />
                      <ArrowRight size={13} strokeWidth={2.2} />
                    </span>
                  </span>
                </Link>
                <Link href="/rates" className="homy-btn homy-btn--outline bw-btn--sm">
                  {t.twoCards.card1Secondary}
                </Link>
              </div>
            </div>
          </SwissSpotlightCard>

          {/* Card 2: Interactive Buyer Profile & 4% DLD Breakdown + BetterClose */}
          <SwissSpotlightCard className="flex h-full flex-col">
            <div className="bw-fintech-stage !rounded-none !border-0 !border-b !border-white/10 p-6">
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-white">
                  <Building2 size={14} className="text-[#d7b158]" />
                  {t.twoCards.card2Badge}
                </span>

                <div
                  role="tablist"
                  aria-label="Buyer profile"
                  className="inline-flex rounded-[10px] border border-white/15 bg-[#070e1a] p-1"
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
                        className={`relative rounded-[7px] px-2.5 py-1 text-[11px] font-semibold transition cursor-pointer ${
                          active ? 'text-[#070e1a]' : 'text-white/75 hover:text-white'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="bw-card2-profile"
                            transition={reduce ? { duration: 0 } : SPRING_INSTITUTIONAL}
                            className="absolute inset-0 rounded-[7px] bg-white"
                          />
                        )}
                        <span className="relative z-10">{ext.cardsUi.buyerShort[prof.idx]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative z-10 mt-5 grid grid-cols-3 gap-2.5">
                <div className="rounded-[12px] border border-white/12 bg-[#070e1a] p-3">
                  <p className="text-[10.5px] text-white/58">{ext.cardsUi.propertyWord}</p>
                  <p className="num mt-1 text-sm font-bold text-white">{formatMoney(activeProfile.samplePrice)}</p>
                </div>
                <div className="rounded-[12px] border border-white/12 bg-[#070e1a] p-3">
                  <p className="text-[10.5px] text-white/58">{ext.cardsUi.dldTitle}</p>
                  <p className="num mt-1 text-sm font-bold text-[#34dfac]">{formatMoney(closing.dld)}</p>
                </div>
                <div className="rounded-[12px] border border-white/12 bg-[#070e1a] p-3">
                  <p className="text-[10.5px] text-white/58">{ext.cardsUi.maxLtvWord}</p>
                  <p className="num mt-1 text-sm font-bold text-[#fcf1b7]">{activeProfile.ltv}% LTV</p>
                </div>
              </div>

              <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/70">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#34dfac]" />
                  {ext.cardsUi.buyerNotes[activeProfile.idx]}
                </span>
                <span className="num font-semibold text-white">
                  {currency} · {ext.cardsUi.totalWord}: {formatMoney(closing.total)}
                </span>
              </div>
            </div>

            <div className="relative z-10 flex flex-1 flex-col justify-between bg-white p-6 sm:p-7">
              <div>
                <h3 className="font-display text-xl font-bold leading-snug text-[#070e1a]">
                  {t.twoCards.card2Title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#4a5568]">{t.twoCards.card2Desc}</p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#e3e7ee] pt-5">
                <Link href="/concierge" className="homy-btn bw-btn--sm">
                  <span>{t.twoCards.card2Cta}</span>
                  <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
                    <span className="homy-btn__arrow-track">
                      <ArrowRight size={13} strokeWidth={2.2} />
                      <ArrowRight size={13} strokeWidth={2.2} />
                    </span>
                  </span>
                </Link>
                <Link href="/mortgages" className="homy-btn homy-btn--outline bw-btn--sm">
                  {t.twoCards.card2Secondary}
                </Link>
              </div>
            </div>
          </SwissSpotlightCard>
        </div>
      </div>
    </section>
  );
}
