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
const Summary = dynamic(() =>
  import("@/components/Protected/Pages/Board/BoardViews/Summary/Summary").then(
    (m) => m.Summary,
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
    summary: Summary,
  };
export function BoardViews({ boardId, listData }: Props) {
  // TODO, add here data in useStore, filter it, and pass to its component as prop.
  // at first iteration pass the listdata directly to component,
  // only if any filter is selected just then pass the filtered data, if no, pass server data unfiltered
  const { boardTabSections } = useStore();

  const BoardView = BOARD_VIEW_SECTION[boardTabSections];
  return (
    <div className="h-full">
      {/* LIST CARDS */}
      <BoardView boardId={boardId} listData={listData} />
    </div>
  );
}
