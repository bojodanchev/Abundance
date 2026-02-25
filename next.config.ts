import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/archive/index.html" },
        { source: "/diagnostic", destination: "/archive/index.html" },
        { source: "/vsl", destination: "/archive/index.html" },
        { source: "/abundance", destination: "/archive/index.html" },
        { source: "/privacy", destination: "/archive/index.html" },
        { source: "/terms", destination: "/archive/index.html" },
      ],
    };
  },
  async redirects() {
    return [
      { source: "/archive", destination: "/", permanent: true },
      { source: "/archive/:path*", destination: "/:path*", permanent: true },
      // Old Next.js app accessible at /new
      { source: "/new", destination: "/bg", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
