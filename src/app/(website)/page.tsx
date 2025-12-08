


'use client';

import Aboutus from "@/components/Home/Aboutus";
import Hero from "@/components/Home/Hero";
import HowItWork from "@/components/Home/HowItWork";
import ReadyToStart from "@/components/ReadyToStart";
import AskQ from "./faqs/_components/AskQ";
import HomepageBlog from "@/components/reusebale/HomepageBlog";
import ApiIndustry from "@/components/ApiIndustry";
import { useEffect, useState } from "react";
import { NewsletterModal } from "@/components/NewsLetter";
import TeamBuilderService from "./_components/team-builder";
import TopServices from "@/components/Home/top-services";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if modal was already shown
    const hasSeenNewsletter = localStorage.getItem('newsletter_shown');

    if (!hasSeenNewsletter) {
      // Random delay between 10 and 30 seconds
      const minDelay = 10_000; // 10 sec
      const maxDelay = 30_000; // 30 sec
      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;

      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, randomDelay);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      localStorage.setItem('newsletter_shown', 'true');
    }
  };

  return (
    <div className="mb-[20px]">
      <Hero
        title1="Build Your "
        colorTitile="Engineering Team in Days,"
        title2="Not Months"
        description="Talent Badger pairs companies with pre-vetted hardware, firmware, and product engineers — as complete pods or individual specialists — with transparent rates and guided scopes."
        image="/hero-cahnge1.png"
        buttonName1="I Need an Engineering Team"
        buttonName2="I Need a Single Specialist"
        buttonHref1="/services"
        buttonHref2="/build-your-team"
      />

      <div className="px-4 md:px-0">
        <div className="container mx-auto my-[120px]">
          <div className="pb-4 md:pb-6">
            <h2 className='text-[#147575] font-bold lg:text-[40px] text-xl  mb-4'>Explore Our Curated Talent Pool</h2>
            <p className="text-[#929292] font-normal lg:text-[18px] text-xs">Every engineer is vetted for technical depth, communication, and reliable delivery. Here’s a sample.</p>
          </div>
          <TeamBuilderService />
        </div>
        <TopServices />
        <Aboutus />
        <HowItWork />

        <ReadyToStart />
        <div className="container mx-auto">
          <div className='mb-[60px]'>
            <h2 className='text-center text-[#282828] font-bold text-[40px]'>Expertise <span className='text-[#147575]'>Across Industries</span></h2>
            <p className='text-[#9A9EA3] font-normal text-[16px] text-center'>Our consultants bring real-world experience from top sectors to solve your toughest challenges.</p>
          </div>
          <div>
            <ApiIndustry />
          </div>
        </div>
        <AskQ />

        {/* Blog Section */}
        <div className="container mx-auto">
          <div className="mb-[60px]">
            <h2 className="text-center text-[#282828] font-bold text-[40px]">
              Talent Badger <span className="text-[#147575]"> Insights</span>
            </h2>
            <p className="text-[#9A9EA3] font-normal text-[16px] text-center">
              Stay updated with expert tips, industry trends, and practical strategies to master recruitment and talent management.
            </p>
          </div>
          <HomepageBlog />
        </div>
      </div>

      {/* Newsletter Modal - Auto-opens once */}
      <NewsletterModal open={isModalOpen} onOpenChange={handleModalClose} />
    </div>
  );
}