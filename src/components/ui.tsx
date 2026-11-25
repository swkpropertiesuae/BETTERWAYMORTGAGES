import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, Clock, Info, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { SITE, BENCH, DISCLOSURE_SHORT, DISCLOSURE_FULL, fullAddress, waLink } from '@/data/site';
import MotionReveal from '@/components/MotionReveal';
import type { Faq as FaqT } from '@/data/products';

export const aed = (n: number) => `AED ${Math.round(n).toLocaleString('en-US')}`;
export const aedM = (n: number) => `AED ${n >= 10 ? n.toFixed(1) : n.toFixed(2)}M`;

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Renders `*word*` in a heading as a bold italic editorial accent. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return <>{parts.map((p, i) => (i % 2 ? <em key={i}>{p}</em> : p))}</>;
}
export const plain = (text: string) => text.replace(/\*/g, '');

/** Homy Dot-Ring Section Tag */
export function SectionTag({ children, light = false }: { children: string; light?: boolean }) {
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

/** Clean Homy summary card shown beside inner-page headers: statutory CBUAE benchmarks. */
export function MiniPhone() {
  return (
    <div
      className="relative mx-auto hidden w-[268px] rounded-[24px] border border-[#e5e7eb] bg-[#f6f6f6] p-5 lg:block"
      aria-hidden="true"
    >
      <div className="flex items-center gap-2.5">
        <img src="/brand/icon-fullcolor.svg" alt="" width={34} height={34} className="h-[34px] w-[34px]" />
        <span className="font-display text-sm font-semibold text-[#080b0f]">Betterway CBUAE Caps</span>
      </div>
      <div className="mt-4 rounded-[16px] bg-[#080b0f] p-4 text-white">
        <p className="text-[11px] uppercase tracking-wider text-white/65">CBUAE max DBR</p>
        <p className="num mt-1 text-[28px] font-semibold text-white">{BENCH.maxDbrPct}%</p>
      </div>
      <div className="mt-2.5 space-y-1.5 text-[12px]">
        {[
          ['Expat first home', `Up to ${BENCH.expatFirstHomeLtv}% LTV`],
          ['UAE National', `Up to ${BENCH.nationalFirstHomeLtv}% LTV`],
          ['Max tenure', `${BENCH.maxTenureYears} years`],
          ['Lender directory', `${BENCH.bankCount} banks`],
        ].map(([a, b]) => (
          <div key={a} className="flex justify-between rounded-[10px] bg-white px-3 py-2">
            <span className="text-[#606060]">{a}</span>
            <span className="num font-semibold text-[#080b0f]">{b}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-[10px] bg-[#080b0f] py-2.5 text-center text-[12px] font-medium text-white">
        Plan your mortgage
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
  const bg = tone === 'mist' ? 'bg-[#f6f6f6]' : tone === 'navy' ? 'bg-[#0b1117] text-white' : 'bg-white';
  const dark = tone === 'navy';
  return (
    <section id={id} className={`${bg} py-16 lg:py-20`}>
      <MotionReveal className="wrap">
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
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {facts.map(([k, v]) => (
        <div key={k} className="rounded-[12px] bg-[#eeeff0] p-5 max-sm:odd:last:col-span-2">
          <dt className="text-xs font-medium uppercase tracking-wide text-[#4b5b63]">{k}</dt>
          <dd className={`mt-1.5 text-lg font-semibold text-[#080b0f] ${/^[\d+−-]|^AED|^3M/.test(v) ? 'num' : 'font-display'}`}>{v}</dd>
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
        <Link key={l.href} href={l.href} className="card group flex flex-col">
          {l.logo && (
            <span className="mb-4 inline-flex h-10 w-32 items-center justify-start">
              <img src={l.logo} alt="" className="max-h-7 w-auto max-w-[120px] object-contain object-left" loading="lazy" decoding="async" />
            </span>
          )}
          {l.tag && <span className="tag mb-3 self-start">{l.tag}</span>}
          <span className="font-display text-[17px] font-semibold text-[#080b0f] group-hover:text-[#0e6954]">{l.title}</span>
          {l.body && <span className="mt-2 text-sm leading-relaxed text-[#606060]">{l.body}</span>}
          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-[#080b0f] group-hover:text-[#0e6954]">
            Explore <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function CtaBand({
  title = 'Plan your Dubai mortgage with clarity.',
  body = 'Compare lender criteria, review statutory CBUAE caps, and prepare your documents before making an offer.',
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="wrap">
        <div className="rounded-[24px] bg-[#f6f6f6] p-8 sm:p-12 lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <SectionTag>Talk to an advisor</SectionTag>
            <h2 className="homy-h2 mt-4">
              <Rich text={title} />
            </h2>
            <p className="homy-sub mt-4">{body}</p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
            <Cta href="/contact">Get in Touch</Cta>
            <Cta href={waLink()} tone="ghost">
              Ask a Question
            </Cta>
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
      ['Betterway Concierge', '/concierge'],
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
    title: 'Partners & OS',
    links: [
      ['Hub by Betterway (Agents)', '/hub'],
      ['Edge by Betterway (Brokerage OS)', '/edge'],
      ['Become a RERA Partner', '/partners'],
      ['Client & Staff Portal Login', '/portal/login'],
      ['About Betterway', '/about-us'],
      ['Our Dubai Specialists', '/our-underwriters'],
    ],
  },
];

/** Exact Homy Rounded Sky-to-Twilight-Villa Dark Footer (#0b1117, radius: 30px) */
export function Footer() {
  return (
    <div className="homy-footer-shell">
      <footer className="homy-footer-card">
        {/* Top Sky-to-Villa CTA Banner + Giant Fading BETTERWAY Watermark */}
        <div className="homy-footer-cta">
          <div className="homy-footer-cta__copy">
            <SectionTag>Start your Dubai mortgage</SectionTag>
            <h2>Discover financing built around your life</h2>
            <p>
              Compare UAE mortgage structures across 24 lenders with clear EIBOR benchmarks and itemised closing costs.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Cta href="/contact">Get in Touch</Cta>
              <Cta href="/calculators/mortgage-calculator" tone="ghost">
                Run Calculator
              </Cta>
            </div>
          </div>

          <div className="homy-footer-villa">
            <img
              src="/images/footer-dubai-night-villa.webp"
              alt="High-resolution twilight aerial view of Downtown Dubai, Burj Khalifa, and illuminated Sheikh Zayed Road"
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
                  src="/brand/logo-white-full.svg"
                  alt="Betterway Mortgages"
                  width={1450}
                  height={468}
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
              Betterway Mortgages is a mortgage adviser, not a bank. Lending decisions, rates and final offers are made by the lender. Concept residence images are AI-generated.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-white/75">
              <p>© 2026 {SITE.legalName}. All rights reserved.</p>
              <nav aria-label="Legal" className="flex flex-wrap items-center gap-5">
                <Link href="/privacy-and-cbuae-disclosure" className="ulink">
                  Privacy &amp; CBUAE Disclosure
                </Link>
                <Link href="/sitemap" className="ulink">
                  Sitemap
                </Link>
                <Link href="/ar" lang="ar" className="ulink">
                  العربية
                </Link>
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
    logo: `${SITE.url}/brand/logo-primary.svg`,
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
