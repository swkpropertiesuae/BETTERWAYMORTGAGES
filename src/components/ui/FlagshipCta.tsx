'use client';

import Link from 'next/link';
import { ArrowRight, FileDown, Globe, MessageCircle, ShieldCheck } from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
import { BANKS } from '@/data/banks';
import { waLink } from '@/data/site';

/**
 * Flagship Brand-Quality Executive CTA Band (21st.dev Conic Border-Beam + Fintech Mesh).
 * Showcases Betterway's centered-MORTGAGES brand identity, live EIBOR telemetry, and 1-on-1 Dubai advisory craft.
 */
export default function FlagshipCta() {
  const { data } = useBenchmark();

  return (
    <section className="mx-auto w-full max-w-[1320px] px-1" aria-labelledby="flagship-cta-title">
      <div className="bw-hot-beam-shell overflow-hidden rounded-[30px] p-[2px] shadow-[0_38px_90px_-32px_rgba(7,13,25,0.62)]">
        <div className="bw-fintech-stage !min-h-0 !rounded-[28px] !border-0 !p-8 sm:!p-12 lg:!p-14">
          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              {/* Brand Crest + Live Telemetry */}
              <div className="flex flex-wrap items-center gap-4">
                <img
                  src="/brand/logo-horizontal-dark.png"
                  alt="Betterway Mortgages"
                  width={1400}
                  height={419}
                  className="h-11 w-auto sm:h-12"
                />
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white">
                  <span className="h-2 w-2 rounded-full bg-[#00d69a]" />
                  <span>CBUAE 3M EIBOR</span>
                  <strong className="num text-[#ffe074]">{data.latest.threeMonth.toFixed(2)}%</strong>
                </span>
              </div>

              <h2
                id="flagship-cta-title"
                className="font-display text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white"
              >
                Institutional mortgage clarity—delivered 1-on-1 in Dubai.
              </h2>

              <p className="max-w-xl text-[16px] leading-relaxed text-white/78">
                Speak directly with our Oud Metha advisory desk before booking a property. We compare {BANKS.length}{' '}
                licensed UAE banks side by side, map every dirham of 4% DLD transfer fees, and guide you calmly to keys.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link href="/contact" className="homy-btn homy-btn--white !h-12 !px-6 !text-[14.5px]">
                  <span>Book Your 1-on-1 Advisory Call</span>
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
                  className="inline-flex h-12 items-center gap-2 rounded-[12px] border border-white/25 bg-white/10 px-5 text-sm font-bold text-white backdrop-blur-md transition hover:border-[#00d69a] hover:bg-white/18"
                >
                  <MessageCircle size={16} className="text-[#00d69a]" />
                  <span>WhatsApp Dubai Desk</span>
                </a>
              </div>
            </div>

            {/* Right: Institutional Trust & Proof Bento */}
            <div className="grid gap-3.5 sm:grid-cols-2">
              {[
                {
                  icon: ShieldCheck,
                  metric: `${BANKS.length} UAE Banks`,
                  label: 'Conventional & Islamic compared neutrally in writing',
                },
                {
                  icon: FileDown,
                  metric: '52 Free PDFs',
                  label: 'Neglected CBUAE, Form F & DLD rules—zero email gate',
                },
                {
                  icon: Globe,
                  metric: '6 Languages',
                  label: 'EN · العربية · RU · 中文 · FR · ES + 8 live currencies',
                },
                {
                  icon: ArrowRight,
                  metric: 'Zero Impact',
                  label: 'Assess 50% DBR headroom with 0% AECB credit score hit',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.metric}
                    className="rounded-[18px] border border-white/14 bg-white/[0.06] p-5 backdrop-blur-md"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/10 text-[#ffe074]">
                      <Icon size={17} />
                    </span>
                    <p className="mt-3 font-display text-xl font-extrabold text-white">{item.metric}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/70">{item.label}</p>
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
