"use client";

import { useOrganization } from "@clerk/nextjs";
import { CreditCard, Crown } from "lucide-react";
import Image from "next/image";
import { OrganizationCardSkeleton } from "./Boards/OrganizationCardSkeleton";
import { useRole } from "@/hooks/useRole";
import { USER_ROLES } from "@/lib/consts";

export function OrgDetails() {
  const role = useRole();
  const { organization } = useOrganization();

  const orgDetails = {
    name: organization?.name,
    imageUrl: organization?.imageUrl,
  };

  if (!organization) return <OrganizationCardSkeleton />;
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 rounded-md bg-gray-800 relative">
        {orgDetails.imageUrl && (
          <Image
            src={orgDetails.imageUrl}
            alt={"Organization Logo"}
            width={35}
            height={35}
            className="size-10 rounded-sm"
          />
        )}

        {role === USER_ROLES.admin && (
          <div
            className="absolute -top-2 -right-2 text-primary"
            title="Admin"
            aria-label="Admin"
          >
            <Crown size={15} />
          </div>
        )}
      </div>
      <div className="flex flex-col ">
        <p className="text-xl font-medium">{orgDetails.name}</p>
        <div className="flex gap-1 items-center">
          <CreditCard size={15} />
          <p className="text-xs">Free</p>
        </div>
      </div>
    </div>
  );
}
