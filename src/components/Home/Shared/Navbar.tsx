"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Users } from "lucide-react";
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
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { data: session, status } = useSession();
  const pathname = usePathname();
  const role = (session?.user as { role: string })?.role;
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
    <nav className="bg-[#DDFFFF] sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="flex flex-col">
              {/* <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#0F595A] to-[#0F595A] text-transparent bg-clip-text">
                Talent Badger
              </h1> */}
              <Image
                src="/images/newLogo-1.png"
                alt="Talent Badger"
                width={900}
                height={900}
                className="w-52 h-14 object-contain"
              />
              <span className="hidden sm:block text-[10px] font-medium text-[#0F595A] -mt-1">
                On-Demand Engineering Pods & Specialists
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Only visible on xl+ */}
          <div className="hidden xl:flex flex-1 justify-center  px-8">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-[16px] font-medium transition-colors hover:text-[#147575]/80 border-b-2 border-transparent pb-1",
                      isActive && "text-[#147575] font-semibold border-[#147575]"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Section: Favorites + CTA + Auth */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Favorites Heart */}
            <Link href="/favourites" className="relative p-2 -m-2">
              <Users className="w-6 h-6 text-[#147575]" />
              {mounted && team?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#147575] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {team.length}
                </span>
              )}
            </Link>

            {/* Desktop CTA Button */}
            <Link href="/build-your-team" className="hidden sm:block">
              <Button
                variant="outline"
                className="border-[#00383B] text-[#00383B] hover:bg-[#00383B]/5 text-sm lg:text-base whitespace-nowrap"
              >
                Start a Project
              </Button>
            </Link>

            {/* Auth: Login or Avatar Dropdown */}
            {status !== "authenticated" ? (
              <Button
                onClick={() => setLoginOpen(true)}
                className="bg-[#00383B] hover:bg-[#00383B]/90 text-white text-xs sm md px-3 py-1 sm sm"
              >
                Log In
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-1 rounded-full">
                    <Avatar className="w-9 h-9">
                      {session.user?.profileImage ? (
                        <AvatarImage src={session?.user?.profileImage} />
                      ) : (
                        <AvatarFallback className="bg-[#0F595A]/20">
                          <User className="w-5 h-5 text-[#0F595A]" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href={role === "engineer" ? "/engineer" : "/account"}>
                      {role === "engineer" ? "Engineer Dashboard" : "My Account"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={role === "engineer" ? "/engineer/settings" : "/account/settings"}>
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-red-600 focus:text-red-600"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-[#0F595A] lg:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden border-t border-[#0F595A]/10">
          <div className="px-4 py-4 space-y-3 bg-[#DDFFFF]/95 backdrop-blur">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-4 py-3 text-base font-medium rounded-lg transition",
                  pathname === item.href
                    ? "bg-[#0F595A]/10 text-[#0F595A] font-semibold"
                    : "text-[#147575] hover:bg-[#0F595A]/5"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-[#0F595A]/10">
              <Link href="/build-your-team" className="block w-full">
                <Button
                  variant="outline"
                  className="w-full border-[#00383B] text-[#00383B]"
                  onClick={() => setIsOpen(false)}
                >
                  Start a Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </nav>
  );
}