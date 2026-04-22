import { Button } from "@/components/ui/button";
import {
  type UserNotification,
  type Notification,
} from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import DOMPurify from "dompurify";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

type Props = {
  data: (UserNotification & { notification: Notification })[];
};
export function NotificationSidemenu({ data }: Props) {
  const [selectedNotification, setSelectedNotification] = useState<string>("");
  const notificationData =
    data.find((notification) => notification.id === selectedNotification) ||
    data.at(0);
  return (
    <div className="grid  h-full gap-4 md:grid-cols-[1fr_3fr] lg:grid-cols-[1fr_3fr]">
      <div className="flex-col border-r h-full p-2 w-full md:flex lg:flex hidden">
        {data.map((notification) => {
          return (
            <Button
              onClick={() => setSelectedNotification(notification.id)}
              key={notification.id}
              variant={"ghost"}
              className={cn(
                !selectedNotification
                  ? notificationData?.id === notification.id && "ring"
                  : selectedNotification === notification.id && "ring",
                "text-base text-left border-b ",
              )}
            >
              <p className="line-clamp-1 max-w-62.5">
                {notification.notification.title}
              </p>
            </Button>
          );
        })}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"secondary"}
            className="md:hidden lg:hidden flex items-center text-lg w-full text-left  "
            classNameChildren="flex justify-between items-center"
          >
            <p className="line-clamp-1 max-w-75">
              {notificationData?.notification.title}
            </p>
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-full flex flex-col gap-2">
          {data.map((notification) => {
            return (
              <Button
                onClick={() => setSelectedNotification(notification.id)}
                key={notification.id}
                variant={"ghost"}
                className={cn(
                  !selectedNotification
                    ? notificationData?.id === notification.id && "ring"
                    : selectedNotification === notification.id && "ring",
                  "text-xl text-left border-b   ",
                )}
              >
                <p className="line-clamp-1 max-w-75">
                  {notification.notification.title}
                </p>
              </Button>
            );
          })}
        </PopoverContent>
      </Popover>

      <div className="w-full">
        <h2 className="text-2xl mb-4">
          {notificationData?.notification.title}
        </h2>
        <div>
          <div
            className=" html-content "
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                notificationData?.notification.messageRichText || "",
              ),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
