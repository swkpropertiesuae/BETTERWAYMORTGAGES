/** Institutional UAE mortgage advisory platform with live CBUAE EIBOR feed, Betterway OS lead intake proxy, and hardened security headers. */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://betterwayos.vercel.app",
  "media-src 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self' https://betterwayos.vercel.app",
].join('; ');

export default {
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  trailingSlash: false,
  poweredByHeader: false,
  images: { unoptimized: true },
  async headers() {
    const prodHeaders =
      process.env.NODE_ENV === 'development'
        ? []
        : [
            { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
            { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
            { key: 'Content-Security-Policy', value: CSP },
          ];
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          ...prodHeaders,
        ],
      },
    ];
  },
};
