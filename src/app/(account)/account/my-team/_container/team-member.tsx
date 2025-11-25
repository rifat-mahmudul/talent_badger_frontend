


"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Engineer } from "./projects-data-type";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function TeamMember({
  member,
  projectId,
}: {
  member: Engineer;
  projectId: string;
}) {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { mutate, isPending } = useMutation({
    mutationKey: ["manager-assign", projectId],
    mutationFn: async (data: { engineerId: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}/assign`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      return await res.json();
    },
  });

  const handleManager = () => {
    if (isPending) return;
    mutate({ engineerId: member._id });
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-muted/40 p-3 transition-colors duration-200 hover:bg-muted/60">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={member.profileImage || ""} />
          <AvatarFallback>{member.firstName || ""}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold text-[#147575] leading-[150%]">
            {member.firstName} {member.lastName}
          </p>
          <p className="text-xs text-[#929292] leading-[150%] font-normal pt-1">
            {member.professionTitle || ""}
          </p>
        </div>
      </div>

      {/* Manager Button */}
      <div>
        <button
          disabled={isPending || member.ismanager } 
          onClick={handleManager}
          className={`text-xs font-medium py-1 px-2 rounded flex items-center gap-1
            ${member.ismanager ? "bg-[#D3F7F7] text-[#0C4545]" : "bg-[#D3F7F7] text-[#0C4545]"}
            ${isPending && "opacity-60 cursor-not-allowed"}
          `}
        >
          {/* Spinner while loading */}
          {isPending && (
            <span className="h-3 w-3 border-2 border-[#0C4545] border-t-transparent rounded-full animate-spin"></span>
          )}

          {isPending
            ? "Updating..."
            : member.ismanager
            ? "Manager"
            : "Make Manager"}
        </button>
      </div>
    </div>
  );
}
