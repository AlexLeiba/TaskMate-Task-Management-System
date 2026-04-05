import type { NextConfig } from "next";

const ContentSecurityPolicy = `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.com https://smooth-toucan-0.clerk.accounts.dev https://clerk-telemetry.com/v1/event;
              style-src 'self' 'unsafe-inline' https:;
              img-src 'self' data: https://*.clerk.com https://img.clerk.com  https://picsum.photos https://images.unsplash.com https://res.cloudinary.com ;
              font-src 'self' https: data:;
              connect-src 'self' https://*.clerk.com https://smooth-toucan-0.clerk.accounts.dev  https://clerk-telemetry.com/v1/event;
              frame-ancestors 'none';
                worker-src 'self' blob:;
                object-src 'none';
base-uri 'self';
form-action 'self';
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
            key: "Cache-Control",
            value: "private, max-age=0, s-maxage=60, stale-white-revalidate=30",
            // private - user specific , safe for logged in dashboards
            // max-age=0 - do not cache for long on client
            //s-maxage=60 - allow CDN to cache for 1 minute
            // stale-while-revalidate → fast load even when revalidating
          },
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy,
            //iframes none / api calls: https only / fonts: my site or https only / images: my site or https / js: my site + https / css: my site + inline style/ connect-src : where api calls can connect / 'unsafe-inline' - inline scripts are blocked
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
