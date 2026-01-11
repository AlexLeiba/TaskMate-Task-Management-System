import { SubHeader } from "@/components/layout/Protected/Pages/Board/SubHeader";
import React from "react";

async function BoardPage({ params }: { params: Promise<{ boardId: string }> }) {
  const paramsObj = params;
  const boardId = (await paramsObj).boardId;
  console.log("🚀 ~ BoardPage ~ boardId:", boardId);
  // TODO get data server side pass to client

  return (
    <div className="w-full">
      <SubHeader
        boardId={boardId}
        boardTitle="Board title dsds dsds sd sddsds dds ds sd"
      />
    </div>
  );
}

export default BoardPage;
