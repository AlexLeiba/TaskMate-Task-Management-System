"use client";
import { Edit, X } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditBoardTitleSchema } from "@/lib/schemas";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { AddNewInput } from "./AddNewInput";

export function SubHeader({
  boardId,
  boardTitle,
}: {
  boardId: string;
  boardTitle: string;
}) {
  const [showTitleInput, setShowTitleInput] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { title: boardTitle },
    resolver: zodResolver(EditBoardTitleSchema),
  });

  const title =
    boardTitle.length > 45 ? `${boardTitle.slice(0, 45)}...` : boardTitle;

  function handleCloseBoard() {
    setShowTitleInput(false);
  }

  function handleEditBoardTitle() {
    setShowTitleInput(true);
  }

  function handleSubmitForm(data: { [inputName: string]: string }) {
    // TODO, submit to api server
    console.log("🚀 ~ handleEditBoardTitle ~ data:", data);
    setShowTitleInput(false);
  }
  return (
    <div className=" bg-gray-800/70 w-full  text-white ">
      <div className="px-4 flex justify-between items-center max-w-400 mx-auto">
        <AddNewInput
          handleSubmitValue={(v) => handleSubmitForm(v)}
          inputName="title"
          placeholder="Edit board title here..."
          setIsOpenedTitleInput={setShowTitleInput}
          isOpenedTitleInput={showTitleInput}
        >
          <div className="flex gap-1 items-center">
            <p className="text-lg font-bold line-clamp-1">{title}</p>
            <Button
              variant={"ghost"}
              onClick={handleEditBoardTitle}
              title="Edit board title"
            >
              <Edit size={15} />
            </Button>
          </div>
        </AddNewInput>

        {/* TODO add org id from params */}
        <Link href={`/dashboard/${boardId}`}>
          <Button variant={"ghost"} title="Close board">
            <X />
          </Button>
        </Link>
      </div>
    </div>
  );
}
