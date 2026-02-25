import { cn } from "@/lib/utils";
import { variantsPublicCardColors } from "@/lib/variantsPublicCardColors";
import React from "react";

type Props = {
  data: {
    id: number;
    title: string;
    description: string;
  };
  index: 1 | 2 | 3 | 4 | 5;
  selected: boolean;
  handleClick: () => void;
};
export function FeatureCard({ data, selected, index, handleClick }: Props) {
  return (
    <div
      className={cn(
        selected ? "shadow-2xl  bg-muted" : "",
        "flex flex-col gap-2 cursor-pointer rounded-md py-4 px-6 relative overflow-hidden",
      )}
      onClick={handleClick}
    >
      <div
        className={cn(
          selected ? "h-full" : " h-0",
          "absolute  w-2 left-0 top-0 transition-all duration-500 ease-in-out",
          variantsPublicCardColors({ index }),
        )}
      />
      <p className="text-xl">{data.title}</p>
      <p className="text-base">{data.description}</p>
    </div>
  );
}
