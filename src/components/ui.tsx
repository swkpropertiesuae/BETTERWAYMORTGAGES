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

/** Renders `*word*` in a heading as a bold italic editorial accent. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return <>{parts.map((p, i) => (i % 2 ? <em key={i}>{p}</em> : p))}</>;
}
export const plain = (text: string) => text.replace(/\*/g, '');

/** Homy Dot-Ring Section Tag */
export function SectionTag({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`homy-tag ${light ? 'homy-tag--light' : ''}`}>
      <span className="homy-tag__ring" aria-hidden="true" />
      <span>{children}</span>
    </span>
  );
}

/** Homy Signature Button: 12px radius + 28x28 circular sliding-arrow badge (or crisp Outline variant). */
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

/** Kept exported for compatibility where needed. */
export function UtilityBar() {
  return (
    <div className="bg-[#080b0f] text-xs text-white/75">
      <div className="wrap flex min-h-[38px] items-center justify-center gap-3 py-1.5 text-center">
        <p className="truncate">
          <ShieldCheck size={13} className="me-1.5 inline -translate-y-px text-[#d7b158]" />
          <b className="font-medium text-white">CBUAE EIBOR fixings</b>
          <span className="hidden sm:inline"> are published every business day. Compare your offer against the benchmark.</span>
        </p>
        <Link href="/rates/eibor-live-tracker" className="whitespace-nowrap font-semibold text-[#f1d57e] hover:underline">
          EIBOR tracker →
        </Link>
      </div>
    </div>
  );
}

export function Disclosure({ dark = false }: { dark?: boolean }) {
  return (
    <details className={`group mt-4 max-w-2xl text-xs ${dark ? 'text-white/60' : 'text-[#606060]'}`}>
      <summary className="cursor-pointer list-none">
        {DISCLOSURE_SHORT}{' '}
        <span className={`inline-flex items-center gap-1 font-semibold underline-offset-2 hover:underline ${dark ? 'text-[#f1d57e]' : 'text-[#0e6954]'}`}>
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
      <nav aria-label="Breadcrumb" className="text-sm text-[#606060]">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden="true" className="text-[#c7c7c7]">
                  /
                </span>
              )}
              {i < all.length - 1 ? (
                <Link href={c.href} className="hover:text-[#080b0f]">
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-[#080b0f]">
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
          itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: SITE.url + c.href })),
        }}
      />
    </>
  );
}

