import type { Metadata, Viewport } from 'next';
import '../globals.css';
import '../startup.css';
import '../brand.css';
import '../homy.css';
import Header from '@/components/Header';
import CoPilot from '@/components/CoPilot';
import MotionKit from '@/components/MotionKit';
import { Footer, JsonLd, orgSchema } from '@/components/ui';
import { SITE, waLink } from '@/data/site';
import { BANKS } from '@/data/banks';
import AnnouncementBar from '@/components/fx/AnnouncementBar';
import LeadPopup from '@/components/fx/LeadPopup';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Betterway Mortgages — Mortgage Broker in Dubai & UAE', template: '%s | Betterway Mortgages' },
  description: 'Dubai mortgage advice for residents, non-residents and investors. Compare UAE mortgage rates, calculate payments and understand upfront costs.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#179373' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: { type: 'website', siteName: SITE.name, images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Betterway Mortgages — Mortgage Broker in Dubai & UAE' }], locale: 'en_AE' },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
  alternates: { languages: { 'en-AE': '/', 'ar-AE': '/ar' } },
};

export const viewport: Viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-btn focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
        <AnnouncementBar items={[
          { text: `Compare ${BANKS.length} UAE lenders side by side, on the same terms.`, cta: 'Compare rates', href: '/rates/uae-mortgage-rates-eibor-revert-bible' },
          { text: 'Expat first-home buyers can borrow up to 80% of value.', cta: 'Check eligibility', href: '/mortgages/uae-residents' },
          { text: 'CBUAE EIBOR fixings are published every business day.', cta: 'EIBOR tracker', href: '/rates/eibor-live-tracker' },
        ]} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CoPilot />
        <LeadPopup copy={{
          label: 'Free mortgage pre-check',
          title: 'Know your Dubai budget in one call',
          body: 'Speak to an advisor about what UAE lenders could offer you, before you commit to a property.',
          points: [`${BANKS.length} UAE lenders compared`, 'Debt-burden and LTV checked against CBUAE rules', 'No credit check, nothing submitted'],
          cta: 'Chat with an advisor', ctaHref: waLink('Hello Betterway, I would like a free mortgage pre-check.'),
          secondary: 'Calculate first', secondaryHref: '/calculators/mortgage-calculator',
          close: 'Close', note: 'Indicative guidance only. The lender makes the final decision.',
        }} />
        <MotionKit />
        <JsonLd data={orgSchema()} />
      </body>
    </html>
  );
}
