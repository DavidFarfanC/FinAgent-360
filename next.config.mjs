/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.my.site.com *.salesforce.com *.salesforce-scrt.com",
      "frame-src 'self' *.my.site.com *.salesforce.com *.force.com *.salesforce-scrt.com",
      "frame-ancestors 'self' *.my.site.com *.salesforce.com",
      "connect-src 'self' *.my.site.com *.salesforce.com *.salesforce-scrt.com",
      "style-src 'self' 'unsafe-inline' *.my.site.com *.salesforce.com",
      "img-src 'self' data: *.my.site.com *.salesforce.com *.force.com",
      "font-src 'self' data: *.my.site.com *.salesforce.com",
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'unsafe-none',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
