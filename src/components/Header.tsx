'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronDown, Globe, LogIn, Menu, X } from 'lucide-react';
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
  const isFlow = path === '/get-started';

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

  // Distraction-free minimal header on /get-started (exact UseHolo flow UX)
  if (isFlow) {
    return (
      <header ref={ref} className="bw-header bw-header--minimal" data-over-hero="false" data-scrolled="true">
        <div className="wrap bw-header__bar">
          <Link href="/" aria-label="Betterway Mortgages home" className="bw-header__logo shrink-0">
            <img src="/brand/logo-light.svg" alt="Betterway Mortgages" width={1450} height={468} fetchPriority="high" />
          </Link>
          <div className="flex items-center gap-2.5">
            <Link
              href="/ar"
              aria-label="Switch to Arabic"
              className="holo-icon-btn"
              lang="ar"
            >
              <Globe size={18} />
            </Link>
            <Link href="/" className="holo-login-btn">
              <span>Exit</span>
              <X size={15} />
            </Link>
          </div>
        </div>
      </header>
    );
  }

  const active = NAV.find((n) => n.label === open);

  return (
    <header
      ref={ref}
      className="bw-header"
      data-over-hero={isHome ? 'true' : 'false'}
      data-scrolled={isHome ? 'false' : 'true'}
    >
      <div className="wrap bw-header__bar">
        {/* Left: Enlarged Betterway Brand Logo Badge (Holo square/pill presence) */}
        <Link
          href="/"
          aria-label="Betterway Mortgages home"
          aria-current={isNavActive(path, 'Home') ? 'page' : undefined}
          className="bw-header__logo holo-logo-badge shrink-0"
        >
          <img
            src="/brand/logo-light.svg"
            alt="Betterway Mortgages"
            width={1450}
            height={468}
            fetchPriority="high"
          />
        </Link>

        {/* Center: Signature Holo Floating Frosted Nav Pill */}
        <nav aria-label="Main" className="bw-nav holo-nav-pill">
          <Link
            href="/"
            aria-current={isNavActive(path, 'Home') ? 'page' : undefined}
            data-active={isNavActive(path, 'Home') || undefined}
            onMouseEnter={() => open && setOpen(null)}
          >
            Home
          </Link>
          <Link
            href="/about-us"
            aria-current={isNavActive(path, 'About Us') ? 'page' : undefined}
            data-active={isNavActive(path, 'About Us') || undefined}
            onMouseEnter={() => open && setOpen(null)}
          >
            About Us
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
              <span>{n.label}</span>
              <ChevronDown
                size={14}
                className={`opacity-75 transition-transform duration-300 ${open === n.label ? 'rotate-180 opacity-100' : ''}`}
              />
            </button>
          ))}
        </nav>

        {/* Right: Globe Language Switcher, Alerts, Login & Contact us (Holo utility cluster) */}
        <div className="flex items-center gap-2">
          <AlertCenter />
          <Link
            href="/ar"
            aria-label="العربية — Switch to Arabic"
            title="العربية"
            className="holo-icon-btn"
            lang="ar"
          >
            <Globe size={17} />
            <span className="hidden text-xs font-semibold min-[1280px]:inline">العربية</span>
          </Link>
          <Link
            href="/portal/login"
            className="holo-login-btn holo-desktop-only"
          >
            <LogIn size={14} />
            <span>Login</span>
          </Link>
          <span className="holo-desktop-only">
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
            className="holo-icon-btn holo-mobile-only"
            aria-label={mobile ? 'Close menu' : 'Open menu'}
            aria-expanded={mobile}
            onClick={() => setMobile((m) => !m)}
          >
            {mobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Desktop Mega-Menu Dropdown (Crisp Floating 24px Rounded Panel) */}
      <AnimatePresence initial={false}>
        {active?.cols && (
          <motion.div
            key={active.label}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hidden overflow-hidden min-[1200px]:block"
          >
            <div className="wrap pb-5 pt-1">
              <div
                className={`grid gap-8 rounded-[24px] border border-[#e5e7eb] bg-white p-8 text-[#121217] shadow-[0_32px_72px_-24px_rgba(18,18,23,0.28)] ${
                  active.cols.length === 2 ? 'grid-cols-[1fr_1fr_300px]' : 'grid-cols-[1fr_1fr_1fr_280px]'
                }`}
              >
                {active.cols.map((c, ci) => (
                  <div key={ci}>
                    <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6c6c89]">
                      {c.title.trim()}
                    </p>
                    <ul className="space-y-2.5">
                      {c.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            aria-current={path === l.href ? 'page' : undefined}
                            className="group flex items-baseline justify-between gap-3 rounded-[10px] px-2.5 py-1.5 -mx-2.5 text-[14.5px] font-medium text-[#121217] transition hover:bg-[#f5f6f7] hover:text-[#0e6954]"
                          >
                            <span>{l.label}</span>
                            {l.desc && <span className="shrink-0 text-[11.5px] text-[#6c6c89]">{l.desc}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="flex flex-col justify-between rounded-[20px] bg-[#eef7f4] p-6 text-[#121217]">
                  <div>
                    <span className="inline-flex rounded-full bg-white px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#0e6954]">
                      Betterway Ecosystem
                    </span>
                    <p className="mt-3 font-display text-lg font-bold leading-snug text-[#121217]">
                      {active.feature?.title ?? 'Plan your next move'}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#4b5b63]">
                      {active.feature?.body ?? 'Every calculator is free to use, with no sign-up.'}
                    </p>
                  </div>
                  <Link href={active.feature?.href ?? active.href} className="homy-btn mt-5 w-full justify-between !h-11 !text-[13.5px]">
                    <span>{active.feature?.cta ?? `Explore ${active.label}`}</span>
                    <span className="homy-btn__disc !h-7 !w-7" aria-hidden="true">
                      <span className="homy-btn__arrow-track">
                        <ArrowRight size={13} strokeWidth={2.2} />
                        <ArrowRight size={13} strokeWidth={2.2} />
                      </span>
                    </span>
                  </Link>
                </div>
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
            className="overflow-hidden border-t border-[#e5e7eb] bg-white text-[#121217] shadow-2xl min-[1200px]:hidden"
          >
            <nav aria-label="Mobile" className="wrap max-h-[calc(100dvh-76px)] overflow-y-auto pb-8 pt-2">
              <Link
                href="/"
                aria-current={isNavActive(path, 'Home') ? 'page' : undefined}
                className={`flex items-center justify-between border-b border-[#efefef] py-4 text-[15px] font-semibold ${
                  isNavActive(path, 'Home') ? 'text-[#0e6954]' : 'text-[#121217]'
                }`}
              >
                Home
              </Link>
              <Link
                href="/about-us"
                aria-current={isNavActive(path, 'About Us') ? 'page' : undefined}
                className={`flex items-center justify-between border-b border-[#efefef] py-4 text-[15px] font-semibold ${
                  isNavActive(path, 'About Us') ? 'text-[#0e6954]' : 'text-[#121217]'
                }`}
              >
                About Us
              </Link>
              {NAV.map((n) => (
                <details key={n.label} className="group border-b border-[#efefef]">
                  <summary
                    className={`flex cursor-pointer list-none items-center justify-between py-4 text-[15px] font-semibold ${
                      isNavActive(path, n.label) ? 'text-[#0e6954]' : 'text-[#121217]'
                    }`}
                  >
                    {n.label}
                    <ChevronDown size={18} className="text-[#6c6c89] transition group-open:rotate-180" />
                  </summary>
                  <ul className="space-y-2.5 pb-4">
                    {n.cols?.flatMap((c) => c.links).map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          aria-current={path === l.href ? 'page' : undefined}
                          className="block rounded-lg py-1 text-[14.5px] text-[#4b5b63] transition hover:text-[#121217]"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
              <div className="mt-6 grid gap-2.5">
                <Link href="/get-started" className="homy-btn w-full justify-between">
                  <span>Start 60s Pre-Approval Check</span>
                  <span className="homy-btn__disc" aria-hidden="true">
                    <span className="homy-btn__arrow-track">
                      <ArrowRight size={14} strokeWidth={2.2} />
                      <ArrowRight size={14} strokeWidth={2.2} />
                    </span>
                  </span>
                </Link>
                <div className="grid grid-cols-2 gap-2.5">
                  <Link href="/portal/login" className="homy-btn homy-btn--outline w-full">
                    Login
                  </Link>
                  <Link href="/contact" className="homy-btn homy-btn--outline w-full">
                    Contact us
                  </Link>
                </div>
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
