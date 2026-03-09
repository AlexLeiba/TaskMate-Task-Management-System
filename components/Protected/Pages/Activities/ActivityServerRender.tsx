import { getActivitiesAction } from "@/app/actions/activity";
import { PaginationButton } from "./PaginationButton";
import { ActivityData } from "./ActivityData";

type Props = {
  page: string | undefined;
};
export async function ActivityServerRender({ page }: Props) {
  const {
    data: activityData,
    error,
    count,
  } = await getActivitiesAction({
    limit: 10,
    page: Number(page) || 1,
  });

  if (activityData?.length === 0)
    return (
      <div className="flex justify-center items-center h-full w-full">
        <h5 className="text-2xl text-gray-200">No activities</h5>
      </div>
    );

  return (
    <div className="flex flex-col gap-2 justify-between h-full">
      <ActivityData activityData={{ data: activityData, error }} />

      <PaginationButton dataLength={count} />
    </div>
  );
}
