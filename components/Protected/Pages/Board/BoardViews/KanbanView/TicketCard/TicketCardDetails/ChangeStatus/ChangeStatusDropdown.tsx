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
import { LIST_STATUSES, USER_ROLES } from "@/lib/consts";

import { PriorityType } from "@/lib/generated/prisma/enums";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editPriorityAction } from "@/app/actions/card";
import { useBoardId } from "@/hooks/useBoardId";
import { useRole } from "@/hooks/useRole";
import { ChangeStatusSkeleton } from "./ChangeStatusSkeleton";

type Props = {
  priority: PriorityType | undefined;
  listId: string | undefined;
  cardId: string | undefined;
};
export function ChangeStatusDropdown({
  priority = "none",
  listId,
  cardId,
}: Props) {
  const boardId = useBoardId();
  const role = useRole();

  const { mutate, isPending, data } = useMutation({
    mutationFn: editPriorityAction,
    mutationKey: ["card-status"],
    onSuccess: () => {
      toast.dismiss("card-status");
      toast.success("Card card status was changed");
    },
    onError: ({ message }) => {
      toast.dismiss("card-status");
      toast.error(message || "Error editing card status, please try again");
    },
  });

  const updatedPriorityData = data?.data?.priority;

  function handleSelectPriority(priorityValue: PrioritiesType) {
    toast.loading("Editing card status", { id: "card-status" });

    if (!boardId || !listId || !cardId)
      return toast.error("Something went wrong, please try again");

    mutate({ priority: priorityValue, boardId, listId, cardId });
  }
  if (!cardId || !listId) return <ChangeStatusSkeleton />;
  return (
    <Select
      onValueChange={(v) => {
        if (v === priority) return;
        handleSelectPriority(v as PrioritiesType);
      }}
      value={updatedPriorityData || priority}
    >
      <SelectTrigger
        aria-label="Select status"
        title="Select status"
        buttonType="card"
        disabled={isPending || role === USER_ROLES.member}
        className="w-full flex justify-between text-left h-11!"
      >
        <SelectValue placeholder="Select status" className="h-11" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Statuses</SelectLabel>
          {LIST_STATUSES.map((status) => (
            <SelectItem
              disabled={isPending}
              value={status.value}
              title={status.label}
              aria-label={status.label}
              key={status.value}
            >
              <div className="flex items-center gap-2">
                <p className="text-base ">{status.icon}</p>
                <p className="text-base ">{status.label}</p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
