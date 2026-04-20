import { UserType } from "@/lib/types";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AssignToSkeleton } from "./AssignToSkeleton";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserCard } from "@/components/Protected/Shared-protected/UserCard/UserCard";

import { assignToCardAction, unassigneCardAction } from "@/app/actions/card";
import toast from "react-hot-toast";
import { useBoardId } from "@/hooks/useBoardId";
import { USER_ROLES } from "@/lib/consts/consts";
import { useRole } from "@/hooks/useRole";
import { useMembers } from "@/hooks/useMembers";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { FAKE_USERS } from "@/lib/consts/protected/card";

type Props = {
  assignedTo: string | undefined;
  listId: string | undefined;
  cardDetailsId: string;
};
export function AssignToDropdown({ assignedTo, listId, cardDetailsId }: Props) {
  const queryClient = useQueryClient();
  const boardId = useBoardId();

  const [selectedUser, setSelectedUser] = useState<UserType>(FAKE_USERS[0]);

  const role = useRole();

  const { members } = useMembers();

  const { mutate: mutateAssigneTo, isPending } = useMutation({
    mutationFn: assignToCardAction,
    mutationKey: [QUERY_KEYS.pages.board.kanbanView.cardDetails.assignTo],
    onSuccess: ({ data }) => {
      toast.success("Card assigned", {
        id: QUERY_KEYS.pages.board.kanbanView.cardDetails.assignTo,
      });
      const foundSelectedUser = members?.find(
        (member) => member?.email === data?.assignedToEmail,
      );
      const selectedUser = {
        email: foundSelectedUser?.email || "none",
        name: foundSelectedUser?.fullName || "none",
        avatar: foundSelectedUser?.imageUrl || "",
      };

      setSelectedUser(selectedUser);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.hooks.useBoardListData],
      });
    },
    onError: ({ message }) => {
      toast.error(message || "Error assigning card, please try again", {
        id: QUERY_KEYS.pages.board.kanbanView.cards.assignTo,
      });
    },
  });

  const { mutate: unnasignMutation, isPending: isPendingUnassigne } =
    useMutation({
      mutationFn: unassigneCardAction,
      mutationKey: [QUERY_KEYS.pages.board.kanbanView.cardDetails.unassign],
      onSuccess: () => {
        toast.success("Card unassigned", {
          id: QUERY_KEYS.pages.board.kanbanView.cardDetails.unassign,
        });
        setSelectedUser(FAKE_USERS[0]);

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.hooks.useBoardListData],
        });
      },
      onError: ({ message }) => {
        toast.error(message || "Error unassigning card, please try again", {
          id: QUERY_KEYS.pages.board.kanbanView.cardDetails.unassign,
        });
      },
    });

  useEffect(() => {
    const foundSelectedUser = members?.find(
      (member) => member?.email === assignedTo,
    );

    if (foundSelectedUser) {
      const selectedUser = {
        email: foundSelectedUser.email || "",
        name: foundSelectedUser.fullName || "",
        avatar: foundSelectedUser.imageUrl || "",
      };

      return setSelectedUser(selectedUser);
    }

    setSelectedUser(FAKE_USERS[0]);

    // eslint-disable-next-line
  }, [assignedTo, setSelectedUser]);

  function handleAssignTo(memberEmail: string) {
    if (!boardId || !listId || !cardDetailsId)
      return toast.error("Something went wrong, please try again");

    if (memberEmail === "none") {
      handleUnassigneUser();
      return;
    }

    mutateAssigneTo({
      assignedUserData: {
        email: memberEmail,
        name: selectedUser.name,
        avatar: selectedUser.avatar,
      },
      boardId,
      listId,
      cardId: cardDetailsId,
    });

    toast.loading("Assigning to user...", {
      id: QUERY_KEYS.pages.board.kanbanView.cards.assignTo,
    });
  }

  function handleUnassigneUser() {
    if (!boardId || !listId || !cardDetailsId)
      return toast.error("Something went wrong, please try again");

    unnasignMutation({
      assignedUserData: {
        email: selectedUser.email,
        name: selectedUser.name,
        avatar: selectedUser.avatar,
      },
      boardId,
      listId,
      cardId: cardDetailsId,
    });

    toast.loading("Unassigning card...", {
      id: QUERY_KEYS.pages.board.kanbanView.cardDetails.unassign,
    });
  }

  if (!listId || !cardDetailsId || !boardId) {
    return <AssignToSkeleton />;
  }

  return (
    <Select
      onValueChange={(v) => {
        if (v === selectedUser.email) return;
        handleAssignTo(v);
      }}
      value={selectedUser.email || "none"}
    >
      <SelectTrigger
        buttonType="card"
        disabled={isPending || isPendingUnassigne || role === USER_ROLES.member}
        className="w-full flex justify-between text-left h-11!"
      >
        <SelectValue placeholder="Assign to" className="h-10" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Assign to</SelectLabel>
          <SelectItem value="none" className="h-12">
            <p className="text-base">... None</p>
          </SelectItem>

          {members?.map((user) => (
            <SelectItem
              disabled={isPending || isPendingUnassigne}
              defaultChecked={user.email === assignedTo} //checked by member email
              aria-label={user.fullName}
              key={user.email}
              value={user.email || ""}
            >
              <UserCard
                data={{
                  email: user.email || "",
                  name: user.fullName,
                  avatar: user.imageUrl || "",
                }}
                size={"sm"}
              />
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
