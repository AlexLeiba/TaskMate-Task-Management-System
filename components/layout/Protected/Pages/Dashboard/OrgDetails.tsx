"use client";

import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import { OrganizationCardSkeleton } from "./Boards/OrganizationCardSkeleton";

export function OrgDetails() {
  const { organization } = useOrganization();
  const orgDetails = {
    name: organization?.name,
    imageUrl: organization?.imageUrl,
  };

  if (!organization) return <OrganizationCardSkeleton />;
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 rounded-md bg-gray-800">
        {orgDetails.imageUrl && (
          <Image
            src={orgDetails.imageUrl}
            alt={"Organization Logo"}
            width={35}
            height={35}
          />
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
