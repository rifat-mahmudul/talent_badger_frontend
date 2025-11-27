"use client";

import React from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

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
  engineers: Engineer[];
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

export interface Engineer {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

export interface ApprovedEngineer {
  engineer: string; // engineer _id reference
  status: string; // approved/pending etc.
  isManager: boolean;
  _id: string;
  progress: number;
}

const DeleteEngineerModal = ({
  open,
  onOpenChange,
  projectId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}) => {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  // single project get by id
  const { data } = useQuery<SingleProjectAPIResponse>({
    queryKey: ["single-project", projectId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}`
      );
      return await res.json();
    },
  });

  console.log(data);

  //   delete projecte engineer
  const { mutate } = useMutation({
    mutationKey: ["delete-project-engineer"],
    mutationFn: async ({ engineerId }: { engineerId: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}/engineer`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            engineerIds: [engineerId],
          }),
        }
      );
      return await res.json();
    },
    onSuccess: (data) => {
      if (!data?.success) {
        toast?.error(data?.message || "Something went wrong!");
        return;
      }
      toast.success(data?.message || "Engineer Deleted successfully");
      onOpenChange(false);
    },
  });

  const handleEngineerDelete = (id: string) => {
    mutate({ engineerId: id });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md p-6">
          <div className="space-y-3">
            {/* Title */}
            <div className="text-center">
              <h2 className="text-xl font-semibold">
                {data?.data?.project?.title}
              </h2>
              <p className="text-sm text-[#333333] mt-4">
                Pending Engineers Lists
              </p>
            </div>

            {/* Engineer List */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {data?.data?.project?.engineers?.length === 0 ? (
                <p className="text-sm text-center border border-gray-300 p-6 rounded-[12px] mt-2">
                  No engineers assigned to this project.
                </p>
              ) : (
                data?.data?.project?.engineers?.map((item) => (
                  <div
                    key={item?._id}
                    className="flex items-center justify-between bg-muted/40 p-3 rounded-xl hover:bg-muted transition"
                  >
                    {/* Left Side */}
                    <div className="flex items-center gap-3">
                      <Image
                        src={item?.profileImage || "/images/no-user.jpeg"}
                        alt={item?.firstName || "engineer name"}
                        width={200}
                        height={200}
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                      <div>
                        <h4 className="font-medium text-sm">
                          {item?.firstName} {item?.lastName}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {item?.email}
                        </p>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleEngineerDelete(item?._id)}
                      className="p-2 rounded-full hover:bg-red-100 transition"
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
    </div>
  );
};

export default DeleteEngineerModal;
