"use client";
import { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useProfileAvatarUpdate, useProfileQuery } from "@/hooks/apiCalling";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function SideSetting() {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;
  const getProfile = useProfileQuery(token);
  const profileData = getProfile.data?.data;
  const { mutate, isPending } = useProfileAvatarUpdate(token);

  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Set existing profile image once data is loaded
  useEffect(() => {
    if (profileData?.profileImage) {
      setImageUrl(profileData.profileImage);
    }
  }, [profileData?.profileImage]);

  // When avatar is clicked
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // When file is selected
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl);

      // Immediately call mutate to upload the avatar
      mutate({ avatar: file });
    }
  };

  const { mutateAsync, isPending: levelupPending } = useMutation({
    mutationKey: ["level-up-request"],
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/badge/request`,
        {
          method: "POST",
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
    },
    onError: (error) => {
      toast.success(error?.message);
    },
  });

  const handleLevelUp = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.log(`error : ${error}`);
    }
  };

  return (
    <Card className="w-full max-w-[408px] overflow-hidden border-0 shadow-lg">
      <div
        className="h-44"
        style={{
          background: "linear-gradient(135deg, #147575 0%, #DAF9FF 100%)",
        }}
      />
      <div className="relative px-6 pb-6">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={handleAvatarClick}
        >
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-white shadow-md">
              {isPending ? (
                <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-full">
                  <Loader2 className="animate-spin h-8 w-8 text-teal-500" />
                </div>
              ) : (
                <AvatarImage
                  src={imageUrl || "/placeholder.svg"}
                  alt="Profile Image"
                />
              )}
              <AvatarFallback className="text-2xl bg-gray-200 text-gray-600">
                {profileData?.firstName?.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            {!isPending && (
              <div className="absolute bottom-2 right-2 bg-white rounded-full p-0.5">
                <CheckCircle2 className="h-6 w-6 text-teal-500 fill-teal-500" />
              </div>
            )}
          </div>
        </div>

        {/* Name and Role */}
        <div className="pt-20 text-center mb-6">
          <h2 className="text-xl font-semibold text-teal-700 mb-1">
            {profileData?.firstName}
          </h2>
          <p className="text-sm text-gray-500">{profileData?.role}</p>
        </div>

        {/* Information List */}
        <div className="space-y-3">
          <InfoRow
            label="Name:"
            value={profileData?.firstName + " " + profileData?.lastName}
          />
          <InfoRow label="Email:" value={profileData?.email || "-"} />
          {/* <InfoRow label="Phone:" value={profileData?.phone || "-"} /> */}
          <InfoRow label="Location:" value={profileData?.location || "-"} />
          <InfoRow
            label="Member Since:"
            value={
              profileData?.createdAt
                ? new Date(profileData.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "-"
            }
          />
        </div>

        <div className="mt-5">
          <Button
            disabled={levelupPending}
            className="disabled:cursor-not-allowed"
            onClick={handleLevelUp}
          >
            {levelupPending
              ? `Request For Level Up...`
              : `Request For Level Up`}
          </Button>
        </div>
      </div>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex text-sm gap-3">
      <span className="text-[#343A40] font-medium text-[16px]">{label}</span>
      <span className="text-[#68706A]">{value}</span>
    </div>
  );
}
