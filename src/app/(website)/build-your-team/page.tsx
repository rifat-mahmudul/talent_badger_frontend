import React from 'react'
import TeamPickerHero from './_components/TeamPickerHero'
import Candidates from './_components/Candidates'

const page = () => {
  return (
    <div className='space-y-[120px]'>
        <TeamPickerHero/>
        <Candidates/>
    </div>
  )
}

export default page