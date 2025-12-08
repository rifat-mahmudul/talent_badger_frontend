// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { Calendar, Code2, DollarSign, Github, MapPin } from "lucide-react";
// import Image from "next/image";
// import React from "react";
// import { SingleServiceUserResponse } from "./single-service-data-type";
// import moment from "moment";
// import DashboardCardsSkeleton from "@/app/(account)/account/_components/dashboard-header-skeleton";
// import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
// import { useTeamStore } from "@/store/teamStore";
// import { toast } from "sonner";
// import Link from "next/link";

// const IndividualService = ({ id }: { id: string }) => {
//   const addMember = useTeamStore((state) => state.addMember);
//   const team = useTeamStore((state) => state.team);

//   const { data, isLoading, error, isError } =
//     useQuery<SingleServiceUserResponse>({
//       queryKey: ["single-service", id],
//       queryFn: async () => {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         return res.json();
//       },
//     });

//   const details = data?.data;

//   const handleAddToTeam = () => {
//     if (!details?._id) return;

//     if (team.find((m) => m._id === details._id)) {
//       toast.error(`${details?.firstName} is already in your team!`);
//       return;
//     }

//     if (team.length >= 10) {
//       toast.error("Team is full! Remove someone to add a new member.");
//       return;
//     }

//     addMember(details);
//     toast.success(`${details?.firstName} added to your team!`);
//   };

//   let content;

//   if (isLoading) {
//     content = (
//       <div>
//         <DashboardCardsSkeleton />
//       </div>
//     );
//   } else if (isError) {
//     content = (
//       <div className="">
//         <ErrorContainer message={error?.message || "Something went wrong"} />
//       </div>
//     );
//   } else {
//     content = (
//       <div className="w-full container mx-auto bg-white rounded-lg p-8 lg:p-12">
//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
//           {/* Left Side - Image */}
//           <div className="flex-shrink-0">
//             <div className="w-full lg:w-[629px] h-[700px] relative rounded-lg overflow-hidden">
//               <Image
//                 src={details?.profileImage || ""}
//                 alt={details?.firstName || ""}
//                 fill
//                 className="object-cover object-center"
//                 priority
//               />
//             </div>
//           </div>

//           {/* Right Side - Content */}
//           <div className="flex-1 flex flex-col">
//             {/* Name */}
//             <h2 className="text-[32px] font-semibold text-[#0d7377] mb-6">
//               {details?.firstName} {details?.lastName}
//             </h2>

//             {/* Badges */}
//             <div className="mb-3">
//               {/* Badge Name */}
//               {details?.badge?.name && (
//                 <p className="font-semibold mb-1">Badge: {details.badge.name}</p>
//               )}

//               <div className="flex gap-1">
//                 {Array.isArray(details?.badge)
//                   ? details.badge.map((url, index) => (
//                     <Image
//                       key={index}
//                       src={url}
//                       alt={`Badge ${index + 1}`}
//                       width={15}
//                       height={15}
//                       className="rounded-full"
//                     />
//                   ))
//                   : details?.badge?.badge?.map((url, index) => (
//                     <Image
//                       key={index}
//                       src={url}
//                       alt={`Badge ${index + 1}`}
//                       width={20}
//                       height={20}
//                       className="rounded-full"
//                     />
//                   ))}
//               </div>
//             </div>


//             {/* Info Items */}
//             <div className="space-y-3 mb-6">
//               <div className="flex items-center gap-3 text-gray-600">
//                 <Code2 className="w-5 h-5 flex-shrink-0" />
//                 <span className="text-sm text-[#929292]">
//                   {details?.skills?.join(", ")}
//                 </span>
//               </div>
//               <div className="flex items-center gap-3 text-gray-600">
//                 <MapPin className="w-5 h-5 flex-shrink-0" />
//                 <span className="text-sm text-[#929292]">{details?.location}</span>
//               </div>
//               <div className="flex items-center gap-3 text-gray-600">
//                 <DollarSign className="w-5 h-5 flex-shrink-0" />
//                 <span className="text-sm text-[#929292]">{details?.rate}/hrs</span>
//               </div>
//               <div className="flex items-center gap-3 text-gray-600">
//                 <Calendar className="w-5 h-5 flex-shrink-0" />
//                 <span className="text-sm text-[#929292]">
//                   {moment(details?.createdAt).format("DD MM YYYY")}
//                 </span>
//               </div>
//               <div className="flex items-center gap-3 text-gray-600">
//                 <Github className="w-5 h-5 flex-shrink-0" />
//                 {details?.gitHubLink && (
//                   <Link href={details.gitHubLink} target="_blank">
//                     <span className="text-sm text-[#147575]">{details.gitHubLink}</span>
//                   </Link>
//                 )}
//               </div>
//             </div>

