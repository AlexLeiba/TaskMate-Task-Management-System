import { useEffect, useOptimistic, useState, useTransition } from "react";
import { ProgressBar } from "./ProgressBar";
import { AddNewInput } from "../../../../../AddNewInput";
import { CheckSquare, Plus } from "lucide-react";
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
import { IconButton } from "@/components/ui/iconButton";
import { Spacer } from "@/components/ui/spacer";

type Props = {
  cardDetailsId: string;
};
export function Checklist({ cardDetailsId }: Props) {
  const boardId = useBoardId();
  const queryClient = useQueryClient();

  const [isOpenedTitleInput, setIsOpenedTitleInput] = useState(false);

  async function getChecklistData() {
    try {
      const response = getChecklistDataAction({ cardDetailsId });

      return response;
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
      throw error?.message || "Something went wrong";
    }
  }

  const {
    data: checklistData,
    error,
    isRefetching,
    isLoading,
  } = useQuery({
    queryFn: getChecklistData,
    queryKey: ["checklist"],
  });

  const [loadingOptimisticTransition, startOptimisticTransition] =
    useTransition();

  const [optimisticChecklistData, setOptimisticChecklistData] = useOptimistic<
    Checklist[]
  >(checklistData || []);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Something went wrong");
    }
  }, [error]);

  const { mutate: createMutation, isPending: isPendingCreate } = useMutation({
    mutationFn: createChecklistAction,
    mutationKey: ["create-checklist"],
    onSuccess: () => {
      toast.dismiss("create-checklist");
      toast.success("Checklist created");

      queryClient.invalidateQueries({
        queryKey: ["card-details"],
      });
      queryClient.invalidateQueries({
        queryKey: ["checklist"],
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
      toast.dismiss("update-checklist");
      toast.success("Checklist updated");
      setIsOpenedTitleInput(false);
      queryClient.invalidateQueries({
        queryKey: ["card-details"],
      });
      queryClient.invalidateQueries({
        queryKey: ["checklist"],
      });
    },
    onError: ({ message }) => {
      toast.error(message || "Something went wrong");
    },
  });

  const { isPending: isPendingDelete, mutate: mutateDelete } = useMutation({
    mutationFn: deleteChecklistAction,
    mutationKey: ["delete-checklist"],
    onSuccess: () => {
      toast.dismiss("delete-checklist");
      toast.success("Checklist deleted");
      queryClient.invalidateQueries({
        queryKey: ["card-details"],
      });
      queryClient.invalidateQueries({
        queryKey: ["checklist"],
      });
    },
    onError: ({ message }) => {
      toast.dismiss("delete-checklist");
      toast.error(message || "Something went wrong");
    },
  });

  function handleCheckItem(id: string) {
    if (!cardDetailsId) {
      return toast.error("Card Id not found");
    }

    startOptimisticTransition(() => {
      setOptimisticChecklistData((prev) => {
        return prev.map((item) => {
          if (item.id === id) {
            return { ...item, isCompleted: !item.isCompleted };
          }

          return item;
        });
      });
    });
    toast.loading("Updating checklist...", { id: "update-checklist" });
    updateMutation({ cardDetailsId, checklistId: id, boardId });
  }

  function handleDeleteChecklist(id: string) {
    if (!cardDetailsId) {
      return toast.error("Card Id not found");
    }

    startOptimisticTransition(() => {
      setOptimisticChecklistData((prev) => {
        return prev.filter((item) => item.id !== id);
      });
    });
    toast.loading("Deleting checklist...", { id: "delete-checklist" });
    mutateDelete({ cardDetailsId, checklistId: id, boardId });
  }

  function handleAddChecklist(value: { [inputName: string]: string }) {
    if (!cardDetailsId) {
      return toast.error("Card Id not found");
    }

    startOptimisticTransition(() => {
      setOptimisticChecklistData((prev) => [
        {
          id: Date.now().toString(),
          isCompleted: false,
          title: value?.title,
          cardId: cardDetailsId,
          boardId: boardId || "",
          createdAt: new Date(),
          updatedAt: new Date(),
          order: prev.length + 1,
        },
        ...prev,
      ]);
    });
    setIsOpenedTitleInput(false);
    toast.loading("Creating checklist...", { id: "create-checklist" });
    createMutation({
      cardDetailsId,
      title: value.title,
      boardId,
    });
  }
  if (!checklistData || !cardDetailsId || isLoading) {
    return <ChecklistSkeleton />;
  }
  return (
    <div>
      <div className="flex gap-2 flex-col">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <CheckSquare />
            <h5 className="text-xl font-medium">Checklist</h5>
          </div>
          <IconButton
            disabled={isPendingCreate || isRefetching || isPendingDelete}
            className="px-2"
            title="Add new item"
            aria-label="Add new item"
            onClick={() => setIsOpenedTitleInput(true)}
          >
            <Plus className="text-green-600" />
          </IconButton>
        </div>
        {optimisticChecklistData.length > 0 ? (
          <ProgressBar
            percentage={Math.round(
              (optimisticChecklistData?.filter((item) => item.isCompleted)
                .length /
                optimisticChecklistData.length) *
                100,
            )}
          />
        ) : (
          <Spacer size={2} />
        )}
      </div>

      <div className="overflow-y-auto h-56 ">
        {checklistData.length > 0 && (
          <AddNewInput
            type="textarea"
            label="Add new item"
            disabled={isPendingCreate || isRefetching || isPendingDelete}
            loading={isPendingCreate}
            handleSubmitValue={handleAddChecklist}
            inputName="title"
            isOpenedTitleInput={isOpenedTitleInput}
            setIsOpenedTitleInput={setIsOpenedTitleInput}
            classNameContainer="p-2"
            placeholder="type checklist item here..."
          >
            <Button variant={"secondary"} className="hidden">
              + Add an item
            </Button>
          </AddNewInput>
        )}

        {checklistData.length === 0 ? (
          <AddNewInput
            type="textarea"
            disabled={isPendingCreate || isRefetching || isPendingDelete}
            loading={isPendingCreate}
            handleSubmitValue={handleAddChecklist}
            inputName="title"
            isOpenedTitleInput={isOpenedTitleInput}
            setIsOpenedTitleInput={setIsOpenedTitleInput}
            classNameContainer="p-2"
          >
            <Button variant={"secondary"}>+ Add an item</Button>
          </AddNewInput>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              {optimisticChecklistData?.map((item) => (
                <ChecklistCard
                  disabled={
                    isPendingDelete ||
                    isPendingUpdate ||
                    isPendingCreate ||
                    isRefetching ||
                    loadingOptimisticTransition
                  }
                  loading={isPendingDelete}
                  data={item}
                  key={item.id}
                  handleDeleteChecklist={() => handleDeleteChecklist(item.id)}
                  handleSelectChecklist={() => handleCheckItem(item.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
