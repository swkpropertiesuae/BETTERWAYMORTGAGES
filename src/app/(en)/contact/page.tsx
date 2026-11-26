import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
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
    <div className="bw-page-spacer bg-white">
      {/* Fintech Contact Page Split Header + Dark Commitment Card & Frosted Form */}
      <section className="py-12 lg:py-20">
        <div className="wrap">
          <div className="homy-head">
            <div className="homy-head__left">
              <SectionTag>Contact Us</SectionTag>
              <h1 className="homy-h2 !text-[clamp(36px,4.2vw,54px)]">
                Let’s help you structure the right Dubai mortgage
              </h1>
            </div>
            <div className="homy-head__right">
              <p className="homy-sub">
                Whether you are buying your first home, investing from abroad, or refinancing, we guide every step with
                clarity.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            {/* Left: Fintech Commitment Card + Office Details */}
            <div className="space-y-6">
              <div className="homy-commitment-card bw-fintech-stage !min-h-0 !rounded-[26px]">
                <div className="space-y-4">
                  <img
                    src="/brand/icon.png"
                    alt="Betterway Mortgages"
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain drop-shadow-[0_10px_24px_rgba(23,147,115,0.3)]"
                  />
                  <h2 className="font-display text-2xl font-semibold text-white">Our Commitment</h2>
                  <p className="max-w-md text-sm leading-relaxed text-white/75">
                    Helping Dubai &amp; UAE buyers compare lenders, verify CBUAE statutory ratios, and prepare for
                    transfer day — with transparency, speed, and zero surprises.
                  </p>
                  <div className="space-y-2.5 pt-2 text-sm text-white/85">
                    <p className="flex gap-2.5">
                      <MapPin className="mt-0.5 shrink-0 text-[#f1d57e]" size={17} />
                      <span>{fullAddress}</span>
                    </p>
                    {SITE.phone && (
                      <p className="flex gap-2.5">
                        <Phone className="mt-0.5 shrink-0 text-[#f1d57e]" size={17} />
                        <a href={SITE.phoneHref} className="ulink">
                          {SITE.phone}
                        </a>
                      </p>
                    )}
                    <p className="flex gap-2.5">
                      <Mail className="mt-0.5 shrink-0 text-[#f1d57e]" size={17} />
                      <a href={`mailto:${SITE.email}`} className="ulink">
                        {SITE.email}
                      </a>
                    </p>
                    <p className="flex gap-2.5">
                      <Clock className="mt-0.5 shrink-0 text-[#f1d57e]" size={17} />
                      <span>{SITE.hours}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-3">
                    <a className="homy-btn homy-btn--white !h-10 !px-4 !text-xs" href={waLink()} rel="noopener">
                      <MessageCircle size={15} /> Email an advisor
                    </a>
                    <a
                      className="inline-flex h-10 items-center rounded-[12px] border border-white/25 px-4 text-xs font-medium text-white transition hover:border-white"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
                      rel="noopener"
                    >
                      Get directions
                    </a>
                  </div>
                </div>

                <div className="relative z-10 -mx-8 mt-8 overflow-hidden rounded-b-[24px]">
                  <img
                    src="/images/footer-dubai-night-villa.webp"
                    alt="Twilight aerial view of Downtown Dubai, Burj Khalifa, and illuminated Sheikh Zayed Road"
                    width={1376}
                    height={768}
                    className="h-56 w-full object-cover object-center"
                  />
                </div>
              </div>

              <SlotPicker />
            </div>

            {/* Right: Homy #f6f6f6 Form Box */}
            <div className="homy-contact-form-box">
              <LeadForm topic="Pre-approval request" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Dubai Office Location Map & Directions Suite */}
      <section aria-label="Dubai office location and directions" className="pb-14">
        <div className="wrap">
          <ContactLocationMap />
        </div>
      </section>
    </div>
  );
}
