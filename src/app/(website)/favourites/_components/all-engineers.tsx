"use client";

import { useTeamStore } from "@/store/teamStore";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Users, X, CheckCircle2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { EngineerDatatype } from "./engineer-data-type";

interface AllEngineersProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  onSubmit?: (selectedMembers: EngineerDatatype[]) => void;
}

const AllEngineers = ({
  open,
  onOpenChange,
  projectId,
//   onSubmit,
}: AllEngineersProps) => {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken?: string })?.accessToken;

  const team = useTeamStore((state) => state.team);
  const removeMember = useTeamStore((state) => state.removeMember);
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Sync Select All checkbox
  useEffect(() => {
    if (team.length > 0 && selected.length === team.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selected, team.length]);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelected(selectAll ? [] : team.map((m) => m._id));
  };

  // Mutation to add engineers to project
  const mutation = useMutation({
    mutationKey: ["update-project-engineers", projectId],
    mutationFn: async (engineerIds: string[]) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}/engineer`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ engineerIds }), // Correct payload
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to add engineers");
      }

      return res.json();
    },
    onSuccess: (data, engineerIds) => {
      const selectedMembers = team.filter((m) => engineerIds.includes(m._id));
      console.log(selectedMembers)
    //   onSubmit?.(selectedMembers);

      // Step 1: Remove selected engineers from localStorage
      const savedFavourites = localStorage.getItem("favouriteEngineers");
      if (savedFavourites) {
        try {
          const favourites: EngineerDatatype[] = JSON.parse(savedFavourites);
          const updatedFavourites = favourites.filter(
            (eng) => !engineerIds.includes(eng._id)
          );
          localStorage.setItem(
            "favouriteEngineers",
            JSON.stringify(updatedFavourites)
          );
        } catch (err) {
          console.error(
            "Failed to parse favouriteEngineers from localStorage",
            err
          );
        }
      }

      // Step 2: Also update Zustand store (teamStore) to reflect removal immediately
      engineerIds.forEach((id) => removeMember(id));

      // Step 3: Success toast
      toast.success(
        `${engineerIds.length} engineer${
          engineerIds.length > 1 ? "s" : ""
        } added to project & removed from favourites!`
      );

      // Step 4: Refetch active projects + close modal
      queryClient.invalidateQueries({
        queryKey: ["favourites-active-projects"],
      });

      onOpenChange(false);
      setSelected([]);
    },

    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleSubmit = () => {
    if (selected.length === 0) return;
    mutation.mutate(selected);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-7 h-7 text-[#00383B]" />
            Select Engineers
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-1">
            Choose engineers to add to your project
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {team.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No favourite engineers yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Select All */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={toggleSelectAll}
                  className="w-5 h-5"
                />
                <label className="text-sm font-semibold text-gray-700 cursor-pointer flex-1">
                  Select All ({team.length})
                </label>
                <span className="text-sm text-gray-500">
                  {selected.length} selected
                </span>
              </div>

              {/* Engineers List */}
              {team.map((member) => {
                const isSelected = selected.includes(member._id);

                return (
                  <div
                    key={member._id}
                    className={cn(
                      "group relative flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer",
                      isSelected
                        ? "border-[#00383B] bg-[#00383B]/5 shadow-lg"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    )}
                    onClick={() => toggleSelect(member._id)}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(member._id)}
                      className="w-6 h-6"
                      onClick={(e) => e.stopPropagation()}
                    />

                    <div className="relative">
                      <Image
                        src={member.profileImage || "/default-avatar.png"}
                        alt={member.firstName}
                        width={72}
                        height={72}
                        className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {member.level}
                      </div>
                      {isSelected && (
                        <div className="absolute inset-0 rounded-full ring-4 ring-[#00383B] ring-opacity-30" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-gray-900">
                        {member.firstName} {member.lastName}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-semibold text-[#00383B]">
                          ${member.rate}/hr
                        </span>{" "}
                        •{" "}
                        {member.skills?.slice(0, 2).join(", ") || "Engineering"}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Users className="w-4 h-4" />
                        {member.completedProjectsCount || 0} projects
                      </div>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-7 h-7 text-[#00383B]" />
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeMember(member._id);
                        setSelected((prev) =>
                          prev.filter((id) => id !== member._id)
                        );
                      }}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-6 py-5 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            <strong>{selected.length}</strong> engineer
            {selected.length !== 1 ? "s" : ""} selected
          </p>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setSelected([]);
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={selected.length === 0 || mutation.isPending}
              className="bg-[#00383B] hover:bg-[#005356] text-white font-medium px-8"
            >
              {mutation.isPending
                ? "Adding..."
                : selected.length === 0
                ? "Select Engineers"
                : `Add ${selected.length} Engineer${
                    selected.length > 1 ? "s" : ""
                  }`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AllEngineers;
