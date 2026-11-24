import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Mail, MapPin, MessageCircle } from 'lucide-react';
import { JsonLd } from './ui';
import { SITE, waLink } from '@/data/site';
import { AR_UI } from '@/data/ar';

export function ArHero({ crumbs, eyebrow, title, capsule, en, children }: { crumbs: [string, string][]; eyebrow?: string; title: string; capsule: string; en?: string; children?: ReactNode }) {
  const all: [string, string][] = [[AR_UI.home, '/ar'], ...crumbs];
  return (
    <section className="bw-pagehero hm-pagehero">
      <div className="hm-hero__clouds" aria-hidden="true" />
      <div className="wrap relative pb-14 pt-6 lg:pb-20 lg:pt-10">
        <nav aria-label="مسار التنقل" className="text-sm text-slate">
          <ol className="flex flex-wrap gap-1.5">{all.map(([n, h], i) => <li key={h} className="flex gap-1.5">{i > 0 && <span className="text-line">/</span>}{i < all.length - 1 ? <Link href={h} className="hover:text-teal">{n}</Link> : <span aria-current="page" className="text-navy">{n}</span>}</li>)}</ol>
        </nav>
        <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: all.map(([n, h], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE.url + h })) }} />
        {eyebrow && <p className="hm-label mt-8">{eyebrow}</p>}
        <h1 className="mt-5 max-w-4xl">{title}</h1>
        <div className="hm-capsule mt-7 max-w-3xl" data-capsule>
          <p className="text-[16px] leading-loose text-ink">{capsule}</p>
          <p className="mt-3 text-xs text-slate">{AR_UI.updated}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2.5">
          <a href={waLink('مرحباً بيترواي، أرغب في الحصول على عرض تمويل عقاري.')} rel="noopener" className="hm-btn"><MessageCircle size={16} />{AR_UI.cta}<span className="hm-btn__tile" aria-hidden="true"><ArrowRight size={16} /></span></a>
          {en && <Link href={en} lang="en" className="hm-btn hm-btn--ghost">English version</Link>}
          {children}
        </div>
      </div>
    </section>
  );
}

export function ArSection({ title, children, tone = 'white', id, label, sub }: { title: string; children: ReactNode; tone?: 'white' | 'mist'; id?: string; label?: string; sub?: string }) {
  return (
    <section id={id} className={`bg-white ${tone === 'mist' ? 'hm-sec--mist' : ''} py-16 lg:py-24`}>
      <div className="wrap">
        <div className="hm-head">
          <div>{label && <span className="hm-label">{label}</span>}<h2 className="hm-h2 !max-w-[24ch]">{title}</h2></div>
          {sub && <p className="hm-sub">{sub}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function ArFacts({ facts }: { facts: [string, string][] }) {
  return (
    <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {facts.map(([k, v]) => <div key={k} className="rounded-[14px] bg-mist p-5 max-sm:odd:last:col-span-2 sm:[&:nth-child(3n+1):last-child]:col-span-3"><dt className="text-sm text-slate">{k}</dt><dd className="num mt-1.5 text-lg font-semibold text-navy" dir="ltr" style={{ textAlign: 'right' }}>{v}</dd></div>)}
    </dl>
  );
}

export function ArLinks({ links }: { links: { title: string; body?: string; href: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {links.map((l) => <Link key={l.href} href={l.href} className="card group flex flex-col"><span className="text-[17px] font-semibold text-navy">{l.title}</span>{l.body && <span className="mt-1.5 block text-sm leading-relaxed text-slate">{l.body}</span>}<span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-teal">عرض <ArrowLeft size={14} /></span></Link>)}
    </div>
  );
}

export function ArFooter() {
  const cols: [string, [string, string][]][] = [
    [AR_UI.mortgages, [[AR_UI.mortgages, '/ar#mortgages'], [AR_UI.calculators, '/ar#calculators']]],
    [AR_UI.rates, [[AR_UI.rates, '/ar#rates'], [AR_UI.areas, '/ar#areas']]],
    ['الشركة', [['English', '/'], ['الإفصاح والخصوصية', '/privacy-and-cbuae-disclosure']]],
  ];
  return (
    <footer className="hm-footer">
      <div className="hm-footer__card">
        <div className="hm-footer__cta">
          <span className="hm-label">تمويلك العقاري القادم</span>
          <h2>اعثر على التمويل العقاري المناسب لحياتك في دبي</h2>
          <p>قارن البنوك في الإمارات، واعرف قدرتك على الاقتراض، وخطط لكل درهم قبل التوقيع. مستشار واحد من أول سؤال حتى يوم نقل الملكية.</p>
          <div className="hm-hero__ctas">
            <a href={waLink('مرحباً بيترواي، أرغب في الحصول على عرض تمويل عقاري.')} rel="noopener" className="hm-btn">{AR_UI.cta}<span className="hm-btn__tile" aria-hidden="true"><ArrowRight size={16} /></span></a>
            <Link href="/ar/calculators/mortgage-calculator" className="hm-btn hm-btn--ghost">احسب الدفعات</Link>
          </div>
          <div className="hm-footer__scene">
            <img src="/images/dubai-waterfront-1672.webp" srcSet="/images/dubai-waterfront-1280.webp 1280w, /images/dubai-waterfront-1672.webp 1672w, /images/dubai-waterfront-3344.webp 3344w" sizes="100vw" alt="" width={1672} height={941} loading="lazy" />
            <span className="hm-footer__word" aria-hidden="true" dir="ltr">betterway</span>
          </div>
        </div>
        <div className="hm-footer__main">
          <div className="hm-footer__brand">
            <img src="/brand/bw/betterway-logo-horizontal-dark-bg.svg" alt="Betterway Mortgages" width={1514} height={468} loading="lazy" />
            <p>{AR_UI.fee}</p>
            <ul className="hm-footer__contact mt-6 grid gap-3">
              <li><MapPin />{AR_UI.address}</li>
              <li><Mail /><a href={`mailto:${SITE.email}`} className="ulink" dir="ltr">{SITE.email}</a></li>
            </ul>
          </div>
          <div className="hm-footer__cols">
            {cols.map(([t, ls]) => <div key={t}><h3>{t}</h3><ul>{ls.map(([l, h]) => <li key={h}><Link href={h} lang={h === '/' ? 'en' : undefined}>{l}</Link></li>)}</ul></div>)}
          </div>
        </div>
        <div className="hm-footer__legal">
          <p>{AR_UI.disclosure}</p>
          <div className="hm-footer__base">
            <p>© 2026 Betterway Mortgages</p>
            <nav aria-label="روابط قانونية"><Link href="/privacy-and-cbuae-disclosure">الإفصاح والخصوصية</Link><Link href="/" lang="en">English</Link></nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
