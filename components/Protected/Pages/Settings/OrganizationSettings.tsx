"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const OrganizationProfile = dynamic(
  () => import("@clerk/nextjs").then((m) => m.OrganizationProfile),
  { ssr: false, loading: () => <p>Loading...</p> },
);

export function OrganizationSettings() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
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
  );
}
