"use client";
import { ListAndCardsAndDueDateAndChecklistType } from "@/lib/types";
import { ListCards } from "./KanbanView/ListCards";
import dynamic from "next/dynamic";
import { useStore } from "@/store/useStore";
import React, { ComponentClass } from "react";

const ListView = dynamic(() =>
  import("@/components/Protected/Pages/Board/BoardViews/ListView/ListView").then(
    (m) => m.ListView,
  ),
);
const BoardSummary = dynamic(() =>
  import("@/components/Protected/Pages/Board/BoardViews/BoardSummary").then(
    (m) => m.BoardSummary,
  ),
);
type Props = {
  boardId: string;
  listData: {
    data: ListAndCardsAndDueDateAndChecklistType[] | null | undefined;
    error: { message: string };
  };
};

const BOARD_VIEW_SECTION: { [key: string]: React.FC<Props> | ComponentClass } =
  {
    board: ListCards,
    list: ListView,
    summary: BoardSummary,
  };
export function BoardViews({ boardId, listData }: Props) {
  const boardTabSections = useStore((state) => state.boardTabSections);

  const BoardView = BOARD_VIEW_SECTION[boardTabSections];
  return (
    <div className="h-full">
      {/* LIST CARDS */}
      <BoardView boardId={boardId} listData={listData} />
    </div>
  );
}
