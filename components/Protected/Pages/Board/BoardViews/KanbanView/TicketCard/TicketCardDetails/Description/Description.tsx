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
import { useBoardId } from "@/hooks/useBoardId";
import { useRole } from "@/hooks/useRole";
import { USER_ROLES } from "@/lib/consts/consts";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <InitialDescriptionState />,
});

type Props = {
  description: string;
  cardDetailsId: string | undefined;
  isAssignedUserEmail: boolean;
};
export function Description({
  description = "",
  cardDetailsId,
  isAssignedUserEmail = false,
}: Props) {
  const role = useRole();
  const boardId = useBoardId();
  const [value, setValue] = useState(description || "");
  const [isQuillVisible, setIsQuillVisible] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: [
      QUERY_KEYS.pages.board.cardDetails.updateDescription,
      cardDetailsId,
    ],
    mutationFn: updateDescriptionAction,
    onSuccess: ({ data: description }) => {
      if (description) {
        setValue(description);

        setIsQuillVisible(false);
      }
      toast.dismiss(
        QUERY_KEYS.pages.board.cardDetails.updateDescription,
        cardDetailsId,
      );
      toast.success("Description updated");
    },
    onError: ({ message }) => {
      toast.error(message || "Error updating description, please try again");
      toast.dismiss(
        QUERY_KEYS.pages.board.cardDetails.updateDescription,
        cardDetailsId,
      );
    },
  });

  useEffect(() => {
    if (description) {
      // eslint-disable-next-line
      setValue(description);
    }
  }, [description]);

  function handleSaveDescription() {
    if (!cardDetailsId || !boardId) {
      return toast.error(
        "Card not found, please try again or refresh the page",
      );
    }

    mutate({ description: value, cardDetailsId, boardId: boardId || "" });
    toast.loading("Updating description...", {
      id: QUERY_KEYS.pages.board.cardDetails.updateDescription,
    });
  }

  function handleOpenQuill() {
    if (!isAssignedUserEmail && role === USER_ROLES.member)
      return toast.error(
        "You can't edit description. Only Admins or Assignees are allowed.",
      );
    setIsQuillVisible(true);
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
            onClick={handleOpenQuill}
            className="px-2"
          >
            <SquarePen className="text-green-500" />
          </IconButton>
        )}
        {isQuillVisible && (
          <div className="flex gap-2">
            <IconButton
              disabled={isPending}
              title="Close Description"
              aria-label="Close Description"
              onClick={() => setIsQuillVisible(false)}
              className="px-2"
            >
              <X />
            </IconButton>
            <IconButton
              disabled={isPending}
              loading={isPending}
              title="Save Description"
              aria-label="Save Description"
              onClick={handleSaveDescription}
              className="px-2"
              classNameChildren="border border-green-500 text-green-500 rounded-full"
            >
              <Check className="text-green-500" />
            </IconButton>
          </div>
        )}
      </div>
      <Spacer size={2} />
      {isQuillVisible ? (
        <div className="h-72.5">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="w-full"
          />
        </div>
      ) : cardDetailsId ? (
        <InitialDescriptionState
          onClick={handleOpenQuill}
          classNameChildren="flex flex-col justify-start items-start h-full wrap-break-word"
        >
          {value !== "" ? (
            <div
              className=" text-left max-w-full text-text-primary   html-content "
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
