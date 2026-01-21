import { PrioritiesType } from "@/lib/types";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CARD_PRIORITIES } from "@/lib/consts";
import { PrioritySkeleton } from "./PrioritySkeleton";

type Props = {
  data: PrioritiesType;
};
export function PriorityDropdown({ data }: Props) {
  function handleSelectPriority(priorityValue: string) {
    console.log(priorityValue);
  }
  if (!data) return <PrioritySkeleton />;
  return (
    <Select onValueChange={(v) => handleSelectPriority(v)}>
      <SelectTrigger className="w-full flex justify-between text-left h-10!">
        <SelectValue placeholder="Select Priority" className="h-10" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Priority</SelectLabel>
          {CARD_PRIORITIES.map((priority) => (
            <SelectItem
              value={priority.value}
              title={priority.label}
              aria-label={priority.label}
              key={priority.value}
              // className="w-full"
            >
              <div className="flex items-center gap-2">
                <p className="text-base ">{priority.icon}</p>
                <p className="text-base ">{priority.label}</p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
