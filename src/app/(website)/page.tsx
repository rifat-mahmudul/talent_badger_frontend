import Aboutus from "@/components/Home/Aboutus";
import Hero from "@/components/Home/Hero";
import HowItWork from "@/components/Home/HowItWork";
import ServiceCard from "./services/_components/ServiceCard";
import ReadyToStart from "@/components/ReadyToStart";
import IndustriesCard from "@/components/reusebale/IndustriesCard";
import AskQ from "./faqs/_components/AskQ";
import Blogcard from "@/components/reusebale/Blogcard";

export default function Home() {
  return (
    <div>
      <Hero title1="Unlock the" colorTitile="Future Where Ideas Take Flight" title2="And Breakthroughs Begin" description="Access a curated network of world-class consultants who bring expertise across every industry. Scale your team instantly, pay only for what you need, and enjoy a seamless experience from start to finish." image="/heroimage2.jpg" buttonName1="Assemble Your Team" buttonName2="Assemble Your Team" buttonHref1="/" buttonHref2="/" />
      <div className="px-4 md:px-0">
        <Aboutus />
        <HowItWork />
        <div className="container mx-auto my-[120px]">
          <div>
            <h2 className='text-[#147575] font-bold text-[40px] mb-4'>Talent Picker</h2>
            <p className="text-[#929292] font-normal text-[18px]">Meet a curated selection of trusted professionals whose expertise, reliability, and excellence set the benchmark in every project.</p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-6 justify-items-center my-10">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <ServiceCard key={index} />
              ))}
          </div>
        </div>
        <ReadyToStart />
        <div className="container mx-auto ">
          <div className='mb-[60px]' >
            <h2 className='text-center text-[#282828] font-bold text-[40px]'>Expertise <span className='text-[#147575]'>Across Industries</span></h2>
            <p className='text-[#9A9EA3] font-normal text-[16px] text-center'>Our consultants bring real-world experience from top sectors to solve your toughest challenges.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 mb lg:grid-cols-3  gap-6">
            <IndustriesCard />
            <IndustriesCard />
            <IndustriesCard />
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

          {/* Blog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <Blogcard key={index} />
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
