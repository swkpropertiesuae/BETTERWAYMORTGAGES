import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Building2, CalendarClock, Home as HomeIcon, Percent } from 'lucide-react';
import { ArSection, ArLinks } from '@/components/ar';
import Calculator from '@/components/calc/Calculator';
import LogoMarquee from '@/components/LogoMarquee';
import { AR_PRODUCTS, AR_UI, AR_TYPE, AR_STOCK } from '@/data/ar';
import { PRODUCTS } from '@/data/products';
import { TOOLS, AR_CALCS } from '@/data/tools';
import { BANKS } from '@/data/banks';
import { COMMUNITIES, AR_COMMUNITIES } from '@/data/communities';
import { COUNTRIES } from '@/data/countries';
import { waLink } from '@/data/site';
import TextReveal from '@/components/fx/TextReveal';
import VideoDialog from '@/components/fx/VideoDialog';
import PhotoCarousel from '@/components/fx/PhotoCarousel';

export const metadata: Metadata = {
  title: 'وسيط تمويل عقاري في دبي والإمارات',
  alternates: { canonical: '/ar', languages: { 'en-AE': '/' } },
};

const WA = waLink('مرحباً بيترواي، أرغب في الحصول على عرض تمويل عقاري.');

const PATHS = [
  { chip: 'حتى 80% من قيمة العقار', name: 'منزلك الأول في دبي', where: 'للمقيمين الوافدين · موظفون وأصحاب أعمال', href: '/ar/mortgages/uae-residents', img: '/images/dubai-interior-3072.webp' },
  { chip: 'تمويل لغير المقيمين', name: 'الشراء من خارج الدولة', where: `إرشادات لغير المقيمين من ${COUNTRIES.length} دولة`, href: '/ar/mortgages/non-resident-dubai', img: '/images/marina-evening-3072.webp' },
  { chip: 'تمويل التسليم', name: 'عقارات على الخارطة', where: 'خطط للدفعة النهائية للمطور مبكراً', href: '/ar/mortgages/under-construction-off-plan', img: '/images/offplan-dusk-3072.webp' },
].filter((p) => p.href.split('/').pop()! in AR_PRODUCTS);

const SERVICES = [
  { tag: 'شراء منزل', title: 'موّل منزلك في دبي', body: 'الميزانية والدفعة الأولى ورسوم الشراء مقارنة بسقف عبء الدين 50%، ثم البنوك التي تناسب ملفك.', href: '/ar#mortgages', img: '/images/villa-courtyard-960.webp' },
  { tag: 'انتقل ووفّر', title: 'إعادة التمويل بثقة', body: 'قارن وفورات نقل القرض بعد رسوم السداد المبكر والتقييم وتكاليف النقل قبل انتهاء الفترة الثابتة.', href: '/ar/calculators/buyout-refinance-savings', img: '/images/keys-handover-3072.webp' },
  { tag: 'قارن الأسعار', title: 'كل البنوك جنباً إلى جنب', body: `الفترات الثابتة وهوامش الفائدة المتغيرة والرسوم من ${BANKS.length} بنكاً في الإمارات.`, href: '/ar#rates', img: '/images/guide-dbr-planning-3072.webp' },
];

const AREA_IMG: Record<string, string> = {
  'dubai-marina': '/images/marina-evening-1536.webp',
  'downtown-dubai': '/images/guide-dbr-planning-1536.webp',
  'palm-jumeirah': '/images/dubai-waterfront-1536.webp',
  'dubai-hills-estate': '/images/villa-courtyard-960.webp',
};
const AREAS = COMMUNITIES.filter((c) => c.slug in AREA_IMG && AR_COMMUNITIES.includes(c.slug));

