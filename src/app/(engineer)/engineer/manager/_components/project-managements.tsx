/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

import ProjectCardSkeleton from "./project-card-skeleton";
import Assign from "./assign";
import ArrangeMeetingModal from "./arrange-meeting-modal";
import { ProjectResponse } from "../../project-management/_components/projects-table";

interface SessionUser {
  accessToken: string;
}

const ProjectManagements = () => {
  const { data: session, status: sessionStatus } = useSession();
  const token = (session?.user as SessionUser)?.accessToken;
  const [isOpen, setIsOpen] = useState(false);
  const [projectId, setProjectId] = useState("");

  const {
    data: projectsData,
    isLoading,
    isFetching,
  } = useQuery<ProjectResponse>({
    queryKey: ["projects", token],
    queryFn: async (): Promise<ProjectResponse> => {
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

      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await res.json();
      return data;
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  const projects = projectsData?.data || [];
  const showSkeleton = sessionStatus === "loading" || isLoading || isFetching;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {showSkeleton
          ? Array.from({ length: 6 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))
          : projects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-5 border border-gray-200 rounded-lg flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xl font-medium">{project.title} </h4>
                  <p
                    className="text-xs font-normal text-[#9A9EA2] leading-[150%] pt-1"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />

                  {/* person info */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-5">
                    <div className="flex-1 min-w-0">
                      {/* Client Info */}
                      <div className="flex items-center gap-3 mb-3">
                        <Image
                          src={
                            project?.client?.profileImage || "/placeholder.jpg"
                          }
                          alt={`${project?.client?.firstName} ${project?.client?.lastName}`}
                          width={1000}
                          height={1000}
                          className="h-10 w-10 rounded-full flex-shrink-0 object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <h5 className="text-[#147575] font-medium truncate">
                            {project?.client?.firstName}{" "}
                            {project?.client?.lastName}
                          </h5>
                          <h5 className="text-sm text-gray-500 truncate">
                            Client
                          </h5>
                        </div>
                      </div>

                      {/* Approved Engineers List */}
                      <div className="space-y-3">
                        {project?.approvedEngineers.map(
                          ({ engineer, isManager, _id }) => (
                            <div
                              key={_id}
                              className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <Image
                                  src={
                                    engineer?.profileImage || "/placeholder.jpg"
                                  }
                                  alt={`${engineer.firstName} ${engineer.lastName}`}
                                  width={1000}
                                  height={1000}
                                  className="h-8 w-8 rounded-full flex-shrink-0 object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <h5 className="text-sm font-medium truncate">
                                      {engineer.firstName} {engineer.lastName}
                                    </h5>
                                    {isManager && (
                                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex-shrink-0">
                                        Manager
                                      </span>
                                    )}
                                  </div>
                                  <h5 className="text-xs text-gray-500 truncate">
                                    Engineer
                                  </h5>
                                </div>
                              </div>

                              <Assign
                                engineerId={engineer._id}
                                projectId={project?._id}
                                token={token}
                              />
                            </div>
                          )
                        )}

                        {/* Show message if no approved engineers */}
                        {project.approvedEngineers.length === 0 && (
                          <div className="text-center py-4 text-gray-500 text-sm">
                            No approved engineers yet
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* average project progress */}
                  <div className="mt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-gray-500">
                            Average Project Progress
                          </h4>
                          <h4 className="text-[#147575]">
                            {project.progress}%
                          </h4>
                        </div>
                        <Progress value={project.progress} />
                      </div>
                      {/* <UpdateProgress projectId={project?._id} token={token} /> */}
                    </div>
                  </div>

                  {/* engineers project progress */}
                  <div className="mt-6">
                    <div className="space-y-4">
                      <h4 className="text-gray-500 font-medium">
                        Engineers Progress
                      </h4>
                      {project.approvedEngineers.map(
                        ({ engineer, isManager, _id }) => {
                          const engProgress = (engineer as any)?.progress ?? 0;
                          return (
                            <div key={_id} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium truncate">
                                    {engineer.firstName} {engineer.lastName}
                                  </span>
                                  {isManager && (
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                      Manager
                                    </span>
                                  )}
                                </div>
                                <span className="text-sm text-[#147575]">
                                  {engProgress}%
                                </span>
                              </div>
                              <Progress value={engProgress} className="h-2" />
                            </div>
                          );
                        }
                      )}

                      {/* Show message if no approved engineers */}
                      {project.approvedEngineers.length === 0 && (
                        <div className="text-center py-2 text-gray-500 text-sm">
                          No engineers assigned
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    className="w-full h-[45px]"
                    onClick={() => {
                      setIsOpen(true);
                      setProjectId(project?._id);
                    }}
                  >
                    Arrange Meeting
                  </Button>
                </div>
                {isOpen && (
                  <ArrangeMeetingModal
                    onClose={() => setIsOpen(false)}
                    projectId={projectId}
                    token={token}
                  />
                )}
              </div>
            ))}

        {/* Show empty state when no projects found */}
        {!showSkeleton && projects.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 text-lg">No projects found</div>
            <p className="text-gray-400 mt-2">
              You don&apos;t have any projects yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManagements;
