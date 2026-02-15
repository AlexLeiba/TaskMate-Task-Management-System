"use client";
import { useState } from "react";

import { AddNewInput } from "../../AddNewInput";
import { useStore } from "@/store/useStore";
import { useMutation } from "@tanstack/react-query";
import { updateListTitleAction } from "@/app/actions/list";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { useBoardId } from "@/hooks/useBoardId";

const ListStatuses = dynamic(() =>
  import("./ListStatuses").then((m) => m.ListStatuses),
);
const ListOptions = dynamic(() =>
  import("./ListOptions").then((m) => m.ListOptions),
);

type Props = {
  status: string;
  title: string;
  listId: string;
};
export function ListCardHeader({ status, title, listId }: Props) {
  const boardId = useBoardId();
  const [isOpenedTitleInput, setIsOpenedTitleInput] = useState(false);
  const { openTitleInput } = useStore();

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-list-title"],
    mutationFn: updateListTitleAction,
    onSuccess() {
      toast.dismiss("update-list-title");
      toast.success("List title updated");
    },
    onError({ message }) {
      toast.dismiss("update-list-title");
      toast.error(message || "Error updating list title, please try again");
    },
  });

  const isInputOpened =
    openTitleInput.id === listId ? openTitleInput.isOpen : isOpenedTitleInput;

  function handleSubmitListTitle(value: { [inputName: string]: string }) {
    setIsOpenedTitleInput(false);
    mutate({ listId, title: value.title, boardId });
    toast.loading("Updating list title...", { id: "update-list-title" });
  }
  return (
    <div className="flex justify-between items-start mb-2 relative">
      {/* STATUSES */}
      {!isInputOpened && (
        <ListStatuses selectedStatus={status} listId={listId} />
      )}

      {/* ADD NEW LIST / LIST TITLE*/}
      <AddNewInput
        loading={isPending}
        disabled={isPending}
        handleSubmitValue={(v) => handleSubmitListTitle(v)}
        inputName="title"
        placeholder="Edit list title here..."
        label="Edit list title"
        setIsOpenedTitleInput={setIsOpenedTitleInput}
        isOpenedTitleInput={isInputOpened}
        classNameContainer="py-0 py-0 w-full"
        defaultValue={title}
      >
        <h3 className="text-lg font-medium line-clamp-3">{title}</h3>
      </AddNewInput>

      {/* OPTIONS */}
      {!isInputOpened && <ListOptions listId={listId} />}
    </div>
  );
}
