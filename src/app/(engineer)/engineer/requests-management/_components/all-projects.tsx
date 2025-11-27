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
  id: string;
}

const items = [
  { label: "All", status: "" },
  { label: "Awaiting Approval", status: "pending" },
  { label: "Assigned", status: "in_progress" },
  { label: "Completed", status: "completed" },
];

const AllProjects = () => {
  const { data: session, status: sessionStatus } = useSession();
  const token = (session?.user as SessionUser)?.accessToken;
  const currentUserId = (session?.user as SessionUser)?.id;

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
    const statusConfig: Record<string, { color: string; text: string }> = {
      pending: { color: "bg-yellow-100 text-yellow-700", text: "Pending" },
      in_progress: { color: "bg-blue-100 text-blue-700", text: "In Progress" },
      completed: { color: "bg-green-100 text-green-700", text: "Completed" },
      cancelled: { color: "bg-red-100 text-red-700", text: "Cancelled" },
    };

    const config = statusConfig[status] || {
      color: "bg-gray-100 text-gray-700",
      text: status.charAt(0).toUpperCase() + status.slice(1),
    };

    return (
      <span
        className={`px-6 py-2 rounded-3xl text-xs font-semibold ${config.color}`}
      >
        {config.text}
      </span>
    );
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

      <div className="mt-5 space-y-2">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-2 w-full" />
      </div>
    </div>
  );

  const showSkeleton = sessionStatus === "loading" || isLoading || isFetching;

  return (
    <div>
      <div className="flex items-center gap-4 flex-wrap">
        {items.map((item) => {
          const isActive = activeCategory === item.status;

          return (
            <button
              key={item.label}
              onClick={() => setActiveCategory(item.status)}
              className={`
                text-sm font-medium px-5 py-2 rounded-lg transition-all
                ${
                  isActive
                    ? "bg-primary text-white shadow"
                    : "bg-primary/10 text-gray-600 hover:bg-primary/20"
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
          <>
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </>
        ) : activeProjects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">No projects found</p>
            <p className="text-gray-400 mt-2">
              {activeCategory
                ? `You have no ${items
                    .find((i) => i.status === activeCategory)
                    ?.label.toLowerCase()} projects.`
                : "You don't have any projects at the moment."}
            </p>
          </div>
        ) : (
          activeProjects.map((project) => {
            // Check if current user is invited to this project
            const isInvited = project.engineers.some(
              (eng) => eng._id === currentUserId
            );

            // Check if current user already accepted - FIXED
            const alreadyAccepted = project.approvedEngineers?.some(
              (ae) => ae.engineer._id === currentUserId
            );

            // Show Accept/Decline button ONLY if:
            // 1. Project is pending
            // 2. Current user is invited
            // 3. Current user hasn't accepted yet
            const showAcceptDecline =
              project.status === "pending" && isInvited && !alreadyAccepted;

            return (
              <div
                key={project._id}
                className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {project.title}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Client: {project.client.firstName}{" "}
                      {project.client.lastName}
                    </p>

                    <div
                      className="text-sm text-gray-600 mt-3 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                  </div>

                  <div className="ml-4">{getStatusBadge(project.status)}</div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 text-sm">
                  <div>
                    <p className="text-gray-500">Submitted</p>
                    <p className="font-medium">
                      {formatDate(project.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Start Date</p>
                    <p className="font-medium">
                      {formatDate(project.startDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">{project.totalTimeline} Days</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Project Value</p>
                    <p className="font-medium text-lg">
                      {formatCurrency(project.totalPaid)}
                    </p>
                  </div>
                </div>

                {/* Accept/Decline Button - Only for invited & pending projects */}
                {showAcceptDecline && (
                  <div className="mt-6">
                    <AcceptDecline id={project._id} />
                  </div>
                )}

                {/* Progress Bar - For in_progress projects */}
                {project.status === "in_progress" && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Progress
                      </span>
                      <span className="text-sm font-semibold">
                        {project.progress}%
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-3" />
                  </div>
                )}

                {/* Completed Project Financial Summary */}
                {project.status === "completed" && (
                  <div className="mt-6 p-5 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 font-medium">
                          Project Completed
                        </p>
                        <p className="text-2xl font-bold text-green-700">
                          {formatCurrency(project.totalPaid)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Amount Used</p>
                        <p className="font-semibold text-green-700">
                          {formatCurrency(project.usedAmount || 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllProjects;
