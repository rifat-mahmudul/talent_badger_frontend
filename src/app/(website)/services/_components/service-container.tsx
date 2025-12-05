"use client";

import React, { useState } from "react";
import ServiceCard from "./ServiceCard";
import { useQuery } from "@tanstack/react-query";
import { ServiceApiResponse } from "./service-data-type";
import DashboardCardsSkeleton from "@/app/(account)/account/_components/dashboard-header-skeleton";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";
import ServicePagination from "./services-pagination";

const ServiceContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, isError } = useQuery<ServiceApiResponse>({
    queryKey: ["services-all", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/all-user?role=engineer&page=${currentPage}&limit=9`,
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
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 justify-items-center my-10">
        {data?.data?.map((item, index) => (
          <ServiceCard key={index} data={item} />
        ))}
      </div>
    );
  }
  return (
    <div>
      {content}

      <div>
        <div className="p-8">
          {data && data?.meta && data?.meta?.page > 1 && (
            <ServicePagination
              page={currentPage}
              limit={data?.meta?.limit || 9}
              total={data?.meta?.total || 0}
              onPageChange={(page) => {
                setCurrentPage(page);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceContainer;
