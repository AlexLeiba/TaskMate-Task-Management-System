import dynamic from "next/dynamic";

const BoardServerRender = dynamic(() =>
  import("@/components/Protected/Pages/Board/BoardServerRender").then(
    (m) => m.BoardServerRender,
  ),
);

const SubHeaderServerRender = dynamic(() =>
  import("@/components/Protected/Pages/Board/SubHeaderServerRender").then(
    (m) => m.SubHeaderServerRender,
  ),
);

export const revalidate = 30;

async function BoardPage({
  params,
}: {
  params: Promise<{ boardId: string; organizationId: string }>;
}) {
  const boardId = (await params).boardId;
  const orgId = (await params).organizationId;

  return (
    <div className="w-full h-full">
      <SubHeaderServerRender boardId={boardId} orgId={orgId} />

      <BoardServerRender boardId={boardId} orgId={orgId} />
    </div>
  );
}

export default BoardPage;
