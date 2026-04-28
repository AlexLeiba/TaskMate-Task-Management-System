import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

type Props = {
  loading?: boolean;
  disabled?: boolean;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleCheckout: () => void;
};
export function AlreadySubscribedDialog({
  loading,
  disabled,
  title,
  open,
  setOpen,
  handleCheckout,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        data-test="success-payment-dialog"
        className="px-8"
        aria-describedby={`Success payment dialog`}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">
            You are already subscribed to {title}
          </DialogTitle>
          <DialogDescription>
            By proceeding you will lose your current subscription only after the
            payment process of new subscription is successfully completed
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex ">
          <DialogClose asChild>
            <Button
              data-test="already-subscribed-dialog-cancel-button"
              disabled={loading || disabled}
              size={"lg"}
              type="button"
              variant="secondary"
              title="Cancel"
              aria-label="Cancel"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleCheckout}
            data-test="already-subscribed-dialog-continue-button"
            disabled={loading || disabled}
            size={"lg"}
            type="button"
            variant="default"
            title="Continue"
            aria-label="Continue"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
