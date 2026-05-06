import type { NextConfig } from "next";

const ContentSecurityPolicy = `
              default-src 'self'; 
              script-src 'self' 'unsafe-inline'   https://*.clerk.com https://smooth-toucan-0.clerk.accounts.dev https://clerk-telemetry.com/v1/event https://challenges.cloudflare.com/;
              style-src 'self' 'unsafe-inline' https:;
              img-src 'self' data: https://*.clerk.com https://img.clerk.com   https://images.unsplash.com https://res.cloudinary.com ;
              font-src 'self' https: data: ;
              connect-src 'self' https://*.clerk.com https://smooth-toucan-0.clerk.accounts.dev  https://clerk-telemetry.com/v1/event https://checkout.stripe.com/ https://res.cloudinary.com;
              frame-ancestors 'none';
              worker-src 'self' blob:;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-src 'self' https://challenges.cloudflare.com/;
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
            value: "private, max-age=0, s-maxage=60, stale-while-revalidate", //cache behaviour (private - only user browser can cache)
          },
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy,
          },
          {
            key: "X-Frame-Options", //no iframe embedding
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options", // browser no guessing MimeType
            value: "nosniff",
          },
          {
            key: "Referrer-Policy", //no sensitive url data on different domains
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security", //forces https
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
