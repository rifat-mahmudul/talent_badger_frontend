import Hero from "@/components/Home/Hero";
import React from "react";
import HandSelected from "./_components/handSelected";
import BestConsultant from "./_components/BestConsultant";
import ServiceCta from "./_components/ServiceCta";
import ReadyToStart from "@/components/ReadyToStart";
import AskQ from "../faqs/_components/AskQ";
import ServiceContainer from "./_components/service-container";
import HomepageBlog from "@/components/reusebale/HomepageBlog";

const page = () => {
  return (
    <div>
      <Hero
        title1="Engineering as a "
        colorTitile="Service Expert Teams on Demand"
        title2="to Accelerate Innovation."
        description="We connect companies with vetted engineering talent and cross-functional product teams—mechanical, electrical, firmware, software, data, and more—so you can build better products with less risk, lower cost, and faster timelines."
        image="/service.jpg"
        buttonName1="Assemble Your Team"
        buttonName2="Help Me Build My Team "
        buttonHref1="/services"
        buttonHref2="/build-your-team"
      />
      <div className="container mx-auto px-4 md:px-0">
        <HandSelected />
        <BestConsultant />
        <ServiceContainer />
        <ServiceCta />
        {/* Blog Section */}
        <div className="container mx-auto py-10">
          <div className="mb-[100px]">
            <h2 className="text-center text-[#282828] font-bold text-[40px]">
              Talent Badger <span className="text-[#147575]">Blog & Insights</span>
            </h2>
            <p className="text-[#9A9EA3] font-normal text-[16px] text-center">
              Stay updated with expert tips, industry trends, and practical strategies to master recruitment and talent management.
            </p>
          </div>
          <HomepageBlog />
        </div>
        <ReadyToStart />
        <AskQ />
      </div>
    </div>
  );
};

export default page;
