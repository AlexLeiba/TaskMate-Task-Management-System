import { useStore } from "@/store/useStore";
import React from "react";

type Props = {
  totalTicketCardsInList: number;
  listId: string;
};

export function ListCardTicketsCounter({
  totalTicketCardsInList,
  listId,
}: Props) {
  const { initialBoardListData } = useStore();
  console.log(
    "🚀 ~ ListCardTicketsCounter ~ initialBoardListData:",
    initialBoardListData,
  );
  // receive new nr of cards from store
  // if data from store is null then show initial nr count.
  return (
    <span className="text-gray-300 text-sm bg-background-element px-1 ml-1">
      {totalTicketCardsInList} OF{" "}
      {initialBoardListData?.find((list) => list.id === listId)?.cards ||
        totalTicketCardsInList}
    </span>
  );
}
