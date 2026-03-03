"use client";
import { useState } from "react";

import { AddNewInput } from "../../AddNewInput";
import { useStore } from "@/store/useStore";
import { useMutation } from "@tanstack/react-query";
import { updateListTitleAction } from "@/app/actions/list";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { useBoardId } from "@/hooks/useBoardId";
import { useRole } from "@/hooks/useRole";
import { USER_ROLES } from "@/lib/consts";

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
  const role = useRole();
  const [isOpenedTitleInput, setIsOpenedTitleInput] = useState(false);
  const { openTitleInput } = useStore();
  const isInputOpened =
    openTitleInput.id === listId ? openTitleInput.isOpen : isOpenedTitleInput;

  const { mutate: mutateListTitle, isPending: isPendingMutateListTitle } =
    useMutation({
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

  function handleSubmitListTitle(value: { [inputName: string]: string }) {
    setIsOpenedTitleInput(false);

    if (!listId || !boardId)
      return toast.error("Something went wrong, please try again");

    mutateListTitle({ listId, title: value.title, boardId });
    toast.loading("Updating list title...", { id: "update-list-title" });
  }

  return (
    <div className="flex justify-between items-start mb-2 relative">
      {/* STATUSES */}
      {!isInputOpened && (
        <ListStatuses selectedStatus={status} listId={listId} />
      )}

      {role === USER_ROLES.admin && (
        <>
          {/* ADD NEW LIST / LIST TITLE*/}
          <AddNewInput
            loading={isPendingMutateListTitle}
            disabled={isPendingMutateListTitle}
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
        </>
      )}
      {role === USER_ROLES.member && (
        <div className="w-full pl-2">
          <h3 className="text-lg font-medium line-clamp-3">{title}</h3>
        </div>
      )}
    </div>
  );
}
