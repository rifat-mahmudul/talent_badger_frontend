"use client";

import { useQuery } from "@tanstack/react-query";
import { Calendar, Code2, DollarSign, Github, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import { SingleServiceUserResponse } from "./single-service-data-type";
import moment from "moment";
import DashboardCardsSkeleton from "@/app/(account)/account/_components/dashboard-header-skeleton";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import { useTeamStore } from "@/store/teamStore";
import { toast } from "sonner";
import Link from "next/link";

const IndividualService = ({ id }: { id: string }) => {
  const addMember = useTeamStore((state) => state.addMember);
  const team = useTeamStore((state) => state.team);

  const { data, isLoading, error, isError } =
    useQuery<SingleServiceUserResponse>({
      queryKey: ["single-service", id],
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return res.json();
      },
    });

  const details = data?.data;

  const handleAddToTeam = () => {
    if (!details?._id) return;

    if (team.find((m) => m._id === details._id)) {
      toast.error(`${details?.firstName} is already in your team!`);
      return;
    }

    if (team.length >= 10) {
      toast.error("Team is full! Remove someone to add a new member.");
      return;
    }

    addMember(details);
    toast.success(`${details?.firstName} added to your team!`);
  };

  let content;

  if (isLoading) {
    content = (
      <div>
        <DashboardCardsSkeleton />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="">
        <ErrorContainer message={error?.message || "Something went wrong"} />
      </div>
    );
  } else {
    content = (
      <div className="w-full container mx-auto bg-white rounded-lg p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Side - Image */}
          <div className="flex-shrink-0">
            <div className="w-full lg:w-[629px] h-[700px] relative rounded-lg overflow-hidden">
              <Image
                src={details?.profileImage || ""}
                alt={details?.firstName || ""}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 flex flex-col">
            {/* Name */}
            <h2 className="text-[32px] font-semibold text-[#0d7377] mb-6">
              {details?.firstName} {details?.lastName}
            </h2>

            {/* Badges */}
            <div className="mb-3">
              <div className="flex gap-1">
                {Array.isArray(details?.badge)
                  ? details.badge.map((url, index) => (
                    <Image
                      key={index}
                      src={url}
                      alt={`Badge ${index + 1}`}
                      width={15}
                      height={15}
                      className="rounded-full"
                    />
                  ))
                  : details?.badge?.badge?.map((url, index) => (
                    <Image
                      key={index}
                      src={url}
                      alt={`Badge ${index + 1}`}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  ))}
              </div>
            </div>

            {/* Info Items */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-600">
                <Code2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm text-[#929292]">
                  {details?.skills?.join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm text-[#929292]">{details?.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <DollarSign className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm text-[#929292]">{details?.rate}/hrs</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm text-[#929292]">
                  {moment(details?.createdAt).format("DD MM YYYY")}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Github className="w-5 h-5 flex-shrink-0" />
                {details?.gitHubLink && (
                  <Link href={details.gitHubLink} target="_blank">
                    <span className="text-sm text-[#147575]">{details.gitHubLink}</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Biography */}
            <p className="text-sm text-[#616161] leading-relaxed mb-8 text-justify">
              {details?.bio || ""}
            </p>

            {/* CV & Certifications */}
            <div className="mb-8">
              <h2 className="text-[20px] font-medium text-[#147575] mb-4">
                Documents
              </h2>
              <div className="flex flex-row gap-3">
                {details?.cv && (
                  <a
                    href={details.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm text-[#147575] border-[#147575] border rounded-md  transition-colors"
                  >
                    View CV
                  </a>
                )}
                {details?.certifications && (
                  <a
                    href={details.certifications}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm text-white bg-[#00383B] rounded-md hover:bg-[#0d7377]/90 transition-colors"
                  >
                    View Certifications
                  </a>
                )}
              </div>
            </div>

            {/* Expertise Section */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {details?.expertise?.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-sm text-[#147575] border border-[#147575] rounded-md hover:bg-[#0d7377]/5 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Profession */}
            <div className="mb-8">
              <h2 className="text-[20px] font-medium text-[#0d7377] mb-4">
                Profession
              </h2>
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
                <span className="font-semibold text-gray-900">
                  {details?.professionTitle}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-auto">
              <button
                onClick={handleAddToTeam}
                className="bg-[#00383B] text-white px-6 py-3 rounded-md font-medium hover:bg-[#0d7377]/90 transition-colors"
              >
                Add {details?.firstName} To Your Team
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default IndividualService;
