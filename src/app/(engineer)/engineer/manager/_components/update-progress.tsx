"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

interface Payload {
  progress: string;
}

interface Props {
  projectId: string;
  // project: any;
  token: string;
}

const UpdateProgress = ({ projectId, token }: Props) => {
  const [progress, setProgress] = useState("");
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["update-progress"],
    mutationFn: async (payload: Payload) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}/progress`,
        {
          method: "PUT",
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

  const handleUpdate = async () => {
    const payload = {
      progress,
    };

    try {
      await mutateAsync(payload);
    } catch (error) {
      console.log(`error ${error}`);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <Input
        onChange={(e) => setProgress(e.target.value)}
        placeholder="Update"
        min={0}
        max={100}
        type="number"
        className="w-[110px]"
      />
      <Button
        // disabled={isPending || }
        onClick={handleUpdate}
        className="disabled:cursor-not-allowed"
      >
        {isPending ? "Update..." : "Update"}
      </Button>
    </div>
  );
};

export default UpdateProgress;
