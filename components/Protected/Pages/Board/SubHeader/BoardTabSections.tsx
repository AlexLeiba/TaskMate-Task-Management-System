import { IconButton } from "@/components/ui/iconButton";
import { useDebounce } from "@/hooks/useDebounce";
import { BOARD_HEADER_TABS } from "@/lib/consts/protected/board";

import { BoardTabSectionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

export function BoardTabSections() {
  const { boardTabSections, setBoardTabSections } = useStore(
    useShallow((state) => ({
      setBoardTabSections: state.setBoardTabSections,
      boardTabSections: state.boardTabSections,
    })),
  );
  const [localSelectedTab, setLocalSelectedTab] =
    useState<BoardTabSectionType>(boardTabSections);
  const debounceSelectTab = useDebounce(setBoardTabSections, 100);

  // to much time takes to update this state, need to optimize it, maybe move it to local state and then update the global state after 1 second of debounce, because right now when i click on any tab section it takes around 1 second to update the state and show the selected tab section, and it makes bad user experience, because user think that the click is not working and click multiple times on the same tab section, and then after 1 second all the clicks are registered and it shows the last clicked tab section, but if i move the state to local state and then update the global state after 1 second of debounce, it will show the selected tab section immediately and then after 1 second it will update the global state, and it will make better user experience

  function handleSelectTabSection(tab: BoardTabSectionType) {
    setLocalSelectedTab(tab);
    debounceSelectTab(tab);
  }
  return (
    <div className=" items-center gap-2 md:flex hidden">
      {BOARD_HEADER_TABS.map((tab) => {
        if (tab.value === "refresh") return null;
        return (
          <IconButton
            title={`Open ${tab.label} view`}
            onClick={() => handleSelectTabSection(tab.value)}
            className={cn(
              localSelectedTab === tab.value &&
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
    </div>
  );
}
