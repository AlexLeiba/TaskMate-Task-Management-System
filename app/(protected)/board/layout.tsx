import { HeaderDashboard } from "@/components/layout/Protected/Header/HeaderDashboard";
import { SidebarProvider } from "@/components/ui/sidebar";

import React from "react";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  // TODO get bg image of the board layout renders only once, so the req will be made once
  return (
    <>
      <SidebarProvider>
        <div className="min-h-screen flex flex-col w-full">
          <HeaderDashboard type="board" />
          <main className="flex flex-1  py-13  mx-auto w-full h-screen bg-[url('https://picsum.photos/seed/picsum/1920/1080')] bg-cover bg-center">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}

export default ProtectedLayout;
