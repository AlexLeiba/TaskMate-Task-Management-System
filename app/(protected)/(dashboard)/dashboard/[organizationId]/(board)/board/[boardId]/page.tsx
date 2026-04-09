export const revalidate = 30;
import { BoardServerRender } from "@/components/Protected/Pages/Board/BoardServerRender";
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

      <BoardServerRender boardId={boardId} orgId={orgId} />
    </div>
  );
}

export default BoardPage;
