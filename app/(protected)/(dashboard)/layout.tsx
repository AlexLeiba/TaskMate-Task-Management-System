import { FooterDashboard } from "@/components/layout/Protected/Footer/FooterDashboard";
import { HeaderDashboard } from "@/components/layout/Protected/Header/HeaderDashboard";
import { AppSidebar } from "@/components/layout/Sidebar/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar";

import React from "react";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="min-h-screen flex flex-col w-full">
          <HeaderDashboard />
          <main className="flex flex-1  py-15  max-w-4xl px-4 mx-auto w-full">
            <SidebarTrigger />
            {children}
          </main>
          <FooterDashboard />
        </div>
      </SidebarProvider>
    </>
  );
}

export default ProtectedLayout;
