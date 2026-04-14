import { InputSearch } from "@/components/ui/inputSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { useStore } from "@/store/useStore";
import React, { useState } from "react";

export function Search() {
  const [searchTitleLocal, setSearchTitleLocal] = useState("");
  const setfilterState = useStore((state) => state.setFilterState);
  const searchTable = useDebounce(setfilterState, 1000);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTitleLocal(event.target.value);

    searchTable({ filters: "search", search: event.target.value });
  }
  return (
    <InputSearch
      className="h-6 bg-background! text-sm"
      placeholder="Search by title..."
      value={searchTitleLocal}
      onChange={handleSearch}
    />
  );
}
