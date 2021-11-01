const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['images.ctfassets.net', 'api.mapbox.com', 'i.scdn.co'],
  },
});
