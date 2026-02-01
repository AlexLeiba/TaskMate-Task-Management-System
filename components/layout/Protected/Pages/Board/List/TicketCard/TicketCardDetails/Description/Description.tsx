"use client";
import { useEffect, useState } from "react";
import { IconButton } from "@/components/ui/iconButton";
import { Spacer } from "@/components/ui/spacer";
import { Check, List, SquarePen, X } from "lucide-react";
import dynamic from "next/dynamic";
import { InitialDescriptionState } from "./InitialDescriptionState";

import DOMPurify from "dompurify";
import { DescriptionSkeleton } from "./DescriptionSkeleton";
import { useMutation } from "@tanstack/react-query";
import { updateDescriptionAction } from "@/app/actions/card-details";
import toast from "react-hot-toast";

import "react-quill-new/dist/quill.snow.css";
import { usePathname } from "next/navigation";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <InitialDescriptionState />,
});

type Props = {
  description: string;
  cardDetailsId: string | undefined;
};
export function Description({ description = "", cardDetailsId }: Props) {
  const boardId = usePathname()?.split("/").at(-1);
  const [value, setValue] = useState(description || "");
  const [isQuillVisible, setIsQuillVisible] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-description"],
    mutationFn: updateDescriptionAction,
    onSuccess: ({ data: description }) => {
      if (description) {
        setValue(description);

        setIsQuillVisible(false);
      }
      toast.dismiss("update-description");
      toast.success("Description updated");
    },
    onError: ({ message }) => {
      toast.error(message || "Error updating description, please try again");
      toast.dismiss("update-description");
    },
  });

  useEffect(() => {
    if (description) {
      // eslint-disable-next-line
      setValue(description);
    }
  }, [description]);

  function handleSaveDescription() {
    if (!cardDetailsId) return;
    mutate({ description: value, cardDetailsId, boardId: boardId || "" });
    toast.loading("Updating description...", { id: "update-description" });
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <List />
          <p className="text-xl font-medium">Description</p>
        </div>
        {!isQuillVisible && (
          <IconButton
            disabled={isPending}
            title="Edit Description"
            aria-label="Edit Description"
            onClick={() => setIsQuillVisible(true)}
          >
            <SquarePen className="text-green-500" />
          </IconButton>
        )}
        {isQuillVisible && (
          <div className="flex gap-6">
            <IconButton
              disabled={isPending}
              title="Close Description"
              aria-label="Close Description"
              onClick={() => setIsQuillVisible(false)}
            >
              <X />
            </IconButton>
            <IconButton
              disabled={isPending}
              loading={isPending}
              title="Save Description"
              aria-label="Save Description"
              onClick={handleSaveDescription}
            >
              <Check className="text-green-500" />
            </IconButton>
          </div>
        )}
      </div>
      <Spacer size={2} />
      {isQuillVisible ? (
        <div className="h-72.5">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      ) : cardDetailsId ? (
        <InitialDescriptionState
          onClick={() => setIsQuillVisible(true)}
          classNameChildren="flex flex-col justify-start items-start h-full wrap-break-word  "
        >
          {value !== "" ? (
            <div
              className=" text-left max-w-full text-gray-300   html-content "
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(value).replace(/&nbsp;/g, " "), //Prevent XSS attacks.
              }}
            />
          ) : (
            <p className="text-gray-300">No description</p>
          )}
        </InitialDescriptionState>
      ) : (
        <DescriptionSkeleton />
      )}
    </div>
  );
}
