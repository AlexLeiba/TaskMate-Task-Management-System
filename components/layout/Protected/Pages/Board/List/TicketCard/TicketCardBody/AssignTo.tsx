import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FAKE_USERS, KEYBOARD } from "@/lib/consts";
import { Check, UserPlus, X } from "lucide-react";
import { AssignedToType, UserType } from "@/lib/types";
import Image from "next/image";
import { IconButton } from "@/components/ui/iconButton";
import { UserCard } from "../../../../../UserCard/UserCard";
import { useOrganization } from "@clerk/nextjs";
import { AssignToUserSkeleton } from "./AssignToUserSkeleton";
import { useQuery } from "@tanstack/react-query";

type Props = {
  assignedTo: AssignedToType | undefined;
};
export function AssignTo({ assignedTo }: Props) {
  const [isOpenedAssign, setIsOpenedAssign] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UserType>(FAKE_USERS[0]);
  const { organization, isLoaded } = useOrganization();

  const { isLoading, data: members } = useQuery({
    queryFn: fetchMembers,
    queryKey: ["members"], //is tied to unique key/ can be used with any Promise based method GET/POST
    // UNIOQUE KEY IS USED INTERNALLY FOR REFETCHING , Caching and sharing
  });

  async function fetchMembers() {
    if (!isLoaded || !organization || !organization.getMemberships()) return;
    const res = await organization?.getMemberships();
    if (!res) return;

    return res.data || [];
  }

  function handleAssignTo(memberEmail: string) {
    console.log("🚀 ~ handleAssignTo ~ user:", memberEmail);
  }

  return (
    <Popover open={isOpenedAssign} onOpenChange={setIsOpenedAssign}>
      {/* TRIGGER */}
      <PopoverTrigger asChild>
        <IconButton
          aria-label="Assign to"
          title="Assign to"
          onClick={(e) => {
            e.stopPropagation();
          }}
          onKeyDown={(e) => {
            if (e.key === KEYBOARD.ENTER) {
              e.stopPropagation();
            }
          }}
          className="hover:ring hover:ring-white   rounded-sm size-7   "
          classNameChildren=" flex justify-center items-center  cursor-pointer hover:opacity-70 rounded-sm"
        >
          {isLoading ? (
            <AssignToUserSkeleton />
          ) : assignedTo?.avatar ? (
            <div className="rounded-sm overflow-hidden">
              <Image
                src={assignedTo?.avatar}
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

      {/* POPOVER DROP CONTENT */}
      <PopoverContent align="start" className=" bg-gray-900 text-white">
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

        <div className="flex flex-col gap-2 items-start pl-2 ">
          {/* ASSIGN USER*/}
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setSelectedUser({
                id: "",
                name: "",
                avatar: "",
                email: "",
              });
            }}
            onKeyDown={(e) => {
              if (e.key === KEYBOARD.ENTER) {
                e.stopPropagation();
                setSelectedUser({
                  id: "",
                  name: "",
                  avatar: "",
                  email: "",
                });
              }
            }}
            className=" p-1.5 w-full"
            classNameChildren="flex gap-4 justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full overflow-hidden bg-gray-700 size-8.75 flex justify-center items-center">
                <UserPlus size={20} />
              </div>
              <p>None</p>
            </div>
            {selectedUser.id === "" && <Check className="text-green-600" />}
          </IconButton>
          {members?.map((user) => (
            <IconButton
              title={
                user.publicUserData?.firstName +
                " " +
                user.publicUserData?.lastName
              }
              aria-label={
                user.publicUserData?.firstName +
                " " +
                user.publicUserData?.lastName
              }
              key={user.id}
              className=" p-1.5 w-full"
              classNameChildren="flex items-center justify-between gap-1"
              onClick={(e) => {
                e.stopPropagation();
                handleAssignTo(user.publicUserData?.identifier || "");
              }}
              onKeyDown={(e) => {
                if (e.key === KEYBOARD.ENTER) {
                  e.stopPropagation();
                  handleAssignTo(user.publicUserData?.identifier || "");
                }
              }}
            >
              <UserCard
                data={{
                  email: user.publicUserData?.identifier || "",
                  name:
                    user.publicUserData?.firstName +
                    " " +
                    user.publicUserData?.lastName,
                  avatar: user.publicUserData?.imageUrl || "",
                }}
                size={"sm"}
              />

              {assignedTo?.email === user.publicUserData?.identifier && (
                <Check className="text-green-600" />
              )}
            </IconButton>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
