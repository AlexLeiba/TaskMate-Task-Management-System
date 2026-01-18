"use client";
import { IconButton } from "@/components/ui/iconButton";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";
import { Comments } from "./Comments/Comments";
import { Activities } from "./Activities/Activities";
import { Attachments } from "./Attachments/Attachments";
import { Spacer } from "@/components/ui/spacer";
import { CardDetailsType } from "@/lib/types";

const TAB_ELEMENTS = [
  {
    label: "Comments",
    value: "comments",
  },
  {
    label: "Attachments",
    value: "attachments",
  },
  {
    label: "Activities",
    value: "activities",
  },
] as const;

type Props = {
  data: CardDetailsType;
};
export function InteractiveFeaturesTabs({ data }: Props) {
  const [tab, setTab] = React.useState<
    "attachments" | "comments" | "activities"
  >("comments");
  return (
    <div>
      <div className="flex gap-4">
        {/* TABS */}
        {TAB_ELEMENTS.map((data) => (
          <div key={data.value}>
            <IconButton
              className={cn()}
              onClick={() => setTab(data.value)}
              title={data.label}
              aria-label={data.label}
            >
              <p
                className={cn(
                  tab === data.value ? "text-white" : "text-gray-400",
                  "text-lg font-medium"
                )}
              >
                {data.label}
              </p>
              {tab === data.value && (
                <Separator className="w-full mt-1 bg-gray-400" />
              )}
            </IconButton>
          </div>
        ))}
      </div>
      <Spacer size={6} />
      <div className="pl-2">
        {tab === "comments" && <Comments data={data.comments} />}
        {tab === "attachments" && (
          <Attachments cardId={data.id} listId={data.listId} />
        )}
        {tab === "activities" && (
          <Activities cardId={data.id} listId={data.listId} />
        )}
      </div>
    </div>
  );
}
