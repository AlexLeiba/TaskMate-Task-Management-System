import { FooterDashboard } from "@/components/layout/Protected/Footer/FooterDashboard";
import { HeaderDashboard } from "@/components/layout/Protected/Header/HeaderDashboard";

const Sidebar = dynamic(() =>
  import("@/components/layout/Sidebar/Sidebar").then((m) => m.Sidebar),
);
import { SidebarProvider } from "@/components/ui/sidebar";
import dynamic from "next/dynamic";

import React from "react";

export const metadata = {
  title: "TaskMate - Dashboard",
  description:
    "TaskMate is a friendly task management system which can simplify and boost your productivity.",
};

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <Sidebar />

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
