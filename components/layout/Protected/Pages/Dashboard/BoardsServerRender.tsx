import React from "react";
import { Boards } from "./Boards/Boards";
import { getBoardsAction } from "@/app/actions/dashboard";

type Props = {
  orgId: string;
};
export async function BoardsServerRender({ orgId }: Props) {
  const boards = await getBoardsAction(orgId);
  return <Boards data={boards} />;
}
