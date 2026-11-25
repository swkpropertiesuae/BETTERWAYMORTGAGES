'use client';
import Link from 'next/link';

/**
 * Clean, static, zero-animation responsive 24-bank directory grid.
 * Displays all licensed UAE lenders at once with crisp optical clarity and zero sliding marquee distraction.
 */
export default function LogoMarquee({
  items,
  label,
}: {
  items: { id: string; label: string; href: string; logo?: string }[];
  label: string;
  speed?: number;
  gap?: number;
}) {
  return (
    <section aria-label={label} className="w-full">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((it) => (
          <li key={it.id}>
            <Link
              href={it.href}
              aria-label={it.label}
              title={it.label}
              className="flex h-14 w-full items-center justify-center rounded-[14px] border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#080b0f] transition-colors hover:border-[#179373]"
            >
              {it.logo ? (
                <img
                  src={it.logo}
                  alt={it.label}
                  className="h-7 w-auto max-w-[124px] object-contain"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="truncate">{it.label}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
