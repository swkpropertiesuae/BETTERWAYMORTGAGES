'use client';

import Link from 'next/link';
import { ArrowRight, FileDown, Globe, MessageCircle, ShieldCheck } from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { waLink } from '@/data/site';

/**
 * Band 8: Authoritative Framed Midnight Navy (#070E1A) Swiss Executive CTA Panel.
 * 100% localized across EN, AR, RU, ZH, FR, ES with 4K dark transparent brand wordmark.
 */
export default function FlagshipCta() {
  const { data } = useBenchmark();
  const { ext } = useLocaleCurrency();
  const icons = [ShieldCheck, FileDown, Globe, ArrowRight] as const;

  return (
    <section className="wrap py-16 lg:py-20" aria-labelledby="flagship-cta-title">
      <div className="bw-hot-beam-shell overflow-hidden p-[1px] shadow-[0_36px_84px_-34px_rgba(7,14,26,0.55)]">
        <div className="bw-fintech-stage !rounded-[21px] !border-0 p-8 sm:p-12 lg:p-14">
          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.14fr_0.86fr]">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <img
                  src="/brand/logo-horizontal-dark.png"
                  alt="Betterway Mortgages"
                  width={1400}
                  height={459}
                  className="h-10 w-auto sm:h-11"
                />
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#070e1a]/75 px-3 py-1 text-xs font-medium text-white">
                  <span className="bw-live-dot" aria-hidden="true" />
                  <span>CBUAE 3M EIBOR</span>
                  <strong className="num text-[#fcf1b7]">{data.latest.threeMonth.toFixed(2)}%</strong>
                </span>
              </div>

              <h2
                id="flagship-cta-title"
                className="font-display text-[clamp(28px,3.6vw,46px)] font-bold leading-[1.08] tracking-[-0.028em] text-white"
              >
                {ext.flagshipCta.heading}
              </h2>

              <p className="max-w-xl text-[15.5px] leading-relaxed text-white/74">{ext.flagshipCta.sub}</p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link href="/contact" className="homy-btn homy-btn--white !h-12 !px-6">
                  <span>{ext.flagshipCta.primaryCta}</span>
                  <span className="homy-btn__disc" aria-hidden="true">
                    <span className="homy-btn__arrow-track">
                      <ArrowRight size={14} strokeWidth={2.2} />
                      <ArrowRight size={14} strokeWidth={2.2} />
                    </span>
                  </span>
                </Link>
                <a
                  href={waLink('Hi Betterway Mortgages, I would like a 1-on-1 UAE mortgage comparison.')}
                  rel="noopener"
                  className="inline-flex h-12 items-center gap-2 rounded-[10px] border border-white/22 bg-white/[0.06] px-5 text-sm font-semibold text-white transition hover:border-[#d7b158]/70 hover:bg-white/[0.12]"
                >
                  <MessageCircle size={15} className="text-[#34dfac]" />
                  <span>{ext.flagshipCta.whatsappCta}</span>
                </a>
              </div>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              {ext.flagshipCta.cards.map(([metric, label], i) => {
                const Icon = icons[i];
                return (
                  <div
                    key={metric}
                    className="rounded-[16px] border border-white/12 bg-[#070e1a]/75 p-5"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/12 bg-white/[0.05] text-[#d7b158]">
                      <Icon size={16} />
                    </span>
                    <p className="mt-3 font-display text-lg font-bold text-white">{metric}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/65">{label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
