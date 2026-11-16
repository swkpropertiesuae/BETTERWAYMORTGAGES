import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArHero, ArSection, ArFacts, ArLinks } from '@/components/ar';
import Calculator from '@/components/calc/Calculator';
import { AR_UI, AR_STOCK } from '@/data/ar';
import { COMMUNITIES, AR_COMMUNITIES, EMIRATES, communityBy } from '@/data/communities';

export const dynamicParams = false;
export const generateStaticParams = () =>
  AR_COMMUNITIES.map((s) => COMMUNITIES.find((c) => c.slug === s)!).map((c) => ({ emirate: c.emirate, community: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ emirate: string; community: string }> }): Promise<Metadata> {
  const { emirate, community } = await params;
  const c = communityBy(emirate, community);
  return c
    ? {
        title: `دليل التمويل العقاري في ${c.ar ?? c.name} — ضوابط التملك الحر والتكاليف`,
        alternates: { canonical: `/ar/areas/${emirate}/${community}`, languages: { 'en-AE': `/areas/${emirate}/${community}` } },
      }
    : {};
}

export default async function Page({ params }: { params: Promise<{ emirate: string; community: string }> }) {
  const { emirate, community } = await params;
  const c = communityBy(emirate, community);
  if (!c || !AR_COMMUNITIES.includes(c.slug)) notFound();
  const name = c.ar ?? c.name;
  const e = EMIRATES[c.emirate];
  return (
    <>
      <ArHero
        crumbs={[
          [AR_UI.areas, '/ar#areas'],
          [name, `/ar/areas/${emirate}/${community}`],
        ]}
        eyebrow={`${e.ar} · ${AR_STOCK[c.stock]}`}
        title={`الشراء بالتمويل العقاري في ${name}: ضوابط التملك الحر وتكاليف التسجيل`}
        capsule={`تُعد منطقة ${name} من مناطق التملك الحر المعتمدة في ${e.ar} (${AR_STOCK[c.stock]}) وتضم مشاريع لمطورين من بينهم ${c.devs}. تخضع العقارات الجاهزة لسقوف التمويل الصادرة عن مصرف الإمارات المركزي (حتى 80% للمقيمين الوافدين و85% للمواطنين للمسكن الأول حتى 5 ملايين درهم) بشرط التقييم العقاري المعتمد وعدم تجاوز نسبة عبء الدين 50%.`}
        en={`/areas/${emirate}/${community}`}
      />
      <ArSection title="ملخص المجتمع والضوابط التنظيمية">
        <ArFacts
          facts={[
            ['الإمارة', e.ar],
            ['نوع العقارات', AR_STOCK[c.stock]],
            ['أبرز المطورين', c.devs],
            ['تمويل المسكن الأول (وافد)', 'Up to 80%'],
            ['تمويل المسكن الأول (مواطن)', 'Up to 85%'],
            ['سقف عبء الدين', '50%'],
          ]}
        />
      </ArSection>
      <ArSection tone="mist" title="احسب القسط والرسوم المقدمة">
        <div className="rounded-card border border-line bg-white p-5 sm:p-8">
          <Calculator slug="mortgage-calculator" lang="ar" />
        </div>
      </ArSection>
      <ArSection title="مجتمعات سكنية أخرى">
        <ArLinks
          links={AR_COMMUNITIES.filter((s) => s !== c.slug)
            .slice(0, 8)
            .map((s) => COMMUNITIES.find((x) => x.slug === s)!)
            .map((x) => ({ title: x.ar ?? x.name, body: `${AR_STOCK[x.stock]} · ${x.devs}`, href: `/ar/areas/${x.emirate}/${x.slug}` }))}
        />
      </ArSection>
    </>
  );
}
