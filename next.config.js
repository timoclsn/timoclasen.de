const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
    images: {
        domains: ['images.ctfassets.net']
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            require('./scripts/generate-sitemap');
        }

        return config;
    }
});
