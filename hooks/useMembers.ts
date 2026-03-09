import { useOrganization } from "@clerk/nextjs";
import { OrganizationMembershipPublicUserData } from "@clerk/nextjs/server";
import { useEffect, useState } from "react";

export function useMembers() {
  const [members, setMembers] = useState<
    OrganizationMembershipPublicUserData[] | undefined[]
  >([]);

  const { membership } = useOrganization();

  const membersData = membership?.organization
    ?.getMemberships()
    .then((res) => res.data.map((member) => member.publicUserData));

  useEffect(() => {
    async function getMembersData() {
      const data = await membersData;
      if (data) {
        setMembers(data as unknown as OrganizationMembershipPublicUserData[]);
      }
    }

    getMembersData();
  }, [membersData]);

  return { members };
}
