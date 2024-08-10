/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "http",
  //       hostname: "localhost",
  //       pathname: "/images/**",
  //       port: "3002",
  //     },
  //   ],
  // },
  // experimental: { appDir: true },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.cdc$/,
      loader: "raw-loader",
    });

    config.watchOptions = {
      ...config.watchOptions,
      poll: 800, // Check for changes every second
      aggregateTimeout: 300, // delay before rebuilding
    };

    return config;
  },
};

module.exports = nextConfig;
