"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { AddNewInput } from "../../AddNewInput";
import { IconButton } from "@/components/ui/iconButton";

export function AddNewListCard() {
  const [isOpen, setIsOpen] = useState(false);

  function handleAddNewList(value: { [inputName: string]: string }) {
    console.log("🚀 ~ handleAddNewList ~ value:", value);
  }
  return (
    <li className="shrink-0 h-full flex flex-col justify-between p-2 dark:bg-gray-500 dark:text-white w-70 rounded-sm ">
      <AddNewInput
        handleSubmitValue={(v) => handleAddNewList(v)}
        inputName="title"
        placeholder="List title here..."
        label="Add new list"
        setIsOpenedTitleInput={setIsOpen}
        isOpenedTitleInput={isOpen}
      >
        <div className="flex justify-between">
          <p>Add new list</p>
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
