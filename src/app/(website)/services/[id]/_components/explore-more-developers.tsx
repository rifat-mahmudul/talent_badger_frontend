"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardCardsSkeleton from "@/app/(account)/account/_components/dashboard-header-skeleton";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";
import { ServiceApiResponse } from "../../_components/service-data-type";
import ServiceCard from "../../_components/ServiceCard";

const ExploreMoreDevelopers = () => {
  const { data, isLoading, error, isError } = useQuery<ServiceApiResponse>({
    queryKey: ["services-all"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/all-user?role=engineer`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.json();
    },
  });

  // console.log(data)

  let content;

  if (isLoading) {
    content = (
      <div>
        <DashboardCardsSkeleton />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="">
        <ErrorContainer message={error?.message || "Someting went wrong"} />
      </div>
    );
  } else if (data && data?.data && data?.data?.length === 0) {
    content = (
      <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
    );
  } else if (data && data?.data && data?.data?.length > 0) {
    content = (
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 justify-items-center my-10">
        {data?.data?.slice(0, 3)?.map((item, index) => (
          <ServiceCard key={index} data={item} />
        ))}
      </div>
    );
  }
  return <div>{content}</div>;
};

export default ExploreMoreDevelopers;
