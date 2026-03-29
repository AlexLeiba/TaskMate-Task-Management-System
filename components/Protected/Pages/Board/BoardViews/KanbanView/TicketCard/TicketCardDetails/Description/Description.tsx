"use client";
import { useCallback, useEffect, useState } from "react";
import { IconButton } from "@/components/ui/iconButton";
import { List, SquarePen } from "lucide-react";
import { InitialDescriptionState } from "./InitialDescriptionState";
import DOMPurify from "dompurify";
import { DescriptionSkeleton } from "./DescriptionSkeleton";
import toast from "react-hot-toast";
import { useRole } from "@/hooks/useRole";
import { USER_ROLES } from "@/lib/consts/consts";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";

const DescriptionDialog = dynamic(() =>
  import("./DescriptionDialog").then((m) => m.DescriptionDialog),
);

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

  const [value, setValue] = useState(description || "");
  const [isQuillVisible, setIsQuillVisible] = useState(false);

  useEffect(() => {
    if (description) {
      setValue(description);
    }
  }, [description]);

  function handleOpenQuill() {
    if (!isAssignedUserEmail && role === USER_ROLES.member)
      return toast.error(
        "You can't edit description. Only Admins or Assignees are allowed.",
      );
    setIsQuillVisible(true);
  }

  const handleInitialValue = useCallback(
    (value: string) => setValue(value),
    [],
  );

  const handleCloseQuill = useCallback(() => setIsQuillVisible(false), []);

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <List />
          <p className="text-xl font-medium">Description</p>
        </div>
        {!isQuillVisible && (
          <IconButton
            disabled={false}
            title="Edit Description"
            aria-label="Edit Description"
            onClick={handleOpenQuill}
            className="px-2"
          >
            <SquarePen className="text-green-500" />
          </IconButton>
        )}
      </div>

      {!isQuillVisible && cardDetailsId ? (
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
      {isQuillVisible && (
        <DescriptionDialog
          setInitialValue={handleInitialValue}
          setCloseQuill={handleCloseQuill}
          cardDetailsId={cardDetailsId}
          isQuillVisible={isQuillVisible}
          initialValue={value}
        />
      )}
    </>
  );
}
