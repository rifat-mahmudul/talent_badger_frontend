
"use client";

import React, { useRef, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ServiceApiResponse } from "./service-data-type";
import DashboardCardsSkeleton from "@/app/(account)/account/_components/dashboard-header-skeleton";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";

const LIMIT = 9;

const ServiceContainer = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery<ServiceApiResponse>({
    queryKey: ["services-all", LIMIT],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/all-user?role=engineer&page=${pageParam}&limit=${LIMIT}&status=active`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.json();
    },
    getNextPageParam: (lastPage, pages) => {
      const current = pages?.length; // current page index
      const totalPages = Math.ceil((lastPage?.meta?.total || 0) / LIMIT);

      if (current < totalPages) return current + 1;
      return undefined;
    },
  });

  // 🔥 Intersection Observer - auto fetch next page
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);


  const services = data?.pages.flatMap((page) => page?.data || []);

  // Loading state
  if (isLoading) {
    return (
      <div className="mt-6 flex gap-10">
        <DashboardCardsSkeleton />
        <DashboardCardsSkeleton />
        <DashboardCardsSkeleton />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <ErrorContainer
        message={error?.message || "Something went wrong fetching services."}
      />
    );
  }

  // Empty state
  if (!services || services.length === 0) {
    return (
      <NotFound message="Oops! No services found. Try again later." />
    );
  }

  return (
    <div className="my-10">
      {/* All Data */}
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-6 justify-items-center">
        {services.map((item, index) => (
          <ServiceCard key={index} data={item} />
        ))}
      </div>

      {/* Loader for infinite scroll */}
      <div ref={loadMoreRef} className="flex justify-center py-6">
        {isFetchingNextPage && (
          <DashboardCardsSkeleton />
        )}
        {!hasNextPage && (
          <p className="text-center text-gray-500">No more data</p>
        )}
      </div>
    </div>
  );
};

export default ServiceContainer;
