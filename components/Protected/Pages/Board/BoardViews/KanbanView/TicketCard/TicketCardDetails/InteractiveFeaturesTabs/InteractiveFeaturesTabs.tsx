"use client";
import { IconButton } from "@/components/ui/iconButton";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Comments } from "./Comments/Comments";
import { Spacer } from "@/components/ui/spacer";

import { Comment, User } from "@/lib/generated/prisma/client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { TAB_ELEMENTS } from "@/lib/consts/protected/card";

const Activities = dynamic(() =>
  import("./Activities/Activities").then((m) => m.Activities),
);
const Attachments = dynamic(() =>
  import("./Attachments/Attachments").then((m) => m.Attachments),
);
const Checklist = dynamic(() =>
  import("./Checklist/Checklist").then((m) => m.Checklist),
);

type Props = {
  cardDetailsId: string;

  comments: (Comment & { author: User })[] | undefined;
  assignedUserEmail: string | undefined | null;
};

const TAB_COMPONENTS = {
  comments: Comments,
  attachments: Attachments,
  activities: Activities,
  checklist: Checklist,
} as const;

export function InteractiveFeaturesTabs({
  cardDetailsId,
  comments,
  assignedUserEmail,
}: Props) {
  const [selectedTab, setSelectTab] =
    useState<(typeof TAB_ELEMENTS)[number]["value"]>("comments");
  // todo, CHANGE IT TO USEsTATE, to have the same tab at each new open card

  function handleSelectTab(data: (typeof TAB_ELEMENTS)[number]["value"]) {
    setSelectTab(data);
  }

  const ActiveComponent = TAB_COMPONENTS[selectedTab];
  return (
    <div>
      <div className="flex gap-4 flex-wrap" role="tablist">
        {/* TABS */}
        {TAB_ELEMENTS.map((data) => (
          <div key={data.value} role="tab">
            <IconButton
              className={cn()}
              onClick={() => handleSelectTab(data.value)}
              title={data.label}
              aria-label={data.label}
            >
              <p
                className={cn(
                  selectedTab === data.value ? "text-white" : "text-gray-400",
                  "text-lg font-medium",
                )}
              >
                {data.label}
              </p>
              {selectedTab === data.value && (
                <Separator className="w-full mt-1 bg-gray-400" />
              )}
            </IconButton>
          </div>
        ))}
      </div>

      <Spacer size={6} />

      {/* TABS CONTENT */}
      <div className="pl-2">
        {ActiveComponent && (
          <ActiveComponent
            data={comments}
            cardDetailsId={cardDetailsId}
            assignedUserEmail={assignedUserEmail}
          />
        )}
      </div>
    </div>
  );
}
