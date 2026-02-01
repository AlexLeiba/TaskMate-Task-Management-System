import { MessageCircle, Plus } from "lucide-react";

export function CommentsCardSkeleton() {
  const skeletonItems = Array.from({ length: 3 }, (_, index) => index + 1);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center ">
          <MessageCircle />
          <h5 className="text-xl font-medium">Comments</h5>
        </div>
        <div>
          <Plus className="text-green-600" />
        </div>
      </div>

      {skeletonItems.map((item) => {
        return (
          <div key={item} className="max-h-29.25 animate-pulse">
            <div className=" h-9 flex gap-2">
              <div className="bg-gray-700 rounded-full size-8"></div>
              <div className="h-full w-1/2 bg-gray-700"></div>
            </div>
            <div className="bg-gray-700 h-full w-87.5"></div>
          </div>
        );
      })}
    </div>
  );
}
