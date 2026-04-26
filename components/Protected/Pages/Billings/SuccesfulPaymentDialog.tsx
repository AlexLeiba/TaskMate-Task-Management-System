import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  loading?: boolean;
  disabled?: boolean;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};
export function SuccesfulPaymentDialog({
  loading,
  disabled,
  title,
  open,
  setOpen,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        data-test="success-payment-dialog"
        className="px-8"
        aria-describedby={`Success payment dialog`}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex ">
          <DialogClose asChild>
            <Button
              data-test="delete-dialog-cancel-button"
              disabled={loading || disabled}
              size={"lg"}
              type="button"
              variant="default"
              title="Cancel"
              aria-label="Cancel"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
