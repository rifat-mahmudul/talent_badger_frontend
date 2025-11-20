"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TeamMemberProps {
  member: {
    id: number
    name: string
    role: string
    status: string
  }
}

export function TeamMember({ member }: TeamMemberProps) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-muted/40 p-3 transition-colors duration-200 hover:bg-muted/60">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.id}`} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold text-[#147575] leading-[150%]">{member.name}</p>
          <p className="text-xs text-[#929292] leading-[150%] font-normal pt-1">{member.role}</p>
        </div>
      </div>
      <button
        className={member.status === "active" ? "bg-[#D3F7F7] text-[#0C4545] text-xs font-medium leading-[150%] py-1 px-2 rounded-[2px]" : ""}
      >
        {member.status === "active" ? "Make Manager" : "Inactive"}
      </button>
    </div>
  )
}
