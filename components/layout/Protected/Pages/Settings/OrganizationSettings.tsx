"use client";

import dynamic from "next/dynamic";

const OrganizationProfile = dynamic(
  () => import("@clerk/nextjs").then((m) => m.OrganizationProfile),
  { ssr: false },
);

export function OrganizationSettings() {
  return (
    <div>
      <OrganizationProfile
        appearance={{
          elements: {
            cardBox: {
              boxShadow: "none",
              width: "100%",
            },

            rootBox: {
              width: "100%",
            },
          },
        }}
      />
    </div>
  );
}
