"use client";
import { Progress } from "@/components/ui/progress";
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
}

interface SessionUser {
  accessToken: string;
}

const ActiveProjects = () => {
  const { data: session, status: sessionStatus } = useSession();
  const token = (session?.user as SessionUser)?.accessToken;

  const {
    data: activeProjects = [],
    isLoading,
    isFetching,
  } = useQuery<Project[]>({
    queryKey: ["active-project", token],
    queryFn: async (): Promise<Project[]> => {
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
      return data?.data || [];
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  const ProjectSkeleton = () => (
    <div className="border border-gray-300 p-4 rounded-lg space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-8 w-20 rounded-3xl" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-2 w-full" />
      </div>
    </div>
  );

  const showSkeleton = sessionStatus === "loading" || isLoading || isFetching;

  return (
    <div className="bg-white border border-gray-300 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">Active Projects</h2>
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
          activeProjects?.slice(0, 5)?.map((data: Project) => (
            <div
              key={data._id}
              className="border border-gray-300 p-4 rounded-lg space-y-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-primary/85 text-xl font-medium">
                    {data.title}
                  </h2>

                  <p
                    className="text-sm text-gray-600 mt-2 lg:max-w-md"
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                  />
                </div>

                <button
                  className={`
                    text-xs font-semibold px-5 py-2 rounded-3xl
                    ${data.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : data.status === "in_progress"
                        ? "bg-blue-100 text-blue-700"
                        : data.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : data.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {data.status
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </button>
              </div>

              <div>
                <h1 className="text-gray-500 text-lg mb-1">
                  {data.progress}% Complete
                </h1>
                <Progress value={data.progress} className="w-[100%]" />
              </div>
            </div>
          ))
        )}

        {!showSkeleton && activeProjects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No active projects found
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveProjects;
