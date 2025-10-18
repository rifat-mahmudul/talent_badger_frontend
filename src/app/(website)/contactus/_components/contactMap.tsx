import { Mail, MapPinCheckInside, Phone } from 'lucide-react'
import React from 'react'

const ContactMap = () => {
    return (
        <div className='container mx-auto my-20 grid grid-cols-1 items-center md:grid-cols-2 gap-10'>
            <div className='overflow-hidden rounded-2xl'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.860576955924!2d107.0616509756195!3d-6.786815693210265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e684d2d9063d8fd%3A0xb845cb5da646595f!2sRM.%20Lembur%20Kuring!5e0!3m2!1sen!2sbd!4v1760333904539!5m2!1sen!2sbd" width="800" height="350" loading="lazy" ></iframe>
            </div>
            <div >
                <h2 className='text-[#147575] font-semibold text-[40px] mb-1'>Contact Information</h2>
                <p className='text-[#68706A] font-normal text-[16px]'>Find all the ways to reach us, including email, phone, and our office address, so you can get the support and answers you need quickly and easily.</p>
                <div className='mt-10 flex flex-col gap-6 text-[18px]'>
                    <span className='text-[#343A40] text-[18px] items-center flex gap-2'><Mail className='text-[#147575]' />support@talentbadget.com</span>
                    <span className='text-[#343A40] text-[18px] items-center flex gap-2'><Phone className='text-[#147575]' />+1 (555) 123-4567FGHJ</span>
                    <span className='text-[#343A40] text-[18px] items-center flex gap-2'><MapPinCheckInside className='text-[#147575]' />123 Care Street, City, State, ZIP Address: 123 Care Street, City, State, ZIP</span>
                </div>
            </div>
        </div>
    )
}

export default ContactMap