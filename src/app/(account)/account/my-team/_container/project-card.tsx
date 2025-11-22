"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamMember } from "./team-member";
import { useState } from "react";
import ScheduleTheMeetingModal from "./schedule-the-meeting-modal";
import { Project } from "./projects-data-type";

export function ProjectCard({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div>
      <Card className="flex flex-col overflow-hidden bg-white border-[1px] border-[#EEEEEE] shadow-lg rounded-[8px]">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-[#343A40] leading-[150%]">
            {project.title}
          </CardTitle>
          <p className="text-xs font-normal text-[#9A9EA2] leading-[150%] pt-1">
            {project.description}
          </p>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-6">
          {/* Team Members */}
          <div className="space-y-[2px]">
            {project?.approvedEngineers?.map((member) => (
              <TeamMember
                key={member._id}
                member={member}
                projectId={project._id}
              />
            ))}
          </div>

          {/* Project Progress */}
         <div>
          {
            project?.progress < 100 &&(
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
            )
          }
         </div>

          {/* Arrange Meeting Button */}
          <div>
            <button
              className="w-full h-[48px] rounded-[8px] bg-[#147575] px-4 py-2 font-semibold text-[#F8F9FA] text-sm leading-[150%]"
              onClick={() => setIsOpen(true)}
            >
              {
                project.progress === 100 ? "Payment" : "Arrange Meeting"
              }
              
            </button>
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
