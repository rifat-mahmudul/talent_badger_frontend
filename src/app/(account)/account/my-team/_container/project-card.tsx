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
      <Card className="h-full md:h-[405px] relative flex flex-col overflow-hidden bg-white border-[1px] border-[#EEEEEE] shadow-lg rounded-[8px]">
        <CardHeader className="pb-4">
          <CardTitle className="text-base md:text-lg font-semibold text-[#343A40] leading-[150%]">
            {project.title}
          </CardTitle>
          <p className="text-sm font-normal text-[#9A9EA2] leading-[150%] pt-1 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: project.description }} />

        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-6">
          {/* Team Members */}
          <div className="space-y-[2px] h-[160px] overflow-scroll scrollbar-hide">
            {project?.approvedEngineers?.map((member) => (
              <TeamMember
                key={member._id}
                member={member}
                projectId={project._id}
                manager={project}

              />
            ))}
          </div>

          {/* Project Progress */}
          <div>
            {project?.progress < 100 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-normal leading-[150%] text-[#616161]">
                    Project Progress
                  </span>
                  <span className="text-sm font-medium leading-[150%] text-[#147575]">
                    {project.progress}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#EEEEEE]">
                  <div
                    className="h-full bg-[#147575] transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Arrange Meeting Button */}
          <div className="absolute left-0 right-0 bottom-4 px-5">
            {project?.progress === 100 ? (
              <button
                className="w-full h-[48px] rounded-[8px] bg-[#147575] px-4 py-2 font-semibold text-[#F8F9FA] text-sm leading-[150%]"
                onClick={handlePayment}
                disabled={isPending}
              >
                {isPending ? "Pay..." : "Payment"}
              </button>
            ) : (
              <button
                className="w-full h-[48px] rounded-[8px] bg-[#147575] px-4 py-2 font-semibold text-[#F8F9FA] text-sm leading-[150%]"
                onClick={() => setIsOpen(true)}
              >
                Arrange Meeting
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Meeting Modal */}
      {isOpen && (
        <ScheduleTheMeetingModal
          open={isOpen}
          onOpenChange={(value) => setIsOpen(value)}
          projectId={project._id}
        />
      )}
    </div>
  );
}
