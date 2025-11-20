"use client";

import { FileText, PhoneCall } from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import DashboardCardsSkeleton from "./dashboard-header-skeleton";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";

export interface DashboardOverviewResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    totalActiveProject: number;
    totalPandingProject: number;
    totalCompletedProject: number;
    upcomingMeeting: number;
    upcomingDeadlines: number;
  };
}

const ClientDashboardHeader = () => {
  
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { data, isLoading, error, isError } =
    useQuery<DashboardOverviewResponse>({
      queryKey: ["dashboard-header"],
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
        return res.json();
      },
      enabled: !!token,
    });

    let content;

  if (isLoading) {
    content = (
      <div>
        <DashboardCardsSkeleton />
      </div>
    );
  } else if (isError) {
    content = <div className="">
      <ErrorContainer message={error?.message || "Someting went wrong"}/>
    </div>;
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white flex items-center gap-2 border-[1px] border-[#EEEEEE] shadow-lg rounded-lg p-5">
          <div>
            <div className="p-2 rounded-[8px] bg-[#E8F1F1]">
              <FileText className="w-7 h-7 text-[#147575]" />
            </div>
          </div>
          <div>
            <h4 className="text-base text-[#147575] font-semibold leading-[150%]">
              Active Projects
            </h4>
            <p className="text-base text-[#68706A] font-semibold leading-[150%] pt-2">
              {data?.data?.totalActiveProject || 0}
            </p>
          </div>
        </div>

        <div className="bg-white flex items-center gap-2 border-[1px] border-[#EEEEEE] shadow-lg rounded-lg p-5">
          <div className="p-2 rounded-[8px] bg-[#E8F1F1]">
            <span>
              <PhoneCall className="w-7 h-7 text-[#147575]" />
            </span>
          </div>
          <div>
            <h4 className="text-base text-[#147575] font-semibold leading-[150%]">
              Upcoming Meeting Schedule
            </h4>
            <p className="text-base text-[#68706A] font-semibold leading-[150%] pt-2">
              {data?.data?.upcomingMeeting || 0}
            </p>
          </div>
        </div>

        <div className="bg-white flex items-center gap-2 border-[1px] border-[#EEEEEE] shadow-lg rounded-lg p-5">
          <div className="p-2 rounded-[8px] bg-[#E8F1F1]">
            <span>
              <FileText className="w-7 h-7 text-[#147575]" />
            </span>
          </div>
          <div>
            <h4 className="text-base text-[#147575] font-semibold leading-[150%]">
              Upcoming Deadlines
            </h4>
            <p className="text-base text-[#68706A] font-semibold leading-[150%] pt-2">
              {data?.data?.upcomingDeadlines || 0}
            </p>
          </div>
        </div>
      </div>
    );
  }

  console.log(data);
  return <div>{content}</div>;
};

export default ClientDashboardHeader;
