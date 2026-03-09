import { Button } from "@/components/ui/button";
import { useGetBoardFilteredData } from "@/hooks/useGetBoardFilteredData";
import { useMembers } from "@/hooks/useMembers";
import { UNASSIGNED_CARD } from "@/lib/consts";
import { OrganizationMembersType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { UserPlus } from "lucide-react";
import Image from "next/image";

export function FilterDropdownMembersContent() {
  const { members } = useMembers();
  const { fetchBoardFilteredListData } = useGetBoardFilteredData();
  const {
    boardSubHeaderMemberIdSelected,
    setBoardSubHeaderFilterSelected,
    setBoardSubHeaderMemberIdSelected,
  } = useStore();

  async function handleSelectedMember(
    member: OrganizationMembersType | undefined | null,
  ) {
    setBoardSubHeaderFilterSelected("all");
    if (!member) return;

    const selectedMember = setBoardSubHeaderMemberIdSelected(
      member?.userId || "",
    );

    if (!selectedMember) {
      //  FETCH FRESH BOARD DATA WITH NO FILTERS APPLIED
      fetchBoardFilteredListData("");
    }

    if (member?.userId === UNASSIGNED_CARD.userId) {
      // FETCH BOARD DATA WITH UNASSIGNED FILTER
      return fetchBoardFilteredListData("", true);
    }

    // FETCH BOARD DATA WITH MEMBER FILTER APPLIED
    fetchBoardFilteredListData(member?.email || "");
  }
  return (
    <>
      <Button
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
            onClick={() => handleSelectedMember(member)}
            title={`Filter by ${member?.fullName}`}
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
                  className="rounded-full size-6"
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
