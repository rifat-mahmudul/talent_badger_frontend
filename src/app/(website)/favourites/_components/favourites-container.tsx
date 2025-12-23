
"use client";

import Image from "next/image";
import { useTeamStore } from "@/store/teamStore";
import { X, Heart, Users, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import StatementOfWorkForm from "../../services/_components/statement-of-work-form";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

type AssignedHour = {
  engineerId: string;
  hours: number;
};

export default function FavouritesContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState<Record<string, number>>({});

  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;
  const role = (session?.user as { role: string })?.role;

  const team = useTeamStore((state) => state.team);
  const removeMember = useTeamStore((state) => state.removeMember);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("assignedEngineerHours") || "[]"
    ) as AssignedHour[];

    const map = saved.reduce<Record<string, number>>((acc, cur) => {
      acc[cur.engineerId] = cur.hours;
      return acc;
    }, {});

    setHours(map);
  }, []);

  const isAssigned = (engineerId: string) => {
    const saved = JSON.parse(
      localStorage.getItem("assignedEngineerHours") || "[]"
    ) as AssignedHour[];

    return saved.some((item) => item.engineerId === engineerId);
  };

  const handleStartSOW = () => {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (role === "engineer") {
      toast.error("Only user can create SOW");
      return;
    }

    setIsOpen(true);
  };


  const handleAssignHours = (engineerId: string) => {
    const assignedHours = hours[engineerId];

    if (!assignedHours || assignedHours <= 0) {
      toast.error("Please enter valid hours");
      return;
    }

    const existing = JSON.parse(
      localStorage.getItem("assignedEngineerHours") || "[]"
    ) as AssignedHour[];

    const updated = existing.some(
      (item) => item.engineerId === engineerId
    )
      ? existing.map((item) =>
        item.engineerId === engineerId
          ? { ...item, hours: assignedHours }
          : item
      )
      : [...existing, { engineerId, hours: assignedHours }];

    localStorage.setItem(
      "assignedEngineerHours",
      JSON.stringify(updated)
    );
   window.location.reload();
    toast.success("Hours assigned successfully");
  };


  const handleRemoveEngineer = (engineerId: string) => {
    // remove from zustand
    removeMember(engineerId);

    // remove from localStorage
    const saved = JSON.parse(
      localStorage.getItem("assignedEngineerHours") || "[]"
    ) as AssignedHour[];

    const updated = saved.filter(
      (item) => item.engineerId !== engineerId
    );

    localStorage.setItem(
      "assignedEngineerHours",
      JSON.stringify(updated)
    );

    // remove from local state
    setHours((prev) => {
      const copy = { ...prev };
      delete copy[engineerId];
      return copy;
    });

    toast.success("Engineer removed successfully");
  };

  const allEngineersAssigned = team.every((member) => {
    const assigned = hours[member._id];
    return assigned && assigned > 0;
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-100 text-red-600 mb-4">
              <Heart className="w-8 h-8" fill="currentColor" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              My Favourite Engineers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              You’ve saved {team.length}{" "}
              {team.length === 1 ? "engineer" : "engineers"} you love working
              with.
            </p>
          </div>

          {team.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-16 text-center">
              <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart className="w-16 h-16 text-gray-300" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                No favourites yet
              </h2>
              <p className="text-gray-500">
                Start adding engineers you’d love to work with again.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4">
                {team.map((member, idx) => {
                  const assigned = isAssigned(member._id);

                  return (
                    <div
                      key={member._id}
                      className={cn(
                        "group relative bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-all duration-300",
                        "hover:-translate-y-1"
                      )}
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex items-center justify-between gap-5">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <Image
                            src={member.profileImage || "/default-avatar.png"}
                            alt={member.firstName}
                            width={80}
                            height={80}
                            className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {member.level}
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-gray-900">
                            {member.firstName} {member.lastName}
                          </h2>
                          <p className="text-sm text-gray-500 mt-1">
                            <span className="font-medium text-gray-700">
                              ${member.rate}/hr
                            </span>
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {member.completedProjectsCount || 0} projects
                              completed
                            </span>
                          </div>
                        </div>

                        {/* Assign Hours */}
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            min={1}
                            value={hours[member._id] || ""}
                            disabled={assigned}
                            onChange={(e) =>
                              setHours((prev) => ({
                                ...prev,
                                [member._id]: Number(e.target.value),
                              }))
                            }
                            className={cn(
                              "w-28 px-3 py-2 border rounded-lg text-sm",
                              assigned &&
                              "bg-gray-100 cursor-not-allowed"
                            )}
                          />
                          <Button
                            size="sm"
                            disabled={assigned}
                            onClick={() =>
                              handleAssignHours(member._id)
                            }
                            className="bg-teal-600 hover:bg-teal-700 text-white"
                          >
                            {assigned ? "Assigned" : "Assign Hr"}
                          </Button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() =>
                            handleRemoveEngineer(member._id)
                          }
                          className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA (UNCHANGED UI) */}
              <div className="mt-12 text-center">
                <div className="inline-block bg-gradient-to-r from-[#00383B] to-[#005A5A] text-white rounded-2xl shadow-2xl p-8 max-w-2xl">
                  <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
                    <Users className="w-8 h-8" />
                    Ready to Start Your Project?
                  </h2>
                  <p className="text-white/90 mb-6">
                    Your dream team is waiting. Create your Statement of Work now.
                  </p>
                  <Button
                    size="lg"
                    onClick={handleStartSOW}
                    disabled={!allEngineersAssigned || team.length === 0}
                    className={cn(
                      "bg-white text-[#00383B] font-semibold text-lg px-10 py-6 rounded-xl shadow-lg transform transition-all duration-200",
                      !allEngineersAssigned || team.length === 0
                        ? "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-lg"
                        : "hover:bg-gray-100 hover:shadow-xl hover:scale-105"
                    )}
                  >
                    Start My SOW
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  {!allEngineersAssigned && team.length > 0 && (
                    <p className="text-sm text-red-300 mt-2">
                      Assign hours to all engineers to start SOW
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <StatementOfWorkForm open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
