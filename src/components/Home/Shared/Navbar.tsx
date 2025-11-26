// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Menu, X, ChevronDown, User, Heart } from "lucide-react";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import LoginModal from "@/components/auth/LoginModal";
// import { useSession, signOut } from "next-auth/react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useTeamStore } from "@/store/teamStore";

// export function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loginOpen, setLoginOpen] = useState(false);

//   const session = useSession();
//   const pathname = usePathname();
//   const role = (session.data?.user as { role: string })?.role;
//   console.log("Role:", role);

//   const team = useTeamStore((state) => state.team);
//   const removeMember = useTeamStore((state) => state.removeMember);

//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "Services", href: "/services" },
//     { name: "Pick your team", href: "/build-your-team" },
//     { name: "Industries", href: "/industries" },
//     { name: "Blog", href: "/blog" },
//     { name: "Contact Us", href: "/contactus" },
//     { name: "FAQ’S", href: "/faqs" },
//   ];

//   return (
//     <nav className="bg-[#DDFFFF] py-2 sticky top-0 z-50">
//       <div className="container mx-auto">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="flex-shrink-0 md:-ml-[50px] -ml-6">
//             <Image src="/logo.png" alt="Logo" width={250} height={150} />
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:block">
//             <div className="ml-10 flex items-baseline space-x-8">
//               {navItems.map((item) => {
//                 const isActive = pathname === item.href;
//                 return (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={cn(
//                       "px-3 py-2 text-[16px] font-normal transition-colors duration-200 border-b-2",
//                       isActive
//                         ? "text-[#147575] border-[#147575] font-semibold"
//                         : "text-[#147575] border-transparent hover:text-[#147575]/80"
//                     )}
//                   >
//                     {item.name}
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>

//           {/* heart icon start  */}
//           <div>
//             <DropdownMenu modal={false}>
//               <DropdownMenuTrigger asChild>
//                 <div className="cursor-pointer relative">
//                   <Heart className="w-6 h-6 text-[#147575]" />
//                   {team.length > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-[#147575] text-white w-5 h-5 text-xs flex items-center justify-center rounded-full">
//                       {team.length} {/* auto updates instantly */}
//                     </span>
//                   )}
//                 </div>
//               </DropdownMenuTrigger>

//               <DropdownMenuContent
//                 align="center"
//                 className="w-80 mt-4 p-4 max-h-96 overflow-y-auto"
//               >
//                 <h4 className="font-semibold mb-3 text-center">My Team ({team.length})</h4>

//                 {team.length === 0 && (
//                   <p className="text-sm font-medium text-gray-500 text-center">No members added yet.</p>
//                 )}

