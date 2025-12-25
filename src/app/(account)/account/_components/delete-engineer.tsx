"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Dialog, DialogContent } from "@/components/ui/dialog";

export interface SingleProjectAPIResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    project: Project;
  };
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  client: Client;
  engineers: ProjectEngineer[];
  status: string;
  totalPaid: number;
  ndaAgreement: string[];
  progress: number;
  totalTimeline: number;
  startDate: string;
  deliveryDate: string;
  usedAmount: number;
  approvedEngineers: ApprovedEngineer[];
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

export interface EngineerUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  professionTitle?: string;
  rate?: number;
}

export interface ProjectEngineer {
  _id: string;
  engineer: EngineerUser;
  allocatedHours: number;
}

export interface ApprovedEngineer {
  engineer: string;
  status: string;
  isManager: boolean;
  _id: string;
  progress: number;
}

/* =======================
   COMPONENT
======================= */

const DeleteEngineerModal = ({
  open,
  onOpenChange,
  projectId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}) => {
  const queryClient = useQueryClient();
  const session = useSession();

  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  /* ===== Get Single Project ===== */
  const { data, isLoading } = useQuery<SingleProjectAPIResponse>({
    queryKey: ["single-project", projectId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}`
      );
      return await res.json();
    },
    enabled: !!projectId,
  });

  /* ===== Delete Engineer ===== */
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-project-engineer"],
    mutationFn: async ({ engineerId }: { engineerId: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}/engineer/${engineerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // body: JSON.stringify({
          //   engineerIds: [engineerId],
          // }),
        }
      );

      return await res.json();
    },
    onSuccess: (res) => {
      if (!res?.success) {
        toast.error(res?.message || "Something went wrong!");
      
        return;
      }

    toast.success(res?.message || "Engineer removed successfully");

    // 🔄 refetch project
    queryClient.invalidateQueries({ queryKey: ["upcoming-projects", projectId] });

    onOpenChange(false);
    },
  });

  const handleEngineerDelete = (engineerId: string) => {
    mutate({ engineerId });
  };

  const project = data?.data?.project;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <div className="space-y-4">
          {/* ===== Title ===== */}
          <div className="text-center">
            <h2 className="text-xl font-semibold">{project?.title}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Pending Engineers List
            </p>
          </div>

          {/* ===== Engineer List ===== */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {isLoading ? (
              <p className="text-center text-sm">Loading...</p>
            ) : project?.engineers?.length === 0 ? (
              <p className="text-sm text-center border border-gray-300 p-6 rounded-xl">
                No engineers assigned to this project.
              </p>
            ) : (
              project?.engineers?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-muted/40 p-3 rounded-xl hover:bg-muted transition"
                >
                  {/* Left */}
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        item.engineer.profileImage || "/images/no-user.jpeg"
                      }
                      alt={item.engineer.firstName}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                    <div>
                      <h4 className="font-medium text-sm">
                        {item.engineer.firstName} {item.engineer.lastName}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {item.engineer.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Hours: {item.allocatedHours}
                      </p>
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    disabled={isPending}
                    onClick={() =>
                      handleEngineerDelete(item.engineer._id)
                    }
                    className="p-2 rounded-full hover:bg-red-100 transition disabled:opacity-50"
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEngineerModal;
