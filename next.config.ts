import type { NextConfig } from "next";

const ContentSecurityPolicy = `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.com;
              style-src 'self' 'unsafe-inline' https:;
              img-src 'self' data: https://*.clerk.com  https://picsum.photos https://images.unsplash.com https://res.cloudinary.com ;
              font-src 'self' https: data:;
              connect-src 'self' https://*.clerk.com;
              frame-ancestors 'none';
            `.replace(/\n/g, "");

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "img.clerk.com",
      "picsum.photos",
      "images.unsplash.com",
      "res.cloudinary.com",
    ], //for next/image optimization
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy,
            //iframes none / api calls: https only / fonts: my site or https only / images: my site or https / js: my site + https / css: my site + inline style
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
