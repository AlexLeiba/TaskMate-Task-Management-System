"use client";
import { useState } from "react";
import { AddNewInput } from "../../AddNewInput";
import { Plus } from "lucide-react";
import { useStore } from "@/store/useStore";
import { IconButton } from "@/components/ui/iconButton";

type Props = {
  listId: string;
  listTitle: string;
};
export function AddTicketCard({ listId, listTitle }: Props) {
  const { openNewCardInput, setOpenNewCardInput } = useStore();
  const [isOpenedNewCardInput, setIsOpenedNewCardInput] = useState(false);

  const isCardInputOpened =
    openNewCardInput.id === listId
      ? openNewCardInput.isOpen
      : isOpenedNewCardInput;

  function handleAddNewCard(value: { [inputName: string]: string }) {
    console.log("🚀 ~ handleAddNewCard ~ value:", value);
  }
  return (
    <div className="mt-2">
      <AddNewInput
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
