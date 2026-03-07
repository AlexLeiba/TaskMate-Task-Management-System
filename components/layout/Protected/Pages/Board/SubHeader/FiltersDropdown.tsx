import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getListDataAction } from "@/app/actions/list";
import { useBoardId } from "@/hooks/useBoardId";
import { useMembers } from "@/hooks/useMembers";
import { UNASSIGNED_CARD } from "@/lib/consts";
import { useStore } from "@/store/useStore";
import { useAuth } from "@clerk/nextjs";
import { OrganizationMembershipPublicUserData } from "@clerk/nextjs/server";
import { CircleCheck, Filter, UserPlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { IconButton } from "@/components/ui/iconButton";
import { Button } from "@/components/ui/button";

export function FiltersDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const boardId = useBoardId();
  const { orgId } = useAuth();
  const { members } = useMembers();

  const { setBoardListData } = useStore();

  const [selectedMember, setSelectedMember] =
    useState<OrganizationMembershipPublicUserData | null>(null);

  async function fetchBoardListData(
    selectedMemberEmail: string = "",
    unassigned: boolean = false,
  ) {
    try {
      const listData = await getListDataAction(
        boardId,
        orgId,
        selectedMemberEmail,
        unassigned,
      );

      setBoardListData(listData.data);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  }

  async function handleSelectedMember(
    member: OrganizationMembershipPublicUserData | undefined | null,
  ) {
    if (!member) return;

    setSelectedMember((prev) => {
      if (prev?.userId === member?.userId) {
        fetchBoardListData("");
        return null;
      }
      return member;
    });

    if (member?.userId === UNASSIGNED_CARD.userId) {
      return fetchBoardListData("", true);
    }
    fetchBoardListData(member?.identifier || "");
  }
  return (
    <div className="lg:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger className="cursor-pointer">
          <IconButton
            className="relative p-2"
            title="Filter by member"
            aria-label="Filter by member"
          >
            <Filter />
            {isOpen && (
              <div className="size-3 rounded-full bg-green-400 absolute top-0 right-0" />
            )}
            {!isOpen && selectedMember?.userId && (
              <div className="size-3 rounded-full bg-red-600 absolute top-0 right-0" />
            )}
          </IconButton>
        </PopoverTrigger>

        <PopoverContent className="flex flex-col gap-3 p-2 w-full">
          <Button
            className="px-2"
            variant={"secondary"}
            onClick={() => handleSelectedMember(UNASSIGNED_CARD)}
            title="Filter by unassigned"
            aria-label="Filter by unassigned"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-accent-foreground flex items-center rounded-full p-2 size-7">
                  <UserPlus size={20} className="text-background" />
                </div>
                <p>{UNASSIGNED_CARD.firstName}</p>
              </div>
              {selectedMember?.userId === UNASSIGNED_CARD.userId && (
                <CircleCheck className="text-green-400" />
              )}
            </div>
          </Button>
          {members.map((member) => {
            return (
              <Button
                onClick={() => handleSelectedMember(member)}
                title={`Filter by ${member?.firstName} ${member?.lastName}`}
                key={member?.userId}
                variant={"secondary"}
                className="px-2"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Image
                      alt={member?.firstName || "member"}
                      width={28}
                      height={28}
                      src={member?.imageUrl || "/avatar-default.svg"}
                      className="rounded-full size-7"
                    />
                    <p>{member?.firstName + " " + member?.lastName}</p>
                  </div>
                  {selectedMember?.userId === member?.userId && (
                    <CircleCheck className="text-green-400" />
                  )}
                </div>
              </Button>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
}
