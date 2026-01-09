"use client";
import {
  Activity,
  Calendar,
  Grid,
  Home,
  Inbox,
  Plus,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useOrganization, useOrganizationList, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { user } = useUser();

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
          pathname: `/activity/${org.organization.id}`,
          icon: <Activity />,
        },
        ,
        {
          title: "Settings",
          pathname: `/settings/${org.organization.id}`,
          icon: <Settings />,
        },
      ],
    };
  });

  return (
    <Sidebar className=" top-13 ">
      <SidebarContent className="h-50">
        <SidebarGroup>
          <div className="flex justify-between mb-2 p-2">
            <SidebarGroupLabel className="text-lg">
              Organizations
            </SidebarGroupLabel>
            <Button className="rounded-full size-8">
              <Plus />
            </Button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {organizationsData?.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <Accordion type="single" collapsible>
                    <AccordionItem value={item.name}>
                      <AccordionTrigger className="p-4 hover:bg-gray-700 cursor-pointer flex justify-between items-center">
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
                        {item.data.map((data) => (
                          <Link key={data?.title} href={data?.pathname || ""}>
                            <Button
                              className="w-full justify-start"
                              size={"lg"}
                              variant={"ghost"}
                              key={data?.title}
                            >
                              {data?.icon}
                              {data?.title}
                            </Button>
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
