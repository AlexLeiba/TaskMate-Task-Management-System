"use client";

import { KanbanListCards } from "./KanbanView/KanbanListCards";
import dynamic from "next/dynamic";
import { useStore } from "@/store/useStore";
import React, { type ComponentClass } from "react";

const ListView = dynamic(() =>
  import("@/components/Protected/Pages/Board/BoardViews/ListView/ListView").then(
    (m) => m.ListView,
  ),
);
const BoardOverview = dynamic(() =>
  import("@/components/Protected/Pages/Board/BoardViews/BoardOverview/BoardOverview").then(
    (m) => m.BoardOverview,
  ),
);
type Props = {
  boardId: string;
};

const VIEW_SECTION: { [key: string]: React.FC<Props> | ComponentClass } = {
  board: KanbanListCards,
  list: ListView,
  overview: BoardOverview,
};
export function BoardViews({ boardId }: Props) {
  const selectedTabSection = useStore((state) => state.boardTabSections);

  const CurrentSectionView = VIEW_SECTION[selectedTabSection];

  return (
    <div className="h-full">
      <CurrentSectionView boardId={boardId} />
    </div>
  );
}
