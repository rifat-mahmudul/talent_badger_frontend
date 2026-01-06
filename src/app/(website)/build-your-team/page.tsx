import React from 'react'
import TeamPickerHero from './_components/TeamPickerHero'
import Candidates from './_components/Candidates'
import WhyEngineer from './_components/WhyEngineer'

const page = () => {
  return (
    <div className='space-y-[120px]'>
        <TeamPickerHero/>
        <WhyEngineer/>
        <Candidates/>
    </div>
  )
}

export default page