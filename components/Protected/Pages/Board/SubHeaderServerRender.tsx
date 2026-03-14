import { getBoardDataAction } from "@/app/actions/board";
import { SubHeader } from "./SubHeader/SubHeader";

type Props = {
  boardId: string;
  orgId: string;
};
export async function SubHeaderServerRender({ boardId, orgId }: Props) {
  const boardData = await getBoardDataAction(boardId, orgId);

  return <SubHeader data={boardData} boardId={boardId} orgId={orgId} />;
}
