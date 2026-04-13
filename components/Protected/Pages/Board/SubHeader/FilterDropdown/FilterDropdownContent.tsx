import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FilterStates, PriorityType } from "@/lib/types";
import { useGetBoardData } from "@/hooks/useGetBoardData";
import { useResponsive } from "@/hooks/useResponsive";
import { BREAKPOINTS } from "@/lib/breakpoints";
import { FilterDropdownMembersContent } from "./FilterDropdownMembersContent";
import { useShallow } from "zustand/shallow";
import { FILTERS_DATA } from "@/lib/consts/protected/board";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CARD_PRIORITIES } from "@/lib/consts/protected/card";
import { ChevronDown, X } from "lucide-react";

export function FilterDropdownContent({
  handleCloseMenu,
}: {
  handleCloseMenu: () => void;
}) {
  const { fetchBoardFilteredListData } = useGetBoardData();
  const isTablet = useResponsive(BREAKPOINTS.lg);

  const {
    prioritiesSelectedFilter,
    boardSubHeaderFilterSelected,
    setBoardSubHeaderFilterSelected,
  } = useStore(
    useShallow((state) => ({
      boardSubHeaderFilterSelected: state.boardSubHeaderFilterSelected,
      setBoardSubHeaderFilterSelected: state.setBoardSubHeaderFilterSelected,
      prioritiesSelectedFilter: state.prioritiesSelectedFilter,
    })),
  );

  function handleSelectedFilter(
    filterState: FilterStates,
    priorityType?: PriorityType | null,
  ) {
    handleCloseMenu();
    const selectedFilter = setBoardSubHeaderFilterSelected(
      filterState,
      priorityType?.value,
    );

    if (selectedFilter === "theSame") {
      fetchBoardFilteredListData({
        priorityType: priorityType?.value,
        unassignedCard: false,
        filters: "all",
      });
      return;
    }
    fetchBoardFilteredListData({
      unassignedCard: false,
      filters: selectedFilter,
      priorityType: priorityType?.value,
    });
  }

  return (
    <>
      {/* MEMBER FILTERS */}
      {isTablet && (
        <FilterDropdownMembersContent
          handleCloseMenu={() => handleCloseMenu()}
        />
      )}

      {/* STATS FILTERS */}
      {FILTERS_DATA.map((data) => {
        if (data.id === "priority") {
          const selectedPriority = CARD_PRIORITIES.find(
            (p) => p.value === prioritiesSelectedFilter,
          );

          return (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    key={data.id}
                    title={`Open filter by ${data?.title} options`}
                    aria-label={`Open filter by ${data?.title} options`}
                    variant={"ghost"}
                    className={cn(
                      "border w-full",
                      boardSubHeaderFilterSelected === data?.id &&
                        "border-text-primary ",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-between gap-4 px-2 py-1 rounded-md",
                      )}
                    >
                      <div className="flex items-center gap-2 justify-between w-full">
                        <div className="flex items-center gap-2">
                          {selectedPriority?.icon || data.icon}
                          <p>{selectedPriority?.label || data?.title}</p>
                        </div>
                        <ChevronDown />
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <div className="flex flex-col gap-2">
                    {CARD_PRIORITIES.map((priority) => {
                      return (
                        <Button
                          key={priority.value}
                          onClick={() => {
                            // setBoardSubHeaderFilterSelected(data.id);
                            handleSelectedFilter("priority", priority);
                          }}
                          title={`Filter by ${priority?.label}`}
                          aria-label={`Filter by ${priority?.label}`}
                          variant={"ghost"}
                          className={cn(
                            "border",
                            selectedPriority?.value === priority.value &&
                              "border-text-primary ",
                          )}
                        >
                          <div
                            className={cn(
                              "flex items-center justify-between gap-4 px-2 py-1 rounded-md",
                            )}
                          >
                            <div className="flex items-center gap-2">
                              {priority.icon}
                              <p>{priority?.label}</p>
                            </div>
                            {selectedPriority?.value === priority.value && (
                              <X />
                            )}
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </PopoverContent>
              </Popover>
            </>
          );
        }
        return (
          <Button
            onClick={() => {
              // setBoardSubHeaderFilterSelected(data.id);
              handleSelectedFilter(data.id);
            }}
            title={`Filter by ${data?.title}`}
            aria-label={`Filter by ${data?.title}`}
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
              {boardSubHeaderFilterSelected === data?.id && <X />}
            </div>
          </Button>
        );
      })}
    </>
  );
}
