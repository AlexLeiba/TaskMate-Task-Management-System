import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  newBoardDialogOpen: boolean;
  setNewBoardDialogOpen: (open: boolean) => void;
  children: React.ReactNode;
};
export function CreateNewBoardDialog({
  newBoardDialogOpen,
  setNewBoardDialogOpen,
  children,
}: Props) {
  return (
    <Dialog open={newBoardDialogOpen} onOpenChange={setNewBoardDialogOpen}>
      <DialogContent
        className="lg:min-w-200!  sm:h-auto h-full flex flex-col"
        aria-describedby="The dialog is used to create new board"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Create new board</DialogTitle>
        </DialogHeader>
        {/* CREATE CARD FORM */}
        {children}
      </DialogContent>
    </Dialog>
  );
}
