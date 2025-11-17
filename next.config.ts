import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Must be present
  
  // 🔑 THE CRITICAL FIX: Set the base path to your repository name
  basePath: "/Portfolio1", 
  
  // Optional/Recommended settings from previous steps
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
