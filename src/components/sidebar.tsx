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
  Folder,
  BookAudio,
  Users,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DashboardSidebar({ isCollapsed }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const { data: session, status } = useSession();
  const role = (session?.user as { role?: string } | undefined)?.role;
  const isLoading = status === "loading";

  const getNavigation = () => {
    if (isLoading) {
      return [];
    }

    const userRoutes = [
      { name: "Client Dashboard", href: "/account", icon: LayoutPanelLeft },
      { name: "My Team", href: "/account/my-team", icon: User2 },
      { name: "Call Booking", href: "/account/call-booking", icon: PhoneCall },
      { name: "Settings", href: "/account/setting", icon: Settings },
    ];

    const engineerRoutes = [
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
      {
        name: "Manager",
        href: "/engineer/manager",
        icon: Users,
      },
      {
        name: "Payment History",
        href: "/engineer/settings/payment-history",
        icon: CreditCard,
      },
      {
        name: "Call Booking",
        href: "/engineer/settings/call-booking",
        icon: PhoneCall,
      },
      { name: "Settings", href: "/engineer/settings", icon: Settings },
    ];

    // Default to user routes if role is not defined
    if (!role) return userRoutes;

    // Return routes based on role
    switch (role) {
      case "engineer":
        return engineerRoutes;
      case "user":
      case "client":
        return userRoutes;
      default:
        return userRoutes;
    }
  };

  const navigation = getNavigation();

  // Show loading state
  if (isLoading) {
    return (
      <>
        {/* Mobile Toggle Skeleton */}
        <div className="fixed top-4 left-4 z-50 flex items-center lg:hidden">
          <Skeleton className="h-9 w-9 rounded-md bg-muted" />
        </div>

        {/* Sidebar Loading Skeleton */}
        <aside
          className={cn(
            "fixed top-0 left-0 h-full bg-card border-r border-border transform transition-all duration-300 ease-in-out z-40 flex flex-col",
            isCollapsed ? "w-[80px]" : "w-[260px] md:w-[300px] lg:w-[260px]",
            "-translate-x-full lg:translate-x-0"
          )}
        >
          {/* Logo Skeleton */}
          <div className="p-4">
            <Skeleton
              className={cn(
                "h-[80px] rounded-md bg-muted",
                isCollapsed ? "w-12 mx-auto" : "w-48 mx-auto"
              )}
            />
          </div>

          {/* Navigation Items Skeleton */}
          <nav className="flex-1 px-3 py-4 space-y-3">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center rounded-md transition-colors",
                  isCollapsed ? "justify-center px-2" : "px-3"
                )}
              >
                <Skeleton className="h-5 w-5 rounded-sm bg-muted shrink-0" />
                {!isCollapsed && (
                  <Skeleton className="ml-3 h-10 flex-1 bg-muted rounded-sm" />
                )}
              </div>
            ))}
          </nav>

          {/* Logout Button Skeleton */}
          <div className={cn("m-4", isCollapsed ? "flex justify-center" : "")}>
            <div
              className={cn(
                "flex items-center rounded-md",
                isCollapsed ? "justify-center px-2" : "px-3"
              )}
            >
              <Skeleton className="h-4 w-4 rounded-sm bg-muted" />
              {!isCollapsed && (
                <Skeleton className="ml-3 h-4 w-16 bg-muted rounded-sm" />
              )}
            </div>
          </div>
        </aside>
      </>
    );
  }

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
          isCollapsed ? "w-[80px]" : "w-[260px] md:w-[300px] lg:w-[260px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div>
          <Link href={"/"}>
            <Image
              src="/logo.png"
              alt="logo"
              width={1000}
              height={1000}
              className="object-contain h-[120px] w-[220px] mx-auto"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 scrollbar-none px-2 space-y-[12px] overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href
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
          onClick={() => signOut({ callbackUrl: "/" })}
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
