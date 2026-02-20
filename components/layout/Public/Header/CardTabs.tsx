"use client";

import { IconButton } from "@/components/ui/iconButton";
import { HEADER_CARD_TABS_FEATURES } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { variantsTabCardColors } from "@/lib/variantsTabsCardsColors";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  type: "features" | "solutions" | "about";
};

export function CardTabs({ type }: Props) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
      {HEADER_CARD_TABS_FEATURES[type].map((card, index) => {
        return (
          <Link
            title={card.title}
            aria-label={card.title}
            target="_blank"
            href={card.link}
            key={card.id}
            className={cn(
              variantsTabCardColors({
                index: index as unknown as 0 | 1 | 2 | 3 | 4 | 5,
              }),
              "rounded-md p-2 flex flex-col gap-2 cursor-pointer",
            )}
          >
            <div className="flex gap-2 items-center">
              {card.icon}
              <p className="text-lg">{card.title}</p>
            </div>
            <p className="text-sm">{card.description}</p>
          </Link>
        );
      })}
      <Link
        href={"/"}
        title="All Teams"
        aria-label="All Teams"
        className="flex"
      >
        <IconButton classNameChildren="flex items-center gap-2 pt-2 group">
          <p>See all teams </p>

          <ChevronRight className="text-tertiary group-hover:translate-x-2 transition-all" />
        </IconButton>
      </Link>
    </div>
  );
}
