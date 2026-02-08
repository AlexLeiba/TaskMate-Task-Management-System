"use client";
import { Edit, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AddNewInput } from "./AddNewInput";
import { useMutation } from "@tanstack/react-query";
import { editBoardTitleAction } from "@/app/actions/board";
import toast from "react-hot-toast";
import { Board } from "@/lib/generated/prisma/client";
import { IconButton } from "@/components/ui/iconButton";

type Props = {
  data: {
    data: Board | null;
    error: { message: string };
  };
  boardId: string;
};
export function SubHeader({ data: { data: board, error }, boardId }: Props) {
  useEffect(() => {
    if (error.message) {
      toast.error(error.message);
    }
  }, [error.message]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["edit-board-title"],
    mutationFn: editBoardTitleAction,
    onSuccess: () => {
      toast.success("Board title updated");
      setShowTitleInput(false);
    },
    onError: ({ message }) =>
      toast.error(message || "Error updating board title, please try again"),
  });
  const [showTitleInput, setShowTitleInput] = useState(false);

  if (!board) return;

  const title =
    board.title.length > 45 ? `${board.title.slice(0, 45)}...` : board.title;
  function handleEditBoardTitle() {
    setShowTitleInput(true);
  }

  async function handleSubmitForm(data: { [inputName: string]: string }) {
    mutate({ boardId, title: data.title });

    // setShowTitleInput(false);
  }
  return (
    <div className="bg-foreground/70 w-full">
      <div className="px-4 flex justify-between items-center max-w-400 mx-auto">
        <AddNewInput
          loading={isPending}
          disabled={isPending}
          handleSubmitValue={(v) => handleSubmitForm(v)}
          inputName="title"
          placeholder="Edit board title here..."
          setIsOpenedTitleInput={setShowTitleInput}
          isOpenedTitleInput={showTitleInput}
        >
          <div className="flex gap-1 items-center">
            <p className="text-lg font-bold line-clamp-1 text-text-secondary">
              {title}
            </p>
            <Button
              disabled={isPending}
              variant={"ghost"}
              onClick={handleEditBoardTitle}
              title="Edit board title"
              className="group"
            >
              <Edit
                size={15}
                className="text-text-secondary group-hover:text-text-primary"
              />
            </Button>
          </div>
        </AddNewInput>

        {/* TODO add org id from params */}
        <Link href={`/dashboard/${board.id}`}>
          <IconButton
            className="p-1"
            title="Close board"
            aria-label="Close board"
          >
            <X size={30} className="text-text-secondary" />
          </IconButton>
        </Link>
      </div>
    </div>
  );
}
