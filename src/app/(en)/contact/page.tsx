import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, MessageCircle, ShieldCheck } from 'lucide-react';
import { SectionTag } from '@/components/ui';
import { SlotPicker, LeadForm } from '@/components/client';
import ContactLocationMap from '@/components/ContactLocationMap';
import { SITE, fullAddress, waLink } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact & Visit — Al Nasr Plaza, Oud Metha, Dubai',
  description:
    'Visit Betterway Mortgages at Al Nasr Plaza, Oud Metha Road, Dubai, book a consultation slot or message an advisor.',
  alternates: { canonical: '/contact' },
};

export default function Page() {
  const q = encodeURIComponent(`${SITE.address.building}, ${SITE.address.street}, ${SITE.address.district}, Dubai`);
  return (
    <div className="bg-white">
      {/* Swiss Institutional Consultation Split */}
      <section className="border-b border-[#e3e7ee] py-12 lg:py-16">
        <div className="wrap">
          <div className="homy-head">
            <div className="homy-head__left">
              <SectionTag>Dubai Advisory Desk</SectionTag>
              <h1 className="homy-h2 !text-[clamp(32px,4vw,50px)]">
                Structure your UAE mortgage <span className="serif font-normal">with clarity.</span>
              </h1>
            </div>
            <div className="homy-head__right">
              <p className="homy-sub">
                Meet our underwriting specialists at Al Nasr Plaza, Oud Metha or book a 1-on-1 call across 24 licensed
                UAE banks before signing Form F.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
            {/* Left: Midnight Navy Institutional Office Card + Consultation Slot Picker */}
            <div className="space-y-6">
              <div className="bw-fintech-stage p-7 sm:p-8">
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <img
                      src="/brand/logo-horizontal-dark.png"
                      alt="Betterway Mortgages"
                      width={1400}
                      height={459}
                      className="h-9 w-auto"
                    />
                    <span className="rounded-[7px] border border-[#d7b158]/35 bg-[#070e1a] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fcf1b7]">
                      Dubai HQ
                    </span>
                  </div>

                  <div className="border-t border-white/10 pt-5">
                    <h2 className="font-display text-2xl font-bold text-white">Our Institutional Standard</h2>
                    <p className="mt-2 text-sm leading-relaxed text-white/74">
                      Side-by-side written bank comparisons, verified 50% CBUAE DBR calculations, and full 4% DLD fee
                      itemization — with zero upfront consultation fee.
                    </p>
                  </div>

                  <div className="space-y-3 border-t border-white/10 pt-5 text-sm text-white/85">
                    <p className="flex gap-2.5">
                      <MapPin className="mt-0.5 shrink-0 text-[#d7b158]" size={16} />
                      <span>{fullAddress}</span>
                    </p>
                    {SITE.phone && (
                      <p className="flex gap-2.5">
                        <Phone className="mt-0.5 shrink-0 text-[#d7b158]" size={16} />
                        <a href={SITE.phoneHref} className="num ulink">
                          {SITE.phone}
                        </a>
                      </p>
                    )}
                    <p className="flex gap-2.5">
                      <Mail className="mt-0.5 shrink-0 text-[#d7b158]" size={16} />
                      <a href={`mailto:${SITE.email}`} className="ulink">
                        {SITE.email}
                      </a>
                    </p>
                    <p className="flex gap-2.5">
                      <Clock className="mt-0.5 shrink-0 text-[#d7b158]" size={16} />
                      <span>{SITE.hours}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <a className="homy-btn homy-btn--white bw-btn--sm" href={waLink()} rel="noopener">
                      <MessageCircle size={14} /> Message on WhatsApp
                    </a>
                    <a
                      className="inline-flex h-10 items-center rounded-[10px] border border-white/22 px-4 text-xs font-semibold text-white transition hover:border-[#d7b158] hover:text-[#fcf1b7]"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
                      rel="noopener"
                    >
                      Get directions
                    </a>
                  </div>

                  <p className="flex items-start gap-2 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-white/55">
                    <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[#34dfac]" />
                    <span>
                      Betterway Mortgages LLC is an independent mortgage adviser, not a bank. Lending approvals and
                      Final Offer Letters are issued directly by licensed UAE lenders.
                    </span>
                  </p>
                </div>
              </div>

              <SlotPicker />
            </div>

            {/* Right: Swiss Stone Form Surface */}
            <div className="homy-contact-form-box">
              <LeadForm topic="Pre-approval request" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Dubai Office Location Map & Directions Suite */}
      <section aria-label="Dubai office location and directions" className="bg-[#f7f8fa] py-14">
        <div className="wrap">
          <ContactLocationMap />
        </div>
      </section>
    </div>
  );
}
