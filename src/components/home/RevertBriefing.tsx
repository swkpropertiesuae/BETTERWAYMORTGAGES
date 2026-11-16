'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
import { buildRevertBriefing, LOAN_TIERS } from '@/lib/benchmark-briefing';

const fmtAed = (n: number) => `AED ${n.toLocaleString('en-US')}`;
const tierLabel = (n: number) => `AED ${(n / 1_000_000).toFixed(1)}M`;
const CORP_EASE = [0.22, 1, 0.36, 1] as const;

export default function RevertBriefing() {
  const { data } = useBenchmark();
  const reduce = useReducedMotion();
  const [loan, setLoan] = useState<number>(LOAN_TIERS[0]);
  const briefing = buildRevertBriefing(loan, data.latest.threeMonth, 25);

  return (
    <div className="bw-revert" data-8b-block="revert-briefing">
      <div className="bw-revert__top">
        <div>
          <span className="eyebrow">Illustrative margin sensitivity · 25-year tenure</span>
          <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-navy">
            How revert margins affect your monthly payment
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate">
            Modelled on the published <span className="num font-semibold text-navy">{briefing.eibor3m.toFixed(2)}%</span> CBUAE 3M EIBOR fixing across bank-neutral margin tiers.
          </p>
        </div>

        <div className="bw-revert__tiers" role="group" aria-label="Illustrative loan amount">
          {LOAN_TIERS.map((tier) => {
            const active = loan === tier;
            return (
              <button
                key={tier}
                type="button"
                aria-pressed={active}
                onClick={() => setLoan(tier)}
                className={`bw-revert__tier ${active ? 'is-active' : ''}`}
              >
                {active && (
                  <motion.span
                    layoutId="revert-tier-pill"
                    className="bw-revert__tier-bg"
                    transition={reduce ? { duration: 0 } : { duration: 0.28, ease: CORP_EASE }}
                  />
                )}
                <span className="relative z-[1] num">{tierLabel(tier)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bw-revert__rows" role="list" aria-label="Illustrative EIBOR margin tiers">
        {briefing.tiers.map((tier, idx) => (
          <motion.div
            key={tier.margin}
            layout={!reduce}
            transition={{ duration: 0.32, ease: CORP_EASE }}
            role="listitem"
            className={`bw-revert__row ${idx === 0 ? 'bw-revert__row--best' : ''}`}
          >
            <div className="bw-revert__bank">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-semibold text-navy">{tier.label}</span>
                <span className="bw-revert__badge bw-revert__badge--muted">3M EIBOR + margin</span>
              </div>
              <p className="mt-1 text-xs text-slate">
                {tier.descriptor} · Published <span className="num font-medium text-navy">{briefing.eibor3m.toFixed(2)}%</span> fixing plus{' '}
                <span className="num font-medium text-navy">{tier.margin.toFixed(2)}%</span>
              </p>
            </div>

            <dl className="bw-revert__metrics">
              <div>
                <dt>Published EIBOR</dt>
                <dd className="num">{briefing.eibor3m.toFixed(2)}%</dd>
              </div>
              <div>
                <dt>Effective rate</dt>
                <dd className="num">{tier.effectiveRate.toFixed(2)}%</dd>
              </div>
              <div>
                <dt>Monthly payment</dt>
                <dd className="num font-semibold text-navy">
                  {fmtAed(tier.monthlyEmi)}
                  <small>/mo</small>
                </dd>
              </div>
            </dl>
          </motion.div>
        ))}
      </div>

      <div className="bw-revert__summary">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
            Margin sensitivity · +{fmtAed(briefing.monthlySpread)}/mo
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/80">
            On a {tierLabel(loan)} balance, a 1.00% wider written revert margin adds <strong className="num font-semibold text-white">{fmtAed(briefing.monthlySpread)}/mo</strong> once your initial fixed period ends.
          </p>
        </div>
        <Link href="/rates/uae-mortgage-rates-eibor-revert-bible" className="bw-revert__summary-link">
          Review 24 UAE lenders <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}
