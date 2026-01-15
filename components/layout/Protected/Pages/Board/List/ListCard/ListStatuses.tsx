import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, X } from "lucide-react";
import { LIST_STATUSES } from "@/lib/consts";

import { StatusType } from "@/lib/types";
import { IconButton } from "@/components/ui/iconButton";

type Props = {
  selectedStatus: string;
};
export function ListStatuses({ selectedStatus }: Props) {
  const [statusData, setStatusData] = useState<StatusType>(
    LIST_STATUSES.find((s) => s.value === selectedStatus)!
  );
  const [isOpenedStatus, setIsOpenedStatus] = useState(false);

  function handleSelectStatus(status: StatusType) {
    // TODO api req with new status
    // If success show optimistic status
    setStatusData(status); //if api req issuccess then set Optimistic status and close p[popover]
    // setIsOpenedStatus(false);
  }
  return (
    <Popover open={isOpenedStatus} onOpenChange={setIsOpenedStatus}>
      <PopoverTrigger asChild>
        <IconButton title="List Statuses" aria-label="List Statuses">
          <p>{statusData?.icon}</p>
        </IconButton>
      </PopoverTrigger>
      <PopoverContent align="start" className="max-w-50 bg-gray-900 text-white">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-medium">List Status</p>
          <IconButton
            onClick={() => setIsOpenedStatus(false)}
            title="Close list status"
          >
            <X />
          </IconButton>
        </div>

        <div className="flex flex-col ">
          {LIST_STATUSES.map((status) => (
            <IconButton
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
          {/* TODO update add custom status card */}
        </div>
      </PopoverContent>
    </Popover>
  );
}
