import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2, CheckCircle2, FileCheck2, MapPin, ShieldCheck } from 'lucide-react';
import { Cta, CtaBand, SectionTag } from '@/components/ui';
import { SpotlightCard } from '@/components/ui/MotionPrimitives';
import { COMMUNITIES } from '@/data/communities';

export const metadata: Metadata = {
  title: 'Betterway Property Closing Desk — Budget, Form F & Transfer Advisory Dubai',
  description:
    'Align your Dubai property purchase with verified bank pre-approval, Form F valuation protection clauses, independent valuation coordination, and DLD trustee conveyancing.',
  alternates: { canonical: '/concierge' },
};

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Budget-First Clarity Before Viewing',
    body: 'Know your exact CBUAE 50% DBR borrowing power and itemised 4% DLD closing cash before making an offer — eliminating financing fall-through risk.',
  },
  {
    icon: FileCheck2,
    title: 'Form F Valuation Protection Clauses',
    body: 'We help structure mortgage-contingent addenda on RERA Form F contracts so your deposit stays protected if an independent bank valuation comes in short.',
  },
  {
    icon: Building2,
    title: '60 UAE Freehold Communities Mapped',
    body: 'From Dubai Hills Estate and Palm Jumeirah to Saadiyat Island and Al Hamra Village, understand lender LTV rules and developer handover nuances upfront.',
  },
  {
    icon: CheckCircle2,
    title: 'Conveyancing to DLD Trustee Keys',
    body: 'Coordinated liability letters, developer NOCs, bank Final Offer Letters, and manager’s cheque splits managed cleanly through DLD transfer day.',
  },
] as const;

export default function ConciergePage() {
  const featuredAreas = COMMUNITIES.slice(0, 8);

  return (
    <div className="holo-canvas pt-[112px] max-sm:pt-[94px]">
      {/* Rounded Concierge Hero */}
      <section className="holo-section">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <SectionTag>Betterway Property Closing Desk</SectionTag>
            <h1 className="holo-display-h2">
              Confirm your financing before you sign Form F.
            </h1>
            <p className="holo-lead max-w-xl">
              Buyers routinely agree a price before checking credit-card DBR reductions, bank valuation norms, or total
              DLD transfer cash. Our Oud Metha closing desk aligns mortgage approval, Form F protection clauses, and
              trustee execution before funds move.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Cta href="/get-started">Build My 60s Dossier</Cta>
              <Cta href="/tools/form-f-clause-generator" tone="ghost">
                Form F Clause Generator
              </Cta>
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] shadow-xl">
            <img
              src="/images/dubai-interior-2560.webp"
              srcSet="/images/dubai-interior-1280.webp 1280w, /images/dubai-interior-2560.webp 2560w"
              sizes="(min-width: 1024px) 46vw, 100vw"
              alt="Concept image: sunlit luxury Dubai residence interior overlooking the skyline"
              width={2560}
              height={1440}
              className="aspect-[16/11] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4 Property Closing Pillars */}
      <section className="holo-section">
        <div className="mb-10 max-w-2xl space-y-3">
          <SectionTag>Why Buyers Start With Betterway</SectionTag>
          <h2 className="holo-display-h3">Every friction point between viewing and Title Deed — solved.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <SpotlightCard key={p.title} className="rounded-[22px] border border-[#eceef2] bg-[#f8f9fa] p-7">
                <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-[#0b1117] text-[#34dfac]">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-[#121217]">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#4b5b63]">{p.body}</p>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* Freehold Communities Preview */}
      <section className="holo-section holo-section--mint">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <SectionTag>60 UAE Freehold Communities</SectionTag>
            <h2 className="holo-display-h3">Explore financing guides by community</h2>
          </div>
          <Cta href="/areas" size="sm">
            {`View All ${COMMUNITIES.length} Communities`}
          </Cta>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.emirate}/${area.slug}`}
              className="group flex flex-col justify-between rounded-[18px] border border-[#dce5e1] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#179373] hover:shadow-md"
            >
              <div>
                <p className="flex items-center gap-1.5 font-display text-base font-bold text-[#121217] group-hover:text-[#0e6954]">
                  <MapPin size={14} className="text-[#179373]" /> {area.name}
                </p>
                <p className="mt-1.5 text-xs text-[#6c6c89]">{area.devs}</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#0e6954]">
                Community mortgage guide <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="rounded-[28px] overflow-hidden">
        <CtaBand
          title="Ready to pair your property shortlist with a 24-bank pre-approval?"
          body="Start our 60-second readiness check or speak directly with our Oud Metha, Dubai closing desk."
        />
      </div>
    </div>
  );
}
