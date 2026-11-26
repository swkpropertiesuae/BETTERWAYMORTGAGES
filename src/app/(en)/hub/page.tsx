import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileCheck2, Handshake, Smartphone, TrendingUp } from 'lucide-react';
import { Cta, SectionTag } from '@/components/ui';
import { SpotlightCard } from '@/components/ui/MotionPrimitives';
import LogoMarquee from '@/components/LogoMarquee';
import FlagshipCta from '@/components/ui/FlagshipCta';
import { BANKS } from '@/data/banks';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'BetterHub — RERA Real Estate Agency Mortgage Portal | Betterway Mortgages',
  description:
    'BetterHub for Dubai & UAE real estate brokerages: co-branded mortgage calculators, verified buyer DBR readiness, live milestone tracking, and RERA partner onboarding.',
  alternates: { canonical: '/hub' },
};

const AGENT_BENEFITS = [
  {
    icon: CheckCircle2,
    title: 'Verify Buyer Readiness Before Viewings',
    body: 'Send your buyer a co-branded 60-second DBR & DLD cash-to-close link so you know their real financing headroom before negotiating Form F.',
  },
  {
    icon: FileCheck2,
    title: 'Live Deal Progression Visibility',
    body: 'Follow every referred client cleanly through Pre-Approval, Bank Valuation, Final Offer Letter, and DLD Trustee Transfer inside Betterway OS.',
  },
  {
    icon: Handshake,
    title: 'Transparent Written Partner Agreements',
    body: 'Formal brokerage referral agreements with clear documentation, bank-neutral execution across 24 UAE lenders, and dedicated case managers.',
  },
  {
    icon: TrendingUp,
    title: 'Protect Your Commission From Deal Collapse',
    body: 'Our underwriters catch credit card DBR traps, off-plan valuation gaps, and liability-letter bottlenecks early — keeping deals moving to transfer.',
  },
] as const;

export default function HubPage() {
  return (
    <div className="holo-canvas holo-canvas--page">
      <section className="holo-section holo-section--mint">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <SectionTag>BetterHub · For RERA Agencies</SectionTag>
            <h1 className="holo-display-h2">
              Bring financing-ready buyers to every viewing and transfer.
            </h1>
            <p className="holo-lead max-w-xl">
              BetterHub connects Dubai and UAE real estate brokerages directly to our 24-bank underwriting specialists,
              co-branded DBR calculators, and BetterCore milestone tracking.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Cta href="/partners/register">Join BetterHub</Cta>
              <Cta href={SITE.osPartnerHubUrl} tone="ghost" external>
                Open BetterHub Portal
              </Cta>
            </div>
          </div>

          <div className="bw-fintech-stage">
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold">
                <Smartphone size={14} className="text-[#34dfac]" /> BetterHub · Agent Workspace
              </span>
              <span className="num text-xs text-[#f1d57e]">24 UAE Banks</span>
            </div>

            <div className="my-6 space-y-3">
              {[
                ['Step 01 · Buyer DBR Verified', '50% CBUAE cap & upfront 4% DLD confirmed', 'Ready'],
                ['Step 02 · 24-Lender Comparison', 'Written fixed, revert margin & floor sheet', 'Active'],
                ['Step 03 · Valuation & Form F', 'Independent bank valuation & NOC tracked', 'Protected'],
                ['Step 04 · Trustee Transfer Day', 'Cheque split & handover coordinated', 'Clear'],
              ].map(([title, sub, badge]) => (
                <div
                  key={title}
                  className="flex items-center justify-between gap-3 rounded-[16px] border border-white/12 bg-white/[0.06] px-4 py-3.5 backdrop-blur-md"
                >
                  <div>
                    <p className="font-display text-sm font-bold text-white">{title}</p>
                    <p className="text-xs text-white/65">{sub}</p>
                  </div>
                  <span className="rounded-full bg-[#179373]/25 px-2.5 py-1 text-[11px] font-bold text-[#34dfac]">
                    {badge}
                  </span>
                </div>
              ))}
            </div>

            <Link href="/partners/co-branded-tools" className="inline-flex items-center gap-2 text-xs font-semibold text-[#f1d57e] hover:underline">
              Try Co-Branded Agent Calculators <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="holo-section">
        <div className="mb-10 max-w-2xl space-y-3">
          <SectionTag>Built For High-Performing Brokerages</SectionTag>
          <h2 className="holo-display-h3">Everything your sales floor needs from first viewing to transfer.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {AGENT_BENEFITS.map((item) => {
            const Icon = item.icon;
            return (
            <SpotlightCard key={item.title} className="rounded-[22px] border border-[#dce7e2] bg-white/92 p-7 backdrop-blur-md">
              <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-[#080b0f] text-[#ffe074]">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-[#080b0f]">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#4f596b]">{item.body}</p>
            </SpotlightCard>
          );
        })}
        </div>

        <div className="mt-10 border-y border-[#0a1424]/[0.08] py-6">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#4f596b]">
            Every BetterHub referral compared neutrally across {BANKS.length} licensed UAE banks
          </p>
          <LogoMarquee
            label="24 UAE banks compared for BetterHub partner referrals"
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
