import { getBoardDataAction } from "@/app/actions/board";
import { getListDataAction } from "@/app/actions/list";
import { ListCards } from "@/components/layout/Protected/Pages/Board/List/ListCards";
import { SubHeader } from "@/components/layout/Protected/Pages/Board/SubHeader";

async function BoardPage({ params }: { params: Promise<{ boardId: string }> }) {
  const boardId = (await params).boardId;

  const boardData = await getBoardDataAction(boardId);
  const listData = await getListDataAction(boardId);

  return (
    <div className="w-full">
      <SubHeader data={boardData} boardId={boardId} />

      {/* BOARD CONTENT */}
      <div className="max-w-400 mx-auto p-4 overflow-x-auto h-full ">
        {/* LIST CARDS */}
        <ListCards boardId={boardId} listData={listData} />
      </div>
    </div>
  );
}

export default BoardPage;
