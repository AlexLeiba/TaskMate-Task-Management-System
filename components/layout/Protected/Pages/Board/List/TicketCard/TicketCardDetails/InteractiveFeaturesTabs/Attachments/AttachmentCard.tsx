import { Fragment } from "react";
import { UserCard } from "../../../../../../../UserCard/UserCard";
import { PreviewImageCard } from "./PreviewImageCard";
import { DownloadFileCard } from "./DownloadFileCard";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Attachments, UploadedFile, User } from "@/lib/generated/prisma/client";
import { DATE_FORMAT } from "@/lib/consts";

type Props = {
  data: Attachments & {
    files: UploadedFile[];
    author: User;
  };
  handleDeleteImage: (fieldId: string, name: string | "", id: string) => void;
  handleDeleteFile: (fieldId: string, name: string | "", id: string) => void;
  handlePreviewImage: (url: string, name?: string) => void;
  handleDownloadFile: (url: string, name?: string) => void;
};
export function AttachmentCard({
  data: attachment,
  handleDeleteImage,
  handleDeleteFile,
  handlePreviewImage,
  handleDownloadFile,
}: Props) {
  return (
    <div key={attachment.author.id} className="flex flex-col gap-2">
      <UserCard data={attachment.author} size={"sm"} />

      <div className="flex gap-6 mt-4 flex-wrap items-end">
        {attachment.files.map((file) => {
          return (
            <Fragment key={file.id}>
              {/*PREVIEW IMAGE */}
              {file.type === "image" ? (
                <PreviewImageCard
                  key={file.id}
                  data={file}
                  handleDeleteImage={handleDeleteImage}
                  handleViewImage={handlePreviewImage}
                />
              ) : (
                <DownloadFileCard
                  handleDeleteFile={handleDeleteFile}
                  key={file.id}
                  data={file}
                  handleDownloadFile={handleDownloadFile}
                />
                // DOWNLOAD FILE
              )}
            </Fragment>
          );
        })}
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center px-2">
            <p className="text-xs text-gray-400">
              {format(new Date(attachment.createdAt as Date), DATE_FORMAT)}
            </p>
          </div>
          <Separator className="h-px my-1" />
        </div>
      </div>
    </div>
  );
}
