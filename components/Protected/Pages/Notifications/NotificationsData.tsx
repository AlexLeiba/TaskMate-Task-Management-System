"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { Notification, UserNotification } from "@/lib/generated/prisma/client";
import { NotificationSidemenu } from "./NotificationSidemenu/NotificationSidemenu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAllAsReadNotificationAction } from "@/app/actions/notifications";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";

type Props = {
  notificationsData: {
    data: (UserNotification & { notification: Notification })[];
    unreadCount: number;
    error: { message: string };
  };
};
export function NotificationsData({ notificationsData }: Props) {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (notificationsData.error.message)
      toast.error(notificationsData.error.message);
  }, [notificationsData.data, notificationsData.error]);

  const { mutate: markAllAsReadMutation } = useMutation({
    mutationFn: markAllAsReadNotificationAction,
    mutationKey: [QUERY_KEYS.pages.notifications.markAllAsReadNotification],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.pages.notifications.getUnreadNotifications],
      });
    },
  });

  useEffect(() => {
    if (
      notificationsData.data.length > 0 &&
      notificationsData.unreadCount > 0
    ) {
      markAllAsReadMutation();
    }
  }, []);
  return <NotificationSidemenu data={notificationsData?.data} />;
}
