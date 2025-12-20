"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamMember } from "./team-member";
import { useState } from "react";
import ScheduleTheMeetingModal from "./schedule-the-meeting-modal";
import { Project } from "./projects-data-type";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

export function ProjectCard({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  // payment api integration

  const { mutate, isPending } = useMutation({
    mutationKey: ["payment"],
    mutationFn: async (data: { projectId: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Payment request failed");
      }

      return result;
    },
    onSuccess: (data) => {
      // Redirect to Stripe Checkout
      if (data?.data?.url) {
        window.location.href = data.data.url;
      }
    },
    onError: (error: Error) => {
      console.error("Payment Error:", error);
      alert(error?.message || "Payment failed. Please try again.");
    },
  });

  const handlePayment = () => {
    mutate({ projectId: project?._id })
  };

  return (
    <div>
      <Card className="relative flex h-full md:h-[500px] flex-col overflow-hidden rounded-xl border border-[#EEEEEE] bg-white shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Header */}
        <CardHeader className="pb-3 space-y-1">
          <CardTitle className="text-base md:text-lg font-semibold text-[#343A40] leading-[150%] line-clamp-1">
            {project.title}
          </CardTitle>

          <p
            className="text-sm font-normal text-[#9A9EA2] leading-[150%] line-clamp-2"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        </CardHeader>

        {/* Content */}
        <CardContent className="flex flex-1 flex-col gap-5 pb-20">
          {/* Team Members */}
          <div>
            <p className="text-xs font-medium text-[#6C757D] mb-2">
              Team Members
            </p>

            <div className="space-y-2 max-h-[160px] overflow-y-auto scrollbar-hide pr-1">
              {project?.approvedEngineers?.map((member) => (
                <TeamMember
                  key={member._id}
                  member={member}
                  projectId={project._id}
                  manager={project}
                />
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-normal text-[#616161]">
                Project Progress
              </span>
              <span className="font-medium text-[#147575]">
                {project.progress}%
              </span>
            </div>

            <div className="h-2 w-full rounded-full bg-[#EEEEEE] overflow-hidden">
              <div
                className="h-full bg-[#147575] transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Amounts */}
          <div className="space-y-3 rounded-lg bg-muted/30 p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#616161]">Total Amount</span>
              <span className="font-medium text-[#147575]">
                {project.totalPaid}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-[#616161]">
                Total Engineer Paid
              </span>
              <span className="font-medium text-[#147575]">
                {project.approvedEngineersTotalAmount}
              </span>
            </div>
          </div>
        </CardContent>

        {/* Bottom Action */}
        <div className="absolute inset-x-0 bottom-4 px-5">
          {project?.progress === 100 ? (
            <button
              onClick={handlePayment}
              disabled={isPending || project?.isPaymentDistributed}
              className="w-full h-12 rounded-lg bg-[#147575] text-sm font-semibold text-white transition hover:bg-[#0f5f5f] disabled:opacity-60"
            >
              {isPending ? "Processing Payment..." : "Payment"}
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="w-full h-12 rounded-lg bg-[#147575] text-sm font-semibold text-white transition hover:bg-[#0f5f5f]"
            >
              Arrange Meeting
            </button>
          )}
        </div>
      </Card>

      {/* Schedule Meeting Modal */}
      {isOpen && (
        <ScheduleTheMeetingModal
          open={isOpen}
          onOpenChange={setIsOpen}
          projectId={project._id}
        />
      )}
    </div>

  );
}
