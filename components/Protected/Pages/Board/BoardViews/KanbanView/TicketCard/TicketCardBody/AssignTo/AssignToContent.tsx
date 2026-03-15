import { useEffect, useState } from "react";
import { FAKE_USERS, KEYBOARD } from "@/lib/consts";
import { Check, UserPlus } from "lucide-react";
import { AssignedToType, UserType } from "@/lib/types";
import { IconButton } from "@/components/ui/iconButton";
import { UserCard } from "../../../../../../../Shared-protected/UserCard/UserCard";
import { useOrganization } from "@clerk/nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { assignToCardAction, unassigneCardAction } from "@/app/actions/card";
import toast from "react-hot-toast";

type Props = {
  assignedTo: AssignedToType["email"] | null;
  boardId: string;
  listId: string;
  cardId: string;
  handleClosePopup: () => void;
};
export function AssignToContent({
  assignedTo,
  boardId,
  listId,
  cardId,
  handleClosePopup,
}: Props) {
  const [selectedUser, setSelectedUser] = useState<UserType>(FAKE_USERS[0]);
  const { organization, isLoaded } = useOrganization();

  const { isLoading, data: members } = useQuery({
    queryFn: fetchMembers,
    queryKey: ["members"],
  });

  const foundSelectedUser = members?.find(
    (member) => member.publicUserData?.identifier === assignedTo,
  );

  const { mutate, isPending } = useMutation({
    mutationFn: assignToCardAction,
    mutationKey: ["assign-to"],
    onSuccess: () => {
      toast.dismiss("assign-card");
      toast.success("Card assigned");

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
      },
      onError: ({ message }) => {
        toast.dismiss("unassign-card");
        toast.error(message || "Error unassigning card, please try again");
      },
    });

  useEffect(() => {
    if (foundSelectedUser) {
      const selectedUser = {
        id: foundSelectedUser.id,
        email: foundSelectedUser.publicUserData?.identifier || "",
        name:
          `${foundSelectedUser.publicUserData?.firstName} +
            ${foundSelectedUser.publicUserData?.lastName}` || "",
        avatar: foundSelectedUser.publicUserData?.imageUrl || "",
      };
      // eslint-disable-next-line
      return setSelectedUser(selectedUser);
    }

    setSelectedUser(FAKE_USERS[0]);
  }, [members, assignedTo, foundSelectedUser]);

  async function fetchMembers() {
    if (!isLoaded || !organization || !organization.getMemberships()) return;
    const res = await organization?.getMemberships();
    if (!res) return;

    return res.data || [];
  }

  function handleAssignTo(memberEmail: string) {
    handleClosePopup();
    toast.loading("Assigning to user...", { id: "assign-card" });
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
  }

  function handleUnassigneUser() {
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
  return (
    <>
      <div className="flex flex-col gap-2 items-start pl-2 ">
        {/* ASSIGN USER*/}
        <IconButton
          disabled={isPending || isPendingUnassigne || isLoading}
          onClick={(e) => {
            e.stopPropagation();
            if (selectedUser.email === "none") return;
            handleUnassigneUser();
          }}
          onKeyDown={(e) => {
            if (e.key === KEYBOARD.ENTER) {
              e.stopPropagation();
              if (selectedUser.email === "none") return;
              handleUnassigneUser();
            }
          }}
          className=" p-1.5 w-full"
          classNameChildren="flex gap-4 justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full overflow-hidden bg-gray-700 size-8.75 flex justify-center items-center">
              <UserPlus size={20} />
            </div>
            <p>None</p>
          </div>
          {selectedUser.email === "none" && (
            <Check className="text-green-600" />
          )}
        </IconButton>
        {members?.map((user) => (
          <IconButton
            disabled={isPending || isPendingUnassigne || isLoading}
            title={
              user.publicUserData?.firstName +
              " " +
              user.publicUserData?.lastName
            }
            aria-label={
              user.publicUserData?.firstName +
              " " +
              user.publicUserData?.lastName
            }
            key={user.id}
            className=" p-1.5 w-full"
            classNameChildren="flex items-center justify-between gap-1"
            onClick={(e) => {
              e.stopPropagation();
              if (user.publicUserData?.identifier === selectedUser.email)
                return;
              handleAssignTo(user.publicUserData?.identifier || "");
            }}
            onKeyDown={(e) => {
              if (e.key === KEYBOARD.ENTER) {
                e.stopPropagation();
                if (user.publicUserData?.identifier === selectedUser.email)
                  return;
                handleAssignTo(user.publicUserData?.identifier || "");
              }
            }}
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

            {assignedTo === user.publicUserData?.identifier && (
              <Check className="text-green-600" />
            )}
          </IconButton>
        ))}
      </div>
    </>
  );
}
