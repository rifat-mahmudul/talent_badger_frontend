"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import AskQ from "../../faqs/_components/AskQ"
import { useQuery } from "@tanstack/react-query"
import { ServiceApiResponse } from "../../services/_components/service-data-type"
import ServiceCard from "../../services/_components/ServiceCard"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function CandidateFilter() {
    const [search, setSearch] = useState("")
    const [availability, setAvailability] = useState<"available" | "not_available" | "">("")
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")

    const [debouncedFilters, setDebouncedFilters] = useState({
        search: "",
        availability: "",
        minPrice: "",
        maxPrice: "",
    })

    // 🔹 Debounce filters
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters({
                search,
                availability,
                minPrice,
                maxPrice,
            })
        }, 500)

        return () => clearTimeout(timer)
    }, [search, availability, minPrice, maxPrice])

    const { data, isLoading, isError } = useQuery<ServiceApiResponse>({
        queryKey: ["services-all", debouncedFilters],
        queryFn: async () => {
            const params = new URLSearchParams({
                role: "engineer",
                searchTerm: debouncedFilters.search,
            })

            if (debouncedFilters.availability)
                params.append("userstatus", debouncedFilters.availability)

            if (debouncedFilters.minPrice)
                params.append("minPrice", debouncedFilters.minPrice)

            if (debouncedFilters.maxPrice)
                params.append("maxPrice", debouncedFilters.maxPrice)

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/all-user?status=active&${params.toString()}`,
                { headers: { "Content-Type": "application/json" } }
            )

            return res.json()
        },
    })

    return (
        <div className="w-full container mx-auto px-4 py-8">

            {/* ---------- FILTER BAR ---------- */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-8">

                {/* Search */}
                <div className="relative lg:col-span-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search candidates"
                        className="pl-10 h-11"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Availability */}
                <Select value={availability} onValueChange={(v) => setAvailability(v as "available" | "not_available" | "")}>
                    <SelectTrigger className="h-11">
                        <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="not_available">Not Available</SelectItem>
                    </SelectContent>
                </Select>

                {/* Min Price */}
                <Input
                    type="number"
                    placeholder="Min Price"
                    className="h-11"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />

                {/* Max Price */}
                <Input
                    type="number"
                    placeholder="Max Price"
                    className="h-11"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>

            {/* ---------- LOADING ---------- */}
            {isLoading && (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 my-10">
                    {[...Array(6)].map((_, idx) => (
                        <div key={idx} className="p-4 border rounded-xl">
                            <Skeleton className="h-40 w-full" />
                            <Skeleton className="h-5 w-3/4 mt-4" />
                            <Skeleton className="h-4 w-1/2 mt-2" />
                        </div>
                    ))}
                </div>
            )}

            {/* ---------- ERROR ---------- */}
            {isError && (
                <p className="text-center text-red-600 text-lg">
                    Failed to load candidates.
                </p>
            )}

            {/* ---------- DATA ---------- */}
            {!isLoading && !isError && (
                <>
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-6 my-10">
                        {data?.data?.length ? (
                            data.data.map((user, i) => (
                                <ServiceCard key={i} data={user} />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">
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
