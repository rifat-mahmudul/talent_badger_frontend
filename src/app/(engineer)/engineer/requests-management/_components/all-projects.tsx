"use client";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Project } from "../../project-management/_components/projects-table";
import { useQuery } from "@tanstack/react-query";
import AcceptDecline from "./accept-decline";

interface SessionUser {
  accessToken: string;
}

const items = [
  { label: "All", status: "" },
  { label: "Awaiting Approval", status: "pending" },
  { label: "Assigned", status: "in_progress" },
];

const AllProjects = () => {
  const { data: session, status: sessionStatus } = useSession();
  const token = (session?.user as SessionUser)?.accessToken;
  const [activeCategory, setActiveCategory] = useState("");

  const {
    data: activeProjects = [],
    isLoading,
    isFetching,
  } = useQuery<Project[]>({
    queryKey: ["active-project", token, activeCategory],
    queryFn: async (): Promise<Project[]> => {
      const api = activeCategory
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/my?status=${activeCategory}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/my`;

      const res = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await res.json();
      return data?.data || [];
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-700", text: "Pending" },
      in_progress: { color: "bg-blue-100 text-blue-700", text: "In Progress" },
      completed: { color: "bg-green-100 text-green-700", text: "Completed" },
      cancelled: { color: "bg-red-100 text-red-700", text: "Cancelled" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      color: "bg-gray-100 text-gray-700",
      text: status,
    };

    return (
      <span
        className={`px-6 py-2 rounded-3xl text-xs font-semibold ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const calculateDuration = (startDate: string, deliveryDate: string) => {
    const start = new Date(startDate);
    const delivery = new Date(deliveryDate);
    const diffTime = delivery.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.ceil(diffDays / 7);
    return `${weeks} week${weeks !== 1 ? "s" : ""}`;
  };

  const calculateHourlyRate = (totalPaid: number, totalTimeline: number) => {
    const totalHours = (totalTimeline / 7) * 5 * 8;
    const hourlyRate = totalPaid / totalHours;
    return Math.round(hourlyRate);
  };

  const ProjectSkeleton = () => (
    <div className="bg-white p-5 rounded-lg border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-8 w-20 rounded-3xl" />
      </div>

      <div className="flex items-center justify-between mt-5">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      <div className="flex items-center justify-between mt-5 lg:max-w-xs">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      <div className="space-x-5 mt-5">
        <Skeleton className="h-10 w-32 inline-block" />
        <Skeleton className="h-10 w-32 inline-block" />
      </div>

      <div className="mt-5 space-y-2">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-2 w-full" />
      </div>
    </div>
  );

  const showSkeleton = sessionStatus === "loading" || isLoading || isFetching;

  return (
    <div>
      <div className="flex items-center gap-4">
        {items.map((item, index) => {
          const isActive = activeCategory === item.status;

          return (
            <button
              key={index}
              onClick={() => setActiveCategory(item.status)}
              className={`
            text-sm font-medium px-5 py-2 rounded-lg
            transition-all
            ${isActive
                  ? "bg-primary text-white shadow"
                  : "bg-primary/10 text-gray-600"
                }
          `}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-6">
        {showSkeleton ? (
          // Show 3 skeleton loaders
          <>
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </>
        ) : (
          activeProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white p-5 rounded-lg border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-medium">{project.title}</h2>
                  <p className="text-gray-500 my-4">
                    Client: {project.client.firstName} {project.client.lastName}
                  </p>

                  <p className="text-xs font-normal text-[#9A9EA2] leading-[150%] pt-1"
                    dangerouslySetInnerHTML={{ __html: project.description }} />

                </div>

                <div>{getStatusBadge(project.status)}</div>
              </div>

              <div className="flex items-center justify-between mt-5">
                <div>
                  <h5 className="text-gray-500">Submitted</h5>
                  <p className="font-medium">{formatDate(project.createdAt)}</p>
                </div>

                <div>
                  <h5 className="text-gray-500">Requested Start</h5>
                  <p className="font-medium">{formatDate(project.startDate)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-5 lg:max-w-xs">
                <div>
                  <h5 className="text-gray-500">Duration</h5>
                  <p className="font-medium">
                    {calculateDuration(project.startDate, project.deliveryDate)}
                  </p>
                </div>

                <div>
                  <h5 className="text-gray-500">Rate</h5>
                  <p className="font-medium">
                    {formatCurrency(
                      calculateHourlyRate(
                        project.totalPaid,
                        project.totalTimeline
                      )
                    )}
                    /Hr
                  </p>
                </div>
              </div>

              {/* accept-decline button - Only show for pending projects */}
              {project.status === "pending" && (
                <AcceptDecline id={project?._id} />
              )}

              {/* progress bar - Only show for in_progress projects */}
              {project.status === "in_progress" && (
                <div className="mt-5">
                  <h1 className="text-gray-500 text-lg mb-1">
                    {project.progress}% Complete
                  </h1>
                  <Progress value={project.progress} className="w-[100%]" />
                </div>
              )}

              {/* Financial info for completed projects */}
              {project.status === "completed" && (
                <div className="mt-5 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-gray-600">Total Project Cost</h5>
                      <p className="font-medium text-green-700">
                        {formatCurrency(project.totalPaid)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {!showSkeleton && activeProjects.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">No active projects found</p>
            <p className="text-gray-400 mt-2">
              You don&apos;t have any projects in progress at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
