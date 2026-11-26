'use client';

import Link from 'next/link';

/**
 * Endless, silky-slow horizontal infinite marquee showcasing all 24 licensed UAE lenders
 * in crisp Swiss 1px architectural white tiles.
 */
export default function LogoMarquee({
  items,
  label,
  speed = 64,
}: {
  items: { id: string; label: string; href: string; logo?: string }[];
  label: string;
  speed?: number;
  gap?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <section aria-label={label} className="bw-bank-marquee">
      <div className="bw-bank-marquee__track" style={{ animationDuration: `${speed}s` }}>
        {doubled.map((it, idx) => {
          const isClone = idx >= items.length;
          return (
            <Link
              key={`${it.id}-${idx}`}
              href={it.href}
              aria-label={it.label}
              aria-hidden={isClone || undefined}
              tabIndex={isClone ? -1 : undefined}
              title={it.label}
              className="flex h-14 w-[158px] shrink-0 items-center justify-center rounded-[12px] border border-[#e3e7ee] bg-white px-4 text-sm font-medium text-[#070e1a] transition duration-200 hover:-translate-y-0.5 hover:border-[#070e1a]/45 hover:shadow-[0_12px_26px_-18px_rgba(7,14,26,0.28)]"
            >
              {it.logo ? (
                <img
                  src={it.logo}
                  alt={isClone ? '' : it.label}
                  width={112}
                  height={26}
                  className="h-6 w-[112px] object-contain"
                  loading="eager"
                  decoding="sync"
                />
              ) : (
                <span className="truncate">{it.label}</span>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
