

"use client"

import IndustriesCard from '@/components/reusebale/IndustriesCard'
import React from 'react'
import ServiceCta from '../services/_components/ServiceCta'
import ReadyToStart from '@/components/ReadyToStart'
import { useGetAllIndustry } from '@/hooks/apiCalling'
import { Skeleton } from "@/components/ui/skeleton"

const Industries = () => {
    const allIndustries = useGetAllIndustry();
    const industries = allIndustries.data?.data;
    const isLoading = allIndustries.isLoading;

    return (
        <div>
            <div className='container mx-auto px-4 md:px-0 my-20 space-y-[160px]'>
                <div>
                    <div className='mb-[60px]'>
                        <h2 className='text-center text-[#282828] font-bold text-[40px]'>
                            Expertise <span className='text-[#147575]'>Across Industries</span>
                        </h2>
                        <p className='text-[#9A9EA3] font-normal text-[16px] text-center'>
                            Our consultants bring real-world experience from top sectors to solve your toughest challenges.
                        </p>
                    </div>

                    {/* Skeleton + Real Data */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {isLoading &&
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="border p-4 rounded-lg shadow-sm space-y-4">
                                    <Skeleton className="w-full h-40 rounded-md" />
                                    <Skeleton className="w-3/4 h-5" />
                                    <Skeleton className="w-full h-4" />
                                    <Skeleton className="w-1/2 h-4" />
                                </div>
                            ))
                        }

                        {!isLoading && industries && industries.map((industry) => (
                            <IndustriesCard key={industry._id} industry={industry} />
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <ServiceCta />

                {/* ============================ ALL INDUSTRIES SECTION ============================ */}
                <div>
                    <div className='mb-[60px]'>
                        <h2 className='text-center text-[#282828] font-bold text-[40px]'>
                            Our <span className='text-[#147575]'>All Industries</span>
                        </h2>
                        <p className='text-[#9A9EA3] font-normal text-[16px] text-center'>
                            Our consultants bring real-world experience from top sectors to solve your toughest challenges.
                        </p>
                    </div>

                    {/* Skeleton + Real Data */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {isLoading &&
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="border p-4 rounded-lg shadow-sm space-y-4">
                                    <Skeleton className="w-full h-40 rounded-md" />
                                    <Skeleton className="w-3/4 h-5" />
                                    <Skeleton className="w-full h-4" />
                                    <Skeleton className="w-1/2 h-4" />
                                </div>
                            ))
                        }

                        {!isLoading && industries && industries.map((industry) => (
                            <IndustriesCard key={industry._id} industry={industry} />
                        ))}
                    </div>
                </div>

                <ReadyToStart />
                {/* <AskQ /> */}
            </div>
        </div>
    )
}

export default Industries
