import { Info } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { useStore } from "@/store/useStore";
import { IconButton } from "@/components/ui/iconButton";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { copyListAction, deleteListAction } from "@/app/actions/list";
import toast from "react-hot-toast";
import { apiDeleteFile } from "@/lib/api/apiDeleteFile";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useShallow } from "zustand/shallow";
import { useBoardId } from "@/hooks/useBoardId";
import dynamic from "next/dynamic";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { LIST_OPTIONS } from "@/lib/consts/protected/list";

const DeleteDialog = dynamic(() =>
  import("@/components/Protected/Shared-protected/DeleteDialog/DeleteDialog").then(
    (m) => m.DeleteDialog,
  ),
);

type Props = {
  listId: string;
};
export function ListOptionsContent({ listId }: Props) {
  const queryClient = useQueryClient();
  const boardId = useBoardId();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { setOpenTitleInput, setOpenNewCardInput } = useStore(
    useShallow((state) => ({
      setOpenTitleInput: state.setOpenTitleInput,
      setOpenNewCardInput: state.setOpenNewCardInput,
    })),
  );

  const { mutate: mutateDeleteList, isPending: isPendingDeleteList } =
    useMutation({
      mutationKey: [QUERY_KEYS.pages.board.kanbanView.lists.deleteList],
      mutationFn: deleteListAction,
      onMutate: async () => {
        await apiDeleteFile(
          { type: "list", listId, fileType: "raw", boardId },
          boardId,
        ); // execution of the mutation will wait until this request is resolved (removing all attachments from cloud)
      },
      onSuccess: () => {
        toast.success("List deleted", {
          id: QUERY_KEYS.pages.board.kanbanView.lists.deleteList,
        });
        setDeleteDialogOpen(false);
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.hooks.useBoardListData],
        });
      },
      onError: () => {
        toast.error("Error deleting list, please try again", {
          id: QUERY_KEYS.pages.board.kanbanView.lists.deleteList,
        });
      },
    });

  const { mutate: mutateCopyList, isPending: isPendingCopyList } = useMutation({
    mutationFn: copyListAction,
    onSuccess: () => {
      toast.success("List copied", {
        id: QUERY_KEYS.pages.board.kanbanView.lists.copyList,
      });
      setDeleteDialogOpen(false);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.hooks.useBoardListData],
      });
    },
    onError: () => {
      toast.dismiss(QUERY_KEYS.pages.board.kanbanView.lists.copyList);
      toast.error("Error copying list, please try again");
    },
  });

  function handleCopyList() {
    mutateCopyList({ listId, boardId });
    toast.loading("Copying list...", {
      id: QUERY_KEYS.pages.board.kanbanView.lists.copyList,
    });
  }

  function handleSelectOption(
    option: "edit-list-title" | "delete-list" | "add-card" | "copy-list",
  ) {
    switch (option) {
      case "edit-list-title":
        setOpenTitleInput({ id: listId, isOpen: true });
        break;
      case "delete-list":
        handleModalDeleteList();
        break;
      case "add-card":
        setOpenNewCardInput({ id: listId, isOpen: true });
        break;
      case "copy-list":
        handleCopyList();
        break;
      default:
        break;
    }
  }

  function handleModalDeleteList() {
    setDeleteDialogOpen(true);
  }

  async function handleDeleteList(listId: string) {
    mutateDeleteList({ listId, boardId });
    toast.loading("Deleting list...", {
      id: QUERY_KEYS.pages.board.kanbanView.lists.deleteList,
    });
  }
  return (
    <>
      <div className="flex flex-col items-start ">
        {LIST_OPTIONS.map((option) => {
          if (
            option.value === QUERY_KEYS.pages.board.kanbanView.lists.deleteList
          ) {
            // DELETE BUTTON
            return (
              <React.Fragment key={option.value}>
                <Separator className="my-4 w-full h-px bg-gray-700" />
                <IconButton
                  disabled={isPendingDeleteList || isPendingCopyList}
                  aria-label={option.label}
                  title={option.label}
                  onClick={() => handleSelectOption(option.value)}
                  className="p-2 w-full"
                  classNameChildren="flex gap-2 items-center"
                  data-test="list-options-delete-button"
                >
                  {option.icon}
                  <p key={option.label}>{option.label}</p>
                </IconButton>
              </React.Fragment>
            );
          }
          if (option.value === "copy-list") {
            // COPY BUTTON
            return (
              <React.Fragment key={option.value}>
                <IconButton
                  disabled={isPendingDeleteList || isPendingCopyList}
                  aria-label={option.label}
                  title={option.label}
                  onClick={() => handleSelectOption(option.value)}
                  key={option.value}
                  className="p-2 w-full"
                  classNameChildren="flex gap-2 items-center justify-between w-full"
                  data-test="list-options-copy-button"
                >
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <p key={option.label}>{option.label}</p>
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild className=" text-gray-400">
                      <Info />
                    </TooltipTrigger>
                    <TooltipContent className="min-w-20 max-w-80 flex flex-col gap-1">
                      <p className="text-base">
                        New List will include cloned values:
                      </p>

                      <p className="text-base">From List:</p>
                      <strong>Title , Status , Cards.</strong>

                      <p className="text-base"> From Cards: </p>
                      <strong>Title, Description, Checklist.</strong>
                    </TooltipContent>
                  </Tooltip>
                </IconButton>
              </React.Fragment>
            );
          }
          return (
            <IconButton
              disabled={isPendingDeleteList || isPendingCopyList}
              aria-label={option.label}
              title={option.label}
              onClick={() => handleSelectOption(option.value)}
              key={option.value}
              className="p-2 w-full"
              classNameChildren="flex gap-2 items-center"
            >
              {option.icon}
              <p key={option.label}>{option.label}</p>
            </IconButton>
          );
        })}
      </div>

      {/* MODAL DELETE BOARD */}
      {deleteDialogOpen && (
        <DeleteDialog
          disabled={isPendingDeleteList}
          title="List"
          loading={isPendingDeleteList}
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          handleDelete={() => handleDeleteList(listId)}
        />
      )}
    </>
  );
}
