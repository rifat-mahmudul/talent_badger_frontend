"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FolderOpen,
  ImageIcon,
  LogOut,
  User2,
  Award,
  ClipboardList,
  LayoutPanelLeft,
  Settings,
} from "lucide-react";
import Image from "next/image";


const navigation = [
  { name: "Dashboard Overview", href: "/account", icon: LayoutPanelLeft },
  { name: "User Management", href: "/account/user-management", icon: User2 },
  { name: "Team & Badge Approvals", href: "/dashboard/team-badge", icon: Award },
  { name: "Services", href: "/dashboard/services", icon: ClipboardList },
  { name: "Industries", href: "/dashboard/industries", icon: FolderOpen },
  { name: "Blog & FAQ CMS", href: "/dashboard/blog", icon: ImageIcon },
  { name: "Settings", href: "/account/setting", icon: Settings },

];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-[350px] bg-card border-r border-border h-screen">
      <div className="px-6">
        <Image src="/logo.png" alt="logo" width={700} height={700} />
      </div>
      <div className="flex items-center justify-center mb-10">
        <Image src="/profile.jpg" alt="logo" width={700} height={700} className="w-20 h-20 rounded-full" />
      </div>
      <nav className="flex-1 scrollbar-none px-4 space-y-[24px] overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-2 py-3 text-[16px] font-medium rounded-md transition-colors",
                isActive
                  ? "bg-[#00383B] text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="mr-3 h-6 w-6" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <button
        className="flex items-center px-3 py-2 m-4 text-sm font-medium rounded-md text-[#E5102E] hover:text-[#E5102E] hover:bg-muted transition-colors"
        type="button"
      >
        <LogOut className="mr-3 h-4 w-4" />
        Logout
      </button>
    </div>
  );
}