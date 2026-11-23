/** Marketing & statutory UAE mortgage platform with live CBUAE EIBOR feed and Betterway OS lead intake proxy. */
export default {
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  trailingSlash: false,
  images: { unoptimized: true },
  async headers() {
    const prodHeaders =
      process.env.NODE_ENV === 'development'
        ? []
        : [
            { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
            { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          ];
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          ...prodHeaders,
        ],
      },
    ];
  },
};
