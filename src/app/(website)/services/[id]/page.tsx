import React from 'react'
import IndividualService from './_components/IndividualService'
import ServiceCard from '../_components/ServiceCard'
import ServiceCta from '../_components/ServiceCta'
import ReadyToStart from '@/components/ReadyToStart'
import AskQ from '../../faqs/_components/AskQ'

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <div className='container mx-auto px-4 md:px-0'>
        <IndividualService id={params.id} />
        <div className='my-20 space-y-[16px]'>
          <h2 className='text-[#147575] text-center font-bold text-[40px]'>Explore More Developers</h2>
          <p className='text-[#929292] font-normal text-[18px] text-center'>Meet a curated selection of trusted professionals whose expertise, reliability, and excellence set the benchmark in every project.</p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 justify-items-center my-10">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <ServiceCard key={index} />
            ))}
        </div>
        <ServiceCta />
        <ReadyToStart />
        <AskQ/>
      </div>
    </div>
  )
}

export default page