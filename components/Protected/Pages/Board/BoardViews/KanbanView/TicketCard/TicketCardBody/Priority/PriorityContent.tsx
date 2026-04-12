import { editPriorityAction } from "@/app/actions/card";
import { IconButton } from "@/components/ui/iconButton";
import { KEYBOARD } from "@/lib/consts/consts";
import { CARD_PRIORITIES } from "@/lib/consts/protected/card";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { PrioritiesType, PriorityType } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { Check } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  boardId: string;
  listId: string;
  cardId: string;
  priority: PrioritiesType;
  handleClosePopup: () => void;
};

export function PriorityContent({
  boardId,
  listId,
  cardId,
  priority,
  handleClosePopup,
}: Props) {
  const { mutate, isPending } = useMutation({
    mutationFn: editPriorityAction,
    mutationKey: [QUERY_KEYS.pages.board.kanbanView.cards.editPriority],
    onSuccess: () => {
      toast.dismiss(QUERY_KEYS.pages.board.kanbanView.cards.editPriority);
      toast.success("Card priority was changed");
    },
    onError: ({ message }) => {
      toast.dismiss(QUERY_KEYS.pages.board.kanbanView.cards.editPriority);
      toast.error(message || "Error editing card priority, please try again");
    },
  });

  function handleSelectPriority(priorityValue: PriorityType) {
    handleClosePopup();
    toast.loading("Editing card priority", {
      id: QUERY_KEYS.pages.board.kanbanView.cards.editPriority,
    });
    mutate({ priority: priorityValue.value, boardId, listId, cardId });
  }
  return (
    <div className="flex flex-col gap-1 items-start pl-2 ">
      {/* PRIORITIES */}
      {CARD_PRIORITIES.map((data) => (
        <IconButton
          disabled={isPending}
          title={data.label}
          aria-label={data.label}
          key={data.value}
          className=" p-1.5 w-full"
          classNameChildren=" flex items-center justify-between gap-1  rounded-sm "
          onClick={(e) => {
            e.stopPropagation();
            if (priority === data.value) return;
            handleSelectPriority(data);
          }}
          onKeyDown={(e) => {
            if (e.key === KEYBOARD.ENTER) {
              e.stopPropagation();
              if (priority === data.value) return;
              handleSelectPriority(data);
            }
          }}
        >
          <div className="flex gap-2 items-center">
            {data.icon}
            <p className="text-lg">{data.label}</p>
          </div>
          {priority === data.value && <Check className="text-green-600" />}
        </IconButton>
      ))}
    </div>
  );
}
