import { useState } from "react";
import { Check } from "lucide-react";
import { LIST_STATUSES } from "@/lib/consts";
import { StatusType } from "@/lib/types";
import { IconButton } from "@/components/ui/iconButton";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { updateListStatusAction } from "@/app/actions/list";
import { useBoardId } from "@/hooks/useBoardId";

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
  const boardId = useBoardId();
  const [statusData, setStatusData] = useState<StatusType>(
    LIST_STATUSES.find((s) => s.value === selectedStatus)!,
  );

  const { mutate: mutateChangeStatus, isPending: isPendingChangeStatus } =
    useMutation({
      mutationKey: ["update-list-status"],
      mutationFn: updateListStatusAction,
      onSuccess: () => {
        toast.dismiss("list-status");
        toast.success("List status changed");
      },
      onError: ({ message }) => {
        toast.dismiss("list-status");
        toast.error(message || "Error changing list status, please try again");
      },
    });

  function handleSelectStatus(status: StatusType) {
    if (!boardId || !listId)
      return toast.error("Something went wrong, please try again");

    handleChangeSelectStatus(status);

    setStatusData(status);
    mutateChangeStatus({ boardId, listId, status: status.value });
    toast.loading("Changing list status...", { id: "list-status" });
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
