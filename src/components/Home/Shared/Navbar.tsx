"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { usePathname } from "next/navigation"
import Link from "next/link"
import LoginModal from "@/components/auth/LoginModal"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)
    const pathname = usePathname()
    const navItems = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Pick your team", href: "/pick-your-team" },
        { name: "Industries", href: "/industries" },
        { name: "Blog", href: "/blog" },
        { name: "Contact Us", href: "/contactus" },
        { name: "FAQ’S", href: "/faqs" },
    ]

    return (
        <nav className="bg-[#DDFFFF] py-2 sticky top-0 z-50">
            <div className="container mx-auto  ">
                <div className="flex items-center  justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 md:-ml-[50px] -ml-6 ">
                        <Image src="/logo.png" alt="Logo" width={250} height={150} />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "px-3 py-2 text-[16px] font-normal transition-colors duration-200 border-b-2",
                                            isActive
                                                ? "text-[#147575] border-[#147575] font-semibold "
                                                : "text-[#147575] border-transparent hover:text-[#147575]/80 "
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/agent-form">
                            <Button
                                variant="outline"
                                className="border border-[#00383B] bg-transparent text-[16px] text-[#00383B] hover:bg-transparent"
                            >
                                Start My Project
                            </Button>
                        </Link>
                        <Button onClick={() => setLoginOpen(true)} className="bg-[#00383B] hover:bg-[#00383B]/80 text-[16px] transition-all duration-300 text-[#F8F9FA]">Log In</Button>
                         <LoginModal onOpenChange={setLoginOpen} open={loginOpen}/>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-cyan-400  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="lg:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#DDFFFF]">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "block px-3 py-2 text-base  font-medium transition-colors duration-200 rounded-md",
                                        isActive
                                            ? "text-[#147575] border-[#147575] font-semibold "
                                            : "text-[#147575] border-transparent hover:text-[#147575]/80"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            )
                        })}
                        <div className="pt-4 pb-3 border-t border-[#00383B]">
                            <div className="flex flex-col space-y-3 px-3">
                                <Link href="/agent-form">
                                    <Button
                                        variant="outline"
                                        className="border border-[#00383B] bg-transparent w-full text-[16px] text-[#00383B] hover:bg-transparent"
                                    >
                                        Start My Project
                                    </Button>
                                </Link>

                                <Button className=" text-[#F8F9FA] hover:bg-[#00383B]/80 bg-[#00383B] w-full">
                                    Log In
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
