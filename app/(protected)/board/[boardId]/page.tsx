import { getBoardDataAction } from "@/app/actions/board";
import { getListDataAction } from "@/app/actions/list";
import { ListCardSkeleton } from "@/components/layout/Protected/Pages/Board/List/ListCard/ListCardSkeleton";
import { SubHeader } from "@/components/layout/Protected/Pages/Board/SubHeader";
import dynamic from "next/dynamic";
const ListCards = dynamic(
  () =>
    import("@/components/layout/Protected/Pages/Board/List/ListCards").then(
      (m) => m.ListCards,
    ),
  {
    loading: () => <ListCardSkeleton />,
  },
);

async function BoardPage({ params }: { params: Promise<{ boardId: string }> }) {
  const boardId = (await params).boardId;

  // TODO get data server side pass to client as props
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
