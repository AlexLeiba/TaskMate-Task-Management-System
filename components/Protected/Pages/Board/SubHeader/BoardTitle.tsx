"use client";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TriggerInput } from "../../../Shared-protected/TriggerInput";
import { useMutation } from "@tanstack/react-query";
import { editBoardTitleAction } from "@/app/actions/board";
import toast from "react-hot-toast";
import { USER_ROLES } from "@/lib/consts/consts";
import { cn } from "@/lib/utils";
import { useRole } from "@/hooks/useRole";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";

type Props = {
  boardId: string;
  boardTitle: string;
};
export function BoardTitle({ boardId, boardTitle }: Props) {
  const role = useRole();
  const [showTitleInput, setShowTitleInput] = useState(false);
  const { mutate: mutateEditBoardTitle, isPending: isPendingEditBoardTitle } =
    useMutation({
      mutationKey: [QUERY_KEYS.pages.board.kanbanView.lists.editBoardTitle],
      mutationFn: editBoardTitleAction,
      onSuccess: () => {
        toast.success("Board title updated");
        setShowTitleInput(false);
      },
      onError: ({ message }) =>
        toast.error(message || "Error updating board title, please try again"),
    });

  function handleEditBoardTitle() {
    setShowTitleInput(true);
  }

  async function handleSubmitForm(data: { [inputName: string]: string }) {
    if (!boardId) return toast.error("Board not found, please try again");
    mutateEditBoardTitle({ boardId, title: data.title });
  }
  return (
    <div className="flex items-center  w-90 ">
      <TriggerInput
        title={boardTitle}
        defaultValue={boardTitle}
        loading={isPendingEditBoardTitle}
        disabled={isPendingEditBoardTitle}
        handleSubmitValue={(v) => handleSubmitForm(v)}
        inputName="title"
        placeholder="Edit board title here..."
        setIsOpenedTitleInput={
          isPendingEditBoardTitle || role === USER_ROLES.member
            ? () => {}
            : setShowTitleInput
        }
        isOpenedTitleInput={showTitleInput}
      >
        <div className="flex  items-center">
          <p
            className={cn(
              "text-lg font-bold line-clamp-1 text-text-secondary ",
            )}
            title={boardTitle}
          >
            {boardTitle}
          </p>

          <Button
            disabled={isPendingEditBoardTitle}
            variant={"ghost"}
            onClick={
              isPendingEditBoardTitle || role === USER_ROLES.member
                ? () => {}
                : handleEditBoardTitle
            }
            title="Edit board title"
            aria-label="Edit board title"
            className={cn(role === USER_ROLES.member && "opacity-0", "group")}
          >
            <Edit
              size={15}
              className="text-text-secondary group-hover:text-text-primary"
            />
          </Button>
        </div>
      </TriggerInput>
    </div>
  );
}
