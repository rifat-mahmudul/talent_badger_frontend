"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AskQ from "../../faqs/_components/AskQ"
import { useQuery } from "@tanstack/react-query"
import { ServiceApiResponse } from "../../services/_components/service-data-type"
import ServiceCard from "../../services/_components/ServiceCard"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"

export default function CandidateFilter() {

    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")

    // Debounce 500ms
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)

        return () => clearTimeout(timer)
    }, [search])


    const { data, isLoading, isError } = useQuery<ServiceApiResponse>({
        queryKey: ["services-all", debouncedSearch], // 🔑 search triggers re-fetch
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/all-user?role=engineer&searchTerm=${debouncedSearch}`,
                { method: "GET", headers: { "Content-Type": "application/json" } }
            );
            return res.json();
        },
        enabled: true,
    });

    return (
        <div className="w-full container mx-auto px-4 py-8">

            {/* ---------- SEARCH INPUT ---------- */}
            <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center mb-8">
                <div className="relative flex-1 min-w-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search candidates"
                        className="pl-10 h-11 border-gray-300 focus-visible:ring-teal-600"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                </div>

                <Button className="h-11 bg-[#147575] hover:bg-teal-700 text-white px-6 whitespace-nowrap">
                    Generate The Team
                </Button>
            </div>

            {isLoading && (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-10">
                    {[...Array(6)].map((_, idx) => (
                        <div key={idx} className="w-full p-4 border rounded-xl">
                            <Skeleton className="h-40 w-full rounded-lg" />
                            <Skeleton className="h-5 w-3/4 mt-4" />
                            <Skeleton className="h-4 w-1/2 mt-2" />
                            <Skeleton className="h-4 w-full mt-4" />
                        </div>
                    ))}
                </div>
            )}

            {/* ---------- ERROR ---------- */}
            {isError && (
                <div className="text-center py-10">
                    <p className="text-red-600 text-lg font-semibold">Failed to load candidates.</p>
                </div>
            )}

            {/* ---------- DATA ---------- */}
            {!isLoading && !isError && (
                <>
                    <div className="space-y-2">
                        <h2 className="text-[40px] font-bold text-[#147575]">Candidates</h2>
                        <p className="text-[#929292] text-[18px] leading-relaxed">
                            Browse and search professional candidates.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 justify-items-center my-10">
                        {data?.data?.length ? (
                            data.data.map((user, i) => (
                                <ServiceCard key={i} data={user} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 col-span-3 mt-10">
                                No candidates found.
                            </p>
                        )}
                    </div>

                    <AskQ />
                </>
            )}
        </div>
    )
}
