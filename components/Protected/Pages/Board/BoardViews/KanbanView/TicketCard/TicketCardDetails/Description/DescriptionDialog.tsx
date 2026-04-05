import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { updateDescriptionAction } from "@/app/actions/card-details";
import toast from "react-hot-toast";
import "react-quill-new/dist/quill.snow.css";
import { useBoardId } from "@/hooks/useBoardId";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import ReactQuill from "react-quill-new";
import { cn } from "@/lib/utils";

type Props = {
  setCloseQuill: () => void;
  setInitialValue: (value: string) => void;
  disabled?: boolean;
  cardDetailsId: string | undefined;
  initialValue: string;
  isQuillVisible: boolean;
};
export function DescriptionDialog({
  isQuillVisible,
  disabled,
  cardDetailsId,
  initialValue,
  setCloseQuill,
  setInitialValue,
}: Props) {
  const quillRef = useRef<ReactQuill | null>(null);
  const boardId = useBoardId();
  const [descriptionValue, setDescriptionValue] = useState(initialValue);

  useEffect(() => {
    setDescriptionValue(initialValue);
  }, [initialValue]);

  const { mutate, isPending } = useMutation({
    mutationKey: [
      QUERY_KEYS.pages.board.cardDetails.updateDescription,
      cardDetailsId,
    ],
    mutationFn: updateDescriptionAction,
    onSuccess: ({ data: description }) => {
      if (description) {
        setDescriptionValue(description);
        setInitialValue(description);
        setCloseQuill();
      }
      toast.dismiss(QUERY_KEYS.pages.board.cardDetails.updateDescription);
      toast.success("Description updated");
    },
    onError: ({ message }) => {
      toast.error(message || "Error updating description, please try again");
      toast.dismiss(QUERY_KEYS.pages.board.cardDetails.updateDescription);
    },
  });

  function handleSaveDescription() {
    if (!cardDetailsId || !boardId) {
      return toast.error(
        "Card not found, please try again or refresh the page",
      );
    }

    mutate({
      description: descriptionValue,
      cardDetailsId,
      boardId: boardId || "",
    });

    toast.loading("Updating description...", {
      id: QUERY_KEYS.pages.board.cardDetails.updateDescription,
    });
  }

  function handleCloseDialog() {
    if (initialValue !== descriptionValue) {
      const confirmClose = window.confirm(
        "You have unsaved changes. Are you sure you want to close?",
      );
      if (confirmClose) {
        setCloseQuill();
      }
      return () => {};
    }
    return setCloseQuill();
  }

  useEffect(() => {
    setTimeout(() => {
      quillRef.current?.getEditor().focus();
    }, 0);
  }, []);

  return (
    <Dialog
      open={isPending ? true : isQuillVisible}
      onOpenChange={isPending ? () => {} : handleCloseDialog}
    >
      <DialogContent
        className={cn(
          "flex flex-col overflow-y-auto h-full",
          "md:min-w-[75%] md:max-w-180 md:max-h-180 md:min-h-100",
          "lg:min-w-[70%]  lg:max-w-280 lg:max-h-200 min-h-100 ",
        )}
        aria-describedby={`Description editor dialog`}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Description</DialogTitle>
        </DialogHeader>

        <div className="h-full ">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={descriptionValue}
            onChange={setDescriptionValue}
            className="w-full lg:h-150  h-full"
          />
        </div>

        <DialogFooter className="flex flex-row-reverse gap-4">
          <DialogClose asChild>
            <Button
              disabled={isPending || disabled}
              size={"lg"}
              type="button"
              variant="default"
              title="Cancel"
              aria-label="Cancel"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            title="Delete"
            aria-label="Delete"
            loading={isPending}
            disabled={isPending || disabled}
            size={"lg"}
            type="button"
            variant="secondary"
            onClick={handleSaveDescription}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
