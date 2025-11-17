import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,

  // basePath: process.env.NODE_ENV === 'production' ? '/Portfolio1' : '', 

  basePath: "/Portfolio",

  
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  
};

export default nextConfig;
