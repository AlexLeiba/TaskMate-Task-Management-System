import { Button } from "@/components/ui/button";
import { useGetBoardData } from "@/hooks/useGetBoardData";
import { useMembers } from "@/hooks/useMembers";
import { UNASSIGNED_CARD } from "@/lib/consts/protected/card";

import { OrganizationMembersType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { UserPlus } from "lucide-react";
import Image from "next/image";
import { useShallow } from "zustand/shallow";

export function FilterDropdownMembersContent({
  handleCloseMenu,
}: {
  handleCloseMenu: () => void;
}) {
  const { members, isFetching } = useMembers();
  const { fetchBoardFilteredListData } = useGetBoardData();
  const {
    boardSubHeaderMemberIdSelected,
    setBoardSubHeaderFilterSelected,
    setBoardSubHeaderMemberIdSelected,
  } = useStore(
    useShallow((state) => ({
      boardSubHeaderMemberIdSelected: state.boardSubHeaderMemberIdSelected,
      setBoardSubHeaderFilterSelected: state.setBoardSubHeaderFilterSelected,
      setBoardSubHeaderMemberIdSelected:
        state.setBoardSubHeaderMemberIdSelected,
    })),
  );

  async function handleSelectedMember(
    member: OrganizationMembersType | undefined | null,
  ) {
    handleCloseMenu();
    const selectedMember = setBoardSubHeaderMemberIdSelected(
      member?.userId || "",
    );

    setBoardSubHeaderFilterSelected("all");

    if (!selectedMember) {
      //  FETCH FRESH BOARD DATA WITH NO FILTERS APPLIED
      fetchBoardFilteredListData({ filters: "all" });
      return;
    }

    if (member?.userId === UNASSIGNED_CARD.userId) {
      // FETCH BOARD DATA WITH UNASSIGNED FILTER
      fetchBoardFilteredListData({ unassignedCard: true });
      return;
    }

    // FETCH BOARD DATA WITH MEMBER FILTER APPLIED
    fetchBoardFilteredListData({ selectedMemberEmail: member?.email });
  }
  return (
    <>
      <Button
        disabled={isFetching}
        className={cn(
          "lg:hidden border",
          boardSubHeaderMemberIdSelected === UNASSIGNED_CARD.userId &&
            "border-text-primary ",
        )}
        variant={"ghost"}
        onClick={() => handleSelectedMember(UNASSIGNED_CARD)}
        title="Filter by unassigned"
        aria-label="Filter by unassigned"
      >
        <div
          className={cn(
            "flex items-center justify-between gap-4 rounded-md px-2 py-1",
          )}
        >
          <div className="flex items-center gap-2">
            <div className="bg-accent-foreground flex items-center justify-center rounded-full p-2 size-6">
              <UserPlus className="text-background size-3" />
            </div>
            <p>{UNASSIGNED_CARD.fullName}</p>
          </div>
        </div>
      </Button>
      {members?.map((member) => {
        return (
          <Button
            disabled={isFetching}
            onClick={() => handleSelectedMember(member)}
            title={`Filter by ${member?.fullName}`}
            aria-label={`Filter by ${member?.fullName}`}
            key={member?.userId}
            variant={"ghost"}
            className={cn(
              "lg:hidden border",
              boardSubHeaderMemberIdSelected === member?.userId &&
                "border-text-primary ",
            )}
          >
            <div
              className={cn(
                "flex items-center justify-between gap-4 px-2 py-1 rounded-md",
              )}
            >
              <div className="flex items-center gap-2">
                <Image
                  alt={member?.fullName || "member"}
                  width={20}
                  height={20}
                  src={member?.imageUrl || "/avatar-default.svg"}
                  className="rounded-full size-6 object-cover"
                />
                <p>{member?.fullName}</p>
              </div>
            </div>
          </Button>
        );
      })}
    </>
  );
}
