import React from 'react'
import PersonalInfo from '../_components/PersonalInfo'
import { SideSetting } from '../_components/SideSetting'

const page = () => {
  return (
    <div>
      <div className='flex gap-6'>
        <SideSetting />
        <PersonalInfo />
      </div>
    </div>
  )
}

export default page