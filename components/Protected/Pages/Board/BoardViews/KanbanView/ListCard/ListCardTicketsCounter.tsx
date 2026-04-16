import { useStore } from "@/store/useStore";

type Props = {
  totalTicketCardsInList: number;
  listId: string;
};

export function ListCardTicketsCounter({
  totalTicketCardsInList,
  listId,
}: Props) {
  const unfilteredBoardListData = useStore(
    (state) => state.unfilteredBoardListData,
  );

  return (
    <span className="text-gray-300 text-sm bg-background-element px-1 ml-1">
      {totalTicketCardsInList} OF{" "}
      {unfilteredBoardListData?.find((list) => list.id === listId)?.cards
        ?.length || totalTicketCardsInList}
    </span>
  );
}
