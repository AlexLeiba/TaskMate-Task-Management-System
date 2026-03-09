import { getBoardDataAction } from "@/app/actions/board";
import { getListDataAction } from "@/app/actions/list";
import { BoardViews } from "@/components/Protected/Pages/Board/BoardViews/BoardViews";

import { SubHeader } from "@/components/Protected/Pages/Board/SubHeader/SubHeader";

async function BoardPage({
  params,
}: {
  params: Promise<{ boardId: string; organizationId: string }>;
}) {
  const boardId = (await params).boardId;
  const orgId = (await params).organizationId;

  const boardData = await getBoardDataAction(boardId, orgId);
  const listData = await getListDataAction(boardId, orgId);

  return (
    <div className="w-full h-full">
      {/* BOARD CONTENT */}
      <SubHeader data={boardData} boardId={boardId} orgId={orgId} />
      <BoardViews boardId={boardId} listData={listData} />
    </div>
  );
}

export default BoardPage;
