'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { AlertCenter } from '@/components/StartupExperience';
import { NAV } from '@/data/nav';
import { isNavActive } from '@/lib/nav-active';

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const reduce = useReducedMotion();
  const isHome = path === '/';

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [path]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null);
        setMobile(false);
      }
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', esc);
    };
  }, []);

  const active = NAV.find((n) => n.label === open);

  return (
    <header
      ref={ref}
      className="bw-header"
      data-over-hero={isHome ? 'true' : 'false'}
      data-scrolled={isHome ? 'false' : 'true'}
    >
      <div className="wrap bw-header__bar">
        <Link href="/" aria-label="Betterway Mortgages home" className="bw-header__logo shrink-0">
          <img
            src="/brand/logo-light.svg"
            alt="Betterway Mortgages"
            width={1450}
            height={468}
            fetchPriority="high"
          />
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
              <ChevronDown
                size={13}
                className={`opacity-70 transition-transform duration-300 ${open === n.label ? 'rotate-180 opacity-100' : ''}`}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <AlertCenter />
          <Link
            href="/ar"
            className="hidden rounded-[10px] px-2.5 py-2 text-xs font-semibold tracking-wider text-[#36454e] transition hover:text-[#080b0f] min-[1200px]:inline"
            lang="ar"
          >
            العربية
          </Link>
          <span className="hidden min-[1200px]:inline-flex">
            <Link href="/contact" className="homy-btn">
              <span>Contact us</span>
              <span className="homy-btn__disc" aria-hidden="true">
                <span className="homy-btn__arrow-track">
                  <ArrowRight size={14} strokeWidth={2.2} />
                  <ArrowRight size={14} strokeWidth={2.2} />
                </span>
              </span>
            </Link>
          </span>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-[10px] border border-[#080b0f]/15 bg-white/80 text-[#080b0f] transition hover:border-[#080b0f] min-[1200px]:hidden"
            aria-label={mobile ? 'Close menu' : 'Open menu'}
            aria-expanded={mobile}
            onClick={() => setMobile((m) => !m)}
          >
            {mobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Desktop Mega-Menu Dropdown (Crisp Homy White + #f6f6f6 Surface) */}
      <AnimatePresence initial={false}>
        {active?.cols && (
          <motion.div
            key={active.label}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="hidden overflow-hidden border-t border-[#ececec] bg-white text-[#080b0f] shadow-[0_32px_64px_-24px_rgba(8,11,15,0.22)] min-[1200px]:block"
          >
            <div className="wrap grid grid-cols-[1fr_1fr_1fr_270px] gap-8 py-8">
              {active.cols.map((c, ci) => (
                <div key={ci}>
                  <p className="mb-4 h-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4b5b63]">
                    {c.title.trim()}
                  </p>
                  <ul className="space-y-3">
                    {c.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          aria-current={path === l.href ? 'page' : undefined}
                          className="group flex items-baseline justify-between gap-3 text-[15px] font-medium text-[#191919] transition hover:text-[#0e6954]"
                        >
                          <span className="ulink">{l.label}</span>
                          {l.desc && <span className="text-xs text-[#606060]">{l.desc}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {active.cols.length < 3 && <div />}
              <div className="rounded-[18px] bg-[#f6f6f6] p-6 text-[#080b0f]">
                <p className="font-display text-lg font-semibold text-[#080b0f]">
                  {active.feature?.title ?? 'Plan your next move'}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#606060]">
                  {active.feature?.body ?? 'Every calculator is free to use, with no sign-up.'}
                </p>
                <Link href={active.feature?.href ?? active.href} className="homy-btn mt-5 !h-10 !text-[13px]">
                  <span>{active.feature?.cta ?? `All ${active.label.toLowerCase()}`}</span>
                  <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
                    <span className="homy-btn__arrow-track">
                      <ArrowRight size={13} strokeWidth={2.2} />
                      <ArrowRight size={13} strokeWidth={2.2} />
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence initial={false}>
        {mobile && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: reduce ? 0 : 0.24 }}
            className="overflow-hidden border-t border-[#ececec] bg-white text-[#080b0f] shadow-xl min-[1200px]:hidden"
          >
            <nav aria-label="Mobile" className="wrap max-h-[calc(100dvh-70px)] overflow-y-auto pb-8 pt-2">
              <Link
                href="/"
                aria-current={isNavActive(path, 'Home') ? 'page' : undefined}
                className={`flex items-center justify-between border-b border-[#efefef] py-4 text-sm font-semibold uppercase tracking-[0.08em] ${
                  isNavActive(path, 'Home') ? 'text-[#0e6954]' : 'text-[#080b0f]'
                }`}
              >
                Home
              </Link>
              {NAV.map((n) => (
                <details key={n.label} className="group border-b border-[#efefef]">
                  <summary
                    className={`flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold uppercase tracking-[0.08em] ${
                      isNavActive(path, n.label) ? 'text-[#0e6954]' : 'text-[#080b0f]'
                    }`}
                  >
                    {n.label}
                    <ChevronDown size={18} className="text-[#4b5b63] transition group-open:rotate-180" />
                  </summary>
                  <ul className="space-y-3 pb-4">
                    {n.cols?.flatMap((c) => c.links).map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          aria-current={path === l.href ? 'page' : undefined}
                          className="block text-[15px] text-[#4b5b63] transition hover:text-[#080b0f]"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
              <div className="mt-6 grid gap-3">
                <Link href="/contact" className="homy-btn w-full justify-between">
                  <span>Contact us</span>
                  <span className="homy-btn__disc" aria-hidden="true">
                    <span className="homy-btn__arrow-track">
                      <ArrowRight size={14} strokeWidth={2.2} />
                      <ArrowRight size={14} strokeWidth={2.2} />
                    </span>
                  </span>
                </Link>
                <Link href="/ar" className="homy-btn homy-btn--outline w-full" lang="ar">
                  العربية
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <span className="bw-scroll-rail" aria-hidden="true" />
    </header>
  );
}
