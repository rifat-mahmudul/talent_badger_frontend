/* eslint-disable @typescript-eslint/no-explicit-any */

import { BarChart3, CheckCircle2, DollarSign } from "lucide-react";
import Image from "next/image";
import { UserItem } from "./service-data-type";
import Link from "next/link";
import { toast } from "sonner";
import { useTeamStore } from "@/store/teamStore";


const badgeColors = [
  "bg-red-100 text-red-800",
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-purple-100 text-purple-800",
  "bg-pink-100 text-pink-800",
  "bg-teal-100 text-teal-800",
  "bg-orange-100 text-orange-800",
  "bg-indigo-100 text-indigo-800",
  "bg-cyan-100 text-cyan-800",
  "bg-lime-100 text-lime-800",
  "bg-amber-100 text-amber-800",
  "bg-emerald-100 text-emerald-800",
  "bg-fuchsia-100 text-fuchsia-800",
  "bg-violet-100 text-violet-800",
  "bg-sky-100 text-sky-800",
];


export default function ServiceCard({ data }: { data: UserItem }) {
  const addMember = useTeamStore((state) => state.addMember);
  const team = useTeamStore((state) => state.team);

  const handleAddToTeam = () => {
    if (!data?._id) return;
    if (team.find((m) => m._id === data._id)) {
      toast.error(`${data.firstName} is already in your team!`);
      return;
    }
    if (team.length >= 10) {
      toast.error("Team is full! Remove someone to add a new member.");
      return;
    }
    addMember({ ...data, rate: data.rate ?? null, userstatus: data.userstatus as "available" | "busy" | "inactive" });
    toast.success(`${data.firstName} added to your team!`);
  };

  return (
    <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-lg border flex flex-col justify-between border-gray-200 p-5">

      {/* TOP: AVATAR + INFO */}
      <div className="flex items-start gap-5">

        <div className="relative">
          <Image
            src={data?.profileImage || "/avatar.png"}
            alt={data?.firstName}
            width={130}
            height={130}
            className="w-32 h-32 rounded-full object-cover border-2 border-white shadow"
          />
        </div>

        <div className="flex-2 space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">
            {data?.firstName} {data?.lastName}
          </h2>

          <p className="text-[15px] text-gray-600 mt-1">
            {data?.professionTitle}
          </p>

          {data?.experience && (
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              {data.experience} years experience
            </p>
          )}

          <p className="text-sm text-gray-700 mt-1">
            {data?.userstatus === "available" ? (
              <span className="text-green-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Available
              </span>
            ) : (
              <span className="text-red-600 font-medium">Not Available</span>
            )}
          </p>
          {data?.rate != null && data?.rate > 0 && (
            <p className="flex items-center gap-1 text-sm text-gray-700">
              <DollarSign className="w-4 h-4 text-teal-600" />
              ${data?.rate}/hr
            </p>
          )}
        </div>
      </div>

      {/* BIO */}
      <div className="mt-4">
        <p className="text-gray-500 text-xs">
          {data?.bio
            ? data.bio.slice(0, 60) + (data.bio.length > 60 ? "..." : "")
            : "No bio available."}
        </p>
      </div>

      {/* BADGES */}
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        {Array.isArray(data?.badge) && data?.badge?.length > 0 ? (
          data?.badge?.map((item, index) => {
            const color = badgeColors[index % badgeColors.length];

            return (
              <div
                key={index}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${color}`}
              >
                {/* Badge image */}
                {Array.isArray(item?.badge) && item?.badge?.length > 0 && (
                  <Image
                    src={item.badge[0]}
                    alt={item.name}
                    width={28}
                    height={28}
                    className="rounded-full border"
                  />
                )}

                {/* Badge name */}
                <span className="text-sm font-medium">
                  {item.name}
                </span>
              </div>
            );
          })
        ) : (
          <span className="text-sm text-gray-500">No badges available</span>
        )}
      </div>

      {/* SKILLS */}
      <div className="flex flex-wrap gap-2 mt-5">
        {data?.skills?.slice(0, 3).map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full border border-teal-100"
          >
            {skill}
          </span>
        ))}
      </div>


      {/* BUTTONS */}
      <div className="mt-6 flex gap-3">
        <Link href={`/services/${data?._id}`} className="w-1/2">
          <button className="w-full py-2.5 text-sm font-medium border border-gray-800 rounded-lg text-gray-900 hover:bg-gray-50">
            View Profile
          </button>
        </Link>

        {data?.userstatus === "available" ? (
          <button
            onClick={handleAddToTeam}
            className="w-1/2 py-2.5 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700"
          >
            Work With {data.firstName}
          </button>
        ) : (
          <div className="w-1/2 py-2.5 bg-red-100 text-red-700 text-sm rounded-lg text-center">
            Not Available
          </div>
        )}
      </div>
    </div>
  );
}
