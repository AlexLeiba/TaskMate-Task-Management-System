import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { AddNewInput } from "../../../../../AddNewInput";
import { Spacer } from "@/components/ui/spacer";
import { CheckSquare } from "lucide-react";
import { ChecklistCard } from "./ChecklistCard";
import { Button } from "@/components/ui/button";
import { ChecklistSkeleton } from "./ChecklistSkeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Checklist } from "@/lib/generated/prisma/client";
import toast from "react-hot-toast";
import { useBoardId } from "@/hooks/useBoardId";
import {
  createChecklistAction,
  deleteChecklistAction,
  getChecklistDataAction,
  updateChecklistAction,
} from "@/app/actions/card-details";

type Props = {
  cardDetailsId: string | undefined;
};
export function Checklist({ cardDetailsId }: Props) {
  const boardId = useBoardId();
  const queryClient = useQueryClient();

  const [isOpenedTitleInput, setIsOpenedTitleInput] = useState(false);

  async function getChecklistData() {
    try {
      if (!cardDetailsId) {
        throw new Error("Card Id not found");
      }
      const response = getChecklistDataAction({ cardDetailsId });

      return response;
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  }

  const { data: checklistData, isLoading } = useQuery({
    queryFn: getChecklistData,
    queryKey: ["checklist", cardDetailsId],
  });

  const { mutate: createMutation, isPending: isPendingCreate } = useMutation({
    mutationFn: createChecklistAction,
    mutationKey: ["create-checklist"],
    onSuccess: () => {
      toast.success("Checklist created");

      queryClient.invalidateQueries({
        queryKey: ["card-details", "checklist", cardDetailsId],
      });
    },
    onError: ({ message }) => {
      toast.error(message || "Something went wrong");
    },
  });
  const { mutate: updateMutation, isPending: isPendingUpdate } = useMutation({
    mutationFn: updateChecklistAction,
    mutationKey: ["update-checklist"],
    onSuccess: () => {
      toast.success("Checklist updated");
      queryClient.invalidateQueries({
        queryKey: ["card-details", "checklist", cardDetailsId],
      });
    },
    onError: ({ message }) => {
      toast.error(message || "Something went wrong");
    },
  });
  const { isPending: isPendingDelete } = useMutation({
    mutationFn: deleteChecklistAction,
    mutationKey: ["delete-checklist"],
    onSuccess: () => {
      toast.success("Checklist deleted");

      queryClient.invalidateQueries({
        queryKey: ["card-details", "checklist", cardDetailsId],
      });
    },
    onError: ({ message }) => {
      toast.error(message || "Something went wrong");
    },
  });

  if (!checklistData || !cardDetailsId) return <ChecklistSkeleton />;

  function handleSelectChecklist(id: string) {
    if (!cardDetailsId) {
      return toast.error("Card Id not found");
    }
    updateMutation({ cardDetailsId, checklistId: id, boardId });
  }

  function handleDeleteChecklist(id: string) {
    if (!cardDetailsId) {
      return toast.error("Card Id not found");
    }
    deleteChecklistAction({ cardDetailsId, checklistId: id, boardId });
  }

  function handleAddChecklist(value: { [inputName: string]: string }) {
    if (!cardDetailsId) {
      return toast.error("Card Id not found");
    }
    createMutation({
      cardDetailsId,
      title: value.title,
      boardId,
    });
  }

  return (
    <div>
      <div className="flex gap-2 items-center">
        <CheckSquare />
        <p className="text-xl font-medium">Checklist</p>
      </div>

      <Spacer size={4} />
      <div className="overflow-y-auto h-58 ">
        {checklistData.length === 0 ? (
          <AddNewInput
            loading={isPendingCreate}
            disabled={isLoading}
            handleSubmitValue={handleAddChecklist}
            inputName="title"
            isOpenedTitleInput={isOpenedTitleInput}
            setIsOpenedTitleInput={setIsOpenedTitleInput}
            classNameContainer="p-0 ml-8"
          >
            <Button className="w-27.5">Add an item</Button>
          </AddNewInput>
        ) : (
          <>
            <ProgressBar
              percentage={Math.round(
                (checklistData?.filter((item) => item.isCompleted).length /
                  checklistData.length) *
                  100,
              )}
            />
            <Spacer size={4} />
            <div className="flex flex-col gap-3">
              {checklistData.map((item) => (
                <ChecklistCard
                  data={item}
                  key={item.id}
                  handleDeleteChecklist={() => handleDeleteChecklist(item.id)}
                  handleSelectChecklist={() => handleSelectChecklist(item.id)}
                />
              ))}
              <AddNewInput
                disabled={isLoading}
                loading={isPendingCreate}
                handleSubmitValue={handleAddChecklist}
                inputName="title"
                isOpenedTitleInput={isOpenedTitleInput}
                setIsOpenedTitleInput={setIsOpenedTitleInput}
                classNameContainer="p-0 ml-8"
              >
                <Button className="w-27.5">Add an item</Button>
              </AddNewInput>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
