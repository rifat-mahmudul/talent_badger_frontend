import { DashboardSidebar } from '@/components/sidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>

            <div className="flex">
                <DashboardSidebar />
                <div className="w-full mt-[80px] p-6 bg-[#EDEEF1]">
                    {children}
                </div>
            </div>
        </>
    )
}

export default layout