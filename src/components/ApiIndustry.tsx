"use client"

import { useGetAllIndustry } from '@/hooks/apiCalling';
import React from 'react'
import IndustriesCard from './reusebale/IndustriesCard';

const ApiIndustry = () => {
    const allIndustries = useGetAllIndustry();
    const industries = allIndustries.data?.data;

    const isLoading = allIndustries.isLoading;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* ⬅️ Skeleton Loaders */}
            {isLoading && (
                <>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="h-[220px] rounded-xl bg-gray-200 animate-pulse"
                        ></div>
                    ))}
                </>
            )}

            {/* ⬅️ Actual Data */}
            {!isLoading && industries && industries.map((industry) => (
                <IndustriesCard key={industry._id} industry={industry} />
            ))}
        </div>
    )
}

export default ApiIndustry;
