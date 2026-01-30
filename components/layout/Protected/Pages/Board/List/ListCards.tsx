"use client";
import { ListCard } from "./ListCard/ListCard";
import { AddNewListCard } from "./ListCard/AddNewListCard";
import { ListAndCardsType } from "@/app/actions/list";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ListCardSkeleton } from "./ListCard/ListCardSkeleton";

type Props = {
  boardId: string;
  listData: {
    data: ListAndCardsType[] | null;
    error: { message: string };
  };
};
export function ListCards({ boardId, listData }: Props) {
  useEffect(() => {
    if (listData.error.message) {
      toast.error(listData.error.message);
    }
  }, [listData.data, listData.error.message]);

  if (!boardId) return <ListCardSkeleton />;
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
