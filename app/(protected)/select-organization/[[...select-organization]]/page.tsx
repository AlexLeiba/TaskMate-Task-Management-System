"use client";
import dynamic from "next/dynamic";

const OrganizationList = dynamic(
  () => import("@clerk/nextjs").then((m) => m.OrganizationList),
  { ssr: false, loading: () => <p>Loading...</p> },
);

function SelectOrganizationPage() {
  return (
    <div className="flex justify-center items-center w-full">
      <OrganizationList
        hidePersonal={true}
        afterSelectOrganizationUrl={"/dashboard/:id"}
        afterCreateOrganizationUrl={"/dashboard/:id"}
      />
    </div>
  );
}

export default SelectOrganizationPage;