//             {/* Biography */}
//             <p className="text-sm text-[#616161] leading-relaxed mb-8 text-justify">
//               {details?.bio || ""}
//             </p>

//             {/* CV & Certifications */}
//             <div className="mb-8">
//               <h2 className="text-[20px] font-medium text-[#147575] mb-4">
//                 Documents
//               </h2>
//               <div className="flex flex-row gap-3">
//                 {details?.cv && (
//                   <a
//                     href={details.cv}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="px-4 py-2 text-sm text-[#147575] border-[#147575] border rounded-md  transition-colors"
//                   >
//                     View CV
//                   </a>
//                 )}
//                 {details?.certifications && (
//                   <a
//                     href={details.certifications}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="px-4 py-2 text-sm text-white bg-[#00383B] rounded-md hover:bg-[#0d7377]/90 transition-colors"
//                   >
//                     View Certifications
//                   </a>
//                 )}
//               </div>
//             </div>

//             {/* Expertise Section */}
//             <div className="mb-8">
//               <div className="flex flex-wrap gap-3">
//                 {details?.expertise?.map((tag) => (
//                   <span
//                     key={tag}
//                     className="px-4 py-2 text-sm text-[#147575] border border-[#147575] rounded-md hover:bg-[#0d7377]/5 transition-colors"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Profession */}
//             <div className="mb-8">
//               <h2 className="text-[20px] font-medium text-[#0d7377] mb-4">
//                 Profession
//               </h2>
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
//                   <svg
//                     className="w-6 h-6"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <circle cx="12" cy="12" r="10" />
//                     <path d="M12 6v6l4 2" />
//                   </svg>
//                 </div>
//                 <span className="font-semibold text-gray-900">
//                   {details?.professionTitle}
//                 </span>
//               </div>
//             </div>

//             {/* Action Button */}
//             <div className="mt-auto">
//               {details?.userstatus === "available" ? (
//                 <button
//                   onClick={handleAddToTeam}
//                   className="bg-[#00383B] text-white px-6 py-3 rounded-md font-medium hover:bg-[#0d7377]/90 transition-colors"
//                 >
//                   Add {details?.firstName} To Your Team
//                 </button>
//               ) : (
//                 <div
//                   className="
//         col-span-1 
//         w-full 
//         px-6 py-3 
//         bg-red-50 
//         text-red-700 
//         text-sm 
//         rounded-xl 
//         border border-red-200
//         shadow-sm
//       ">This engineer is not available</div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return <div>{content}</div>;
// };

// export default IndividualService;


"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Code2,
  DollarSign,
  Github,
  MapPin,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import moment from "moment";
import DashboardCardsSkeleton from "@/app/(account)/account/_components/dashboard-header-skeleton";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import { useTeamStore } from "@/store/teamStore";
import { toast } from "sonner";

// Types (keep these in a separate file ideally)
export interface BadgeItem {
  _id: string;
  name: string;
  badge: string[]; // array of image URLs
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SingleUser {
  _id: string;
  email: string;
  password: string;
  role: string;
  status: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  professionTitle: string;
  bio: string;
  rate: number | null;
  skills: string[];
  userstatus: "available" | "busy" | "inactive";
  expertise: string[];
  industry: string;
  service: string;
  location: string;
  walletBalance: number;
  balance: number;
  totalEarned: number;
  completedProjectsCount: number;
  avgRating: number;
  badge?: BadgeItem[];
  level: number;
  ismanager: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastLogin: string;
  experience?: number | null;
  gitHubLink?: string;
  cv?: string;
  certifications?: string;
}

export interface SingleServiceUserResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: SingleUser;
}

