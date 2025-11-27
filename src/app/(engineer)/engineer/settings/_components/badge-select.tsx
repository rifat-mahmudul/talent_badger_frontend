/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useProfileQuery } from "@/hooks/apiCalling";

const BadgeSelect = ({ token }: { token: string }) => {
  const [selectedBadge, setSelectedBadge] = useState("");
  const queryClient = useQueryClient();
  const getProfile = useProfileQuery(token);

  const { data: badgesResponse = {}, isLoading } = useQuery({
    queryKey: ["badges"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/badge`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });

      const data = await res.json();
      return data;
    },
  });

  const badges = useMemo(() => {
    return badgesResponse.data?.data || [];
  }, [badgesResponse.data?.data]);

  // Get current user's badge from profile
  const currentUserBadge = useMemo(() => {
    return getProfile.data?.data?.badge;
  }, [getProfile.data?.data?.badge]);

  const { mutateAsync } = useMutation({
    mutationKey: ["request-badge"],
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/badge/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({ badgeId: id }),
        }
      );

      return await res.json();
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Successfully requested for badge.");
      queryClient.invalidateQueries({ queryKey: ["badges"] });
      // Also invalidate profile query to refresh current badge
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const handleBadgeSelect = async (badgeId: string) => {
    setSelectedBadge(badgeId);
    try {
      await mutateAsync(badgeId);
    } catch (error) {
      console.log(`error : ${error}`);
    }
  };

  useEffect(() => {
    if (badges.length > 0 && !selectedBadge) {
      setSelectedBadge(badges[0]._id);
    }
  }, [badges, selectedBadge]);

  // Get selected badge details
  const selectedBadgeDetails = useMemo(() => {
    return badges.find((badge: any) => badge._id === selectedBadge);
  }, [badges, selectedBadge]);

  if (isLoading) {
    return (
      <div>
        <Label htmlFor="badge">Request For Badge</Label>
        <Select disabled>
          <SelectTrigger id="badge">
            <SelectValue placeholder="Loading badges..." />
          </SelectTrigger>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Current Badge Display */}
      {currentUserBadge && (
        <div className="p-4 border rounded-lg bg-muted/50">
          <Label className="text-sm font-medium mb-2 block">
            Current Badge
          </Label>
          <div className="flex items-center gap-3 p-3 bg-background rounded-md">
            {currentUserBadge.badge?.[0] && (
              <div className="relative w-10 h-10">
                <Image
                  src={currentUserBadge.badge[0]}
                  alt={currentUserBadge.name}
                  fill
                  className="object-cover rounded"
                  sizes="40px"
                />
              </div>
            )}
            <div>
              <p className="font-medium">{currentUserBadge.name}</p>
              <p className="text-sm text-muted-foreground">
                Your current achievement level
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Badge Selection */}
      <div>
        <Label htmlFor="badge">Request New Badge</Label>
        <Select value={selectedBadge} onValueChange={handleBadgeSelect}>
          <SelectTrigger id="badge" className="h-12">
            {selectedBadgeDetails ? (
              <div className="flex items-center gap-2">
                {selectedBadgeDetails.badge?.[0] && (
                  <div className="relative w-6 h-6">
                    <Image
                      src={selectedBadgeDetails.badge[0]}
                      alt={selectedBadgeDetails.name}
                      fill
                      className="object-cover rounded"
                      sizes="24px"
                    />
                  </div>
                )}
                <span>{selectedBadgeDetails.name}</span>
              </div>
            ) : (
              <SelectValue placeholder="Choose a badge" />
            )}
          </SelectTrigger>
          <SelectContent>
            {badges.length > 0 ? (
              badges.map((badge: any) => (
                <SelectItem
                  key={badge?._id}
                  value={badge?._id}
                  className="cursor-pointer py-3"
                >
                  <div className="flex items-center gap-3">
                    {badge.badge && badge.badge.length > 0 && (
                      <div className="relative w-8 h-8">
                        <Image
                          src={badge?.badge[0]}
                          alt={badge?.name}
                          fill
                          className="object-cover rounded"
                          sizes="32px"
                        />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium">{badge?.name}</span>
                      {currentUserBadge?._id === badge?._id && (
                        <span className="text-xs text-green-600">
                          Current Badge
                        </span>
                      )}
                    </div>
                  </div>
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-badges" disabled>
                No badges available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground mt-2">
          Select a badge to request an upgrade
        </p>
      </div>
    </div>
  );
};

export default BadgeSelect;
