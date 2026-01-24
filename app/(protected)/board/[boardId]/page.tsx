import { getBoardDataAction } from "@/app/actions/board";
import { ListCards } from "@/components/layout/Protected/Pages/Board/List/ListCards";
import { SubHeader } from "@/components/layout/Protected/Pages/Board/SubHeader";

async function BoardPage({ params }: { params: Promise<{ boardId: string }> }) {
  const boardId = (await params).boardId;

  // TODO get data server side pass to client as props
  const { data: boardData } = await getBoardDataAction(boardId);
  return (
    <div className="w-full ">
      <SubHeader boardId={boardId} boardTitle={boardData?.title || ""} />

      {/* BOARD CONTENT */}
      <div className="max-w-400 mx-auto p-4 overflow-x-auto h-full ">
        {/* LIST CARDS */}
        <ListCards />
      </div>
    </div>
  );
}

export default BoardPage;
