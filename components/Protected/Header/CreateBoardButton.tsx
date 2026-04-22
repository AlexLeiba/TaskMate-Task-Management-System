import { Button } from "@/components/ui/button";
import { useRole } from "@/hooks/useRole";
import { USER_ROLES } from "@/lib/consts/consts";
import { useStore } from "@/store/useStore";
import dynamic from "next/dynamic";
import { useShallow } from "zustand/shallow";
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
  const { newBoardDialogOpen, setNewBoardDialogOpen } = useStore(
    useShallow((state) => ({
      newBoardDialogOpen: state.newBoardDialogOpen,
      setNewBoardDialogOpen: state.setNewBoardDialogOpen,
    })),
  );

  const role = useRole();
  return (
    role === USER_ROLES.admin && (
      <>
        <Button
          data-test="header-create-new-board-button"
          size={"sm"}
          title="Create new board"
          variant={"secondary"}
          onClick={() => setNewBoardDialogOpen(true, "header")}
        >
          Create
        </Button>
        {newBoardDialogOpen.header && (
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
