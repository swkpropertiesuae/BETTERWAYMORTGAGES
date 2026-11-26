import Link from 'next/link';
import type { ReactNode } from 'react';
import { MessageCircle } from 'lucide-react';
import { JsonLd } from './ui';
import { SITE, waLink } from '@/data/site';
import { AR_UI } from '@/data/ar';

export function ArHero({
  crumbs,
  title,
  capsule,
  en,
  children,
}: {
  crumbs: [string, string][];
  eyebrow?: string;
  title: string;
  capsule: string;
  en?: string;
  children?: ReactNode;
}) {
  const all: [string, string][] = [[AR_UI.home, '/ar'], ...crumbs];
  return (
    <section className="border-b border-[#e3e7ee] bg-white">
      <div className="wrap py-10 lg:py-14">
        <nav aria-label="مسار التنقل" className="text-xs font-medium text-[#4a5568]">
          <ol className="flex flex-wrap gap-1.5">
            {all.map(([n, h], i) => (
              <li key={h} className="flex gap-1.5">
                {i > 0 && <span className="text-[#cbd5e1]">/</span>}
                {i < all.length - 1 ? (
                  <Link href={h} className="hover:text-[#0e6954]">
                    {n}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-semibold text-[#070e1a]">
                    {n}
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
            itemListElement: all.map(([n, h], i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: n,
              item: SITE.url + h,
            })),
          }}
        />
        <h1 className="mt-6 max-w-4xl text-[2rem] font-bold leading-snug text-[#070e1a] sm:text-[2.6rem]">{title}</h1>
        <div
          className="mt-6 max-w-3xl rounded-[14px] border border-[#e3e7ee] border-s-[3px] border-s-[#0e6954] bg-[#f7f8fa] p-5"
          data-capsule
        >
          <p className="text-[16px] leading-loose text-[#0b1320]">{capsule}</p>
          <p className="mt-3 text-xs text-[#4a5568]">{AR_UI.updated}</p>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={waLink('مرحباً بيترواي، أرغب في الحصول على عرض تمويل عقاري.')}
            rel="noopener"
            className="btn btn-primary"
          >
            <MessageCircle size={16} /> {AR_UI.cta}
          </a>
          {en && (
            <Link href={en} lang="en" className="btn btn-ghost">
              English version
            </Link>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

export function ArSection({
  title,
  children,
  tone = 'white',
  id,
}: {
  title: string;
  children: ReactNode;
  tone?: 'white' | 'mist';
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${tone === 'mist' ? 'border-y border-[#e3e7ee] bg-[#f7f8fa]' : 'bg-white'} py-14 lg:py-16`}
    >
      <div className="wrap">
        <h2 className="mb-8 text-[1.75rem] font-bold text-[#070e1a] sm:text-3xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export function ArFacts({ facts }: { facts: [string, string][] }) {
  return (
    <dl className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
      {facts.map(([k, v]) => (
        <div
          key={k}
          className="rounded-[14px] border border-[#e3e7ee] bg-white p-5 max-sm:odd:last:col-span-2 sm:[&:nth-child(3n+1):last-child]:col-span-3"
        >
          <dt className="text-xs font-semibold text-[#4a5568]">{k}</dt>
          <dd className="num mt-1.5 text-lg font-bold text-[#070e1a]" dir="ltr" style={{ textAlign: 'right' }}>
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ArLinks({ links }: { links: { title: string; body?: string; href: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="card">
          <span className="font-semibold text-[#070e1a]">{l.title}</span>
          {l.body && <span className="mt-1.5 block text-sm leading-relaxed text-[#4a5568]">{l.body}</span>}
        </Link>
      ))}
    </div>
  );
}
