"use client";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { useRole } from "@/hooks/useRole";
import { USER_ROLES } from "@/lib/consts";
import { ListCardTicketsCounter } from "./ListCardTicketsCounter";
import { ListTitle } from "./ListTitle";
import { ListStatuses } from "./ListStatuses/ListStatuses";
import { ListOptions } from "./ListOptions/ListOptions";

type Props = {
  status: string;
  title: string;
  listId: string;
  listCardsDynamicCount: number;
};
export function ListCardHeader({
  status,
  title,
  listId,
  listCardsDynamicCount,
}: Props) {
  const role = useRole();
  const [isOpenedTitleInput, setIsOpenedTitleInput] = useState(false);
  const openTitleInput = useStore((state) => state.openTitleInput);
  const isInputOpened =
    openTitleInput.id === listId ? openTitleInput.isOpen : isOpenedTitleInput;

  return (
    <div className="flex justify-between items-start mb-2 relative">
      {/* STATUSES */}
      {!isInputOpened && (
        <ListStatuses selectedStatus={status} listId={listId} />
      )}

      {role === USER_ROLES.admin ? (
        <>
          {/* TITLE */}
          <ListTitle
            isInputOpened={isInputOpened}
            setIsOpenedTitleInput={setIsOpenedTitleInput}
            listId={listId}
            defaultTitle={title}
            listCardsDynamicCount={listCardsDynamicCount}
          />

          {/* OPTIONS */}
          {!isInputOpened && <ListOptions listId={listId} />}
        </>
      ) : (
        //CARD TICKETS COUNTER
        <div className="w-full pl-2 ">
          <h3 className="text-lg font-medium line-clamp-3">
            {title}
            <ListCardTicketsCounter
              listId={listId}
              totalTicketCardsInList={listCardsDynamicCount}
            />
          </h3>
        </div>
      )}
    </div>
  );
}
