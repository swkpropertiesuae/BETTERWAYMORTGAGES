import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import '../globals.css';
import '../brand.css';
import { JsonLd } from '@/components/ui';
import Analytics from '@/components/Analytics';
import OsLiveChat from '@/components/OsLiveChat';
import GlobalShaderBackdrop from '@/components/ui/GlobalShaderBackdrop';
import { LocaleCurrencyProvider } from '@/components/LocaleCurrencyContext';
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
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/favicon-256x256.png', sizes: '256x256', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: [{ url: '/favicon.ico' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#179373' }],
  },
  manifest: '/site.webmanifest',
  openGraph: { locale: 'ar_AE', images: [{ url: '/og.png', width: 1200, height: 630 }] },
};
export const viewport: Viewport = { themeColor: '#0E9E77' };

const NAV: [string, string][] = [[AR_UI.mortgages, '/ar#mortgages'], [AR_UI.calculators, '/ar#calculators'], [AR_UI.rates, '/ar#rates'], [AR_UI.areas, '/ar#areas']];

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="relative min-h-screen bg-transparent">
        <GlobalShaderBackdrop />
        <LocaleCurrencyProvider initialLocale="ar">
        <header className="bw-header" data-scrolled="true">
          <div className="wrap bw-header__bar">
            <Link href="/ar" aria-label="بيترواي" className="bw-header__logo shrink-0">
              <img src="/brand/logo-horizontal-light.png" alt="Betterway Mortgages" width={1400} height={459} fetchPriority="high" />
            </Link>
            <nav className="hidden gap-4 lg:flex" aria-label="الرئيسية">
              {NAV.map(([l, h]) => (
                <Link key={h} href={h} className="whitespace-nowrap px-2 py-2 text-[14px] font-medium text-[#36454e] transition hover:text-[#080b0f]">
                  {l}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1 rounded-full border border-[#080b0f]/15 bg-[#f4f6f8] px-2.5 py-1 text-[11px] font-semibold text-[#080b0f] sm:inline-flex">
                <Link href="/" lang="en" className="px-1.5 py-0.5 hover:text-[#0e6954]">EN</Link>
                <Link href="/ru" lang="ru" className="px-1.5 py-0.5 hover:text-[#0e6954]">RU</Link>
                <Link href="/zh" lang="zh" className="px-1.5 py-0.5 hover:text-[#0e6954]">中文</Link>
                <Link href="/fr" lang="fr" className="px-1.5 py-0.5 hover:text-[#0e6954]">FR</Link>
                <Link href="/es" lang="es" className="px-1.5 py-0.5 hover:text-[#0e6954]">ES</Link>
              </div>
              <Link href="/" lang="en" className="inline-flex h-[42px] items-center justify-center rounded-[12px] border border-[#080b0f]/20 px-4 text-xs font-semibold tracking-wider text-[#080b0f] transition hover:border-[#080b0f] sm:hidden">
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
              <img src="/brand/logo-horizontal-dark.png" alt="Betterway Mortgages" width={1400} height={459} className="h-auto w-[264px] max-w-full" />
              <p className="text-white/75">{AR_UI.address}</p>
              <p className="text-xs text-white/55">{AR_UI.disclosure}</p>
              <p className="text-xs text-white/55">© 2026 Betterway Mortgages LLC · <Link href="/privacy-and-cbuae-disclosure" className="ulink text-white/80">الإفصاح والخصوصية</Link></p>
            </div>
          </footer>
        </div>
        <OsLiveChat />
        <Analytics />
        <JsonLd data={enhancedOrgSchema()} />
        <JsonLd data={websiteSchema()} />
        </LocaleCurrencyProvider>
      </body>
    </html>
  );
}
