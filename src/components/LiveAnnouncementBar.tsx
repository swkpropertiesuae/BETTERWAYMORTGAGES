'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import type { LiveCmsBanner } from '@/lib/cms-live';

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
      className="fixed bottom-20 start-5 z-[55] max-w-md rounded-2xl border border-[#d4af37]/45 bg-[#070e1a]/95 px-4 py-3 text-white shadow-2xl backdrop-blur-md"
    >
      <div className="flex items-start gap-2.5">
        <Sparkles size={15} className="mt-0.5 shrink-0 text-[#f1d57e]" />
        <div className="min-w-0 flex-1 space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#d4af37] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#070e1a]">
              {banner.badge}
            </span>
            <Link
              href={banner.ctaHref || '/hot-offers'}
              className="inline-flex items-center gap-1 font-bold text-[#34dfac] hover:underline"
            >
              {banner.ctaLabel || 'View Offer'} <ArrowRight size={11} />
            </Link>
          </div>
          <p className="leading-snug text-white/90">{banner.message}</p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
