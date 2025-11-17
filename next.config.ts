import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,

  basePath: "/Portfolio",

  
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  
};

export default nextConfig;
