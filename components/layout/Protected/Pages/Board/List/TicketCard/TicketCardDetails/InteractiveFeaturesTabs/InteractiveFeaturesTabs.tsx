"use client";
import { IconButton } from "@/components/ui/iconButton";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Comments } from "./Comments/Comments";
import { Activities } from "./Activities/Activities";
import { Attachments } from "./Attachments/Attachments";
import { Spacer } from "@/components/ui/spacer";
import { CardDetailsType } from "@/lib/types";
import { Checklist } from "./Checklist/Checklist";
import { useStore } from "@/store/useStore";
import { TAB_ELEMENTS } from "@/lib/consts";

type Props = {
  data: CardDetailsType;
};
export function InteractiveFeaturesTabs({ data }: Props) {
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
                  "text-lg font-medium"
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
      <div className="pl-2">
        {selectedTab === "comments" && <Comments data={data.comments} />}
        {selectedTab === "attachments" && (
          <Attachments cardId={data.id} listId={data.listId} />
        )}
        {selectedTab === "activities" && (
          <Activities cardId={data.id} listId={data.listId} />
        )}
        {selectedTab === "checklist" && (
          <Checklist cardId={data.id} listId={data.listId} />
        )}
      </div>
    </div>
  );
}
