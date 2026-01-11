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
  function handleCloseBoard() {}
  function handleEditBoardTitle() {
    setShowTitleInput(true);
  }

  function handleSubmitForm(data: EditBoardTitleSchemaType) {
    console.log("🚀 ~ handleEditBoardTitle ~ data:", data);
    setShowTitleInput(false);
  }
  return (
    <div className="p-4 bg-gray-800/50 w-full  text-white ">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        {showTitleInput ? (
          <div className="flex gap-1 items-center">
            <form action="" onSubmit={handleSubmit(handleSubmitForm)}>
              <Input
                autoFocus
                {...register("title")}
                error={errors.title?.message}
              />
            </form>
            <button
              onClick={() => setShowTitleInput(false)}
              className="p-2 cursor-pointer hover:opacity-70"
              title="Close board"
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <div className="flex gap-1 items-center">
            <p className="text-lg font-bold line-clamp-1">{title}</p>
            <button
              onClick={handleEditBoardTitle}
              className="p-2 cursor-pointer hover:opacity-70"
              title="Edit board title"
            >
              <Edit size={15} />
            </button>
          </div>
        )}
        <Link href={`/dashboard/${boardId}`}>
          {/* TODO add org id from params */}
          <button
            onClick={handleCloseBoard}
            className="p-2 cursor-pointer hover:opacity-70"
            title="Close board"
          >
            <X />
          </button>
        </Link>
      </div>
    </div>
  );
}
