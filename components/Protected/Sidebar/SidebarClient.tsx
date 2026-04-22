"use client";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("./Sidebar").then((m) => m.Sidebar), {
  ssr: false,
});

export function SidebarClient() {
  return <Sidebar />;
}
