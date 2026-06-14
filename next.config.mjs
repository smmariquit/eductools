import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['next.tsx', 'next.ts', 'next.jsx', 'next.js'],
  // Since we are progressively migrating from Vite, we can ignore typescript errors during the Next.js build
  // as the vite-specific types (e.g. import.meta.glob) might confuse Next's TS checker.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default withNextIntl(nextConfig);
