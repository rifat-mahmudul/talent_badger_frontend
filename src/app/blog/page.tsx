import Hero from '@/components/Home/Hero'
import React from 'react'
import ResentBlog from './_components/ResentBlog'
import Blogcta from './_components/Blogcta'
import AllBLog from './_components/AllBLog'

const page = () => {

    return (
        <div>
            <Hero title1="Expert" colorTitile="Knowledge, Real-World" title2="Solutions" description="Stay informed with practical insights from consultants across industries. From AI to healthcare, product design to business strategy, our blog gives you the clarity and tools to overcome challenges, embrace opportunities, and drive meaningful results." image="/blog.jpg" buttonName1="Assemble Your Team" buttonName2="Help Me Build My Team " buttonHref1="/" buttonHref2="/" />
            <ResentBlog />
            <Blogcta />
            <div className='container mx-auto my-20'>
                <h2 className='font-bold text-[40px]  text-[#147575] text-center'><span className='text-black'>All</span> Blogs</h2>
                <p className='text-[#6C757D] text-center text-[16px]'>Browse all our articles, insights, and success stories to discover how world-class consultants help businesses innovate, scale faster, and solve complex challenges across industries.</p>
            </div>
            <AllBLog />
        </div>
    )
}

export default page