'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BookOpen, Headphones, Sparkles, X } from 'lucide-react';
import OsLiveChat from '@/components/OsLiveChat';
import CoPilot from '@/components/CoPilot';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { SPRING_INSTITUTIONAL } from '@/components/ui/MotionPrimitives';
import { waLink } from '@/data/site';
import { trackEvent } from '@/lib/analytics';

/**
 * Unified Swiss / DIFC Executive Concierge Dock — replaces colliding bottom-left/right widgets
 * with ONE calm Midnight Navy + Champagne Gold hairline pill opening a tabbed drawer combining:
 * 1) Live Advisor Desk (two-way Betterway OS v3 sync via OsLiveChat)
 * 2) CBUAE Mortgage Guide (deterministic math Q&A via CoPilot, localized for EN & AR)
 * Plus a locale-aware footer action (Priority Offers modal on EN/intl routes, /ar#rates on Arabic RTL).
 */
export default function ExecutiveConciergeDock({
  showHotOffersTrigger = true,
}: {
  showHotOffersTrigger?: boolean;
}) {
  const { locale, swiss } = useLocaleCurrency();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'live' | 'guide'>('live');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const openOffers = () => {
    setOpen(false);
    trackEvent('hot_offers_trigger_click', { variant: 'concierge_dock' });
    window.dispatchEvent(new CustomEvent('bw:open-hot-offers'));
  };

  return (
    <div className="fixed bottom-5 end-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.aside
            key="bw-concierge-drawer"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={reduce ? { duration: 0 } : SPRING_INSTITUTIONAL}
            role="dialog"
            aria-label={swiss.concierge.launcher}
            className="mb-3 flex h-[min(560px,80dvh)] w-[min(410px,calc(100vw-24px))] flex-col overflow-hidden rounded-[20px] border border-[#e3e7ee] bg-white shadow-[0_32px_90px_-24px_rgba(7,14,26,0.45)]"
          >
            {/* Midnight Navy Executive Header */}
            <div className="bg-[#070e1a] px-4 pb-3 pt-4 text-white">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-[#d7b158]/35 bg-[#0c1524]">
                    <img src="/brand/icon.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                    <span className="absolute -bottom-0.5 -end-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#070e1a] bg-[#34dfac]" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold leading-tight text-white">
                      {swiss.concierge.launcher}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#fcf1b7]">{swiss.concierge.deskSubtitle}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close Advisory Desk"
                  className="grid h-8 w-8 place-items-center rounded-[9px] bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {/* 2-Tab Institutional Switcher */}
              <div
                role="tablist"
                aria-label="Advisory concierge modes"
                className="mt-3 grid grid-cols-2 gap-1 rounded-[11px] border border-white/12 bg-[#0c1524] p-1"
              >
                {(
                  [
                    ['live', swiss.concierge.tabLive, Headphones],
                    ['guide', swiss.concierge.tabGuide, BookOpen],
                  ] as const
                ).map(([key, label, Icon]) => {
                  const active = tab === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setTab(key)}
                      className={`relative inline-flex items-center justify-center gap-1.5 rounded-[8px] px-2.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                        active ? 'text-[#070e1a]' : 'text-white/72 hover:text-white'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="bw-concierge-tab"
                          transition={reduce ? { duration: 0 } : SPRING_INSTITUTIONAL}
                          className="absolute inset-0 rounded-[8px] bg-white"
                          aria-hidden="true"
                        />
                      )}
                      <Icon size={13} className="relative z-10" />
                      <span className="relative z-10">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Tab Body */}
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              {tab === 'live' ? (
                <OsLiveChat embedded />
              ) : (
                <CoPilot embedded onNavigate={() => setOpen(false)} />
              )}
            </div>

            {/* Locale-Aware Footer Strip */}
            <div className="flex items-center justify-between gap-2 border-t border-[#e3e7ee] bg-[#f7f8fa] px-4 py-2 text-[11px] font-semibold">
              {showHotOffersTrigger ? (
                <button
                  type="button"
                  onClick={openOffers}
                  className="inline-flex items-center gap-1.5 text-[#070e1a] transition hover:text-[#0e6954] cursor-pointer"
                >
                  <Sparkles size={12} className="text-[#8a6518]" />
                  <span>{swiss.concierge.priorityOffersBtn}</span>
                </button>
              ) : (
                <Link
                  href="/ar#rates"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 text-[#070e1a] transition hover:text-[#0e6954]"
                >
                  <Sparkles size={12} className="text-[#8a6518]" />
                  <span>{swiss.concierge.ratesDirectoryLink}</span>
                </Link>
              )}
              <a
                href={waLink(
                  locale === 'ar'
                    ? 'مرحباً بيترواي، أرغب في التواصل مع مكتب الاستشارات.'
                    : 'Hi Betterway Mortgages, continuing from the Advisory Desk.',
                )}
                rel="noopener"
                className="text-[#0e6954] hover:underline"
              >
                WhatsApp ↗
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Single Calm Executive Launcher Pill */}
      <button
        type="button"
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) trackEvent('os_live_chat_open', { locale, source: 'concierge_dock' });
        }}
        aria-expanded={open}
        aria-label={swiss.concierge.launcher}
        className="inline-flex h-11 items-center gap-2.5 rounded-full border border-[#d7b158]/50 bg-[#070e1a] px-4 text-xs font-semibold text-white shadow-[0_18px_40px_-14px_rgba(7,14,26,0.55)] transition duration-200 hover:-translate-y-0.5 hover:border-[#d7b158] sm:h-12 sm:px-5 sm:text-[13px] cursor-pointer"
      >
        <span className="bw-live-dot" aria-hidden="true" />
        <img src="/brand/icon.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
        <span className="hidden sm:inline">{swiss.concierge.launcher}</span>
        <span className="sm:hidden">{swiss.concierge.mobileLauncher}</span>
      </button>
    </div>
  );
}
