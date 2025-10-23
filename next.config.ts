import type { NextConfig } from "next";

const NextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default NextConfig;