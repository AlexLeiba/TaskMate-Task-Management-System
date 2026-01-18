import { Spacer } from "@/components/ui/spacer";
import { AssignedToType } from "@/lib/types";
import { UserPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserCard } from "./UserCard";

type Props = {
  data: AssignedToType[] | undefined;
};
export function AssignTo({ data }: Props) {
  function handleAssignTo(email: string) {
    console.log("🚀 ~ handleAssignTo ~ email:", email);
  }
  if (!data) return null;
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <UserPlus />
        <p className="text-xl font-medium">Assign to</p>
      </div>

      <Spacer size={4} />

      <Select onValueChange={(v) => handleAssignTo(v)}>
        <SelectTrigger className="w-full flex justify-between text-left h-14!">
          <SelectValue placeholder="Assign to" className="h-10" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Assign to</SelectLabel>
            <SelectItem value="none" className="h-12">
              <p className="text-base">No assigned</p>
            </SelectItem>
            {data.map((item) => (
              <SelectItem key={item.email} value={item.email}>
                <UserCard data={item} size={"sm"} />
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
