"use client"
import SginUpModal from '@/components/auth/SginUpModal'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const WhyEngineer = () => {

        const [open, setOpen] = useState(false)

    return (
        <section className=" bg-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-3">Why Engineers Choose Talent Badger</h2>
                <p className="text-gray-600 mb-12">
                    We make it easier to do meaningful engineering work on your terms.
                </p>

                {/* Features */}
                <div className="grid md:grid-cols-4 gap-6 mb-16">
                    <div className="p-6 border rounded-lg">
                        <h4 className="font-semibold mb-2">Better Projects, Less Noise</h4>
                        <p className="text-gray-600 text-sm">
                            We filter out mismatch roles and low-quality leads so you see serious, well-scoped work only.
                        </p>
                    </div>

                    <div className="p-6 border rounded-lg">
                        <h4 className="font-semibold mb-2">Control Your Time & Rates</h4>
                        <p className="text-gray-600 text-sm">You choose when you work and what charge.</p>
                    </div>

                    <div className="p-6 border rounded-lg">

                        <h4 className="font-semibold mb-2">Backed by Engineers Not Recruiters</h4>
                        <p className="text-gray-600 text-sm">
                            Talk to people who actually understand hardware, timelines, and a
                        </p>
                    </div>

                    <div className="p-6 border rounded-lg">
                        <h4 className="font-semibold mb-2">Admin Handled for You</h4>
                        <p className="text-gray-600 text-sm">
                            We handle contracts, invoicing, and payments so you can stay focused on the engineering.
                        </p>
                    </div>
                </div>

                {/* How it Works */}
                <h2 className="text-2xl font-bold mb-8">How it Works</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6  border rounded-lg">
                        <h4 className="font-semibold mb-2">Tell Us Who You Are</h4>
                        <p className="text-gray-600 text-sm pb-4">
                            Share your experience, tech stack, and what kind of work you want.
                        </p>
                      <Button onClick={() => setOpen(true)} className="bg-[#00383B] hover:bg-[#005356] text-white w-full sm:w-auto">3-8 min</Button>
                    </div>

                    <div className="p-6 border rounded-lg">
                        <h4 className="font-semibold mb-2">Get Reviewed & Align on Fit</h4>
                        <p className="text-gray-600 text-sm">
                            We review your profile and may schedule a short call to align on skills, preferences, and rates.
                        </p>
                    </div>

                    <div className="p-6 border rounded-lg">
                        <h4 className="font-semibold mb-2">Get Matched to Projects</h4>
                        <p className="text-gray-600 text-sm">
                            When we find a fit, we bring you clear scopes, timelines, and budgets. You decide what to accept.
                        </p>
                       
                    </div>
                </div>
            </div>
            <SginUpModal openRole="engineer" open={open} onOpenChange={setOpen} />
        </section>

    )
}

export default WhyEngineer