// import Aboutus from "@/components/Home/Aboutus";
// import Hero from "@/components/Home/Hero";
// import HowItWork from "@/components/Home/HowItWork";
// import ServiceCard from "./services/_components/ServiceCard";
// import ReadyToStart from "@/components/ReadyToStart";
// import AskQ from "./faqs/_components/AskQ";
// import HomepageBlog from "@/components/reusebale/HomepageBlog";
// import ApiIndustry from "@/components/ApiIndustry";

// export default function Home() {
//   return (
//     <div>
//       <Hero title1="Unlock the" colorTitile="Future Where Ideas Take Flight" title2="And Breakthroughs Begin" description="Access a curated network of world-class consultants who bring expertise across every industry. Scale your team instantly, pay only for what you need, and enjoy a seamless experience from start to finish." image="/heroimage2.jpg" buttonName1="Assemble Your Team" buttonName2="Assemble Your Team" buttonHref1="/" buttonHref2="/" />
//       <div className="px-4 md:px-0">
//         <Aboutus />
//         <HowItWork />
//         <div className="container mx-auto my-[120px]">
//           <div>
//             <h2 className='text-[#147575] font-bold text-[40px] mb-4'>Talent Picker</h2>
//             <p className="text-[#929292] font-normal text-[18px]">Meet a curated selection of trusted professionals whose expertise, reliability, and excellence set the benchmark in every project.</p>
//           </div>
//           <div className="grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-6 justify-items-center my-10">
//             {Array(10)
//               .fill(0)
//               .map((_, index) => (
//                 <ServiceCard key={index} />
//               ))}
//           </div>
//         </div>
//         <ReadyToStart />
//         <div className="container mx-auto ">
//           <div className='mb-[60px]' >
//             <h2 className='text-center text-[#282828] font-bold text-[40px]'>Expertise <span className='text-[#147575]'>Across Industries</span></h2>
//             <p className='text-[#9A9EA3] font-normal text-[16px] text-center'>Our consultants bring real-world experience from top sectors to solve your toughest challenges.</p>
//           </div>
//           <div >
//             <ApiIndustry />
//           </div>
//         </div>
//         <AskQ />
//         {/* Blog Section */}
//         <div className="container mx-auto">
//           <div className="mb-[60px]">
//             <h2 className="text-center text-[#282828] font-bold text-[40px]">
//               Talent Badger <span className="text-[#147575]">Blog & Insights</span>
//             </h2>
//             <p className="text-[#9A9EA3] font-normal text-[16px] text-center">
//               Stay updated with expert tips, industry trends, and practical strategies to master recruitment and talent management.
//             </p>
//           </div>

//           {/* Blog Grid */}
//           <HomepageBlog />
//         </div>

//       </div>
//     </div>
//   );
// }


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
    <div>
      <Hero
        title1="Unlock the"
        colorTitile="Future Where Ideas Take Flight"
        title2="And Breakthroughs Begin"
        description="Access a curated network of world-class consultants who bring expertise across every industry. Scale your team instantly, pay only for what you need, and enjoy a seamless experience from start to finish."
        image="/heroimage2.jpg"
        buttonName1="Assemble Your Team"
        buttonName2="Help Me Build My Team "
        buttonHref1="/services"
        buttonHref2="/build-your-team"
      />

      <div className="px-4 md:px-0">
        <TopServices/>
        <Aboutus />
        <HowItWork />
        <div className="container mx-auto my-[120px]">
          <div className="pb-4 md:pb-6">
            <h2 className='text-[#147575] font-bold text-[40px] mb-4'>Team Builder</h2>
            <p className="text-[#929292] font-normal text-[18px]">Meet a curated selection of trusted professionals whose expertise, reliability, and excellence set the benchmark in every project.</p>
          </div>
          <TeamBuilderService/>
        </div>
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
              Talent Badger <span className="text-[#147575]">Blog & Insights</span>
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