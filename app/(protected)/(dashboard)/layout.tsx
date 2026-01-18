import { FooterDashboard } from "@/components/layout/Protected/Footer/FooterDashboard";
import { HeaderDashboard } from "@/components/layout/Protected/Header/HeaderDashboard";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";

import React from "react";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toasterId="default"
          //           toastOptions={{
          //
          //             className: "",
          //             duration: 5000,
          //             removeDelay: 1000,
          //             style: {
          //               background: "#363636",
          //               color: "#fff",
          //             },
          //
          //
          //             success: {
          //               duration: 3000,
          //               iconTheme: {
          //                 primary: "green",
          //                 secondary: "black",
          //               },
          //             },
          //           }}
        />
        <Sidebar />

        <div className="min-h-screen flex flex-col w-full">
          <HeaderDashboard />
          <main className="flex flex-1  py-18  max-w-7xl px-4 mx-auto w-full">
            {children}
          </main>
          <FooterDashboard />
        </div>
      </SidebarProvider>
    </>
  );
}

export default ProtectedLayout;
