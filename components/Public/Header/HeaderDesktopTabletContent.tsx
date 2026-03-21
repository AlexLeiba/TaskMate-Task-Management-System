"use client";
import { IconButton } from "@/components/ui/iconButton";
import { ChevronDown } from "lucide-react";

import { ExpandedTab } from "./ExpandedTab";
import { Logo } from "../../Shared/Logo";
import Links from "../AuthLinks";

import { useEffect, useRef, useState } from "react";
import { TabType } from "@/lib/types";
import { HEADER_TABS_LINKS } from "@/lib/consts/links";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const ScrollProgressBar = dynamic(() =>
  import("./ScrollProgressBar").then((m) => m.ScrollProgressBar),
);

export function HeaderDesktopTabletContent() {
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const scrollValue = useRef(0);
  const [openedTabs, setOpenedTabs] = useState<TabType["value"]>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

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

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    function handleScroll() {
      const scrollY = window.scrollY;

      if (scrollValue.current < scrollY && scrollY > 100) {
        setIsHeaderVisible(false);
        scrollValue.current = scrollY;
        return;
      }
      setIsHeaderVisible(true);
      scrollValue.current = scrollY;
    }

    return () => {
      document.removeEventListener("scroll", handleScroll);
      scrollValue.current = 0;
    };
  }, []);

  return (
    <div ref={tabContainerRef} className="hidden md:block relative">
      <div
        style={{
          transform: isHeaderVisible ? `translateY(0)` : `translateY(-99%)`,
        }}
        className={cn(
          openedTabs ? "bg-background-element" : "bg-tertiary-dark",
          " fixed top-0 left-0 right-0   py-2 z-20 transition-all ",
        )}
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-12">
            <Logo />
            <div className="flex items-center gap-8 px-4 py-2 ">
              {/* TRIGGER */}
              {HEADER_TABS_LINKS.map((tab, i) => (
                <IconButton
                  title={`Open ${tab.label} tab`}
                  aria-label={`Open ${tab.label} tab`}
                  onClick={() => setOpenedTabs(tab.value)}
                  key={tab.value}
                  classNameChildren="group"
                >
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col justify-center gap-1">
                      <div className="flex items-center gap-1">
                        <p>{tab.label}</p>

                        <ChevronDown
                          style={{ animationDelay: `${i * 100}ms` }}
                          size={20}
                          className="group-hover:translate-y-1.25 transition-all group-hover:text-tertiary header-chevron-down"
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
        <ScrollProgressBar />
      </div>
      {/* CONTENT */}
      <ExpandedTab type={openedTabs} />
    </div>
  );
}
