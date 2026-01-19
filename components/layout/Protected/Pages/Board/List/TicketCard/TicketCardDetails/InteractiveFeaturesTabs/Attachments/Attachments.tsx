import { useRef } from "react";
import { IconButton } from "@/components/ui/iconButton";
import { Image, ImageDown, Plus } from "lucide-react";
import { AttachmentsType, isFileMimeType, isImageMimeType } from "@/lib/types";
import { downloadAsZip, DownloadZipTypeProps } from "@/lib/utils";
import { Spacer } from "@/components/ui/spacer";
import { AttachmentCard } from "./AttachmentCard";
import { AttachmentCardSkeleton } from "./AttachmentCardSkeleton";

// TODO, fetch attachments on opening this tab, show skeleton while is downloading in browser
const now = new Date("2023-01-01T00:00:00").getTime();
const attachmentsData: AttachmentsType[] = [
  {
    files: [
      {
        type: "image/png",
        id: "123",
        name: "image.png",
        url: "https://picsum.photos/300/300",
      },
      {
        type: "image/png",
        id: "1236",
        name: "image.png",
        url: "https://picsum.photos/300/300",
      },
      {
        type: "image/png",
        id: "123556",
        name: "image.png",
        url: "https://picsum.photos/300/300",
      },
    ],
    createdAt: now,

    author: {
      email: "sample@example.com",
      name: "Sample User",
      avatar: `https://picsum.photos/300/300`,
      id: "1232",
    },
  },
  {
    files: [
      {
        type: "image/png",
        id: "1672ds3",
        name: "image.png",
        url: "https://picsum.photos/300/300",
      },
      {
        type: "application/pdf",
        id: "1672dsds3",
        name: "my-file2.pdf",
        url: "https://picsum.photos/300/300",
      },
      {
        type: "application/pdf",
        id: "1672ddsdss3",
        name: "my-file.pdf",
        url: "https://picsum.photos/300/300",
      },
    ],
    createdAt: now,
    author: {
      email: "sample@example.com",
      name: "Sample User",
      avatar: `https://picsum.photos/300/300`,
      id: "12763",
    },
  },
  {
    files: [
      {
        type: "image/png",
        id: "127ds673",
        name: "image.png",
        url: "https://picsum.photos/300/300",
      },
      {
        type: "image/png",
        id: "127dsd673",
        name: "image.png",
        url: "https://picsum.photos/300/300",
      },
    ],
    createdAt: now,
    author: {
      email: "sample@example.com",
      name: "Sample User 2",
      avatar: `https://picsum.photos/300/300`,
      id: "1267333",
    },
  },
];
type Props = {
  cardId: string;
  listId: string | undefined;
};
export function Attachments({ cardId, listId }: Props) {
  const uploadFileRef = useRef<HTMLInputElement>(null);
  function handleDeleteFile(fileId: string) {
    console.log("🚀 ~ handleDeleteFile ~ fileId:", fileId);
  }
  function handleDeleteImage(imageId: string) {
    console.log("🚀 ~ handleDeleteImage ~ imageId:", imageId);
    // TODO, api on change image by id, show new images on frontend
  }

  function handleOpenFileInput() {
    if (uploadFileRef.current) uploadFileRef.current.click();
  }

  async function handleChangeUploadedFile(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    console.log("🚀 ~ handleChangeUploadedFile ~ event:", event);

    if (!event.target.files) return;
    // TOdO api req with file

    // IMAGE
    if (isImageMimeType(event.target.files[0].type) && event.target.files[0]) {
      console.log("image", event.target.files[0].type);
      const previewFileUrl = URL.createObjectURL(event.target.files[0]);
      console.log(
        "🚀 ~ handleChangeUploadedFile ~ previewFileUrl:",
        previewFileUrl
      );
      // TODO apir req, update frontend with new file

      return;
    }
    // FILE
    if (isFileMimeType(event.target.files[0].type)) {
      console.log("file", event.target.files[0].type);
      const previewFileUrl = URL.createObjectURL(event.target.files[0]);
      console.log(
        "🚀 ~ handleChangeUploadedFile ~ previewFileUrl:",
        previewFileUrl
      );

      // TODO, make api req with file blob

      return;
    }
  }

  async function handleDownloadZipFile() {
    const allFilesData: DownloadZipTypeProps["files"] = [];
    attachmentsData?.forEach((attachments) => {
      attachments.files.forEach((file) => {
        allFilesData.push({
          name: file.name || "file",
          url: file.url,
        });
      });
    });

    await downloadAsZip({ files: allFilesData, zipName: "all-files.zip" });
  }

  function handleDownloadFile(url: string, name?: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = name || "file";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  }
  function handlePreviewImage(url: string) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  }

  if (!attachmentsData) return <AttachmentCardSkeleton />;
  return (
    <section>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center ">
          <Image />
          <h5 className="text-xl font-medium">Attachments</h5>
        </div>
        <div className="flex gap-4 items-center">
          {/* DOWNLOAD ZIP */}
          <IconButton
            title="Download all zip file"
            aria-label="Download all zip file"
            onClick={handleDownloadZipFile}
          >
            <ImageDown className="text-yellow-600" />
          </IconButton>

          {/* UPLOAD FILE */}
          <IconButton
            title="Upload file"
            aria-label="Upload file"
            onClick={handleOpenFileInput}
          >
            <Plus className="text-green-600" />
          </IconButton>
          <input
            type="file"
            className="hidden"
            ref={uploadFileRef}
            onChange={handleChangeUploadedFile}
          />
        </div>
      </div>
      <Spacer size={4} />
      <div className="flex flex-col gap-4 overflow-y-auto h-64 ">
        {/* ATTACHMENTS */}
        {attachmentsData.map((attachment) => (
          <AttachmentCard
            key={attachment.author.id}
            data={attachment}
            handleDeleteImage={handleDeleteImage}
            handleDeleteFile={handleDeleteFile}
            handlePreviewImage={handlePreviewImage}
            handleDownloadFile={handleDownloadFile}
          />
        ))}
      </div>
    </section>
  );
}
