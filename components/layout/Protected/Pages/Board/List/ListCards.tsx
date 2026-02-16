"use client";
import { useEffect, useRef, useState } from "react";
import { ListCard } from "./ListCard/ListCard";
import { AddNewListCard } from "./ListCard/AddNewListCard";
import toast from "react-hot-toast";
import { ListCardSkeleton } from "./ListCard/ListCardSkeleton";
import {
  CardWithDetailsAndDueDateAndChecklistType,
  ListAndCardsAndDueDateAndChecklistType,
} from "@/lib/types";
import dynamic from "next/dynamic";
import { Droppable, DropResult } from "@hello-pangea/dnd";
import { list } from "unsplash-js/dist/methods/photos";

const DragDropContext = dynamic(() =>
  import("@hello-pangea/dnd").then((m) => m.DragDropContext),
);

type Props = {
  boardId: string;
  listData: {
    data: ListAndCardsAndDueDateAndChecklistType[] | null | undefined;
    error: { message: string };
  };
};
export function ListCards({ boardId, listData }: Props) {
  const [listDataState, setListDataState] = useState<
    ListAndCardsAndDueDateAndChecklistType[] | null | undefined
  >(null);
  console.log("🚀 ~ ListCards ~ listDataState:", listDataState);

  const hasToastedRef = useRef(false);

  useEffect(() => {
    if (listData?.error?.message && hasToastedRef.current === false) {
      toast.error(listData.error.message);
      hasToastedRef.current = true; //to avoid duplicate toasts
      return;
    }

    setListDataState(listData?.data);
  }, [listData.data, listData.error.message, setListDataState]);

  if (!boardId || !listDataState) return <ListCardSkeleton />;

  // RESPONSER, Top level app events used to perform state updates.
  function handleDragEnd(dragEventData: DropResult<string>) {
    const destination = dragEventData?.destination;
    const source = dragEventData?.source;
    const draggableId = dragEventData?.draggableId;

    console.log("🚀 ~ handleDragEnd ~ destination:", destination);
    console.log("🚀 ~ handleDragEnd ~ source:", source);
    console.log("TYPE", dragEventData?.type);

    const type: "list" | "card" = dragEventData?.type as any;
    if (!destination || !source) return;
    switch (type) {
      case "list": {
        // Handle list reordering logic here
        // change order of list on DB

        setListDataState((prev) => {
          const draggedElement = prev?.splice(source.index - 1, 1)[0];
          if (!draggedElement) return prev;
          prev?.splice(destination.index - 1, 0, draggedElement);

          return prev;
        });

        break;
      }
      case "card": {
        // Handle card movement logic here
        // change list id (if new id is different than older listid)
        //also change order of card
        // CARD ID, change destination within the same list

        if (!destination.droppableId || !source.droppableId) return;

        // SAME LIST
        if (destination.droppableId === source.droppableId) {
          setListDataState((prev) => {
            return prev?.map((list) => {
              if (source.droppableId === list.id.toString()) {
                const cardsToDrag = [...list.cards];
                const deletedCard = cardsToDrag.splice(source.index - 1, 1)[0];
                if (deletedCard) {
                  cardsToDrag.splice(destination.index - 1, 0, deletedCard);
                }
                return { ...list, cards: cardsToDrag };
              }

              return list;
            });
          });

          return;
        }

        // DIFFERENT LISTS
        setListDataState((prev) => {
          if (!prev) return prev;

          const newState = [...prev];

          const sourceListIndex = prev?.findIndex(
            (list) => list?.id.toString() === source.droppableId,
          );
          const destinationListIndex = prev?.findIndex(
            (list) => list?.id.toString() === destination.droppableId,
          );

          if (sourceListIndex === -1 || destinationListIndex === -1) {
            return prev;
          }

          const sourceList = {
            ...newState[sourceListIndex],
            cards: [...newState[sourceListIndex].cards],
          };

          const [deletedCard] = sourceList.cards.splice(source.index - 1, 1); //modifies newState and returns deleted card

          if (!deletedCard) return prev;

          const destinationList = {
            ...newState[destinationListIndex],
            cards: [...newState[destinationListIndex].cards],
          };

          //add card to new destination
          destinationList.cards.splice(destination.index - 1, 0, deletedCard);

          newState[sourceListIndex] = sourceList;
          newState[destinationListIndex] = destinationList;

          return newState;
        });
      }
      default:
        break;
    }
  }
  return (
    <div className="max-w-400 mx-auto p-4 overflow-x-auto  w-full flex gap-4 items-start   h-full">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="list-container"
          direction="horizontal"
          type="list"
        >
          {(provided) => (
            <ol
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-4 items-start"
            >
              {listDataState.map((list, index) => (
                <ListCard listData={list} key={list.id} index={index + 1} />
              ))}

              {/* DROP PLACEHOLDER */}
              {provided.placeholder}
            </ol>
          )}
        </Droppable>
      </DragDropContext>
      {/*  ADD NEW LIST*/}
      <AddNewListCard boardId={boardId} />
    </div>
  );
}
