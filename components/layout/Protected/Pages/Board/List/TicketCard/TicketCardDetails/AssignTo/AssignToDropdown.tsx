import { AssignedToType, UserType } from "@/lib/types";

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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useOrganization } from "@clerk/nextjs";
import { FAKE_USERS } from "@/lib/consts";
import { UserCard } from "@/components/layout/Protected/UserCard/UserCard";

import { assignToCardAction, unassigneCardAction } from "@/app/actions/card";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

type Props = {
  assignedTo: string | undefined;
  listId: string | undefined;
  cardId: string;
};
export function AssignToDropdown({ assignedTo, listId, cardId }: Props) {
  const boardId = usePathname()?.split("/").at(-1);

  const [assignedEmail, setAssignedEmail] = useState(assignedTo || "");

  const [selectedUser, setSelectedUser] = useState<UserType>(FAKE_USERS[0]);

  const { organization, isLoaded } = useOrganization();

  const { data: members } = useQuery({
    queryFn: fetchMembers,
    queryKey: ["members"],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: assignToCardAction,
    mutationKey: ["assign-to"],
    onSuccess: ({ data }) => {
      toast.dismiss("assign-card");
      toast.success("Card assigned");
      setAssignedEmail(data.assignedToEmail || "");

      if (foundSelectedUser) {
        const selectedUser = {
          id: foundSelectedUser.id,
          email: foundSelectedUser.publicUserData?.identifier || "",
          name: foundSelectedUser.publicUserData?.firstName || "",
          avatar: foundSelectedUser.publicUserData?.imageUrl || "",
        };

        setSelectedUser(selectedUser);
      }
    },
    onError: ({ message }) => {
      toast.dismiss("assign-card");
      toast.error(message || "Error assigning card, please try again");
    },
  });

  const { mutate: unnasignMutation, isPending: isPendingUnassigne } =
    useMutation({
      mutationFn: unassigneCardAction,
      mutationKey: ["unassign-to"],
      onSuccess: () => {
        toast.dismiss("unassign-card");
        toast.success("Card unassigned");
        setAssignedEmail("");
      },
      onError: ({ message }) => {
        toast.dismiss("unassign-card");
        toast.error(message || "Error unassigning card, please try again");
      },
    });

  useEffect(() => {
    const foundSelectedUser = members?.find(
      (member) => member.publicUserData?.identifier === assignedTo,
    );

    if (foundSelectedUser) {
      const selectedUser = {
        id: foundSelectedUser.id,
        email: foundSelectedUser.publicUserData?.identifier || "",
        name: foundSelectedUser.publicUserData?.firstName || "",
        avatar: foundSelectedUser.publicUserData?.imageUrl || "",
      };
      // eslint-disable-next-line
      setSelectedUser(selectedUser);
    }

    setAssignedEmail(assignedTo || "");
  }, [members, assignedTo]);

  const foundSelectedUser = members?.find(
    (member) => member.publicUserData?.identifier === assignedTo,
  );

  async function fetchMembers() {
    if (!isLoaded || !organization || !organization.getMemberships()) return;
    const res = await organization?.getMemberships();
    if (!res) return;

    return res.data || [];
  }

  function handleAssignTo(memberEmail: string) {
    if (!boardId || !listId || !cardId) return;

    if (memberEmail === "none") {
      handleUnassigneUser();
      return;
    }
    mutate({
      assignedUserData: {
        email: memberEmail,
        name: selectedUser.name,
        avatar: selectedUser.avatar,
      },
      boardId,
      listId,
      cardId,
    });
    toast.loading("Assigning to user...", { id: "assign-card" });
  }

  function handleUnassigneUser() {
    if (!boardId || !listId || !cardId) return;
    unnasignMutation({
      assignedUserData: {
        email: selectedUser.email,
        name: selectedUser.name,
        avatar: selectedUser.avatar,
      },
      boardId,
      listId,
      cardId,
    });
    toast.loading("Unassigning user...", { id: "unassign-card" });
  }

  if (!listId || !cardId || !boardId || !isLoaded) return <AssignToSkeleton />;

  return (
    <Select onValueChange={(v) => handleAssignTo(v)} value={assignedEmail}>
      <SelectTrigger
        disabled={!isLoaded || isPending || isPendingUnassigne}
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
              disabled={!isLoaded || isPending || isPendingUnassigne}
              defaultChecked={user.publicUserData?.identifier === assignedTo}
              aria-label={
                user.publicUserData?.firstName +
                " " +
                user.publicUserData?.lastName
              }
              key={user.id}
              value={user.publicUserData?.identifier || ""}
            >
              <UserCard
                data={{
                  email: user.publicUserData?.identifier || "",
                  name:
                    user.publicUserData?.firstName +
                    " " +
                    user.publicUserData?.lastName,
                  avatar: user.publicUserData?.imageUrl || "",
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
