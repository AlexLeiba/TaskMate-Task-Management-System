import { ListAndCardsAndDueDateAndChecklistType } from "@/lib/types";
import React from "react";

type Props = {
  boardId?: string;
};
export function ListView({ boardId }: Props) {
  return (
    <div>
      <p className="text-lg text-black">ListView</p>
    </div>
  );
}
