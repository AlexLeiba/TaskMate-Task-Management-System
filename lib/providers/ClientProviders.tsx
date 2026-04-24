"use client";

import { ClerkProvider } from "@clerk/nextjs";
// import { ui } from "@clerk/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ClerkProvider appearance={{ baseTheme: "dark" }}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {children}
      </QueryClientProvider>
    </ClerkProvider>
  );
}
