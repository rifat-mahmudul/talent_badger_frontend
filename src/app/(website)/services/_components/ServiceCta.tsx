import { Button } from '@/components/ui/button'
import React from 'react'

const ServiceCta = () => {
    return (
        <div
            className="rounded-2xl mx-auto my-10 bg-cover bg-center px-6 py-16 text-center"
            style={{
                backgroundImage: "url('/serviceCta.jpg')",
                backgroundColor: "#109B9B", 
            }}
        >
            <div className="max-w-2xl mx-auto text-white">
                <h2 className="text-2xl md:text-3xl text-[#282828] font-semibold leading-tight">
                    Reserve your team today and <span className="font-bold text-[#F8F9FA]">get 10% off your kickoff sprint?</span>
                </h2>
                <p className="mt-3 text-sm md:text-base opacity-90">
                    Sometimes you need a developer with a more specific mix of skills to
                    fit your project needs. Let’s see if we can help.
                </p>
                <Button
                    className="mt-6 bg-white text-[#00383B] hover:bg-gray-100 font-medium rounded-md px-6 py-2"
                >
                    Reserve Team Now
                </Button>
            </div>
        </div>
    )
}

export default ServiceCta