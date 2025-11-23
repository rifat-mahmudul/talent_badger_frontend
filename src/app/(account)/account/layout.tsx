"use client";
import { DashboardSidebar } from "@/components/sidebar";
import React, { useState } from "react";
import { Header } from "./_components/Headers";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Header */}
      <Header isCollapsed={isCollapsed} />

      {/* Sidebar + Main Content */}
      <div className="flex min-h-screen bg-[#EDEEF1]">
        <DashboardSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        {/* Main content */}
        <div
          className={`
            flex-1
            mt-[80px]
            p-6
            transition-all
            duration-300
            bg-[#EDEEF1]
            ${isCollapsed ? "lg:ml-[80px]" : "lg:ml-[260px]"}
            md:ml-[300px]
          `}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
