import Image from 'next/image'
import React from 'react'

const Aboutus = () => {
    return (
        <div>
            <div className='container flex flex-col md:flex-row gap-10 mx-auto my-20'>
                <div>
                    <h2 className='font-bold text-[40px]  text-[#147575] mb-6 '><span className='text-black'>About </span> Us</h2>
                    <span className='text-[#9A9EA2] font-normal text-[16px] py-7'>At Talent Badger, we believe great innovation starts with great people. Our mission is to make elite consulting and development talent accessible to every business — fast, flexible, and on demand.</span>
                    <br />
                    <br />
                    <span className='text-[#9A9EA2] font-normal text-[16px] py-7'>We bring together the top 3% of global experts — from software engineers and AI specialists to business strategists and project managers — helping companies innovate, scale, and succeed with confidence.</span>
                    <br />
                    <br />
                    <span className='text-[#9A9EA2] font-normal text-[16px] py-7'>Whether you’re a startup shaping your first product or an enterprise transforming your next big idea, Talent Badger gives you access to the expertise, insights, and precision needed to move faster and smarter.</span>
                    <br />
                    <br />

                    <span className='text-[#9A9EA2] font-normal text-[16px] '>We’re not just a talent platform — we’re your strategic growth partner, bridging the gap between vision and execution. Together, we build the teams that build the future.</span>
                </div>
                <div className='w-[600px] h-[400px]'>
                    <Image src="/aboutus.png" alt="logos" width={900} height={900} className='w-full object-cover h-full rounded-lg ' />
                </div>
            </div>
        </div>
    )
}

export default Aboutus