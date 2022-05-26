const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  swcMinify: true,
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['images.ctfassets.net', 'api.mapbox.com', 'i.scdn.co'],
  },
});
