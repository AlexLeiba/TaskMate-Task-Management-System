import { IconButton } from "@/components/ui/iconButton";
import { UploadedFile } from "@/lib/generated/prisma/client";

import { X } from "lucide-react";

type Props = {
  data: UploadedFile;
  handleDownloadFile: (url: string, name?: string) => void;
  handleDeleteFile: (fileId: string, name: string) => void;
};
export function DownloadFileCard({
  data,
  handleDownloadFile,
  handleDeleteFile,
}: Props) {
  return (
    <div className="px-3 relative">
      <IconButton
        title="Download file"
        aria-label="Download file"
        className="w-full bg-gray-700 px-4 py-2 rounded-md  "
        onClick={() => handleDownloadFile(data.url, data.name || "")}
        classNameChildren="w-full!"
      >
        <p className="line-clamp-1">{data.name}</p>
      </IconButton>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteFile(data.id, data.name || "");
        }}
        className="absolute -top-6 right-0 text-gray-300 p-2 hover:bg-gray-600 rounded-full hover:text-white"
        title="Detele file"
        aria-label="Delete file"
      >
        <X size={15} />
      </IconButton>
    </div>
  );
}
