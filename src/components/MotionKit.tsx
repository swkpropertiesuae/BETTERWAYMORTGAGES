'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { computeScrollProgress } from '@/lib/hero-showcase';

export default function MotionKit() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const header = document.querySelector('.bw-header');
    const isHome = path === '/';

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

    if (media.matches || !('IntersectionObserver' in window)) {
      root.classList.remove('bw-motion');
      return () => {
        if (raf) window.cancelAnimationFrame(raf);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    );

    const scan = () =>
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.94 && r.bottom > 0) el.classList.add('is-in');
        else io.observe(el);
      });

    scan();
    root.classList.add('bw-motion');

    const onChange = () => {
      if (media.matches) {
        root.classList.remove('bw-motion');
        io.disconnect();
      }
    };
    media.addEventListener('change', onChange);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      io.disconnect();
      media.removeEventListener('change', onChange);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [path]);
  return null;
}
