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
  setDeleteDialogOpen: (open: boolean) => void;
  handleDelete: () => void;
};
export function DeleteDialog({
  deleteDialogOpen,
  loading,
  setDeleteDialogOpen,
  handleDelete,
}: Props) {
  return (
    <Dialog
      open={loading ? true : deleteDialogOpen}
      onOpenChange={loading ? () => {} : setDeleteDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-xl">
            This action cannot be undone. This will permanently delete it.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex ">
          <DialogClose asChild>
            <Button
              disabled={loading}
              size={"lg"}
              type="button"
              variant="default"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            loading={loading}
            disabled={loading}
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
