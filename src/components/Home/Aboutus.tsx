import Image from "next/image";
import React from "react";

const Aboutus = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 my-16 lg:my-24 items-center">
        
        {/* Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-[40px] text-[#147575] mb-6">
            <span className="text-black">About Talent </span>Badger
          </h2>

          <h4 className="font-semibold text-lg sm:text-xl text-gray-600 mb-2">
            What we do
          </h4>
          <p className="text-[#9A9EA2] text-base sm:text-lg leading-relaxed mb-4">
            Talent Badger connects companies with curated engineering pods and
            specialists for hardware, firmware, and connected products. We make
            world-class talent accessible, flexible, and fast — exactly when you need it.
          </p>

          <h4 className="font-semibold text-lg sm:text-xl text-gray-600 mb-2">
            Who it’s for
          </h4>
          <p className="text-[#9A9EA2] text-base sm:text-lg leading-relaxed mb-4">
            Founders, engineering leaders, and product teams who need additional
            capacity but don’t want the overhead of building a full internal team.
          </p>

          <h4 className="font-semibold text-lg sm:text-xl text-gray-600 mb-2">
            How it works
          </h4>
          <p className="text-[#9A9EA2] text-base sm:text-lg leading-relaxed mb-4">
            We pre-vet every engineer and assign skill badges based on deep experience.
            You receive a small, curated shortlist matched to your project — with
            transparent rates and clear expectations from the start.
          </p>

          <ul className="text-[#9A9EA2] text-base sm:text-lg list-disc ml-5 space-y-2 mb-6">
            <li>Standardized and transparent rate bands</li>
            <li>Clear scopes with example deliverables</li>
            <li>No surprise staffing fees</li>
            <li>Curated shortlist instead of endless resumes</li>
            <li>Deep technical vetting for real expertise</li>
          </ul>

          <p className="text-[#9A9EA2] text-base sm:text-lg leading-relaxed">
            Talent Badger isn’t just a talent platform — it’s your strategic partner
            for faster, smarter engineering execution.
          </p>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[420px]">
            <Image
              src="/aboutus.png"
              alt="About Talent Badger"
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Aboutus;
