import { IconButton } from "@/components/ui/iconButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRole } from "@/hooks/useRole";
import { CARD_PRIORITIES, KEYBOARD, USER_ROLES } from "@/lib/consts";
import { PrioritiesType } from "@/lib/types";
import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { useMutationState } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const PriorityContent = dynamic(() =>
  import("./PriorityContent").then((m) => m.PriorityContent),
);

type Props = {
  priority: PrioritiesType;
  boardId: string;
  listId: string;
  cardId: string;
};
export function Priority({ priority, boardId, listId, cardId }: Props) {
  const [isOpenedOptions, setIsOpenedOptions] = useState(false);

  const role = useRole();

  const pendingMutations = useMutationState({
    filters: {
      mutationKey: ["edit-priority"],
      status: "pending",
    },
  });
  const isPending = pendingMutations.length > 0;

  const handleClosePopup = useCallback(() => {
    setIsOpenedOptions(false);
  }, []);

  return (
    <Popover open={isOpenedOptions} onOpenChange={setIsOpenedOptions}>
      {/* TRIGGER */}
      <PopoverTrigger
        asChild
        disabled={role === USER_ROLES.member || isPending}
      >
        <IconButton
          buttonType={role === USER_ROLES.member ? "card" : "default"}
          disabled={role === USER_ROLES.member || isPending}
          aria-label="Open Priority popover"
          title="Open Priority popover"
          onClick={(e) => {
            if (role === USER_ROLES.admin) e.stopPropagation();
          }}
          onKeyDown={(e) => {
            if (e.key === KEYBOARD.ENTER && role === USER_ROLES.admin) {
              e.stopPropagation();
            }
          }}
          className=""
          classNameChildren="ring ring-white flex justify-center items-center p-2 size-7 cursor-pointer hover:opacity-70 rounded-sm"
        >
          {priority !== "none" ? (
            <span className="text-lg">
              {CARD_PRIORITIES.find((p) => p.value === priority)?.icon}
            </span>
          ) : (
            <span className="text-lg">...</span>
          )}
        </IconButton>
      </PopoverTrigger>

      <PopoverContent align="start" className="max-w-50 ">
        {isOpenedOptions && (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-medium">Priority</p>
              <IconButton
                // disabled={isPending}
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
                className="cursor-pointer hover:opacity-80"
                title="Close priority popover"
                aria-label="Close priority popover"
              >
                <X />
              </IconButton>
            </div>
            {/* CONTENT */}
            <PriorityContent
              handleClosePopup={handleClosePopup}
              boardId={boardId}
              listId={listId}
              cardId={cardId}
              priority={priority}
            />
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
