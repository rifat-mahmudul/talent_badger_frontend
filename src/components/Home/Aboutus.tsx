// import Image from 'next/image'
// import React from 'react'

// const Aboutus = () => {
//     return (
//         <div>
//             <div className='container flex flex-col md:flex-row gap-10 mx-auto my-20'>
//                 <div>
//                     <h2 className='font-bold text-[40px]  text-[#147575] mb-6 '><span className='text-black'>About Talent  </span> Badger</h2>
//                     <span className='text-[#9A9EA2] font-normal text-[16px] py-7'>At Talent Badger, we believe great innovation starts with great people. Our mission is to make elite consulting and development talent accessible to every business — fast, flexible, and on demand.</span>
//                     <br />
//                     <br />
//                     <span className='text-[#9A9EA2] font-normal text-[16px] py-7'>We bring together the top 3% of global experts — from software engineers and AI specialists to business strategists and project managers — helping companies innovate, scale, and succeed with confidence.</span>
//                     <br />
//                     <br />
//                     <span className='text-[#9A9EA2] font-normal text-[16px] py-7'>Whether you’re a startup shaping your first product or an enterprise transforming your next big idea, Talent Badger gives you access to the expertise, insights, and precision needed to move faster and smarter.</span>
//                     <br />
//                     <br />

//                     <span className='text-[#9A9EA2] font-normal text-[16px] '>We’re not just a talent platform — we’re your strategic growth partner, bridging the gap between vision and execution. Together, we build the teams that build the future.</span>
//                 </div>
//                 <div className='w-[600px] h-[400px]'>
//                     <Image src="/aboutus.png" alt="logos" width={900} height={900} className='w-full object-cover h-full rounded-lg ' />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Aboutus




import Image from 'next/image'
import React from 'react'

const Aboutus = () => {
    return (
        <div>
            <div className="container flex flex-col md:flex-row gap-10 mx-auto my-20">
                
                <div>
                    <h2 className="font-bold text-[40px] text-[#147575] mb-6">
                        <span className="text-black">About Talent </span>Badger
                    </h2>

                    {/* What We Do */}
                    <h4 className="font-semibold text-[20px] text-gray-600 mb-2">What we do</h4>
                    <p className="text-[#9A9EA2] text-[16px] leading-relaxed mb-4">
                        Talent Badger connects companies with curated engineering pods and specialists 
                        for hardware, firmware, and connected products. We make world-class talent 
                        accessible, flexible, and fast — exactly when you need it.
                    </p>

                    {/* Who It's For */}
                    <h2 className="font-semibold text-[20px] text-gray-600 mb-2">Who it’s for</h2>
                    <p className="text-[#9A9EA2] text-[16px] leading-relaxed mb-4">
                        Founders, engineering leaders, and product teams who need additional capacity 
                        but don’t want the overhead of building a full internal team.
                    </p>

                    {/* How It Works */}
                    <h4 className="font-semibold text-[20px] text-gray-600 mb-2">How it works</h4>
                    <p className="text-[#9A9EA2] text-[16px] leading-relaxed mb-4">
                        We pre-vet every engineer and assign skill badges based on deep experience. 
                        You receive a small, curated shortlist matched to your project — with transparent 
                        rates and clear expectations from the start.
                    </p>

                    {/* Transparency Bullets */}
                    <ul className="text-[#9A9EA2] text-[16px] list-disc ml-5 space-y-2 mb-6">
                        <li>Standardized and transparent rate bands</li>
                        <li>Clear scopes with example deliverables</li>
                        <li>No surprise staffing fees</li>
                        <li>Curated shortlist instead of endless resumes</li>
                        <li>Deep technical vetting for real expertise</li>
                    </ul>

                    <p className="text-[#9A9EA2] text-[16px] leading-relaxed">
                        Talent Badger isn’t just a talent platform — it’s your strategic partner 
                        for faster, smarter engineering execution.
                    </p>
                </div>

                {/* Image Section */}
                <div className="w-[600px] h-[400px]">
                    <Image 
                        src="/aboutus.png" 
                        alt="About Talent Badger" 
                        width={900} 
                        height={900} 
                        className="w-full h-full object-cover rounded-lg" 
                    />
                </div>

            </div>
        </div>
    )
}

export default Aboutus
