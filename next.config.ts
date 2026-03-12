import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "img.clerk.com",
      "picsum.photos",
      "images.unsplash.com",
      "res.cloudinary.com",
    ], // ← whitelist Clerk images
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
              style-src 'self' 'unsafe-inline' https:;
              img-src 'self' data: https:;
              font-src 'self' https: data:;
              connect-src 'self' https:;
              frame-ancestors 'none';
            `.replace(/\n/g, ""),
            //iframes none / api calls: https only / fonsts: my site or https only / images: my site or https / js: my site + https / css: my site + inline style
          },
        ],
      },
    ];
  },
};

export default nextConfig;
