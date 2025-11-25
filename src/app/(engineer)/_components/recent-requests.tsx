"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  progress: number;
  company?: string;
}

interface SessionUser {
  accessToken: string;
}

const RecentRequests = () => {
  const { data: session, status: sessionStatus } = useSession();
  const token = (session?.user as SessionUser)?.accessToken;

  const {
    data: completedProjects = [],
    isLoading,
    isFetching,
  } = useQuery<Project[]>({
    queryKey: ["completed-projects", token],
    queryFn: async (): Promise<Project[]> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/my?status=completed`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch completed projects");
      }

      const data = await res.json();
      return data?.data || [];
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  const ProjectSkeleton = () => (
    <div className="space-y-3 border-b border-gray-300 pb-5">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-8 w-20 rounded-3xl" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );

  const showSkeleton = sessionStatus === "loading" || isLoading || isFetching;

  return (
    <div className="bg-white border border-gray-300 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">Recent Requests</h2>
        <Link href={`/engineer/project-management`}>
          <button className="text-sm text-primary">See All</button>
        </Link>
      </div>

      <div className="mt-6 space-y-5">
        {showSkeleton ? (
          <>
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </>
        ) : (
          completedProjects?.slice(0, 5)?.map((project: Project) => (
            <div
              key={project._id}
              className="space-y-5 border-b border-gray-300 pb-5 last:border-b-0"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="text-xl font-medium">{project.title}</h5>
                </div>

                <button
                  className={`
                    text-xs font-semibold px-8 py-2 rounded-3xl
                    ${project.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : project.status === "in_progress"
                        ? "bg-blue-100 text-blue-700"
                        : project.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : project.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {project.status
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </button>
              </div>

              <div>
                <p
                  className="text-sm text-gray-600 mt-2 lg:max-w-md"
                  dangerouslySetInnerHTML={{
                    __html: project?.description,
                  }}
                />
              </div>
            </div>
          ))
        )}

        {!showSkeleton && completedProjects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No completed projects found
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentRequests;
