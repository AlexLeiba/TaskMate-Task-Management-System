import { useCallback, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LIST_STATUSES, USER_ROLES } from "@/lib/consts";
import { StatusType } from "@/lib/types";
import { IconButton } from "@/components/ui/iconButton";
import { useRole } from "@/hooks/useRole";
import dynamic from "next/dynamic";
import { X } from "lucide-react";

const ListStatusesContent = dynamic(() =>
  import("./ListStatusesContent").then((m) => m.ListStatusesContent),
);

type Props = {
  selectedStatus: string;
  listId: string;
};
export function ListStatuses({ selectedStatus, listId }: Props) {
  const role = useRole();
  const [statusData, setStatusData] = useState<StatusType>(
    LIST_STATUSES.find((s) => s.value === selectedStatus)!,
  );
  const [isOpenedStatus, setIsOpenedStatus] = useState(false);

  const handleChangeSelectStatus = useCallback((status: StatusType) => {
    setStatusData(status);
    setIsOpenedStatus(false);
  }, []);

  return (
    <Popover open={isOpenedStatus} onOpenChange={setIsOpenedStatus}>
      <PopoverTrigger asChild disabled={role === USER_ROLES.member}>
        <IconButton
          title="List Statuses"
          aria-label="List Statuses"
          buttonType="card"
        >
          <p>{statusData?.icon}</p>
        </IconButton>
      </PopoverTrigger>

      <PopoverContent align="start" className="max-w-50 ">
        {isOpenedStatus && (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-medium">List Status</p>
              <IconButton
                onClick={() => setIsOpenedStatus(false)}
                title="Close list status"
              >
                <X />
              </IconButton>
            </div>

            <ListStatusesContent
              handleChangeSelectStatus={handleChangeSelectStatus}
              selectedStatus={selectedStatus}
              listId={listId}
            />
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
