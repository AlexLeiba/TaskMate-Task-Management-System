import { IconButton } from "@/components/ui/iconButton";
import { KEYBOARD } from "@/lib/consts";
import { UploadedFile } from "@/lib/generated/prisma/client";

import { X } from "lucide-react";
import Image from "next/image";

type Props = {
  data: UploadedFile;
  handleDeleteImage: (imageId: string, name: string, id: string) => void;
  handleViewImage: (url: string, name?: string) => void;
};
export function PreviewImageCard({
  data,
  handleDeleteImage,
  handleViewImage,
}: Props) {
  return (
    <div
      aria-label="Preview image"
      title="Preview image"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === KEYBOARD.ENTER) {
          handleViewImage(data.id);
        }
      }}
      onClick={() => handleViewImage(data.url, data?.name || "")}
      className="relative w-25 border border-px rounded-md cursor-zoom-in group"
    >
      <div className="w-full h-17.5 overflow-hidden p">
        <Image
          src={data.url}
          alt=""
          width={200}
          height={200}
          className="object-contain w-full h-full"
        />
      </div>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteImage(data.fileId, data?.name || "", data.id);
        }}
        className="absolute -top-6 -right-4 text-gray-300 p-2 hover:bg-gray-600 rounded-full hover:text-white hidden group-hover:block"
        title="Detele image"
        aria-label="Delete image"
      >
        <X size={15} />
      </IconButton>
    </div>
  );
}