const IndividualService = ({ id }: { id: string }) => {
  const addMember = useTeamStore((state) => state.addMember);
  const team = useTeamStore((state) => state.team);

  const { data, isLoading, error, isError } = useQuery<SingleServiceUserResponse>({
    queryKey: ["single-service", id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    },
  });

  const user = data?.data;

  const handleAddToTeam = () => {
    if (!user?._id) return;

    if (team.some((m) => m._id === user._id)) {
      toast.error(`${user.firstName} is already in your team!`);
      return;
    }

    if (team.length >= 10) {
      toast.error("Team limit reached (10 members max)");
      return;
    }

    addMember(user);
    toast.success(`${user.firstName} added to your team!`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <DashboardCardsSkeleton />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="container mx-auto py-12">
        <ErrorContainer message={error?.message || "User not found"} />
      </div>
    );
  }

  return (
    <div className="w-full container mx-auto rounded-xl  overflow-hidden my-8">
      <div className="p-6 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Profile Image */}
          <div className="lg:col-span-1">
            <div className="relative w-full h-96 lg:h-full min-h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={user.profileImage || "/placeholder-avatar.jpg"}
                alt={`${user.firstName} ${user.lastName}`}
                fill
                className="object-cover "
                priority
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-2 flex flex-col ">
            {/* Badges Gallery */}
            {user.badge && user.badge.length > 0 && (
              <div className="mb-6">
                <h4 className="text-md font-semibold text-[#0d7377] mb-3">
                  Badges & Achievements
                </h4>
                <div className="flex flex-wrap gap-4">
                  {user.badge.map((badgeItem) => (
                    <div key={badgeItem._id} className="flex flex-col items-center text-center">
                      <div
                        className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm hover:scale-110 transition-transform"
                        title={badgeItem.name}
                      >
                        <Image
                          src={badgeItem.badge[0]} // only first image
                          alt={badgeItem.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-700 mt-1">
                        {badgeItem.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}




            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{user.skills.join(", ")}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{user.location || "Remote"}</span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700 font-medium">
                  ${user.rate || "Negotiable"} / hour
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  Joined {moment(user.createdAt).format("MMM YYYY")}
                </span>
              </div>
              {user.gitHubLink && (
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-gray-500" />
                  <Link
                    href={user.gitHubLink}
                    target="_blank"
                    className="text-[#147575] hover:underline flex items-center gap-1"
                  >
                    GitHub <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>

            {/* Bio */}
            {user.bio && (
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-[#0d7377] mb-3">About</h4>
                <p className="text-gray-600 leading-relaxed text-justify">{user.bio}</p>
              </div>
            )}

            {/* Expertise Tags */}
            {user.expertise.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#0d7377] mb-3">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {user.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-teal-50 text-[#0d7377] rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}


            {/* Documents */}
            {(user.cv || user.certifications) && (
              <div className="mb-5">
                <h4 className="text-lg font-semibold text-[#0d7377] mb-4">
                  Documents
                </h4>
                <div className="flex gap-4">
                  {user.cv && (
                    <a
                      href={user.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 bg-white border border-[#147575] text-[#147575] rounded-lg hover:bg-[#147575]/5 transition"
                    >
                      <span>View CV</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {user.certifications && (
                    <a
                      href={user.certifications}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 bg-[#00383B] text-white rounded-lg hover:bg-[#0d7377]/90 transition"
                    >
                      <span>Certifications</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="mb-5">
              <h4 className="text-lg font-semibold text-[#0d7377] mb-4">Profession</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900">{user.professionTitle}</span>
              </div>  
            </div>

            {/* Add to Team Button */}
            <div className="mt-auto ">
              {user.userstatus === "available" ? (
                <button
                  onClick={handleAddToTeam}
                  className="w-full md:w-auto px-8 py-4 bg-[#00383B] text-white font-semibold rounded-lg hover:bg-[#0d7377]/90 transition shadow-lg"
                >
                  Add {user.firstName} to Your Team
                </button>
              ) : (
                <div className="w-full text-center py-4 px-6 bg-red-50 text-red-700 rounded-xl border border-red-200 font-medium">
                  This engineer is currently not available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualService;