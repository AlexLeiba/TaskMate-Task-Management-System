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
  params: Promise<{ boardId: string; organizationId: string }>;
}) {
  const boardId = (await params).boardId;
  const orgId = (await params).organizationId;

  const { data: boardData } = await getBoardDataAction(boardId, orgId);

  return (
    <>
      <SidebarProvider>
        <div className="min-h-screen flex flex-col w-full">
          <HeaderDashboard type="board" />
          <main className={` flex flex-1 py-14`}>
            {boardData?.bgImageUrl && (
              <Image
                className="w-screen h-screen absolute inset-0 -z-1 object-cover "
                src={boardData?.bgImageUrl || ""}
                alt="Board background image"
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
