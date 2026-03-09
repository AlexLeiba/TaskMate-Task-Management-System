"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CardTabs } from "./CardTabs";
import { SideTabsContent } from "./SideTabsContent";
import { HEADER_TABS_TITLE } from "@/lib/consts";
import { TabType } from "@/lib/types";

type Props = {
  type: TabType["value"];
};

export function ExpandedTab({ type }: Props) {
  return (
    <div
      style={{
        transform: type ? `translateY(52px) ` : `translateY(-200%)`,
      }}
      className={cn(
        " transition-all ease-in-out duration-500 fixed left-0 right-0 bg-background-element w-full  z-10",
      )}
    >
      <div className="max-w-7xl m-auto p-4">
        {type && (
          <h5 className="text-xl">
            {HEADER_TABS_TITLE[type] === "About"
              ? "About us"
              : HEADER_TABS_TITLE[type]}
          </h5>
        )}

        <Separator className="my-4" />

        <div className="grid grid-cols-[2fr_1fr] gap-4">
          {type && (
            <>
              <CardTabs type={type} /> <SideTabsContent type={type} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
