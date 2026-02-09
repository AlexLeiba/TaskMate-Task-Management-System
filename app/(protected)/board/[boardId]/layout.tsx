import { getBoardDataAction } from "@/app/actions/board";
import { HeaderDashboard } from "@/components/layout/Protected/Header/HeaderDashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";

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
            // style={{ backgroundImage: `url(${boardData?.bgImageUrl})` }}
            className={` flex flex-1  py-14    `}
          >
            {boardData?.bgImageUrl && (
              <Image
                className="w-screen h-screen absolute inset-0 -z-1 object-cover "
                src={boardData?.bgImageUrl || ""}
                alt=""
                width={1400}
                height={900}
                preload
              />
            )}
            {children}
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}

export default ProtectedLayout;
