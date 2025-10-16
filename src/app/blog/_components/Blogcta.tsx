import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const Blogcta = () => {
    return (
        <div
            className="w-full container  mx-auto mt-10 mb-28 rounded-2xl bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: "url('/faq.png')" }}
        >

            <div className="relative z-10 text-center px-8 py-12 text-white">
                <h2 className="text-2xl text-[#282828] md:text-3xl font-bold mb-3">
                    Stay Ahead <span className='text-[#147575]'>With Expert Insights</span>
                </h2>
                <p className="text-sm md:text-base text-[#68706A] max-w-3xl mx-auto opacity-90">
                    Subscribe to our newsletter for the latest articles, tips, and resources to help you make confident decisions for your loved ones.
                </p>
                <div className='flex gap-3 mt-[60px] max-w-xl mx-auto items-center justify-center'>
                    <Input
                        type='email'
                        placeholder="Enter your email"
                        className=" border-[#00383B]"
                    />
                    <Button className='text-white bg-[#00383B]'>Subscribe</Button>
                </div>
            </div>
        </div>
    )
}

export default Blogcta