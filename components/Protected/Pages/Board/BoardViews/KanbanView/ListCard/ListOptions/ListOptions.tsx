import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis, X } from "lucide-react";
import { IconButton } from "@/components/ui/iconButton";
import dynamic from "next/dynamic";

const ListOptionsContent = dynamic(() =>
  import("@/components/Protected/Pages/Board/BoardViews/KanbanView/ListCard/ListOptions/ListOptionsContent").then(
    (m) => m.ListOptionsContent,
  ),
);

type Props = {
  listId: string;
};
export function ListOptions({ listId }: Props) {
  const [isOpenedStatus, setIsOpenedStatus] = useState(false);

  return (
    <Popover open={isOpenedStatus} onOpenChange={setIsOpenedStatus}>
      <PopoverTrigger asChild>
        <IconButton
          aria-label="List options"
          title="List options"
          data-test="list-options-trigger"
        >
          <Ellipsis size={25} />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent align="start" className="max-w-50">
        {isOpenedStatus && (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-medium">List Options</p>
              <IconButton
                onClick={() => setIsOpenedStatus(false)}
                title="Close list status"
                aria-label="Close list status"
                data-test="list-options-cancel-button"
              >
                <X />
              </IconButton>
            </div>

            <ListOptionsContent listId={listId} />
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
