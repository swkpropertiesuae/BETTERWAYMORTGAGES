'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ShieldAlert } from 'lucide-react';
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
          <span className="eyebrow">Live revert schedule · 25-year tenure</span>
          <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-navy">
            What the revert formula actually costs
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate">
            Modelled against the published <span className="num font-semibold text-navy">{briefing.eibor3m.toFixed(2)}%</span> 3M EIBOR fixing across five years.
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

      <div className="bw-revert__rows" role="list" aria-label="Illustrative bank revert comparison">
        {briefing.offers.map((offer) => (
          <motion.div
            key={offer.key}
            layout={!reduce}
            transition={{ duration: 0.32, ease: CORP_EASE }}
            role="listitem"
            className={`bw-revert__row ${offer.lowestFiveYearCost ? 'bw-revert__row--best' : ''}`}
          >
            <div className="bw-revert__bank">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex h-8 w-24 shrink-0 items-center justify-center rounded-lg border border-line bg-white px-2">
                  <img src={offer.logo} alt="" className="max-h-5 w-auto max-w-[78px] object-contain" loading="lazy" decoding="async" />
                </span>
                <Link href={`/rates/${offer.slug}`} className="font-semibold text-navy hover:text-teal-700 ulink">
                  {offer.name}
                </Link>
                <span className="rounded-full border border-line bg-white px-2 py-0.5 text-[10.5px] font-medium text-slate">
                  {offer.type}
                </span>
                {offer.lowestFiveYearCost ? (
                  <span className="bw-revert__badge bw-revert__badge--gold">Lowest 5-yr cost</span>
                ) : offer.lowestTeaser ? (
                  <span className="bw-revert__badge bw-revert__badge--muted">Lowest Year-1 teaser</span>
                ) : (
                  <span className="bw-revert__badge bw-revert__badge--muted">2Y fixed buffer</span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate">
                <span className="num font-medium text-navy">{offer.intro.toFixed(2)}%</span> ({offer.introTerm} fixed) → 3M EIBOR +{' '}
                <span className="num font-medium text-navy">{offer.margin.toFixed(2)}%</span> ={' '}
                <span className="num font-semibold text-navy">{offer.revertRate.toFixed(2)}%</span>
                {offer.floorBinding && (
                  <span className="ms-1.5 inline-flex items-center gap-1 text-warn">
                    <ShieldAlert size={11} /> {offer.floor.toFixed(2)}% floor active
                  </span>
                )}
              </p>
            </div>

            <dl className="bw-revert__metrics">
              <div>
                <dt>Intro EMI</dt>
                <dd className="num">{fmtAed(offer.introEmi)}<small>/mo</small></dd>
              </div>
              <div>
                <dt>Revert EMI</dt>
                <dd className="num">
                  {fmtAed(offer.revertEmi)}<small>/mo</small>
                  <span className="bw-revert__delta num">+{fmtAed(offer.monthlyJump)}</span>
                </dd>
              </div>
              <div>
                <dt>5-yr interest</dt>
                <dd className="num font-semibold text-navy">{fmtAed(offer.fiveYearCost)}</dd>
              </div>
            </dl>
          </motion.div>
        ))}
      </div>

      <div className="bw-revert__summary">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass">
            5-year structure spread · {fmtAed(briefing.spreadFiveYear)}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/80">
            On a {tierLabel(loan)} loan, the lowest Year-1 teaser costs <strong className="num font-semibold text-white">{fmtAed(briefing.spreadFiveYear)}</strong> more in 5-year interest than the thinnest revert margin.
          </p>
        </div>
        <Link href="/rates/uae-mortgage-rates-eibor-revert-bible" className="bw-revert__summary-link">
          All 24 revert formulas <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}
