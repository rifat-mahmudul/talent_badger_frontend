import Image from 'next/image'
import React from 'react'
import logo1 from '../../../../public/logo1.png'
import logo2 from '../../../../public/logo2.png'
import logo3 from '../../../../public/logo3.png'
import logo4 from '../../../../public/logo4.png'
import logo5 from '../../../../public/logo6.png'
const BrandComponent = () => {
    return (
        <div className='flex container mx-auto items-center  justify-center '>
            <div className='flex flex-col md:flex-row items-center gap-[75px]'>
                <p className='text-[#929292] font-normal text-[16px]'>TRUSTED BY </p>
                <div className='flex gap-20 flex-wrap justify-center'>
                    <Image src={logo1} alt="logos" width={900} height={900} className='w-28 h-14 object-contain ' />
                    <Image src={logo2} alt="logos" width={900} height={900} className='w-24 h-14 object-contain' />
                    <Image src={logo3} alt="logos" width={900} height={900} className='w-24 h-16 object-contain' />
                    <Image src={logo4} alt="logos" width={900} height={900} className='w-16 h-14 ' />
                    {/* <Image src="/logo5.png" alt="logos" width={900} height={900} className='w-16 h-14 ' /> */}
                    <Image src={logo5} alt="logos" width={900} height={900} className='w-28 h-12 ' />
                </div>
            </div>
        </div>
    )
}

export default BrandComponent