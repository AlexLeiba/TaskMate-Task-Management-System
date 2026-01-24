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
  setDeleteDialogOpen: (open: boolean) => void;
  handleDelete: () => void;
};
export function DeleteDialog({
  deleteDialogOpen,
  setDeleteDialogOpen,
  handleDelete,
}: Props) {
  return (
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-xl">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex ">
          <DialogClose asChild>
            <Button size={"lg"} type="button" variant="default">
              Cancel
            </Button>
          </DialogClose>
          <Button
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
