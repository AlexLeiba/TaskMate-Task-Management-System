import { Button } from "@/components/ui/button";
import { useRole } from "@/hooks/useRole";
import { USER_ROLES } from "@/lib/consts/consts";
import { useStore } from "@/store/useStore";
import dynamic from "next/dynamic";
const DialogBoardDetails = dynamic(() =>
  import("../Pages/Dashboard/Boards/CreateNewBoard/DialogBoardDetails").then(
    (m) => m.DialogBoardDetails,
  ),
);

const CreateNewBoardDialog = dynamic(() =>
  import("../Pages/Dashboard/Boards/CreateNewBoard/CreateNewBoardDialog").then(
    (m) => m.CreateNewBoardDialog,
  ),
);

export function CreateBoardButton() {
  const newBoardDialogOpen = useStore((state) => state.newBoardDialogOpen);
  const setNewBoardDialogOpen = useStore(
    (state) => state.setNewBoardDialogOpen,
  );
  const role = useRole();
  return (
    role === USER_ROLES.admin && (
      <>
        <Button
          data-test="create-new-board-button"
          size={"sm"}
          title="Create new board"
          variant={"secondary"}
          onClick={() => setNewBoardDialogOpen(true)}
        >
          Create
        </Button>
        {newBoardDialogOpen && (
          <CreateNewBoardDialog
            type="header"
            newBoardDialogOpen={newBoardDialogOpen}
            setNewBoardDialogOpen={setNewBoardDialogOpen}
          >
            <DialogBoardDetails type="header" />
          </CreateNewBoardDialog>
        )}
      </>
    )
  );
}
