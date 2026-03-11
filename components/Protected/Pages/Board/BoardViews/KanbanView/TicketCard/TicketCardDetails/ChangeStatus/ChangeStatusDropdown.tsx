import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CHANGE_LIST_STATUS, USER_ROLES } from "@/lib/consts";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editListStatusCardAction } from "@/app/actions/card";
import { useBoardId } from "@/hooks/useBoardId";
import { useRole } from "@/hooks/useRole";
import { ChangeStatusSkeleton } from "./ChangeStatusSkeleton";
import { StatusType } from "@/lib/generated/prisma/enums";
import { List } from "@/lib/generated/prisma/client";

type Props = {
  listId: string | undefined;
  cardId: string | undefined;
  currentStatusType: Pick<List, "id" | "status" | "title"> | undefined;
  listsData: Pick<List, "id" | "status" | "title">[];
};
export function ChangeStatusDropdown({
  listId,
  cardId,
  currentStatusType,
  listsData,
}: Props) {
  const boardId = useBoardId();
  const role = useRole();
  const queryClient = useQueryClient();

  const {
    mutate: mutateCardStatus,
    isPending,
    data,
  } = useMutation({
    mutationFn: editListStatusCardAction,
    mutationKey: ["card-status"],
    onSuccess: () => {
      toast.dismiss("card-status");
      toast.success("Card card status was changed");
      queryClient.invalidateQueries({ queryKey: ["card-details"] });
    },
    onError: ({ message }) => {
      toast.dismiss("card-status");
      toast.error(message || "Error editing card status, please try again");
    },
  });

  const updatedCardStatus = data?.data;

  function handleSelectNewStatus(newListId: StatusType) {
    toast.loading("Editing card status", { id: "card-status" });

    if (!boardId || !listId || !cardId)
      return toast.error("Something went wrong, please try again");

    mutateCardStatus({ boardId, listId, cardId, newListId });
  }
  if (!cardId || !listId) return <ChangeStatusSkeleton />;
  return (
    <Select
      onValueChange={(v) => {
        if (!currentStatusType?.id) {
          return toast.error("Something went wrong, please try again");
        }
        if (v === currentStatusType?.id) return;
        handleSelectNewStatus(v as StatusType);
      }}
      value={updatedCardStatus || currentStatusType?.id}
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
          {listsData.map((list) => (
            <SelectItem
              disabled={isPending}
              value={list.id}
              title={list.title}
              aria-label={list.title}
              key={list.id}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {CHANGE_LIST_STATUS[list.status].icon}
                  <span className="text-base">{list.title}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
