"use client";
import { Activity, CreditCard, Grid, Plus, Settings } from "lucide-react";

import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
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

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const selectedPage = pathname.split("/").at(-1);
  const { user } = useUser();
  const { orgId: selectedOrgId } = useAuth();
  const { setActive } = useOrganizationList();

  const organizationsData = user?.organizationMemberships.map((org) => {
    return {
      id: org.organization.id,
      name: org.organization.name,
      image: org.organization.imageUrl,
      data: [
        {
          title: "Boards",
          pathname: `/dashboard/${org.organization.id}`,
          icon: <Grid />,
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
      ],
    };
  });

  async function handleSelectOrganization(orgId: string, pathname?: string) {
    if (setActive && pathname) {
      setActive({ organization: orgId });
      router.push(pathname);
    }
  }

  function handleAddNewOrganization() {
    router.push("/select-organization");
  }

  return (
    <SidebarContainer className=" top-13  ">
      <SidebarContent className="h-50 ">
        <SidebarGroup className="">
          <div className="flex justify-between mb-2 p-2">
            <SidebarGroupLabel className="text-lg">
              Organizations
            </SidebarGroupLabel>
            <Button
              title="New organization"
              className="rounded-full size-8"
              onClick={handleAddNewOrganization}
            >
              <Plus />
            </Button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {organizationsData?.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={selectedOrgId === item.id ? item.name : ""}
                  >
                    <AccordionItem value={item.name}>
                      <AccordionTrigger
                        className={cn(
                          selectedOrgId === item.id ? "bg-gray-800" : "bg-none",
                          "p-4 hover:bg-gray-900 cursor-pointer flex justify-between items-center",
                          "transition-all duration-200 ease-in-out"
                        )}
                      >
                        <div className="flex gap-2 items-center">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={30}
                              height={30}
                            />
                          )}
                          {item.name}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-8 pt-2 flex flex-col gap-1 ">
                        {item.data.map((data) => {
                          const currentPathname = data?.pathname
                            .split("/")
                            .at(-1);
                          return (
                            <Button
                              onClick={() =>
                                handleSelectOrganization(
                                  item.id,
                                  data?.pathname
                                )
                              }
                              className={cn(
                                selectedPage === currentPathname &&
                                  selectedOrgId === item.id
                                  ? "bg-gray-600"
                                  : "",
                                "w-full justify-start"
                              )}
                              size={"lg"}
                              variant={"ghost"}
                              key={data?.title}
                            >
                              {data?.icon}
                              {data?.title}
                            </Button>
                          );
                        })}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
}
