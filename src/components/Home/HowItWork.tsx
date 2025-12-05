import React from 'react'
import Image from 'next/image'

const HowItWork = () => {
    return (
        <div className='container mx-auto'>
            <div className=' flex flex-col md:flex-row gap-10  my-16'>
                <div>
                    <h2 className='font-bold text-[40px]  text-[#147575] mb-1 '><span className='text-black'> How </span>Talent Badger Works</h2>
                    <p className='text-[#9A9EA3] font-normal text-[16px]'>A simple process to match you with the right experts — fast, transparent, and fun.</p>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                {/* <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                    <CardContent className="p-5 space-y-2">
                        <div className='text-center'>
                            <div className='w-[80px] h-[80px] mx-auto mb-2'>
                                <Image src={"/searchIcon.png"} alt="how" width={900} height={900} />
                            </div>
                            <h2 className='text-[#147575] font-semibold text-[20px] mb-2'>Share Your Project</h2>
                            <p className='text-[#68706A] text-[16px]'>You fill out a short brief or hop on a 15-minute call. We capture goals, constraints, and budget.</p>
                        </div>
                    </CardContent>
                </Card> */}
                <div>
                    <Image src={"/talentbadgerwork.png"} alt="how" width={900} className='object-cover' height={900} />
                </div>
                {/* <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                    <CardContent className="p-5 space-y-2">
                        <div className='text-center'>
                            <div className='w-[80px] h-[80px] mx-auto mb-2'>
                                <Image src={"/icon2.png"} alt="how" width={900} height={900} />
                            </div>
                            <h2 className='text-[#147575] font-semibold text-[20px] mb-2'>Get a Curated Pod / Shortlist</h2>
                            <p className='text-[#68706A] text-[16px]'>Within a few days, you receive 1–3 recommended pods or specialists, including skill badges, rates, and example scope.</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                    <CardContent className="p-5 space-y-2">
                        <div className='text-center'>
                            <div className='w-[80px] h-[80px] mx-auto mb-2'>
                                <Image src={"/icon3.png"} alt="how" width={900} height={900} />
                            </div>
                            <h2 className='text-[#147575] font-semibold text-[20px] mb-2'>Kick Off & Iterate</h2>
                            <p className='text-[#68706A] text-[16px]'>You meet the team, refine scope, and start a sprint. We stay involved to keep delivery on track.</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                    <CardContent className="p-5 space-y-2">
                        <div className='text-center'>
                            <div className='w-[80px] h-[80px] mx-auto mb-2'>
                                <Image src={"/icon4.png"} alt="how" width={900} height={900} />
                            </div>
                            <h2 className='text-[#147575] font-semibold text-[20px] mb-2'>Connect Directly</h2>
                            <p className='text-[#68706A] text-[16px]'>Schedule visits and confirm services easily through our platform.</p>
                        </div>
                    </CardContent>
                </Card> */}
                   <div>
                    <Image src={"/talentbadgerwork1.png"} alt="how" width={900} className='object-cover' height={900} />
                </div>
                  <div>
                    <Image src={"/talentbadgerwork2.png"} alt="how" width={900} className='object-cover' height={900} />
                </div>
            </div>

        </div>
    )
}

export default HowItWork