//                 {team.map((member) => (
//                   <div
//                     key={member._id}
//                     className="flex items-center justify-between mb-3 p-2 border-b rounded hover:bg-gray-50"
//                   >
//                     <div className="flex items-center gap-3">
//                       <Image
//                         src={member.profileImage || "/default-avatar.png"}
//                         alt={member.firstName}
//                         width={40}
//                         height={40}
//                         className="rounded-full object-cover"
//                       />
//                       <div>
//                         <p className="text-sm font-medium text-gray-800">
//                           {member.firstName} {member.lastName}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           Level: {member.level} | {member.rate}/hr
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => removeMember(member._id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>

//           {/* heart icon end  */}

//           {/* Desktop CTA & Avatar */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link href="/build-your-team">
//               <Button
//                 variant="outline"
//                 className="border border-[#00383B] bg-transparent text-[16px] text-[#00383B] hover:bg-transparent"
//               >
//                 Start My Project
//               </Button>
//             </Link>

//             {session.status !== "authenticated" ? (
//               <>
//                 <Button
//                   onClick={() => setLoginOpen(true)}
//                   className="bg-[#00383B] hover:bg-[#00383B]/80 text-[16px] transition-all duration-300 text-[#F8F9FA]"
//                 >
//                   Log In
//                 </Button>
//                 <LoginModal onOpenChange={setLoginOpen} open={loginOpen} />
//               </>
//             ) : (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" className="p-0 border-none">
//                     <Avatar className="w-10 h-10">
//                       {session.data.user?.profileImage ? (
//                         <AvatarImage src={session.data.user.profileImage} />
//                       ) : (
//                         <AvatarFallback>
//                           <User />
//                         </AvatarFallback>
//                       )}
//                     </Avatar>
//                     <ChevronDown className="ml-1 w-4 h-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem>
//                     <Link
//                       href={
//                         role === "engineer"
//                           ? "/engineer/settings/profile"
//                           : "/account/settings/profile"
//                       }
//                     >
//                       Profile
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem>
//                     <Link
//                       href={
//                         role === "engineer"
//                           ? "/engineer/settings"
//                           : "/account/settings"
//                       }
//                     >
//                       Settings
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     className="cursor-pointer text-red-500"
//                     onClick={() => signOut()}
//                   >
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="lg:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400"
//             >
//               {isOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation Menu */}
//       {isOpen && (
//         <div className="lg:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#DDFFFF]">
//             {navItems.map((item) => {
//               const isActive = pathname === item.href;
//               return (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={cn(
//                     "block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-md",
//                     isActive
//                       ? "text-[#147575] border-[#147575] font-semibold"
//                       : "text-[#147575] border-transparent hover:text-[#147575]/80"
//                   )}
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               );
//             })}
//             <div className="pt-4 pb-3 border-t border-[#00383B]">
//               <div className="flex flex-col space-y-3 px-3">
//                 <Link href="/build-your-team">
//                   <Button
//                     variant="outline"
//                     className="border border-[#00383B] bg-transparent w-full text-[16px] text-[#00383B] hover:bg-transparent"
//                   >
//                     Start My Project
//                   </Button>
//                 </Link>
//                 {session.status !== "authenticated" ? (
//                   <Button
//                     className="text-[#F8F9FA] hover:bg-[#00383B]/80 bg-[#00383B] w-full"
//                     onClick={() => setLoginOpen(true)}
//                   >
//                     Log In
//                   </Button>
//                 ) : (
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         className="w-full justify-between"
//                       >
//                         <h2>Account</h2>
//                         <ChevronDown className="w-4 h-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent>
//                       <DropdownMenuItem>
//                         <Link href="/account/setting">Settings</Link>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         className="cursor-pointer text-red-500"
//                         onClick={() => signOut()}
//                       >
//                         Log Out
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
    { name: "Services", href: "/services" },
    { name: "Team", href: "/build-your-team" },
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
          <Link href="/" className="flex-shrink-0">
            <Image src="/logo.png" alt="Logo" width={180} height={60} />
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
                <Heart className="w-6 h-6 text-[#147575]" />

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
                Start My Project
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
                          ? "/engineer/settings/profile"
                          : "/account/settings/profile"
                      }
                    >
                      Profile
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
                  Start My Project
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

// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Menu, X, ChevronDown, User, Heart } from "lucide-react";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import LoginModal from "@/components/auth/LoginModal";
// import { useSession, signOut } from "next-auth/react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useTeamStore } from "@/store/teamStore";

// export function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loginOpen, setLoginOpen] = useState(false);

//   const [mounted, setMounted] = useState(false);

//   useEffect(() => setMounted(true), []);

//   const session = useSession();
//   const pathname = usePathname();
//   const role = (session.data?.user as { role: string })?.role;

//   const team = useTeamStore((state) => state.team);
//   const removeMember = useTeamStore((state) => state.removeMember);

//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "Services", href: "/services" },
//     { name: "Team", href: "/build-your-team" },
//     { name: "Industries", href: "/industries" },
//     { name: "Blog", href: "/blog" },
//     { name: "Contact", href: "/contactus" },
//     { name: "FAQ’S", href: "/faqs" },
//   ];

//   return (
//     <nav className="bg-[#DDFFFF] py-2 sticky top-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between flex-wrap md:flex-nowrap">
//           {/* Logo */}
//           <Link href="/" className="flex-shrink-0">
//             <Image src="/logo.png" alt="Logo" width={180} height={60} />
//           </Link>

