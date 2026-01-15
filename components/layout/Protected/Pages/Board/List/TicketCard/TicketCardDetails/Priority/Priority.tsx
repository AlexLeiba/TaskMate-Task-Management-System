import { Spacer } from "@/components/ui/spacer";
import { AssignedToType, PrioritiesType, PriorityType } from "@/lib/types";
import { Check, Wifi } from "lucide-react";
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

type Props = {
  data: PrioritiesType;
};
export function Priority({ data }: Props) {
  function handleSelectPriority(priorityValue: string) {
    console.log(priorityValue);
  }
  if (!data) return null;
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <Wifi />
        <p className="text-xl font-medium">Priority</p>
      </div>

      <Spacer size={4} />

      <Select onValueChange={(v) => handleSelectPriority(v)}>
        <SelectTrigger className="w-full flex justify-between text-left h-14!">
          <SelectValue placeholder="Assign to" className="h-10" />
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
    </div>
  );
}
