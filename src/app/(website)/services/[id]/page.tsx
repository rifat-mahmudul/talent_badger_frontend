import React from 'react'
import IndividualService from './_components/IndividualService'
import ServiceCta from '../_components/ServiceCta'
import ReadyToStart from '@/components/ReadyToStart'
import AskQ from '../../faqs/_components/AskQ'
import ExploreMoreDevelopers from './_components/explore-more-developers'

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <div className='container mx-auto px-4 md:px-0'>
        <IndividualService id={params.id} />
        <div className='my-20 space-y-[16px]'>
          <h2 className='text-[#147575] text-center font-bold lg:text-[40px] text-2xl '>Explore More Developers</h2>
          <p className='text-[#929292] font-normal text-[18px] text-center pb-4 md:pb-6'>Meet a curated selection of trusted professionals whose expertise, reliability, and excellence set the benchmark in every project.</p>
          <ExploreMoreDevelopers />
        </div>
        <ServiceCta />
        <ReadyToStart />
        <AskQ />
      </div>
    </div>
  )
}

export default page