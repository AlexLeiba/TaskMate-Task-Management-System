import { getBoardDataAction } from "@/app/actions/board";
import { HeaderDashboard } from "@/components/layout/Protected/Header/HeaderDashboard";
import { SidebarProvider } from "@/components/ui/sidebar";

import React from "react";

async function ProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ boardId: string }>;
}) {
  const boardId = (await params).boardId;
  const { data: boardData } = await getBoardDataAction(boardId);

  return (
    <>
      <SidebarProvider>
        <div className="min-h-screen flex flex-col w-full">
          <HeaderDashboard type="board" />
          <main
            style={{ backgroundImage: `url(${boardData?.bgImageUrl})` }}
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
