'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { FOOTER_LINKS_I18N } from '@/data/i18n-extended';
import { DISCLOSURE_FULL, SITE, fullAddress } from '@/data/site';

const COL_KEYS: ('colBuyers' | 'colTools' | 'colSuite')[] = ['colBuyers', 'colTools', 'colSuite'];

export default function FooterClient() {
  const { locale, t, ext } = useLocaleCurrency();
  const f = t.footer;
  const fx = ext.footerExtra;
  const localizedLinks = FOOTER_LINKS_I18N[locale] ?? FOOTER_LINKS_I18N.en;

  return (
    <div className="homy-footer-shell">
      <footer className="homy-footer-card">
        {/* Top Executive CTA Banner + Twilight Downtown Dubai Aerial */}
        <div className="homy-footer-cta">
          <div className="homy-footer-cta__copy">
            <span className="homy-tag">
              <span className="homy-tag__ring" aria-hidden="true" />
              <span>{f.eyebrow}</span>
            </span>
            <h2>{f.heading}</h2>
            <p>{f.sub}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="homy-btn">
                <span className="bw-btn__label">{f.cta1}</span>
                <span className="homy-btn__disc" aria-hidden="true">
                  <span className="homy-btn__arrow-track">
                    <ArrowRight size={14} strokeWidth={2.2} />
                    <ArrowRight size={14} strokeWidth={2.2} />
                  </span>
                </span>
              </Link>
              <Link href="/calculators/mortgage-calculator" className="homy-btn homy-btn--outline">
                <span>{f.cta2}</span>
              </Link>
            </div>
          </div>

          <div className="homy-footer-villa">
            <img
              src="/images/footer-dubai-night-villa.webp"
              alt="High-resolution twilight aerial view of Downtown Dubai, Burj Khalifa, and illuminated Sheikh Zayed Road"
              width={2560}
              height={1440}
              loading="lazy"
              decoding="async"
            />
            <div className="homy-footer-watermark" aria-hidden="true">
              BETTERWAY
            </div>
          </div>
        </div>

        {/* Dark #0b1117 Footer Links Grid */}
        <div className="homy-footer-body">
          <div className="homy-footer-grid">
            <div className="space-y-5">
              <Link href="/" aria-label="Betterway Mortgages home" className="inline-block">
                <img
                  src="/brand/logo-horizontal-dark.png"
                  alt="Betterway Mortgages"
                  width={1400}
                  height={459}
                  className="h-14 w-auto sm:h-16"
                />
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-white/68">{f.tagline}</p>
              {SITE.licence && <p className="text-xs text-white/50">{SITE.licence}</p>}
            </div>

            {COL_KEYS.map((colKey) => (
              <div key={colKey} className="homy-footer-col">
                <h3>{f[colKey]}</h3>
                <ul>
                  {localizedLinks[colKey].map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="ulink">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="homy-footer-col">
              <h3>{f.contactTitle}</h3>
              <div className="grid gap-3.5">
                <a href={`mailto:${SITE.email}`} className="homy-contact-item hover:text-white">
                  <span className="homy-contact-icon" aria-hidden="true">
                    <Mail size={15} />
                  </span>
                  <span className="truncate">{SITE.email}</span>
                </a>
                {SITE.phone && (
                  <a href={SITE.phoneHref} className="homy-contact-item hover:text-white">
                    <span className="homy-contact-icon" aria-hidden="true">
                      <Phone size={15} />
                    </span>
                    <span>{SITE.phone}</span>
                  </a>
                )}
                <div className="homy-contact-item">
                  <span className="homy-contact-icon" aria-hidden="true">
                    <MapPin size={15} />
                  </span>
                  <span className="text-xs leading-snug text-white/75">{fullAddress}</span>
                </div>
                <div className="homy-contact-item">
                  <span className="homy-contact-icon" aria-hidden="true">
                    <Clock size={15} />
                  </span>
                  <span className="text-xs text-white/75">{SITE.hours}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="homy-footer-bottom">
            <p className="leading-relaxed">{DISCLOSURE_FULL}</p>
            <p>{fx.disclaimer}</p>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-white/75">
              <p>
                © 2026 {SITE.legalName}. {fx.rights}
              </p>
              <nav aria-label="Legal and SEO links" className="flex flex-wrap items-center gap-4">
                <Link href="/hot-offers" className="ulink">
                  {fx.betterDesk}
                </Link>
                <Link href="/insights" className="ulink">
                  {fx.insights}
                </Link>
                <Link href="/downloads" className="ulink">
                  {fx.pdfs}
                </Link>
                <Link href="/privacy-and-cbuae-disclosure" className="ulink">
                  {fx.privacy}
                </Link>
                <Link href="/sitemap" className="ulink">
                  {fx.sitemap}
                </Link>
                <span className="inline-flex items-center gap-2.5 border-s border-white/15 ps-3">
                  <Link href="/" lang="en" className="ulink">EN</Link>
                  <Link href="/ar" lang="ar" className="ulink">العربية</Link>
                  <Link href="/ru" lang="ru" className="ulink">RU</Link>
                  <Link href="/zh" lang="zh" className="ulink">中文</Link>
                  <Link href="/fr" lang="fr" className="ulink">FR</Link>
                  <Link href="/es" lang="es" className="ulink">ES</Link>
                </span>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
