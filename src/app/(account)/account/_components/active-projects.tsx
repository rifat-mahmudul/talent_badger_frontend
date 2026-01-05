"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import ActiveProjectsSkeleton from "./ActiveProjectsSkeleton";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";

export interface ActiveProjectListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: ProjectItem[];
}

export interface ProjectItem {
  _id: string;
  title: string;
  description: string;
  client: ApprovedEngineer;
  engineers: ApprovedEngineer[];
  approvedEngineers: ApprovedEngineer[];
  status: "pending" | "in_progress" | "completed" | "cancelled" | string; // backend-defined
  totalPaid: number;
  ndaAgreement: string[];
  progress: number;
  totalTimeline: number;
  startDate: string;
  deliveryDate: string;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  usedAmount?: number; // optional because first item has it, second too, but safe
}

export interface Engineer {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  professionTitle?: string;
}

export interface ApprovedEngineer {
  engineer: Engineer;
  status: string; // e.g., "approved"
  isManager: boolean;
  _id: string; // unique ID for this approvedEngineer record
  progress: number;
}

const ActiveProjects = () => {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { data, isLoading, error, isError } =
    useQuery<ActiveProjectListResponse>({
      queryKey: ["active-projects"],
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/my?status=in_progress`,
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

  console.log(data);

  let content;
  if (isLoading) {
    content = (
      <div>
        <ActiveProjectsSkeleton />
      </div>
    );
  } else if (isError) {
    content = (
      <div>
        <ErrorContainer message={error?.message || "Something went wrong"} />
      </div>
    );
  } else if (data && data?.data && data?.data?.length === 0) {
    content = (
      <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
    );
  } else if (data && data?.data && data?.data?.length > 0) {
    content = (
      <div className="p-5 h-[290px] overflow-y-auto scrollbar-hide">
        {data?.data?.map((item) => {
          return (
            <div
              key={item?._id}
              className="p-4 bg-white border-[1px] border-[#EEEEEE] shadow-lg rounded-lg mb-5"
            >
              <div className="w-full flex items-center justify-between">
                <h5 className="text-sm text-[#147575] font-medium leading-[150%]">
                  {item?.title || ""}
                </h5>
                <div className="flex items-center gap-2">
                  {item?.approvedEngineers?.map((img) => {
                    return (
                      <Image
                        key={img?._id}
                        src={img?.engineer?.profileImage || "/images/no-user.jpeg"}
                        alt={img?.engineer?.firstName}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                    );
                  })}
                </div>
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: item?.description }}
                className="text-xs font-normal leading-[150%] text-[#68706A] py-2 "
              />
              <div className="flex items-center gap-3">
                <button className="bg-[#E6EBEB] text-[10px] text-[#00383B] font-normal leading-[150%] py-1 px-6 rounded-full">
                  {item?.status}
                </button>
                {/* <p className='text-xs font-normal text-[#9E9E9E] leading-[150%]'>Started 2 weeks ago</p> */}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="py-6">
      <div className="bg-white border-[1px] border-[#EEEEEE] shadow-lg rounded-lg pt-5">
        <h4 className="text-sm leading-[150%] font-semibold text-[#147575] pb-4 border-b border-[#EEEEEE] px-5">
          Matches proposed
        </h4>

        <div>{content}</div>
      </div>
    </div>
  );
};

export default ActiveProjects;
