"use client";
import {
  Activity,
  Bell,
  ChartColumn,
  CreditCard,
  Crown,
  LayoutDashboard,
  Plus,
  Settings,
} from "lucide-react";

import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { useAuth, useOrganizationList, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { SidebarSkeleton } from "./SidebarSkeleton";
import { USER_ROLES } from "@/lib/consts/consts";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUnreadNotificationsAction } from "@/app/actions/notifications";
import { QUERY_KEYS } from "@/lib/query-mutation-keys/keys";
import { NotificationIndicator } from "../Pages/Notifications/NotificationIndicator";

export function Sidebar() {
  const [expandedOrg, setExpandedOrg] = useState<string | null>(null);
  const { setOpenMobile } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const selectedSidebarPage = pathname.split("/").at(-1);

  const { user } = useUser();
  const { orgId: selectedOrgId } = useAuth();
  const { setActive } = useOrganizationList();

  function handleExpandCollapseAccordion(item: string) {
    setExpandedOrg((prev) => (prev === item ? null : item));
  }

  const { data: unreadNotifications } = useQuery({
    queryKey: [QUERY_KEYS.pages.notifications.getUnreadNotifications],
    queryFn: getUnreadNotificationsAction,
    refetchOnWindowFocus: true,
    gcTime: 1000 * 60 * 30,
    staleTime: 1000 * 60 * 30,
  });

  const organizationsData = user?.organizationMemberships.map((org) => {
    const organizationRole = org.role?.replace("org:", "") === USER_ROLES.admin;

    return {
      id: org.organization.id,
      name: org.organization.name,
      image: org.organization.imageUrl,
      role: organizationRole,
      data: [
        {
          title: "Boards",
          pathname: `/dashboard/${org.organization.id}`,
          icon: <LayoutDashboard />,
        },
        {
          title: "Activity",
          pathname: `/dashboard/${org.organization.id}/activity`,
          icon: <Activity />,
        },
        ,
        {
          title: "Settings",
          pathname: `/dashboard/${org.organization.id}/settings`,
          icon: <Settings />,
        },
        {
          title: "Billings",
          pathname: `/dashboard/${org.organization.id}/billings`,
          icon: <CreditCard />,
        },
        {
          title: "Overview",
          pathname: `/dashboard/${org.organization.id}/overview`,
          icon: <ChartColumn />,
        },
        {
          title: "Notifications",
          pathname: `/dashboard/${org.organization.id}/notifications`,
          icon: <Bell />,
        },
      ],
    };
  });

  async function handleSelectOrganization(orgId: string, pathname?: string) {
    setOpenMobile(false);
    if (setActive && pathname) {
      setActive({ organization: orgId });
      router.push(pathname);
    }
  }

  function handleAddNewOrganization() {
    router.push("/select-organization");
    setOpenMobile(false);
  }

  return (
    <SidebarContainer className="top-13">
      <SidebarContent className="h-50 " data-test="sidebar-content">
        <SidebarGroup>
          <div className="flex justify-between mb-2 p-2">
            <SidebarGroupLabel className="text-lg">
              Organizations
            </SidebarGroupLabel>
            <Button
              data-test="add-new-organization-button"
              variant={"secondary"}
              aria-label="Add New organization"
              title="Add New organization"
              // className="rounded-full size-8"
              onClick={handleAddNewOrganization}
            >
              <Plus />
            </Button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {organizationsData && organizationsData.length > 0 ? (
                organizationsData?.map((item) => (
                  <SidebarMenuItem key={item.id} data-test="sidebar-menu-items">
                    <Accordion
                      data-test="sidebar-accordion"
                      type="single"
                      collapsible
                      defaultValue={selectedOrgId === item.id ? item.name : ""}
                      value={
                        expandedOrg === item.name || selectedOrgId === item.id
                          ? item.name
                          : ""
                      }
                    >
                      <AccordionItem value={item.name}>
                        <AccordionTrigger
                          data-test="sidebar-accordion-trigger"
                          onClick={() =>
                            handleExpandCollapseAccordion(item.name)
                          }
                          title={item.name}
                          aria-label={item.name}
                          className={cn(
                            selectedOrgId === item.id
                              ? "bg-foreground/90"
                              : "bg-none",
                            "p-4 hover:bg-foreground/50 cursor-pointer flex justify-between items-center",
                            "transition-all duration-200 ease-in-out",
                          )}
                        >
                          <div className="flex gap-2 items-center relative">
                            {item.image && (
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={30}
                                height={30}
                                className="size-8 rounded-sm"
                              />
                            )}
                            {item.name}
                          </div>
                          {item.role && (
                            <div className="absolute top-0 right-0 text-primary">
                              <Crown size={15} />
                            </div>
                          )}
                        </AccordionTrigger>
                        <AccordionContent
                          className=" pt-2 flex flex-col gap-1 "
                          data-test="sidebar-accordion-content"
                        >
                          {item.data.map((data) => {
                            const currentPathname = data?.pathname
                              .split("/")
                              .at(-1);

                            return (
                              <Button
                                data-test="sidebar-accordion-content-nav-buttons"
                                title={`${item.name} - ${data?.title}`}
                                aria-label={`${item.name} - ${data?.title}`}
                                onClick={() =>
                                  handleSelectOrganization(
                                    item.id,
                                    data?.pathname,
                                  )
                                }
                                className={cn(
                                  selectedSidebarPage === currentPathname &&
                                    selectedOrgId === item.id
                                    ? "bg-foreground/80"
                                    : "",
                                  "w-full justify-start",
                                )}
                                size={"lg"}
                                variant={"ghost"}
                                key={data?.title}
                              >
                                <div className="flex gap-2 items-center text-text-primary">
                                  {data?.icon}
                                  {data?.title}
                                  {data?.title === "Notifications" &&
                                    unreadNotifications?.data !== undefined &&
                                    unreadNotifications?.data > 0 && (
                                      <NotificationIndicator>
                                        {unreadNotifications.data}
                                      </NotificationIndicator>
                                    )}
                                </div>
                              </Button>
                            );
                          })}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </SidebarMenuItem>
                ))
              ) : (
                <SidebarSkeleton />
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
}
