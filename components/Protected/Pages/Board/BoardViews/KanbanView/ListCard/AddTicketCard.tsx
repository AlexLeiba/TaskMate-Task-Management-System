"use client";
import { useState } from "react";

import { Plus } from "lucide-react";
import { useStore } from "@/store/useStore";
import { IconButton } from "@/components/ui/iconButton";
import { useMutation } from "@tanstack/react-query";
import { createListCardAction } from "@/app/actions/list";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { TriggerInput } from "../../../../../Shared-protected/TriggerInput";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";

type Props = {
  listId: string;
};
export function AddTicketCard({ listId }: Props) {
  const pathname = usePathname();
  const boardId = pathname.split("/").at(-1) || "";
  const openNewCardInput = useStore((state) => state.openNewCardInput);
  const [isOpenedNewCardInput, setIsOpenedNewCardInput] = useState(false);

  const isCardInputOpened =
    openNewCardInput.id === listId
      ? openNewCardInput.isOpen
      : isOpenedNewCardInput;

  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.pages.board.kanbanView.lists.createListCard],
    mutationFn: createListCardAction,
    onSuccess: () => {
      toast.dismiss(QUERY_KEYS.pages.board.kanbanView.lists.createListCard);
      toast.success("List card changed");
      setIsOpenedNewCardInput(false);
    },
    onError: ({ message }) => {
      toast.dismiss(QUERY_KEYS.pages.board.kanbanView.lists.createListCard);
      toast.error(message || "Error creating list card, please try again");
    },
  });

  function handleAddNewCard(value: { [inputName: string]: string }) {
    mutate({ listId, title: value.title, boardId });
    toast.loading("Creating list card...", {
      id: QUERY_KEYS.pages.board.kanbanView.lists.createListCard,
    });
  }
  return (
    <div className="mt-2">
      <TriggerInput
        disabled={isPending}
        loading={isPending}
        handleSubmitValue={(v) => handleAddNewCard(v)}
        inputName="title"
        placeholder="Type card title here..."
        label="Add a card"
        setIsOpenedTitleInput={setIsOpenedNewCardInput}
        isOpenedTitleInput={isCardInputOpened}
      >
        <IconButton classNameChildren="flex justify-between gap-2">
          <Plus />
          <p>Add a card</p>
        </IconButton>
      </TriggerInput>
    </div>
  );
}
