"use client";
import Image from "next/image";
import React from "react";
import ActiveProjectsSkeleton from "./ActiveProjectsSkeleton";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

export interface UpcomingProjectListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: Project[];
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  client: UserInfo;
  engineers: UserInfo[];
  approvedEngineers: UserInfo[];
  status: "pending" | "in_progress" | "completed";
  totalPaid: number;
  ndaAgreement: string[];
  progress: number;
  totalTimeline: number;
  startDate: string;
  deliveryDate: string;
  usedAmount?: number;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserInfo {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

const UpcomingDeadlines = () => {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { data, isLoading, error, isError } =
    useQuery<UpcomingProjectListResponse>({
      queryKey: ["upcoming-projects"],
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/my?upcoming=true`,
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
    <div>
      <ActiveProjectsSkeleton />
    </div>;
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
      <div className="p-5 h-[290px] overflow-y-auto">
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
                        src={img?.profileImage}
                        alt={img?.firstName}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                    );
                  })}
                </div>
              </div>
              <p className="text-xs font-normal leading-[150%] text-[#68706A] py-2">
                {item?.description}
              </p>
             <div className="w-full flex items-center justify-between">
               <div className="flex items-center gap-3">
                <button className="bg-[#E6EBEB] text-[10px] text-[#00383B] font-normal leading-[150%] py-1 px-6 rounded-full">
                  {item?.status}
                </button>
                {/* <p className='text-xs font-normal text-[#9E9E9E] leading-[150%]'>Started 2 weeks ago</p> */}
              </div>
              <div>
                <button className="bg-[#FEE2E2] py-1 px-2 rounded-full text-base font-medium leading-[16px] text-[#991B1B]">{moment(item?.createdAt).format("DD / MM / YYYY")}</button>
              </div>
             </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="pb-[124px]">
      <div className="bg-white border-[1px] border-[#EEEEEE] shadow-lg rounded-lg pt-5">
        <h4 className="text-sm leading-[150%] font-semibold text-[#147575] pb-4 border-b border-[#EEEEEE] px-5">
          Upcoming Deadlines
        </h4>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
