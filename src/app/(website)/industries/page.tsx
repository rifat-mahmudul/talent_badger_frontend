import Hero from '@/components/Home/Hero'
import React from 'react'

import Industries from './Industries'

const page = () => {


    return (
        <div>
            <Hero title1="Powering" colorTitile="Progress Across Every" title2="Industry" description="From healthcare and medtech to aerospace, robotics, AI, and energy, our consultants bring unmatched real-world expertise to every challenge. We help businesses innovate boldly, adapt to changing markets, and scale without limits—delivering faster results, smarter strategies, and world-class solutions at a fraction of traditional costs." image="/industry.jpg" buttonName1="Assemble Your Team" buttonName2="Help Me Build My Team " buttonHref1="/" buttonHref2="/" />
             <Industries/>
        </div>
    )
}

export default page