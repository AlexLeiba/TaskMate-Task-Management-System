import { AddNewListCard } from "@/components/layout/Protected/Pages/Board/List/ListCard/AddNewListCard";
import { ListCards } from "@/components/layout/Protected/Pages/Board/List/ListCards";
import { SubHeader } from "@/components/layout/Protected/Pages/Board/SubHeader";

async function BoardPage({ params }: { params: Promise<{ boardId: string }> }) {
  const boardId = (await params).boardId;

  // TODO get data server side pass to client as props

  return (
    <div className="w-full ">
      <SubHeader boardId={boardId} boardTitle="Board title dsds dsds" />

      {/* BOARD CONTENT */}
      <div className="max-w-7xl mx-auto p-4 overflow-x-auto h-full ">
        {/* LIST CARDS */}
        <ListCards />
      </div>
    </div>
  );
}

export default BoardPage;
