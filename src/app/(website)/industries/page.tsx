import Hero from '@/components/Home/Hero'
import IndustriesCard from '@/components/reusebale/IndustriesCard'
import React from 'react'
import ServiceCta from '../services/_components/ServiceCta'
import ReadyToStart from '@/components/ReadyToStart'
import AskQ from '../faqs/_components/AskQ'

const page = () => {
    return (
        <div>
            <Hero title1="Powering" colorTitile="Progress Across Every" title2="Industry" description="From healthcare and medtech to aerospace, robotics, AI, and energy, our consultants bring unmatched real-world expertise to every challenge. We help businesses innovate boldly, adapt to changing markets, and scale without limits—delivering faster results, smarter strategies, and world-class solutions at a fraction of traditional costs." image="/industry.jpg" buttonName1="Assemble Your Team" buttonName2="Help Me Build My Team " buttonHref1="/" buttonHref2="/" />
            <div className='container mx-auto px-4 md:px-0 my-20 space-y-[160px]'>
                <div>
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
                <ServiceCta />
                <div>
                    <div className='mb-[60px]' >
                        <h2 className='text-center text-[#282828] font-bold text-[40px]'>Our  <span className='text-[#147575]'>All Industries</span></h2>
                        <p className='text-[#9A9EA3] font-normal text-[16px] text-center'>Our consultants bring real-world experience from top sectors to solve your toughest challenges.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 mb lg:grid-cols-3  gap-6">
                        <IndustriesCard />
                        <IndustriesCard />
                        <IndustriesCard />
                    </div>
                </div>
                <ReadyToStart />
                <AskQ />
            </div>
        </div>
    )
}

export default page