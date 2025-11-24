import React from "react";
import PersonalInfo from "../_components/PersonalInfo";
import { SideSetting } from "../_components/SideSetting";

const Page = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#EDEEF1] min-h-screen">
      <div
        className="
          flex flex-col 
          lg:flex-row 
          gap-6 
          w-full           
          mx-auto 
          transition-all 
          duration-300 
          items-stretch
        "
      >
          <SideSetting/>
          <PersonalInfo  />
      
      </div>
    </div>
  );
};

export default Page;
