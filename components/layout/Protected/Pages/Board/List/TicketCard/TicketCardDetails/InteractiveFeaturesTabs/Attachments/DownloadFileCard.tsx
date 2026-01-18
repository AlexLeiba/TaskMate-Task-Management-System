import { IconButton } from "@/components/ui/iconButton";
import { UploadedFileType } from "@/lib/types";
import { X } from "lucide-react";

type Props = {
  data: UploadedFileType;
  handleDownloadFile: (url: string, name?: string) => void;
  handleDeleteFile: (fileId: string) => void;
};
export function DownloadFileCard({
  data,
  handleDownloadFile,
  handleDeleteFile,
}: Props) {
  return (
    <div className="w-full px-3 relative">
      <IconButton
        title="Download file"
        aria-label="Download file"
        className="w-full bg-gray-700 px-4 py-2 rounded-md  "
        onClick={() => handleDownloadFile(data.url, data.name)}
        classNameChildren="w-full!"
      >
        <p className="line-clamp-1">{data.name}</p>
      </IconButton>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteFile(data.id);
        }}
        className="absolute -top-6 right-2 text-red-600 p-2 hover:bg-gray-600 rounded-full hover:text-white"
        title="Detele file"
        aria-label="Delete file"
      >
        <X size={15} />
      </IconButton>
    </div>
  );
}
