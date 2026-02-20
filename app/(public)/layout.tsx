import { FooterLanding } from "@/components/layout/Public/Footer/FooterLanding";
import { HeaderLanding } from "@/components/layout/Public/Header/HeaderLanding";
import React from "react";

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
