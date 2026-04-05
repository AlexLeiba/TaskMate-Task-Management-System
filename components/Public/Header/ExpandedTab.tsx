"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CardTabs } from "./CardTabs";
import { SideTabsContent } from "./SideTabsContent";
import { TabType } from "@/lib/types";
import { HEADER_TABS_TITLE } from "@/lib/consts/public/header";
import { Spacer } from "@/components/ui/spacer";

type Props = {
  openedTab: TabType["value"];
};

export function ExpandedTab({ openedTab }: Props) {
  return (
    <div
      data-test="expanded-header-tab"
      style={{
        transform: openedTab ? `translateY(52px)` : `translateY(-100%)`,
      }}
      className={cn(
        "transition-all ease-in-out duration-500 fixed left-0 right-0 bg-background-element w-full  z-10 ",
      )}
    >
      <div className="max-w-7xl m-auto p-4">
        <Spacer size={2} />
        {openedTab && (
          <h5 className="text-xl">
            {HEADER_TABS_TITLE[openedTab] === "Plans"
              ? "Future plans"
              : HEADER_TABS_TITLE[openedTab]}
          </h5>
        )}

        <Separator className="my-4" />

        <div className="grid grid-cols-[2fr_1fr] gap-4">
          {openedTab && (
            <>
              <CardTabs type={openedTab} /> <SideTabsContent type={openedTab} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
