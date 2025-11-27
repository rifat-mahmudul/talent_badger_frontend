"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ApprovedEngineer } from "./projects-data-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function TeamMember({
  member,
  projectId,
}: {
  member: ApprovedEngineer;
  projectId: string;
}) {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["manager-assign", projectId],
    mutationFn: async ({ engineerId }: { engineerId: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}/assign`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
           body: JSON.stringify({
            engineerId: engineerId,
          }),
        }
      );
      return await res.json();
    },
    onSuccess: (data)=>{
      if(!data?.success){
        toast?.error(data?.message || "Something went wrong");
        return;
      }
      toast?.success(data?.message || "Manager assigned successfully")
       queryClient.invalidateQueries({
      queryKey: ["manager-assign"], 
    });
    }
  });

  

  const handleManager = (id:string) => {
    mutate({ engineerId: id });
  };

  return (
    <div className=" flex items-center justify-between gap-3 rounded-md bg-muted/40 p-3 transition-colors duration-200 hover:bg-muted/60">
      <div className="flex items-center gap-3 ">
        <Avatar className="h-8 w-8">
          <AvatarImage src={member?.engineer?.profileImage || ""} />
          <AvatarFallback>{member?.engineer?.firstName || ""}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold text-[#147575] leading-[150%]">
            {member?.engineer?.firstName} {member?.engineer?.lastName}
          </p>
          <p className="text-xs text-[#929292] leading-[150%] font-normal pt-1">
            {member?.engineer?.professionTitle || ""}
          </p>
        </div>
      </div>

      {/* Manager Button */}
      <div>
        <button
          disabled={isPending} 
          onClick={()=>{handleManager(member?.engineer?._id)}}
          className={`bg-[#D3F7F7] text-sm text-[#0C4545] px-4 py-1 rounded-lg`}
        >
          {/* Spinner while loading */}
          {isPending && (
            <span className="h-3 w-3 border-2 border-[#0C4545] border-t-transparent rounded-full animate-spin"></span>
          )}
          {
            member?.isManager ? "Manager" : "Make Manager"
          }

          
          
        </button>
      </div>
    </div>
  );
}
