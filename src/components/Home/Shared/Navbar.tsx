
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LoginModal from "@/components/auth/LoginModal";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTeamStore } from "@/store/teamStore";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const session = useSession();
  const pathname = usePathname();
  const role = (session.data?.user as { role: string })?.role;

  const team = useTeamStore((state) => state.team);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "For Companies", href: "/services" },
    { name: "For Engineers", href: "/build-your-team" },
    { name: "Industries", href: "/industries" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contactus" },
    { name: "FAQ’S", href: "/faqs" },
  ];

  return (
    <nav className="bg-[#DDFFFF] py-2 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap md:flex-nowrap">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex flex-col items-start py-2">
            {/* Talent Badger Logo */}
            <div className="flex items-center gap-2">
              <h5
                className="
                text-3xl 
                font-extrabold 
                bg-gradient-to-r 
                from-[#0F595A] 
                to-[#0F595A] 
                text-transparent 
                bg-clip-text
                select-none
              "
              >
                Talent Badger
              </h5>
            </div>

            {/* Tagline */}
            <span className="text-[10px] font-medium text-[#0F595A] leading-none mt-1">
              On-Demand Engineering Pods & Specialists
            </span>
          </Link>

          {/* Desktop Navigation (xl screens only) */}
          <div className="hidden xl:flex flex-1 justify-center">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-[16px] font-normal transition-colors duration-200 border-b-2",
                      isActive
                        ? "text-[#147575] border-[#147575] font-semibold"
                        : "text-[#147575] border-transparent hover:text-[#147575]/80"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Section: Heart, CTA, Avatar */}
          <div className="flex items-center space-x-4">
            {/* Heart Icon */}
            <div>
              {/* Heart Icon - Go to favourites page */}
              <Link href="/favourites" className="relative cursor-pointer">
                <Users className="w-6 h-6 text-[#147575]" />

                {mounted && team?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#147575] text-white w-5 h-5 text-xs flex items-center justify-center rounded-full">
                    {team?.length}
                  </span>
                )}
              </Link>
            </div>

            {/* Start Project Button (desktop only xl) */}
            <Link href="/build-your-team" className="hidden xl:block">
              <Button
                variant="outline"
                className="border border-[#00383B] text-[#00383B] hover:bg-transparent text-[16px]"
              >
                Start a Project
              </Button>
            </Link>

            {/* Login / Avatar */}
            {session.status !== "authenticated" ? (
              <Button
                onClick={() => setLoginOpen(true)}
                className="bg-[#00383B] hover:bg-[#00383B]/80 text-[16px] text-[#F8F9FA]"
              >
                Log In
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="p-0 border-none hover:bg-inherit gap-1"
                  >
                    <Avatar className="w-10 h-10">
                      {session.data.user?.profileImage ? (
                        <AvatarImage src={session.data.user.profileImage} />
                      ) : (
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link
                      href={
                        role === "engineer"
                          ? "/engineer"
                          : "/account"
                      }
                    >
                      {role === "engineer" ? "Engineer Dashboard" : "User Dashboard"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={
                        role === "engineer"
                          ? "/engineer/settings"
                          : "/account/settings"
                      }
                    >
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-500"
                    onClick={() => signOut()}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Button */}
            <div className="xl:hidden ml-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-cyan-400"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (laptop + mobile) */}
      {isOpen && (
        <div className="xl:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#DDFFFF]">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-3 py-2 text-base font-medium rounded-md",
                  pathname === item.href
                    ? "text-[#147575] font-semibold"
                    : "text-[#147575] hover:text-[#147575]/80"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile CTA & Avatar */}
            <div className="mt-3 space-y-2">
              <Link href="/build-your-team">
                <Button
                  variant="outline"
                  className="border border-[#00383B] text-[#00383B] w-full text-[16px]"
                >
                  Start a Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal onOpenChange={setLoginOpen} open={loginOpen} />
    </nav>
  );
}