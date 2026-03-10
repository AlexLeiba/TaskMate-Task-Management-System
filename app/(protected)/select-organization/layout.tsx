import { FooterDashboard } from "@/components/Protected/Footer/FooterDashboard";
import { HeaderDashboard } from "@/components/Protected/Header/HeaderDashboard";
import { Sidebar } from "@/components/Protected/Sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar";

import React from "react";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar />
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
