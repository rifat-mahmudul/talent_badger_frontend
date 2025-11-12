import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { ChangePassword } from './ChangePassword'

const ChangePasswordModal = ({ open, onOpenChange, email,setIsMOdalOpen}: { open: boolean, email: string, onOpenChange: (open: boolean) => void , setIsMOdalOpen: (open: boolean) => void }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='p-6'>
                <DialogHeader className='mb-7'>
                    <DialogTitle><h3 className='text-[40px] font-normal text-[#147575]'>Change Password</h3></DialogTitle>
                    <DialogDescription className='text-[#6C757D] mt-2 text-[16px]'>
                        Enter your email to recover your password
                    </DialogDescription>
                </DialogHeader>
                <ChangePassword setIsMOdalOpen={setIsMOdalOpen} email={email} />
            </DialogContent>
        </Dialog>
    )
}

export default ChangePasswordModal