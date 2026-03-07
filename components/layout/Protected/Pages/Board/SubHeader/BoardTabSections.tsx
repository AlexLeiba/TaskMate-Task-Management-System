import { IconButton } from "@/components/ui/iconButton";

import { BOARD_HEADER_TABS } from "@/lib/consts";
import { BoardTabSectionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

export function BoardTabSections() {
  const { boardTabSections, setBoardTabSections } = useStore();

  function handleSelectTabSection(tab: BoardTabSectionType) {
    // TODO, change zustand views based on selected view
    setBoardTabSections(tab);
  }
  return (
    <div className=" items-center gap-2 md:flex hidden">
      {BOARD_HEADER_TABS.map((tab) => {
        return (
          <IconButton
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
    </div>
  );
}
