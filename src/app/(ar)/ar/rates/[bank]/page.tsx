import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArHero, ArSection, ArFacts, ArLinks } from '@/components/ar';
import Calculator from '@/components/calc/Calculator';
import { AR_UI, AR_TYPE } from '@/data/ar';
import { BANKS } from '@/data/banks';

export const dynamicParams = false;
export const generateStaticParams = () => BANKS.map((b) => ({ bank: b.slug }));
const find = (s: string) => BANKS.find((b) => b.slug === s);

export async function generateMetadata({ params }: { params: Promise<{ bank: string }> }): Promise<Metadata> {
  const b = find((await params).bank);
  return b
    ? {
        title: `دليل التمويل العقاري لدى ${b.ar} — ضوابط المصرف المركزي وشروط العرض`,
        alternates: { canonical: `/ar/rates/${b.slug}`, languages: { 'en-AE': `/rates/${b.slug}` } },
      }
    : {};
}

export default async function Page({ params }: { params: Promise<{ bank: string }> }) {
  const b = find((await params).bank);
  if (!b) notFound();
  return (
    <>
      <ArHero
        crumbs={[
          [AR_UI.rates, '/ar#rates'],
          [b.ar, `/ar/rates/${b.slug}`],
        ]}
        eyebrow={`${AR_TYPE[b.type]} · ${b.name}`}
        title={`دليل التمويل العقاري لدى ${b.ar} وقائمة التحقق من العرض النهائي`}
        capsule={`يُعد ${b.ar} مؤسسة مالية مرخصة (${AR_TYPE[b.type]}) مقرها الرئيسي في ${b.hq}. نظراً لاختلاف معدلات الفائدة أو الربح وهوامش إيبور والرسوم حسب ملف المتقدم وتحويل الراتب وقيمة العقار، يرجى دائماً التحقق من الشروط النهائية كتابياً في خطاب العرض الرسمي الصادر عن البنك.`}
        en={`/rates/${b.slug}`}
      />
      <ArSection title="الإطار التنظيمي وضوابط المصرف المركزي">
        <ArFacts
          facts={[
            ['هيكل التمويل', AR_TYPE[b.type]],
            ['المقر الرئيسي', b.hq],
            ['الجهة الرقابية', 'CBUAE'],
            ['سقف تمويل المسكن الأول (وافد)', '80%'],
            ['سقف تمويل المسكن الأول (مواطن)', '85%'],
            ['الحد الأقصى لعبء الدين', '50%'],
          ]}
        />
      </ArSection>
      <ArSection tone="mist" title="احسب القسط والتكاليف وفق عرضك المكتوب">
        <div className="rounded-card border border-line bg-white p-5 sm:p-8">
          <Calculator slug="mortgage-calculator" lang="ar" />
        </div>
      </ArSection>
      <ArSection title="جهات تمويلية أخرى">
        <ArLinks
          links={BANKS.filter((x) => x.slug !== b.slug && x.type === b.type)
            .slice(0, 4)
            .map((x) => ({ title: x.ar, body: `${AR_TYPE[x.type]} · ${x.hq}`, href: `/ar/rates/${x.slug}` }))}
        />
      </ArSection>
    </>
  );
}
