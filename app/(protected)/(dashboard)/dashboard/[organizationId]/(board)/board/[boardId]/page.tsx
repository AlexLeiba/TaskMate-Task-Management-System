export const revalidate = 30;
import { BoardViews } from "@/components/Protected/Pages/Board/BoardViews/BoardViews";
import { SubHeaderServerRender } from "@/components/Protected/Pages/Board/SubHeaderServerRender";

async function BoardPage({
  params,
}: {
  params: Promise<{ boardId: string; organizationId: string }>;
}) {
  const boardId = (await params).boardId;
  const orgId = (await params).organizationId;

  return (
    <div className="w-full h-[calc(100vh-200px)]">
      <SubHeaderServerRender boardId={boardId} orgId={orgId} />

      <BoardViews boardId={boardId} />
    </div>
  );
}

export default BoardPage;
