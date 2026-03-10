import { useRef, useState } from "react";
import { IconButton } from "@/components/ui/iconButton";
import { MessageCircle, Plus } from "lucide-react";
import { AddNewInput } from "../../../../../../AddNewInput";
import { CommentCard } from "./CommentCard";
import { CommentsCardSkeleton } from "./CommentsCardSkeleton";
import { Comment, User } from "@/lib/generated/prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCommentAction,
  deleteCommentAction,
  getCardDetailsComments,
} from "@/app/actions/card-details";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useBoardId } from "@/hooks/useBoardId";
import { useUserData } from "@/hooks/useUserData";

const DeleteDialog = dynamic(() =>
  import("@/components/Protected/Shared-protected/DeleteDialog/DeleteDialog").then(
    (m) => m.DeleteDialog,
  ),
);

type Props = {
  data: (Comment & { author: User })[] | undefined;
  cardDetailsId: string;
};
export function Comments({ cardDetailsId }: Props) {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [isOpenedCommentInput, setIsOpenedCommentInput] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  );
  const boardId = useBoardId();
  const user = useUserData();

  const queryClient = useQueryClient();

  async function getCommentsData() {
    try {
      const response = await getCardDetailsComments(cardDetailsId);

      if (response.data) {
        return response.data;
      }
    } catch (error: any) {
      toast.error(error.message || "Error getting comments, please try again");
    }
  }

  const { data: commentsData, isLoading } = useQuery({
    queryKey: ["fetch-comments", cardDetailsId],
    queryFn: getCommentsData,
  });

  // CREATE
  const { mutate: mutateCreate, isPending: isPendingCreate } = useMutation({
    mutationKey: ["update-description"],
    mutationFn: createCommentAction,
    onSuccess: () => {
      toast.dismiss("create-comment");
      toast.success("Comment created");
      queryClient.invalidateQueries({
        queryKey: ["fetch-comments", cardDetailsId],
      });
    },
    onError: ({ message }) => {
      toast.error(message || "Error creating comment, please try again");
      toast.dismiss("create-comment");
    },
  });

  // DELETE
  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationKey: ["update-description"],
    mutationFn: deleteCommentAction,
    onSuccess: () => {
      toast.dismiss("delete-comment");
      toast.success("Comment deleted");
      queryClient.invalidateQueries({
        queryKey: ["fetch-comments", cardDetailsId],
      });
    },
    onError: ({ message }) => {
      toast.error(message || "Error deleting comment, please try again");
      toast.dismiss("delete-comment");
    },
  });

  function handleDeleteComment() {
    if (!selectedCommentId) {
      return toast.error("Error deleting comment, No comment was selected");
    }
    if (!boardId || !cardDetailsId) {
      return toast.error("Something went wrong, please try again");
    }
    toast.loading("Deleting comment...", { id: "delete-comment" });
    setIsDeleteModalOpened(false);

    mutateDelete({
      cardDetailsId,
      commentId: selectedCommentId as string,
      boardId: boardId || "",
    });
  }
  function handleOpenDeleteDialog(commentId: string) {
    setSelectedCommentId(commentId);
    setIsDeleteModalOpened(true);
  }

  function handleSubmitComment(data: { [inputName: string]: string }) {
    if (!boardId || !cardDetailsId) {
      return toast.error("Something went wrong, please try again");
    }

    toast.loading("Creating comment...", { id: "create-comment" });
    mutateCreate({
      cardDetailsId,
      comment: data.comment,
      boardId: boardId || "",
    });

    setIsOpenedCommentInput(false);
  }

  const addNewCommentRef = useRef<HTMLButtonElement>(null);

  function handleOpenNewCommentInput() {
    if (addNewCommentRef?.current) addNewCommentRef.current.click();
  }
  if (isLoading) return <CommentsCardSkeleton />;
  return (
    <section>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center ">
          <MessageCircle />
          <h5 className="text-xl font-medium">Comments</h5>
        </div>
        <IconButton
          disabled={isPendingDelete || isPendingCreate}
          className="px-2"
          title="Add new comment"
          aria-label="Add new comment"
          onClick={handleOpenNewCommentInput}
        >
          <Plus className="text-green-600" />
        </IconButton>
      </div>

      {/* SCROLLABLE COMMENTS SECTION */}
      <div className="flex flex-col  overflow-y-auto h-58  ">
        <AddNewInput
          disabled={isPendingDelete || isPendingCreate}
          buttonDirection="column"
          className="py-0"
          classNameContainer=""
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
        {commentsData && commentsData.length > 0
          ? commentsData?.map((comment) => (
              <CommentCard
                isAuthor={comment?.author.email === user?.email}
                key={comment.id}
                data={comment}
                handleOpenDeleteModal={() => handleOpenDeleteDialog(comment.id)}
              />
            ))
          : !isOpenedCommentInput && (
              <div>
                <Button
                  disabled={isPendingDelete || isPendingCreate}
                  onClick={handleOpenNewCommentInput}
                  variant={"secondary"}
                  classNameChildren="flex items-center gap-2"
                >
                  <Plus /> Add new comment
                </Button>
              </div>
            )}

        <DeleteDialog
          title="Comment"
          loading={isPendingDelete}
          deleteDialogOpen={isDeleteModalOpened}
          setDeleteDialogOpen={setIsDeleteModalOpened}
          handleDelete={handleDeleteComment}
        />
      </div>
    </section>
  );
}
