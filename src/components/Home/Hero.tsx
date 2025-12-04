

"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import BrandComponent from "./Shared/BrandComponent";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface HeroProps {
  title1: string;
  title2: string;
  description: string;
  colorTitile: string;
  image: string;
  buttonName1: string;
  buttonName2: string;
  buttonHref1: string;
  buttonHref2: string;
}

const Hero: React.FC<HeroProps> = ({
  title1,
  title2,
  description,
  colorTitile,
  image,
  buttonName1,
  buttonName2,
  buttonHref1,
  buttonHref2,
}) => {
  // Detect pathname
  const pathname = usePathname();

  // Hide button1 if current page contains "services"
  const hideButton1 = pathname.includes("services");

  return (
    <div className="bg-[#EEFFFF]">
      {/* HERO SECTION */}
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 py-10 px-5">
        
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">

            {/* Avatar Row */}
            <div className="flex flex-row flex-wrap items-center justify-center md:justify-start mb-6 gap-2">
              <div className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </div>

              <p className="text-[#8E938F] font-normal text-[14px]">
               10+ years engineering experience
              </p>
            </div>

            {/* Title + Description */}
            <h1 className="text-[32px] sm:text-[40px] md:text-[56px] font-semibold leading-tight">
              {title1} <span className="text-[#147575]">{colorTitile}</span> {title2}
            </h1>
            <p className="mt-4 text-[#8E938F] text-[15px] sm:text-[16px] leading-7 max-w-[600px] mx-auto md:mx-0">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">

              {/* Conditionally Hide Button 1 */}
              {!hideButton1 && (
                <Link href={buttonHref1}>
                  <Button className="bg-[#00383B] py-3 hover:bg-[#147575] w-full sm:w-auto">
                    {buttonName1}
                  </Button>
                </Link>
              )}

              <Link href={buttonHref2}>
                <Button className="border border-[#00383B] text-[#00383B] bg-transparent hover:bg-transparent w-full sm:w-auto">
                  {buttonName2}
                </Button>
              </Link>
            </div>
            <p className="text-gray-600  text-center mt-4  ">Takes ~5 minutes. No commitment.</p>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="w-full md:w-1/3 flex justify-center">
          <Image
            src={image}
            alt="Hero Image"
            width={1200}
            height={600}
            className="rounded-xl w-full h-[250px] sm:h-[400px] md:h-[600px]  object-center"
          />
        </div>
      </div>

      {/* BRAND SECTION */}
      <div className="bg-[#DDFFFF] mx-auto py-7 px-4">
        <BrandComponent />
      </div>
    </div>
  );
};

export default Hero;
