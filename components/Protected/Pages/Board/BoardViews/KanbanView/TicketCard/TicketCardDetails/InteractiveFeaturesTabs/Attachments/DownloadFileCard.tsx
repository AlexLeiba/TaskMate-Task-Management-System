import { IconButton } from "@/components/ui/iconButton";
import { UploadedFile } from "@/lib/generated/prisma/client";

import { X } from "lucide-react";

type Props = {
  data: UploadedFile;
  isAuthor?: boolean;
  disabled?: boolean;
  handleDownloadFile: () => void;
  handleDeleteFile: () => void;
};
export function DownloadFileCard({
  data,
  isAuthor = false,
  disabled = false,
  handleDownloadFile,
  handleDeleteFile,
}: Props) {
  return (
    <div className="px-3 relative group">
      <IconButton
        title="Download file"
        aria-label="Download file"
        className="w-full bg-gray-700 px-4 py-2 rounded-md  "
        onClick={handleDownloadFile}
        classNameChildren="w-full!"
      >
        <p className="line-clamp-1">{data.name}</p>
      </IconButton>
      {isAuthor && (
        <IconButton
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteFile();
          }}
          className="absolute -top-6 right-0 text-gray-300 p-2 hover:bg-gray-600 rounded-full hover:text-white lg:hidden  group-hover:block"
          title="Detele file"
          aria-label="Delete file"
        >
          <X size={15} />
        </IconButton>
      )}
    </div>
  );
}
