import { IconButton } from "@/components/ui/iconButton";
import { UnsplashImagesType } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  data: UnsplashImagesType;
  selected: boolean;
};
export function DialogBoardCard({ data, selected, ...props }: Props) {
  return (
    <IconButton
      {...props}
      className={cn(
        selected ? "ring-2" : "",
        "max-h-24 min-h-24 w-full overflow-hidden rounded-md bg-gray-700 relative cursor-pointer hover:ring transition-all  group",
      )}
    >
      {data.urls.small && (
        <Image
          src={data.urls.small}
          alt={data.title}
          width={200}
          height={200}
          className="object-cover w-full h-full z-0"
        />
      )}
      <div
        className={cn(
          selected ? "block" : "hidden group-hover:block",
          "absolute bottom-0 left-0 right-0 bg-black/50 ",
        )}
      >
        <p className="px-2 py-1 line-clamp-2 text-xs">{data.title}</p>
      </div>
    </IconButton>
  );
}
