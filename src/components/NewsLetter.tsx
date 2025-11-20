'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type FormValues = z.infer<typeof formSchema>;

export function NewsletterModal({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: FormValues) => {
        console.log('Newsletter subscription:', data);
        // You could close the modal after success:
        onOpenChange(false);
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl py-16">
                {/* Close button is built-in (top-right X) */}
                <DialogHeader>
                    <DialogTitle className='text-[#343A40] font-semibold text-3xl mb-5'>Subscribe to our newsletter</DialogTitle>
                    <DialogDescription className='text-[#343A40] my-4 font-normal text-[16px]'>
                        Subscribe to receive the latest news and updates from our blog.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register('email')}
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-10 bg-[#147575] hover:bg-[#147575]/80 "
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Subscribing…' : 'Subscribe'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}


export default function App() {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)} className="m-4">
                Open Newsletter Modal
            </Button>

            <NewsletterModal open={open} onOpenChange={setOpen} />
        </>
    );
}