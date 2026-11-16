'use client';
// Mega-menu header adapted from 21st.dev "Mega Menu Navbar" (anelkabag/navbar2): shared animated panel, mobile slide-down.
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { AlertCenter } from '@/components/StartupExperience';
import { NAV } from '@/data/nav';
import { isNavActive } from '@/lib/nav-active';

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const reduce = useReducedMotion();
  useEffect(() => { setOpen(null); setMobile(false); }, [path]);
  useEffect(() => {
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(null); setMobile(false); } };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, []);
  const active = NAV.find((n) => n.label === open);

  return (
    <header ref={ref} className="bw-header">
      <div className="wrap bw-header__bar">
        <Link href="/" aria-label="Betterway Mortgages home" className="bw-header__logo shrink-0">
          <img src="/brand/logo-white.svg" alt="Betterway Mortgages" width={1618} height={276} fetchPriority="high" />
        </Link>
        <nav aria-label="Main" className="bw-nav">
          <Link
            href="/"
            aria-current={isNavActive(path, 'Home') ? 'page' : undefined}
            data-active={isNavActive(path, 'Home') || undefined}
            onMouseEnter={() => open && setOpen(null)}
          >
            Home
          </Link>
          {NAV.map((n) => (
            <button
              key={n.label}
              type="button"
              aria-expanded={open === n.label}
              data-active={isNavActive(path, n.label) || undefined}
              onClick={() => setOpen((c) => (c === n.label ? null : n.label))}
              onMouseEnter={() => open && setOpen(n.label)}
            >
              {n.label}
              <ChevronDown size={13} className={`transition-transform duration-300 ${open === n.label ? 'rotate-180' : ''}`} />
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <AlertCenter />
          <Link href="/ar" className="hidden rounded-full px-2.5 py-2 text-xs font-semibold tracking-wider text-white/80 transition hover:text-brass min-[1200px]:inline" lang="ar">العربية</Link>
          <span className="hidden min-[1200px]:inline-flex"><Link href="/contact" className="bw-cta-pill">Contact us</Link></span>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-brass/50 hover:text-brass min-[1200px]:hidden"
            aria-label={mobile ? 'Close menu' : 'Open menu'}
            aria-expanded={mobile}
            onClick={() => setMobile((m) => !m)}
          >
            {mobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {active?.cols && (
          <motion.div
            key={active.label}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden overflow-hidden border-t border-white/10 bg-[#021125] text-white shadow-[0_32px_64px_-24px_rgb(1_9_21/0.85)] min-[1200px]:block"
          >
            <div className="wrap grid grid-cols-[1fr_1fr_1fr_256px] gap-7 py-8">
              {active.cols.map((c, ci) => (
                <div key={ci}>
                  <p className="mb-4 h-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brass">{c.title.trim()}</p>
                  <ul className="space-y-3">
                    {c.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          aria-current={path === l.href ? 'page' : undefined}
                          className="group flex items-baseline justify-between gap-3 text-[15px] font-medium text-white/90 transition hover:text-brass"
                        >
                          <span className="ulink">{l.label}</span>
                          {l.desc && <span className="text-xs text-white/50">{l.desc}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {active.cols.length < 3 && <div />}
              <div className="rounded-card border border-brass/25 bg-white/[0.04] p-6 text-white">
                <p className="font-display text-lg font-semibold text-white">{active.feature?.title ?? 'Plan your next move'}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{active.feature?.body ?? 'Every calculator is free to use, with no sign-up.'}</p>
                <Link href={active.feature?.href ?? active.href} className="bw-cta-pill mt-5 !h-10 !px-4 !text-[11.5px]">
                  {active.feature?.cta ?? `All ${active.label.toLowerCase()}`} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {mobile && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-[#021125] text-white min-[1200px]:hidden"
          >
            <nav aria-label="Mobile" className="wrap max-h-[calc(100dvh-72px)] overflow-y-auto pb-8 pt-2">
              <Link
                href="/"
                aria-current={isNavActive(path, 'Home') ? 'page' : undefined}
                className={`flex items-center justify-between border-b border-white/10 py-4 text-sm font-semibold uppercase tracking-[0.1em] ${isNavActive(path, 'Home') ? 'text-brass' : 'text-white'}`}
              >
                Home
              </Link>
              {NAV.map((n) => (
                <details key={n.label} className="group border-b border-white/10">
                  <summary className={`flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold uppercase tracking-[0.1em] ${isNavActive(path, n.label) ? 'text-brass' : 'text-white'}`}>
                    {n.label}<ChevronDown size={18} className="text-brass transition group-open:rotate-180" />
                  </summary>
                  <ul className="space-y-3 pb-4">
                    {n.cols?.flatMap((c) => c.links).map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          aria-current={path === l.href ? 'page' : undefined}
                          className="block text-[15px] text-white/75 transition hover:text-brass"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
              <div className="mt-6 grid gap-3">
                <Link href="/contact" className="bw-cta-pill !h-11 w-full">Contact us</Link>
                <Link href="/ar" className="btn w-full border border-white/15 bg-white/5 text-white hover:border-brass/50 hover:text-brass" lang="ar">العربية</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <span className="bw-scroll-rail" aria-hidden="true" />
    </header>
  );
}
