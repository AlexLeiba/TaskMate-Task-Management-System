import { getListDataAction } from "@/app/actions/list";
import { BoardViews } from "./BoardViews/BoardViews";

type Props = {
  boardId: string;
  orgId: string;
};
export async function BoardServerRender({ boardId, orgId }: Props) {
  const listData = await getListDataAction(boardId, orgId);

  return <BoardViews boardId={boardId} listData={listData} />;
}
