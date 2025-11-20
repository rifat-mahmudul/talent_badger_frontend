import Image from 'next/image'
import React from 'react'

const ActiveProjects = () => {
  return (
    <div className='py-6'>
      <div className='bg-white border-[1px] border-[#EEEEEE] shadow-lg rounded-lg pt-5'>
        <h4 className='text-sm leading-[150%] font-semibold text-[#147575] pb-4 border-b border-[#EEEEEE] px-5'>Active Projects</h4>

        <div className='p-5'>
          <div className='p-4 bg-white border-[1px] border-[#EEEEEE] shadow-lg rounded-lg'>
            <div className='w-full flex items-center justify-between'>
              <h5 className='text-sm text-[#147575] font-medium leading-[150%]'>Website Redesign Project</h5>
            <div className='flex items-center gap-2'>
              <Image src="/images/1.jpg" alt="user" width={24} height={24} className='w-6 h-6 rounded-full'/>
              <Image src="/images/1.jpg" alt="user" width={24} height={24} className='w-6 h-6 rounded-full'/>
              <Image src="/images/1.jpg" alt="user" width={24} height={24} className='w-6 h-6 rounded-full'/>
            </div>
            </div>
            <p className='text-xs font-normal leading-[150%] text-[#68706A] py-2'>Frontend development team with UI/UX expertise</p>
            <div className='flex items-center gap-3'>
              <button className='bg-[#E6EBEB] text-[10px] text-[#00383B] font-normal leading-[150%] py-1 px-6 rounded-full'>In Progress</button>
              <p className='text-xs font-normal text-[#9E9E9E] leading-[150%]'>Started 2 weeks ago</p>
            </div>
          </div>
        </div>

        <div className='px-5 pb-5'>
          <div className='p-4 bg-white border-[1px] border-[#EEEEEE] shadow-lg rounded-lg'>
            <div className='w-full flex items-center justify-between'>
              <h5 className='text-sm text-[#147575] font-medium leading-[150%]'>Website Redesign Project</h5>
            <div className='flex items-center gap-2'>
              <Image src="/images/1.jpg" alt="user" width={24} height={24} className='w-6 h-6 rounded-full'/>
              <Image src="/images/1.jpg" alt="user" width={24} height={24} className='w-6 h-6 rounded-full'/>
              <Image src="/images/1.jpg" alt="user" width={24} height={24} className='w-6 h-6 rounded-full'/>
            </div>
            </div>
            <p className='text-xs font-normal leading-[150%] text-[#68706A] py-2'>Frontend development team with UI/UX expertise</p>
            <div className='flex items-center gap-3'>
              <button className='bg-[#E6EBEB] text-[10px] text-[#00383B] font-normal leading-[150%] py-1 px-6 rounded-full'>In Progress</button>
              <p className='text-xs font-normal text-[#9E9E9E] leading-[150%]'>Started 2 weeks ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActiveProjects
