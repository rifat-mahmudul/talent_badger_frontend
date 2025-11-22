import { Key, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='bg-[#E8F1F1] space-y-[16px] p-2 border border-[#E7E7E7] rounded-lg'>
      <Link href={'/engineer/setting/profile'} className='flex gap-6 cursor-pointer rounded-lg py-[18px] bg-[#F8F9FA] px-[16px] text-[#147575] font-semibold text-[14px]'>
        <User /> Profile
      </Link>
      <Link href={'/engineer/setting/password'} className='flex gap-6 cursor-pointer rounded-lg py-[18px] bg-[#F8F9FA] px-[16px] text-[#147575] font-semibold text-[14px]'>
        <Key /> Password
      </Link>

    </div>
  )
}

export default page