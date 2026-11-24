import type { Metadata, Viewport } from 'next';
import '../globals.css';
import '../startup.css';
import '../brand.css';
import Header from '@/components/Header';
import CoPilot from '@/components/CoPilot';
import MotionKit from '@/components/MotionKit';
import { Footer, JsonLd, orgSchema } from '@/components/ui';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Betterway Mortgages — Dubai Home Mortgages & UAE Advisory', template: '%s | Betterway Mortgages' },
  description: 'Independent Dubai & UAE mortgage advisory across 24 lenders. Compare EIBOR rates, CBUAE statutory LTV & DBR rules, and upfront DLD closing costs with Betterway.',
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
  openGraph: { type: 'website', siteName: SITE.name, images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Betterway Mortgages — Dubai Home Mortgages & UAE Advisory' }], locale: 'en_AE' },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
  alternates: { languages: { 'en-AE': '/', 'ar-AE': '/ar' } },
};

export const viewport: Viewport = { themeColor: '#070E1A', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-btn focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CoPilot />
        <MotionKit />
        <JsonLd data={orgSchema()} />
      </body>
    </html>
  );
}
