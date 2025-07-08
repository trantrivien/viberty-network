import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    domains: ["localhost", "randomuser.me", "example.com"], 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    
    return config;
  },
};

export default nextConfig;
