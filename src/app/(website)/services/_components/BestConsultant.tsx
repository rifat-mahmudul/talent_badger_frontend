"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import StatementOfWorkForm from "./statement-of-work-form";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../../services/_components/ServiceCard";
import { ServiceApiResponse } from "../../services/_components/service-data-type";
import AskQ from "../../faqs/_components/AskQ";

const BestConsultant = () => {
  const { data: session } = useSession();
  const role = (session?.user as { role: string })?.role;

  const [isOpen, setIsOpen] = useState(false);

  // ---------- FILTER STATES ----------
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState<"available" | "not_available" | "">("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [debouncedFilters, setDebouncedFilters] = useState({
    search: "",
    availability: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters({
        search,
        availability,
        minPrice,
        maxPrice,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [search, availability, minPrice, maxPrice]);

  // ---------- FETCH CANDIDATES ----------
  const { data, isLoading, isError } = useQuery<ServiceApiResponse>({
    queryKey: ["services-all", debouncedFilters],
    queryFn: async () => {
      const params = new URLSearchParams({ role: "engineer", searchTerm: debouncedFilters.search });

      if (debouncedFilters.availability) params.append("userstatus", debouncedFilters.availability);
      if (debouncedFilters.minPrice) params.append("minPrice", debouncedFilters.minPrice);
      if (debouncedFilters.maxPrice) params.append("maxPrice", debouncedFilters.maxPrice);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/all-user?status=active&${params.toString()}`,
        { headers: { "Content-Type": "application/json" } }
      );

      return res.json();
    },
  });

  // ---------- SOW BUTTON ----------
  const handleStartSOW = () => {
    if (role === "engineer") {
      toast.error("You are an Engineer", {
        duration: 3000,
        style: { background: "#333", color: "#fff" },
      });
      return;
    }
    setIsOpen(true);
  };

  return (
    <section className="container mx-auto my-16 px-4">

      {/* ---------- HEADER & SOW BUTTON ---------- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left Section */}
        <div className="w-full md:w-2/3 text-center md:text-left">
          <h2 className="text-[#147575] font-bold text-[28px] sm:text-[32px] md:text-[40px] leading-tight mb-3">
            Meet Best Consultant of Us
          </h2>
          <p className="text-[#929292] font-normal text-[16px] sm:text-[18px] max-w-[900px] mx-auto md:mx-0">
            Meet a curated selection of trusted professionals whose expertise,
            reliability, and excellence set the benchmark in every project.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 md:gap-5 justify-center md:justify-end">
          <Button
            onClick={handleStartSOW}
            className="bg-[#00383B] hover:bg-[#005356] text-white w-full sm:w-auto"
          >
            Start My SOW
          </Button>
        </div>
      </div>

      {/* ---------- FILTER BAR ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-8 mt-10">

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
        <Select
          value={availability}
          onValueChange={(v) => setAvailability(v as "available" | "not_available" | "")}
        >
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

      {/* ---------- CANDIDATES LIST ---------- */}
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

      {isError && (
        <p className="text-center text-red-600 text-lg">
          Failed to load candidates.
        </p>
      )}

      {!isLoading && !isError && (
        <>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-6 my-10">
            {data?.data?.length ? (
              data.data.map((user, i) => <ServiceCard key={i} data={user} />)
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No candidates found.
              </p>
            )}
          </div>

          <AskQ />
        </>
      )}

      {/* ---------- SOW Modal ---------- */}
      {isOpen && (
        <StatementOfWorkForm
          open={isOpen}
          onOpenChange={(open: boolean) => setIsOpen(open)}
        />
      )}
    </section>
  );
};

export default BestConsultant;
