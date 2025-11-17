import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,

  // 🔑 Conditional Base Path: Only apply the path when building for production/export.
  basePath: process.env.NODE_ENV === 'production' ? '/Portfolio1' : '', 
  
  // Optional/Recommended settings
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
