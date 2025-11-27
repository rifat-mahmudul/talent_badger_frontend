"use client";
import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "./project-card";
import { ProjectsMyTeamApiResponse } from "./projects-data-type";
import { useSession } from "next-auth/react";
import CircuitdaddyDropdown from "@/components/ui/circuitdaddy-dropdown";
import { useState } from "react";
import MyTeamSkeleton from "./my-team-skeleton";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
// import NotFound from "@/components/shared/NotFound/NotFound";

const statusList = [
  {
    value: "in_progress",
    label: "In Progress",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

export default function MyTeamContainer() {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const [status, setStatus] = useState("in_progress");

  const { data, isLoading, error, isError } = useQuery<ProjectsMyTeamApiResponse>({
    queryKey: ["manager-assign", status],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/my?status=${status}`,
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

  if (isLoading) {
    return (
      <main>
        <MyTeamSkeleton />
      </main>
    );
  }

  else if (isError) {
    return (
      <main>
        <ErrorContainer message={error?.message || "Something went wrong"} />
      </main>
    );
  }

//  else if(data && data?.data && data?.data?.length === 0){
//    <main>
//      <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
//    </main>
//   }

  return (
    <main className="pb-20">
      <div className="pb-8 md:pb-10 w-full flex items-center justify-end">
        <div className="w-full md:w-[200px]">
          <CircuitdaddyDropdown
            options={statusList}
            placeholder="Select Project Status"
            value={status}
            onChange={setStatus}
          />
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data && data.data.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </main>
  );
}
