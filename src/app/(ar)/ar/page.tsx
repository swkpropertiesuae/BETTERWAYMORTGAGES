import type { Metadata } from 'next';
import Link from 'next/link';
import { ArHero, ArSection, ArLinks } from '@/components/ar';
import Calculator from '@/components/calc/Calculator';
import { AR_PRODUCTS, AR_UI, AR_TYPE, AR_STOCK } from '@/data/ar';
import { PRODUCTS } from '@/data/products';
import { TOOLS, AR_CALCS } from '@/data/tools';
import { BANKS } from '@/data/banks';
import { COMMUNITIES, AR_COMMUNITIES } from '@/data/communities';

export const metadata: Metadata = {
  title: 'وسيط تمويل عقاري في دبي والإمارات',
  alternates: { canonical: '/ar', languages: { 'en-AE': '/' } },
};

export default function Page() {
  return (
    <>
      <div className="border-b border-line bg-white px-5 py-3 text-center text-xs text-slate">
        دليل معلومات التمويل العقاري باللغة العربية · تخضع جميع العروض والأسعار لموافقة البنك الخطية
      </div>
      <ArHero
        crumbs={[]}
        eyebrow="التمويل العقاري في دبي والإمارات"
        title="منزلك. تمويلك. طريق أوضح."
        capsule="استعرض ضوابط مصرف الإمارات المركزي للتمويل العقاري، واحسب الدفعة الأولى ورسوم دائرة الأراضي والأملاك، وتعرف على دليل 24 جهة تمويلية مرخصة في دولة الإمارات."
        en="/"
      />
      <ArSection id="mortgages" title={AR_UI.mortgages}>
        <ArLinks
          links={Object.keys(AR_PRODUCTS).map((s) => ({
            title: PRODUCTS.find((p) => p.slug === s)!.ar,
            body: AR_PRODUCTS[s].points[0],
            href: `/ar/mortgages/${s}`,
          }))}
        />
      </ArSection>
      <ArSection id="calculators" tone="mist" title="حاسبة التمويل والتكاليف المقدمة">
        <div className="rounded-card border border-line bg-white p-5 sm:p-8">
          <Calculator slug="mortgage-calculator" lang="ar" />
        </div>
        <div className="mt-8">
          <ArLinks links={AR_CALCS.map((s) => ({ title: TOOLS.find((t) => t.slug === s)!.ar, href: `/ar/calculators/${s}` }))} />
        </div>
      </ArSection>
      <ArSection id="rates" title="دليل 24 بنكاً في دولة الإمارات">
        <ArLinks
          links={BANKS.map((b) => ({
            title: b.ar,
            body: `${AR_TYPE[b.type]} · ${b.hq}`,
            href: `/ar/rates/${b.slug}`,
          }))}
        />
      </ArSection>
      <ArSection id="areas" tone="mist" title="أبرز مجتمعات التملك الحر">
        <ArLinks
          links={AR_COMMUNITIES.map((s) => COMMUNITIES.find((c) => c.slug === s)!).map((c) => ({
            title: c.ar ?? c.name,
            body: `${AR_STOCK[c.stock]} · ${c.devs}`,
            href: `/ar/areas/${c.emirate}/${c.slug}`,
          }))}
        />
      </ArSection>
      <section className="py-10">
        <div className="wrap text-sm text-slate">
          {AR_UI.disclosure}{' '}
          <Link href="/privacy-and-cbuae-disclosure" className="text-teal underline">
            الإفصاح الكامل
          </Link>
        </div>
      </section>
    </>
  );
}
