import { IconButton } from "@/components/ui/iconButton";
import { Spacer } from "@/components/ui/spacer";
import { Copy, Delete } from "lucide-react";
import { useState } from "react";

import dynamic from "next/dynamic";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCardAction } from "@/app/actions/card";
import { DeleteFileBodyType } from "@/lib/types";
import { axiosInstance } from "@/lib/config";
import { API_REQ_URL } from "@/lib/consts";
import { usePathname } from "next/navigation";

const DeleteDialog = dynamic(() =>
  import("@/components/layout/Protected/DeleteDialog/DeleteDialog").then(
    (m) => m.DeleteDialog,
  ),
);

type Props = {
  cardDetailsId: string;
  listId: string;
  cardId: string;
};

export function Actions({ cardDetailsId, listId, cardId }: Props) {
  const boardId = usePathname()?.split("/").at(-1);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  function handleCopyCard() {
    console.log("Copy card:", cardDetailsId);
  }

  async function deleteFile() {
    try {
      if (!cardDetailsId) {
        return toast.error("Card not found");
      }
      const body: DeleteFileBodyType = {
        type: "card",
        cardDetailsId,
        fileType: "raw",
      };

      const response = await axiosInstance.delete(API_REQ_URL.upload, {
        data: body,
      });

      console.log(response);

      if (response?.data?.statusCode !== 200) {
        return toast.error(response?.data?.error);
      }
    } catch (error: any) {
      toast.error(error.message || "Error deleting a file");
    }
  }

  // DELETE CARD
  const {
    mutate: deleteCardMutation,
    isPending: isPendingDeleteCardDeleteCard,
  } = useMutation({
    mutationKey: ["delete-card"],
    mutationFn: deleteCardAction,
    onSuccess: () => {
      toast.dismiss("delete-card");
      toast.success("Card deleted");
    },
    onError: ({ message }) => {
      toast.dismiss("delete-card");
      toast.error(message || "Error deleting card, please try again");
    },
  });

  async function handleDeleteCard() {
    if (!boardId) return toast.error("Board not found");
    toast.loading("Deleting card...", { id: "delete-card" });
    setIsDeleteModalOpened(false);

    // DELETE FILES FROM CLOUD
    await deleteFile(); //js will await until this fn is resolved before moving to next line

    // DELETE FILES FROM DB
    deleteCardMutation({ cardId, listId, boardId });
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <p className="text-xl font-medium">Actions</p>
      </div>

      <Spacer size={4} />
      <div className="flex gap-4 ">
        <IconButton
          disabled={isPendingDeleteCardDeleteCard}
          title="Copy card"
          aria-label="Copy card"
          onClick={handleCopyCard}
          classNameChildren="w-full flex gap-2 items-center"
          className="w-full  p-2 rounded-md bg-foreground"
        >
          <Copy size={20} /> Copy
        </IconButton>
        <IconButton
          disabled={isPendingDeleteCardDeleteCard}
          loading={isPendingDeleteCardDeleteCard}
          title="Delete card"
          aria-label="Delete card"
          classNameChildren="w-full flex gap-2 items-center"
          className="w-full bg-red-800 p-2 rounded-md"
          onClick={() => setIsDeleteModalOpened(true)}
        >
          <Delete size={20} /> Delete
        </IconButton>

        {isDeleteModalOpened && (
          <DeleteDialog
            deleteDialogOpen={isDeleteModalOpened}
            setDeleteDialogOpen={setIsDeleteModalOpened}
            handleDelete={handleDeleteCard}
          />
        )}
      </div>
    </div>
  );
}
