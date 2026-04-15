import { IconButton } from "@/components/ui/iconButton";
import { useDebounce } from "@/hooks/useDebounce";
import { useMembers } from "@/hooks/useMembers";
import { UNASSIGNED_CARD } from "@/lib/consts/protected/card";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { OrganizationMembersType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { useIsFetching } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function BoardMemberFilters() {
  const [selectedLocalMember, setSelectedLocalMember] = useState<string>("");

  const { members, isFetching } = useMembers();

  const setFilterState = useStore((state) => state.setFilterState);
  const delayedSetFilterState = useDebounce(setFilterState, 100);

  const isFetchingKanbanListData =
    useIsFetching({
      queryKey: [QUERY_KEYS.hooks.useBoardListData],
    }) > 0;
  const isFetchingTableData =
    useIsFetching({
      queryKey: [QUERY_KEYS.hooks.useTableData],
    }) > 0;

  async function handleSelectedMember(
    member: OrganizationMembersType | undefined | null,
  ) {
    setSelectedLocalMember((prev) => {
      if (prev === member?.email) {
        return "";
      }
      return member?.email || "";
    });

    // SET FILTER STATE BASED ON SELECTED MEMBER, THIS WILL TRIGGER useTableData TO FETCH FILTERED DATA
    delayedSetFilterState({
      filters: "selectedMemberEmail",
      selectedMemberEmail: member?.email,
    });
  }

  const isLoading =
    isFetchingKanbanListData || isFetchingTableData || isFetching;

  return (
    <div className="p-2 hidden lg:block">
      <div className="flex items-center relative">
        <IconButton
          disabled={isLoading}
          onClick={() => handleSelectedMember(UNASSIGNED_CARD)}
          title="Filter by unassigned"
          aria-label="Filter by unassigned"
          className={cn(
            selectedLocalMember === "unassigned"
              ? "z-10 outline-offset-3 outline-2 outline-white "
              : "outline-1 outline-gray-300",
            "bg-accent-foreground flex items-center  hover:z-10 hover:outline-2 hover:opacity-100 rounded-full cursor-pointer p-1",
          )}
        >
          <UserPlus size={20} className="text-background" />
        </IconButton>
        {members?.map((member, index) => {
          return (
            <IconButton
              disabled={isLoading}
              onClick={() => handleSelectedMember(member)}
              title={`Filter by ${member?.fullName}`}
              style={{ transform: `translateX(-${index * 5}px)` }}
              className={cn(
                selectedLocalMember === member?.email
                  ? "z-10 outline-offset-3 outline-2 outline-white"
                  : "outline-1 outline-gray-300",
                "bg-accent-foreground -translate-x-1.25 flex items-center hover:z-10 hover:outline-2 hover:opacity-100  rounded-full cursor-pointer",
              )}
              key={member?.userId}
            >
              <Image
                alt={member?.fullName || "member"}
                width={28}
                height={28}
                src={member?.imageUrl || "/avatar-default.svg"}
                className="rounded-full size-7 object-cover"
              />
            </IconButton>
          );
        })}
      </div>
    </div>
  );
}
