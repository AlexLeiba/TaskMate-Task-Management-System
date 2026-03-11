import { PopoverContent } from "@/components/ui/popover";
import { FILTERS_DATA } from "@/lib/consts";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FilterStates } from "@/lib/types";
import { useGetBoardFilteredData } from "@/hooks/useGetBoardFilteredData";
import { useResponsive } from "@/hooks/useResponsive";
import { BREAKPOINTS } from "@/lib/breakpoints";
import { FilterDropdownMembersContent } from "./FilterDropdownMembersContent";

export function FilterDropdownContent({
  handleCloseMenu,
}: {
  handleCloseMenu: () => void;
}) {
  const { fetchBoardFilteredListData } = useGetBoardFilteredData();
  const isTablet = useResponsive(BREAKPOINTS.lg);

  const { boardSubHeaderFilterSelected, setBoardSubHeaderFilterSelected } =
    useStore();

  function handleSelectedFilter(filterState: FilterStates) {
    handleCloseMenu();
    const selectedFilter = setBoardSubHeaderFilterSelected(filterState);

    if (selectedFilter === "theSame") {
      fetchBoardFilteredListData("", false, "all");
      return;
    }
    fetchBoardFilteredListData("", false, selectedFilter);
  }

  return (
    <PopoverContent className="flex flex-col gap-3 p-2 w-full" align="end">
      {/* MEMBER FILTERS */}
      {isTablet && (
        <FilterDropdownMembersContent
          handleCloseMenu={() => handleCloseMenu()}
        />
      )}

      {/* STATS FILTERS */}
      {FILTERS_DATA.map((data) => {
        return (
          <Button
            onClick={() => {
              // setBoardSubHeaderFilterSelected(data.id);
              handleSelectedFilter(data.id);
            }}
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
  );
}
