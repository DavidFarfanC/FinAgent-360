/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; connect-src *; img-src * data:; style-src 'self' 'unsafe-inline' *; font-src * data:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
