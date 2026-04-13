import { IconButton } from "@/components/ui/iconButton";
import { useGetBoardData } from "@/hooks/useGetBoardData";
import { useMembers } from "@/hooks/useMembers";
import { UNASSIGNED_CARD } from "@/lib/consts/protected/card";

import { OrganizationMembersType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { UserPlus } from "lucide-react";
import Image from "next/image";

export function BoardMemberFilters() {
  const { fetchBoardFilteredListData, loading } = useGetBoardData();

  const { members, isFetching } = useMembers();

  const setBoardSubHeaderMemberIdSelected = useStore(
    (state) => state.setBoardSubHeaderMemberIdSelected,
  );

  const boardSubHeaderMemberIdSelected = useStore(
    (state) => state.boardSubHeaderMemberIdSelected,
  );

  async function handleSelectedMember(
    member: OrganizationMembersType | undefined | null,
  ) {
    const selectedMember = setBoardSubHeaderMemberIdSelected(
      member?.userId || "",
    );

    if (!selectedMember) {
      // FETCH FRESH BOARD DATA WITH NO FILTERS APPLIED
      return fetchBoardFilteredListData({ filters: "all" });
    }

    if (member?.userId === UNASSIGNED_CARD.userId) {
      // FETCH BOARD DATA WITH UNASSIGNED FILTER
      return fetchBoardFilteredListData({ unassignedCard: true });
    }

    // FETCH BOARD DATA WITH MEMBER FILTER
    fetchBoardFilteredListData({
      selectedMemberEmail: member?.email || "",
    });
  }

  return (
    <div className="p-2 hidden lg:block">
      <div className="flex items-center relative">
        <IconButton
          disabled={loading || isFetching}
          onClick={() => handleSelectedMember(UNASSIGNED_CARD)}
          title="Filter by unassigned"
          aria-label="Filter by unassigned"
          className={cn(
            boardSubHeaderMemberIdSelected === "unassigned"
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
              disabled={loading || isFetching}
              onClick={() => handleSelectedMember(member)}
              title={`Filter by ${member?.fullName}`}
              style={{ transform: `translateX(-${index * 5}px)` }}
              className={cn(
                boardSubHeaderMemberIdSelected === member?.userId
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
