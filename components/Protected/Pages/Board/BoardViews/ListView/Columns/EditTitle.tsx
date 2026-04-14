import { Dispatch, memo } from "react";
import { editCardTitleAction } from "@/app/actions/card";
import { TriggerInput } from "@/components/Protected/Shared-protected/TriggerInput";
import { IconButton } from "@/components/ui/iconButton";
import { useBoardId } from "@/hooks/useBoardId";
import { useRole } from "@/hooks/useRole";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  cardDetailsId: string;
  listId: string;
  cardTitle: string;
  isOpenedTitleInput: boolean;
  onOpenTitleInput: Dispatch<React.SetStateAction<boolean>>;
};
export function EditTitle({
  cardDetailsId,
  listId,
  cardTitle,
  isOpenedTitleInput,
  onOpenTitleInput,
}: Props) {
  const role = useRole();
  const boardId = useBoardId();

  // EDIT TITLE
  const { mutate: editTitleCardMutation, isPending: isPendingEditTitleCard } =
    useMutation({
      mutationKey: [
        QUERY_KEYS.pages.board.kanbanView.cards.editTitleCard,
        cardDetailsId,
      ],
      mutationFn: editCardTitleAction,
      onSuccess: () => {
        toast.dismiss(QUERY_KEYS.pages.board.kanbanView.cards.editTitleCard);
        toast.success("Card title was edited");
      },
      onError: ({ message }) => {
        toast.dismiss(QUERY_KEYS.pages.board.kanbanView.cards.editTitleCard);
        toast.error(message || "Error editing card title, please try again");
      },
    });

  //HANDLE CHANGE TITLE
  function handleChangeCardTitle(title: { [inputName: string]: string }) {
    editTitleCardMutation({
      title: title.title,
      cardId: cardDetailsId,
      listId,
      boardId,
    });
    toast.loading("Editing card title...", {
      id: QUERY_KEYS.pages.board.kanbanView.cards.editTitleCard,
    });
    onOpenTitleInput(false);
  }
  return (
    <TriggerInput
      disabled={isPendingEditTitleCard || role === "member"}
      type="text"
      handleSubmitValue={(v) => handleChangeCardTitle(v)}
      inputName="title"
      placeholder="Edit card title here..."
      label=""
      setIsOpenedTitleInput={onOpenTitleInput}
      isOpenedTitleInput={isOpenedTitleInput}
      classNameContainer={cn(
        isOpenedTitleInput
          ? " absolute top-0 left-0 w-full  z-10 bg-foreground rounded-md"
          : " w-full",
      )}
      buttonDirection="column"
      buttonVisibility={false}
      defaultValue={cardTitle}
      className="h-8"
    >
      <IconButton
        title={`Edit title - ${cardTitle}`}
        aria-label={`Edit title - ${cardTitle}`}
        className="p-2"
      >
        <Edit />
      </IconButton>
    </TriggerInput>
  );
}
