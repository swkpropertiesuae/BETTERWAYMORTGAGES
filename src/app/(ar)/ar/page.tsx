import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ArSection, ArLinks } from '@/components/ar';
import MorningHeroCarousel from '@/components/home/MorningHeroCarousel';
import Calculator from '@/components/calc/Calculator';
import { AR_PRODUCTS, AR_UI, AR_TYPE, AR_STOCK } from '@/data/ar';
import { PRODUCTS } from '@/data/products';
import { TOOLS, AR_CALCS } from '@/data/tools';
import { BANKS } from '@/data/banks';
import { COMMUNITIES, AR_COMMUNITIES } from '@/data/communities';

export const metadata: Metadata = {
  title: 'منظومة التمويل وشراء العقار في دبي والإمارات | بيترواي',
  alternates: { canonical: '/ar', languages: { 'en-AE': '/' } },
};

export default function Page() {
  return (
    <div className="bg-[#f5f6f7] pb-8">
      <link
        rel="preload"
        as="image"
        type="image/avif"
        imageSrcSet="/images/hero-morning-01-1280.avif 1280w, /images/hero-morning-01-2048.avif 2048w, /images/hero-morning-01-3840.avif 3840w, /images/hero-morning-01-max.avif 4140w"
        imageSizes="100vw"
        fetchPriority="high"
      />
      {/* Holo-style Rounded Arabic Morning Dubai Transition Hero */}
      <div className="px-3 pt-4 sm:px-6">
        <section className="holo-hero !min-h-[580px]" dir="rtl">
          <MorningHeroCarousel lang="ar" />
          <div className="relative z-[2] max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/28 bg-[#080b0f]/58 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#34dfac]" />
              24 بنكاً مرخصاً في الإمارات · ضوابط مصرف الإمارات المركزي
            </span>
            <h1 className="holo-hero__title mt-5 !tracking-normal">
              كل ما تحتاجه لتمويل وشراء عقارك في الإمارات.
            </h1>
            <p className="holo-hero__sub">
              قارن 24 جهة تمويلية إسلامية وتقليدية، واحسب الدفعة الأولى ورسوم دائرة الأراضي والأملاك (4%) ونسبة الاستقطاع
              القصوى (50%) بكل شفافية قبل التقديم.
            </p>
            <div className="holo-hero__cards mt-7">
              <Link href="/get-started" className="holo-cta-card !text-right">
                <div>
                  <span className="holo-cta-card__title">أبحث عن تمويل عقاري</span>
                  <span className="holo-cta-card__meta">فحص الأهلية ومقارنة 24 بنكاً خلال دقيقة</span>
                </div>
                <span className="holo-cta-card__arrow" aria-hidden="true">
                  <ArrowLeft size={20} strokeWidth={2.2} />
                </span>
              </Link>
              <a href="#calculators" className="holo-cta-card !text-right">
                <div>
                  <span className="holo-cta-card__title">احسب الدفعة ورسوم الأراضي</span>
                  <span className="holo-cta-card__meta">تفصيل كامل لرسوم دائرة الأراضي والأملاك</span>
                </div>
                <span className="holo-cta-card__arrow" aria-hidden="true">
                  <ArrowLeft size={20} strokeWidth={2.2} />
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>

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
    </div>
  );
}
