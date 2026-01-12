"use client";

import { ListDataType } from "@/lib/types";
import { Check, Circle, X } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LIST_STATUSES } from "@/lib/consts";
import { Button } from "@/components/ui/button";
import { ListStatuses } from "./ListStatuses";
import { ListOptions } from "./ListOptions";
import { AddNewInput } from "../../AddNewInput";

type Props = {
  listData: ListDataType;
};
export function ListCard({ listData }: Props) {
  const [selectedStatus, setSelectedStatus] = useState(listData.status);
  const [isOpenedTitleInput, setIsOpenedTitleInput] = useState(false);

  function handleSelectStatus(status: string) {
    // TODO api req with new status
    // If success show optimistic status
    setSelectedStatus(status);
    // setIsOpenedStatus(false);
  }
  return (
    <li className=" shrink-0 h-full py-2 px-2 bg-gray-600 text-white w-70 rounded-md  ">
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          {!isOpenedTitleInput && (
            <ListStatuses selectedStatus={listData.status} />
          )}

          <AddNewInput
            handleSubmitValue={(v) => console.log("v", v)}
            inputName="title"
            placeholder="Edit list title here..."
            label="Edit list title"
            setIsOpenedTitleInput={setIsOpenedTitleInput}
            isOpenedTitleInput={isOpenedTitleInput}
          >
            <p>{listData.title}</p>
          </AddNewInput>
        </div>
        {!isOpenedTitleInput && <ListOptions />}
      </div>
      {/* <p>{listData.title}</p> */}
    </li>
  );
}
