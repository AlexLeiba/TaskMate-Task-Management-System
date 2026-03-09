export function ListCardSkeleton() {
  const skeletonArray = [1, 2, 3, 4];

  return (
    <div className="max-w-400 mx-auto p-4 overflow-x-auto  w-full flex gap-4 items-start   h-full">
      <div className="flex gap-4 w-full">
        {skeletonArray.map((item) => (
          <div
            key={item}
            className=" shrink-0 h-60 py-2 px-2 bg-black/80 text-white w-70 rounded-md animate-pulse "
          />
        ))}
      </div>
    </div>
  );
}
