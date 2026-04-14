import { IconButton } from "@/components/ui/iconButton";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetBoardData } from "@/hooks/useGetBoardData";
import { BOARD_HEADER_TABS } from "@/lib/consts/protected/board";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { BoardTabSectionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

export function DropdownBoardTabSectionsContent({
  handleCloseMenu,
}: {
  handleCloseMenu: () => void;
}) {
  const queryClient = useQueryClient();
  const [selectedTablocal, setSelectedTabLocal] = useState<BoardTabSectionType>(
    useStore((state) => state.boardTabSections),
  );

  const { boardTabSections, setBoardTabSections, setFilterState } = useStore(
    useShallow((state) => ({
      boardTabSections: state.boardTabSections,
      setBoardTabSections: state.setBoardTabSections,
      setFilterState: state.setFilterState,
    })),
  );

  const delayedSetTabSection = useDebounce(setBoardTabSections, 100);

  const { fetchBoardFilteredListData, loading } = useGetBoardData();

  function handleSelectTabSection(tab: BoardTabSectionType) {
    setSelectedTabLocal(tab);
    delayedSetTabSection(tab);
    handleCloseMenu();

    if (tab === "refresh") {
      // change only when table view is selected
      if (boardTabSections === "list") {
        setFilterState({
          filters: "all",
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.pages.board.tableListView.getAllTableData],
        });
      }
      // TODO change to setFilterState
      fetchBoardFilteredListData({ filters: "all" });
    }
    fetchBoardFilteredListData({ filters: "all" });
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
              selectedTablocal === tab.value &&
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
