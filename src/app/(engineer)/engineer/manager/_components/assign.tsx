"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  projectId: string;
  engineerId: string;
  token: string;
}

interface Payload {
  projectId: string;
  engineerId: string;
  hours: string;
}

const Assign = ({ projectId, engineerId, token }: Props) => {
  const [hours, setHours] = useState("");
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["assign-hours"],
    mutationFn: async (payload: Payload) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/assignHour`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      return await res.json();
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const handleAssign = async () => {
    const payload = {
      projectId,
      engineerId,
      hours,
    };

    try {
      await mutateAsync(payload);
    } catch (error) {
      console.log(`error : ${error}`);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <Input
        onChange={(e) => setHours(e.target.value)}
        placeholder="Hours"
        className="w-[110px] text-sm"
      />
      <Button
        disabled={isPending}
        size="sm"
        className="disabled:cursor-not-allowed"
        onClick={handleAssign}
      >
        {isPending ? "Assign..." : "Assign"}
      </Button>
    </div>
  );
};

export default Assign;
