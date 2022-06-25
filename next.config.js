const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const config = {
  swcMinify: true,
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
    scrollRestoration: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['images.ctfassets.net', 'api.mapbox.com', 'i.scdn.co'],
  },
};

module.exports = withBundleAnalyzer(config);
