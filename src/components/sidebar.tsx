"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LogOut,
  User2,
  PhoneCall,
  LayoutPanelLeft,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Folder,
  BookAudio,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const navigation = [
  { name: "Client Dashboard", href: "/account", icon: LayoutPanelLeft },
  { name: "My Team", href: "/account/my-team", icon: User2 },
  { name: "Call Booking", href: "/account/call-booking", icon: PhoneCall },
  { name: "Settings", href: "/account/setting", icon: Settings },
  { name: "Dashboard Overview", href: "/engineer", icon: LayoutPanelLeft },
  {
    name: "Project Management",
    href: "/engineer/project-management",
    icon: Folder,
  },
  {
    name: "Requests Management",
    href: "/engineer/requests-management",
    icon: BookAudio,
  },
];

interface DashboardSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DashboardSidebar({
  isCollapsed,
  setIsCollapsed,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <div className="fixed top-4 left-4 z-50 flex items-center lg:hidden">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-md bg-[#00383B] text-white focus:outline-none"
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-card border-r border-border transform transition-all duration-300 ease-in-out z-40 flex flex-col",
          isCollapsed ? "w-[80px]" : "w-[260px] md:w-[300px] lg:w-[380px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between px-4 py-4  border-border",
            isCollapsed ? "justify-center" : ""
          )}
        >
          {!isCollapsed && (
            <Image
              src="/logo.png"
              alt="logo"
              width={140}
              height={60}
              className="object-contain"
            />
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center p-2 rounded-md hover:bg-muted transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Profile */}
        <div
          className={cn(
            "flex flex-col items-center justify-center mt-6 mb-6 transition-all duration-300",
            isCollapsed ? "px-0" : "px-4"
          )}
        >
          <Image
            src="/profile.jpg"
            alt="profile"
            width={80}
            height={80}
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 scrollbar-none px-2 space-y-[12px] overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center px-3 py-3 text-[15px] font-medium rounded-md transition-colors group",
                  isActive
                    ? "bg-[#00383B] text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 shrink-0",
                    !isCollapsed ? "mr-3" : "mx-auto"
                  )}
                />
                {!isCollapsed && <span>{item.name}</span>}
                {isCollapsed && (
                  <span className="absolute left-[70px] bg-card border border-border text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 shadow-md transition-opacity duration-200">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          className={cn(
            "flex items-center px-3 py-3 m-4 text-sm font-medium rounded-md text-[#E5102E] hover:text-[#E5102E] hover:bg-muted transition-colors",
            isCollapsed ? "justify-center" : ""
          )}
          type="button"
        >
          <LogOut className={cn("h-4 w-4", !isCollapsed ? "mr-3" : "")} />
          {!isCollapsed && "Logout"}
        </button>
      </aside>

      {/* Overlay for Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
