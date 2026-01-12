import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, Circle, X } from "lucide-react";
import { LIST_STATUSES } from "@/lib/consts";
import { Button } from "@/components/ui/button";

type Props = {
  selectedStatus: string;
};
export function ListStatuses({ selectedStatus }: Props) {
  const [status, setStatus] = useState(selectedStatus);
  const [isOpenedStatus, setIsOpenedStatus] = useState(false);
  const [isOpenedOptions, setIsOpenedOptions] = useState(false);
  const [isOpenedAddACard, setIsOpenedAddACard] = useState(false);

  function handleSelectStatus(status: string) {
    // TODO api req with new status
    // If success show optimistic status
    setStatus(status);
    // setIsOpenedStatus(false);
  }
  return (
    <Popover open={isOpenedStatus} onOpenChange={setIsOpenedStatus}>
      <PopoverTrigger asChild>
        <button className="cursor-pointer hover:opacity-80">
          <Circle size={25} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="max-w-50 bg-gray-800 text-white">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-medium">List Status</p>
          <button
            onClick={() => setIsOpenedStatus(false)}
            className="cursor-pointer hover:opacity-80"
            title="Close list status"
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col ">
          {LIST_STATUSES.map((status) => (
            <Button
              title={status.label}
              variant="ghost"
              onClick={() => handleSelectStatus(status.value)}
              key={status.value}
              className="flex gap-2 hover:opacity-80 cursor-pointer"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-2">
                  {status.icon}
                  <p key={status.label}>{status.label}</p>
                </div>

                {selectedStatus === status.value && (
                  <Check size={20} className="text-green-500" />
                )}
              </div>
            </Button>
          ))}
          {/* todo add custom status card */}
        </div>
      </PopoverContent>
    </Popover>
  );
}
