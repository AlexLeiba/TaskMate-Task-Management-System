"use client";

import { Logo } from "../../Logo/Logo";
import { Button } from "@/components/ui/button";

import dynamic from "next/dynamic";
import { SidebarTrigger } from "@/components/ui/sidebar";
const OrganizationSwitcher = dynamic(
  () => import("@clerk/nextjs").then((m) => m.OrganizationSwitcher),
  { ssr: false }
);

const UserButton = dynamic(
  () => import("@clerk/nextjs").then((m) => m.UserButton),
  { ssr: false }
);

type Props = {
  type?: "dashboard" | "board";
};
export function HeaderDashboard({ type = "dashboard" }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-400 z-50 px-4 ">
      <div className="max-w-4xl py-2 mx-auto">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            {type === "dashboard" && <SidebarTrigger title="Sidebar" />}
            <Logo />
          </div>

          {/* <Links /> */}
          <div className="flex gap-2">
            <Button title="Create new board">Create</Button>
            <OrganizationSwitcher
              afterLeaveOrganizationUrl="/select-organization"
              afterCreateOrganizationUrl="/dashboard/:id"
              afterSelectOrganizationUrl={"/dashboard/:id"}
              appearance={{
                elements: {
                  rootBox: {},
                },
              }}
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
