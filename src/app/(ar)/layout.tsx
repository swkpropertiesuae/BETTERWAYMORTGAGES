import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import '../globals.css';
import '../brand.css';
import '../homy.css';
import { ArrowRight } from 'lucide-react';
import MotionKit from '@/components/MotionKit';
import { ArFooter } from '@/components/ar';
import AnnouncementBar from '@/components/fx/AnnouncementBar';
import LeadPopup from '@/components/fx/LeadPopup';
import { JsonLd, orgSchema } from '@/components/ui';
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
    ],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#179373' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: { locale: 'ar_AE', images: [{ url: '/og.png', width: 1200, height: 630 }] },
};
export const viewport: Viewport = { themeColor: '#ffffff' };

const NAV: [string, string][] = [[AR_UI.mortgages, '/ar#mortgages'], [AR_UI.calculators, '/ar#calculators'], [AR_UI.rates, '/ar#rates'], [AR_UI.areas, '/ar#areas']];

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <AnnouncementBar closeLabel="إغلاق الإعلان" items={[
          { text: 'قارن 24 بنكاً في الإمارات وفق الشروط نفسها.', cta: 'دليل البنوك', href: '/ar#rates' },
          { text: 'يمكن للوافدين تمويل حتى 80% من قيمة المسكن الأول.', cta: 'تحقق من الأهلية', href: '/ar/mortgages/uae-residents' },
          { text: 'احسب الدفعة الشهرية ورسوم الشراء في دقيقة.', cta: 'حاسبة التمويل', href: '/ar/calculators/mortgage-calculator' },
        ]} />
        <header className="bw-header hm-header">
          <div className="wrap bw-header__bar">
            <Link href="/ar" aria-label="بيترواي" className="bw-header__logo shrink-0"><img src="/brand/bw/betterway-logo-horizontal-light-bg.svg" alt="Betterway Mortgages" width={1514} height={468} /></Link>
            <nav className="hidden gap-1 lg:flex" aria-label="الرئيسية">{NAV.map(([l, h]) => <Link key={h} href={h} className="whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] font-medium text-navy transition hover:bg-navy/5 hover:text-teal">{l}</Link>)}</nav>
            <div className="flex items-center gap-2.5">
              <Link href="/" lang="en" className="inline-flex h-10 items-center justify-center rounded-xl border border-line bg-white px-4 text-xs font-semibold tracking-wider text-navy transition hover:border-navy">{AR_UI.english}</Link>
              <span className="max-sm:hidden"><a href={waLink('مرحباً بيترواي، أرغب في الحصول على عرض تمويل عقاري.')} rel="noopener" className="hm-btn hm-btn--sm">{AR_UI.cta}<span className="hm-btn__tile" aria-hidden="true"><ArrowRight size={15} /></span></a></span>
            </div>
          </div>
        </header>
        <main id="main">{children}</main>
        <ArFooter />
        <LeadPopup copy={{
          label: 'فحص تمويل مجاني',
          title: 'اعرف ميزانيتك في دبي بمكالمة واحدة',
          body: 'تحدث مع مستشار حول ما قد تقدمه البنوك في الإمارات قبل الالتزام بأي عقار.',
          points: ['مقارنة 24 بنكاً في الإمارات', 'التحقق من عبء الدين ونسبة التمويل وفق ضوابط المصرف المركزي', 'دون فحص ائتماني ودون تقديم طلب'],
          cta: AR_UI.cta, ctaHref: waLink('مرحباً بيترواي، أرغب في فحص تمويل مجاني.'),
          secondary: 'احسب أولاً', secondaryHref: '/ar/calculators/mortgage-calculator',
          close: 'إغلاق', note: 'إرشادات تقديرية فقط. القرار النهائي للبنك.',
        }} />
        <MotionKit />
        <JsonLd data={orgSchema()} />
      </body>
    </html>
  );
}
