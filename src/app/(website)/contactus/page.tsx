import Hero from '@/components/Home/Hero'
import React from 'react'
import ContactForm from './_components/contactForm'
import ContactMap from './_components/contactMap'

const page = () => {
    return (
        <div>
            <Hero title1="Talk to" colorTitile="Experts, Unlock Practical" title2="Insights" description="Connect with our consultants across industries—from AI and healthcare to product design and business strategy—and get the guidance you need to solve challenges, seize opportunities, and drive meaningful results." image="/contact.jpg" buttonName1="Assemble Your Team" buttonName2="Help Me Build My Team " buttonHref1="/" buttonHref2="/" />
          <ContactForm/>
          <ContactMap/>
        </div>
    )
}

export default page