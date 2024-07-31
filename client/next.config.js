/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // experimental: { appDir: true },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.cdc$/,
      loader: "raw-loader",
    });

    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // delay before rebuilding
    };

    return config;
  },
};

module.exports = nextConfig;
