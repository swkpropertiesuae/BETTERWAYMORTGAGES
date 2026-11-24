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
    <header ref={ref} className="bw-header hm-header">
      <div className="wrap bw-header__bar">
        <Link href="/" aria-label="Betterway Mortgages home" className="bw-header__logo shrink-0">
          <img src="/brand/bw/betterway-logo-horizontal-light-bg.svg" alt="Betterway Mortgages" width={1514} height={468} fetchPriority="high" />
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
          <Link href="/ar" className="hidden rounded-full px-2.5 py-2 text-xs font-semibold tracking-wider text-navy/75 transition hover:text-teal min-[1200px]:inline" lang="ar">العربية</Link>
          <span className="hidden min-[1200px]:inline-flex"><Link href="/contact" className="hm-btn hm-btn--sm">Contact us<span className="hm-btn__tile"><ArrowRight size={15} /></span></Link></span>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-navy transition hover:border-[#070e1a] min-[1200px]:hidden"
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
            className="hm-mega hidden overflow-hidden min-[1200px]:block"
          >
            <div className="wrap grid grid-cols-[1fr_1fr_1fr_256px] gap-7 py-8">
              {active.cols.map((c, ci) => (
                <div key={ci}>
                  <p className="hm-mega__title h-4">{c.title.trim()}</p>
                  <ul className="space-y-3">
                    {c.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          aria-current={path === l.href ? 'page' : undefined}
                          className="hm-mega__link"
                        >
                          <span className="ulink">{l.label}</span>
                          {l.desc && <small>{l.desc}</small>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {active.cols.length < 3 && <div />}
              <div className="hm-mega__feature">
                <p className="font-display text-lg font-semibold text-navy">{active.feature?.title ?? 'Plan your next move'}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate">{active.feature?.body ?? 'Every calculator is free to use, with no sign-up.'}</p>
                <Link href={active.feature?.href ?? active.href} className="hm-btn hm-btn--sm mt-5">
                  {active.feature?.cta ?? `All ${active.label.toLowerCase()}`}<span className="hm-btn__tile"><ArrowRight size={14} /></span>
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
            className="overflow-hidden border-t border-line bg-white text-navy min-[1200px]:hidden"
          >
            <nav aria-label="Mobile" className="wrap max-h-[calc(100dvh-72px)] overflow-y-auto pb-8 pt-2">
              <Link
                href="/"
                aria-current={isNavActive(path, 'Home') ? 'page' : undefined}
                className={`flex items-center justify-between border-b border-line py-4 text-sm font-semibold uppercase tracking-[0.1em] ${isNavActive(path, 'Home') ? 'text-teal' : 'text-navy'}`}
              >
                Home
              </Link>
              {NAV.map((n) => (
                <details key={n.label} className="group border-b border-line">
                  <summary className={`flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold uppercase tracking-[0.1em] ${isNavActive(path, n.label) ? 'text-teal' : 'text-navy'}`}>
                    {n.label}<ChevronDown size={18} className="text-teal transition group-open:rotate-180" />
                  </summary>
                  <ul className="space-y-3 pb-4">
                    {n.cols?.flatMap((c) => c.links).map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          aria-current={path === l.href ? 'page' : undefined}
                          className="block text-[15px] text-slate transition hover:text-teal"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
              <div className="mt-6 grid gap-3">
                <Link href="/contact" className="hm-btn w-full justify-between">Contact us<span className="hm-btn__tile"><ArrowRight size={15} /></span></Link>
                <Link href="/ar" className="btn w-full border border-line bg-white text-navy hover:border-[#070e1a]" lang="ar">العربية</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <span className="bw-scroll-rail" aria-hidden="true" />
    </header>
  );
}
