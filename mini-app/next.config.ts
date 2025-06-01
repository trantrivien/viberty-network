import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true ,
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
},
};

module.exports = nextConfig;

