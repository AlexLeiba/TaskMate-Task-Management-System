"use client";
import { ListCard } from "./ListCard/ListCard";
import { AddNewListCard } from "./ListCard/AddNewListCard";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { ListCardSkeleton } from "./ListCard/ListCardSkeleton";
import { ListAndCardsAndDueDateAndChecklistType } from "@/lib/types";

type Props = {
  boardId: string;
  listData: {
    data: ListAndCardsAndDueDateAndChecklistType[] | null;
    error: { message: string };
  };
};
export function ListCards({ boardId, listData }: Props) {
  const hasToastedRef = useRef(false);
  useEffect(() => {
    if (listData?.error?.message && hasToastedRef.current === false) {
      toast.error(listData.error.message);
      hasToastedRef.current = true; //to avoid duplicate toasts
    }
  }, [listData.data, listData.error.message]);

  if (!boardId || !listData) return <ListCardSkeleton />;
  return (
    <ol className="flex gap-4 w-full ">
      {listData?.data?.map((list) => (
        <ListCard key={list.id} listData={list} />
      ))}
      {/* CARD: ADD NEW LIST*/}
      <AddNewListCard boardId={boardId} />
    </ol>
  );
}
