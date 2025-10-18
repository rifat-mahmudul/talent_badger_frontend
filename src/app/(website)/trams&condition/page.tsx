import React from 'react'

const Page = () => {
    return (
        <div >
            <div className='container  mx-auto my-10 px-4'>
                <div
                    className="w-full container  mx-auto my-10 rounded-2xl bg-cover bg-center relative overflow-hidden"
                    style={{ backgroundImage: "url('/prv.jpg')" }}
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/60 rounded-2xl"></div>

                    {/* Text content */}
                    <div className="relative z-10 text-center px-8 py-12 text-white">
                        <h2 className="text-2xl md:text-3xl font-bold mb-3">
                            Reach Out To Talent Badger For Expert Guidance
                        </h2>
                        <p className="text-sm md:text-base max-w-3xl mx-auto opacity-90">
                            Our team is here to help you navigate challenges, provide practical advice, and connect
                            you with the right resources across industries—from AI and healthcare to product design
                            and business strategy—so you can achieve your goals with confidence.
                        </p>
                    </div>
                </div>
                <div className='mt-36'>
                    <div>
                        <h2 className='text-[#191D23] font-medium text-[18px] mb-2'>What Are Talent Badger’s Terms & Conditions?</h2>
                        <p className='text-[#68706A] font-normal text-[16px]'>Talent Badger is a comprehensive platform offering expert guidance, actionable insights, and consulting services across a wide spectrum of industries, including AI, healthcare, product design, business strategy, and more. Our mission is to empower individuals, startups, and organizations to overcome challenges, make informed decisions, and achieve meaningful results.</p>
                        <br />
                        <p className='text-[#68706A] font-normal text-[16px]'>By accessing or using Talent Badger’s platform, tools, content, or services, you acknowledge and agree to abide by the following Terms & Conditions. These terms are designed to ensure a safe, professional, and productive experience for all users, protect the integrity of our content, and clarify the responsibilities and rights of both Talent Badger and its users. Whether you are seeking guidance, leveraging resources, or collaborating with our experts, your engagement with Talent Badger constitutes acceptance of these rules and policies.</p>
                    </div>
                    <div className='my-10'>
                        <h2 className='text-[#191D23] font-medium text-[18px] mb-2'>What is Talent Badger?</h2>
                        <p className='text-[#68706A] font-normal text-[16px]'>Talent Badger is a platform that connects professionals, businesses, and innovators with expert guidance, insights, and practical solutions across industries. From AI and healthcare to product design and business strategy, Talent Badger helps users overcome challenges, make informed decisions, and achieve meaningful results.</p>
                        <br />
                        <p className='text-[#68706A] font-normal text-[16px]'>By accessing or using Talent Badger’s platform, tools, content, or services, you acknowledge and agree to abide by the following Terms & Conditions. These terms are designed to ensure a safe, professional, and productive experience for all users, protect the integrity of our content, and clarify the responsibilities and rights of both Talent Badger and its users. Whether you are seeking guidance, leveraging resources, or collaborating with our experts, your engagement with Talent Badger constitutes acceptance of these rules and policies.</p>
                    </div>
                    <section className=" space-y-8">
                        {/* numbered list */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-[#343A40] font-medium text-[16px]">1. Industry Expertise</h2>
                                <ul className="list-disc list-inside text-sm mt-1 space-y-1 text-[#68706A]">
                                    <li>Access guidance from professionals across multiple sectors.</li>
                                    <li>Gain insights into emerging trends, best practices, and innovative solutions.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-[#343A40] font-medium text-[16px]">2. Practical Tools and Resources</h2>
                                <ul className="list-disc list-inside text-sm mt-1 space-y-1 text-[#68706A]">
                                    <li>Leverage templates, frameworks, and guides designed to make complex tasks manageable.</li>
                                    <li>Apply actionable strategies that drive measurable results.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-[#343A40] font-medium text-[16px]">3. Personalized Guidance</h2>
                                <ul className="list-disc list-inside text-sm mt-1 space-y-1 text-[#68706A]">
                                    <li>Receive advice tailored to your unique goals, challenges, and context.</li>
                                    <li>Benefit from one-on-one consultations, workshops, and advisory sessions.</li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-[#343A40] font-medium text-[16px]">4. Community and Collaboration</h2>
                                <ul className="list-disc list-inside text-sm mt-1 space-y-1 text-[#68706A]">
                                    <li>Connect with a network of like-minded professionals and innovators.</li>
                                    <li>Share experiences, exchange ideas, and learn from success stories.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-[#343A40] font-medium text-[16px]">5. Continuous Learning</h2>
                                <ul className="list-disc list-inside text-sm mt-1 space-y-1 text-[#68706A]">
                                    <li>Stay informed with industry updates, thought leadership content, and practical insights.</li>
                                    <li>Build capabilities to adapt to evolving markets and technologies.</li>
                                </ul>
                            </div>
                        </div>

                        {/* main description */}
                        <p className="text-sm text-gray-600 leading-relaxed">
                            At its core, Talent Badger is more than a platform—it is a trusted partner for growth.
                            We help individuals and organizations navigate uncertainty, unlock opportunities,
                            and turn ideas into results. By combining expert knowledge with practical application,
                            Talent Badger empowers users to make confident decisions, overcome obstacles, and
                            achieve meaningful, lasting success.
                        </p>

                        {/* repeated "What is Talent Badger?" blocks */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                                <h2 className="text-[#191D23] font-medium text-[16px]">What is Talent Badger?</h2>
                                <p className="text-sm text-[#68706A] leading-relaxed">
                                    Talent Badger is a platform that connects professionals, businesses, and innovators
                                    with expert guidance, insights, and practical solutions across industries. From AI
                                    and healthcare to product design and business strategy, Talent Badger helps users
                                    overcome challenges, make informed decisions, and achieve meaningful results.
                                </p>
                                <p className="text-sm text-[#68706A] leading-relaxed">
                                    Our mission is to provide actionable knowledge and support, empowering individuals
                                    and organizations to unlock their full potential. Whether you&apos;re exploring new
                                    ideas, solving complex problems, or looking for industry-specific advice,
                                    Talent Badger is your trusted partner for growth and success.
                                </p>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Page