"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { IconButton } from "@/components/ui/iconButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createListAction } from "@/app/actions/list";
import toast from "react-hot-toast";
import { TriggerInput } from "../../../../../Shared-protected/TriggerInput";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";

type Props = { boardId: string };
export function AddNewListCard({ boardId }: Props) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.pages.board.kanbanView.lists.createListCard],
    mutationFn: createListAction,
    onSuccess: () => {
      toast.success("List created", {
        id: QUERY_KEYS.pages.board.kanbanView.lists.createListCard,
      });
      setIsOpen(false);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.hooks.useBoardListData],
      });
    },
    onError: ({ message }) => {
      toast.error(message || "Error creating list, please try again", {
        id: QUERY_KEYS.pages.board.kanbanView.lists.createListCard,
      });
    },
  });

  async function handleAddNewList(value: { [inputName: string]: string }) {
    mutate({ boardId, title: value.title });
    toast.loading("Creating list...", {
      id: QUERY_KEYS.pages.board.kanbanView.lists.createListCard,
    });
  }
  return (
    <div className="shrink-0 flex flex-col justify-between  bg-card-foreground text-text-primary w-70 rounded-sm active:bg-card hover:ring-2 hover:ring-gray-400 py-1">
      <TriggerInput
        disabled={isPending}
        loading={isPending}
        handleSubmitValue={(v) => handleAddNewList(v)}
        inputName="title"
        placeholder="List title here..."
        label="Add new list"
        setIsOpenedTitleInput={setIsOpen}
        isOpenedTitleInput={isOpen}
        classNameContainer=""
      >
        <div className="flex justify-between ">
          <p className="text-base font-medium">Add new list</p>
          <IconButton
            title="Add new list card"
            aria-label="Add new list card"
            onClick={() => setIsOpen(false)}
          >
            <Plus />
          </IconButton>
        </div>
      </TriggerInput>
    </div>
  );
}
