import { KEYBOARD } from "@/lib/consts/consts";
import { Check, UserPlus } from "lucide-react";
import { AssignedToType, AssignToCardActionProps } from "@/lib/types";
import { IconButton } from "@/components/ui/iconButton";
import { UserCard } from "../../../../../../../Shared-protected/UserCard/UserCard";
import { useMutation } from "@tanstack/react-query";
import { assignToCardAction, unassigneCardAction } from "@/app/actions/card";
import toast from "react-hot-toast";
import { useMembers } from "@/hooks/useMembers";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";

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
  const { members, isFetching } = useMembers();

  const { mutate, isPending } = useMutation({
    mutationFn: assignToCardAction,
    mutationKey: [QUERY_KEYS.pages.board.cards.assignTo],
    onSuccess: () => {
      toast.dismiss(QUERY_KEYS.pages.board.cards.assignTo);
      toast.success("Card assigned");
    },
    onError: ({ message }) => {
      toast.dismiss(QUERY_KEYS.pages.board.cards.assignTo);
      toast.error(message || "Error assigning card, please try again");
    },
  });

  const { mutate: unnasignMutation, isPending: isPendingUnassigne } =
    useMutation({
      mutationFn: unassigneCardAction,
      mutationKey: [QUERY_KEYS.pages.board.cards.unassign],
      onSuccess: () => {
        toast.dismiss(QUERY_KEYS.pages.board.cards.unassign);
        toast.success("Card unassigned");
      },
      onError: ({ message }) => {
        toast.dismiss(QUERY_KEYS.pages.board.cards.unassign);
        toast.error(message || "Error unassigning card, please try again");
      },
    });

  function handleAssignTo({
    email,
    name,
    avatar,
  }: Pick<
    AssignToCardActionProps["assignedUserData"],
    "email" | "name" | "avatar"
  >) {
    handleClosePopup();
    toast.loading("Assigning card...", {
      id: QUERY_KEYS.pages.board.cards.assignTo,
    });
    mutate({
      assignedUserData: {
        email,
        name,
        avatar,
      },
      boardId,
      listId,
      cardId,
    });
  }

  function handleUnassigneUser() {
    unnasignMutation({
      assignedUserData: {
        email: "",
        name: "",
        avatar: "",
      },
      boardId,
      listId,
      cardId,
    });
    toast.loading("Unassigning card...", {
      id: QUERY_KEYS.pages.board.cards.unassign,
    });
  }
  return (
    <>
      <div className="flex flex-col gap-2 items-start pl-2 ">
        {/* ASSIGN USER*/}
        <IconButton
          disabled={isPending || isPendingUnassigne || isFetching}
          onClick={(e) => {
            e.stopPropagation();
            if (!assignedTo) return;
            handleUnassigneUser();
          }}
          onKeyDown={(e) => {
            if (e.key === KEYBOARD.ENTER) {
              e.stopPropagation();
              if (!assignedTo) return;
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
          {!assignedTo && <Check className="text-green-600" />}
        </IconButton>
        {members?.map((user) => (
          <IconButton
            disabled={isPending || isPendingUnassigne || isFetching}
            title={user.fullName}
            aria-label={user.fullName}
            key={user.email}
            className=" p-1.5 w-full"
            classNameChildren="flex items-center justify-between gap-1"
            onClick={(e) => {
              e.stopPropagation();
              if (user.email === assignedTo) return;
              handleAssignTo({
                email: user.email || "",
                name: user.fullName,
                avatar: user.imageUrl || "",
              });
            }}
            onKeyDown={(e) => {
              if (e.key === KEYBOARD.ENTER) {
                e.stopPropagation();
                if (user.email === assignedTo) return;
                handleAssignTo({
                  email: user.email || "",
                  name: user.fullName,
                  avatar: user.imageUrl || "",
                });
              }
            }}
          >
            <UserCard
              data={{
                email: user.email || "",
                name: user.fullName,
                avatar: user.imageUrl || "",
              }}
              size={"sm"}
            />

            {assignedTo === user.email && <Check className="text-green-600" />}
          </IconButton>
        ))}
      </div>
    </>
  );
}
