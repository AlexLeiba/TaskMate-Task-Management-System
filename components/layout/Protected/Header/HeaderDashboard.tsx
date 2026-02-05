"use client";

import { Logo } from "../../Logo/Logo";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { UserProfileSkeleton } from "./UserProfileSkeleton";
import { OrganizationSwitchSkeleton } from "./OrganizationSwitchSkeleton";

const OrganizationSwitcher = dynamic(
  () => import("@clerk/nextjs").then((m) => m.OrganizationSwitcher),
  { ssr: false, loading: () => <OrganizationSwitchSkeleton /> },
);

const UserButton = dynamic(
  () => import("@clerk/nextjs").then((m) => m.UserButton),
  { ssr: false, loading: () => <UserProfileSkeleton /> },
);

type Props = {
  type?: "dashboard" | "board";
};
export function HeaderDashboard({ type = "dashboard" }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background-element z-50  ">
      <div
        className={cn(
          type === "dashboard" ? "max-w-7xl" : "max-w-400",
          " py-3 mx-auto px-4",
        )}
      >
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            {type === "dashboard" && <SidebarTrigger title="Sidebar" />}
            <Logo />
          </div>

          {/* <Links /> */}
          <div className="flex gap-2">
            <Button size={"sm"} title="Create new board" variant={"secondary"}>
              Create
            </Button>

            <OrganizationSwitcher
              afterLeaveOrganizationUrl="/select-organization"
              afterCreateOrganizationUrl="/dashboard/:id"
              afterSelectOrganizationUrl={"/dashboard/:id"}
              appearance={{
                variables: {
                  colorBackground: "oklch(30.919% 0.00004 271.152)", // dark background
                  colorText: "oklch(91.817% 0.00323 15.438)",
                  colorInputBackground: "oklch(30.919% 0.00004 271.152)",
                  colorInputText: "oklch(91.817% 0.00323 15.438)",
                },

                elements: {
                  organizationSwitcherTrigger: " !text-white",
                  organizationSwitcherPopoverCard: " ",
                  organizationSwitcherPopoverActionButton:
                    "!text-white hover:opacity-70",
                  organizationPreviewTextContainer: "text-white",
                  organizationSwitcherButton: " text-white",
                },
              }}
            />

            <UserButton
              appearance={{
                variables: {
                  colorBackground: "oklch(30.919% 0.00004 271.152)", // dark background
                  colorText: "oklch(91.817% 0.00323 15.438)",
                  colorInputBackground: " oklch(30.919% 0.00004 271.152)",
                  colorInputText: "oklch(91.817% 0.00323 15.438)",
                },

                elements: {
                  userButtonPopoverActionButton:
                    " !text-white hover:opacity-70",
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
