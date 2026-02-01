import { getBoardDataAction } from "@/app/actions/board";
import { getListDataAction } from "@/app/actions/list";
import { ListCards } from "@/components/layout/Protected/Pages/Board/List/ListCards";
import { SubHeader } from "@/components/layout/Protected/Pages/Board/SubHeader";

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

        {/* Suspense catches Promises */}
        {/* <Suspense fallback={<ListCardSkeleton />}> */}
        {/* //it awaits for its parent to load first/ is nothing async happens, no suspension, suspension is triggered when a SSR Com throws a Promise */}
        <ListCards boardId={boardId} listData={listData} />
        {/* This Client comp wont exist until Server resolves its Promises */}
        {/* </Suspense> */}
      </div>
    </div>
  );
}

export default BoardPage;
