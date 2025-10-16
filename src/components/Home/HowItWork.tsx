import React from 'react'
import { Card, CardContent } from '../ui/card'
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
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                    <CardContent className="p-5 space-y-2">
                        <div className='text-center'>
                            <div className='w-[80px] h-[80px] mx-auto mb-2'>
                                <Image src={"/searchIcon.png"} alt="how" width={900} height={900} />
                            </div>
                            <h2 className='text-[#147575] font-semibold text-[20px] mb-2'>Post Your Need</h2>
                            <p className='text-[#68706A] text-[16px]'>Find the best options tailored to your needs with filters for location, price, amenities, and services.</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                    <CardContent className="p-5 space-y-2">
                        <div className='text-center'>
                            <div className='w-[80px] h-[80px] mx-auto mb-2'>
                                <Image src={"/icon2.png"} alt="how" width={900} height={900} />
                            </div>
                            <h2 className='text-[#147575] font-semibold text-[20px] mb-2'>Post Your Need</h2>
                            <p className='text-[#68706A] text-[16px]'>Find the best options tailored to your needs with filters for location, price, amenities, and services.</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                    <CardContent className="p-5 space-y-2">
                        <div className='text-center'>
                            <div className='w-[80px] h-[80px] mx-auto mb-2'>
                                <Image src={"/icon3.png"} alt="how" width={900} height={900} />
                            </div>
                            <h2 className='text-[#147575] font-semibold text-[20px] mb-2'>Post Your Need</h2>
                            <p className='text-[#68706A] text-[16px]'>Find the best options tailored to your needs with filters for location, price, amenities, and services.</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                    <CardContent className="p-5 space-y-2">
                        <div className='text-center'>
                            <div className='w-[80px] h-[80px] mx-auto mb-2'>
                                <Image src={"/icon4.png"} alt="how" width={900} height={900} />
                            </div>
                            <h2 className='text-[#147575] font-semibold text-[20px] mb-2'>Post Your Need</h2>
                            <p className='text-[#68706A] text-[16px]'>Find the best options tailored to your needs with filters for location, price, amenities, and services.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
        </div>
    )
}

export default HowItWork