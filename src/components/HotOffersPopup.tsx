'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  FileDown,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
import { SPRING_INSTITUTIONAL } from '@/components/ui/MotionPrimitives';
import { TEAM_SPECIALISTS } from '@/data/team';
import { BANKS } from '@/data/banks';
import { SITE, waLink } from '@/data/site';
import { buildHeroDossier } from '@/lib/hero-showcase';
import { trackEvent } from '@/lib/analytics';

const HOT_OFFERS = [
  {
    id: 'first-home',
    tab: 'First-Home Desk',
    badge: 'Up to 80% / 85% CBUAE LTV',
    title: 'Compare 24 UAE Banks Before Signing Form F',
    summary:
      'Expat residents (up to 80% LTV) and UAE Nationals (up to 85% LTV) on first properties up to AED 5M — with full 4% DLD fee clarity and stressed 50% DBR verification upfront.',
    highlights: [
      'Conventional & Islamic (Ijara / Murabaha) options side by side',
      'Written post-fixed EIBOR revert margin & floor comparison',
      'Zero upfront advisory consultation fee from our Dubai desk',
    ],
    ctaHref: '/get-started?goal=new-mortgage',
    ctaLabel: 'Review 24-Bank Eligibility',
  },
  {
    id: 'buyout',
    tab: 'Buyout & Refinance',
    badge: '1% / AED 10k Statutory Cap',
    title: 'Audit Your Post-Fixed EIBOR Revert Rate',
    summary:
      'Finished your introductory fixed term? Under CBUAE rules, early settlement exit fees are capped at 1% of remaining balance or AED 10,000 (+5% VAT), whichever is lower.',
    highlights: [
      'Full break-even month analysis against current CBUAE EIBOR',
      'Liability letter & mortgage-to-mortgage settlement coordination',
      'Equity release planning for UAE villas and apartments',
    ],
    ctaHref: '/calculators/buyout-refinance-savings',
    ctaLabel: 'Calculate Your Buyout Break-Even',
  },
  {
    id: 'golden-visa',
    tab: 'Non-Resident & Visa',
    badge: 'AED 2M+ Golden Visa Desk',
    title: 'Overseas Buyers & 10-Year UAE Golden Visa Finance',
    summary:
      'Dedicated international underwriting across 25 countries plus AED 2,000,000+ Title Deed & Oqood Golden Visa eligibility structuring with bank NOC coordination.',
    highlights: [
      'UK, India, USA, Canada, EU, GCC & Asia documentation desk',
      'Remote Power of Attorney & FX remittance milestone guidance',
      'Includes free 2026 UAE Mortgage & DLD PDF Buyer Pack',
    ],
    ctaHref: '/mortgages/non-resident-dubai',
    ctaLabel: 'Explore Non-Resident Financing',
  },
] as const;

const FEMALE_ADVISORS = TEAM_SPECIALISTS.filter(
  (m) => m.slug === 'reshma-rajan' || m.slug === 'rahaba-azeez',
);

