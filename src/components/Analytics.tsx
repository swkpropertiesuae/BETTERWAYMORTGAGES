'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { GA4_ID, GTM_ID, trackEvent } from '@/lib/analytics';

/**
 * Production Google Analytics 4 (GA4) + Google Tag Manager (GTM) + Smart Browser Tab Polisher.
 * - Loads non-blocking `afterInteractive` so LCP & Core Web Vitals stay unaffected.
 * - Tracks client-side route transitions automatically as GA4 `page_view` events.
 * - Gently restores the tab title when returning to the Betterway tab without annoying flashing.
 */
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    trackEvent('page_view', {
      page_path: pathname,
      page_location: typeof window !== 'undefined' ? window.location.href : pathname,
      page_title: typeof document !== 'undefined' ? document.title : 'Betterway Mortgages',
    });
  }, [pathname]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    let savedTitle = document.title;
    const onVisibility = () => {
      if (document.hidden) {
        savedTitle = document.title;
        if (!savedTitle.includes('Compare 24 UAE Banks')) {
          document.title = 'Compare 24 UAE Banks · Betterway Mortgages';
        }
      } else if (savedTitle) {
        document.title = savedTitle;
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [pathname]);

  return (
    <>
      {/* Google Tag Manager (GTM) */}
      <Script id="bw-gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      {/* Google Analytics 4 (GA4) */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
      <Script id="bw-ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA4_ID}',{send_page_view:false,anonymize_ip:true});`}
      </Script>
    </>
  );
}
