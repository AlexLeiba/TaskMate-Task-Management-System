import { IconButton } from "@/components/ui/iconButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRole } from "@/hooks/useRole";
import { KEYBOARD, USER_ROLES } from "@/lib/consts/consts";
import { PrioritiesType } from "@/lib/types";
import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { useMutationState } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { CARD_PRIORITIES } from "@/lib/consts/protected/card";

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
      mutationKey: [QUERY_KEYS.pages.board.kanbanView.cards.editPriority],
      status: "pending",
    },
  });

  const pendingPriority = pendingMutations[0]?.variables as {
    cardId: string;
    priority: PrioritiesType;
  };

  const handleClosePopup = useCallback(() => {
    setIsOpenedOptions(false);
  }, []);

  return (
    <Popover open={isOpenedOptions} onOpenChange={setIsOpenedOptions}>
      {/* TRIGGER */}
      <PopoverTrigger
        asChild
        disabled={
          role === USER_ROLES.member ||
          pendingPriority?.cardId === cardId ||
          !boardId
        }
      >
        <IconButton
          buttonType={role === USER_ROLES.member ? "card" : "default"}
          aria-label="Open Priority "
          title="Open Priority "
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
          data-test="priority-trigger"
          data-selected={priority}
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
                data-test="close-priority-options-button"
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
