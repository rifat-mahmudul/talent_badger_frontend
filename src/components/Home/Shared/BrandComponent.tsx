import Image from 'next/image'
import React from 'react'

const BrandComponent = () => {
    return (
        <div className='flex container mx-auto items-center  justify-center '>
            <div className='flex flex-col md:flex-row items-center gap-[75px]'>
                <p className='text-[#929292] font-normal text-[16px]'>TRUSTED BY LEADING <br />
                    BRANDS AND STARTUPS</p>
                <div className='flex gap-20 flex-wrap justify-center'>
                    <Image src="/logo1.png" alt="logos" width={900} height={900} className='w-16 h-14 ' />
                    <Image src="/logo2.png" alt="logos" width={900} height={900} className='w-16 h-14 ' />
                    <Image src="/logo3.png" alt="logos" width={900} height={900} className='w-52 h-10 ' />
                    <Image src="/logo4.png" alt="logos" width={900} height={900} className='w-16 h-14 ' />
                    <Image src="/logo5.png" alt="logos" width={900} height={900} className='w-16 h-14 ' />
                    <Image src="/logo6.png" alt="logos" width={900} height={900} className='w-16 h-14 ' />
                </div>
            </div>
        </div>
    )
}

export default BrandComponent