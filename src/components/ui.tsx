import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, Info, ShieldCheck } from 'lucide-react';
import { SITE, BENCH, DISCLOSURE_SHORT, DISCLOSURE_FULL, waLink } from '@/data/site';
import MotionReveal from '@/components/MotionReveal';
import FooterClient from '@/components/FooterClient';
import type { Faq as FaqT } from '@/data/products';

export const aed = (n: number) => `AED ${Math.round(n).toLocaleString('en-US')}`;
export const aedM = (n: number) => `AED ${n >= 10 ? n.toFixed(1) : n.toFixed(2)}M`;

export function JsonLd({ data }: { data: object }) {
  const safeJson = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson }} />;
}

/** Renders `*word*` in a heading as an Instrument Serif italic editorial accent. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return <>{parts.map((p, i) => (i % 2 ? <em key={i} className="serif font-normal">{p}</em> : p))}</>;
}
export const plain = (text: string) => text.replace(/\*/g, '');

/** Swiss Institutional Hairline Section Tag */
export function SectionTag({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`homy-tag ${light ? 'homy-tag--light' : ''}`}>
      <span className="homy-tag__ring" aria-hidden="true" />
      <span>{children}</span>
    </span>
  );
}

/** Swiss Signature CTA Button */
export function Cta({
  href,
  children,
  tone = 'dark',
  size,
  external,
  className = '',
}: {
  href: string;
  children: string;
  tone?: 'dark' | 'light' | 'emerald' | 'gold' | 'brass' | 'ghost';
  size?: 'sm';
  external?: boolean;
  className?: string;
}) {
  const isOutline = tone === 'ghost';
  const cls = `homy-btn ${tone === 'light' ? 'homy-btn--white' : isOutline ? 'homy-btn--outline' : ''} ${
    size === 'sm' ? 'bw-btn--sm' : ''
  } ${className}`;
  const inner = isOutline ? (
    <span>{children}</span>
  ) : (
    <>
      <span className="bw-btn__label">{children}</span>
      <span className="homy-btn__disc" aria-hidden="true">
        <span className="homy-btn__arrow-track">
          <ArrowRight size={14} strokeWidth={2.2} />
          <ArrowRight size={14} strokeWidth={2.2} />
        </span>
      </span>
    </>
  );
  return external || /^(https?:|mailto:|tel:)/.test(href) ? (
    <a href={href} className={cls} rel="noopener">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function UtilityBar() {
  return (
    <div className="bg-[#070e1a] text-xs text-white/75">
      <div className="wrap flex min-h-[36px] items-center justify-center gap-3 py-1.5 text-center">
        <p className="truncate">
          <ShieldCheck size={13} className="me-1.5 inline -translate-y-px text-[#d7b158]" />
          <b className="font-medium text-white">CBUAE EIBOR fixings</b>
          <span className="hidden sm:inline"> are published every business day. Compare your offer against the benchmark.</span>
        </p>
        <Link href="/rates/eibor-live-tracker" className="whitespace-nowrap font-semibold text-[#fcf1b7] hover:underline">
          EIBOR tracker →
        </Link>
      </div>
    </div>
  );
}

export function Disclosure({ dark = false }: { dark?: boolean }) {
  return (
    <details className={`group mt-4 max-w-2xl text-xs ${dark ? 'text-white/60' : 'text-[#4a5568]'}`}>
      <summary className="cursor-pointer list-none">
        {DISCLOSURE_SHORT}{' '}
        <span
          className={`inline-flex items-center gap-1 font-semibold underline-offset-2 hover:underline ${
            dark ? 'text-[#fcf1b7]' : 'text-[#0e6954]'
          }`}
        >
          <Info size={12} /> Rate assumptions &amp; fees
        </span>
      </summary>
      <p className="mt-2 leading-relaxed">{DISCLOSURE_FULL}</p>
    </details>
  );
}

export function Crumbs({ items }: { items: { name: string; href: string }[] }) {
  const all = [{ name: 'Home', href: '/' }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-xs font-medium text-[#4a5568]">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden="true" className="text-[#cbd5e1]">
                  /
                </span>
              )}
              {i < all.length - 1 ? (
                <Link href={c.href} className="transition hover:text-[#070e1a]">
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold text-[#070e1a]">
                  {c.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            item: SITE.url + c.href,
          })),
        }}
      />
    </>
  );
}

