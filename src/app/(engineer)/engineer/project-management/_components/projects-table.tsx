"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye } from "lucide-react";
import DetailsProjectModal from "./details-project-modal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface Client {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

interface Engineer {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  client: Client;
  engineers: Engineer[];
  approvedEngineers: Engineer[];
  status: "pending" | "in_progress" | "completed" | "cancelled";
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
  usedAmount: number;
}

interface SessionUser {
  accessToken: string;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: Project[];
}

const ProjectsTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { data: session, status: sessionStatus } = useSession();
  const token = (session?.user as SessionUser)?.accessToken;

  const {
    data: projectsData,
    isLoading,
    isFetching,
  } = useQuery<ApiResponse>({
    queryKey: ["projects", token],
    queryFn: async (): Promise<ApiResponse> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/my`,
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", text: "Pending" },
      in_progress: { color: "bg-blue-100 text-blue-800", text: "In Progress" },
      completed: { color: "bg-green-100 text-green-800", text: "Completed" },
      cancelled: { color: "bg-red-100 text-red-800", text: "Cancelled" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      color: "bg-gray-100 text-gray-800",
      text: status,
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  const TableSkeleton = () => (
    <TableRow className="h-[50px]">
      <TableCell className="text-center">
        <Skeleton className="h-4 w-3/4 mx-auto" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className="h-4 w-2/3 mx-auto" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className="h-6 w-20 mx-auto rounded-full" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className="h-5 w-5 mx-auto rounded" />
      </TableCell>
    </TableRow>
  );

  const showSkeleton = sessionStatus === "loading" || isLoading || isFetching;

  return (
    <div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-[#f2f2f2] h-[50px]">
            <TableRow>
              <TableHead className="text-center text-black">Project</TableHead>
              <TableHead className="text-center text-black">
                Client/Team
              </TableHead>
              <TableHead className="text-center text-black">
                Start Date
              </TableHead>
              <TableHead className="text-center text-black">
                Delivery Date
              </TableHead>
              <TableHead className="text-center text-black">Status</TableHead>
              <TableHead className="text-center text-black">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {showSkeleton
              ? Array.from({ length: 15 }).map((_, index) => (
                  <TableSkeleton key={index} />
                ))
              : projects.map((project) => (
                  <TableRow key={project._id} className="h-[50px]">
                    <TableCell className="text-center text-gray-600 font-medium">
                      {project.title}
                    </TableCell>
                    <TableCell className="text-center text-gray-600">
                      {project.client.firstName} {project.client.lastName}
                    </TableCell>
                    <TableCell className="text-center text-gray-600">
                      {formatDate(project.startDate)}
                    </TableCell>
                    <TableCell className="text-center text-gray-600">
                      {formatDate(project.deliveryDate)}
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(project.status)}
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        onClick={() => handleViewDetails(project)}
                        className="hover:text-primary transition-colors"
                      >
                        <Eye className="h-5 w-5 mx-auto" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}

            {!showSkeleton && projects.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  No projects found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {isOpen && selectedProject && (
        <DetailsProjectModal
          project={selectedProject}
          onClose={() => {
            setIsOpen(false);
            setSelectedProject(null);
          }}
        />
      )}
    </div>
  );
};

export default ProjectsTable;
