import Hero from '@/components/Home/Hero'
import React from 'react'

const TeamPickerHero = () => {
    return (
        <Hero
            title1="Build a Better "
            colorTitile="Engineering Career Not Just"
            title2="Another Job."
            description="Join a vetted network of hardware, firmware. and software engineers. matched with serious clients, clear scopes, and fair rates."
            image="/aboutus.png"
            buttonName1="Assemble Your Team"
            buttonName2="Help Me Build My Team "
            buttonHref1="/services"
            buttonHref2="/build-your-team"
        />
    )
}

export default TeamPickerHero