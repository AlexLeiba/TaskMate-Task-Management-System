import { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateListTitleAction } from "@/app/actions/list";
import toast from "react-hot-toast";
import { useBoardId } from "@/hooks/useBoardId";

import { TriggerInput } from "../../../../../Shared-protected/TriggerInput";
import { ListCardTicketsCounter } from "./ListCardTicketsCounter";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";

type Props = {
  listId: string;
  defaultTitle: string;
  listCardsDynamicCount: number;
  setIsOpenedTitleInput: Dispatch<SetStateAction<boolean>>;
  isInputOpened: boolean;
};
export function ListTitle({
  listId,
  defaultTitle,
  listCardsDynamicCount = 0,
  setIsOpenedTitleInput,
  isInputOpened,
}: Props) {
  const boardId = useBoardId();
  const queryClient = useQueryClient();

  const { mutate: mutateListTitle, isPending: isPendingMutateListTitle } =
    useMutation({
      mutationKey: [QUERY_KEYS.pages.board.kanbanView.lists.editListTitle],
      mutationFn: updateListTitleAction,
      onSuccess() {
        toast.success("List title updated", {
          id: QUERY_KEYS.pages.board.kanbanView.lists.editListTitle,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.hooks.useBoardListData],
        });
      },
      onError({ message }) {
        toast.dismiss(QUERY_KEYS.pages.board.kanbanView.lists.editListTitle);
        toast.error(message || "Error updating list title, please try again");
      },
    });

  function handleSubmitListTitle(value: { [inputName: string]: string }) {
    setIsOpenedTitleInput(false);

    if (!listId || !boardId)
      return toast.error("Something went wrong, please try again");

    mutateListTitle({ listId, title: value.title, boardId });
    toast.loading("Updating list title...", {
      id: QUERY_KEYS.pages.board.kanbanView.lists.editListTitle,
    });
  }
  return (
    <>
      <TriggerInput
        loading={isPendingMutateListTitle}
        disabled={isPendingMutateListTitle}
        handleSubmitValue={(v) => handleSubmitListTitle(v)}
        inputName="title"
        placeholder="Edit list title here..."
        label="Edit list title"
        setIsOpenedTitleInput={setIsOpenedTitleInput}
        isOpenedTitleInput={isInputOpened}
        classNameContainer="py-0 py-0 w-full "
        defaultValue={defaultTitle}
      >
        <>
          <h3 className="text-lg font-medium line-clamp-3">
            {defaultTitle}{" "}
            <ListCardTicketsCounter
              totalTicketCardsInList={listCardsDynamicCount}
              listId={listId}
            />
          </h3>
        </>
      </TriggerInput>
    </>
  );
}
