"use client";
import { Edit, X } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditBoardTitleSchema,
  type EditBoardTitleSchemaType,
} from "@/lib/schemas";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  function handleSubmitForm(data: EditBoardTitleSchemaType) {
    // TODO, submit to api server
    console.log("🚀 ~ handleEditBoardTitle ~ data:", data);
    setShowTitleInput(false);
  }
  return (
    <div className=" py-1 bg-gray-800/50 w-full  text-white ">
      <div className="px-4 flex justify-between items-center max-w-7xl mx-auto">
        {showTitleInput ? (
          <div className="flex gap-1 items-center">
            <form action="" onSubmit={handleSubmit(handleSubmitForm)}>
              <Input
                autoFocus
                {...register("title")}
                error={errors.title?.message}
                placeholder="board title..."
              />
            </form>
            <Button
              variant={"ghost"}
              onClick={handleCloseBoard}
              title="Close board"
            >
              <X size={15} />
            </Button>
          </div>
        ) : (
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
        )}
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
