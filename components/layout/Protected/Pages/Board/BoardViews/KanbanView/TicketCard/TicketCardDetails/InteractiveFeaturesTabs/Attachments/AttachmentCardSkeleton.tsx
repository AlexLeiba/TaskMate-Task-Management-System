import { Image } from "lucide-react";

export function AttachmentCardSkeleton() {
  const skeletonItems = Array.from({ length: 3 }, (_, index) => index + 1);
  return (
    <div className="max-h-45.25 flex flex-col gap-4 animate-pulse">
      <div className="flex gap-2 items-center ">
        <Image />
        <h5 className="text-xl font-medium">Attachments</h5>
      </div>
      <div className=" h-9 flex gap-2 mt-2">
        <div className="bg-gray-700 rounded-full size-8"></div>
        <div className="h-full w-1/2 bg-gray-700"></div>
      </div>
      <div className="flex gap-8">
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="bg-gray-700 md:w-24.5 w-full h-17.5 rounded-md"
          ></div>
        ))}
      </div>
    </div>
  );
}
