"use client";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

export interface ProjectDetailResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    project: ProjectDetail;// Empty array here, but typed for future use
  };
}

export interface ProjectDetail {
  _id: string;
  title: string;
  description: string;
  client: Client;
  engineers: Engineer[];
  status: "in_progress" | "completed" | "pending"; // adjust according to backend
  totalPaid: number;
  ndaAgreement: string[];
  progress: number;
  totalTimeline: number;
  startDate: string; // ISO date string
  deliveryDate: string; // ISO date string
  usedAmount: number;
  approvedEngineers: ApprovedEngineerRef[];
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Client {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

export interface Engineer {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  professionTitle?: string;
}

export interface ApprovedEngineerRef {
  engineer: string; // just the engineer's ID in this response
  status: "approved" | "pending" | "rejected";
  isManager: boolean;
  _id: string;
}

const ViewProjectInfo = ({
  open,
  onOpenChange,
  projectId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}) => {
  const { data } = useQuery<ProjectDetailResponse>({
    queryKey: ["view-project", projectId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}`
      );
      return await res.json();
    },
  });

  console.log(data?.data?.project);
  const projectInfo = data?.data?.project;
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <h2>{projectInfo?.title}</h2>
          <p
            dangerouslySetInnerHTML={{ __html: projectInfo?.description || "" }}
            className="text-xs font-normal leading-[150%] text-[#68706A] py-2"
          />
          <p>{projectInfo?.status}</p>
          <p>{projectInfo?.totalPaid}</p>
          <p>{projectInfo?.totalTimeline}</p>
          <p>{moment(projectInfo?.createdAt).format("MM-DD-YYYY")}</p>
          <p>{projectInfo?.progress}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewProjectInfo;
