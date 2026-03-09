import { useState } from "react";
import { IconButton } from "@/components/ui/iconButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BOARD_HEADER_TABS } from "@/lib/consts";
import { BoardTabSectionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { Menu } from "lucide-react";

export function DropdownBoardTabSections() {
  const [isOpen, setIsOpen] = useState(false);
  const { boardTabSections, setBoardTabSections } = useStore();

  function handleSelectTabSection(tab: BoardTabSectionType) {
    setBoardTabSections(tab);
  }
  return (
    <div className="md:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <IconButton
            className="p-2 relative"
            title="Navigation menu"
            aria-label="Navigation menu"
          >
            <Menu />
            {isOpen && (
              <div className="size-3 rounded-full bg-green-400 absolute top-0 right-0" />
            )}
          </IconButton>
        </PopoverTrigger>

        <PopoverContent className="flex flex-col gap-2" align="end">
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
        </PopoverContent>
      </Popover>
    </div>
  );
}
