import { NotificationsData } from "./NotificationsData";
import { PaginationButton } from "../../Shared-protected/PaginationButton";
import { getNotificationsAction } from "@/app/actions/notifications";
import { AdminNotifications } from "./AdminNotifications";

type Props = {
  page: string | undefined;
};
export async function NotificationsServerRender({ page }: Props) {
  const {
    data: notificationsData,
    error,
    paginationCount: count,
    unreadCount,
    isAdmin,
  } = await getNotificationsAction({
    limit: 10,
    page: Number(page) || 1,
  });

  return (
    <div className="flex flex-col gap-2 justify-between h-full">
      {isAdmin && <AdminNotifications />}

      {notificationsData.length === 0 ? (
        <div className="flex justify-center items-center h-full w-full">
          <h5 className="text-2xl text-gray-200">No notifications</h5>
        </div>
      ) : (
        <>
          <NotificationsData
            notificationsData={{ data: notificationsData, unreadCount, error }}
          />
          <PaginationButton dataLength={count} />
        </>
      )}
    </div>
  );
}
