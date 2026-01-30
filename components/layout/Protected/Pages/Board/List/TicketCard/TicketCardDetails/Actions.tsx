import { IconButton } from "@/components/ui/iconButton";
import { Spacer } from "@/components/ui/spacer";
import { Copy, Delete } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  cardId: string | undefined;
  cardTitle: string | undefined;
  listId: string | undefined;
};
export function Actions({ cardId, listId, cardTitle }: Props) {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  function handleCopyCard() {
    console.log("Copy card:", cardId);
  }

  function handleDeleteCard() {
    console.log("🚀 ~ handleDeleteCard ~ cardId:", cardId);
  }
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <p className="text-xl font-medium">Actions</p>
      </div>

      <Spacer size={4} />
      <div className="flex gap-4 ">
        <IconButton
          title="Copy card"
          aria-label="Copy card"
          onClick={handleCopyCard}
          classNameChildren="w-full flex gap-2 items-center"
          className="w-full  p-2 rounded-md bg-gray-800"
        >
          <Copy size={20} /> Copy
        </IconButton>
        <IconButton
          title="Delete card"
          aria-label="Delete card"
          classNameChildren="w-full flex gap-2 items-center"
          className="w-full bg-red-800 p-2 rounded-md"
          onClick={() => setIsDeleteModalOpened(true)}
        >
          <Delete size={20} /> Delete
        </IconButton>

        <Dialog
          open={isDeleteModalOpened}
          onOpenChange={setIsDeleteModalOpened}
        >
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
                onClick={handleDeleteCard}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
