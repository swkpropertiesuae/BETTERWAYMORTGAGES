import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, Clock, Info, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { SITE, BENCH, DISCLOSURE_SHORT, DISCLOSURE_FULL, fullAddress, waLink } from '@/data/site';
import MotionReveal from '@/components/MotionReveal';
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
      ? 'bg-white/58 backdrop-blur-[10px] border-y border-white/65'
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
          className="card group flex flex-col !border-[#dce7e2] !bg-white/90 backdrop-blur-md transition duration-200 hover:!-translate-y-1 hover:!border-[#179373] hover:!bg-white"
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
                  height={419}
                  className="h-9 w-auto"
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

const FOOT: { title: string; links: [string, string][] }[] = [
  {
    title: 'For Buyers',
    links: [
      ['Start 60s Pre-Approval', '/get-started'],
      ['UAE Resident Mortgages', '/mortgages/uae-residents'],
      ['UAE National Mortgages', '/mortgages/uae-nationals'],
      ['Non-Resident Buyers', '/mortgages/non-resident-dubai'],
      ['Islamic Home Finance', '/mortgages/islamic-home-finance'],
      ['BetterClose · Closing Desk', '/concierge'],
    ],
  },
  {
    title: 'Rates & Tools',
    links: [
      ['24 UAE Banks & Revert Guide', '/rates/uae-mortgage-rates-eibor-revert-bible'],
      ['Live CBUAE EIBOR Tracker', '/rates/eibor-live-tracker'],
      ['Mortgage & DLD Calculator', '/calculators/mortgage-calculator'],
      ['50% DBR Borrowing Power', '/calculators/dbr-borrowing-power'],
      ['Rent vs Buy Calculator', '/calculators/rent-vs-buy-dubai'],
      ['Form F Clause Generator', '/tools/form-f-clause-generator'],
    ],
  },
  {
    title: 'Betterway Suite',
    links: [
      ['BetterHub · RERA Agencies', '/hub'],
      ['BetterCore · Brokerage OS', '/edge'],
      ['Join BetterHub', '/partners'],
      ['BetterVault · Portal Login', '/portal/login'],
      ['About Betterway', '/about-us'],
      ['Our Dubai Specialists', '/our-underwriters'],
    ],
  },
];

/** Corporate Institutional Dark Footer (#0b1117, radius: 30px) */
export function Footer() {
  return (
    <div className="homy-footer-shell">
      <footer className="homy-footer-card">
        {/* Top Executive CTA Banner + Subtle BETTERWAY Architectural Watermark */}
        <div className="homy-footer-cta">
          <div className="homy-footer-cta__copy">
            <SectionTag>Speak with our Oud Metha desk</SectionTag>
            <h2>Review written terms before you sign Form F</h2>
            <p>
              Compare mortgage structures across 24 UAE lenders with daily CBUAE EIBOR benchmarks and itemised 4% DLD
              closing schedules.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Cta href="/contact">Book an Advisory Call</Cta>
              <Cta href="/calculators/mortgage-calculator" tone="ghost">
                Run DLD Calculator
              </Cta>
            </div>
          </div>

          <div className="homy-footer-villa">
            <img
              src="/images/footer-dubai-night-villa.webp"
              alt="Sunlit morning aerial view of turquoise Dubai Marina waterfront residences and skyline"
              width={2560}
              height={1440}
              loading="lazy"
              decoding="async"
            />
            <div className="homy-footer-watermark" aria-hidden="true">
              BETTERWAY
            </div>
          </div>
        </div>

        {/* Dark #0b1117 Footer Links Grid */}
        <div className="homy-footer-body">
          <div className="homy-footer-grid">
            <div className="space-y-5">
              <Link href="/" aria-label="Betterway Mortgages home" className="inline-block">
                <img
                  src="/brand/logo-horizontal-dark.png"
                  alt="Betterway Mortgages"
                  width={1400}
                  height={419}
                  className="h-14 w-auto sm:h-16"
                />
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-white/68">
                Independent Dubai &amp; UAE mortgage advisory for residents, overseas buyers, and investors. Compare the whole offer, not just the headline rate.
              </p>
              {SITE.licence && <p className="text-xs text-white/50">{SITE.licence}</p>}
            </div>

            {FOOT.map((col) => (
              <div key={col.title} className="homy-footer-col">
                <h3>{col.title}</h3>
                <ul>
                  {col.links.map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="ulink">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="homy-footer-col">
              <h3>Contact</h3>
              <div className="grid gap-3.5">
                <a href={`mailto:${SITE.email}`} className="homy-contact-item hover:text-white">
                  <span className="homy-contact-icon" aria-hidden="true">
                    <Mail size={15} />
                  </span>
                  <span className="truncate">{SITE.email}</span>
                </a>
                {SITE.phone && (
                  <a href={SITE.phoneHref} className="homy-contact-item hover:text-white">
                    <span className="homy-contact-icon" aria-hidden="true">
                      <Phone size={15} />
                    </span>
                    <span>{SITE.phone}</span>
                  </a>
                )}
                <div className="homy-contact-item">
                  <span className="homy-contact-icon" aria-hidden="true">
                    <MapPin size={15} />
                  </span>
                  <span className="text-xs leading-snug text-white/75">{fullAddress}</span>
                </div>
                <div className="homy-contact-item">
                  <span className="homy-contact-icon" aria-hidden="true">
                    <Clock size={15} />
                  </span>
                  <span className="text-xs text-white/75">{SITE.hours}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="homy-footer-bottom">
            <p className="leading-relaxed">{DISCLOSURE_FULL}</p>
            <p>
              Betterway Mortgages LLC is a mortgage adviser, not a bank. Lending decisions, rates and final offers are made solely in writing by the licensed UAE lender.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-white/75">
              <p>© 2026 {SITE.legalName}. All rights reserved.</p>
              <nav aria-label="Legal and SEO links" className="flex flex-wrap items-center gap-4">
                <Link href="/hot-offers" className="ulink">
                  BetterDesk
                </Link>
                <Link href="/insights" className="ulink">
                  36 UAE Insights
                </Link>
                <Link href="/downloads" className="ulink">
                  52 Free PDF Guides
                </Link>
                <Link href="/privacy-and-cbuae-disclosure" className="ulink">
                  Privacy &amp; CBUAE Disclosure
                </Link>
                <Link href="/sitemap" className="ulink">
                  Sitemap
                </Link>
                <span className="inline-flex items-center gap-2.5 border-s border-white/15 ps-3">
                  <Link href="/ar" lang="ar" className="ulink">العربية</Link>
                  <Link href="/ru" lang="ru" className="ulink">RU</Link>
                  <Link href="/zh" lang="zh" className="ulink">中文</Link>
                  <Link href="/fr" lang="fr" className="ulink">FR</Link>
                  <Link href="/es" lang="es" className="ulink">ES</Link>
                </span>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
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
