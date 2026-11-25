import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import '../globals.css';
import '../brand.css';
import { JsonLd } from '@/components/ui';
import Analytics from '@/components/Analytics';
import { enhancedOrgSchema, websiteSchema } from '@/lib/seo-schema';
import { SITE, waLink } from '@/data/site';
import { AR_UI } from '@/data/ar';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  robots: { index: true, follow: true },
  title: { default: 'بيترواي للتمويل العقاري — قارن 24 بنكاً في الإمارات', template: '%s | بيترواي للتمويل العقاري' },
  description: 'استشارات تمويل عقاري في النصر بلازا، عود ميثاء، دبي. قارن خيارات التمويل وافهم التكاليف قبل التقديم.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/favicon-256x256.png', sizes: '256x256', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#179373' }],
  },
  manifest: '/site.webmanifest',
  openGraph: { locale: 'ar_AE', images: [{ url: '/og.png', width: 1200, height: 630 }] },
};
export const viewport: Viewport = { themeColor: '#070E1A' };

const NAV: [string, string][] = [[AR_UI.mortgages, '/ar#mortgages'], [AR_UI.calculators, '/ar#calculators'], [AR_UI.rates, '/ar#rates'], [AR_UI.areas, '/ar#areas']];

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <header className="bw-header" data-scrolled="true">
          <div className="wrap bw-header__bar">
            <Link href="/ar" aria-label="بيترواي" className="bw-header__logo shrink-0">
              <img src="/brand/logo-light.svg" alt="Betterway Mortgages" width={1514} height={468} fetchPriority="high" />
            </Link>
            <nav className="hidden gap-4 lg:flex" aria-label="الرئيسية">
              {NAV.map(([l, h]) => (
                <Link key={h} href={h} className="whitespace-nowrap px-2 py-2 text-[14px] font-medium text-[#36454e] transition hover:text-[#080b0f]">
                  {l}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2.5">
              <Link href="/" lang="en" className="inline-flex h-[42px] items-center justify-center rounded-[12px] border border-[#080b0f]/20 px-4 text-xs font-semibold tracking-wider text-[#080b0f] transition hover:border-[#080b0f]">
                {AR_UI.english}
              </Link>
              <a href={waLink('مرحباً بيترواي، أرغب في الحصول على عرض تمويل عقاري.')} rel="noopener" className="homy-btn max-sm:hidden">
                <span>{AR_UI.cta}</span>
              </a>
            </div>
          </div>
        </header>
        <main id="main" className="bw-page-spacer">{children}</main>
        <div className="homy-footer-shell">
          <footer className="homy-footer-card px-6 py-12 text-sm">
            <div className="wrap space-y-4">
              <img src="/brand/logo-white-full.svg" alt="Betterway Mortgages" width={1450} height={468} className="h-auto w-[264px] max-w-full" />
              <p className="text-white/75">{AR_UI.address}</p>
              <p className="text-xs text-white/55">{AR_UI.disclosure}</p>
              <p className="text-xs text-white/55">© 2026 Betterway Mortgages LLC · <Link href="/privacy-and-cbuae-disclosure" className="ulink text-white/80">الإفصاح والخصوصية</Link></p>
            </div>
          </footer>
        </div>
        <Analytics />
        <JsonLd data={enhancedOrgSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
