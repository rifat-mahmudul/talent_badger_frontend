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
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Image from "next/image";

const BadgeSelect = ({ token }: { token: string }) => {
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

  const badges = badgesResponse.data?.data || [];

  if (isLoading) {
    return (
      <div>
        <Label htmlFor="badge">Select Badge</Label>
        <Select disabled>
          <SelectTrigger id="badge">
            <SelectValue placeholder="Loading badges..." />
          </SelectTrigger>
        </Select>
      </div>
    );
  }

  return (
    <div>
      <Label htmlFor="badge">Select Badge</Label>
      <Select name="badge">
        <SelectTrigger id="badge">
          <SelectValue placeholder="Choose a badge" />
        </SelectTrigger>
        <SelectContent>
          {badges.length > 0 ? (
            badges.map((badge: any) => (
              <SelectItem key={badge._id} value={badge._id} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  {badge.badge && badge.badge.length > 0 && (
                    <div className="relative w-6 h-6">
                      <Image
                        src={badge.badge[0]}
                        alt={badge.name}
                        fill
                        className="object-cover rounded"
                        sizes="24px"
                      />
                    </div>
                  )}
                  <span>{badge.name}</span>
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
    </div>
  );
};

export default BadgeSelect;