const GALLERY = [
  { n: 'dubai-waterfront', title: 'فلل على الواجهة المائية', text: 'تمويل الفلل والتاون هاوس في مجتمعات التملك الحر في دبي.' },
  { n: 'marina-evening', title: 'الحياة في دبي مارينا', text: 'تمويل الشقق للمقيمين والمشترين من الخارج.' },
  { n: 'dubai-interior', title: 'منزلك الأول', text: 'حتى 80% من القيمة للوافدين في المسكن الأول وفق ضوابط المصرف المركزي.' },
  { n: 'offplan-dusk', title: 'تسليم العقارات على الخارطة', text: 'خطط للدفعة النهائية للمطور قبل موعد التسليم.' },
  { n: 'guide-transfer-day', title: 'يوم نقل الملكية', text: 'التقييم والعرض النهائي والتسجيل لدى أمين التسجيل.' },
];

function Btn({ href, children, ghost, light }: { href: string; children: string; ghost?: boolean; light?: boolean }) {
  const cls = `hm-btn ${ghost ? 'hm-btn--ghost' : ''} ${light ? 'hm-btn--light hm-btn--sm' : ''}`;
  const inner = <>{children}{!ghost && <span className="hm-btn__tile" aria-hidden="true"><ArrowRight size={16} /></span>}</>;
  return href.startsWith('http') || href.startsWith('mailto:') ? <a href={href} rel="noopener" className={cls}>{inner}</a> : <Link href={href} className={cls}>{inner}</Link>;
}

