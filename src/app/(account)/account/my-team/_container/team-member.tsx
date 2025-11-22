"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Engineer } from "./projects-data-type";

export function TeamMember({ member }: { member: Engineer }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-muted/40 p-3 transition-colors duration-200 hover:bg-muted/60">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={member?.profileImage || ""} />
          <AvatarFallback>{member?.firstName || ""}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold text-[#147575] leading-[150%]">
            {member.firstName} {member?.lastName}
          </p>
          <p className="text-xs text-[#929292] leading-[150%] font-normal pt-1">
            {member?.professionTitle || ""}
          </p>
        </div>
      </div>

      {/* button  */}
      <div>
        {member?.ismanager ? (
          <button className="bg-[#D3F7F7] text-[#0C4545] text-xs font-medium leading-[150%] py-1 px-2 rounded-[2px]">
            Manager
          </button>
        ) : (
          <button className="bg-[#D3F7F7] text-[#0C4545] text-xs font-medium leading-[150%] py-1 px-2 rounded-[2px]">
            Make Manager
          </button>
        )}
      </div>
    </div>
  );
}
