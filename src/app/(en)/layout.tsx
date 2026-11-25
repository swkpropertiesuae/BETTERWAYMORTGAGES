import type { Metadata, Viewport } from 'next';
import '../globals.css';
import '../startup.css';
import '../brand.css';
import Header from '@/components/Header';
import CoPilot from '@/components/CoPilot';
import ResumeJourneyToast from '@/components/ecosystem/ResumeJourneyToast';
import HotOffersPopup from '@/components/HotOffersPopup';
import Analytics from '@/components/Analytics';
import MotionKit from '@/components/MotionKit';
import { Footer, JsonLd } from '@/components/ui';
import { SITE } from '@/data/site';
import { TRENDING_UAE_KEYWORDS, enhancedOrgSchema, websiteSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  title: {
    default: 'Betterway Mortgages — Dubai Home Mortgages, 24 UAE Banks & DLD Calculator',
    template: '%s | Betterway Mortgages UAE',
  },
  description:
    'Independent Dubai & UAE mortgage advisory comparing 24 licensed conventional & Islamic banks. Live CBUAE EIBOR rates, 50% DBR check, 4% DLD closing calculator, free PDF guides, and priority pre-approval.',
  keywords: TRENDING_UAE_KEYWORDS,
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: 'Finance',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: SITE.name,
    statusBarStyle: 'black-translucent',
  },
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
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    url: SITE.url,
    title: 'Betterway Mortgages — Dubai Home Mortgages & 24 UAE Banks Compared',
    description:
      'Compare 24 licensed UAE conventional & Islamic lenders, live CBUAE EIBOR fixings, 50% DBR headroom, and 4% DLD upfront fees in one clear platform.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Betterway Mortgages — Dubai Home Mortgages & UAE Advisory' }],
    locale: 'en_AE',
    alternateLocale: ['ar_AE'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Betterway Mortgages — Independent Dubai & UAE Mortgage Advisory',
    description: 'Compare 24 UAE banks, daily CBUAE EIBOR fixings, 4% DLD closing fees, and printable 2026 mortgage PDF guides.',
    images: ['/og.png'],
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-AE': '/',
      'ar-AE': '/ar',
      'x-default': '/',
    },
  },
};

export const viewport: Viewport = { themeColor: '#070E1A', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-btn focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <HotOffersPopup />
        <ResumeJourneyToast />
        <CoPilot />
        <MotionKit />
        <Analytics />
        <JsonLd data={enhancedOrgSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
