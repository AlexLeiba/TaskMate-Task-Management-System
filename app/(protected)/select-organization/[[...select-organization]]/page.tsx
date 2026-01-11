import { OrganizationList } from "@clerk/nextjs";

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
