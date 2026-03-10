"use client";
import { Edit, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AddNewInput } from "../AddNewInput";
import { useMutation } from "@tanstack/react-query";
import { editBoardTitleAction } from "@/app/actions/board";
import toast from "react-hot-toast";
import { Board } from "@/lib/generated/prisma/client";
import { IconButton } from "@/components/ui/iconButton";
import { useRole } from "@/hooks/useRole";
import { USER_ROLES } from "@/lib/consts";
import { BoardTabSections } from "./BoardTabSections";
import { DropdownBoardTabSections } from "./DropdownBoardTabSections/DropdownBoardTabSections";
import { useStore } from "@/store/useStore";
import { BoardMemberFilters } from "./BoardMemberFilters";
import { FiltersDropdown } from "./FilterDropdown/FilterDropdown";
import { useResponsive } from "@/hooks/useResponsive";
import { BREAKPOINTS } from "@/lib/breakpoints";
import { cn } from "@/lib/utils";

type Props = {
  data: {
    data: Board | null;
    error: { message: string };
  };
  boardId: string;
  orgId: string | undefined | null;
};
export function SubHeader({
  data: { data: board, error },
  boardId,
  orgId,
}: Props) {
  const isTablet = useResponsive(BREAKPOINTS.lg);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const role = useRole();

  const { boardTabSections } = useStore();

  useEffect(() => {
    if (error.message) {
      toast.error(error.message);
    }
  }, [error.message]);

  const { mutate: mutateEditBoardTitle, isPending: isPendingEditBoardTitle } =
    useMutation({
      mutationKey: ["edit-board-title"],
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
    <div className="bg-foreground/70 w-full h-13">
      <div className="  flex justify-between items-center max-w-400  mx-auto px-4">
        <div className="flex items-center  w-90 ">
          <AddNewInput
            title={board?.title}
            defaultValue={board?.title}
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
            className="px-0"
            classNameContainer="px-0"
          >
            <div className="flex  items-center">
              <p
                className={cn(
                  "text-lg font-bold line-clamp-1 text-text-secondary ",
                )}
                title={board?.title}
              >
                {board?.title}
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
                className={cn(
                  role === USER_ROLES.member && "opacity-0",
                  "group",
                )}
              >
                <Edit
                  size={15}
                  className="text-text-secondary group-hover:text-text-primary"
                />
              </Button>
            </div>
          </AddNewInput>
        </div>

        <div className="flex items-center gap-2">
          {boardTabSections !== "summary" && (
            <>
              {/* FILTER BY MEMBER ON DESKTOP*/}
              {!isTablet && <BoardMemberFilters />}

              {/* FILTERS DROPDOWN ON TABLET AND MOBILE */}
              <FiltersDropdown />
            </>
          )}

          {/* TABS SECTIONS DROPDOWN ON MOBILE */}
          {isTablet && <DropdownBoardTabSections />}

          {/* TABS SECTIONS ON DESKTOP AND TABLET */}
          <BoardTabSections />

          {/* CLOSE BOARD BUTTON */}
          <Link
            href={`/dashboard/${orgId || ""}`}
            title="Close board"
            aria-label="Close board"
          >
            <IconButton className="p-1">
              <X size={30} className="text-text-secondary" />
            </IconButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
