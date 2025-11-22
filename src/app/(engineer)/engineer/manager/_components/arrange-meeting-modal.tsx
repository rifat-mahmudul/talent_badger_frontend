/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface PropsTypes {
  onClose: (value: boolean) => void;
  projectId: string;
  token: string;
}

// Skeleton Component
const BookingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 animate-pulse">
          <div className="flex justify-between items-start mb-3">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
};

const ArrangeMeetingModal = ({ onClose, projectId, token }: PropsTypes) => {
  const { data: response, isPending } = useQuery({
    queryKey: ["projects", projectId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  const bookings = response?.data?.booking || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={() => onClose(false)}
        className="absolute inset-0 bg-black/15 bg-opacity-50 backdrop-blur-sm"
      ></div>

      <div className="relative bg-white rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90vh] overflow-y-auto p-8 scrollbar-hide">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-2xl font-medium text-gray-800">Meeting Schedule</h4>
          <button
            onClick={() => onClose(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {isPending ? (
            <BookingSkeleton />
          ) : bookings.length > 0 ? (
            <div className="space-y-4">
              <h5 className="text-lg font-medium text-gray-700">
                Booked Meetings ({bookings.length})
              </h5>
              {bookings.map((booking : any) => (
                <div
                  key={booking._id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h6 className="font-medium text-gray-900">
                        {formatDate(booking.date)}
                      </h6>
                      <p className="text-sm text-gray-500">
                        {formatTime(booking.time)}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Scheduled
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium mr-2">Meeting Link:</span>
                      <a
                        href={booking.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline truncate"
                      >
                        {booking.link}
                      </a>
                    </div>
                    <p className="text-xs text-gray-400">
                      Created: {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h5 className="text-lg font-medium text-gray-600 mb-1">No Meetings Scheduled</h5>
              <p className="text-gray-500">There are no booked meetings for this project yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArrangeMeetingModal;