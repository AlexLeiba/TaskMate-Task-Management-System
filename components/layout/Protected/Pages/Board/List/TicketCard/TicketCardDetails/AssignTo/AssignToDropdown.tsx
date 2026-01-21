import { AssignedToType } from "@/lib/types";

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

type Props = {
  data: AssignedToType | undefined;
};
export function AssignToDropdown({ data }: Props) {
  function handleAssignTo(email: string) {
    console.log("🚀 ~ handleAssignTo ~ email:", email);
  }
  if (!data) return <AssignToSkeleton />;
  return (
    <Select onValueChange={(v) => handleAssignTo(v)}>
      <SelectTrigger className="w-full flex justify-between text-left h-10!">
        <SelectValue placeholder="Assign to" className="h-10" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Assign to</SelectLabel>
          <SelectItem value="none" className="h-12">
            <p className="text-base">... None</p>
          </SelectItem>
          {/* {data.map((item) => (
              <SelectItem key={item.email} value={item.email}>
                <UserCard data={item} size={"sm"} />
              </SelectItem>
            ))} */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
