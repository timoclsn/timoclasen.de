const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
    images: {
        domains: ['images.ctfassets.net', 'api.mapbox.com']
    },
    future: {
        webpack5: true,
        strictPostcssConfiguration: true
    },
    webpack: (config, { dev, isServer }) => {
        if (isServer) {
            require('./scripts/generate-sitemap');
            require('./scripts/generate-rss');
        }

        return config;
    },
    async rewrites() {
        return [
            {
                source: '/bee.js',
                destination: 'https://cdn.splitbee.io/sb.js'
            },
            {
                source: '/_hive/:slug',
                destination: 'https://hive.splitbee.io/:slug'
            }
        ];
    }
});
