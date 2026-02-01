import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { AddNewInput } from "../../../../../AddNewInput";
import { Spacer } from "@/components/ui/spacer";
import { CheckSquare } from "lucide-react";
import { ChecklistCard } from "./ChecklistCard";
import { Button } from "@/components/ui/button";
import { ChecklistSkeleton } from "./ChecklistSkeleton";
import { useQuery } from "@tanstack/react-query";
import { type Checklist } from "@/lib/generated/prisma/client";

type Props = {
  cardDetailsId: string | undefined;
};
export function Checklist({ cardDetailsId }: Props) {
  const [isOpenedTitleInput, setIsOpenedTitleInput] = useState(false);

  const checklistData: Checklist[] = [];

  const { data, isLoading } = useQuery({
    queryFn: () => {},
    queryKey: ["checklist"],
    staleTime: 1000 * 60 * 60,
  });

  function handleSelectChecklist(id: string) {
    console.log("🚀 ~ handleSelectChecklist ~ id:", id);
  }

  function handleDeleteChecklist(id: string) {
    console.log("🚀 ~ handleDeleteChecklist ~ id:", id);
  }

  function handleAddChecklist(value: { [inputName: string]: string }) {
    console.log("🚀 ~ handleAddChecklist ~ value:", value);
  }

  if (!checklistData) return <ChecklistSkeleton />;
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
            handleSubmitValue={(v) => console.log(v)}
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
                handleSubmitValue={(v) => handleAddChecklist(v)}
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
