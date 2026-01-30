"use client";
import { useState } from "react";

import { ListStatuses } from "./ListStatuses";
import { ListOptions } from "./ListOptions";
import { AddNewInput } from "../../AddNewInput";
import { useStore } from "@/store/useStore";
import { useMutation } from "@tanstack/react-query";
import { updateListTitleAction } from "@/app/actions/list";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  status: string;
  title: string;
  listId: string;
};
export function ListCardHeader({ status, title, listId }: Props) {
  const pathname = usePathname();
  const boardId = pathname.split("/").at(-1) || "";

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
  const [isOpenedTitleInput, setIsOpenedTitleInput] = useState(false);
  const { openTitleInput } = useStore();

  const isInputOpened =
    openTitleInput.id === listId ? openTitleInput.isOpen : isOpenedTitleInput;

  function handleSubmitListTitle(value: { [inputName: string]: string }) {
    mutate({ listId, title: value.title, boardId });
    toast.loading("Updating list title...", { id: "update-list-title" });
    setIsOpenedTitleInput(false);
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-1 items-center">
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
          >
            <p className="text-lg font-medium">{title}</p>
          </AddNewInput>
        </div>

        {/* OPTIONS */}
        {!isInputOpened && <ListOptions listId={listId} />}
      </div>
    </div>
  );
}
