import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";

const ProjectManagements = () => {
  const value = 30;

  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white p-5 border border-gray-200 rounded-lg">
          <h4 className="text-xl font-medium">Website Redesign Project</h4>
          <p className="mt-2 opacity-60">
            Skilled software engineers, developers, and architects with deep
            knowledge across a wide range of technologies.
          </p>

          {/* person info */}
          <div className="flex items-center object-contain gap-3 mt-5">
            <div className="flex items-center gap-3 flex-1 min-w-[200px]">
              <Image
                src={"/placeholder.jpg"}
                alt="img.png"
                width={1000}
                height={1000}
                className="h-10 w-10 rounded-full flex-shrink-0"
              />
              <div className="min-w-0">
                <h5 className="text-[#147575] font-medium truncate">
                  Matthew Warkentin
                </h5>
                <h5 className="text-sm text-gray-500 truncate">Developer</h5>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Input placeholder="Hours" className="w-[110px]" />
              <Button>Assign</Button>
            </div>
          </div>

          {/* project progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-gray-500">Project Progress</h4>
              <h4 className="text-[#147575]">{value}%</h4>
            </div>
            <Progress value={value} />
          </div>

          <div className="mt-6">
            <Button className="w-full h-[45px]">Arrange Meeting</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagements;