/** Swiss Midnight Navy CBUAE Statutory Reference Card (preserves MiniPhone export). */
export function MiniPhone() {
  return (
    <div
      className="relative mx-auto hidden w-[280px] overflow-hidden rounded-[18px] border border-[#d7b158]/30 bg-[#070e1a] p-5 text-white shadow-[0_24px_56px_-26px_rgba(7,14,26,0.5)] lg:block"
      aria-hidden="true"
    >
      <div className="flex items-center gap-2.5">
        <img src="/brand/icon.png" alt="" width={26} height={26} className="h-[26px] w-[26px] object-contain" />
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#fcf1b7]">
          CBUAE Statutory Reference
        </span>
      </div>
      <div className="mt-4 rounded-[12px] border border-white/12 bg-[#0c1524] p-4">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#d7b158]">CBUAE Max DBR</p>
        <p className="num mt-1 text-[28px] font-bold text-white">{BENCH.maxDbrPct}%</p>
      </div>
      <div className="mt-2.5 space-y-1.5 text-[12px]">
        {[
          ['Expat first home', `Up to ${BENCH.expatFirstHomeLtv}% LTV`],
          ['UAE National', `Up to ${BENCH.nationalFirstHomeLtv}% LTV`],
          ['Max tenure', `${BENCH.maxTenureYears} years`],
          ['Lender directory', `${BENCH.bankCount} banks`],
        ].map(([a, b]) => (
          <div
            key={a}
            className="flex justify-between rounded-[9px] border border-white/10 bg-white/[0.04] px-3 py-2"
          >
            <span className="text-white/70">{a}</span>
            <span className="num font-semibold text-[#34dfac]">{b}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-[9px] bg-white py-2 text-center text-xs font-semibold text-[#070e1a]">
        Compare 24 UAE Banks
      </div>
    </div>
  );
}

export function PageHero({
  crumbs,
  eyebrow,
  title,
  capsule,
  children,
  aside,
  updated = true,
}: {
  crumbs: { name: string; href: string }[];
  eyebrow?: string;
  title: string;
  capsule?: string;
  children?: ReactNode;
  aside?: ReactNode | false;
  updated?: boolean;
}) {
  const cut = title.indexOf(': ');
  const [head, sub] = cut > 0 ? [title.slice(0, cut), title.slice(cut + 2)] : [title, ''];
  const side = aside === undefined ? <MiniPhone /> : aside;
  const sideCols =
    aside === undefined
      ? 'lg:grid-cols-[minmax(0,1fr)_280px]'
      : side
        ? 'lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]'
        : '';
  return (
    <section className="bw-pagehero">
      <div className="wrap relative py-10 lg:py-14">
        <Crumbs items={crumbs} />
        <div className={`mt-7 grid gap-10 ${sideCols ? `${sideCols} lg:items-center` : ''}`}>
          <div>
            {eyebrow && (
              <div className="mb-4">
                <SectionTag>{eyebrow}</SectionTag>
              </div>
            )}
            <h1 className="max-w-4xl">
              {head}
              {sub && (
                <span className="mt-3.5 block font-sans text-lg font-normal leading-snug tracking-normal text-[#4a5568] sm:text-xl">
                  {sub}
                </span>
              )}
            </h1>
            {capsule && (
              <div className="bw-capsule mt-6 max-w-2xl" data-capsule>
                <p className="text-[15.5px] leading-relaxed text-[#0b1320]">{capsule}</p>
                {updated && <p className="mt-2 text-xs text-[#4a5568]">{SITE.asOf}</p>}
              </div>
            )}
            {children}
          </div>
          {side}
        </div>
      </div>
    </section>
  );
}

export function Section({
  id,
  title,
  eyebrow,
  intro,
  children,
  tone = 'white',
  action,
}: {
  id?: string;
  title: string;
  eyebrow?: string;
  intro?: string;
  children: ReactNode;
  tone?: 'white' | 'mist' | 'navy';
  action?: { label: string; href: string };
}) {
  const bg =
    tone === 'mist'
      ? 'bg-[#f7f8fa] border-y border-[#e3e7ee]'
      : tone === 'navy'
        ? 'bg-[#070e1a] text-white'
        : 'bg-white';
  const dark = tone === 'navy';
  return (
    <section id={id} className={`${bg} py-16 lg:py-20`}>
      <MotionReveal className="wrap relative z-10">
        <div className="homy-head">
          <div className="homy-head__left">
            {eyebrow && <SectionTag light={dark}>{eyebrow}</SectionTag>}
            <h2 className={`homy-h2 ${dark ? '!text-white' : ''}`}>
              <Rich text={title} />
            </h2>
          </div>
          {(intro || action) && (
            <div className="homy-head__right">
              {intro && <p className={`homy-sub ${dark ? '!text-white/70' : ''}`}>{intro}</p>}
              {action && (
                <Cta href={action.href} tone={dark ? 'light' : 'dark'} size="sm">
                  {action.label}
                </Cta>
              )}
            </div>
          )}
        </div>
        {children}
      </MotionReveal>
    </section>
  );
}

export function Facts({ facts }: { facts: [string, string][] }) {
  return (
    <dl className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
      {facts.map(([k, v]) => (
        <div
          key={k}
          className="rounded-[14px] border border-[#e3e7ee] bg-white p-5 max-sm:odd:last:col-span-2"
        >
          <dt className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#4a5568]">{k}</dt>
          <dd
            className={`mt-1.5 text-lg font-bold text-[#070e1a] ${
              /^[\d+−-]|^AED|^3M/.test(v) ? 'num' : 'font-display'
            }`}
          >
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function FaqList({ faqs }: { faqs: FaqT[] }) {
  if (!faqs.length) return null;
  return (
    <>
      <div className="homy-faq-list">
        {faqs.map((f, i) => (
          <details key={f.q} open={i === 0} className="homy-faq-item group">
            <summary className="homy-faq-btn list-none">
              <span>{f.q}</span>
              <span className="homy-faq-icon bg-[#f7f8fa] transition group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="homy-faq-panel">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
    </>
  );
}

export function LinkGrid({
  links,
  cols = 3,
}: {
  links: { title: string; body?: string; href: string; tag?: string; logo?: string }[];
  cols?: 2 | 3 | 4;
}) {
  const c = cols === 4 ? 'lg:grid-cols-4' : cols === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';
  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${c}`}>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="card group flex flex-col justify-between transition duration-200 hover:-translate-y-0.5 hover:border-[#070e1a]/35"
        >
          <div>
            {l.logo && (
              <span className="mb-4 inline-flex h-11 w-[132px] items-center justify-start rounded-[10px] border border-[#e3e7ee] bg-[#f7f8fa] px-3 py-1.5">
                <img
                  src={l.logo}
                  alt=""
                  width={108}
                  height={26}
                  className="h-6 w-[108px] object-contain object-left"
                  loading="eager"
                  decoding="sync"
                />
              </span>
            )}
            {l.tag && <span className="tag mb-3 self-start">{l.tag}</span>}
            <span className="block font-display text-[17px] font-bold text-[#070e1a] group-hover:text-[#0e6954]">
              {l.title}
            </span>
            {l.body && <span className="mt-2 block text-sm leading-relaxed text-[#4a5568]">{l.body}</span>}
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#070e1a] group-hover:text-[#0e6954]">
            Explore <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function CtaBand({
  title = 'Plan your Dubai mortgage with clarity.',
  body = 'Compare lender criteria across 24 licensed UAE banks, verify CBUAE caps, and prepare every dirham before signing Form F.',
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="wrap">
        <div className="bw-hot-beam-shell overflow-hidden p-[1px] shadow-[0_28px_70px_-32px_rgba(7,14,26,0.48)]">
          <div className="bw-fintech-stage !rounded-[21px] !border-0 p-8 sm:p-12 lg:flex lg:items-end lg:justify-between lg:gap-12">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <img
                  src="/brand/logo-horizontal-dark.png"
                  alt="Betterway Mortgages"
                  width={1400}
                  height={459}
                  className="h-9 w-auto"
                />
                <SectionTag light>1-on-1 Dubai Advisory Desk</SectionTag>
              </div>
              <h2 className="homy-h2 mt-2 !text-white">
                <Rich text={title} />
              </h2>
              <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-white/75">{body}</p>
            </div>
            <div className="relative z-10 mt-7 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
              <Cta href="/contact" tone="light">
                Book Advisory Call
              </Cta>
              <a
                href={waLink()}
                rel="noopener"
                className="inline-flex h-[46px] items-center gap-2 rounded-[10px] border border-white/22 bg-white/[0.06] px-5 text-sm font-semibold text-white transition hover:border-[#d7b158] hover:bg-white/[0.12]"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Institutional Midnight Navy Footer — 100% localized across EN, AR, RU, ZH, FR, ES */
export function Footer() {
  return <FooterClient />;
}

export function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['FinancialService', 'LocalBusiness'],
    '@id': `${SITE.url}/#org`,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/brand/logo-light-4k.png`,
    image: `${SITE.url}/og.png`,
    ...(SITE.phone ? { telephone: SITE.phone } : {}),
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE.address.building}, ${SITE.address.plot}, ${SITE.address.street}`,
      addressLocality: SITE.address.district,
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah'],
    openingHours: 'Mo-Sa 09:00-19:00',
  };
}
