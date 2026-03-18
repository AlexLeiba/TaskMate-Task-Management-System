import { PrioritiesType } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CARD_PRIORITIES, USER_ROLES } from "@/lib/consts";
import { PrioritySkeleton } from "./PrioritySkeleton";
import { PriorityType } from "@/lib/generated/prisma/enums";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editPriorityAction } from "@/app/actions/card";
import { useBoardId } from "@/hooks/useBoardId";
import { useRole } from "@/hooks/useRole";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";

type Props = {
  priority: PriorityType | undefined;
  listId: string | undefined;
  cardId: string | undefined;
};
export function PriorityDropdown({ priority = "none", listId, cardId }: Props) {
  const boardId = useBoardId();
  const role = useRole();

  const { mutate, isPending, data } = useMutation({
    mutationFn: editPriorityAction,
    mutationKey: [QUERY_KEYS.pages.board.cardDetails.editPriority],
    onSuccess: () => {
      toast.dismiss(QUERY_KEYS.pages.board.cardDetails.editPriority);
      toast.success("Card priority was changed");
    },
    onError: ({ message }) => {
      toast.dismiss(QUERY_KEYS.pages.board.cardDetails.editPriority);
      toast.error(message || "Error editing card priority, please try again");
    },
  });

  const updatedPriorityData = data?.data?.priority;

  function handleSelectPriority(priorityValue: PrioritiesType) {
    toast.loading("Editing card priority", {
      id: QUERY_KEYS.pages.board.cardDetails.editPriority,
    });

    if (!boardId || !listId || !cardId)
      return toast.error("Something went wrong, please try again");

    mutate({ priority: priorityValue, boardId, listId, cardId });
  }
  if (!cardId || !listId) return <PrioritySkeleton />;
  return (
    <Select
      onValueChange={(v) => {
        if (v === priority) return;
        handleSelectPriority(v as PrioritiesType);
      }}
      value={updatedPriorityData || priority}
    >
      <SelectTrigger
        title="Select Priority"
        aria-label="Select Priority"
        buttonType="card"
        disabled={isPending || role === USER_ROLES.member}
        className="w-full flex justify-between text-left h-11!"
      >
        <SelectValue placeholder="Select Priority" className="h-11" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Priority</SelectLabel>
          {CARD_PRIORITIES.map((priority) => (
            <SelectItem
              disabled={isPending}
              value={priority.value}
              title={priority.label}
              aria-label={priority.label}
              key={priority.value}
            >
              <div className="flex items-center gap-2">
                <p className="text-base ">{priority.icon}</p>
                <p className="text-base ">{priority.label}</p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
