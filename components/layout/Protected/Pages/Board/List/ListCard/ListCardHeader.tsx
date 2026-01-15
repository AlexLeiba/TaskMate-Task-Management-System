"use client";
import { useState } from "react";

import { ListStatuses } from "./ListStatuses";
import { ListOptions } from "./ListOptions";
import { AddNewInput } from "../../AddNewInput";
import { useStore } from "@/store/useStore";

type Props = {
  status: string;
  title: string;
  listId: string;
};
export function ListCardHeader({ status, title, listId }: Props) {
  const [isOpenedTitleInput, setIsOpenedTitleInput] = useState(false);
  const { openTitleInput, setOpenTitleInput } = useStore();
  console.log("🚀 ~ ListCardHeader ~ isOpenedTitleInput:", openTitleInput);
  const isInputOpened =
    openTitleInput.id === listId ? openTitleInput.isOpen : isOpenedTitleInput;

  function handleSubmitListTitle(value: { [inputName: string]: string }) {
    console.log("🚀 ~ handleSubmitListTitle ~ value:", value);
    // TODO, submit new list title to server
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-1 items-center">
          {/* STATUSES */}
          {!isInputOpened && <ListStatuses selectedStatus={status} />}

          {/* ADD NEW LIST / LIST TITLE*/}
          <AddNewInput
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
