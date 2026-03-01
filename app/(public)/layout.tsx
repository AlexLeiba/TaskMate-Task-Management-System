import { FooterLanding } from "@/components/layout/Public/Footer/FooterLanding";
import { HeaderLanding } from "@/components/layout/Public/Header/HeaderLanding";
import React from "react";

export const metadata = {
  title: "TaskMate",
  description:
    "TaskMate is a friendly task management system which can simplify and boost your productivity.",
  openGraph: {
    title: "TaskMate",
    description:
      "TaskMate is a friendly task management system which can simplify and boost your productivity.",
  },
};

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderLanding />
      <main className="flex flex-1  py-15.25  w-full">{children}</main>
      <FooterLanding />
    </div>
  );
}

export default PublicLayout;
