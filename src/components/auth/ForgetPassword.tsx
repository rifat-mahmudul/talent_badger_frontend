"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import VerifyOtpModal from "./VerifyOtpModal";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export default function ForgetPassword( { onOpenChange }: { onOpenChange: (open: boolean) => void } ) {
    const [open, setOpen] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState<string>("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["forgot-password"],
        mutationFn: (email: string) =>
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            }).then((res) => res.json()),

        onSuccess: (data, email) => {

            if (!data?.success) {
                toast.error(data?.message || "Something went wrong");
                return;
            }

            toast.success(data?.message || "Email sent successfully!");
            setSubmittedEmail(email);
            setOpen(true);
        },

        onError: (error) => {
            toast.error("Something went wrong. Please try again.");
            console.error("Forgot password error:", error);
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values.email);
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#616161] font-medium text-[16px] mb-2">Email Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Email Address"
                                        className="border border-[#616161] py-4 focus-visible:border-none"
                                        type="email"
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="bg-[#147575]  hover:bg-[#147575]/90 w-full "
                    >
                        Send OTP {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                    </Button>
                </form>
            </Form>

            {/* ✅ Modal shows after successful form submit */}
            <VerifyOtpModal
             setIsMOdalOpen={onOpenChange}
                open={open}
                onOpenChange={setOpen}
                email={submittedEmail}
            />

        </>
    );
}
