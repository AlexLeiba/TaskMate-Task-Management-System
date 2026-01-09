import { OrganizationList } from "@clerk/nextjs";

function SelectOrganizationPage() {
  return (
    <div className="flex justify-center items-center w-full">
      <OrganizationList
        hidePersonal={true}
        afterSelectOrganizationUrl={"/dashboard"}
        afterCreateOrganizationUrl={"/dashboard"}
      />
    </div>
  );
}

export default SelectOrganizationPage;
