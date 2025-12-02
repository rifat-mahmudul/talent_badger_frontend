'use client'
import { useGetSingelBlog } from '@/hooks/apiCalling'
import { Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const BlogDetails = ({ id }: { id: string }) => {

    const getSingelBLog = useGetSingelBlog(id)

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div>
            <div className='container mx-auto px-4 py-10'>
                <div>
                    <div className=' w-full    relative mb-6'>
                        <Image src={getSingelBLog.data?.data?.featuredImage || "/assets/images/blog/blog-1.png"} alt="blog" className='w-full h-[500px] object-contain' width={900} height={900} />
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(getSingelBLog.data?.data?.createdAt || "")}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span> {new Date(getSingelBLog.data?.data?.createdAt || "").toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                    </div>
                </div>
                <div className='mt-20'>
                    <h2 className='text-3xl font-semibold mb-4'>{getSingelBLog.data?.data?.title}</h2>
                    <div className='prose prose-sm md:prose-lg lg:prose-xl max-w-none' dangerouslySetInnerHTML={{ __html: getSingelBLog.data?.data?.content || "" }}></div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails