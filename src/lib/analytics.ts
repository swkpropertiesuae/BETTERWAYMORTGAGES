'use client';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-1FXMV3FTYL';
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-NMJ9MVNG';

/** Fire a structured GA4 + GTM dataLayer conversion/engagement event safely. */
export function trackEvent(eventName: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch {}
}
