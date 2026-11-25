'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  FileDown,
  Flame,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
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

const FEMALE_ADVISORS = TEAM_SPECIALISTS.filter((m) =>
  m.slug === 'reshma-rajan' || m.slug === 'rahaba-azeez',
);

const SESSION_KEY = 'bw_hot_offers_seen_v1';

/** Trigger button (reusable in Hero, Header or Hot Offers page) that dispatches the global open event. */
export function HotOffersTrigger({
  label = 'Hot Offers',
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
        className="bw-hot-trigger-btn inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-white cursor-pointer"
      >
        <Flame size={14} className="text-[#f1d57e]" />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      className="bw-hero-chip bw-hero-chip--interactive !border-[#dec178]/55"
    >
      <Flame size={13} className="text-[#f1d57e]" />
      <span>{label}</span>
      <span className="rounded-full bg-[#22ba90] px-1.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider text-[#070e1a]">
        Desk
      </span>
    </button>
  );
}

/**
 * 21st.dev Border-Beam Hot Offers Popup featuring Betterway's Official Female Advisors
 * (Reshma Rajan & Rahaba Azeez) with interactive CBUAE-compliant UAE mortgage desks,
 * instant callback capture, and free downloadable 2026 PDF guides.
 */
export default function HotOffersPopup() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { data } = useBenchmark();
  const dossier = buildHeroDossier(data.latest.threeMonth);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [offerIdx, setOfferIdx] = useState(0);
  const [advisorIdx, setAdvisorIdx] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const advisor = FEMALE_ADVISORS[advisorIdx] ?? TEAM_SPECIALISTS[2];
  const offer = HOT_OFFERS[offerIdx];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen for manual "Hot Offers" trigger clicks anywhere on the site
  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      trackEvent('hot_offers_popup_open', { source: 'manual' });
    };
    window.addEventListener('bw:open-hot-offers', onOpen);
    return () => window.removeEventListener('bw:open-hot-offers', onOpen);
  }, []);

  // Smart non-intrusive auto-display once per session on marketing pages (never interrupts /get-started or /portal)
  useEffect(() => {
    if (!mounted) return;
    if (
      pathname.startsWith('/get-started') ||
      pathname.startsWith('/portal') ||
      pathname.startsWith('/partners')
    ) {
      return;
    }
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === '1') return;
    } catch {}

    const timer = window.setTimeout(() => {
      try {
        if (window.sessionStorage.getItem(SESSION_KEY) === '1') return;
        window.sessionStorage.setItem(SESSION_KEY, '1');
      } catch {}
      setOpen(true);
      trackEvent('hot_offers_popup_open', { source: 'auto_timer', path: pathname });
    }, 8500);

    return () => window.clearTimeout(timer);
  }, [mounted, pathname]);

  // Escape & body scroll lock while modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch {}
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
          topic: `Hot Offers Desk — ${offer.tab}`,
          advisor: advisor.name,
          notes: `Requested via 21st.dev Hot Offers Popup (${offer.title})`,
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
          transition={{ duration: reduce ? 0 : 0.22 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-labelledby="bw-hot-offers-title"
          className="fixed inset-0 z-[130] flex items-center justify-center bg-[#070e1a]/82 p-3 backdrop-blur-xl sm:p-6"
        >
          {/* 21st.dev Conic Border-Beam Frame */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.96, y: 10 }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 360, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="bw-hot-beam-shell relative max-h-[92dvh] w-full max-w-[980px] overflow-hidden rounded-[28px] p-[2px] shadow-[0_48px_120px_-24px_rgba(0,0,0,0.85)]"
          >
            <div className="relative grid max-h-[calc(92dvh-4px)] w-full overflow-y-auto rounded-[26px] bg-white lg:grid-cols-[0.86fr_1.14fr] lg:overflow-hidden">
              {/* Close Button */}
              <button
                type="button"
                onClick={close}
                aria-label="Close Hot Offers popup"
                className="absolute end-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#e5e7eb] bg-white/95 text-[#080b0f] shadow-md transition hover:border-[#080b0f] cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* LEFT: Creative Editorial Female Advisor Portrait Showcase */}
              <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-[#070e1a] p-6 text-white lg:min-h-[560px]">
                {/* Full-bleed crisp eye-level aligned portrait of Betterway's female specialist */}
                <img
                  src={advisor.portrait}
                  alt={`${advisor.name} — ${advisor.designation} at Betterway Mortgages Dubai`}
                  width={900}
                  height={1200}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                {/* Crisp directional dark luxury vignette */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#070e1a] via-[#070e1a]/45 to-[#070e1a]/55"
                  aria-hidden="true"
                />

                {/* Top Advisor Switcher & Live Badge */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pr-12 lg:pr-0">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#34dfac]/45 bg-[#070e1a]/75 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#34dfac] backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-[#34dfac]" />
                    Dubai Priority Desk
                  </span>
                  <div className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-[#070e1a]/70 p-1 backdrop-blur-md">
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

                {/* Bottom Advisor Greeting Card */}
                <div className="relative z-10 mt-36 space-y-3 lg:mt-auto">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#f1d57e]/35 bg-[#070e1a]/72 px-3 py-1 text-[11px] font-semibold text-[#f1d57e] backdrop-blur-md">
                    <Sparkles size={12} />
                    Live CBUAE 3M EIBOR · <span className="num">{dossier.eiborFormatted}</span>
                  </div>
                  <div className="rounded-[20px] border border-white/15 bg-[#070e1a]/78 p-4 backdrop-blur-md">
                    <p className="text-[13.5px] leading-relaxed text-white/92">
                      “Tell us your budget and community — our desk lines up {BANKS.length} licensed UAE banks, 4% DLD
                      closing fees, and CBUAE DBR caps in one clear dossier before you sign.”
                    </p>
                    <div className="mt-3 flex items-center justify-between border-t border-white/12 pt-3">
                      <div>
                        <p className="font-display text-sm font-bold text-white">{advisor.name}</p>
                        <p className="text-[11.5px] text-[#34dfac]">{advisor.designation}</p>
                      </div>
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] font-medium text-white/85">
                        {SITE.hours}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: 21st.dev Interactive Hot UAE Mortgage Offers Console */}
              <div className="flex flex-col justify-between p-6 sm:p-8 lg:overflow-y-auto">
                <div>
                  <div className="flex flex-wrap items-center gap-2 pr-10">
                    <img
                      src="/brand/icon.png"
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 shrink-0 object-contain"
                    />
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#070e1a] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#f1d57e]">
                      <Flame size={12} /> Hot UAE Offers · 2026–2027
                    </span>
                    <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-[11px] font-semibold text-[#0e6954]">
                      {offer.badge}
                    </span>
                  </div>

                  <h2
                    id="bw-hot-offers-title"
                    className="mt-4 font-display text-[clamp(24px,2.5vw,32px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-[#070e1a]"
                  >
                    {offer.title}
                  </h2>

                  {/* 21st.dev Segmented Pill Tab Selector */}
                  <div
                    role="tablist"
                    aria-label="Hot UAE mortgage offer tracks"
                    className="mt-5 grid grid-cols-3 gap-1.5 rounded-[16px] border border-[#e5e7eb] bg-[#f5f6f7] p-1.5"
                  >
                    {HOT_OFFERS.map((item, i) => {
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
                          className={`relative rounded-[12px] px-2.5 py-2 text-xs font-bold transition cursor-pointer ${
                            active ? 'text-white' : 'text-[#464c5c] hover:text-[#070e1a]'
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="bw-hot-offer-pill"
                              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32 }}
                              className="absolute inset-0 rounded-[12px] bg-[#070e1a]"
                              aria-hidden="true"
                            />
                          )}
                          <span className="relative z-10">{item.tab}</span>
                        </button>
                      );
                    })}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#464c5c]">{offer.summary}</p>

                  <ul className="mt-4 space-y-2 rounded-[16px] border border-[#e5e7eb] bg-[#f9fafb] p-4">
                    {offer.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-[13px] font-medium text-[#121217]">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#179373]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Quick Priority Callback Capture */}
                  {sent ? (
                    <div className="mt-5 rounded-[16px] border border-[#179373]/30 bg-[#eef7f4] p-4 text-sm text-[#0a4a3e]">
                      <p className="font-bold">Priority callback booked with {advisor.name}!</p>
                      <p className="mt-1 text-xs text-[#464c5c]">
                        Your enquiry has been routed into Betterway OS. You can also download our 2026 UAE Mortgage
                        Buyer Guide PDF below.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={submitQuickDesk} className="mt-5 space-y-2.5">
                      <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-[#464c5c]">
                        Request a Free 24-Bank Offer Sheet with {advisor.name.split(' ')[0]}
                      </p>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name"
                          aria-label="Your full name"
                          className="h-11 w-full rounded-[12px] border border-[#d5dae2] bg-white px-3.5 text-sm text-[#121217] outline-none focus:border-[#179373]"
                        />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+971 50 000 0000"
                          aria-label="WhatsApp or phone number"
                          className="h-11 w-full rounded-[12px] border border-[#d5dae2] bg-white px-3.5 text-sm text-[#121217] outline-none focus:border-[#179373]"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={sending}
                        className="homy-btn w-full justify-between !bg-[#070e1a]"
                      >
                        <span className="inline-flex items-center gap-2">
                          <PhoneCall size={14} className="text-[#34dfac]" />
                          {sending ? 'Routing to Betterway OS…' : `Get ${offer.tab} Dossier`}
                        </span>
                        <span className="homy-btn__disc" aria-hidden="true">
                          <ArrowRight size={14} strokeWidth={2.2} />
                        </span>
                      </button>
                    </form>
                  )}
                </div>

                {/* Bottom Action Strip: 60s Check + Free 2026 PDF + Compliance */}
                <div className="mt-5 space-y-3 border-t border-[#e5e7eb] pt-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Link
                      href={offer.ctaHref}
                      onClick={close}
                      className="inline-flex items-center gap-1.5 rounded-[10px] bg-[#eef7f4] px-3 py-2 text-xs font-bold text-[#0e6954] transition hover:bg-[#179373] hover:text-white"
                    >
                      <span>{offer.ctaLabel}</span>
                      <ArrowRight size={13} />
                    </Link>
                    <a
                      href="/docs/Betterway-UAE-Mortgage-Buyer-Guide-2026.pdf"
                      download
                      onClick={() => trackEvent('pdf_download', { file: 'Betterway-UAE-Mortgage-Buyer-Guide-2026.pdf', source: 'hot_offers_popup' })}
                      className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#d5dae2] bg-white px-3 py-2 text-xs font-semibold text-[#121217] transition hover:border-[#070e1a]"
                    >
                      <FileDown size={13} className="text-[#179373]" />
                      <span>Free 2026 PDF Guide</span>
                    </a>
                    <a
                      href={waLink(`Hi ${advisor.name}, I saw the ${offer.tab} offer on Betterway Mortgages.`)}
                      rel="noopener"
                      onClick={() => trackEvent('whatsapp_click', { source: 'hot_offers_popup', offer: offer.id })}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#464c5c] underline-offset-2 hover:text-[#070e1a] hover:underline"
                    >
                      WhatsApp Desk →
                    </a>
                  </div>
                  <p className="flex items-start gap-1.5 text-[11px] leading-snug text-[#606878]">
                    <ShieldCheck size={13} className="mt-0.5 shrink-0 text-[#179373]" />
                    <span>
                      Betterway Mortgages LLC is a mortgage adviser, not a bank. All rates, LTV limits, and Final Offer
                      Letters are issued in writing by licensed UAE lenders under CBUAE rules.
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
