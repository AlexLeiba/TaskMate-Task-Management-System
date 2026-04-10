import React from "react";
import { FooterDashboard } from "@/components/Protected/Footer/FooterDashboard";
import { HeaderDashboard } from "@/components/Protected/Header/HeaderDashboard";

import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarClient } from "@/components/Protected/Sidebar/SidebarClient";

export const metadata = {
  title: "TaskMate - Dashboard",
  description:
    "TaskMate is a friendly task management system which can simplify and boost your productivity.",
};

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <SidebarClient />
        <div className="min-h-screen flex flex-col w-full">
          <HeaderDashboard />
          <main className="flex flex-1  py-18  max-w-7xl px-4 mx-auto w-full">
            {children}
          </main>
          <FooterDashboard />
        </div>
      </SidebarProvider>
    </>
  );
}

export default ProtectedLayout;
