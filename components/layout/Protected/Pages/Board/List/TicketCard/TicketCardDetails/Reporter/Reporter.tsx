import { Spacer } from "@/components/ui/spacer";
import { UserCog } from "lucide-react";
import { UserCard } from "../../../../../../UserCard/UserCard";
import { User } from "@/lib/generated/prisma/client";

type Props = {
  data: User | undefined;
};
export function Reporter({ data }: Props) {
  return (
    <div>
      <div className="flex gap-2 items-center">
        <UserCog />
        <p className="text-xl font-medium">Reporter</p>
      </div>
      <Spacer size={4} />
      <UserCard data={data} size={"sm"} />
    </div>
  );
}
