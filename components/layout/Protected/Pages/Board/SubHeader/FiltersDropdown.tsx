import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getListDataAction } from "@/app/actions/list";
import { useBoardId } from "@/hooks/useBoardId";
import { useMembers } from "@/hooks/useMembers";
import { FILTERS_DATA, UNASSIGNED_CARD } from "@/lib/consts";
import { useStore } from "@/store/useStore";
import { useAuth } from "@clerk/nextjs";
import { OrganizationMembershipPublicUserData } from "@clerk/nextjs/server";
import { Filter, UserPlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { IconButton } from "@/components/ui/iconButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FilterData, FilterStates } from "@/lib/types";

export function FiltersDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const boardId = useBoardId();
  const { orgId } = useAuth();
  const { members } = useMembers();

  const { setBoardListData } = useStore();

  const [selectedMember, setSelectedMember] =
    useState<OrganizationMembershipPublicUserData | null>(null);

  const {
    boardSubHeaderFilterSelected,
    setBoardSubHeaderFilterSelected,
    setBoardSubHeaderMemberFilterSelected,
  } = useStore();

  async function fetchBoardFilteredListData(
    selectedMemberEmail: string = "",
    unassigned: boolean = false,
    selectedFilter: FilterStates = "all",
  ) {
    try {
      const listData = await getListDataAction(
        boardId,
        orgId,
        selectedMemberEmail,
        unassigned,
        selectedFilter,
      );

      // UPDATE BOARD LIST DATA
      setBoardListData(listData.data);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  }

  async function handleSelectedMember(
    member: OrganizationMembershipPublicUserData | undefined | null,
  ) {
    setBoardSubHeaderFilterSelected("all");
    if (!member) return;

    setSelectedMember((prev) => {
      if (prev?.userId === member?.userId) {
        fetchBoardFilteredListData("");
        return null;
      }
      return member;
    });

    if (member?.userId === UNASSIGNED_CARD.userId) {
      return fetchBoardFilteredListData("", true);
    }
    fetchBoardFilteredListData(member?.identifier || "");
  }
  async function handleSelectedFilter(filter: FilterData) {
    setBoardSubHeaderMemberFilterSelected(null);
    setSelectedMember(null);
    if (!filter) return;

    const selectedFilter = setBoardSubHeaderFilterSelected(filter.id);

    if (selectedFilter === "theSame") {
      fetchBoardFilteredListData("", false, "all");
      return;
    }
    fetchBoardFilteredListData("", false, selectedFilter);
  }
  return (
    <div className="">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger className="cursor-pointer">
          <IconButton
            className="relative p-2"
            title="Open filters"
            aria-label="Open filters"
          >
            <Filter />
            {isOpen && (
              <div className="size-3 rounded-full bg-green-400 absolute top-0 right-0" />
            )}
            {!isOpen && boardSubHeaderFilterSelected !== "all" && (
              <div className="md:block hidden size-3 rounded-full bg-red-600 absolute top-0 right-0" />
            )}
            {((!isOpen && selectedMember?.userId) ||
              (!isOpen &&
                boardSubHeaderFilterSelected &&
                boardSubHeaderFilterSelected !== "all")) && (
              <div className="lg:hidden size-3 rounded-full bg-red-600 absolute top-0 right-0" />
            )}
          </IconButton>
        </PopoverTrigger>

        <PopoverContent className="flex flex-col gap-3 p-2 w-full" align="end">
          <Button
            className={cn(
              "lg:hidden border",
              selectedMember?.userId === UNASSIGNED_CARD.userId &&
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
                <div className="bg-accent-foreground flex items-center rounded-full p-2 size-7">
                  <UserPlus size={20} className="text-background" />
                </div>
                <p>{UNASSIGNED_CARD.firstName}</p>
              </div>
            </div>
          </Button>
          {members.map((member) => {
            return (
              <Button
                onClick={() => handleSelectedMember(member)}
                title={`Filter by ${member?.firstName} ${member?.lastName}`}
                key={member?.userId}
                variant={"ghost"}
                className={cn(
                  "lg:hidden border",
                  selectedMember?.userId === member?.userId &&
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
                      alt={member?.firstName || "member"}
                      width={28}
                      height={28}
                      src={member?.imageUrl || "/avatar-default.svg"}
                      className="rounded-full size-7"
                    />
                    <p>{member?.firstName + " " + member?.lastName}</p>
                  </div>
                </div>
              </Button>
            );
          })}
          {FILTERS_DATA.map((data) => {
            return (
              <Button
                onClick={() => handleSelectedFilter(data)}
                title={`Filter by ${data?.title}`}
                key={data.id}
                variant={"ghost"}
                className={cn(
                  "border",
                  boardSubHeaderFilterSelected === data?.id &&
                    "border-text-primary ",
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-between gap-4 px-2 py-1 rounded-md",
                  )}
                >
                  <div className="flex items-center gap-2">
                    {data.icon}
                    <p>{data?.title}</p>
                  </div>
                </div>
              </Button>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
}
