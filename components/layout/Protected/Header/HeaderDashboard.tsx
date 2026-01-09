import {
  OrganizationList,
  OrganizationProfile,
  OrganizationSwitcher,
  UserButton,
} from "@clerk/nextjs";
import { Logo } from "../../Logo/Logo";
import { Button } from "@/components/ui/button";

export function HeaderDashboard() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-400 z-50">
      <div className="max-w-4xl px-4 py-2 mx-auto">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Logo />
            <Button>Create</Button>
          </div>

          {/* <Links /> */}
          <div className="flex gap-2">
            <OrganizationSwitcher
              afterLeaveOrganizationUrl="/dashboard"
              afterCreateOrganizationUrl="/dashboard"
              afterSelectOrganizationUrl={"/dashboard/:id"}
              afterSelectPersonalUrl={"/dashboard/:id"}
            />

            <UserButton
              appearance={{
                elements: {
                  avatarBox: {},
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
