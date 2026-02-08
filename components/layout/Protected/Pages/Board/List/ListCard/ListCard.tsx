import { AddTicketCard } from "./AddTicketCard";
import { TicketCard } from "../TicketCard/TicketCard";
import { ListCardHeader } from "./ListCardHeader";
import { ListAndCardsAndDueDateAndChecklistType } from "@/lib/types";

type Props = {
  listData: ListAndCardsAndDueDateAndChecklistType;
};
export function ListCard({ listData }: Props) {
  return (
    <li className=" shrink-0 h-full py-2 px-2 bg-card/80 text-text-primary w-70 rounded-md  ">
      {/* HEADER */}
      <ListCardHeader
        status={listData.status}
        title={listData.title}
        listId={listData.id.toString()}
      />

      {/* TICKET CARDS */}
      <div className="flex flex-col gap-2">
        {listData?.cards?.map((card) => {
          return (
            <TicketCard key={card.id} data={card} boardId={listData.boardId} />
          );
        })}
      </div>

      {/*ADD NEW TICKET CARD */}
      <AddTicketCard listId={listData.id.toString()} />
    </li>
  );
}
