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
        source: "/stonks.js",
        destination: "https://assets.onedollarstats.com/stonks.js",
      },
    ];
  },
};

module.exports = config;
