// import React from 'react'
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
// import SginUpForm from './SginupForm'

// const SginUpModal = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent className='p-6'>
//                 <DialogHeader className='mb-10'>
//                     <DialogTitle><h3 className='text-[40px] font-normal text-[#147575]'>Create Your Account</h3></DialogTitle>
//                     <DialogDescription className='text-[#6C757D] mt-2 text-[16px]'>
//                     Step into the future of growth — join Talent Badger today
//                     </DialogDescription>
//                     <div>
//                         <p>User</p>
//                         <p>Engineer</p>
//                     </div>
//                 </DialogHeader>
//                 {/* Login Form */}
//                 <SginUpForm onOpenChange={onOpenChange} />
//             </DialogContent>
//         </Dialog>
//     )
// }

// export default SginUpModal

"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import SginUpForm from "./SginupForm"
import EngineerForm from "./Engineer"

const SginUpModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
    const [activeTab, setActiveTab] = useState<"user" | "engineer">("user")

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-6 max-w-4xl">
                <DialogHeader className="mb-4">
                    <DialogTitle>
                        <h3 className="text-[40px] font-normal text-[#147575]">
                            Create Your Account
                        </h3>
                    </DialogTitle>

                    <DialogDescription className="text-[#6C757D] mt-2 text-[16px]">
                        Step into the future of growth — join Talent Badger today
                    </DialogDescription>

                    {/* Tabs Buttons */}
                    <div className="flex gap-4 pt-5">
                        <button
                            onClick={() => setActiveTab("user")}
                            className={`px-4 py-2 rounded-lg border ${
                                activeTab === "user"
                                    ? "bg-[#147575] text-white"
                                    : "border-gray-300 text-gray-600"
                            }`}
                        >
                            User
                        </button>

                        <button
                            onClick={() => setActiveTab("engineer")}
                            className={`px-4 py-2 rounded-lg border ${
                                activeTab === "engineer"
                                    ? "bg-[#147575] text-white"
                                    : "border-gray-300 text-gray-600"
                            }`}
                        >
                            Engineer
                        </button>
                    </div>
                </DialogHeader>

                {/* Conditional Rendering */}
                {activeTab === "user" ? (
                    <SginUpForm onOpenChange={onOpenChange} />
                ) : (
                    <EngineerForm onOpenChange={onOpenChange} />
                )}
            </DialogContent>
        </Dialog>
    )
}

export default SginUpModal
