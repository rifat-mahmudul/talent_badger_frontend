"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ServicePaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function ServicePagination({
  page,
  limit,
  total,
  onPageChange,
}: ServicePaginationProps) {
  const totalPages = Math.ceil(total / limit);

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-4 py-6 select-none">
      {/* Prev Button */}
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className={cn(
          "size-10 flex items-center justify-center rounded-full border transition",
          page === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100 text-gray-600"
        )}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Dots */}
      <div className="flex items-center gap-2">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              "size-3 rounded-full transition",
              p === page ? "bg-teal-700 scale-110" : "bg-teal-100"
            )}
          ></button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className={cn(
          "size-10 flex items-center justify-center rounded-full border transition",
          page === totalPages
            ? "bg-teal-50 text-teal-300 cursor-not-allowed"
            : "bg-teal-50 hover:bg-teal-100 text-teal-700"
        )}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
