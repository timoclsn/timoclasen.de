/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 2678400,
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "api.mapbox.com",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    ppr: true,
    reactCompiler: true,
  },
  async rewrites() {
    return [
      {
        source: "/ods/script",
        destination: "https://assets.onedollarstats.com/stonks.js",
      },
      {
        source: "/ods/events",
        destination: "https://collector.onedollarstats.com/events",
      },
    ];
  },
};

module.exports = config;
