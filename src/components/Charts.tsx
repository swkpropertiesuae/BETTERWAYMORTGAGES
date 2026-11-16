'use client';
import { motion, useReducedMotion } from 'motion/react';
import { fixedThenRevert } from '@/lib/math';

const ease = [0.22, 1, 0.36, 1] as const;
const aedK = (n: number) => `AED ${Math.round(n / 1000).toLocaleString('en-US')}k`;

const MARGIN_STRUCTURES = [
  { label: '+1.00% margin (2Y fixed)', intro: 4.0, fixedYrs: 2, margin: 1.0, floor: 3.0 },
  { label: '+1.25% margin (2Y fixed)', intro: 4.0, fixedYrs: 2, margin: 1.25, floor: 3.0 },
  { label: '+1.50% margin (2Y fixed)', intro: 4.0, fixedYrs: 2, margin: 1.5, floor: 3.0 },
  { label: '+1.75% margin (1Y fixed)', intro: 3.9, fixedYrs: 1, margin: 1.75, floor: 3.0 },
  { label: '+2.00% margin (1Y fixed)', intro: 3.9, fixedYrs: 1, margin: 2.0, floor: 3.0 },
];

export function costRanking(loan = 1_500_000, eibor = 4.21) {
  return MARGIN_STRUCTURES.map((s) => ({
    label: s.label,
    cost: fixedThenRevert(loan, 25, s.intro, s.fixedYrs, eibor, s.margin, s.floor, 5).cost,
  })).sort((x, y) => x.cost - y.cost);
}

export function CostBars({ limit = 5, compact = false }: { limit?: number; compact?: boolean }) {
  const reduce = useReducedMotion();
  const rows = costRanking().slice(0, limit);
  const max = rows[rows.length - 1].cost;
  const min = rows[0].cost * 0.9;
  return (
    <figure aria-label="Illustrative 5-year interest by margin structure on AED 1.5M">
      <ul className={compact ? 'space-y-1.5' : 'space-y-2.5'}>
        {rows.map(({ label, cost }, i) => (
          <li key={label} className="grid grid-cols-[minmax(0,11rem)_1fr_auto] items-center gap-3">
            <span className={`truncate font-medium text-navy ${compact ? 'text-[10px]' : 'text-sm'}`}>{label}</span>
            <span className={`relative overflow-hidden rounded-full bg-mist ${compact ? 'h-2' : 'h-3'}`}>
              <motion.span
                className={`absolute inset-y-0 start-0 rounded-full ${i === 0 ? 'bg-teal' : 'bg-navy/70'}`}
                initial={reduce ? false : { width: 0 }}
                whileInView={{ width: `${((cost - min) / (max - min)) * 100}%` }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.9, delay: i * 0.06, ease }}
                style={reduce ? { width: `${((cost - min) / (max - min)) * 100}%` } : undefined}
              />
            </span>
            <span className={`num text-end text-slate ${compact ? 'text-[10px]' : 'text-sm'}`}>{aedK(cost)}</span>
          </li>
        ))}
      </ul>
      {!compact && (
        <figcaption className="mt-4 text-xs text-slate">
          Illustrative 5-year cumulative interest on an AED 1.5M loan across bank-neutral margin tiers. Confirm exact rates in your lender’s written Final Offer Letter.
        </figcaption>
      )}
    </figure>
  );
}

export function OfferDashboard() {
  return (
    <div className="flex h-full text-[10px] sm:text-[11px]" aria-hidden="true">
      <aside className="hidden w-[22%] shrink-0 flex-col gap-1.5 bg-navy p-3 text-white/70 sm:flex">
        <img src="/brand/logo-white.svg" alt="" width={1618} height={276} className="mb-3 h-5 w-auto self-start" />
        {['Framework', 'Documents', 'Valuation', 'Transfer'].map((t, i) => (
          <span key={t} className={`rounded px-2 py-1 ${i === 0 ? 'bg-white/15 text-white' : ''}`}>
            {t}
          </span>
        ))}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3">
        <div className="flex items-center justify-between">
          <b className="text-[12px] text-navy sm:text-[13px]">Statutory CBUAE &amp; margin briefing</b>
          <span className="rounded-full bg-teal-50 px-2 py-0.5 text-teal">24 banks</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            ['Max DBR cap', '50%'],
            ['Expat 1st home', '80% LTV'],
            ['UAE National', '85% LTV'],
          ].map(([k, v]) => (
            <div key={k} className="rounded bg-mist p-1.5">
              <div className="text-slate">{k}</div>
              <div className="num font-semibold text-navy">{v}</div>
            </div>
          ))}
        </div>
        <div className="min-h-0 flex-1 rounded border border-line p-2">
          <CostBars limit={5} compact />
        </div>
      </div>
    </div>
  );
}
