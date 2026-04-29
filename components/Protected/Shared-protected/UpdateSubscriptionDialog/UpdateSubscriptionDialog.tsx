import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Props = {
  subscriptionsOpen: boolean;
  setSubscriptionsOpen: (value: boolean) => void;
  children: React.ReactNode;
};
export function UpdateSubscriptionDialog({
  subscriptionsOpen,
  setSubscriptionsOpen,
  children,
}: Props) {
  return (
    <Dialog open={subscriptionsOpen} onOpenChange={setSubscriptionsOpen}>
      <DialogContent
        data-test="select-a-plan-dialog"
        className={cn(
          "flex flex-col overflow-y-auto h-full",
          "md:min-w-[75%] md:max-w-200 md:max-h-200 md:min-h-100",
          "lg:min-w-[70%]  lg:max-w-300 lg:max-h-210 lg:min-h-100",
        )}
        aria-describedby="The dialog is used to show the subscription plans when user has reached the plan limits"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Update your subscription plan
          </DialogTitle>
        </DialogHeader>
        {/* CREATE CARD FORM */}
        {children}
      </DialogContent>
    </Dialog>
  );
}
