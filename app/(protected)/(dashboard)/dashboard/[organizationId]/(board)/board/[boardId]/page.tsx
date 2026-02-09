import { getBoardDataAction } from "@/app/actions/board";
import { getListDataAction } from "@/app/actions/list";
import { ListCards } from "@/components/layout/Protected/Pages/Board/List/ListCards";
import { SubHeader } from "@/components/layout/Protected/Pages/Board/SubHeader";

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
    <div className="w-full">
      {/* BOARD CONTENT */}
      <SubHeader data={boardData} boardId={boardId} orgId={orgId} />

      <div className="max-w-400 mx-auto p-4 overflow-x-auto h-full ">
        {/* LIST CARDS */}
        <ListCards boardId={boardId} listData={listData} />
      </div>
    </div>
  );
}

export default BoardPage;
