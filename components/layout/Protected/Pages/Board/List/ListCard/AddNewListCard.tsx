"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { AddNewInput } from "../../AddNewInput";
import { IconButton } from "@/components/ui/iconButton";
import { useMutation } from "@tanstack/react-query";
import { createListAction } from "@/app/actions/list";
import toast from "react-hot-toast";

type Props = { boardId: string };
export function AddNewListCard({ boardId }: Props) {
  const { mutate, isPending } = useMutation({
    mutationFn: createListAction,
    onSuccess: () => {
      toast.dismiss("create-list");
      toast.success("List created");
      setIsOpen(false);
    },
    onError: ({ message }) => {
      toast.dismiss("create-list");
      toast.error(message || "Error creating list, please try again");
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  async function handleAddNewList(value: { [inputName: string]: string }) {
    mutate({ boardId, title: value.title });
    toast.loading("Creating list...", { id: "create-list" });
  }
  return (
    <li className="shrink-0 h-full flex flex-col justify-between p-2  dark:bg-gray-700 dark:text-white w-70 rounded-sm ">
      <AddNewInput
        disabled={isPending}
        loading={isPending}
        handleSubmitValue={(v) => handleAddNewList(v)}
        inputName="title"
        placeholder="List title here..."
        label="Add new list"
        setIsOpenedTitleInput={setIsOpen}
        isOpenedTitleInput={isOpen}
      >
        <div className="flex justify-between">
          <p className="text-base font-medium">Add new list</p>
          <IconButton
            title="Add new list card"
            aria-label="Add new list card"
            onClick={() => setIsOpen(false)}
          >
            <Plus />
          </IconButton>
        </div>
      </AddNewInput>
    </li>
  );
}
