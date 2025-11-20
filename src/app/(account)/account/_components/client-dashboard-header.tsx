"use client"

import { FileText, PhoneCall } from 'lucide-react'
import React from 'react'

export interface DashboardOverviewResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    totalActiveProject: number;
    totalPandingProject: number;
    totalCompletedProject: number;
    upcomingMeeting: number;
    upcomingDeadlines: number;
  };
}


const ClientDashboardHeader = () => {

  // const {data, isLoading, error, isError} = useQuery
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white flex items-center gap-2 border-[1px] border-[#EEEEEE] shadow-lg rounded-lg p-5' >
            <div >
              <div className='p-2 rounded-[8px] bg-[#E8F1F1]'><FileText  className='w-7 h-7 text-[#147575]'/></div>
            </div>
            <div>
              <h4 className='text-base text-[#147575] font-semibold leading-[150%]'>Active Projects</h4>
              <p className='text-base text-[#68706A] font-semibold leading-[150%] pt-2'>3</p>
            </div>
            
        </div>

        <div className='bg-white flex items-center gap-2 border-[1px] border-[#EEEEEE] shadow-lg rounded-lg p-5' >
            <div className='p-2 rounded-[8px] bg-[#E8F1F1]'>
              <span ><PhoneCall  className='w-7 h-7 text-[#147575]'/></span>
            </div>
            <div>
              <h4 className='text-base text-[#147575] font-semibold leading-[150%]'>Upcoming Meeting Schedule</h4>
              <p className='text-base text-[#68706A] font-semibold leading-[150%] pt-2'>3</p>
            </div>
            
        </div>

        <div className='bg-white flex items-center gap-2 border-[1px] border-[#EEEEEE] shadow-lg rounded-lg p-5' >
            <div className='p-2 rounded-[8px] bg-[#E8F1F1]'>
              <span ><FileText  className='w-7 h-7 text-[#147575]'/></span>
            </div>
            <div>
              <h4 className='text-base text-[#147575] font-semibold leading-[150%]'>Upcoming Deadlines</h4>
              <p className='text-base text-[#68706A] font-semibold leading-[150%] pt-2'>3</p>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default ClientDashboardHeader
