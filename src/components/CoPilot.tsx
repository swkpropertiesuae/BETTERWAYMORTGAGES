'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { cashToClose, borrowingPower, earlySettlementFee } from '@/lib/math';
import { waLink } from '@/data/site';
import { SPRING_SNAPPY } from '@/components/ui/MotionPrimitives';

const aed = (n: number) => `AED ${Math.round(n).toLocaleString('en-US')}`;

type Msg = { id: string; from: 'bot' | 'me'; text: string; link?: { href: string; label: string } };

const INTENTS: { chip: string; answer: () => Omit<Msg, 'id'> }[] = [
  {
    chip: 'Upfront fees on an AED 2.5M purchase?',
    answer: () => {
      const c = cashToClose({ price: 2_500_000, downPct: 20 });
      return {
        from: 'bot',
        text: `At a 20% down payment (${aed(c.down)}), statutory Dubai purchase costs include ${aed(c.dld)} DLD transfer & title deed, ${aed(c.mortgageReg)} mortgage registration, AED 4,200 trustee fee, AED 3,150 valuation allowance, and ${aed(c.agencyFee)} agency commission — bringing total cash to close to ${aed(c.total)}.`,
        link: { href: '/calculators/mortgage-calculator', label: 'Model your own purchase' },
      };
    },
  },
  {
    chip: 'How does the 50% DBR cap work?',
    answer: () => {
      const r = borrowingPower({ salary: 35_000, existingEmis: 0, cardLimits: 50_000, years: 25 });
      return {
        from: 'bot',
        text: `Under CBUAE rules, total monthly debt obligations cannot exceed 50% of gross income. On an illustrative AED 35,000 salary with AED 50,000 in credit card limits (assessed at 5%), monthly mortgage capacity is ${aed(r.available)}/mo.`,
        link: { href: '/calculators/dbr-borrowing-power', label: 'Run the DBR calculator' },
      };
    },
  },
  {
    chip: 'What is the early-settlement fee cap?',
    answer: () => ({
      from: 'bot',
      text: `CBUAE regulations cap the early-settlement or buyout exit fee at 1% of the outstanding principal or AED 10,000, whichever is lower, plus 5% VAT (up to ${aed(earlySettlementFee(1e9))}). Always check valuation, registration and processing fees before switching.`,
      link: { href: '/calculators/buyout-refinance-savings', label: 'Compare buyout costs' },
    }),
  },
  {
    chip: 'Golden Visa with a mortgaged home?',
    answer: () => ({
      from: 'bot',
      text: 'Properties meeting the AED 2,000,000 statutory value threshold on a Dubai Title Deed, Oqood or DLD valuation may be submitted for residency consideration with a lender NOC. Confirm current fees and eligibility directly with DLD and ICP/GDRFA.',
      link: { href: '/mortgages/golden-visa-mortgage', label: 'Golden Visa mortgage guide' },
    }),
  },
];

export default function CoPilot() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 'welcome',
      from: 'bot',
      text: 'Select a common CBUAE or DLD rule question below, or connect with an advisor. Preset planning notes only — not a lending assessment.',
    },
  ]);

  const ask = (intent: (typeof INTENTS)[number]) => {
    const stamp = `${Date.now()}-${Math.random()}`;
    setMsgs((m) => [
      ...m,
      { id: `me-${stamp}`, from: 'me', text: intent.chip },
      { id: `bot-${stamp}`, ...intent.answer() },
    ]);
  };

  return (
    <div className="fixed bottom-4 end-4 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            key="bw-copilot-dialog"
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 14, scale: 0.96 }}
            transition={reduce ? { duration: 0 } : SPRING_SNAPPY}
            role="dialog"
            aria-label="Mortgage assistant guide"
            className="mb-3 flex h-[min(560px,80dvh)] w-[min(392px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[22px] border border-[#e5e7eb] bg-white shadow-[0_36px_90px_-24px_rgba(8,11,15,0.45)]"
          >
            <div className="flex items-center justify-between bg-[#0b1117] px-5 py-4 text-white">
              <div className="flex items-center gap-2.5">
                <img
                  src="/brand/icon.png"
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 shrink-0 object-contain"
                />
                <div>
                  <p className="font-display text-sm font-semibold leading-tight text-white">
                    Mortgage rulebook guide
                  </p>
                  <p className="text-[11px] text-white/60">CBUAE &amp; DLD Statutory Notes</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close guide"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-[#fafafa] p-4 text-sm">
              {msgs.map((m) => (
                <motion.div
                  key={m.id}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.22 }}
                  className={`max-w-[88%] rounded-[16px] px-4 py-3 ${
                    m.from === 'bot'
                      ? 'border border-[#e8eaed] bg-white text-[#0c0c0c] shadow-[0_4px_14px_-8px_rgba(8,11,15,0.12)]'
                      : 'ms-auto bg-[#080b0f] text-white'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  {m.link && (
                    <Link
                      href={m.link.href}
                      className="mt-2 inline-flex items-center gap-1 font-semibold text-[#0e6954] hover:underline"
                      onClick={() => setOpen(false)}
                    >
                      {m.link.label} <ArrowRight size={13} />
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="border-t border-[#e5e7eb] bg-white p-3.5">
              <div className="mb-3 flex flex-wrap gap-1.5">
                {INTENTS.map((i) => (
                  <button
                    key={i.chip}
                    type="button"
                    className="rounded-full border border-[#e0e3e7] bg-[#f6f6f6] px-3 py-1.5 text-left text-[11.5px] font-medium text-[#080b0f] transition hover:border-[#080b0f] hover:bg-white cursor-pointer"
                    onClick={() => ask(i)}
                  >
                    {i.chip}
                  </button>
                ))}
              </div>
              <a
                href={waLink('Hi Betterway, I have a mortgage question.')}
                rel="noopener"
                className="homy-btn w-full justify-between"
              >
                <span className="inline-flex items-center gap-2">
                  <MessageCircle size={15} /> Ask an advisor
                </span>
                <span className="homy-btn__disc" aria-hidden="true">
                  <span className="homy-btn__arrow-track">
                    <Send size={12} />
                    <Send size={12} />
                  </span>
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={reduce ? undefined : { scale: 1.03, y: -1 }}
        whileTap={reduce ? undefined : { scale: 0.97 }}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="homy-btn !rounded-full !pl-3.5 !pr-4 shadow-[0_14px_34px_-10px_rgba(8,11,15,0.55)] ring-1 ring-white/20"
      >
        <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
          <Sparkles size={14} className="text-[#34dfac]" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#d7b158]" />
        </span>
        <span>Mortgage help</span>
      </motion.button>
    </div>
  );
}
