import type { Metadata } from 'next';
import { Building2, CheckCircle2, Cpu, Globe2, Layers, ShieldCheck } from 'lucide-react';
import { Cta, SectionTag } from '@/components/ui';
import { SpotlightCard } from '@/components/ui/MotionPrimitives';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Edge by Betterway — UAE Mortgage Brokerage OS & Infrastructure',
  description:
    'Scale your UAE mortgage practice with Edge by Betterway: Betterway OS CRM, 24-bank comparison architecture, CBUAE KFS & DBR tools, and bilingual EN/AR client portals.',
  alternates: { canonical: '/edge' },
};

const TIERS = [
  {
    badge: 'For Independent Advisors',
    name: 'Edge Solo',
    desc: 'Purpose-built operating stack for senior Dubai mortgage consultants who want institutional tools without rebuilding technology from scratch.',
    points: [
      'Direct access to Betterway OS client pipeline & document vault',
      'Deterministic CBUAE 50% DBR, DLD Closing & Fixed-vs-Revert tools',
      'Bilingual English & Arabic client-facing readiness links',
      'Conveyancing & DLD transfer coordination desk support',
    ],
  },
  {
    badge: 'For Brokerages & Teams',
    name: 'Edge Enterprise',
    desc: 'Complete multi-advisor infrastructure for growing UAE mortgage brokerages and real estate groups launching an in-house finance desk.',
    points: [
      'Multi-seat Betterway OS workspace with role-based permissions',
      'Co-branded RERA Partner Hub for external real estate agencies',
      'Standardised CBUAE Key Facts Statement (KFS) & compliance audit trails',
      'Dedicated onboarding from our Oud Metha, Dubai leadership team',
    ],
  },
] as const;

export default function EdgePage() {
  return (
    <div className="holo-canvas pt-[106px] max-sm:pt-[88px]">
      <section className="holo-section holo-section--dark">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <SectionTag light>Edge by Betterway · Brokerage OS</SectionTag>
            <h1 className="font-display text-[clamp(36px,4.8vw,68px)] font-extrabold leading-[1.03] tracking-[-0.03em] text-white">
              Build and scale your UAE mortgage business on Betterway OS.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/75">
              Everything behind Betterway’s 24-bank comparison intelligence, live CBUAE EIBOR calculators, and digital
              closing workflows — engineered as modern infrastructure for advisors and teams.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Cta href="/contact" tone="light">
                Request Edge Demo
              </Cta>
              <Cta href={SITE.osLoginUrl} tone="ghost" external className="!border-white/30 !text-white hover:!bg-white/10">
                Sign in to Betterway OS
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

      <section className="holo-section">
        <div className="mb-10 max-w-2xl space-y-3">
          <SectionTag>Two Ways To Run On Edge</SectionTag>
          <h2 className="holo-display-h3">Choose the structure that fits your practice</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {TIERS.map((t) => (
            <SpotlightCard key={t.name} className="flex flex-col justify-between rounded-[24px] border border-[#e5e7eb] bg-[#f8f9fa] p-8">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0e6954] border border-[#e5e7eb]">
                  <Building2 size={13} /> {t.badge}
                </span>
                <h3 className="mt-4 font-display text-3xl font-extrabold text-[#121217]">{t.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5b63]">{t.desc}</p>
                <ul className="mt-6 space-y-3 text-sm text-[#121217]">
                  {t.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#179373]" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Cta href="/contact">{`Discuss ${t.name}`}</Cta>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </div>
  );
}
