"use client";
import { IconButton } from "@/components/ui/iconButton";
import { Spacer } from "@/components/ui/spacer";
import { Check, List, SquarePen, X } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useState } from "react";

import "react-quill-new/dist/quill.snow.css";
import { InitialDescriptionState } from "./InitialDescriptionState";
import { CardDetailsType } from "@/lib/types";
import DOMPurify from "dompurify";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type Props = {
  data: CardDetailsType;
};
export function Description({ data }: Props) {
  const [value, setValue] = useState(data.description || "");
  const [isQuillVisible, setIsQuillVisible] = useState(false);

  function handleSaveDescription() {
    // TODO api call
    console.log(data, value);
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
              title="Close Description"
              aria-label="Close Description"
              onClick={() => setIsQuillVisible(false)}
            >
              <X />
            </IconButton>
            <IconButton
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
        <div className="h-[283.54px]">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      ) : (
        <InitialDescriptionState
          onClick={() => setIsQuillVisible(true)}
          classNameChildren="flex flex-col justify-start h-full wrap-break-word "
        >
          {data.description ? (
            <div
              className=" text-left max-w-full text-gray-300  wrap-break-word  html-content "
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.description).replace(
                  /&nbsp;/g,
                  " "
                ), //Prevent XSS attacks.
              }}
            />
          ) : (
            <p className="text-gray-300">No description</p>
          )}
        </InitialDescriptionState>
      )}
    </div>
  );
}
