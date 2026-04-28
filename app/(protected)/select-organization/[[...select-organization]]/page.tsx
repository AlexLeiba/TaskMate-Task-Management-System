"use client";
import { useSession } from "@/hooks/useSession";
import { STRIPE_PRODUCT_NAME } from "@/lib/consts/consts";
import { useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const OrganizationList = dynamic(
  () => import("@clerk/nextjs").then((m) => m.OrganizationList),
  { ssr: false, loading: () => <p>Loading...</p> },
);

function SelectOrganizationPage() {
  const { user } = useUser();
  const organizationsDataCount = user?.organizationMemberships.length;
  const route = useRouter();

  const session = useSession();

  useEffect(() => {
    if (!session.data?.isActiveSubscription) {
      route.push("/");
      return;
    }

    if (
      session.data?.isActiveSubscription &&
      session.data?.planName === STRIPE_PRODUCT_NAME.Silver &&
      (organizationsDataCount || 0) >= 3
    ) {
      route.push("/");
      return;
    }
  }, [session.data, organizationsDataCount, route]);
  return (
    <div
      className="flex justify-center items-center w-full"
      data-test="select-organization-page"
    >
      <OrganizationList
        hidePersonal={true}
        afterSelectOrganizationUrl={"/dashboard/:id"}
        afterCreateOrganizationUrl={"/dashboard/:id"}
      />
    </div>
  );
}

export default SelectOrganizationPage;
