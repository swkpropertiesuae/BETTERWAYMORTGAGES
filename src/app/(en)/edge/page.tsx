import type { Metadata } from 'next';
import { Building2, CheckCircle2, Cpu, Globe2, Layers, ShieldCheck } from 'lucide-react';
import { Cta, SectionTag } from '@/components/ui';
import { SpotlightCard } from '@/components/ui/MotionPrimitives';
import LogoMarquee from '@/components/LogoMarquee';
import FlagshipCta from '@/components/ui/FlagshipCta';
import { BANKS } from '@/data/banks';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'BetterCore — UAE Mortgage Operating Infrastructure | Betterway Mortgages',
  description:
    'Operate your UAE mortgage practice on BetterCore: 24-bank policy matrices, CBUAE KFS & DBR workflows, BetterVault client rooms, and 6-language digital tools.',
  alternates: { canonical: '/edge' },
};

const TIERS = [
  {
    badge: 'For Independent Advisors',
    name: 'Betterway Solo Desk',
    desc: 'Structured operating stack for experienced Dubai mortgage advisors who want institutional lender tools and compliance documentation ready from day one.',
    points: [
      'Direct access to Betterway OS client pipeline & document vault',
      'Deterministic CBUAE 50% DBR, DLD Closing & Fixed-vs-Revert tools',
      'Bilingual English & Arabic client-facing readiness links',
      'Conveyancing & DLD transfer coordination desk support',
    ],
  },
  {
    badge: 'For Brokerages & Teams',
    name: 'Betterway Enterprise Desk',
    desc: 'Multi-advisor infrastructure for growing UAE mortgage brokerages and real estate groups building an in-house home finance division.',
    points: [
      'Multi-seat Betterway OS workspace with role-based permissions',
      'Co-branded RERA Partner Portal for external real estate agencies',
      'Standardised CBUAE Key Facts Statement (KFS) & compliance audit trails',
      'Dedicated onboarding from our Oud Metha, Dubai leadership team',
    ],
  },
] as const;

export default function EdgePage() {
  return (
    <div className="holo-canvas holo-canvas--page">
      <div className="wrap py-8 lg:py-12">
      <section className="holo-section bw-fintech-stage !min-h-0 !rounded-[22px] !border border-[#d7b158]/25">
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <SectionTag light>BetterCore · Proprietary Operating Core</SectionTag>
            <h1 className="font-display text-[clamp(36px,4.8vw,68px)] font-extrabold leading-[1.03] tracking-[-0.03em] text-white">
              Run your UAE mortgage practice on BetterCore.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/75">
              Our 24-bank comparison schedules, daily CBUAE EIBOR calculators, and structured transfer-day workflows —
              built as reliable operating infrastructure for advisors and brokerage teams.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Cta href="/contact" tone="light">
                Request BetterCore Demo
              </Cta>
              <Cta href={SITE.osLoginUrl} tone="ghost" external className="!border-white/30 !text-white hover:!bg-white/10">
                Sign in to BetterVault
              </Cta>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              [Cpu, 'Deterministic Math Engine', 'Instant CBUAE LTV, 50% DBR, and itemised DLD calculations'],
              [Layers, '24-Lender Directory', 'Conventional & Islamic UAE lender matrices in one desk'],
              [ShieldCheck, 'CBUAE Compliance Ready', 'Transparent written-offer workflows and KFS checklists'],
              [Globe2, 'Bilingual EN & العربية', 'Native right-to-left Arabic client journeys out of the box'],
            ].map(([Icon, title, body]) => {
              const Comp = Icon as typeof Cpu;
              return (
                <div
                  key={title as string}
                  className="rounded-[20px] border border-white/12 bg-white/[0.05] p-5 backdrop-blur-md"
                >
                  <Comp size={22} className="text-[#34dfac]" />
                  <h3 className="mt-4 font-display text-base font-bold text-white">{title as string}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/65">{body as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      </div>

      <section className="holo-section">
        <div className="mb-10 max-w-2xl space-y-3">
          <SectionTag>Two Ways To Run On BetterCore</SectionTag>
          <h2 className="holo-display-h3">Choose the structure that fits your practice</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {TIERS.map((t) => (
            <SpotlightCard key={t.name} className="flex flex-col justify-between rounded-[24px] border border-[#dce7e2] bg-white/92 p-8 backdrop-blur-md">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-bold text-[#0e6954] border border-[#cce5dc]">
                  <Building2 size={13} /> {t.badge}
                </span>
                <h3 className="mt-4 font-display text-3xl font-extrabold text-[#080b0f]">{t.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4f596b]">{t.desc}</p>
                <ul className="mt-6 space-y-3 text-sm text-[#080b0f]">
                  {t.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#0e6954]" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 border-t border-[#ebf0ee] pt-5">
                <Cta href="/contact">{`Discuss ${t.name}`}</Cta>
              </div>
            </SpotlightCard>
          ))}
        </div>

        <div className="mt-10 border-y border-[#0a1424]/[0.08] py-6">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#4f596b]">
            BetterCore structured policy matrix across {BANKS.length} UAE lenders
          </p>
          <LogoMarquee
            label="24 licensed UAE lenders in BetterCore matrix"
            items={BANKS.map((b) => ({ id: b.key, label: b.name, logo: b.logo, href: `/rates/${b.slug}` }))}
            speed={64}
          />
        </div>
      </section>

      <div className="px-4 pb-6 sm:px-6">
        <FlagshipCta />
      </div>
    </div>
  );
}
