import React from "react";
import { Card, CardContent } from "../ui/card";
import { Industry } from "@/types/ndustries";
import Image from "next/image";

const IndustriesCard = ({ industry }: { industry: Industry }) => {
    
    return (
        <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
            <div className="w-full h-[220px] md:h-[320px] relative">
                <Image
                    src={industry?.image || "/assets/images/blog/blog-1.png"}
                    alt="industry"
                    fill
                    className="object-cover"
                />
            </div>
            <CardContent className="p-5 space-y-2">
                <h2 className="text-[#147575] font-semibold text-lg md:text-xl">
                  {industry?.name}
                </h2>
                <p className="text-[#616161] text-sm md:text-base leading-relaxed">
                   {industry?.discription}
                </p>
            </CardContent>
        </Card>
    );
};

export default IndustriesCard;
