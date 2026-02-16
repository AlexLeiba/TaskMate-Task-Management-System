import { Spacer } from "@/components/ui/spacer";
import { Grid } from "lucide-react";

export function BoardCardSkeleton() {
  const boards = [1, 2, 3, 4, 5];
  return (
    <>
      <div className="flex gap-2 items-center">
        <Grid />
        <p className="text-xl font-medium">Boards</p>
      </div>
      <Spacer size={4} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
        {boards.map((board) => (
          <div
            key={board}
            className="h-28 rounded-md bg-gray-700 animate-pulse"
          />
        ))}
      </div>
    </>
  );
}