export default function Page() {
  return (
    <div className="hm">
      <section className="hm-hero">
        <div className="hm-hero__clouds" aria-hidden="true" />
        <div className="hm-wrap">
          <span className="hm-hero__badge"><img src="/brand/bw/betterway-icon-fullcolor-tight.svg" alt="" width={26} height={26} /><span>مقارنة <b>{BANKS.length} بنكاً</b> في الإمارات</span></span>
          <h1>تمويلك العقاري في دبي، <em>بالطريقة الصحيحة</em></h1>
          <p className="hm-hero__lead"><TextReveal text="استشارات تمويل عقاري مستقلة للمقيمين والمشترين من الخارج والمستثمرين. قارن البنوك، واعرف ميزانيتك، وانتقل من الموافقة المبدئية حتى نقل الملكية بثقة." stagger={0.025} delay={0.2} /></p>
          <div className="hm-hero__ctas">
            <Btn href="/ar/calculators/dbr-borrowing-power">كم يمكنني أن أقترض؟</Btn>
            <Btn href={WA} ghost>تواصل مع مستشار</Btn>
          </div>
        </div>
        <div className="hm-hero__stage">
          <img src="/images/dubai-waterfront-1536.webp" srcSet="/images/dubai-waterfront-768.webp 768w, /images/dubai-waterfront-1536.webp 1536w, /images/dubai-waterfront-3072.webp 3072w" sizes="100vw" alt="صورة توضيحية: فيلا عصرية على الماء في دبي مع أفق المدينة" width={1536} height={864} fetchPriority="high" />
          <div className="hm-hero__chips" aria-label="ضوابط مصرف الإمارات المركزي">
            <span className="hm-chip"><i />المسكن الأول للوافدين <b>80%</b></span>
            <span className="hm-chip"><i />سقف عبء الدين <b>50%</b></span>
            <span className="hm-chip"><i />أقصى مدة <b>25 سنة</b></span>
          </div>
        </div>
      </section>

      <section className="hm-section !pt-6">
        <div className="hm-wrap">
          <div className="hm-head">
            <div><span className="hm-label">أثرنا</span><h2 className="hm-h2"><TextReveal text="وضوح حقيقي وراء كل قرار تمويل" /></h2></div>
            <p className="hm-sub">صُممت لتجعل تمويل المنازل في دبي أبسط وأكثر شفافية وثقة لكل مشترٍ.</p>
          </div>
          <div className="hm-impact">
            <div className="hm-impact__img"><img src="/images/abudhabi-corniche-960.webp" alt="صورة توضيحية: فلل على شاطئ الإمارات" width={960} height={1280} loading="lazy" /></div>
            <div className="hm-impact__stats">
              {[[BANKS.length, 'بنكاً للمقارنة'], [COMMUNITIES.length, 'مجتمعاً للتملك الحر'], [COUNTRIES.length, 'دولة نرشد منها']].map(([v, l]) => (
                <div key={l} className="hm-stat"><strong dir="ltr">{v}+</strong><span>{l}</span></div>
              ))}
            </div>
            <div className="hm-impact__img"><img src="/images/villa-courtyard-960.webp" alt="صورة توضيحية: فناء فيلا مع بركة عاكسة" width={960} height={1280} loading="lazy" /></div>
          </div>
        </div>
      </section>

      <section className="hm-lenders" aria-label="البنوك في الدليل">
        <div className="hm-wrap" dir="ltr">
          <LogoMarquee label="UAE banks in the lender directory" items={BANKS.map((b) => ({ id: b.key, label: b.name, logo: b.logo, href: `/ar/rates/${b.slug}` }))} />
        </div>
      </section>

      {PATHS.length > 0 && (
        <>
          <section className="hm-section !pb-12">
            <div className="hm-wrap"><div className="hm-head"><div><span className="hm-label">أبرز المسارات</span><h2 className="hm-h2"><TextReveal text="المسارات الأكثر شيوعاً لمشتري دبي" /></h2></div><p className="hm-sub">كل مسار يفتح دليلاً كاملاً بشروط البنوك والتكاليف والمستندات المطلوبة.</p></div></div>
          </section>
          <div className="hm-stack">
            {PATHS.map((p) => (
              <article key={p.name} className="hm-panel">
                <img src={p.img} alt="" width={3072} height={1728} loading="lazy" />
                <div className="hm-panel__glass">
                  <span className="hm-panel__price">{p.chip}</span>
                  <h3>{p.name}</h3>
                  <p>{p.where}</p>
                  <Btn href={p.href} light>استكشف</Btn>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      <section className="hm-section">
        <div className="hm-wrap">
          <div className="hm-head"><div><span className="hm-label">خدماتنا</span><h2 className="hm-h2"><TextReveal text="كل ما تحتاجه لتمويل منزلك" /></h2></div><p className="hm-sub">أرقام واضحة وخيارات أفضل وقرارات واثقة.</p></div>
          <div className="hm-services">
            {SERVICES.map((s, i) => (
              <article key={s.tag} className="hm-svc">
                <span className="hm-svc__num" aria-hidden="true" dir="ltr">.0{i + 1}</span>
                <div className="hm-svc__img" aria-hidden="true"><img src={s.img} alt="" loading="lazy" /></div>
                <div className="hm-svc__body">
                  <small>{s.tag}</small><h3>{s.title}</h3>
                  <p className="mt-3">{s.body}</p>
                  <Link href={s.href} className="hm-svc__link">اعرف المزيد <ArrowLeft size={14} /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {AREAS.length > 0 && (
        <section className="hm-section !pt-0">
          <div className="hm-wrap">
            <div className="hm-head"><div><span className="hm-label">أين نقدم المشورة</span><h2 className="hm-h2"><TextReveal text="موّل منزلك في أبرز مجتمعات دبي" /></h2></div><p className="hm-sub">لكل مجتمع مطوروه ونوع وحداته وشهية البنوك تجاهه.</p></div>
            <div className="hm-listings">
              {AREAS.map((c) => (
                <Link key={c.slug} href={`/ar/areas/${c.emirate}/${c.slug}`} className="hm-listing">
                  <img src={AREA_IMG[c.slug]} alt="" loading="lazy" />
                  <span className="hm-listing__tag"><HomeIcon size={13} />{AR_STOCK[c.stock]}</span>
                  <span className="hm-listing__name">{c.ar ?? c.name}</span>
                  <strong className="hm-listing__price">حتى 80% من القيمة</strong>
                  <span className="hm-listing__meta">
                    <span><Building2 size={14} />{c.devs.split(',').length} مطور</span>
                    <span><Percent size={14} />رسوم الدائرة 4%</span>
                    <span><CalendarClock size={14} />25 سنة</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="hm-section !pt-0">
        <div className="hm-wrap">
          <div className="hm-head"><div><span className="hm-label">دبي في حركة</span><h2 className="hm-h2"><TextReveal text="شاهد المنازل التي نموّلها لعملائنا" /></h2></div><p className="hm-sub">فيلم قصير ومعرض لأنواع العقارات التي نرتب تمويلها في دبي.</p></div>
          <VideoDialog src="/media/betterway-dubai-film.mp4" poster="/media/betterway-dubai-film-poster.webp" alt="لقطة توضيحية: فيلا على الواجهة المائية في دبي" label="تشغيل فيلم بيترواي عن دبي" closeLabel="إغلاق الفيديو" caption="شاهد · 17 ثانية" />
          <div className="mt-3"><PhotoCarousel rtl label="معرض عقارات دبي" prev="الشريحة السابقة" next="الشريحة التالية" slides={GALLERY.map((g) => ({ src: `/images/${g.n}-1536.webp`, srcSet: `/images/${g.n}-768.webp 768w, /images/${g.n}-1536.webp 1536w, /images/${g.n}-3072.webp 3072w`, alt: `صورة توضيحية: ${g.title}`, title: g.title, text: g.text }))} /></div>
        </div>
      </section>

      <section id="calculators" className="hm-section !pt-0">
        <div className="hm-wrap">
          <div className="hm-head"><div><span className="hm-label">حاسبة التمويل</span><h2 className="hm-h2"><TextReveal text="احسب أرقامك قبل البنك" /></h2></div><p className="hm-sub">الدفعة الشهرية والدفعة الأولى ورسوم الشراء في عرض واحد، دون تسجيل.</p></div>
          <div className="hm-calc"><Calculator slug="mortgage-calculator" lang="ar" /></div>
          <div className="mt-8"><ArLinks links={AR_CALCS.map((s) => ({ title: TOOLS.find((t) => t.slug === s)!.ar, href: `/ar/calculators/${s}` }))} /></div>
        </div>
      </section>

      <ArSection id="mortgages" label="المنتجات" title={AR_UI.mortgages} sub="أدلة عربية لأنواع التمويل العقاري الشائعة في الإمارات.">
        <ArLinks links={Object.keys(AR_PRODUCTS).map((s) => ({ title: PRODUCTS.find((p) => p.slug === s)!.ar, body: AR_PRODUCTS[s].points[0], href: `/ar/mortgages/${s}` }))} />
      </ArSection>

      <ArSection id="rates" label="دليل البنوك" title={`دليل ${BANKS.length} بنكاً في دولة الإمارات`} sub="الإدراج في الدليل ليس شراكة أو عرضاً قائماً. اطلب عرضاً خطياً محدثاً.">
        <ArLinks links={BANKS.map((b) => ({ title: b.ar, body: `${AR_TYPE[b.type]} · ${b.hq}`, href: `/ar/rates/${b.slug}` }))} />
      </ArSection>

      <ArSection id="areas" label="المجتمعات" title="أبرز مجتمعات التملك الحر">
        <ArLinks links={AR_COMMUNITIES.map((s) => COMMUNITIES.find((c) => c.slug === s)!).map((c) => ({ title: c.ar ?? c.name, body: `${AR_STOCK[c.stock]} · ${c.devs}`, href: `/ar/areas/${c.emirate}/${c.slug}` }))} />
        <p className="mt-10 text-xs text-slate">{AR_UI.disclosure} <Link href="/privacy-and-cbuae-disclosure" className="text-teal underline">الإفصاح الكامل</Link></p>
      </ArSection>
    </div>
  );
}
