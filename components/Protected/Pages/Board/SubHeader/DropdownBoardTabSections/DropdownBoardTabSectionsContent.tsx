import { IconButton } from "@/components/ui/iconButton";
import { PopoverContent } from "@/components/ui/popover";
import { useGetBoardFilteredData } from "@/hooks/useGetBoardFilteredData";
import { BOARD_HEADER_TABS } from "@/lib/consts";
import { BoardTabSectionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { useShallow } from "zustand/shallow";

export function DropdownBoardTabSectionsContent({
  handleCloseMenu,
}: {
  handleCloseMenu: () => void;
}) {
  const { boardTabSections, setBoardTabSections } = useStore(
    useShallow((state) => ({
      boardTabSections: state.boardTabSections,
      setBoardTabSections: state.setBoardTabSections,
    })),
  );
  const { fetchBoardFilteredListData, loading } = useGetBoardFilteredData();

  function handleSelectTabSection(tab: BoardTabSectionType) {
    handleCloseMenu();

    setBoardTabSections(tab);

    if (tab === "refresh") {
      fetchBoardFilteredListData("");
    }
  }
  return (
    <PopoverContent className="flex flex-col gap-2" align="end">
      {BOARD_HEADER_TABS.map((tab) => {
        return (
          <IconButton
            disabled={loading}
            title={`Open ${tab.label} view`}
            onClick={() => handleSelectTabSection(tab.value)}
            className={cn(
              boardTabSections === tab.value &&
                "outline-1 outline-gray-300 rounded-md",
              "flex flex-col w-full p-1.5",
            )}
            key={tab.id}
          >
            <div className="flex items-center gap-1">
              {tab.icon}
              <p>{tab.label}</p>
            </div>
          </IconButton>
        );
      })}
    </PopoverContent>
  );
}
