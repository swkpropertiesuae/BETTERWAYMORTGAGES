'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import {
  DEFAULT_FX_RATES,
  I18N,
  LOCALES,
  convertFromAed,
  formatCompactFromAed,
  formatMoneyFromAed,
  type CurrencyCode,
  type LocaleCode,
  type SiteCopy,
} from '@/data/i18n';
import { EXT_I18N, SWISS_UI_I18N, type ExtendedUiCopy, type SwissUiCopy } from '@/data/i18n-extended';
import { trackEvent } from '@/lib/analytics';

type LocaleCurrencyValue = {
  locale: LocaleCode;
  dir: 'ltr' | 'rtl';
  setLocale: (next: LocaleCode) => void;
  t: SiteCopy;
  ext: ExtendedUiCopy;
  swiss: SwissUiCopy;
  currency: CurrencyCode;
  setCurrency: (next: CurrencyCode) => void;
  fxRates: Record<CurrencyCode, number>;
  fxLive: boolean;
  fxAsOf: string;
  convertAed: (aed: number) => number;
  formatMoney: (aed: number) => string;
  formatCompact: (aed: number) => string;
};

const LocaleCurrencyContext = createContext<LocaleCurrencyValue | null>(null);

const LOCALE_KEY = 'bw_locale_v1';
const CURRENCY_KEY = 'bw_currency_v1';

const VALID_LOCALES = new Set<LocaleCode>(['en', 'ar', 'ru', 'zh', 'fr', 'es']);
const VALID_CURRENCIES = new Set<CurrencyCode>(['AED', 'USD', 'GBP', 'EUR', 'SAR', 'RUB', 'CNY', 'INR']);

function localeFromPath(pathname: string | null): LocaleCode | null {
  if (!pathname) return null;
  const seg = pathname.split('/')[1] as LocaleCode | undefined;
  if (seg && VALID_LOCALES.has(seg) && seg !== 'en') return seg;
  return null;
}

export function LocaleCurrencyProvider({
  children,
  initialLocale = 'en',
}: {
  children: ReactNode;
  initialLocale?: LocaleCode;
}) {
  const pathname = usePathname();
  const routeLocale = localeFromPath(pathname);

  const [locale, setLocaleState] = useState<LocaleCode>(routeLocale ?? initialLocale);
  const [currency, setCurrencyState] = useState<CurrencyCode>('AED');
  const [fxRates, setFxRates] = useState<Record<CurrencyCode, number>>(DEFAULT_FX_RATES);
  const [fxLive, setFxLive] = useState(false);
  const [fxAsOf, setFxAsOf] = useState('2026-11-26');

  // Hydrate saved preference & route/query override cleanly on client
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const qLang = params.get('lang') as LocaleCode | null;
      const qCur = params.get('currency')?.toUpperCase() as CurrencyCode | null;

      if (routeLocale) {
        setLocaleState(routeLocale);
      } else if (qLang && VALID_LOCALES.has(qLang)) {
        setLocaleState(qLang);
        window.localStorage.setItem(LOCALE_KEY, qLang);
      } else {
        const savedLang = window.localStorage.getItem(LOCALE_KEY) as LocaleCode | null;
        if (savedLang && VALID_LOCALES.has(savedLang)) {
          setLocaleState(savedLang);
        }
      }

      if (qCur && VALID_CURRENCIES.has(qCur)) {
        setCurrencyState(qCur);
        window.localStorage.setItem(CURRENCY_KEY, qCur);
      } else {
        const savedCur = window.localStorage.getItem(CURRENCY_KEY) as CurrencyCode | null;
        if (savedCur && VALID_CURRENCIES.has(savedCur)) {
          setCurrencyState(savedCur);
        } else if (routeLocale) {
          const meta = LOCALES.find((l) => l.code === routeLocale);
          if (meta) setCurrencyState(meta.defaultCurrency);
        }
      }
    } catch {}
  }, [routeLocale]);

  // Sync HTML lang + RTL/LTR dir attribute seamlessly across entire website
  useEffect(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  // Fetch live FX rates from our cached /api/market/fx route
  useEffect(() => {
    let active = true;
    fetch('/api/market/fx')
      .then((r) => (r.ok ? r.json() : null))
      .then((payload: { rates?: Record<CurrencyCode, number>; live?: boolean; asOf?: string } | null) => {
        if (!active || !payload?.rates) return;
        setFxRates({ ...DEFAULT_FX_RATES, ...payload.rates });
        setFxLive(Boolean(payload.live));
        if (payload.asOf) setFxAsOf(payload.asOf);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const setLocale = useCallback((next: LocaleCode) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_KEY, next);
    } catch {}
    trackEvent('locale_change', { locale: next });
  }, []);

  const setCurrency = useCallback((next: CurrencyCode) => {
    setCurrencyState(next);
    try {
      window.localStorage.setItem(CURRENCY_KEY, next);
    } catch {}
    trackEvent('currency_change', { currency: next });
  }, []);

  const value = useMemo<LocaleCurrencyValue>(
    () => ({
      locale,
      dir: locale === 'ar' ? 'rtl' : 'ltr',
      setLocale,
      t: I18N[locale] ?? I18N.en,
      ext: EXT_I18N[locale] ?? EXT_I18N.en,
      swiss: SWISS_UI_I18N[locale] ?? SWISS_UI_I18N.en,
      currency,
      setCurrency,
      fxRates,
      fxLive,
      fxAsOf,
      convertAed: (aed) => convertFromAed(aed, currency, fxRates),
      formatMoney: (aed) => formatMoneyFromAed(aed, currency, fxRates),
      formatCompact: (aed) => formatCompactFromAed(aed, currency, fxRates),
    }),
    [locale, setLocale, currency, setCurrency, fxRates, fxLive, fxAsOf],
  );

  return <LocaleCurrencyContext.Provider value={value}>{children}</LocaleCurrencyContext.Provider>;
}

const FALLBACK_CTX: LocaleCurrencyValue = {
  locale: 'en',
  dir: 'ltr',
  setLocale: () => {},
  t: I18N.en,
  ext: EXT_I18N.en,
  swiss: SWISS_UI_I18N.en,
  currency: 'AED',
  setCurrency: () => {},
  fxRates: DEFAULT_FX_RATES,
  fxLive: false,
  fxAsOf: '2026-11-26',
  convertAed: (aed) => aed,
  formatMoney: (aed) => formatMoneyFromAed(aed, 'AED', DEFAULT_FX_RATES),
  formatCompact: (aed) => formatCompactFromAed(aed, 'AED', DEFAULT_FX_RATES),
};

export function useLocaleCurrency(): LocaleCurrencyValue {
  return useContext(LocaleCurrencyContext) ?? FALLBACK_CTX;
}
