export default function ProcessFlow() {
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-balance">
                    How Talent Badger Connects <span className="text-teal-600">You With Hand-Selected Experts</span>
                </h2>

                {/* Process Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-start">
                    {/* Step 01 */}
                    <div className="flex flex-col  items-center text-center relative">
                        <div className="w-20 h-20 rounded-full border-2 border-teal-600 flex items-center justify-center mb-6">
                            <span className="text-2xl font-bold text-teal-600">01</span>
                        </div>

                        {/* Arrow - hidden on mobile */}
                        <div className="hidden md:block absolute top-10  left-[calc(50%+40px)] w-[calc(100%-80px)]">
                            <svg
                                className="w-full h-2"
                                viewBox="0 0 200 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M0 4H195M195 4L188 1M195 4L188 7"
                                    stroke="#0D9488"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <h2 className="text-lg font-bold mb-3 text-[#147575] ">
                            Assemble or Request Your
                            <br />
                            Engineering+ Team
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            Define our curated roster of engineering and technical experts ready to join your team. For a custom
                            solution, we&apos;ll match you with the right Engineering+ Advisor.
                        </p>
                    </div>

                    {/* Step 02 */}
                    <div className="flex flex-col items-center text-center relative">
                        <div className="w-20 h-20 rounded-full border-2 border-teal-600 flex items-center justify-center mb-6">
                            <span className="text-2xl font-bold text-teal-600">02</span>
                        </div>

                        {/* Arrow - hidden on mobile */}
                        <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)]">
                            <svg
                                className="w-full h-2"
                                viewBox="0 0 200 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M0 4H195M195 4L188 1M195 4L188 7"
                                    stroke="#0D9488"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <h2 className="text-lg font-bold mb-3  text-[#147575]">Define Your Scope of Work (SOW)</h2>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            Collaborate with your Engineering+ Advisor to outline project goals, timelines, deliverables, and
                            milestones. We&apos;ll guarantee a draft SOW for review and sign-off within 48 hours.
                        </p>
                    </div>

                    {/* Step 03 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full border-2 border-teal-600 flex items-center justify-center mb-6">
                            <span className="text-2xl font-bold text-teal-600">03</span>
                        </div>

                        <h2 className="text-lg font-bold mb-3 text-[#147575] ">Kick Off Your Project</h2>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            Meet your Engineering+ Team, confirm success keys for milestones and alignment. From there, development
                            begins and you&apos;ll receive regular Engineering+ Advisor updates.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
