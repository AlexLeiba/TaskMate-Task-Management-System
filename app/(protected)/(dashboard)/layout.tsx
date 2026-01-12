import { FooterDashboard } from "@/components/layout/Protected/Footer/FooterDashboard";
import { HeaderDashboard } from "@/components/layout/Protected/Header/HeaderDashboard";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import React from "react";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <Sidebar />

        <div className="min-h-screen flex flex-col w-full">
          <HeaderDashboard />
          <main className="flex flex-1  py-18  max-w-5xl px-4 mx-auto w-full">
            {children}
          </main>
          <FooterDashboard />
        </div>
      </SidebarProvider>
    </>
  );
}

export default ProtectedLayout;
