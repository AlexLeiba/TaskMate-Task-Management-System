import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import React from "react";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1  py-10  max-w-4xl px-4 mx-auto w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default PublicLayout;
