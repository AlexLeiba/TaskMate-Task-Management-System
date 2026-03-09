"use client";
import { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";

import { ListAndCardsAndDueDateAndChecklistType } from "@/lib/types";
import dynamic from "next/dynamic";
import { Droppable, DropResult } from "@hello-pangea/dnd";
import { useMutation } from "@tanstack/react-query";
import {
  changeCardPositionAction,
  changeListPositionAction,
} from "@/app/actions/drag-and-drop";
import { USER_ROLES } from "@/lib/consts";
import { useRole } from "@/hooks/useRole";
import { ListCardSkeleton } from "./ListCard/ListCardSkeleton";
import { ListCard } from "./ListCard/ListCard";
import { AddNewListCard } from "./ListCard/AddNewListCard";
import { useStore } from "@/store/useStore";

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
  const {
    boardListData,
    setInitializeBoardListData,

    setDndBoardListData,
    setDndSameListBoardListDataCards,
    setDndDifferentListBoardListDataCards,
  } = useStore();

  const role = useRole();
  const hasToastedRef = useRef(false);

  const { mutate: mutateReorderList } = useMutation({
    mutationFn: changeListPositionAction,
    mutationKey: ["reorder-list"],
    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });
  const { mutate: mutateReorderCard } = useMutation({
    mutationFn: changeCardPositionAction,
    mutationKey: ["reorder-card"],
    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  useEffect(() => {
    if (listData?.error?.message && hasToastedRef.current === false) {
      // CATCH ERRORS
      toast.error(listData.error.message);
      hasToastedRef.current = true; //to avoid duplicate toasts
      return;
    }

    setInitializeBoardListData(listData?.data); //SET INITIAL DATA
    // initial list column values
  }, [listData.data, listData.error.message, setInitializeBoardListData]);

  if (!boardId || !boardListData) return <ListCardSkeleton />;

  // DND RESPONSER
  function handleDragEnd(dragEventData: DropResult<string>) {
    const destination = dragEventData?.destination;
    const source = dragEventData?.source;

    const type: "list" | "card" = dragEventData?.type as any;

    if (!destination?.droppableId || !source?.droppableId) return;
    switch (type) {
      case "list": {
        if (destination.index === source.index) return;

        const draggedElementId = setDndBoardListData(source, destination);

        mutateReorderList({
          boardId,
          newOrderIndex: destination.index,
          reorderedListId: draggedElementId,
        });

        break;
      }

      case "card": {
        // SAME LIST
        if (destination.droppableId === source.droppableId) {
          if (destination.index === source.index) return;

          const deletedCardId = setDndSameListBoardListDataCards(
            source,
            destination,
          );

          mutateReorderCard({
            boardId,
            sourceListId: source.droppableId,
            destinationListId: destination.droppableId,
            cardToMoveId: deletedCardId,
            listTitle:
              listData.data?.find(
                (list) => list.id.toString() === source.droppableId,
              )?.title || "List",
            newOrderIndex: destination.index,
            type: "same-list",
          });

          return;
        }

        // DIFFERENT LIST
        const deletedCardId = setDndDifferentListBoardListDataCards(
          source,
          destination,
        );

        // CHANGE IN DB CARD ORDER
        mutateReorderCard({
          boardId,
          sourceListId: source.droppableId,
          destinationListId: destination.droppableId,
          cardToMoveId: deletedCardId,
          listTitle:
            listData.data?.find(
              (list) => list.id.toString() === source.droppableId,
            )?.title || "List",
          newOrderIndex: destination.index,
          type: "different-list",
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
              {boardListData?.map((list, index) => (
                <ListCard listData={list} key={list.id} index={index + 1} />
              ))}

              {/* DROP PLACEHOLDER */}
              {provided.placeholder}
            </ol>
          )}
        </Droppable>
      </DragDropContext>
      {/*  ADD NEW LIST*/}
      {role === USER_ROLES.admin && <AddNewListCard boardId={boardId} />}
    </div>
  );
}
