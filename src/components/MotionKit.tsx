'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { computeScrollProgress } from '@/lib/hero-showcase';

/**
 * Lightweight scroll state tracker for the transparent-to-white sticky header & progress rail.
 * Zero scroll-reveal hiding or card animations — every section stays immediately visible at opacity 1.
 */
export default function MotionKit() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('bw-motion');
    const header = document.querySelector('.bw-header');
    const isHome = path === '/' || path === '/ru' || path === '/zh' || path === '/fr' || path === '/es';

    let raf = 0;
    const syncScroll = () => {
      raf = 0;
      header?.setAttribute('data-scrolled', String(!isHome || window.scrollY > 24));
      const progress = computeScrollProgress(window.scrollY, root.scrollHeight, window.innerHeight);
      root.style.setProperty('--scroll-progress', progress.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(syncScroll);
    };
    syncScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [path]);
  return null;
}
