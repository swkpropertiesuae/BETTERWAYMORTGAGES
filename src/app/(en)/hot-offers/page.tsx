import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileDown, Flame, ShieldCheck } from 'lucide-react';
import { Cta, Crumbs, JsonLd, SectionTag } from '@/components/ui';
import { HotOffersTrigger } from '@/components/HotOffersPopup';
import { TEAM_SPECIALISTS } from '@/data/team';
import { BANKS } from '@/data/banks';
import { speakablePageSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Hot UAE Mortgage Offers & Priority Dubai Advisory Desk (2026–2027)',
  description:
    'Access Betterway’s live UAE mortgage comparison desk across 24 licensed conventional and Islamic banks: up to 80%/85% CBUAE LTV, buyout audits under the 1%/AED 10k cap, and AED 2M Golden Visa financing.',
  keywords: [
    'Dubai mortgage offers 2026',
    'UAE home loan deals',
    '24 UAE banks mortgage comparison',
    'Dubai mortgage refinance offer',
  ],
  alternates: { canonical: '/hot-offers' },
};

const ADVISORS = TEAM_SPECIALISTS.filter((m) => m.slug === 'reshma-rajan' || m.slug === 'rahaba-azeez');

export default function HotOffersPage() {
  return (
    <div className="holo-canvas pt-[112px] max-sm:pt-[94px]">
      <section className="holo-section holo-section--dark">
        <div className="mx-auto max-w-[1160px] space-y-6">
          <Crumbs items={[{ name: 'Hot Offers Desk', href: '/hot-offers' }]} />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#f1d57e]/40 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#f1d57e]">
                <Flame size={14} /> Priority UAE Bank Desk · 2026–2027
              </span>
              <h1 className="font-display text-[clamp(34px,4.5vw,60px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white">
                Compare {BANKS.length} UAE banks in one structured offer dossier.
              </h1>
              <p className="text-base leading-relaxed text-white/80" data-aeo-answer="true">
                Whether you are buying your first Dubai home (up to 80% expat / 85% UAE National LTV), auditing a
                post-fixed EIBOR revert margin under the 1% / AED 10,000 CBUAE cap, or structuring an AED 2,000,000+
                Golden Visa purchase from abroad, our Dubai advisory desk prepares written lender comparisons upfront.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <HotOffersTrigger label="Launch Interactive Hot Offers Popup" variant="hero" />
                <Cta href="/get-started" tone="light">
                  Start 60s Pre-Approval
                </Cta>
              </div>
            </div>

            {/* Official Betterway Female Advisors Showcase */}
            <div className="grid gap-4 sm:grid-cols-2">
              {ADVISORS.map((m) => (
                <div key={m.slug} className="overflow-hidden rounded-[22px] border border-white/15 bg-white/5">
                  <img
                    src={m.portrait}
                    alt={`${m.name} — ${m.designation}`}
                    width={800}
                    height={1000}
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                  <div className="p-4">
                    <p className="font-display text-base font-bold text-white">{m.name}</p>
                    <p className="text-xs font-medium text-[#34dfac]">{m.designation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="holo-section">
        <div className="mx-auto max-w-[1160px]">
          <SectionTag>Three CBUAE-Compliant Priority Tracks</SectionTag>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                badge: 'Up to 80% / 85% LTV',
                title: 'First-Home Resident Priority Desk',
                points: [
                  'Compare 24 UAE conventional & Islamic lenders',
                  'Itemised 4% DLD, 0.25% mortgage reg & trustee sheet',
                  '50% CBUAE DBR & credit-card limit stress test',
                ],
                href: '/get-started?goal=new-mortgage',
                cta: 'Check First-Home Eligibility',
              },
              {
                badge: '1% / AED 10k Exit Cap',
                title: 'Mortgage Buyout & Revert Audit',
                points: [
                  'Full Year 4+ EIBOR revert margin & floor inspection',
                  'Exact break-even month refinance calculation',
                  'Liability letter & dual-bank settlement planning',
                ],
                href: '/calculators/buyout-refinance-savings',
                cta: 'Run Buyout Calculator',
              },
              {
                badge: 'AED 2M+ Golden Visa',
                title: 'Non-Resident & Golden Visa Desk',
                points: [
                  '25 overseas buyer country playbooks supported',
                  'Title Deed / Oqood & lender NOC coordination',
                  'Remote Power of Attorney & FX timing checklist',
                ],
                href: '/mortgages/non-resident-dubai',
                cta: 'Explore Overseas Finance',
              },
            ].map((card) => (
              <div key={card.title} className="flex flex-col justify-between rounded-[22px] border border-[#e5e7eb] bg-[#f8f9fa] p-6">
                <div>
                  <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-bold text-[#0e6954]">{card.badge}</span>
                  <h2 className="mt-4 font-display text-xl font-bold text-[#070e1a]">{card.title}</h2>
                  <ul className="mt-4 space-y-2.5 text-sm text-[#464c5c]">
                    {card.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#179373]" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={card.href} className="homy-btn mt-6 w-full justify-between !h-11 !text-xs">
                  <span>{card.cta}</span>
                  <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
                    <ArrowRight size={13} />
                  </span>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-[#e5e7eb] bg-white p-5 text-xs text-[#464c5c]">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="shrink-0 text-[#179373]" />
              Betterway Mortgages LLC is a mortgage adviser, not a bank. Final pricing and approval rest solely with the licensed UAE lender.
            </span>
            <a
              href="/docs/Betterway-UAE-Mortgage-Buyer-Guide-2026.pdf"
              download
              className="inline-flex items-center gap-1.5 font-bold text-[#0e6954] hover:underline"
            >
              <FileDown size={14} /> Download Free 2026 PDF Guide
            </a>
          </div>
        </div>
      </section>

      <JsonLd
        data={speakablePageSchema(
          '/hot-offers',
          'Hot UAE Mortgage Offers & Priority Dubai Advisory Desk | Betterway Mortgages',
          'Compare 24 UAE lenders across first-home LTV, EIBOR buyout refinancing, and AED 2M Golden Visa financing.',
        )}
      />
    </div>
  );
}
