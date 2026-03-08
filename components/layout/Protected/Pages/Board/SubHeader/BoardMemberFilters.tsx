import { getListDataAction } from "@/app/actions/list";
import { useBoardId } from "@/hooks/useBoardId";
import { useMembers } from "@/hooks/useMembers";
import { UNASSIGNED_CARD } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { useAuth } from "@clerk/nextjs";
import { OrganizationMembershipPublicUserData } from "@clerk/nextjs/server";
import { UserPlus } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export function BoardMemberFilters() {
  const boardId = useBoardId();
  const { orgId } = useAuth();
  const { members } = useMembers();
  const {
    setBoardListData,
    setBoardSubHeaderFilterSelected,
    setBoardSubHeaderMemberFilterSelected,
    boardSubHeaderMemberFilterSelected,
  } = useStore();

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
    // DESELECT ANY OTHER FILTERS
    setBoardSubHeaderFilterSelected("all");
    if (!member) return;

    const selectedMember = setBoardSubHeaderMemberFilterSelected(
      member?.userId || "",
    );

    if (!selectedMember) {
      return fetchBoardListData("");
    }

    if (member?.userId === UNASSIGNED_CARD.userId) {
      return fetchBoardListData("", true);
    }
    fetchBoardListData(member?.identifier || "");
  }

  //   TODO open dropdown with all members
  function handleExpandMembers() {}

  return (
    <div className="p-2 hidden lg:block">
      <div className="flex items-center relative">
        <button
          onClick={() => handleSelectedMember(UNASSIGNED_CARD)}
          title="Filter by unassigned"
          aria-label="Filter by unassigned"
          className={cn(
            boardSubHeaderMemberFilterSelected === "unassigned"
              ? "z-10 outline-offset-3 outline-2 outline-white "
              : "outline-1 outline-gray-300",
            "bg-accent-foreground flex items-center  hover:z-10 hover:outline-2 rounded-full cursor-pointer p-1",
          )}
        >
          <UserPlus size={20} className="text-background" />
        </button>
        {members.map((member, index) => {
          return (
            <button
              onClick={() => handleSelectedMember(member)}
              title={`Filter by ${member?.firstName} ${member?.lastName}`}
              style={{ transform: `translateX(-${index * 5}px)` }}
              className={cn(
                boardSubHeaderMemberFilterSelected === member?.userId
                  ? "z-10 outline-offset-3 outline-2 outline-white"
                  : "outline-1 outline-gray-300",
                "bg-accent-foreground -translate-x-1.25 flex items-center hover:z-10 hover:outline-2  rounded-full cursor-pointer",
              )}
              key={member?.userId}
            >
              <Image
                alt={member?.firstName || "member"}
                width={28}
                height={28}
                src={member?.imageUrl || "/avatar-default.svg"}
                className="rounded-full size-7"
              />
            </button>
          );
        })}

        {members?.length > 6 && (
          <button
            onClick={handleExpandMembers}
            title="Filter by unassigned"
            aria-label="Filter by unassigned"
            className={cn(
              boardSubHeaderMemberFilterSelected === "unassigned" &&
                "z-10 ring-offset-3",
              "bg-background size-7 flex items-center ring-1 hover:z-10 hover:ring-2 ring-white rounded-full cursor-pointer -translate-x-7.5",
            )}
          >
            +{members?.length - 6}
          </button>
        )}
      </div>
    </div>
  );
}
