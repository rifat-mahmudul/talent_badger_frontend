import Hero from '@/components/Home/Hero'
import ReadyToStart from '@/components/ReadyToStart'
import React from 'react'
import AskQ from './AskQ'

const Faqs = () => {

    return (
        <div>
            <Hero title1="All You" colorTitile="Need to Know Before" title2="You Begin" description="We know hiring consultants can feel complex—from choosing the right experts to understanding pricing and team structures. That’s why we’ve made everything simple, transparent, and easy to follow. Here you’ll find clear answers about how our platform works, how consultants are vetted, what billing looks like, and how quickly you can get started—so you can focus less on confusion and more on building the team that brings your vision to life." image="/faqs.jpg" buttonName1="Assemble Your Team" buttonName2="Help Me Build My Team " buttonHref1="/" buttonHref2="/" />
            <AskQ />
            <ReadyToStart />
        </div>
    )
}

export default Faqs