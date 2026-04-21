import { useState } from "react";
import { Check } from "lucide-react";

import { StatusType } from "@/lib/types";
import { IconButton } from "@/components/ui/iconButton";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateListStatusAction } from "@/app/actions/list";
import { useBoardId } from "@/hooks/useBoardId";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { LIST_STATUSES } from "@/lib/consts/protected/list";

type Props = {
  selectedStatus: string;
  listId: string;
  handleChangeSelectStatus: (status: StatusType) => void;
};
export function ListStatusesContent({
  selectedStatus,
  listId,
  handleChangeSelectStatus,
}: Props) {
  const queryClient = useQueryClient();
  const boardId = useBoardId();
  const [statusData, setStatusData] = useState<StatusType>(
    LIST_STATUSES.find((s) => s.value === selectedStatus)!,
  );

  const { mutate: mutateChangeStatus, isPending: isPendingChangeStatus } =
    useMutation({
      mutationKey: [
        QUERY_KEYS.pages.board.kanbanView.lists.statuses.updateStatus,
      ],
      mutationFn: updateListStatusAction,
      onSuccess: () => {
        toast.success("List status changed", {
          id: QUERY_KEYS.pages.board.kanbanView.lists.statuses.updateStatus,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.hooks.useBoardListData],
        });
      },
      onError: ({ message }) => {
        toast.dismiss(
          QUERY_KEYS.pages.board.kanbanView.lists.statuses.updateStatus,
        );
        toast.error(message || "Error changing list status, please try again");
      },
    });

  function handleSelectStatus(status: StatusType) {
    if (!boardId || !listId)
      return toast.error("Something went wrong, please try again");

    handleChangeSelectStatus(status);

    setStatusData(status);
    mutateChangeStatus({ boardId, listId, status: status.value });
    toast.loading("Changing list status...", {
      id: QUERY_KEYS.pages.board.kanbanView.lists.statuses.updateStatus,
    });
  }
  return (
    <>
      <div className="flex flex-col ">
        {LIST_STATUSES.map((status) => (
          <IconButton
            disabled={isPendingChangeStatus}
            aria-label={status.label}
            title={status.label}
            onClick={() => handleSelectStatus(status)}
            key={status.value}
            className="p-2"
            data-test={`select-list-status-button`}
          >
            <div className="flex justify-between">
              <div className="flex gap-2 items-center ">
                {status.icon}
                <p key={status.label}>{status.label}</p>
              </div>

              {statusData?.value === status.value && (
                <Check size={20} className="text-green-500 " />
              )}
            </div>
          </IconButton>
        ))}
      </div>
    </>
  );
}
