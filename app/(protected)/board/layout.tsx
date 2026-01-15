import { HeaderDashboard } from "@/components/layout/Protected/Header/HeaderDashboard";
import { SidebarProvider } from "@/components/ui/sidebar";

import React from "react";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  // TODO get bg image of the board layout renders only once, so the req will be made once
  // fetch bg image from api
  const bgBoardImage = "https://picsum.photos/seed/picsum/1920/1080";
  return (
    <>
      <SidebarProvider>
        <div className="min-h-screen flex flex-col w-full">
          <HeaderDashboard type="board" />
          <main
            style={{ backgroundImage: `url(${bgBoardImage})` }}
            className={` flex flex-1  py-13  mx-auto w-full h-screen  bg-cover bg-center`}
          >
            {children}
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}

export default ProtectedLayout;
