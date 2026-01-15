"use client";
import { IconButton } from "@/components/ui/iconButton";
import { X } from "lucide-react";
import { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  data: {
    title: string;
    imageUrl: string;
    id: string;
  };
  handleModalDeleteBoard: () => void;
  handleSelectBoard: () => void;
};
export function BoardCard({
  data: { title, imageUrl, ...props },
  handleModalDeleteBoard,
  handleSelectBoard,
}: Props) {
  return (
    <>
      <div
        className="relative overflow-hidden bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <IconButton
          aria-label={title}
          title={title}
          className="w-full  rounded-md p-2 h-28  overflow-hidden cursor-pointer hover:opacity-70 flex items-start justify-start"
          onClick={handleSelectBoard}
        >
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>

          <p className="text-left line-clamp-3 text-sm text-white font-bold z-20 relative">
            {title}
          </p>
        </IconButton>
        <IconButton
          title={`Delete - ${title}`}
          aria-label={`Delete - ${title}`}
          onClick={handleModalDeleteBoard}
          className="absolute top-2 right-2 rounded-full p-1 z-20 bg-gray-800/30 cursor-pointer hover:bg-gray-800 text-gray-500 hover:text-white"
        >
          <X className="" size={20} />
        </IconButton>
      </div>
    </>
  );
}
