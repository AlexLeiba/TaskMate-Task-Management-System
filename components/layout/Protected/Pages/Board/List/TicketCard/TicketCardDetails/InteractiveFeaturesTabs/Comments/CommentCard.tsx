import React from "react";
import { UserCard } from "../../../../../../../UserCard/UserCard";
import { IconButton } from "@/components/ui/iconButton";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

import { Comment, User } from "@/lib/generated/prisma/client";
import { DATE_FORMAT } from "@/lib/consts";

type Props = {
  data: Comment & { author: User };
  handleOpenDeleteModal: () => void;
};
export function CommentCard({ data: comment, handleOpenDeleteModal }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <UserCard data={comment.author} size="sm" />
      <p>{comment.comment}</p>
      <div className="flex justify-between items-center pl-2">
        <p className="text-xs text-gray-400">
          {format(new Date(comment?.createdAt as Date), DATE_FORMAT)}
        </p>

        <IconButton
          className="px-2"
          title="Detele comment"
          aria-label="Delete comment"
          onClick={handleOpenDeleteModal}
        >
          <X className="text-red-600" />
        </IconButton>
      </div>
      <Separator className="h-px my-2" />
    </div>
  );
}
