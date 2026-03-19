import { IconButton } from "@/components/ui/iconButton";
import { FILTER_TABS } from "@/lib/consts/protected/overview";
import { FinishedWorkFilterTabs } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  handleFilterTab: (tab: FinishedWorkFilterTabs) => void;
};
export function FilterTabs({ handleFilterTab }: Props) {
  const [filterTab, setFilterTab] = useState<FinishedWorkFilterTabs>(1000);

  function handleSelectTab(tab: FinishedWorkFilterTabs) {
    setFilterTab(tab);
    handleFilterTab(tab);
  }

  return (
    <div className="flex items-center gap-2 border">
      {FILTER_TABS.map((tab) => (
        <IconButton
          title={
            tab === 1000 ? "Filter by all time" : `Filter by last ${tab} days`
          }
          aria-label={
            tab === 1000 ? "Filter by all time" : `Filter by last ${tab} days`
          }
          onClick={() => handleSelectTab(tab)}
          className={cn(
            "border p-2 w-full",
            filterTab === tab && "bg-primary text-primary-foreground",
          )}
          key={tab}
        >
          {tab === 1000 ? "All" : tab}
        </IconButton>
      ))}
    </div>
  );
}
