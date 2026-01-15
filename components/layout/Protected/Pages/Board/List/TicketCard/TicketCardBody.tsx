"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CARD_PRIORITIES, FAKE_USERS } from "@/lib/consts";
import { Check, UserPlus, X } from "lucide-react";
import { PriorityType, UserType } from "@/lib/types";
import Image from "next/image";
import { IconButton } from "@/components/ui/iconButton";

type Props = {
  priority: string;
};
export function TicketCardBody({ priority }: Props) {
  const [isOpenedOptions, setIsOpenedOptions] = useState(false);
  const [isOpenedAssign, setIsOpenedAssign] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<PriorityType>(
    CARD_PRIORITIES.find((p) => p.value === priority) || {
      label: "No Priority",
      value: "no-priority",
    }
  );
  const [selectedUser, setSelectedUser] = useState<UserType>(FAKE_USERS[0]);

  function handleSelectPriority(priorityValue: PriorityType) {
    setSelectedPriority(priorityValue);
    setIsOpenedOptions(false);
  }
  return (
    <div className="flex justify-between w-full">
      {/* OPTIONS  */}
      <Popover open={isOpenedOptions} onOpenChange={setIsOpenedOptions}>
        <PopoverTrigger asChild>
          <button
            aria-label="Priority"
            title="Priority"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="ring ring-white flex justify-center items-center p-2 size-7 cursor-pointer hover:opacity-70 rounded-sm"
          >
            {selectedPriority.icon ? (
              <span className="text-lg">{selectedPriority.icon}</span>
            ) : (
              <span className="text-sm">...</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="max-w-50 bg-gray-900 text-white"
        >
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-medium">Priority</p>
            <button
              onClick={() => setIsOpenedOptions(false)}
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
                onClick={() => {
                  handleSelectPriority(priority);
                }}
              >
                <div className="flex gap-2">
                  <p className="text-lg">{priority.icon}</p>
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

      {/* ASSIGN  */}
      <Popover open={isOpenedAssign} onOpenChange={setIsOpenedAssign}>
        <PopoverTrigger asChild>
          <IconButton
            aria-label="Assign"
            title="Assign"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="hover:ring hover:ring-white   rounded-sm size-7   "
            classNameChildren=" flex justify-center items-center  cursor-pointer hover:opacity-70 rounded-sm"
          >
            {selectedUser.avatar ? (
              <div className="rounded-sm overflow-hidden">
                <Image
                  src={selectedUser?.avatar}
                  width={40}
                  height={40}
                  alt="avatar"
                />
              </div>
            ) : (
              <span className="text-sm">
                <UserPlus size={20} />
              </span>
            )}
          </IconButton>
        </PopoverTrigger>
        <PopoverContent align="start" className=" bg-gray-900 text-white">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-medium">Assign</p>
            <IconButton
              onClick={() => setIsOpenedAssign(false)}
              className="cursor-pointer hover:opacity-80"
              title="Close assign"
              aria-label="Close assign"
            >
              <X />
            </IconButton>
          </div>

          <div className="flex flex-col gap-2 items-start pl-2 ">
            {/* ASSIGN USER*/}
            {FAKE_USERS.map((user) => (
              <IconButton
                title={user.name}
                aria-label={user.name}
                key={user.id}
                className=" p-1.5 w-full "
                classNameChildren="flex items-center justify-between gap-1"
                onClick={() => {
                  setSelectedUser(user);
                }}
              >
                <div className="flex gap-4 items-center">
                  {user.avatar ? (
                    <div className="rounded-full overflow-hidden">
                      <Image
                        src={user?.avatar}
                        width={35}
                        height={35}
                        alt="avatar"
                      />
                    </div>
                  ) : (
                    <div className="rounded-full overflow-hidden bg-gray-700 size-8.75 flex justify-center items-center">
                      <UserPlus size={20} />
                    </div>
                  )}
                  <div className="flex flex-col items-start">
                    <p className="text-lg">{user.name}</p>
                    <p className="text-sm">{user.email}</p>
                  </div>
                </div>
                {selectedUser.id === user.id && (
                  <Check className="text-green-600" />
                )}
              </IconButton>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
