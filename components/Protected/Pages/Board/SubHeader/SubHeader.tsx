"use client";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Board } from "@/lib/generated/prisma/client";
import { IconButton } from "@/components/ui/iconButton";
import { BoardTabSections } from "./BoardTabSections";
import { DropdownBoardTabSections } from "./DropdownBoardTabSections/DropdownBoardTabSections";
import { useStore } from "@/store/useStore";
import { BoardMemberFilters } from "./BoardMemberFilters";
import { FiltersDropdown } from "./FilterDropdown/FilterDropdown";
import { useResponsive } from "@/hooks/useResponsive";
import { BREAKPOINTS } from "@/lib/breakpoints";
import { RefreshBoardData } from "./RefreshBoardData";
import { BoardTitle } from "./BoardTitle";

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

  const boardTabSections = useStore((state) => state.boardTabSections);

  useEffect(() => {
    if (error.message) {
      toast.error(error.message);
    }
  }, [error.message]);

  return (
    <div className="bg-foreground/70 w-full h-13">
      <div className="  flex justify-between items-center max-w-400  mx-auto px-4">
        {/* Board title */}
        <BoardTitle boardId={boardId} boardTitle={board?.title || ""} />

        <div className="flex items-center gap-2">
          <RefreshBoardData />
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
    </div>
  );
}
