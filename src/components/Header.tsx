'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, ChevronDown, Coins, Globe, Lock, Menu, X } from 'lucide-react';
import { AlertCenter } from '@/components/StartupExperience';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { CURRENCIES, LOCALES } from '@/data/i18n';
import { NAV } from '@/data/nav';
import { isNavActive } from '@/lib/nav-active';

const NAV_LOCALE_KEY: Record<string, 'buyers' | 'agents' | 'resources'> = {
  'For Buyers': 'buyers',
  'For Agents': 'agents',
  Resources: 'resources',
};

/**
 * 21st.dev Corporate Fintech Floating Navigation Bar:
 * - Animated spring hover-pill navigation (layoutId)
 * - Centered-MORTGAGES vibrant corporate logo with light/dark optical swap
 * - Unified 6-language + 8-live-currency fintech switcher
 * - Frosted glass over sunlit hero -> luminous frosted fintech dock over global Pipo gradient
 */
export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const reduce = useReducedMotion();
  const { locale, setLocale, currency, setCurrency, fxRates, t } = useLocaleCurrency();

  const isHome = path === '/' || path === '/ru' || path === '/zh' || path === '/fr' || path === '/es';
  const isFlow = path === '/get-started';
  const [scrolled, setScrolled] = useState(!isHome);

  const activeLocaleMeta = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

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

  // Distraction-free fintech header on /get-started
  if (isFlow) {
    return (
      <header ref={ref} className="bw-header bw-header--minimal" data-over-hero="false" data-scrolled="true">
        <div className="wrap bw-header__bar">
          <Link href="/" aria-label="Betterway Mortgages home" className="bw-header__logo shrink-0">
            <img
              src="/brand/logo-horizontal-light.png"
              alt="Betterway Mortgages"
              width={1400}
              height={419}
              fetchPriority="high"
            />
          </Link>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setCurrency(currency === 'AED' ? 'USD' : currency === 'USD' ? 'GBP' : 'AED')}
              aria-label="Toggle display currency"
              className="holo-icon-btn"
            >
              <Coins size={16} />
              <span className="text-xs font-bold">{currency}</span>
            </button>
            <Link href="/" className="holo-login-btn">
              <span>{t.nav.exit}</span>
              <X size={15} />
            </Link>
          </div>
        </div>
      </header>
    );
  }

  const active = NAV.find((n) => n.label === open);
  const overHeroLightMode = isHome && !scrolled;

  return (
    <header
      ref={ref}
      className="bw-header bw-fintech-header"
      data-over-hero={isHome ? 'true' : 'false'}
      data-scrolled={scrolled ? 'true' : 'false'}
    >
      <div className="wrap bw-header__bar">
        {/* Left: Centered-MORTGAGES High-Vibrancy Corporate Logo */}
        <Link
          href="/"
          aria-label="Betterway Mortgages home"
          aria-current={isNavActive(path, 'Home') ? 'page' : undefined}
          className="bw-header__logo bw-header__logo--blend shrink-0"
        >
          <img
            src="/brand/logo-horizontal-dark.png"
            alt="Betterway Mortgages"
            width={1400}
            height={419}
            fetchPriority="high"
            className="bw-logo-over-hero"
          />
          <img
            src="/brand/logo-horizontal-light.png"
            alt="Betterway Mortgages"
            width={1400}
            height={419}
            fetchPriority="high"
            className="bw-logo-on-light"
          />
        </Link>

        {/* Center: 21st.dev Corporate Fintech Segmented Nav Bar with Spring Sliding Hover Pill */}
        <nav
          aria-label="Main"
          className="bw-nav bw-fintech-nav"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {[
            { key: 'Home', label: t.nav.home, href: '/', isLink: true },
            { key: 'About Us', label: t.nav.about, href: '/about-us', isLink: true },
          ].map((item) => {
            const isActive = isNavActive(path, item.key);
            const showPill = hoveredNav === item.key || (!hoveredNav && isActive);
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
                {showPill && (
                  <motion.span
                    layoutId="bw-fintech-nav-pill"
                    transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 440, damping: 34 }}
                    className={`pointer-events-none absolute inset-x-0 inset-y-1.5 rounded-full ${
                      overHeroLightMode ? 'bg-white/15' : 'bg-[#0a1424]/[0.07]'
                    }`}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}

          {NAV.map((n) => {
            const locKey = NAV_LOCALE_KEY[n.label];
            const displayLabel = locKey ? t.nav[locKey] : n.label;
            const isActive = isNavActive(path, n.label);
            const isExpanded = open === n.label;
            const showPill = hoveredNav === n.label || isExpanded || (!hoveredNav && isActive);
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
                {showPill && (
                  <motion.span
                    layoutId="bw-fintech-nav-pill"
                    transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 440, damping: 34 }}
                    className={`pointer-events-none absolute inset-x-0 inset-y-1.5 rounded-full ${
                      overHeroLightMode ? 'bg-white/15' : 'bg-[#0a1424]/[0.07]'
                    }`}
                  />
                )}
                <span className="relative z-10">{displayLabel}</span>
                <ChevronDown
                  size={13}
                  className={`relative z-10 opacity-70 transition-transform duration-200 ${isExpanded ? 'rotate-180 opacity-100' : ''}`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right: Institutional Fintech Utility Cluster */}
        <div className="relative flex shrink-0 items-center gap-1.5 sm:gap-2">
          <span className="hidden sm:inline-flex">
            <AlertCenter />
          </span>

          {/* Unified Corporate 6-Language + 8-Live-Currency Selector */}
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
              <Globe size={15} />
              <span className="text-xs font-bold tracking-wide">{activeLocaleMeta.short}</span>
              <span className="h-3.5 w-px bg-current opacity-25" aria-hidden="true" />
              <span className="num text-xs font-bold">{currency}</span>
              <ChevronDown
                size={12}
                className={`opacity-70 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute end-0 top-[calc(100%+10px)] z-50 w-[320px] rounded-[22px] border border-[#e2e8f0] bg-white/95 p-4 text-[#0a1424] shadow-[0_32px_72px_-20px_rgba(10,20,36,0.36)] backdrop-blur-xl"
                >
                  <div>
                    <p className="mb-2 flex items-center justify-between text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#64748b]">
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
                            className={`flex items-center justify-between rounded-[11px] border px-3 py-2 text-left text-xs font-semibold transition cursor-pointer ${
                              isSelected
                                ? 'border-[#0a1424] bg-[#0a1424] text-white'
                                : 'border-[#e5e7eb] bg-[#f8fafc] text-[#0a1424] hover:border-[#179373] hover:bg-white'
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

                  <div className="mt-4 border-t border-[#eef0f3] pt-3.5">
                    <p className="mb-2 flex items-center justify-between text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#64748b]">
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
                            className={`flex flex-col items-center rounded-[10px] border py-1.5 text-xs font-bold transition cursor-pointer ${
                              activeCur
                                ? 'border-[#179373] bg-[#eef7f4] text-[#0e6954]'
                                : 'border-[#e5e7eb] bg-white text-[#0a1424] hover:border-[#0a1424]'
                            }`}
                          >
                            <span>{cur.code}</span>
                            <span className="text-[10px] font-medium opacity-65">{cur.symbol}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-[#eef0f3] pt-3 text-[11px] font-semibold text-[#475569]">
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

          <Link href="/portal/login" className="holo-login-btn holo-desktop-only">
            <Lock size={13} />
            <span>{t.nav.login}</span>
          </Link>

          <span className="holo-desktop-only">
            <Link href="/contact" className="homy-btn bw-header-cta" aria-label="Contact us">
              <span>{t.nav.contact}</span>
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
            {mobile ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Desktop Fintech Mega-Menu Dropdown */}
      <AnimatePresence initial={false}>
        {active?.cols && (
          <motion.div
            key={active.label}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="hidden overflow-hidden min-[1200px]:block"
          >
            <div className="wrap pb-5 pt-1">
              <div
                className={`grid gap-8 rounded-[24px] border border-[#e2e8f0] bg-white/95 p-8 text-[#0a1424] shadow-[0_32px_72px_-24px_rgba(10,20,36,0.28)] backdrop-blur-2xl ${
                  active.cols.length === 2 ? 'grid-cols-[1fr_1fr_300px]' : 'grid-cols-[1fr_1fr_1fr_280px]'
                }`}
              >
                {active.cols.map((c, ci) => (
                  <div key={ci}>
                    <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#64748b]">
                      {c.title.trim()}
                    </p>
                    <ul className="space-y-2">
                      {c.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            aria-current={path === l.href ? 'page' : undefined}
                            className="group -mx-2.5 flex items-baseline justify-between gap-3 rounded-[10px] px-2.5 py-1.5 text-[14px] font-medium text-[#0a1424] transition hover:bg-[#f1f5f9] hover:text-[#0e6954]"
                          >
                            <span>{l.label}</span>
                            {l.desc && <span className="shrink-0 text-[11.5px] text-[#64748b]">{l.desc}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="bw-fintech-stage !min-h-0 !rounded-[20px] !p-6 flex flex-col justify-between text-white">
                  <div className="relative z-10">
                    <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f1d57e]">
                      Betterway Fintech Desk
                    </span>
                    <p className="mt-3 font-display text-lg font-bold leading-snug text-white">
                      {active.feature?.title ?? 'Plan your next move'}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-white/75">
                      {active.feature?.body ?? 'Clear UAE mortgage structuring with 1-on-1 human support.'}
                    </p>
                  </div>
                  <Link href={active.feature?.href ?? active.href} className="homy-btn homy-btn--white relative z-10 mt-5 w-full justify-between !h-11 !text-[13px]">
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
            className="overflow-hidden border-t border-[#e5e7eb] bg-white/98 text-[#0a1424] shadow-2xl backdrop-blur-xl min-[1200px]:hidden"
          >
            <nav aria-label="Mobile" className="wrap max-h-[calc(100dvh-76px)] overflow-y-auto pb-8 pt-2">
              <Link
                href="/"
                aria-current={isNavActive(path, 'Home') ? 'page' : undefined}
                className={`flex items-center justify-between border-b border-[#efefef] py-4 text-[15px] font-semibold ${
                  isNavActive(path, 'Home') ? 'text-[#0e6954]' : 'text-[#0a1424]'
                }`}
              >
                {t.nav.home}
              </Link>
              <Link
                href="/about-us"
                aria-current={isNavActive(path, 'About Us') ? 'page' : undefined}
                className={`flex items-center justify-between border-b border-[#efefef] py-4 text-[15px] font-semibold ${
                  isNavActive(path, 'About Us') ? 'text-[#0e6954]' : 'text-[#0a1424]'
                }`}
              >
                {t.nav.about}
              </Link>
              {NAV.map((n) => (
                <details key={n.label} className="group border-b border-[#efefef]">
                  <summary
                    className={`flex cursor-pointer list-none items-center justify-between py-4 text-[15px] font-semibold ${
                      isNavActive(path, n.label) ? 'text-[#0e6954]' : 'text-[#0a1424]'
                    }`}
                  >
                    {NAV_LOCALE_KEY[n.label] ? t.nav[NAV_LOCALE_KEY[n.label]] : n.label}
                    <ChevronDown size={18} className="text-[#6c6c89] transition group-open:rotate-180" />
                  </summary>
                  <ul className="space-y-2.5 pb-4">
                    {n.cols?.flatMap((c) => c.links).map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          aria-current={path === l.href ? 'page' : undefined}
                          className="block rounded-lg py-1 text-[14.5px] text-[#4b5b63] transition hover:text-[#0a1424]"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}

              <div className="mt-5 space-y-3 rounded-[16px] border border-[#e5e7eb] bg-[#f8fafc] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#64748b]">Language</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {LOCALES.map((loc) => (
                    <button
                      key={loc.code}
                      type="button"
                      onClick={() => setLocale(loc.code)}
                      className={`rounded-[10px] border px-2.5 py-2 text-xs font-semibold ${
                        loc.code === locale ? 'border-[#0a1424] bg-[#0a1424] text-white' : 'border-[#e5e7eb] bg-white text-[#0a1424]'
                      }`}
                    >
                      {loc.nativeLabel}
                    </button>
                  ))}
                </div>
                <p className="pt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#64748b]">Currency</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {CURRENCIES.map((cur) => (
                    <button
                      key={cur.code}
                      type="button"
                      onClick={() => setCurrency(cur.code)}
                      className={`rounded-[10px] border py-1.5 text-xs font-bold ${
                        cur.code === currency ? 'border-[#179373] bg-[#eef7f4] text-[#0e6954]' : 'border-[#e5e7eb] bg-white text-[#0a1424]'
                      }`}
                    >
                      {cur.code}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-2.5">
                <Link href="/get-started" className="homy-btn w-full justify-between">
                  <span>{t.nav.startCheck}</span>
                  <span className="homy-btn__disc" aria-hidden="true">
                    <span className="homy-btn__arrow-track">
                      <ArrowRight size={14} strokeWidth={2.2} />
                      <ArrowRight size={14} strokeWidth={2.2} />
                    </span>
                  </span>
                </Link>
                <div className="grid grid-cols-2 gap-2.5">
                  <Link href="/portal/login" className="homy-btn homy-btn--outline w-full">
                    {t.nav.login}
                  </Link>
                  <Link href="/contact" className="homy-btn homy-btn--outline w-full">
                    {t.nav.contact}
                  </Link>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <span className="bw-scroll-rail" aria-hidden="true" />
    </header>
  );
}
