"use client";
import { IconButton } from "@/components/ui/iconButton";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Comments } from "./Comments/Comments";
import { Spacer } from "@/components/ui/spacer";
import { useStore } from "@/store/useStore";
import { TAB_ELEMENTS } from "@/lib/consts";
import { Comment, User } from "@/lib/generated/prisma/client";
import dynamic from "next/dynamic";

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
};
export function InteractiveFeaturesTabs({ cardDetailsId, comments }: Props) {
  const { selectedTab, setSelectTab } = useStore();

  function handleSelectTab(data: (typeof TAB_ELEMENTS)[number]) {
    setSelectTab(data.value);
  }
  return (
    <div>
      <div className="flex gap-4">
        {/* TABS */}
        {TAB_ELEMENTS.map((data) => (
          <div key={data.value}>
            <IconButton
              className={cn()}
              onClick={() => handleSelectTab(data)}
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
        {selectedTab === "comments" && (
          <Comments data={comments} cardDetailsId={cardDetailsId} />
        )}
        {selectedTab === "attachments" && (
          <Attachments cardDetailsId={cardDetailsId} />
        )}
        {selectedTab === "activities" && (
          <Activities cardDetailsId={cardDetailsId} />
        )}
        {selectedTab === "checklist" && (
          <Checklist cardDetailsId={cardDetailsId} />
        )}
      </div>
    </div>
  );
}
