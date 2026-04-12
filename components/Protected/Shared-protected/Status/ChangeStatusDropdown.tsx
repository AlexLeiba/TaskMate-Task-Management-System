import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editListStatusCardAction } from "@/app/actions/card";
import { useBoardId } from "@/hooks/useBoardId";
import { ChangeStatusSkeleton } from "./ChangeStatusSkeleton";
import { StatusType } from "@/lib/generated/prisma/enums";
import { List } from "@/lib/generated/prisma/client";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { CHANGE_LIST_STATUS } from "@/lib/consts/protected/list";

type Props = {
  listId: string | undefined;
  cardId: string | undefined;
  listsData: Pick<List, "id" | "status" | "title">[];
};
export function ChangeStatusDropdown({ listId, cardId, listsData }: Props) {
  const boardId = useBoardId();

  const {
    mutate: mutateCardStatus,
    isPending,
    data,
  } = useMutation({
    mutationFn: editListStatusCardAction,
    mutationKey: [QUERY_KEYS.pages.board.kanbanView.cardDetails.editStatus],
    onSuccess: () => {
      toast.dismiss(QUERY_KEYS.pages.board.kanbanView.cardDetails.editStatus);
      toast.success("Card card status was changed");
    },
    onError: ({ message }) => {
      toast.dismiss(QUERY_KEYS.pages.board.kanbanView.cardDetails.editStatus);
      toast.error(message || "Error editing card status, please try again");
    },
  });

  const updatedCardStatus = data?.data;

  function handleSelectNewStatus(newListId: StatusType) {
    toast.loading("Editing card status", {
      id: QUERY_KEYS.pages.board.kanbanView.cardDetails.editStatus,
    });

    if (!boardId || !listId || !cardId)
      return toast.error("Something went wrong, please try again");

    mutateCardStatus({ boardId, listId, cardId, newListId });
  }
  if (!cardId || !listId) return <ChangeStatusSkeleton />;
  return (
    <Select
      onValueChange={(v) => {
        if (!listId) {
          return toast.error("Something went wrong, please try again");
        }
        if (v === listId) return;
        handleSelectNewStatus(v as StatusType);
      }}
      value={updatedCardStatus || listId}
    >
      <SelectTrigger
        aria-label="Select status"
        title="Select status"
        buttonType="card"
        disabled={isPending}
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
