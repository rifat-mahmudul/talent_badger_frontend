import Hero from "@/components/Home/Hero";
import React from "react";
import HandSelected from "./_components/handSelected";
import BestConsultant from "./_components/BestConsultant";
import ServiceCta from "./_components/ServiceCta";
import ReadyToStart from "@/components/ReadyToStart";
import AskQ from "../faqs/_components/AskQ";
import ServiceContainer from "./_components/service-container";

const page = () => {
  return (
    <div>
      <Hero
        title1="Hire Excellence"
        colorTitile="Where Breakthroughs"
        title2="Begin"
        description="We connect companies with vetted engineering talent and cross-functional product teams—mechanical, electrical, firmware, software, data, and more—so you can build better products with less risk, lower cost, and faster timelines."
        image="/heroimage2.jpg"
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
        <ReadyToStart />
        <AskQ />
      </div>
    </div>
  );
};

export default page;
