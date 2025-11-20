"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface SessionUser {
  accessToken: string;
}

const AcceptDecline = ({ id }: { id: string }) => {
  const { data: session } = useSession();
  const token = (session?.user as SessionUser)?.accessToken;
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: acceptPending } = useMutation({
    mutationKey: ["accept-project"],
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}/approve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return await res.json();
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["active-project"] });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const handleAccept = async (id: string) => {
    try {
      await mutateAsync(id);
    } catch (error) {
      console.log(`error : ${error}`);
    }
  };

  return (
    <div className="space-x-5 mt-5">
      <Button disabled={acceptPending} onClick={() => handleAccept(id)}>
        {acceptPending ? "Accept Request..." : "Accept Request"}
      </Button>
      <Button variant={"outline"}>Decline</Button>
    </div>
  );
};

export default AcceptDecline;
