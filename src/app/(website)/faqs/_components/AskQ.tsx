import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'

const AskQ = () => {
    return (
        <div className='container mx-auto my-20 px-4 md:px-0 flex flex-col gap-6'>
            <h2 className='text-center text-[#343A40] font-bold text-[40px]'>Frequently <span className='text-[#147575]'>Asked Questions</span></h2>
            <p className='text-[#68706A] font-normal text-[16px] text-center mt-1'>Get quick answers to the most common questions about Talent Badger, our platform, and how we help you streamline hiring.</p>
            <div>
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-1"
                >
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='text-[#343A40]  font-normal text-[18px]'><h2 style={{ fontFamily: "Poppins" }}>1. Do you offer a free trial?</h2></AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p className='font-medium'>
                                Not exactly—but we offer something better.
                            </p>
                            <p>
                                Instead of a generic trial, we provide a Product Innovation Evaluation Report. You share your current product or internal process, and our expert team analyzes it for:
                            </p>
                            <ul className='list-disc list-inside flex flex-col gap-2'>
                                <li>Cost reduction opportunities</li>
                                <li>Design or performance improvements</li>
                                <li>Innovation potential</li>
                                <li>Time-to-market advantages
                                    We then deliver a detailed report with recommendations and estimated project pricing if you choose to move forward.</li>

                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger style={{ fontFamily: "Poppins" }} className='text-[#343A40]  font-normal text-[18px]'>2. What is the Product Innovation Evaluation Report?</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p className='font-medium'>
                                It’s a low-commitment way to see our value before investing in a full engagement.
                                You get:
                            </p>
                            <ul className='list-disc list-inside flex flex-col gap-2'>
                                <li>Expert review from mechanical, electrical, firmware, and product engineers</li>
                                <li>Identified improvements or new features</li>
                                <li>Rough cost & timeline estimates</li>
                                <li>Optional scoping call to move forward</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger style={{ fontFamily: "Poppins" }} className='text-[#343A40]  font-normal text-[18px]'>3. Should I hire an individual expert or a full Engineering+ Pod?</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p className='font-medium'>
                                Engineering+ Pod?
                                It depends on your goals:
                                If you need…Best Option
                                A specific skill or task
                                Individual expert
                                Cross-functional development (mechanical + electrical + firmware + design)
                                Pod
                                Faster execution and coordination
                                Pod
                                Budget-conscious quick fix
                                Individual
                                Full product or subsystem
                                Pod
                                Not sure? We’ll recommend the best structure for you.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>

    )
}

export default AskQ