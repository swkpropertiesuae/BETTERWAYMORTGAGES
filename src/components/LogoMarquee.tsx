'use client';

import Link from 'next/link';

/**
 * Endless, silky-slow horizontal infinite marquee showcasing all 24 licensed UAE lenders.
 * Pauses smoothly on hover, fades cleanly at both edges, and honors prefers-reduced-motion.
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
      <div
        className="bw-bank-marquee__track"
        style={{ animationDuration: `${speed}s` }}
      >
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
              className="flex h-16 w-[164px] shrink-0 items-center justify-center rounded-[16px] border border-[#e5e7eb] bg-white px-5 text-sm font-medium text-[#080b0f] shadow-[0_8px_22px_-16px_rgba(10,20,36,0.22)] transition duration-200 hover:-translate-y-0.5 hover:border-[#179373] hover:shadow-[0_14px_28px_-14px_rgba(19,118,94,0.28)]"
            >
              {it.logo ? (
                <img
                  src={it.logo}
                  alt={isClone ? '' : it.label}
                  width={116}
                  height={28}
                  className="h-7 w-[116px] object-contain"
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
