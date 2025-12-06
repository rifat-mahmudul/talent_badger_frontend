"use client";
import React from "react";
import StateCard from "./state-card";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface SessionUser {
  accessToken: string;
}

const States = () => {
  const { data: session, status: sessionStatus } = useSession();
  const token = (session?.user as SessionUser)?.accessToken;

  const {
    data: states = {},
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["states", token],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/userOverview`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch states");
      }

      const data = await res.json();
      return data?.data || {};
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  console.log(states)

  // Show skeleton when session is loading OR when query is loading/fetching
  const showSkeleton = sessionStatus === "loading" || isLoading || isFetching;

  if (showSkeleton) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between h-[130px]">
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-3/4 bg-muted" />
              <Skeleton className="h-8 w-1/2 bg-muted" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
      <StateCard title="Active Projects" value={states?.totalActiveProject || 0} image="/state-1.png" />
      <StateCard title="Pending Projects" value={states?.totalPandingProject || 0} image="/state-2.png" />
      <StateCard title="Completed Projects" value={states?.totalCompletedProject || 0} image="/state-3.png" />
      <StateCard title="Upcoming Meeting" value={states?.upcomingMeeting || 0} image="/state-3.png" />
      <StateCard title="Upcoming Deadline" value={states?.upcomingDeadlines || 0} image="/state-3.png" />
    </div>
  );
};

export default States;