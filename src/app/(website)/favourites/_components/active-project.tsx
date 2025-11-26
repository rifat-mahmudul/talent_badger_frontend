"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { ActiveProjectApiResponse } from "./active-project-data-type";
import Image from "next/image";
import ActiveProjectsSkeleton from "@/app/(account)/account/_components/ActiveProjectsSkeleton";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";
import { ArrowRight } from "lucide-react";
import ServicePagination from "../../services/_components/services-pagination";
import ViewProjectInfo from "./view-project";
import AllEngineers from "./all-engineers";
// import { toast } from "sonner";
// import { EngineerDatatype } from "./engineer-data-type";

const ActiveProjects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEngineerModal, setIsEngineerModal] = useState(false);
  // const [selectedTeam, setSelectedTeam] = useState<EngineerDatatype[]>([]);
  const [projectId, setProjectId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;


  // console.log("selected Team", selectedTeam)



  const { data, isLoading, isError, error } =
    useQuery<ActiveProjectApiResponse>({
      queryKey: ["favourites-active-projects", currentPage],
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/my?status=in_progress&page=${currentPage}&limit=2`,
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
      <div className="pt-6">
        <ErrorContainer message={error?.message || "Something went wrong"} />
      </div>
    );
  } else if (data && data?.data && data?.data?.length === 0) {
    content = (
      <div className="pt-5">
        <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
      </div>
    );
  } else if (data && data?.data && data?.data?.length > 0) {
    content = (
      <div className="p-5 space-y-5">
        {data?.data?.map((item) => {
          const statusColors: Record<string, string> = {
            pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
            "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
            completed: "bg-green-100 text-green-800 border-green-200",
            cancelled: "bg-red-100 text-red-800 border-red-200",
          };

          const statusColor =
            statusColors[item?.status?.toLowerCase().replace(" ", "-")] ||
            "bg-gray-100 text-gray-800";

          return (
            <div
              key={item?._id}
              className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                {/* Header: Title + Engineers */}
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {item?.title || "Untitled Project"}
                  </h2>

                  {/* Overlapping Avatars */}
                  <div className="flex -space-x-3">
                    {item?.approvedEngineers?.slice(0, 4).map((img, idx) => (
                      <div
                        key={img?._id}
                        className="relative ring-4 ring-white transition-transform group-hover:scale-110"
                        style={{ zIndex: idx }}
                      >
                        <Image
                          src={
                            img?.engineer?.profileImage ||
                            "/placeholder-avatar.jpg"
                          }
                          alt={img?.engineer?.firstName}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover border-2 border-white"
                        />
                      </div>
                    ))}
                    {item?.approvedEngineers?.length > 4 && (
                      <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                        +{item.approvedEngineers.length - 4}
                      </div>
                    )}
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-5">
                  <div>
                    <span className="font-medium text-gray-500">Started</span>
                    <p className="font-medium text-gray-800">
                      {item?.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Timeline</span>
                    <p className="font-medium text-gray-800">
                      {item?.totalTimeline || "-"}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Budget</span>
                    <p className="font-semibold text-gray-900">
                      ${item?.totalPaid?.toLocaleString() || "0"}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Progress</span>
                    <p className="font-medium text-gray-800">
                      {item?.progress || "0"}%
                    </p>
                  </div>
                </div>
                <div className="pb-4">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${statusColor}`}
                  >
                    <span className="w-2 h-2 bg-current rounded-full mr-2" />
                    {item?.status || "Unknown"}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Overall Progress</span>
                    <span className="font-medium">{item?.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-emerald-600 h-2 rounded-full transition-all duration-700"
                      style={{ width: `${item?.progress || 0}%` }}
                    />
                  </div>
                </div>

                {/* Footer: Status + Action */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setIsEngineerModal(true);
                      setProjectId(item?._id);
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#00383B] to-[#005A5A] text-white font-medium text-sm px-6 py-2.5 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Add Engineer
                  </button>

                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setProjectId(item?._id);
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#00383B] to-[#005A5A] text-white font-medium text-sm px-6 py-2.5 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    View Project <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div>
      <div>
        <div>
          <h2 className="text-3xl text-center pt-5">Active Projects</h2>
        </div>
        {content}
      </div>
      <div className="p-2">
        <ServicePagination
          page={currentPage}
          limit={data?.meta?.limit || 2}
          total={data?.meta?.total || 0}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>

      {/* view project modal  */}
      <div>
        {isOpen && (
          <ViewProjectInfo
            open={isOpen}
            onOpenChange={(open: boolean) => setIsOpen(open)}
            projectId={projectId}
          />
        )}
      </div>

      {/* project modal  */}
      <div>
        {isEngineerModal && (
          <AllEngineers
            open={isEngineerModal}
            onOpenChange={(open: boolean) => setIsEngineerModal(open)}
            projectId={projectId}
            // onSubmit={(members) => {
            //   setSelectedTeam(members);
            //   toast.success(
            //     `${members.length} engineers added to your project!`
            //   );
            // }}
          />
        )}
      </div>
    </div>
  );
};

export default ActiveProjects;
