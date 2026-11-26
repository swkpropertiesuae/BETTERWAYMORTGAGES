'use client';

import Link from 'next/link';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { FOOTER_LINKS_I18N } from '@/data/i18n-extended';
import { DISCLOSURE_FULL, SITE, fullAddress, waLink } from '@/data/site';

const COL_KEYS: ('colBuyers' | 'colTools' | 'colSuite')[] = ['colBuyers', 'colTools', 'colSuite'];

/**
 * Full-bleed Midnight Navy (#070E1A) Swiss / DIFC Institutional Footer.
 * 100% localized across EN, AR, RU, ZH, FR, ES with 4K dark transparent logo & CBUAE disclosures.
 */
export default function FooterClient() {
  const { locale, t, ext } = useLocaleCurrency();
  const f = t.footer;
  const fx = ext.footerExtra;
  const localizedLinks = FOOTER_LINKS_I18N[locale] ?? FOOTER_LINKS_I18N.en;

  return (
    <footer className="bw-footer">
      {/* Subtle 1px Champagne Gold Top Hairline */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-[#d7b158]/50 to-transparent"
      />

      <div className="wrap py-16 lg:py-20">
        <div className="bw-footer__grid">
          {/* Column 1: Brand Identity & Governance */}
          <div className="space-y-5">
            <Link href="/" aria-label="Betterway Mortgages home" className="inline-block">
              <img
                src="/brand/logo-horizontal-dark.png"
                alt="Betterway Mortgages"
                width={1400}
                height={459}
                className="h-11 w-auto sm:h-12"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/68">{f.tagline}</p>
            {SITE.licence && (
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/45">{SITE.licence}</p>
            )}
            <div className="pt-1">
              <a
                href={waLink('Hi Betterway Mortgages, I would like a UAE mortgage consultation.')}
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-white transition hover:border-[#d7b158]/60 hover:bg-white/[0.08]"
              >
                <MessageCircle size={14} className="text-[#34dfac]" />
                <span>WhatsApp Advisory Desk</span>
              </a>
            </div>
          </div>

          {/* Columns 2–4: Localized Institutional Navigation */}
          {COL_KEYS.map((colKey) => (
            <div key={colKey} className="bw-footer__col">
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

          {/* Column 5: Dubai HQ Contact */}
          <div className="bw-footer__col">
            <h3>{f.contactTitle}</h3>
            <div className="grid gap-3.5 text-sm text-white/75">
              <a href={`mailto:${SITE.email}`} className="flex items-start gap-2.5 transition hover:text-white">
                <Mail size={15} className="mt-0.5 shrink-0 text-[#d7b158]" />
                <span className="truncate">{SITE.email}</span>
              </a>
              {SITE.phone && (
                <a href={SITE.phoneHref} className="flex items-start gap-2.5 transition hover:text-white">
                  <Phone size={15} className="mt-0.5 shrink-0 text-[#d7b158]" />
                  <span className="num">{SITE.phone}</span>
                </a>
              )}
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[#d7b158]" />
                <span className="text-xs leading-relaxed text-white/70">{fullAddress}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock size={15} className="mt-0.5 shrink-0 text-[#d7b158]" />
                <span className="text-xs text-white/70">{SITE.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Regulatory Disclosure & 6-Language Strip */}
        <div className="mt-14 space-y-4 border-t border-white/10 pt-8 text-xs text-white/55">
          <p className="leading-relaxed">{DISCLOSURE_FULL}</p>
          <p>{fx.disclaimer}</p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-white/75">
            <p>
              © 2026 {SITE.legalName}. {fx.rights}
            </p>
            <nav aria-label="Legal and SEO links" className="flex flex-wrap items-center gap-4">
              <Link href="/hot-offers" className="ulink hover:text-white">
                {fx.betterDesk}
              </Link>
              <Link href="/insights" className="ulink hover:text-white">
                {fx.insights}
              </Link>
              <Link href="/downloads" className="ulink hover:text-white">
                {fx.pdfs}
              </Link>
              <Link href="/privacy-and-cbuae-disclosure" className="ulink hover:text-white">
                {fx.privacy}
              </Link>
              <Link href="/sitemap" className="ulink hover:text-white">
                {fx.sitemap}
              </Link>
              <span className="inline-flex items-center gap-2.5 border-s border-white/15 ps-3 font-mono text-[11px]">
                <Link href="/" lang="en" className="ulink hover:text-white">EN</Link>
                <Link href="/ar" lang="ar" className="ulink hover:text-white">العربية</Link>
                <Link href="/ru" lang="ru" className="ulink hover:text-white">RU</Link>
                <Link href="/zh" lang="zh" className="ulink hover:text-white">中文</Link>
                <Link href="/fr" lang="fr" className="ulink hover:text-white">FR</Link>
                <Link href="/es" lang="es" className="ulink hover:text-white">ES</Link>
              </span>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