//           {/* Desktop Navigation (xl screens only) */}
//           <div className="hidden xl:flex flex-1 justify-center">
//             <div className="flex items-center space-x-6">
//               {navItems.map((item) => {
//                 const isActive = pathname === item.href;
//                 return (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={cn(
//                       "px-3 py-2 text-[16px] font-normal transition-colors duration-200 border-b-2",
//                       isActive
//                         ? "text-[#147575] border-[#147575] font-semibold"
//                         : "text-[#147575] border-transparent hover:text-[#147575]/80"
//                     )}
//                   >
//                     {item.name}
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Right Section: Heart, CTA, Avatar */}
//           <div className="flex items-center space-x-4">
//             {/* Heart Icon */}
//             <DropdownMenu modal={false}>
//               <DropdownMenuTrigger asChild>
//                 <div className="cursor-pointer relative">
//                   <Heart className="w-6 h-6 text-[#147575]" />
//                   {mounted && team.length > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-[#147575] text-white w-5 h-5 text-xs flex items-center justify-center rounded-full">
//                       {team.length}
//                     </span>
//                   )}
//                 </div>
//               </DropdownMenuTrigger>

//               {mounted && (
//                 <DropdownMenuContent
//                   align="center"
//                   className="w-80 mt-4 p-4 max-h-96 overflow-y-auto"
//                 >
//                   <h4 className="font-semibold mb-3 text-center">
//                     My Team ({team.length})
//                   </h4>

//                   {team.length === 0 && (
//                     <p className="text-sm font-medium text-gray-500 text-center">
//                       No members added yet.
//                     </p>
//                   )}

//                   {team.map((member) => (
//                     <div
//                       key={member._id}
//                       className="flex items-center justify-between mb-3 p-2 border-b rounded hover:bg-gray-50"
//                     >
//                       <div className="flex items-center gap-3">
//                         <Image
//                           src={member.profileImage || "/default-avatar.png"}
//                           alt={member.firstName}
//                           width={40}
//                           height={40}
//                           className="rounded-full object-cover"
//                         />
//                         <div>
//                           <p className="text-sm font-medium text-gray-800">
//                             {member.firstName} {member.lastName}
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             Level: {member.level} | {member.rate}/hr
//                           </p>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => removeMember(member._id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </DropdownMenuContent>
//               )}
//             </DropdownMenu>

//             {/* Start Project Button (desktop only xl) */}
//             <Link href="/build-your-team" className="hidden xl:block">
//               <Button
//                 variant="outline"
//                 className="border border-[#00383B] text-[#00383B] hover:bg-transparent text-[16px]"
//               >
//                 Start My Project
//               </Button>
//             </Link>

//             {/* Login / Avatar */}
//             {session.status !== "authenticated" ? (
//               <Button
//                 onClick={() => setLoginOpen(true)}
//                 className="bg-[#00383B] hover:bg-[#00383B]/80 text-[16px] text-[#F8F9FA]"
//               >
//                 Log In
//               </Button>
//             ) : (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" className="p-0 border-none hover:bg-inherit gap-1">
//                     <Avatar className="w-10 h-10">
//                       {session.data.user?.profileImage ? (
//                         <AvatarImage src={session.data.user.profileImage} />
//                       ) : (
//                         <AvatarFallback>
//                           <User />
//                         </AvatarFallback>
//                       )}
//                     </Avatar>
//                     <ChevronDown className="ml-1 w-4 h-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem>
//                     <Link
//                       href={
//                         role === "engineer"
//                           ? "/engineer/settings/profile"
//                           : "/account/settings/profile"
//                       }
//                     >
//                       Profile
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem>
//                     <Link
//                       href={
//                         role === "engineer"
//                           ? "/engineer/settings"
//                           : "/account/settings"
//                       }
//                     >
//                       Settings
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     className="cursor-pointer text-red-500"
//                     onClick={() => signOut()}
//                   >
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             )}

//             {/* Mobile Menu Button */}
//             <div className="xl:hidden ml-2">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-cyan-400"
//               >
//                 {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu (laptop + mobile) */}
//       {isOpen && (
//         <div className="xl:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#DDFFFF]">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={cn(
//                   "block px-3 py-2 text-base font-medium rounded-md",
//                   pathname === item.href
//                     ? "text-[#147575] font-semibold"
//                     : "text-[#147575] hover:text-[#147575]/80"
//                 )}
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.name}
//               </Link>
//             ))}

//             {/* Mobile CTA & Avatar */}
//             <div className="mt-3 space-y-2">
//               <Link href="/build-your-team">
//                 <Button
//                   variant="outline"
//                   className="border border-[#00383B] text-[#00383B] w-full text-[16px]"
//                 >
//                   Start My Project
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Login Modal */}
//       <LoginModal onOpenChange={setLoginOpen} open={loginOpen} />
//     </nav>
//   );
// }
