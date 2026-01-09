import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["img.clerk.com"], // ← whitelist Clerk images
  },
};

export default nextConfig;
