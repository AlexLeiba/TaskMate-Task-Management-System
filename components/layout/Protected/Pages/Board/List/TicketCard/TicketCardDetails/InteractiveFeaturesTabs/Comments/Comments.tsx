import { useRef, useState } from "react";

import { IconButton } from "@/components/ui/iconButton";
import { MessageCircle, Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddNewInput } from "../../../../../AddNewInput";
import { CommentCard } from "./CommentCard";
import { Spacer } from "@/components/ui/spacer";
import { CommentsCardSkeleton } from "./CommentsCardSkeleton";
import { Comment, User } from "@/lib/generated/prisma/client";
import { DeleteDialog } from "@/components/layout/Protected/DeleteDialog/DeleteDialog";

type Props = {
  data: (Comment & { author: User })[] | undefined;
};
export function Comments({ data }: Props) {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [isOpenedCommentInput, setIsOpenedCommentInput] = useState(false);

  function handleDeleteComment() {
    // TODO, only admin can delete comment
  }

  function handleSubmitComment(data: { [inputName: string]: string }) {
    console.log("🚀 ~ handleSubmitComment ~ data:", data);
  }

  const addNewCommentRef = useRef<HTMLButtonElement>(null);

  function handleOpenNewCommentInput() {
    if (addNewCommentRef.current) addNewCommentRef.current.click();
  }
  if (!data) return <CommentsCardSkeleton />;
  return (
    <section>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center ">
          <MessageCircle />
          <h5 className="text-xl font-medium">Comments</h5>
        </div>
        <IconButton
          title="Add new comment"
          aria-label="Add new comment"
          onClick={handleOpenNewCommentInput}
        >
          <Plus className="text-green-600" />
        </IconButton>
      </div>
      <Spacer size={4} />

      {/* SCROLLABLE COMMENTS SECTION */}
      <div className="flex flex-col  overflow-y-auto h-64 ">
        <AddNewInput
          buttonDirection="column"
          className="py-0"
          classNameContainer="py-0"
          type="textarea"
          inputName="comment"
          placeholder="Type your comment here..."
          isOpenedTitleInput={isOpenedCommentInput}
          setIsOpenedTitleInput={setIsOpenedCommentInput}
          handleSubmitValue={(v) => handleSubmitComment(v)}
        >
          {/* HIDDEN BUTTON: ONLY OPENS THE INPUT */}
          <IconButton
            ref={addNewCommentRef}
            title="Add new comment"
            aria-label="Add new comment"
            className="hidden"
          >
            <Plus className="text-green-600" />
          </IconButton>
        </AddNewInput>

        {/* COMMENTS */}
        {data.map((comment) => (
          <CommentCard
            key={comment.id}
            data={comment}
            handleOpenDeleteModal={() => setIsDeleteModalOpened(true)}
          />
        ))}

        <DeleteDialog
          deleteDialogOpen={isDeleteModalOpened}
          setDeleteDialogOpen={setIsDeleteModalOpened}
          handleDelete={handleDeleteComment}
        />
      </div>
    </section>
  );
}
