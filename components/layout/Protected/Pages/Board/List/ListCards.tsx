"use client";
import { useEffect, useRef, useState } from "react";
import { ListCard } from "./ListCard/ListCard";
import { AddNewListCard } from "./ListCard/AddNewListCard";
import toast from "react-hot-toast";
import { ListCardSkeleton } from "./ListCard/ListCardSkeleton";
import { ListAndCardsAndDueDateAndChecklistType } from "@/lib/types";
import dynamic from "next/dynamic";
import { Droppable, DropResult } from "@hello-pangea/dnd";
import { useMutation } from "@tanstack/react-query";
import {
  changeCardPositionAction,
  changeListPositionAction,
} from "@/app/actions/drag-and-drop";

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

  const hasToastedRef = useRef(false);

  const { mutate: mutateReorderList } = useMutation({
    mutationFn: changeListPositionAction,
    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });
  const { mutate: mutateReorderCard } = useMutation({
    mutationFn: changeCardPositionAction,
    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

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
    console.log("🚀 ~ handleDragEnd ~ dragEventData:", dragEventData);
    const destination = dragEventData?.destination;
    const source = dragEventData?.source;

    const type: "list" | "card" = dragEventData?.type as any;

    if (!destination?.droppableId || !source?.droppableId) return;
    switch (type) {
      case "list": {
        if (destination.index === source.index) return;

        setListDataState((prev) => {
          const prevCopy = [...(prev || [])];
          const draggedElement = prevCopy?.splice(source.index - 1, 1)[0];
          if (!draggedElement) return prevCopy;
          prevCopy?.splice(destination.index - 1, 0, draggedElement);

          mutateReorderList({
            boardId,
            newOrderIndex: destination.index,
            reorderedListId: draggedElement?.id.toString() || "",
          });
          return prevCopy;
        });

        break;
      }
      case "card": {
        if (!destination.droppableId || !source.droppableId) return;

        // SAME LIST
        if (destination.droppableId === source.droppableId) {
          if (destination.index === source.index) return;

          setListDataState((prev) => {
            return prev?.map((list) => {
              if (source.droppableId === list.id.toString()) {
                const cardsToDrag = [...list.cards];
                const deletedCard = cardsToDrag.splice(source.index - 1, 1)[0];
                if (deletedCard) {
                  cardsToDrag.splice(destination.index - 1, 0, deletedCard);

                  // CHANGE IN DB CARD ORDER
                  mutateReorderCard({
                    boardId,
                    sourceListId: source.droppableId,
                    destinationListId: destination.droppableId,
                    cardToMoveId: deletedCard.id,
                    listTitle:
                      listData.data?.find(
                        (list) => list.id.toString() === source.droppableId,
                      )?.title || "List",
                    newOrderIndex: destination.index,
                    type: "same-list",
                  });
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
          if (!prev || !destination.droppableId || !source.droppableId)
            return prev;

          // CLONED LIST ARRAY LAYER TO AVOID MUTATION
          const newState = [...prev];

          const sourceListIndex = newState?.findIndex(
            (list) => list?.id.toString() === source.droppableId,
          );
          const destinationListIndex = newState?.findIndex(
            (list) => list?.id.toString() === destination.droppableId,
          );

          if (sourceListIndex === -1 || destinationListIndex === -1) {
            return newState;
          }

          // CLONED SOURCE NESTED CARDS AND  LISTS TO AVOID MUTATION
          const sourceList = {
            ...newState[sourceListIndex], //GOT LIST DATA FROM SOURCE INDEX
            cards: [...newState[sourceListIndex].cards], //[1,2]
          };

          const [deletedCard] = sourceList.cards.splice(source.index - 1, 1); //modifies newState and returns deleted card

          if (!deletedCard) return newState;

          // CLONED DESTINATION NESTED CARDS AND LISTS TO AVOID MUTATION
          const destinationList = {
            ...newState[destinationListIndex],
            cards: [...newState[destinationListIndex].cards], //[3,4]
          };

          //add card to new destination
          destinationList.cards.splice(destination.index - 1, 0, deletedCard);

          // ADD NEW CARDS STATE TO NEW STATE AND RETURN IT
          newState[sourceListIndex] = sourceList;
          newState[destinationListIndex] = destinationList;

          // CHANGE IN DB CARD ORDER
          mutateReorderCard({
            boardId,
            sourceListId: source.droppableId,
            destinationListId: destination.droppableId,
            cardToMoveId: deletedCard.id,
            listTitle:
              listData.data?.find(
                (list) => list.id.toString() === source.droppableId,
              )?.title || "List",
            newOrderIndex: destination.index,
            type: "different-list",
          });

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
