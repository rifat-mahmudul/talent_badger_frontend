import { Calendar, Code2, DollarSign, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const IndividualService = ({ id }: { id: string }) => {
    console.log(id)

    const expertiseTags = [
        "Machine Learning",
        "Data Science",
        "Artificial Intelligence",
        "Python",
        "AWS",
        "Data Engineering",
        "Computer Vision",
        "Data Analysis",
        "Linux",
    ]

    return (
        <div className="w-full container mx-auto bg-white rounded-lg p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Left Side - Image */}
                <div className="flex-shrink-0">
                    <div className="w-full lg:w-[629px] h-[700px] relative rounded-lg overflow-hidden">
                        <Image
                            src="/service.jpg"
                            alt="Matthew Warkentin"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 flex flex-col">
                    {/* Name */}
                    <h2 className="text-[32px] font-semibold text-[#0d7377] mb-6">Matthew Warkentin</h2>

                    {/* Info Items */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-gray-600">
                            <Code2 className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm text-[#929292]">Frontend, React, Vue</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <MapPin className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm text-[#929292]">United States</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <DollarSign className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm text-[#929292]">$150/hrs</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <Calendar className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm text-[#929292]">Member Since March 9, 2019</span>
                        </div>
                    </div>

                    {/* Biography */}
                    <p className="text-sm text-[#616161] leading-relaxed mb-8 text-justify">
                        Since 2014, Matthew has been working professionally in the fields he loves; software and data—culminating in
                        him co-founding the Rubota corporation in 2017. Before that, he spent the past decade at Cornell University
                        conducting scientific research specifically in statistical and biological physics. At in all, Matthew is an
                        engaging, intense communicator with a passion for knowledge and understanding.
                    </p>

                    {/* Expertise Section */}
                    <div className="mb-8">
                        <h2 className="text-[20px] font-medium text-[#147575] mb-4">Expertise</h2>
                        <div className="flex flex-wrap gap-3">
                            {expertiseTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-2 text-sm text-[#147575] border border-[#147575] rounded-md hover:bg-[#0d7377]/5 transition-colors"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Professor Was Section */}
                    <div className="mb-8">
                        <h2 className="text-[20px] font-medium text-[#0d7377] mb-4">Professor was</h2>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                            </div>
                            <span className="font-semibold text-gray-900">Arts&Sciences</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto">
                        <button className="bg-[#00383B] text-white px-6 py-3 rounded-md font-medium hover:bg-[#0d7377]/90 transition-colors">
                            Add Mattew In Your Team
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndividualService