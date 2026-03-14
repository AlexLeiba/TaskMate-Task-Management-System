"use client";
import { useState } from "react";
import { Ellipsis, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconButton } from "@/components/ui/iconButton";
import { KEYBOARD } from "@/lib/consts";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useMutationState } from "@tanstack/react-query";

const OptionsContent = dynamic(() =>
  import("./OptionsContent").then((m) => m.OptionsContent),
);

type Props = {
  title: string;
  cardId: string;
  listId: string;
  boardId: string;
  cardDetailsId: string;
};
export function TicketCardHeader({
  title,
  cardId,
  listId,
  boardId,
  cardDetailsId,
}: Props) {
  const [isOpenedOptions, setIsOpenedOptions] = useState(false);
  const pendingMutations = useMutationState({
    filters: {
      mutationKey: ["edit-title-card", "copy-card", "delete-card"],
      status: "pending",
    },
  });
  const isLoading = pendingMutations.length > 0;

  return (
    <>
      <Popover open={isOpenedOptions} onOpenChange={setIsOpenedOptions}>
        <PopoverTrigger asChild>
          <IconButton
            className={cn(
              "absolute top-0 right-0",
              isOpenedOptions ? "block" : "lg:hidden md:group-hover:block",
            )}
            disabled={isLoading}
            title="Card options"
            aria-label="Card options"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onKeyDown={(e) => {
              if (e.key === KEYBOARD.ENTER) {
                e.stopPropagation();
              }
            }}
          >
            <Ellipsis />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent align="start" className="max-w-70 ">
          {isOpenedOptions && (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-medium">Card Options</p>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpenedOptions(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === KEYBOARD.ENTER) {
                      e.stopPropagation();
                      setIsOpenedOptions(false);
                    }
                  }}
                  title="Close card options"
                  aria-label="Close card options"
                >
                  <X />
                </IconButton>
              </div>

              <OptionsContent
                defaultTitle={title}
                listId={listId}
                cardId={cardId}
                boardId={boardId}
                cardDetailsId={cardDetailsId}
              />
            </>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
