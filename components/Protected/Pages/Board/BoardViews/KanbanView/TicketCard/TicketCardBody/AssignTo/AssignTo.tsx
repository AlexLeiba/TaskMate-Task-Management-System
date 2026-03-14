import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { KEYBOARD, USER_ROLES } from "@/lib/consts";
import { UserPlus, X } from "lucide-react";
import { AssignedToType } from "@/lib/types";
import Image from "next/image";
import { IconButton } from "@/components/ui/iconButton";
import { AssignToUserSkeleton } from "../AssignToUserSkeleton";

import { useRole } from "@/hooks/useRole";
import dynamic from "next/dynamic";

const AssignToContent = dynamic(() =>
  import("./AssignToContent").then((m) => m.AssignToContent),
);

type Props = {
  assignedToAvatar: AssignedToType["avatar"] | null | undefined;
  assignedToEmail: AssignedToType["email"] | null;
  boardId: string;
  listId: string;
  cardId: string;
};
export function AssignTo({
  assignedToEmail,
  assignedToAvatar,
  boardId,
  listId,
  cardId,
}: Props) {
  const [isOpenedAssign, setIsOpenedAssign] = useState(false);
  const role = useRole();

  return (
    <Popover open={isOpenedAssign} onOpenChange={setIsOpenedAssign}>
      {/* TRIGGER */}
      <PopoverTrigger asChild disabled={role === USER_ROLES.member}>
        <IconButton
          buttonType={"card"}
          disabled={role === USER_ROLES.member}
          aria-label="Assign to"
          title="Assign to"
          onClick={(e) => {
            if (role === USER_ROLES.admin) {
              e.stopPropagation();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === KEYBOARD.ENTER && role === USER_ROLES.admin) {
              e.stopPropagation();
            }
          }}
          className="hover:ring hover:ring-white   rounded-sm size-7   "
          classNameChildren=" flex justify-center items-center  cursor-pointer hover:opacity-70 rounded-sm"
        >
          {!boardId ? (
            <AssignToUserSkeleton />
          ) : assignedToEmail ? (
            <div className="rounded-sm overflow-hidden bg-gray-400">
              <Image
                src={assignedToAvatar || "/avatar-default.svg"}
                alt={assignedToEmail || ""}
                className="rounded-sm"
                width={28}
                height={28}
              />
            </div>
          ) : (
            <UserPlus size={20} />
          )}
        </IconButton>
      </PopoverTrigger>

      {/* POPOVER DROP CONTENT */}
      <PopoverContent align="start">
        {isOpenedAssign && (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-medium">Assign to</p>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenedAssign(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === KEYBOARD.ENTER) {
                    e.stopPropagation();
                    setIsOpenedAssign(false);
                  }
                }}
                className="cursor-pointer hover:opacity-80"
                title="Close assign"
                aria-label="Close assign"
              >
                <X />
              </IconButton>
            </div>
            <AssignToContent
              assignedTo={assignedToEmail}
              boardId={boardId}
              listId={listId}
              cardId={cardId}
            />
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
