import { useEffect, useRef, useState } from "react";
import { IconButton } from "@/components/ui/iconButton";
import { MessageCircle, Plus } from "lucide-react";
import { AddNewInput } from "../../../../../AddNewInput";
import { CommentCard } from "./CommentCard";
import { Spacer } from "@/components/ui/spacer";
import { CommentsCardSkeleton } from "./CommentsCardSkeleton";
import { Comment, User } from "@/lib/generated/prisma/client";
import { DeleteDialog } from "@/components/layout/Protected/DeleteDialog/DeleteDialog";
import { useMutation } from "@tanstack/react-query";
import {
  createCommentAction,
  deleteCommentAction,
} from "@/app/actions/card-details";
import toast from "react-hot-toast";

type Props = {
  data: (Comment & { author: User })[] | undefined;
  cardId: string;
};
export function Comments({ data, cardId }: Props) {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [isOpenedCommentInput, setIsOpenedCommentInput] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  );

  const [comments, setComments] = useState<(Comment & { author: User })[]>([]);

  useEffect(() => {
    // eslint-disable-next-line
    setComments(data || []);
  }, [data]);

  const { mutate: mutateCreate, isPending: isPendingCreate } = useMutation({
    mutationKey: ["update-description"],
    mutationFn: createCommentAction,
    onSuccess: ({ data }) => {
      toast.dismiss("create-comment");
      toast.success("Comment created");
      if (data) {
        setComments(data);
      }
    },
    onError: ({ message }) => {
      toast.error(message || "Error creating comment, please try again");
      toast.dismiss("create-comment");
    },
  });
  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationKey: ["update-description"],
    mutationFn: deleteCommentAction,
    onSuccess: ({ data }) => {
      toast.dismiss("delete-comment");
      toast.success("Comment deleted");
      if (data) {
        setComments(data);
      }
    },
    onError: ({ message }) => {
      toast.error(message || "Error deleting comment, please try again");
      toast.dismiss("delete-comment");
    },
  });

  function handleDeleteComment() {
    // TODO, only admin can delete comment
    if (!selectedCommentId) {
      return toast.error("Error deleting comment, No comment selected");
    }
    toast.loading("Deleting comment...", { id: "delete-comment" });
    setIsDeleteModalOpened(false);
    mutateDelete({ cardId, commentId: selectedCommentId as string });
  }
  function handleOpenDeleteDialog(commentId: string) {
    setSelectedCommentId(commentId);
    setIsDeleteModalOpened(true);
    // TODO, only admin can delete comment
  }

  function handleSubmitComment(data: { [inputName: string]: string }) {
    toast.loading("Creating comment...", { id: "create-comment" });
    mutateCreate({ cardId, comment: data.comment });
    setIsOpenedCommentInput(false);
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
      <div className="flex flex-col  overflow-y-auto h-60  ">
        <AddNewInput
          disabled={isPendingDelete || isPendingCreate}
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
            disabled={isPendingDelete || isPendingCreate}
            loading={isPendingCreate}
            ref={addNewCommentRef}
            title="Add new comment"
            aria-label="Add new comment"
            className="hidden"
          >
            <Plus className="text-green-600" />
          </IconButton>
        </AddNewInput>

        {/* COMMENTS */}
        {comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            data={comment}
            handleOpenDeleteModal={() => handleOpenDeleteDialog(comment.id)}
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