/** Sleek 21st.dev fintech CBUAE benchmark summary card shown beside inner-page headers. */
export function MiniPhone() {
  return (
    <div
      className="bw-fintech-stage relative mx-auto hidden w-[280px] !min-h-0 !rounded-[24px] !p-5 shadow-[0_24px_60px_-26px_rgba(7,13,25,0.55)] lg:block"
      aria-hidden="true"
    >
      <div className="relative z-10 flex items-center gap-2.5">
        <img src="/brand/icon.png" alt="" width={34} height={34} className="h-[34px] w-[34px] object-contain" />
        <span className="font-display text-sm font-bold text-white">Betterway CBUAE Caps</span>
      </div>
      <div className="relative z-10 mt-4 rounded-[16px] border border-white/14 bg-white/[0.07] p-4 text-white backdrop-blur-md">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#ffe074]">CBUAE max DBR</p>
        <p className="num mt-1 text-[28px] font-extrabold text-white">{BENCH.maxDbrPct}%</p>
      </div>
      <div className="relative z-10 mt-2.5 space-y-1.5 text-[12px]">
        {[
          ['Expat first home', `Up to ${BENCH.expatFirstHomeLtv}% LTV`],
          ['UAE National', `Up to ${BENCH.nationalFirstHomeLtv}% LTV`],
          ['Max tenure', `${BENCH.maxTenureYears} years`],
          ['Lender directory', `${BENCH.bankCount} banks`],
        ].map(([a, b]) => (
          <div key={a} className="flex justify-between rounded-[10px] border border-white/10 bg-white/[0.05] px-3 py-2">
            <span className="text-white/70">{a}</span>
            <span className="num font-semibold text-[#7ef7d2]">{b}</span>
          </div>
        ))}
      </div>
      <div className="relative z-10 mt-3 rounded-[10px] bg-white py-2.5 text-center text-[12px] font-bold text-[#080b0f]">
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
      ? 'lg:grid-cols-[minmax(0,1fr)_270px]'
      : side
        ? 'lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]'
        : '';
  return (
    <section className="bw-pagehero">
      <div className="wrap relative py-10 lg:py-16">
        <Crumbs items={crumbs} />
        <div className={`mt-8 grid gap-10 ${sideCols ? `${sideCols} lg:items-center` : ''}`}>
          <div>
            {eyebrow && (
              <div className="mb-5">
                <SectionTag>{eyebrow}</SectionTag>
              </div>
            )}
            <h1 className="max-w-4xl">
              {head}
              {sub && (
                <span className="mt-4 block font-sans text-lg font-normal leading-snug tracking-normal text-[#606060] sm:text-xl">
                  {sub}
                </span>
              )}
            </h1>
            {capsule && (
              <div className="bw-capsule mt-7 max-w-2xl" data-capsule>
                <p className="text-[15.5px] leading-relaxed text-[#262626]">{capsule}</p>
                {updated && <p className="mt-2 text-xs text-[#606060]">{SITE.asOf}</p>}
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
      ? 'bg-transparent border-y border-[#0a1424]/[0.07]'
      : tone === 'navy'
        ? 'bw-fintech-stage !min-h-0 !rounded-none !border-0 text-white'
        : 'bg-transparent';
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
          className="rounded-[16px] border border-[#dce7e2] bg-white/88 p-5 shadow-[0_12px_30px_-24px_rgba(8,15,28,0.16)] backdrop-blur-md max-sm:odd:last:col-span-2"
        >
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#4b5b63]">{k}</dt>
          <dd className={`mt-1.5 text-lg font-bold text-[#080b0f] ${/^[\d+−-]|^AED|^3M/.test(v) ? 'num' : 'font-display'}`}>{v}</dd>
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
              <span className="homy-faq-icon transition group-open:rotate-45" aria-hidden="true">
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
          mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
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
          className="card bw-beam-box group flex flex-col !rounded-[20px] !border-[#0a1424]/10 !bg-white/78 backdrop-blur-md transition duration-200 hover:!-translate-y-1 hover:!border-[#d7b158]"
        >
          {l.logo && (
            <span className="mb-4 inline-flex h-11 w-[136px] items-center justify-start rounded-[12px] border border-[#ebf0ee] bg-white px-3 py-1.5 shadow-[0_4px_14px_-10px_rgba(8,15,28,0.2)]">
              <img
                src={l.logo}
                alt=""
                width={112}
                height={28}
                className="h-7 w-[112px] object-contain object-left"
                loading="eager"
                decoding="sync"
              />
            </span>
          )}
          {l.tag && <span className="tag mb-3 self-start">{l.tag}</span>}
          <span className="font-display text-[17px] font-bold text-[#080b0f] group-hover:text-[#0e6954]">{l.title}</span>
          {l.body && <span className="mt-2 text-sm leading-relaxed text-[#4f596b]">{l.body}</span>}
          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-bold text-[#080b0f] group-hover:text-[#0e6954]">
            Explore <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
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
    <section className="bg-transparent py-14 lg:py-20">
      <div className="wrap">
        <div className="bw-hot-beam-shell overflow-hidden rounded-[28px] p-[2px] shadow-[0_30px_76px_-30px_rgba(7,13,25,0.52)]">
          <div className="bw-fintech-stage !min-h-0 !rounded-[26px] !border-0 !p-8 sm:!p-12 lg:flex lg:items-end lg:justify-between lg:gap-12">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <img
                  src="/brand/logo-horizontal-dark.png"
                  alt="Betterway Mortgages"
                  width={1400}
                  height={459}
                  className="h-10 w-auto"
                />
                <SectionTag light>1-on-1 Dubai Advisory Desk</SectionTag>
              </div>
              <h2 className="homy-h2 mt-2 !text-white">
                <Rich text={title} />
              </h2>
              <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-white/76">{body}</p>
            </div>
            <div className="relative z-10 mt-7 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
              <Cta href="/contact" tone="light">
                Book Advisory Call
              </Cta>
              <a
                href={waLink()}
                rel="noopener"
                className="inline-flex h-12 items-center gap-2 rounded-[12px] border border-white/25 bg-white/10 px-5 text-sm font-bold text-white backdrop-blur-md transition hover:border-[#00d69a] hover:bg-white/18"
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

/** Corporate Institutional Dark Footer (#0b1117, radius: 30px) — 100% localized across EN, AR, RU, ZH, FR, ES */
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
