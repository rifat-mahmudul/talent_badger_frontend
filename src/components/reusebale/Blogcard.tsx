"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

const BlogCard = () => {
  return (
    <Card className="w-full max-w-[400px] bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden">
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative w-full h-[220px]">
          <Image
            src="/resentBlog1.jpg"
            alt="blog"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
        </div>

        {/* Date + Read Time */}
        <div className="text-[#8E938F] text-[12px] font-normal p-4 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Calendar size={16} /> 14 August, 2025
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} /> 12 min read
          </div>
        </div>

        {/* Blog Title + Excerpt */}
        <div className="px-4 py-3 space-y-2">
          <h2 className="text-[#191D23] mb-1 font-medium text-[18px] leading-snug hover:text-[#147575] cursor-pointer transition-colors">
            Choosing the Talent Badger
          </h2>
          <p className="text-[#68706A] text-[14px] font-normal leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus, elit
            nibh et nisl, pellentesque scelerisque faucibus facilisis at.
            Placerat morbi sem viverra viverra diam lectus odio orci...
            <span className="text-[#147575] font-medium cursor-pointer hover:underline">
              {" "}
              Read More
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
