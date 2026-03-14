import { useState } from "react";
import { IconButton } from "@/components/ui/iconButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Menu } from "lucide-react";
import dynamic from "next/dynamic";

const DropdownBoardTabSectionsContent = dynamic(() =>
  import("./DropdownBoardTabSectionsContent").then(
    (m) => m.DropdownBoardTabSectionsContent,
  ),
);

export function DropdownBoardTabSections() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
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
        {/* CONTENT */}
        <PopoverContent className="flex flex-col gap-2" align="end">
          {isOpen && (
            <DropdownBoardTabSectionsContent
              handleCloseMenu={() => setIsOpen(false)}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
