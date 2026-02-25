"use client";
import { IconButton } from "@/components/ui/iconButton";
import { ChevronDown, X } from "lucide-react";

import { ExpandedTab } from "./ExpandedTab";
import { Logo } from "../../Logo/Logo";
import Links from "../Links";

import { HEADER_TABS_LINKS } from "@/lib/consts";
import { useEffect, useRef, useState } from "react";
import { TabType } from "@/lib/types";

export function HeaderDesktopTabletContent() {
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const [openedTabs, setOpenedTabs] = useState<TabType["value"]>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tabContainerRef.current &&
        !tabContainerRef.current.contains(event.target as Node)
      ) {
        setOpenedTabs(null);
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={tabContainerRef} className="hidden md:block">
      <div className="bg-background-element fixed top-0 left-0 right-0   py-2 z-20 ">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-12">
            <Logo />
            <div className="flex items-center gap-8 px-4 py-2  ">
              {HEADER_TABS_LINKS.map((tab) => (
                <IconButton
                  onClick={() => setOpenedTabs(tab.value)}
                  key={tab.value}
                  classNameChildren="group"
                >
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col justify-center gap-1">
                      <div className="flex items-center gap-1">
                        <p>{tab.label}</p>

                        <ChevronDown
                          size={20}
                          className="group-hover:translate-y-1.25 transition-all group-hover:text-tertiary"
                        />
                      </div>
                      <div
                        style={{
                          width: tab.value === openedTabs ? "100%" : 0,
                        }}
                        className=" bg-tertiary h-px transition-all"
                      />
                    </div>
                  </div>
                </IconButton>
              ))}
            </div>
          </div>

          {/* AUTH BUTTONS */}
          <Links />
        </div>
      </div>

      <ExpandedTab type={openedTabs} />
    </div>
  );
}
