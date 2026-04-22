import { FooterDashboard } from "@/components/Protected/Footer/FooterDashboard";
import { HeaderDashboard } from "@/components/Protected/Header/HeaderDashboard";
import { SidebarClient } from "@/components/Protected/Sidebar/SidebarClient";
import { SidebarProvider } from "@/components/ui/sidebar";

import React from "react";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarClient />
      <div className="min-h-screen flex flex-col w-full">
        <HeaderDashboard />
        <main className="flex flex-1  py-15  max-w-4xl px-4 mx-auto w-full">
          {children}
        </main>
        <FooterDashboard />
      </div>
    </SidebarProvider>
  );
}

export default ProtectedLayout;
