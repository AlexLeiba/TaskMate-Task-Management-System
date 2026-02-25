"use client";
import { useEffect, useRef, useState } from "react";
import { Logo } from "../../Logo/Logo";
import { IconButton } from "@/components/ui/iconButton";
import { Menu, X } from "lucide-react";
import { TabType } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HEADER_CARD_TABS_FEATURES,
  HEADER_CARD_TABS_TITLES,
  NAV_LINKS,
} from "@/lib/consts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function HeaderMobileContent() {
  const navigate = useRouter();
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const [openedTabs, setOpenedTabs] = useState<TabType["value"]>(null);
  const [isOpened, setIsOpened] = useState(false);

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
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpened]);

  function handleNavigate(pathname: string) {
    setIsOpened(false);
    setOpenedTabs(null);
    navigate.push(pathname);
  }
  return (
    <>
      <div className="bg-background-element fixed top-0 left-0 right-0  px-4 py-2 z-50 md:hidden ">
        <div className="flex justify-between items-center ">
          <Logo />

          <IconButton
            className="py-3 px-2"
            onClick={() => setIsOpened((prev) => !prev)}
          >
            {isOpened ? <X size={20} /> : <Menu size={20} />}
          </IconButton>
        </div>
      </div>

      <div
        style={{
          transform: isOpened ? `translateY(52px)` : `translateY(-100%)`,
        }}
        className={
          "fixed inset-0 z-50  bg-background-element transition-all md:hidden h-full flex flex-col justify-between overflow-y-auto"
        }
      >
        <Accordion type="single" collapsible defaultValue={""}>
          {HEADER_CARD_TABS_TITLES.map((section) => {
            return (
              <AccordionItem
                value={section.section || ""}
                key={section.section}
              >
                <AccordionTrigger
                  onClick={() => setOpenedTabs(section.section)}
                  title={section.section}
                  aria-label={section.section}
                  className={cn(
                    openedTabs === section.section
                      ? "bg-foreground/90"
                      : "bg-none",
                    "p-4 hover:bg-foreground/50 cursor-pointer flex justify-between items-center",
                    "transition-all duration-200 ease-in-out",
                  )}
                >
                  <div className="flex gap-2 items-center">
                    <p className="text-lg">{section.label}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className=" pt-2 px-4 flex flex-col gap-4 ">
                  {HEADER_CARD_TABS_FEATURES[section.section].map((item) => {
                    return (
                      <div key={item.id} className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <p className="text-lg">{item.title}</p>;
                        </div>

                        <p>{item.description}</p>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        <div className="mx-4 pb-20 pt-4">
          <div className="flex gap-2 flex-col">
            <Button
              variant={"outline"}
              title="Login"
              onClick={() => handleNavigate(NAV_LINKS.signin.pathname)}
            >
              <p className="text-base">{NAV_LINKS.signin.label}</p>
            </Button>
            <Button
              variant={"tertiary"}
              title="Join for Free"
              onClick={() => handleNavigate(NAV_LINKS.signup.pathname)}
            >
              <p className="text-base">{NAV_LINKS.signup.label}</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
