'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import type { LiveCmsBanner } from '@/lib/cms-live';

/**
 * Top in-flow institutional briefing strip (36px) — renders ONLY when Betterway OS v3
 * publishes an active live CMS banner. Never floats over page content or bottom widgets.
 */
export default function LiveAnnouncementBar() {
  const [banner, setBanner] = useState<LiveCmsBanner | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/api/cms/live')
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!active) return;
        const top = j?.cms?.banners?.[0] as LiveCmsBanner | undefined;
        if (top && top.message) setBanner(top);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (!banner || dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Betterway Live Update"
      className="relative z-[55] border-b border-[#d7b158]/30 bg-[#070e1a] text-white"
    >
      <div className="wrap flex min-h-[36px] items-center justify-between gap-3 py-1.5 text-xs">
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2.5">
          <span className="shrink-0 rounded-[6px] border border-[#d7b158]/40 bg-[#d7b158]/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fcf1b7]">
            {banner.badge}
          </span>
          <p className="truncate text-white/88">{banner.message}</p>
          <Link
            href={banner.ctaHref || '/hot-offers'}
            className="inline-flex shrink-0 items-center gap-1 font-semibold text-[#34dfac] hover:underline"
          >
            <span>{banner.ctaLabel || 'View'}</span>
            <ArrowRight size={11} />
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="shrink-0 rounded-md p-1 text-white/60 transition hover:bg-white/10 hover:text-white cursor-pointer"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
