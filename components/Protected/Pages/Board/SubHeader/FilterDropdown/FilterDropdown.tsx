import { Popover, PopoverTrigger } from "@/components/ui/popover";

import { useStore } from "@/store/useStore";

import { Filter } from "lucide-react";

import { useState } from "react";

import { IconButton } from "@/components/ui/iconButton";

import dynamic from "next/dynamic";

const FilterDropdownContent = dynamic(() =>
  import("./FilterDropdownContent").then((m) => m.FilterDropdownContent),
);

export function FiltersDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { boardSubHeaderMemberIdSelected, boardSubHeaderFilterSelected } =
    useStore();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {/* TRIGGER */}
      <PopoverTrigger className="cursor-pointer" asChild>
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
          {((!isOpen && boardSubHeaderMemberIdSelected) ||
            (!isOpen &&
              boardSubHeaderFilterSelected &&
              boardSubHeaderFilterSelected !== "all")) && (
            <div className="lg:hidden size-3 rounded-full bg-red-600 absolute top-0 right-0" />
          )}
        </IconButton>
      </PopoverTrigger>

      {/* CONTENT */}
      <FilterDropdownContent />
    </Popover>
  );
}
