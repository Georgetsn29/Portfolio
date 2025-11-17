import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // <=== Enables static exports
  reactStrictMode: true,

  // Optional: Change links `/me` -> `/me/` and match GitHub Pages paths
  trailingSlash: true,
  
  // Optional: Prevent image optimization errors
  images: {
    unoptimized: true,
  },

  // IMPORTANT: Replace 'your-repo-name' with your actual repository name
  // If you are deploying to username.github.io (root), remove this line entirely.
  basePath: "/Portfolio",
};

export default nextConfig;
