"use client";
import { useState } from "react";
import { AddNewInput } from "../../AddNewInput";
import { Plus } from "lucide-react";
import { useStore } from "@/store/useStore";
import { IconButton } from "@/components/ui/iconButton";
import { useMutation } from "@tanstack/react-query";
import { createListCardAction } from "@/app/actions/list";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

type Props = {
  listId: string;
};
export function AddTicketCard({ listId }: Props) {
  const pathname = usePathname();
  const boardId = pathname.split("/").at(-1) || "";
  const { openNewCardInput } = useStore();
  const [isOpenedNewCardInput, setIsOpenedNewCardInput] = useState(false);

  const isCardInputOpened =
    openNewCardInput.id === listId
      ? openNewCardInput.isOpen
      : isOpenedNewCardInput;

  const { mutate, isPending } = useMutation({
    mutationFn: createListCardAction,
    onSuccess: () => {
      toast.dismiss("list-card");
      toast.success("List card changed");
      setIsOpenedNewCardInput(false);
    },
    onError: ({ message }) => {
      toast.dismiss("list-card");
      toast.error(message || "Error creating list card, please try again");
    },
  });

  function handleAddNewCard(value: { [inputName: string]: string }) {
    mutate({ listId, title: value.title, boardId });
    toast.loading("Creating list card...", { id: "list-card" });
  }
  return (
    <div className="mt-2">
      <AddNewInput
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
      </AddNewInput>
    </div>
  );
}
