import { deleteMultipleCardsAction } from "@/app/actions/card";
import { Button } from "@/components/ui/button";
import { useBoardId } from "@/hooks/useBoardId";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type Props = {
  selectedRowIds: string[];
};
export function DeleteSelectedRowsButton({ selectedRowIds }: Props) {
  const boardId = useBoardId();

  const { mutate } = useMutation({
    mutationFn: deleteMultipleCardsAction,
    onSuccess: () => {
      toast.success("Cards deleted successfully", {
        id: QUERY_KEYS.pages.board.tableListView.deleteMultipleCards,
      });
    },
    onError: (error) => {
      toast.dismiss(QUERY_KEYS.pages.board.tableListView.deleteMultipleCards);
      toast.error(error.message || "Failed to delete cards");
    },
  });

  function handleDeleteSelectedCards() {
    toast.loading("Deleting cards...", {
      id: QUERY_KEYS.pages.board.tableListView.deleteMultipleCards,
    });
    mutate({
      cardIds: selectedRowIds,
      boardId: boardId,
    });
  }

  return (
    <Button
      variant={"destructive"}
      size={"sm"}
      className="ml-2 h-6"
      onClick={handleDeleteSelectedCards}
    >
      Delete Selected
    </Button>
  );
}
