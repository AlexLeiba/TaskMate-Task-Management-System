import { IconButton } from "@/components/ui/iconButton";
import { Spacer } from "@/components/ui/spacer";
import { Copy, Delete } from "lucide-react";

type Props = {
  cardId: string;
  listId: string | undefined;
};
export function Actions({ cardId, listId }: Props) {
  function handleCopyCard() {
    console.log("Copy card:", cardId);
  }

  function handleDeleteCard(cardId: string) {
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
          onClick={() => handleDeleteCard(cardId)}
        >
          <Delete size={20} /> Delete
        </IconButton>
      </div>
    </div>
  );
}
