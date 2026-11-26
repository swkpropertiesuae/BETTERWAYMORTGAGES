import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { ArSection, ArLinks } from '@/components/ar';
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
    <div className="bg-white">
      {/* Swiss / DIFC Midnight Navy Institutional RTL Hero */}
      <section className="holo-hero bw-swiss-grid py-16 lg:py-24" dir="rtl">
        <div className="holo-hero__inner">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <span className="bw-hero-chip">
                <span className="bw-live-dot" aria-hidden="true" />
                24 بنكاً مرخصاً في الإمارات · مكتب عود ميثاء، دبي
              </span>
              <h1 className="mt-6 text-[clamp(2rem,4vw,3.35rem)] font-bold leading-[1.18] text-white">
                تمويل عقاري مؤسسي مُهيكل في الإمارات عبر 24 بنكاً مرخصاً.
              </h1>
              <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-white/76">
                قارن فترات التثبيت وهوامش الإيبور ورسوم دائرة الأراضي والأملاك (4%) وسقف الاستقطاع (50%) بوضوح تام مع
                مستشارينا في دبي قبل توقيع عقد البيع.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/get-started" className="homy-btn homy-btn--white !h-12 !px-6">
                  <span>تقييم القدرة التمويلية خلال دقيقة</span>
                  <span className="homy-btn__disc" aria-hidden="true">
                    <ArrowLeft size={14} strokeWidth={2.2} />
                  </span>
                </Link>
                <a
                  href="#calculators"
                  className="inline-flex h-12 items-center gap-2 rounded-[10px] border border-white/22 bg-white/[0.05] px-5 text-sm font-semibold text-white transition hover:border-[#d7b158] hover:bg-white/[0.1]"
                >
                  <span>احسب الدفعة ورسوم 4% DLD</span>
                </a>
              </div>

              <p className="mt-6 flex items-center gap-2 text-xs text-white/55">
                <ShieldCheck size={14} className="shrink-0 text-[#34dfac]" />
                <span>{AR_UI.disclosure}</span>
              </p>
            </div>

            {/* RTL Institutional CBUAE Statutory Summary Card */}
            <div className="rounded-[20px] border border-[#d7b158]/30 bg-[#0c1524] p-6 text-white shadow-[0_32px_80px_-28px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold text-[#fcf1b7]">ضوابط المصرف المركزي (CBUAE)</span>
                <span className="num rounded-[7px] bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-[#34dfac]">
                  24 بنكاً
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  ['سقف الاستقطاع', '50% DBR'],
                  ['مقيم — المسكن الأول', 'حتى 80% LTV'],
                  ['مواطن — المسكن الأول', 'حتى 85% LTV'],
                  ['رسوم السداد المبكر', '1% أو 10 آلاف درهم'],
                ].map(([label, val]) => (
                  <div key={label} className="rounded-[12px] border border-white/10 bg-[#070e1a] p-3.5">
                    <p className="text-[11px] text-white/60">{label}</p>
                    <p className="num mt-1 text-base font-bold text-white" dir="ltr" style={{ textAlign: 'right' }}>
                      {val}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
        <div className="rounded-[20px] border border-[#e3e7ee] bg-white p-5 sm:p-8">
          <Calculator slug="mortgage-calculator" lang="ar" />
        </div>
        <div className="mt-8">
          <ArLinks
            links={AR_CALCS.map((s) => ({ title: TOOLS.find((t) => t.slug === s)!.ar, href: `/ar/calculators/${s}` }))}
          />
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

      <section className="bg-white py-10">
        <div className="wrap text-sm text-[#4a5568]">
          {AR_UI.disclosure}{' '}
          <Link href="/privacy-and-cbuae-disclosure" className="font-semibold text-[#0e6954] underline">
            الإفصاح الكامل
          </Link>
        </div>
      </section>
    </div>
  );
}
