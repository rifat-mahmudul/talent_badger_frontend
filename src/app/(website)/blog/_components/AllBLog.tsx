"use client";
import Blogcard from '@/components/reusebale/Blogcard'
import { ReusablePagination } from '@/components/reusebale/Pagination'
import React, { useState } from 'react'

const AllBLog = () => {
    const [page, setPage] = useState(1);
    const totalResults = 12;
    const resultsPerPage = 5;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    return (
        <div className='container mx-auto'>
            <div className='grid grid-cols-1 mb-16 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <Blogcard />
                <Blogcard />
                <Blogcard />
                <Blogcard />
                <Blogcard />
            </div>
            <ReusablePagination
                currentPage={page}
                totalPages={totalPages}
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onPageChange={setPage}
            />
        </div>
    )
}

export default AllBLog