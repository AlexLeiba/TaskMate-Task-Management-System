import { UserCardSkeleton } from "../../UserCard/UserCardSkeleton";

const skeletonArray = Array.from({ length: 10 }, (_, index) => index);
export function ActivitySkeletonCard() {
  return (
    <div className="flex flex-col gap-4">
      {skeletonArray.map((item) => (
        <UserCardSkeleton key={item} size="sm" />
      ))}
    </div>
  );
}
