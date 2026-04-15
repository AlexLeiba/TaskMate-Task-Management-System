"use client";
import { useState } from "react";

import { Plus } from "lucide-react";
import { useStore } from "@/store/useStore";
import { IconButton } from "@/components/ui/iconButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createListCardAction } from "@/app/actions/list";
import toast from "react-hot-toast";
import { TriggerInput } from "../../../../../Shared-protected/TriggerInput";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { useBoardId } from "@/hooks/useBoardId";

type Props = {
  listId: string;
};
export function AddTicketCard({ listId }: Props) {
  const queryClient = useQueryClient();
  const boardId = useBoardId();
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
      toast.success("List card changed", {
        id: QUERY_KEYS.pages.board.kanbanView.lists.createListCard,
      });
      setIsOpenedNewCardInput(false);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.hooks.useBoardListData],
      });
    },
    onError: ({ message }) => {
      toast.error(message || "Error creating list card, please try again", {
        id: QUERY_KEYS.pages.board.kanbanView.lists.createListCard,
      });
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
