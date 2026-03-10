import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  deleteDialogOpen: boolean;
  loading?: boolean;
  disabled?: boolean;
  title: string;
  setDeleteDialogOpen: (open: boolean) => void;
  handleDelete: () => void;
};
export function DeleteDialog({
  deleteDialogOpen,
  loading,
  disabled,
  title,
  setDeleteDialogOpen,
  handleDelete,
}: Props) {
  return (
    <Dialog
      open={loading ? true : deleteDialogOpen}
      onOpenChange={loading ? () => {} : setDeleteDialogOpen}
    >
      <DialogContent
        className="px-8"
        aria-describedby={`The dialog is used to delete ${title}`}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-xl">
            This action cannot be undone.
          </DialogDescription>
          <DialogDescription className="text-xl">
            This will permanently delete this {title}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex ">
          <DialogClose asChild>
            <Button
              disabled={loading || disabled}
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
            loading={loading}
            disabled={loading || disabled}
            size={"lg"}
            type="button"
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
