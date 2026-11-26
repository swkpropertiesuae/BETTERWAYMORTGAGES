'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, ChevronDown, Coins, Globe, Lock, Menu, X } from 'lucide-react';
import { AlertCenter } from '@/components/StartupExperience';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { EASE_SWISS, SPRING_INSTITUTIONAL } from '@/components/ui/MotionPrimitives';
import { CURRENCIES, LOCALES } from '@/data/i18n';
import { NAV } from '@/data/nav';
import { isNavActive } from '@/lib/nav-active';

const NAV_LOCALE_KEY: Record<string, 'buyers' | 'agents' | 'resources'> = {
  'For Buyers': 'buyers',
  'For Agents': 'agents',
  Resources: 'resources',
};

/**
 * Swiss / DIFC Institutional Sticky Header (80px desktop / 68px mobile, 1320px rail):
 * - Optical adaptation: transparent + dark-surface 4K logo over Midnight Navy Home Hero,
 *   frosted Pure White + light-surface 4K logo on scroll or any inner page.
 * - Single-winner active indicator bar (layoutId="bw-nav-active-bar") with zero duplicate collisions.
 * - Compact 4-control utility cluster: AlertCenter, 6-Language + 8-Currency selector, Client Portal, Contact us.
 */
export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname() || '/';
  const reduce = useReducedMotion();
  const { locale, setLocale, currency, setCurrency, fxRates, t } = useLocaleCurrency();

  const isHome = path === '/' || path === '/ru' || path === '/zh' || path === '/fr' || path === '/es';
  const isFlow = path === '/get-started';
  const [scrolled, setScrolled] = useState(!isHome);

  const activeLocaleMeta = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  // Single-winner active bar key prevents duplicate Framer Motion layoutId mounts on routes like /about-us
  const activeBarKey = (() => {
    if (isNavActive(path, 'Home')) return 'Home';
    if (isNavActive(path, 'About Us')) return 'About Us';
    for (const item of NAV) {
      if (isNavActive(path, item.label)) return item.label;
    }
    return null;
  })();

  const indicatorKey = hoveredNav ?? open ?? activeBarKey;

  useEffect(() => {
    setOpen(null);
    setLangMenuOpen(false);
    setMobile(false);
    const sync = () => setScrolled(!isHome || window.scrollY > 24);
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync, { passive: true });
    return () => {
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [path, isHome]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(null);
        setLangMenuOpen(false);
      }
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null);
        setLangMenuOpen(false);
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

  // Distraction-free executive funnel header on /get-started
  if (isFlow) {
    return (
      <header ref={ref} className="bw-header" data-over-hero="false" data-scrolled="true">
        <div className="wrap bw-header__bar">
          <Link href="/" aria-label="Betterway Mortgages home" className="bw-header__logo shrink-0">
            <img
              src="/brand/logo-horizontal-light.png"
              alt="Betterway Mortgages"
              width={1400}
              height={459}
              fetchPriority="high"
            />
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrency(currency === 'AED' ? 'USD' : currency === 'USD' ? 'GBP' : 'AED')}
              aria-label="Toggle display currency"
              className="holo-icon-btn"
            >
              <Coins size={15} />
              <span className="num text-xs font-bold">{currency}</span>
            </button>
            <Link href="/" className="holo-login-btn">
              <span>{t.nav.exit}</span>
              <X size={14} />
            </Link>
          </div>
        </div>
      </header>
    );
  }

  const active = NAV.find((n) => n.label === open);
  const isSolidHeader = scrolled || mobile || Boolean(open);
  const overDarkHero = isHome && !isSolidHeader;

  return (
    <header
      ref={ref}
      className={`bw-header ${mobile ? '!z-[52]' : ''}`}
      data-over-hero={isHome ? 'true' : 'false'}
      data-scrolled={isSolidHeader ? 'true' : 'false'}
    >
      <div className="wrap bw-header__bar">
        {/* Left: Official 4K Transparent Betterway Mortgages Wordmark */}
        <Link
          href="/"
          aria-label="Betterway Mortgages home"
          aria-current={isNavActive(path, 'Home') ? 'page' : undefined}
          className="bw-header__logo shrink-0"
        >
          <img
            src="/brand/logo-horizontal-dark.png"
            alt="Betterway Mortgages"
            width={1400}
            height={459}
            fetchPriority="high"
            className="bw-logo-over-hero"
          />
          <img
            src="/brand/logo-horizontal-light.png"
            alt="Betterway Mortgages"
            width={1400}
            height={459}
            fetchPriority="high"
            className="bw-logo-on-light"
          />
        </Link>

        {/* Center: 5 Canonical Institutional Nav Items */}
        <nav
          aria-label="Main"
          className="bw-nav"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {[
            { key: 'Home', label: t.nav.home, href: '/' },
            { key: 'About Us', label: t.nav.about, href: '/about-us' },
          ].map((item) => {
            const isActive = isNavActive(path, item.key);
            const showBar = indicatorKey === item.key;
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                data-active={isActive || undefined}
                onMouseEnter={() => {
                  setHoveredNav(item.key);
                  if (open) setOpen(null);
                  if (langMenuOpen) setLangMenuOpen(false);
                }}
                className="relative"
              >
                <span>{item.label}</span>
                {showBar && (
                  <motion.span
                    layoutId="bw-nav-active-bar"
                    transition={reduce ? { duration: 0 } : SPRING_INSTITUTIONAL}
                    className={`pointer-events-none absolute inset-x-3 bottom-1 h-[2px] rounded-full ${
                      overDarkHero ? 'bg-[#d7b158]' : 'bg-[#0e6954]'
                    }`}
                  />
                )}
              </Link>
            );
          })}

          {NAV.map((n) => {
            const locKey = NAV_LOCALE_KEY[n.label];
            const displayLabel = locKey ? t.nav[locKey] : n.label;
            const isActive = activeBarKey === n.label;
            const isExpanded = open === n.label;
            const showBar = indicatorKey === n.label;
            return (
              <button
                key={n.label}
                type="button"
                aria-expanded={isExpanded}
                data-active={isActive || undefined}
                onClick={() => {
                  setLangMenuOpen(false);
                  setOpen((c) => (c === n.label ? null : n.label));
                }}
                onMouseEnter={() => {
                  setHoveredNav(n.label);
                  if (open) setOpen(n.label);
                }}
                className="relative"
              >
                <span>{displayLabel}</span>
                <ChevronDown
                  size={13}
                  className={`opacity-65 transition-transform duration-200 ${isExpanded ? 'rotate-180 opacity-100' : ''}`}
                />
                {showBar && (
                  <motion.span
                    layoutId="bw-nav-active-bar"
                    transition={reduce ? { duration: 0 } : SPRING_INSTITUTIONAL}
                    className={`pointer-events-none absolute inset-x-3 bottom-1 h-[2px] rounded-full ${
                      overDarkHero ? 'bg-[#d7b158]' : 'bg-[#0e6954]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Locked 4-Control Swiss Utility Cluster */}
        <div className="relative flex shrink-0 items-center gap-2">
          <span className="hidden sm:inline-flex">
            <AlertCenter />
          </span>

          {/* Unified 6-Language + 8-Live-Currency Selector */}
          <div className="relative">
            <button
              type="button"
              aria-label="Select language and currency"
              aria-expanded={langMenuOpen}
              onClick={() => {
                setOpen(null);
                setLangMenuOpen((v) => !v);
              }}
              className="holo-icon-btn"
            >
              <Globe size={14} />
              <span className="text-[11.5px] font-bold tracking-wide">{activeLocaleMeta.short}</span>
              <span className="h-3 w-px bg-current opacity-25" aria-hidden="true" />
              <span className="num text-[11.5px] font-bold">{currency}</span>
              <ChevronDown
                size={11}
                className={`opacity-65 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: EASE_SWISS }}
                  className="absolute end-0 top-[calc(100%+10px)] z-50 w-[320px] rounded-[18px] border border-[#e3e7ee] bg-white p-4 text-[#070e1a] shadow-[0_28px_64px_-22px_rgba(7,14,26,0.3)]"
                >
                  <div>
                    <p className="mb-2 flex items-center justify-between text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#4a5568]">
                      <span>Language · 6 Editions</span>
                      <span className="text-[#0e6954]">{activeLocaleMeta.nativeLabel}</span>
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {LOCALES.map((loc) => {
                        const isSelected = loc.code === locale;
                        return (
                          <button
                            key={loc.code}
                            type="button"
                            onClick={() => {
                              setLocale(loc.code);
                              setLangMenuOpen(false);
                            }}
                            className={`flex items-center justify-between rounded-[10px] border px-3 py-2 text-left text-xs font-semibold transition cursor-pointer ${
                              isSelected
                                ? 'border-[#070e1a] bg-[#070e1a] text-white'
                                : 'border-[#e3e7ee] bg-[#f7f8fa] text-[#070e1a] hover:border-[#070e1a]/40 hover:bg-white'
                            }`}
                          >
                            <span lang={loc.code}>{loc.nativeLabel}</span>
                            {isSelected ? (
                              <Check size={13} className="text-[#34dfac]" />
                            ) : (
                              <span className="text-[10px] opacity-55">{loc.short}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 border-t border-[#e3e7ee] pt-3.5">
                    <p className="mb-2 flex items-center justify-between text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#4a5568]">
                      <span>Live Display Currency</span>
                      <span className="num text-[#0e6954]">
                        1 AED ≈ {(fxRates[currency] ?? 1).toFixed(currency === 'AED' ? 0 : 2)} {currency}
                      </span>
                    </p>
                    <div className="grid grid-cols-4 gap-1.5">
                      {CURRENCIES.map((cur) => {
                        const activeCur = cur.code === currency;
                        return (
                          <button
                            key={cur.code}
                            type="button"
                            onClick={() => {
                              setCurrency(cur.code);
                              setLangMenuOpen(false);
                            }}
                            title={cur.name}
                            className={`flex flex-col items-center rounded-[9px] border py-1.5 text-xs font-bold transition cursor-pointer ${
                              activeCur
                                ? 'border-[#0e6954] bg-[#edf7f4] text-[#0e6954]'
                                : 'border-[#e3e7ee] bg-white text-[#070e1a] hover:border-[#070e1a]'
                            }`}
                          >
                            <span className="num">{cur.code}</span>
                            <span className="text-[10px] font-medium opacity-65">{cur.symbol}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-[#e3e7ee] pt-3 text-[11px] font-semibold text-[#4a5568]">
                    <span>Direct editions:</span>
                    <div className="flex flex-wrap gap-2">
                      {LOCALES.filter((l) => l.code !== 'en').map((loc) => (
                        <Link
                          key={loc.href}
                          href={loc.href}
                          lang={loc.code}
                          onClick={() => {
                            setLocale(loc.code);
                            setLangMenuOpen(false);
                          }}
                          className="text-[#0e6954] hover:underline"
                        >
                          {loc.short}
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/portal/login" className="holo-login-btn hidden min-[1200px]:inline-flex">
            <Lock size={13} />
            <span>{t.nav.login}</span>
          </Link>

          <Link
            href="/contact"
            aria-label="Contact us"
            className={`hidden min-[1200px]:inline-flex ${
              overDarkHero ? 'homy-btn homy-btn--white bw-btn--sm' : 'homy-btn bw-btn--sm'
            }`}
          >
            <span>{t.nav.contact}</span>
            <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
              <span className="homy-btn__arrow-track">
                <ArrowRight size={13} strokeWidth={2.2} />
                <ArrowRight size={13} strokeWidth={2.2} />
              </span>
            </span>
          </Link>

          <button
            type="button"
            className="holo-icon-btn min-[1200px]:hidden"
            aria-label={mobile ? 'Close menu' : 'Open menu'}
            aria-expanded={mobile}
            onClick={() => setMobile((m) => !m)}
          >
            {mobile ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Desktop Swiss Architectural Mega-Menu */}
      <AnimatePresence initial={false}>
        {active?.cols && (
          <motion.div
            key={active.label}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: EASE_SWISS }}
            className="hidden overflow-hidden min-[1200px]:block"
          >
            <div className="wrap pb-5 pt-2">
              <div
                className={`grid gap-8 rounded-[18px] border border-[#e3e7ee] bg-white p-7 text-[#070e1a] shadow-[0_28px_64px_-24px_rgba(7,14,26,0.22)] ${
                  active.cols.length === 2 ? 'grid-cols-[1fr_1fr_300px]' : 'grid-cols-[1fr_1fr_1fr_280px]'
                }`}
              >
                {active.cols.map((c, ci) => (
                  <div key={ci}>
                    <p className="mb-3.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#0e6954]">
                      {c.title.trim()}
                    </p>
                    <ul className="space-y-1.5">
                      {c.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            aria-current={path === l.href ? 'page' : undefined}
                            onClick={() => setOpen(null)}
                            className="group -mx-2.5 flex items-baseline justify-between gap-3 rounded-[9px] px-2.5 py-1.5 text-[13.5px] font-medium text-[#070e1a] transition hover:bg-[#f7f8fa] hover:text-[#0e6954]"
                          >
                            <span>{l.label}</span>
                            {l.desc && <span className="shrink-0 text-[11px] text-[#4a5568]">{l.desc}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="bw-fintech-stage !rounded-[16px] !p-6 flex flex-col justify-between text-white">
                  <div className="relative z-10">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#d7b158]">
                      Betterway Advisory Desk
                    </span>
                    <p className="mt-3 font-display text-lg font-semibold leading-snug text-white">
                      {active.feature?.title ?? 'Plan your next move'}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-white/70">
                      {active.feature?.body ?? 'Structured UAE mortgage comparisons across 24 licensed banks.'}
                    </p>
                  </div>
                  <Link
                    href={active.feature?.href ?? active.href}
                    className="homy-btn homy-btn--white bw-btn--sm relative z-10 mt-5 w-full justify-between"
                  >
                    <span>{active.feature?.cta ?? `Explore ${active.label}`}</span>
                    <span className="homy-btn__disc !h-6 !w-6" aria-hidden="true">
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
            transition={{ duration: reduce ? 0 : 0.22, ease: EASE_SWISS }}
            className="overflow-hidden border-t border-[#e3e7ee] bg-white text-[#070e1a] shadow-2xl min-[1200px]:hidden"
          >
            <nav aria-label="Mobile" className="wrap max-h-[calc(100dvh-70px)] overflow-y-auto pb-8 pt-2">
              <Link
                href="/"
                aria-current={isNavActive(path, 'Home') ? 'page' : undefined}
                onClick={() => setMobile(false)}
                className={`flex items-center justify-between border-b border-[#e3e7ee] py-3.5 text-[15px] font-semibold ${
                  isNavActive(path, 'Home') ? 'text-[#0e6954]' : 'text-[#070e1a]'
                }`}
              >
                {t.nav.home}
              </Link>
              <Link
                href="/about-us"
                aria-current={isNavActive(path, 'About Us') ? 'page' : undefined}
                onClick={() => setMobile(false)}
                className={`flex items-center justify-between border-b border-[#e3e7ee] py-3.5 text-[15px] font-semibold ${
                  isNavActive(path, 'About Us') ? 'text-[#0e6954]' : 'text-[#070e1a]'
                }`}
              >
                {t.nav.about}
              </Link>
              {NAV.map((n) => (
                <details key={n.label} className="group border-b border-[#e3e7ee]">
                  <summary
                    className={`flex cursor-pointer list-none items-center justify-between py-3.5 text-[15px] font-semibold ${
                      isNavActive(path, n.label) ? 'text-[#0e6954]' : 'text-[#070e1a]'
                    }`}
                  >
                    {NAV_LOCALE_KEY[n.label] ? t.nav[NAV_LOCALE_KEY[n.label]] : n.label}
                    <ChevronDown size={17} className="text-[#4a5568] transition group-open:rotate-180" />
                  </summary>
                  <ul className="space-y-2 pb-4">
                    {n.cols?.flatMap((c) => c.links).map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          aria-current={path === l.href ? 'page' : undefined}
                          onClick={() => setMobile(false)}
                          className="block rounded-lg py-1 text-[14px] text-[#4a5568] transition hover:text-[#070e1a]"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}

              <div className="mt-5 space-y-3 rounded-[14px] border border-[#e3e7ee] bg-[#f7f8fa] p-4">
                <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#4a5568]">
                  Language
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {LOCALES.map((loc) => (
                    <button
                      key={loc.code}
                      type="button"
                      onClick={() => setLocale(loc.code)}
                      className={`rounded-[9px] border px-2.5 py-2 text-xs font-semibold cursor-pointer ${
                        loc.code === locale
                          ? 'border-[#070e1a] bg-[#070e1a] text-white'
                          : 'border-[#e3e7ee] bg-white text-[#070e1a]'
                      }`}
                    >
                      {loc.nativeLabel}
                    </button>
                  ))}
                </div>
                <p className="pt-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#4a5568]">
                  Currency
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {CURRENCIES.map((cur) => (
                    <button
                      key={cur.code}
                      type="button"
                      onClick={() => setCurrency(cur.code)}
                      className={`num rounded-[9px] border py-1.5 text-xs font-bold cursor-pointer ${
                        cur.code === currency
                          ? 'border-[#0e6954] bg-[#edf7f4] text-[#0e6954]'
                          : 'border-[#e3e7ee] bg-white text-[#070e1a]'
                      }`}
                    >
                      {cur.code}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-2.5">
                <Link href="/get-started" onClick={() => setMobile(false)} className="homy-btn w-full justify-between">
                  <span>{t.nav.startCheck}</span>
                  <span className="homy-btn__disc" aria-hidden="true">
                    <span className="homy-btn__arrow-track">
                      <ArrowRight size={14} strokeWidth={2.2} />
                      <ArrowRight size={14} strokeWidth={2.2} />
                    </span>
                  </span>
                </Link>
                <div className="grid grid-cols-2 gap-2.5">
                  <Link href="/portal/login" onClick={() => setMobile(false)} className="homy-btn homy-btn--outline w-full">
                    {t.nav.login}
                  </Link>
                  <Link href="/contact" onClick={() => setMobile(false)} className="homy-btn homy-btn--outline w-full">
                    {t.nav.contact}
                  </Link>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
