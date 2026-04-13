import { IconButton } from "@/components/ui/iconButton";
import { useGetBoardData } from "@/hooks/useGetBoardData";
import { BOARD_HEADER_TABS } from "@/lib/consts/protected/board";

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
  const { fetchBoardFilteredListData, loading } = useGetBoardData();

  function handleSelectTabSection(tab: BoardTabSectionType) {
    handleCloseMenu();

    setBoardTabSections(tab);

    if (tab === "refresh") {
      fetchBoardFilteredListData({ filters: "all" });
    }
  }
  return (
    <>
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
    </>
  );
}
