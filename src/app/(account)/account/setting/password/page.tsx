import React from 'react'
import { SideSetting } from '../_components/SideSetting'
import PasswordChange from '../_components/PasswordChnage'

const page = () => {
  return (
    <div>
      <div className='flex gap-6'>
        <SideSetting />
        <PasswordChange/>
      </div>
    </div>
  )
}

export default page