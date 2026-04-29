"use client";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("./Sidebar").then((m) => m.Sidebar), {
  ssr: false,
});

export function SidebarClient() {
  return (
    <div className="md:block lg:left-0 lg:fixed z-50">
      <Sidebar />
    </div>
  );
}