/** Manual trigger button that dispatches the global open event for the Priority Offers Desk modal. */
export function HotOffersTrigger({
  label = 'Priority Offers Desk',
  variant = 'hero',
}: {
  label?: string;
  variant?: 'hero' | 'dark';
}) {
  const open = () => {
    trackEvent('hot_offers_trigger_click', { variant });
    window.dispatchEvent(new CustomEvent('bw:open-hot-offers'));
  };

  if (variant === 'dark') {
    return (
      <button
        type="button"
        onClick={open}
        className="inline-flex items-center gap-2 rounded-[10px] border border-[#d7b158]/45 bg-[#070e1a] px-4 py-2 text-xs font-semibold text-white transition hover:border-[#d7b158] cursor-pointer"
      >
        <Sparkles size={13} className="text-[#fcf1b7]" />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      className="bw-hero-chip bw-hero-chip--interactive !border-[#d7b158]/45"
    >
      <Sparkles size={12} className="text-[#fcf1b7]" />
      <span>{label}</span>
    </button>
  );
}

/**
 * Swiss / DIFC Institutional Priority Offers Desk Modal (strictly manual-trigger — zero popup ambush).
 * Features Betterway's official female advisors (Reshma Rajan & Rahaba Azeez), live CMS offers from
 * Betterway OS v3, instant callback capture, GA4 tracking, and free 2026 UAE Mortgage PDF download.
 */
export default function HotOffersPopup() {
  const reduce = useReducedMotion();
  const { data } = useBenchmark();
  const dossier = buildHeroDossier(data.latest.threeMonth);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [liveOffers, setLiveOffers] = useState<
    Array<{
      id: string;
      tab: string;
      badge: string;
      title: string;
      summary: string;
      highlights: readonly string[];
      ctaHref: string;
      ctaLabel: string;
    }>
  >([...HOT_OFFERS]);
  const [offerIdx, setOfferIdx] = useState(0);
  const [advisorIdx, setAdvisorIdx] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const advisor = FEMALE_ADVISORS[advisorIdx] ?? TEAM_SPECIALISTS[2];
  const offer = liveOffers[offerIdx] ?? liveOffers[0] ?? HOT_OFFERS[0];

  useEffect(() => {
    setMounted(true);
    fetch('/api/cms/live')
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        const rows = j?.cms?.offers;
        if (Array.isArray(rows) && rows.length > 0) {
          setLiveOffers(
            rows.slice(0, 3).map((o: Record<string, unknown>, idx: number) => ({
              id: String(o.id || `live-${idx}`),
              tab: String(o.tab || 'Priority Desk'),
              badge: String(o.badge || 'Live UAE Offer'),
              title: String(o.title || HOT_OFFERS[0].title),
              summary: String(o.summary || ''),
              highlights:
                Array.isArray(o.highlights) && o.highlights.length > 0
                  ? (o.highlights as string[])
                  : HOT_OFFERS[0].highlights,
              ctaHref: String(o.ctaHref || '/get-started'),
              ctaLabel: String(o.ctaLabel || 'Check Eligibility'),
            })),
          );
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      trackEvent('hot_offers_popup_open', { source: 'manual' });
    };
    window.addEventListener('bw:open-hot-offers', onOpen);
    return () => window.removeEventListener('bw:open-hot-offers', onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setSent(false);
  };

  const submitQuickDesk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSending(true);
    try {
      await fetch('/api/os/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          topic: `Priority Offers Desk — ${offer.tab}`,
          advisor: advisor.name,
          notes: `Requested via Priority Offers Desk Modal (${offer.title})`,
          source: 'hot-offers-popup',
        }),
      });
    } catch {}
    trackEvent('hot_offers_lead_submit', { offer: offer.id, advisor: advisor.slug });
    setSending(false);
    setSent(true);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="bw-hot-offers-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-labelledby="bw-hot-offers-title"
          className="fixed inset-0 z-[130] flex items-center justify-center bg-[#070e1a]/80 p-3 backdrop-blur-lg sm:p-6"
        >
          {/* Refined 1px Champagne Gold / Midnight Navy Hairline Frame */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.97, y: 8 }}
            transition={reduce ? { duration: 0 } : SPRING_INSTITUTIONAL}
            onClick={(e) => e.stopPropagation()}
            className="bw-hot-beam-shell relative max-h-[92dvh] w-full max-w-[960px] overflow-hidden p-[1px] shadow-[0_44px_110px_-24px_rgba(7,14,26,0.8)]"
          >
            <div className="relative grid max-h-[calc(92dvh-2px)] w-full overflow-y-auto rounded-[21px] bg-white lg:grid-cols-[0.86fr_1.14fr] lg:overflow-hidden">
              <button
                type="button"
                onClick={close}
                aria-label="Close Priority Offers desk"
                className="absolute end-4 top-4 z-30 grid h-9 w-9 place-items-center rounded-[10px] border border-[#e3e7ee] bg-white/95 text-[#070e1a] shadow-sm transition hover:border-[#070e1a] cursor-pointer"
              >
                <X size={17} />
              </button>

              {/* LEFT: Official Female Advisors Studio Showcase */}
              <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-[#070e1a] p-6 text-white lg:min-h-[560px]">
                <img
                  src={advisor.portrait}
                  alt={`${advisor.name} — ${advisor.designation} at Betterway Mortgages Dubai`}
                  width={900}
                  height={1200}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#070e1a] via-[#070e1a]/45 to-[#070e1a]/55"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pr-12 lg:pr-0">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#34dfac]/35 bg-[#070e1a]/80 px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#34dfac] backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#34dfac]" />
                    Dubai Priority Desk
                  </span>
                  <div className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-[#070e1a]/75 p-1 backdrop-blur-md">
                    {FEMALE_ADVISORS.map((m, i) => (
                      <button
                        key={m.slug}
                        type="button"
                        onClick={() => setAdvisorIdx(i)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition cursor-pointer ${
                          i === advisorIdx ? 'bg-white text-[#070e1a]' : 'text-white/80 hover:text-white'
                        }`}
                      >
                        <img
                          src={m.avatarWebp}
                          alt=""
                          width={18}
                          height={18}
                          className="h-[18px] w-[18px] rounded-full object-cover object-top"
                        />
                        <span>{m.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 mt-36 space-y-3 lg:mt-auto">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#d7b158]/35 bg-[#070e1a]/78 px-3 py-1 text-[11px] font-semibold text-[#fcf1b7] backdrop-blur-md">
                    <Sparkles size={12} />
                    Live CBUAE 3M EIBOR · <span className="num">{dossier.eiborFormatted}</span>
                  </div>
                  <div className="rounded-[16px] border border-white/14 bg-[#070e1a]/82 p-4 backdrop-blur-md">
                    <p className="text-[13.5px] leading-relaxed text-white/90">
                      “Share your target budget and community — our desk prepares written comparisons across{' '}
                      {BANKS.length} licensed UAE banks, 4% DLD closing fees, and 50% DBR limits before you sign.”
                    </p>
                    <div className="mt-3 flex items-center justify-between border-t border-white/12 pt-3">
                      <div>
                        <p className="font-display text-sm font-semibold text-white">{advisor.name}</p>
                        <p className="text-[11.5px] text-[#34dfac]">{advisor.designation}</p>
                      </div>
                      <span className="rounded-[8px] bg-white/10 px-2.5 py-1 text-[10.5px] font-medium text-white/80">
                        {SITE.hours}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Swiss Institutional Priority Offers Console */}
              <div className="flex flex-col justify-between p-6 sm:p-8 lg:overflow-y-auto">
                <div>
                  <div className="flex flex-wrap items-center gap-2 pr-10">
                    <img src="/brand/icon.png" alt="" width={22} height={22} className="h-5 w-5 shrink-0 object-contain" />
                    <span className="rounded-[7px] bg-[#070e1a] px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#fcf1b7]">
                      Priority Bank Desk
                    </span>
                    <span className="rounded-[7px] bg-[#edf7f4] px-2.5 py-1 text-[11px] font-semibold text-[#0e6954]">
                      {offer.badge}
                    </span>
                  </div>

                  <h2
                    id="bw-hot-offers-title"
                    className="mt-4 font-display text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.12] tracking-[-0.025em] text-[#070e1a]"
                  >
                    {offer.title}
                  </h2>

                  <div
                    role="tablist"
                    aria-label="Priority UAE mortgage offer tracks"
                    className="mt-5 grid grid-cols-3 gap-1 rounded-[12px] border border-[#e3e7ee] bg-[#f7f8fa] p-1"
                  >
                    {liveOffers.map((item, i) => {
                      const active = i === offerIdx;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => {
                            setOfferIdx(i);
                            trackEvent('hot_offers_tab_select', { offer: item.id });
                          }}
                          className={`relative rounded-[9px] px-2.5 py-2 text-xs font-semibold transition cursor-pointer ${
                            active ? 'text-white' : 'text-[#4a5568] hover:text-[#070e1a]'
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="bw-hot-offer-pill"
                              transition={reduce ? { duration: 0 } : SPRING_INSTITUTIONAL}
                              className="absolute inset-0 rounded-[9px] bg-[#070e1a]"
                              aria-hidden="true"
                            />
                          )}
                          <span className="relative z-10">{item.tab}</span>
                        </button>
                      );
                    })}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#4a5568]">{offer.summary}</p>

                  <ul className="mt-4 space-y-2 rounded-[14px] border border-[#e3e7ee] bg-[#f7f8fa] p-4">
                    {offer.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-[13px] font-medium text-[#0b1320]">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#0e6954]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {sent ? (
                    <div className="mt-5 rounded-[14px] border border-[#0e6954]/30 bg-[#edf7f4] p-4 text-sm text-[#0a4a3e]">
                      <p className="font-semibold">Priority callback booked with {advisor.name}.</p>
                      <p className="mt-1 text-xs text-[#4a5568]">
                        Your enquiry has been routed into Betterway OS. Download our free 2026 UAE Mortgage Buyer Guide
                        PDF below.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={submitQuickDesk} className="mt-5 space-y-2.5">
                      <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#4a5568]">
                        Request a 24-Bank Offer Sheet with {advisor.name.split(' ')[0]}
                      </p>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name"
                          aria-label="Your full name"
                          className="h-11 w-full rounded-[10px] border border-[#d6dce6] bg-white px-3.5 text-sm text-[#070e1a] outline-none focus:border-[#070e1a]"
                        />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+971 50 000 0000"
                          aria-label="WhatsApp or phone number"
                          className="h-11 w-full rounded-[10px] border border-[#d6dce6] bg-white px-3.5 text-sm text-[#070e1a] outline-none focus:border-[#070e1a]"
                        />
                      </div>
                      <button type="submit" disabled={sending} className="homy-btn w-full justify-between">
                        <span className="inline-flex items-center gap-2">
                          <PhoneCall size={14} className="text-[#34dfac]" />
                          {sending ? 'Routing to Betterway OS…' : `Request ${offer.tab} Dossier`}
                        </span>
                        <span className="homy-btn__disc" aria-hidden="true">
                          <ArrowRight size={14} strokeWidth={2.2} />
                        </span>
                      </button>
                    </form>
                  )}
                </div>

                <div className="mt-5 space-y-3 border-t border-[#e3e7ee] pt-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Link
                      href={offer.ctaHref}
                      onClick={close}
                      className="inline-flex items-center gap-1.5 rounded-[9px] bg-[#edf7f4] px-3 py-2 text-xs font-semibold text-[#0e6954] transition hover:bg-[#0e6954] hover:text-white"
                    >
                      <span>{offer.ctaLabel}</span>
                      <ArrowRight size={13} />
                    </Link>
                    <a
                      href="/docs/Betterway-UAE-Mortgage-Buyer-Guide-2026.pdf"
                      download
                      onClick={() =>
                        trackEvent('pdf_download', {
                          file: 'Betterway-UAE-Mortgage-Buyer-Guide-2026.pdf',
                          source: 'hot_offers_popup',
                        })
                      }
                      className="inline-flex items-center gap-1.5 rounded-[9px] border border-[#d6dce6] bg-white px-3 py-2 text-xs font-semibold text-[#070e1a] transition hover:border-[#070e1a]"
                    >
                      <FileDown size={13} className="text-[#0e6954]" />
                      <span>Free 2026 PDF Guide</span>
                    </a>
                    <a
                      href={waLink(`Hi ${advisor.name}, I saw the ${offer.tab} track on Betterway Mortgages.`)}
                      rel="noopener"
                      onClick={() => trackEvent('whatsapp_click', { source: 'hot_offers_popup', offer: offer.id })}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4a5568] underline-offset-2 hover:text-[#070e1a] hover:underline"
                    >
                      WhatsApp Desk →
                    </a>
                  </div>
                  <p className="flex items-start gap-1.5 text-[11px] leading-snug text-[#4a5568]">
                    <ShieldCheck size={13} className="mt-0.5 shrink-0 text-[#0e6954]" />
                    <span>
                      Betterway Mortgages LLC is an independent mortgage adviser, not a bank. All rates, LTV limits, and
                      Final Offer Letters are issued in writing by licensed UAE lenders under CBUAE rules.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
