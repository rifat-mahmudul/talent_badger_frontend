import React from 'react'
import { SideSetting } from '../_components/SideSetting'
import PasswordChange from '../_components/PasswordChnage'

const page = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#EDEEF1] min-h-screen">
      <div
        className="
          flex flex-col 
          lg:flex-row 
          gap-6 
          w-full           
          mx-auto 
          transition-all 
          duration-300 
          items-stretch
        "
      >
        <SideSetting />
        <PasswordChange />
      </div>
    </div>
  )
}

export default page