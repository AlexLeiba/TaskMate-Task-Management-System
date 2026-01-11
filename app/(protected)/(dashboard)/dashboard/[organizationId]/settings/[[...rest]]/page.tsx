import { OrganizationSettings } from "@/components/layout/Protected/Pages/Settings/OrganizationSettings";
import { Separator } from "@/components/ui/separator";

import { Settings } from "lucide-react";

function SettingsPage() {
  return (
    <div className="w-full ">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-medium">Settings</h1>
        <Settings />
      </div>
      <Separator className="bg-gray-600 w-full my-4" />

      <OrganizationSettings />
    </div>
  );
}

export default SettingsPage;
