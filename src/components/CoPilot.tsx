'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, X, MessageCircle, Send } from 'lucide-react';
import { cashToClose, borrowingPower, earlySettlementFee } from '@/lib/math';
import { waLink } from '@/data/site';

const aed = (n: number) => `AED ${Math.round(n).toLocaleString('en-US')}`;

type Msg = { from: 'bot' | 'me'; text: string; link?: { href: string; label: string } };

const INTENTS: { chip: string; answer: () => Msg }[] = [
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
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: 'bot',
      text: 'Select a common CBUAE or DLD rule question below, or connect with an advisor. Preset planning notes only — not a lending assessment.',
    },
  ]);
  const ask = (i: (typeof INTENTS)[number]) => setMsgs((m) => [...m, { from: 'me', text: i.chip }, i.answer()]);

  return (
    <div className="fixed bottom-4 end-4 z-50">
      {open && (
        <div
          role="dialog"
          aria-label="Mortgage assistant guide"
          className="mb-3 flex h-[min(560px,80dvh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-card border border-line bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between bg-navy px-5 py-4 text-white">
            <p className="flex items-center gap-2 font-semibold">
              <Sparkles size={16} className="text-mint" /> Mortgage rulebook guide
            </p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close guide">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[88%] rounded-2xl px-4 py-3 ${m.from === 'bot' ? 'bg-mist text-ink' : 'ms-auto bg-navy text-white'}`}>
                <p className="leading-relaxed">{m.text}</p>
                {m.link && (
                  <Link href={m.link.href} className="mt-2 inline-block font-semibold text-teal" onClick={() => setOpen(false)}>
                    {m.link.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="border-t border-line p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {INTENTS.map((i) => (
                <button key={i.chip} type="button" className="chip !text-xs" onClick={() => ask(i)}>
                  {i.chip}
                </button>
              ))}
            </div>
            <a href={waLink('Hi Betterway, I have a mortgage question.')} rel="noopener" className="btn btn-primary w-full">
              <MessageCircle size={16} /> Ask an advisor <Send size={14} />
            </a>
          </div>
        </div>
      )}
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="btn btn-dark ms-auto flex !rounded-full shadow-lg ring-1 ring-white/25">
        <Sparkles size={16} className="text-mint" /> Mortgage help
      </button>
    </div>
  );
}
