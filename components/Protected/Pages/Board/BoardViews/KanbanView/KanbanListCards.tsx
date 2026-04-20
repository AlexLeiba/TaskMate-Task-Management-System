"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { Droppable, DropResult } from "@hello-pangea/dnd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changeCardPositionAction,
  changeListPositionAction,
} from "@/app/actions/drag-and-drop";
import { USER_ROLES } from "@/lib/consts/consts";
import { ListCardSkeleton } from "./ListCard/ListCardSkeleton";
import { ListCard } from "./ListCard/ListCard";
import { AddNewListCard } from "./ListCard/AddNewListCard";
import { useStore } from "@/store/useStore";
import { useShallow } from "zustand/shallow";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { useBoardListData } from "@/hooks/useBoardListData";

const DragDropContext = dynamic(() =>
  import("@hello-pangea/dnd").then((m) => m.DragDropContext),
);

type Props = {
  boardId: string;
};
export function KanbanListCards({ boardId }: Props) {
  const queryClient = useQueryClient();
  const filters = useStore((state) => state.filterState);

  // FETCH CACHED DATA
  const { data: listData } = useBoardListData(filters);

  // DND optimistic update methods.
  const {
    boardListData,
    setBoardListData,
    setDndBoardListData,
    setDndSameListBoardListDataCards,
    setDndDifferentListBoardListDataCards,
  } = useStore(
    useShallow((state) => ({
      boardListData: state.boardListData,
      setBoardListData: state.setBoardListData,
      setDndBoardListData: state.setDndBoardListData,
      setDndSameListBoardListDataCards: state.setDndSameListBoardListDataCards,
      setDndDifferentListBoardListDataCards:
        state.setDndDifferentListBoardListDataCards,
    })),
  );

  useEffect(() => {
    // SUBSCRIBE TO LIST FILTER TRIGGERS OF BOARD LIST CACHED DATA.
    if (listData?.data) {
      setBoardListData(listData.data);
    }
  }, [listData, setBoardListData]);

  const { mutate: mutateReorderList } = useMutation({
    mutationFn: changeListPositionAction,
    mutationKey: [
      QUERY_KEYS.pages.board.kanbanView.lists.dragAndDrop.reorderList,
    ],

    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.hooks.useBoardListData],
      });
    },
  });

  const { mutate: mutateReorderCard } = useMutation({
    mutationFn: changeCardPositionAction,
    mutationKey: [
      QUERY_KEYS.pages.board.kanbanView.lists.dragAndDrop.reorderCard,
    ],
    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.hooks.useBoardListData],
      });
    },
  });

  // SKELETON
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
              listData?.data?.find(
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
            listData?.data?.find(
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
    <div className="max-w-400 mx-auto p-4 overflow-x-auto  w-full flex gap-4 items-start overflow-y-hidden  h-[calc(100vh+200)] min-h-[calc(100vh-108px)]">
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
      {listData?.role === USER_ROLES.admin && (
        <AddNewListCard boardId={boardId} />
      )}
    </div>
  );
}
