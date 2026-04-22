import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import "react-quill-new/dist/quill.snow.css";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import ReactQuill from "react-quill-new";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NewNotificationSchema,
  NewNotificationSchemaType,
} from "@/lib/schemas";
import { createNotificationAction } from "@/app/actions/notifications";

type Props = {
  setCloseQuill: () => void;
  isQuillVisible: boolean;
};
export function CreateNewNotificationDialog({
  isQuillVisible,
  setCloseQuill,
}: Props) {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<NewNotificationSchemaType>({
    resolver: zodResolver(NewNotificationSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });

  const quillRef = useRef<ReactQuill | null>(null);
  const [descriptionValue, setDescriptionValue] = useState("");

  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.pages.notifications.createNotification],
    mutationFn: createNotificationAction,
    onSuccess: () => {
      toast.success("Notification created", {
        id: QUERY_KEYS.pages.notifications.createNotification,
      });

      reset();
      setCloseQuill();
    },
    onError: ({ message }) => {
      toast.error(message || "Error creating notification, please try again", {
        id: QUERY_KEYS.pages.notifications.createNotification,
      });
    },
  });

  function handleCloseDialog() {
    if (isDirty) {
      const confirmClose = window.confirm(
        "You have unsaved changes. Are you sure you want to close?",
      );
      if (confirmClose) {
        setCloseQuill();
      }
      return () => {};
    }
    setCloseQuill();
  }

  const isRichTextEmpty = /^<p>\s*<\/p>$/.test(descriptionValue);

  function onSubmit(formData: NewNotificationSchemaType) {
    mutate({
      message: formData.message,
      title: formData.title,
      messageRichText: isRichTextEmpty
        ? `<p>${formData.message}</p>`
        : descriptionValue,
    });

    toast.loading("Creating notification...", {
      id: QUERY_KEYS.pages.notifications.createNotification,
    });
  }

  return (
    <Dialog
      open={isPending ? true : isQuillVisible}
      onOpenChange={isPending ? () => {} : handleCloseDialog}
    >
      <DialogContent
        className={cn(
          "flex flex-col overflow-y-auto h-full",
          "md:min-w-[75%] md:max-w-180 md:max-h-180 md:min-h-100",
          "lg:min-w-[70%]  lg:max-w-280 lg:max-h-200 min-h-100 ",
        )}
        aria-describedby={`Description editor dialog`}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Create new notification
          </DialogTitle>
        </DialogHeader>

        <div className="h-full flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="text-muted-foreground">
              Title
            </label>
            <Input
              id="title"
              placeholder="Type title here"
              {...register("title")}
              error={errors?.title?.message}
            />
          </div>
          <div>
            <label htmlFor="message" className="text-muted-foreground">
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Type message here"
              {...register("message")}
              error={errors?.message?.message}
            />
          </div>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={descriptionValue}
            onChange={setDescriptionValue}
            className="w-full lg:h-100 h-full"
          />
        </div>

        <DialogFooter className="flex flex-row-reverse gap-4">
          <DialogClose asChild>
            <Button
              disabled={isPending}
              size={"lg"}
              type="button"
              variant="default"
              title="Cancel"
              aria-label="Cancel"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            title="Delete"
            aria-label="Delete"
            loading={isPending}
            disabled={isPending}
            size={"lg"}
            type="button"
            variant="secondary"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
