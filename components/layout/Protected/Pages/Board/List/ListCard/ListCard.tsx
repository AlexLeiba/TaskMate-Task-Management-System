import { AddTicketCard } from "./AddTicketCard";
import { TicketCard } from "../TicketCard/TicketCard";
import { ListCardHeader } from "./ListCardHeader";
import { ListAndCardsAndDueDateAndChecklistType } from "@/lib/types";
import { ComponentProps } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

type Props = ComponentProps<"li"> & {
  listData: ListAndCardsAndDueDateAndChecklistType;
  index: number;
};
export function ListCard({ listData, index }: Props) {
  return (
    <Draggable
      key={listData.id}
      draggableId={listData.id.toString()}
      index={index}
    >
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className=" shrink-0   p-2 bg-card/80 text-text-primary w-72 rounded-md "
        >
          <div {...provided.dragHandleProps}>
            {/* HEADER */}
            <ListCardHeader
              status={listData.status}
              title={listData.title}
              listId={listData.id.toString()}
            />

            {/* TICKET CARDS */}
            <Droppable
              droppableId={listData.id.toString()}
              direction="vertical"
              type="card"
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col gap-2"
                >
                  {listData?.cards?.map((card, index) => {
                    return (
                      <TicketCard
                        index={index + 1}
                        key={card.id}
                        data={card}
                        boardId={listData.boardId}
                      />
                    );
                  })}

                  {/* DROP AREA PLACEHOLDER */}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/*ADD NEW TICKET CARD */}
            <AddTicketCard listId={listData.id.toString()} />
          </div>
        </li>
      )}
    </Draggable>
  );
}
