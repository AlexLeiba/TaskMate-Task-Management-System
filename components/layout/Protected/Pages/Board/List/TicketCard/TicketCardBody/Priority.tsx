import { IconButton } from "@/components/ui/iconButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CARD_PRIORITIES, FAKE_USERS, KEYBOARD } from "@/lib/consts";
import { PriorityType, UserType } from "@/lib/types";
import { Check, X } from "lucide-react";
import { useState } from "react";

type Props = {
  priority: string;
};
export function Priority({ priority }: Props) {
  const [isOpenedOptions, setIsOpenedOptions] = useState(false);
  const [isOpenedAssign, setIsOpenedAssign] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<PriorityType>(
    CARD_PRIORITIES.find((p) => p.value === priority) || {
      label: "No Priority",
      value: "no-priority",
    },
  );
  const [selectedUser, setSelectedUser] = useState<UserType>(FAKE_USERS[0]);

  function handleSelectPriority(priorityValue: PriorityType) {
    setSelectedPriority(priorityValue);
    setIsOpenedOptions(false);
  }
  return (
    <Popover open={isOpenedOptions} onOpenChange={setIsOpenedOptions}>
      <PopoverTrigger asChild>
        <IconButton
          aria-label="Priority"
          title="Priority"
          onClick={(e) => {
            e.stopPropagation();
          }}
          onKeyDown={(e) => {
            if (e.key === KEYBOARD.ENTER) {
              e.stopPropagation();
            }
          }}
          className=""
          classNameChildren="ring ring-white flex justify-center items-center p-2 size-7 cursor-pointer hover:opacity-70 rounded-sm"
        >
          {selectedPriority.icon ? (
            <span className="text-lg">{selectedPriority.icon}</span>
          ) : (
            <span className="text-sm">...</span>
          )}
        </IconButton>
      </PopoverTrigger>
      <PopoverContent align="start" className="max-w-50 bg-gray-900 text-white">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-medium">Priority</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenedOptions(false);
            }}
            onKeyDown={(e) => {
              if (e.key === KEYBOARD.ENTER) {
                e.stopPropagation();
                setIsOpenedOptions(false);
              }
            }}
            className="cursor-pointer hover:opacity-80"
            title="Close list status"
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-1 items-start pl-2 ">
          {/* PRIORITIES */}
          {CARD_PRIORITIES.map((priority) => (
            <IconButton
              title={priority.label}
              aria-label={priority.label}
              key={priority.value}
              className=" p-1.5 w-full"
              classNameChildren=" flex items-center justify-between gap-1  rounded-sm "
              onClick={(e) => {
                e.stopPropagation();
                handleSelectPriority(priority);
              }}
              onKeyDown={(e) => {
                if (e.key === KEYBOARD.ENTER) {
                  e.stopPropagation();
                  handleSelectPriority(priority);
                }
              }}
            >
              <div className="flex gap-2">
                {priority.icon}
                <p className="text-lg">{priority.label}</p>
              </div>
              {selectedPriority.value === priority.value && (
                <Check className="text-green-600" />
              )}
            </IconButton>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
