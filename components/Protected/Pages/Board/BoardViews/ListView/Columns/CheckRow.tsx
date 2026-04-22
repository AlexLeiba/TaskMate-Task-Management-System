import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useDebounce } from "@/hooks/useDebounce";
import { CheckedState } from "@radix-ui/react-checkbox";

type Props = {
  handleRowSelection: (value: CheckedState) => void;
  rowId: string;
  isSelected: boolean;
};
export function CheckRow({ handleRowSelection, rowId, isSelected }: Props) {
  const [isCheckedLocally, setIsCheckedLocally] = useState(isSelected);

  useEffect(() => {
    setIsCheckedLocally(isSelected);
  }, [isSelected]);

  const delayHandleRowSelection = useDebounce(handleRowSelection, 100);
  return (
    <Checkbox
      checked={isCheckedLocally}
      onCheckedChange={(value) => {
        setIsCheckedLocally(() => !isSelected);
        delayHandleRowSelection(value);
      }}
      aria-label={`Select row - ${rowId}`}
      title={`Select row - ${rowId}`}
    />
  );
}
