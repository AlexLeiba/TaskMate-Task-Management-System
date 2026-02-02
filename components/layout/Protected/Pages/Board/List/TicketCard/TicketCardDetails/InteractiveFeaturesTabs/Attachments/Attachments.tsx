import { useEffect, useRef, useState } from "react";
import { IconButton } from "@/components/ui/iconButton";
import { Image, ImageDown, Plus } from "lucide-react";
import {
  DeleteFileBodyType,
  isFileMimeType,
  isImageMimeType,
  UploadFileBodyType,
} from "@/lib/types";
import { downloadAsZip, DownloadZipTypeProps } from "@/lib/utils";
import { Spacer } from "@/components/ui/spacer";
import { AttachmentCard } from "./AttachmentCard";
import { AttachmentCardSkeleton } from "./AttachmentCardSkeleton";
import { useMutation } from "@tanstack/react-query";
import {
  UploadedFile,
  User,
  type Attachments,
} from "@/lib/generated/prisma/client";
import { getCardDetailsAttachments } from "@/app/actions/card-details";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/config";
import { API_REQ_URL } from "@/lib/consts";
import { usePathname } from "next/navigation";

type Props = {
  cardDetailsId: string;
};
export function Attachments({ cardDetailsId }: Props) {
  const boardId = usePathname().split("/").at(-1);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [attachmentsData, setAttachmentsData] = useState<
    (Attachments & {
      files: UploadedFile[];
      author: User;
    })[]
  >([]);

  const uploadFileRef = useRef<HTMLInputElement>(null);

  async function getAttachmentsData() {
    const response = await getCardDetailsAttachments(cardDetailsId);

    if (response?.error?.message) {
      setIsLoading(false);
      return toast.error(response.error.message);
    }

    if (response?.data) {
      setIsLoading(false);
      if (response.data) {
        setAttachmentsData(response.data);
      }
    }
  }

  useEffect(() => {
    // eslint-disable-next-line
    setIsLoading(true);
    getAttachmentsData();
  }, [cardDetailsId]);

  async function uploadFile({
    file,
    fileType,
    fileName,
  }: {
    file: string;
    fileType: "image" | "raw";
    fileName: string;
  }) {
    if (!boardId) {
      throw new Error("Board not found");
    }

    const body: UploadFileBodyType = {
      file,
      fileType,
      boardId,
      cardDetailsId,
      fileName,
    };
    const {
      data: { data: response },
    } = await axiosInstance.post(API_REQ_URL.upload, body);

    return response as Promise<
      (Attachments & {
        files: UploadedFile[];
        author: User;
      })[]
    >;
  }

  async function deleteFile({
    fileId,
    fileName,
    fileType,
    id,
  }: {
    fileId: string;
    fileName: string;
    fileType: "raw" | "image";
    id: string;
  }) {
    try {
      if (!boardId) {
        return toast.error("Board not found");
      }
      const body: DeleteFileBodyType = {
        fileId,
        cardDetailsId,
        boardId,
        type: "single",
        fileName,
        fileType,
        id,
      };

      const response = await axiosInstance.delete(API_REQ_URL.upload, {
        data: body,
      });

      console.log(response);

      if (response?.data?.statusCode !== 200) {
        return toast.error(response?.data?.error);
      }
      toast.success("Deleted successfully");

      const attachmentData: (Attachments & {
        files: UploadedFile[];
        author: User;
      })[] = response?.data?.data;

      if (attachmentData) {
        setAttachmentsData(attachmentData);
      }
    } catch (error: any) {
      toast.error(error.message || "Error deleting a file");
    }
  }

  // UPLOAD
  const { mutate: mutateUpload, isPending: isPendingUpload } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      console.log("onSuccess", data);
      setAttachmentsData(data);
      toast.dismiss("upload-file");
      toast.success("Uploaded");
    },
    onError: ({ message }) => {
      toast.error(message || "Error uploading file, please try again");
      toast.dismiss("upload-file");
    },
  });

  // DELETE
  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationFn: deleteFile,
    onSuccess: (data) => {
      console.log("onSuccess", data);
      toast.dismiss("delete-file");
    },
    onError: ({ message }) => {
      toast.error(message || "Error deleting file, please try again");
      toast.dismiss("delete-file");
    },
  });

  function handleDeleteFile(fileId: string, fileName: string, id: string) {
    console.log("fileId", fileId);
    mutateDelete({ fileId, fileName, fileType: "raw", id });
    toast.loading("Deleting file...", { id: "delete-file" });
  }
  function handleDeleteImage(fileId: string, fileName: string, id: string) {
    console.log("imageId", fileId);
    mutateDelete({ fileId, fileName, fileType: "image", id });
    toast.loading("Deleting image...", { id: "delete-file" });
  }

  function handleOpenFileInput() {
    if (uploadFileRef.current) uploadFileRef.current.click();
  }

  async function handleChangeUploadedFile(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    if (!event.target.files) {
      return toast.error("File was not provided");
    }

    // IMAGE
    if (isImageMimeType(event.target.files[0].type) && event.target.files[0]) {
      const fileName = event.target.files[0].name;
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = () => {
        const previewFileUrl = reader.result as string;

        mutateUpload({ file: previewFileUrl, fileType: "image", fileName });
        toast.loading("Uploading image...", { id: "upload-file" });
      };

      return;
    }
    // FILE
    if (isFileMimeType(event.target.files[0].type)) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      const fileName = event.target.files[0].name;
      const fileType = event.target.files[0];
      console.log("fileType", fileType);

      reader.onload = () => {
        const previewFileUrl = reader.result as string;

        mutateUpload({
          file: previewFileUrl,
          fileType: "raw",
          fileName: fileName || "file",
        });
        toast.loading("Uploading file...", { id: "upload-file" });
      };

      return;
    }
  }

  async function handleDownloadZipFile() {
    try {
      setIsDownloadingZip(true);
      const allFilesData: DownloadZipTypeProps["files"] = [];
      attachmentsData?.forEach((attachments) => {
        attachments?.files.forEach((file) => {
          allFilesData.push({
            name: file.name || "file",
            url: file.url,
          });
        });
      });

      await downloadAsZip({ files: allFilesData, zipName: "all-files.zip" });
    } catch (error: any) {
      toast.error(
        error.message || "Error downloading zip file, please try again",
      );
    } finally {
      setIsDownloadingZip(false);
    }
  }

  async function handleDownloadFile(url: string, name?: string) {
    try {
      setIsDownloadingZip(true);

      const link = document.createElement("a");
      link.href = url;
      link.download = name || "file";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.click();

      await downloadAsZip({
        files: [{ name: name || "file", url }],
        zipName: `${name || "file"}.zip`,
      });
    } catch (error: any) {
      toast.error(
        error.message || "Error downloading zip file, please try again",
      );
    } finally {
      setIsDownloadingZip(false);
    }
  }
  function handlePreviewImage(url: string) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  }

  if (!attachmentsData || isLoading) return <AttachmentCardSkeleton />;
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
            loading={isDownloadingZip}
            disabled={
              isPendingUpload ||
              isPendingDelete ||
              isLoading ||
              isDownloadingZip
            }
            title="Download all zip file"
            aria-label="Download all zip file"
            onClick={handleDownloadZipFile}
          >
            <ImageDown className="text-yellow-600" />
          </IconButton>

          {/* UPLOAD FILE */}
          <IconButton
            disabled={
              isPendingUpload ||
              isPendingDelete ||
              isLoading ||
              isDownloadingZip
            }
            loading={isPendingUpload}
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
      <div className="flex flex-col gap-4 overflow-y-auto h-58 ">
        {/* ATTACHMENTS */}
        {attachmentsData?.length > 0 ? (
          attachmentsData.map((attachment) => (
            <AttachmentCard
              key={attachment?.author?.id}
              data={attachment}
              handleDeleteImage={handleDeleteImage}
              handleDeleteFile={handleDeleteFile}
              handlePreviewImage={handlePreviewImage}
              handleDownloadFile={handleDownloadFile}
            />
          ))
        ) : (
          <p>No attachments</p>
        )}
      </div>
    </section>
  );
}
