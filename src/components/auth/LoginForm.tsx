"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Checkbox } from "@/components/ui/checkbox"
import SginUpModal from "./SginUpModal"
import ForgetPasswordModal from "./ForgetPasswordModal"

const formSchema = z.object({
    userName: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().optional(),
})

export default function LoginForm() {
    const [isMOdalOpen, setIsMOdalOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
            password: "",
            rememberMe: false,
        },
    })

    // Load saved credentials from localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem("rememberedUser")
        if (savedUser) {
            const parsed = JSON.parse(savedUser)
            form.setValue("userName", parsed.userName || "")
            form.setValue("password", parsed.password || "")
            form.setValue("rememberMe", true)
        }
    }, [form])

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values)

            // Handle Remember Me logic
            if (values.rememberMe) {
                localStorage.setItem(
                    "rememberedUser",
                    JSON.stringify({
                        userName: values.userName,
                        password: values.password,
                    })
                )
            } else {
                localStorage.removeItem("rememberedUser")
            }

            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(values, null, 2)}
                    </code>
                </pre>
            )
        } catch (error) {
            console.error("Form submission error", error)
            toast.error("Failed to submit the form. Please try again.")
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-[16px]"
            >
                {/* Username */}
                <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#616161] font-medium text-[16px] mb-2">
                                User Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="border border-[#616161] py-4 focus-visible:border-none"
                                    placeholder="User Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#616161] font-medium text-[16px] mb-2">
                                Password
                            </FormLabel>
                            <FormControl>
                                <PasswordInput
                                    className="border border-[#616161] py-4 focus-visible:border-none"
                                    placeholder="Password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center  justify-between">
                    {/* Remember Me Checkbox */}
                    <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(checked) =>
                                            field.onChange(checked === true)
                                        }
                                    />
                                </FormControl>
                                <FormLabel className="text-[#616161] font-medium text-[14px]">
                                    Remember me
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                    <p onClick={() => setIsMOdalOpen(true)} className="text-[#147575] font-normal text-[16px] underline">Forgot password?</p>
                    <ForgetPasswordModal open={isMOdalOpen} onOpenChange={setIsMOdalOpen} />
                </div>
                {/* Submit Button */}
                <Button
                    type="submit"
                    className="bg-[#147575]  hover:bg-[#147575]/90 w-full "
                >
                    Submit
                </Button>
            </form>
            <p className="text-center mt-16">Don’t have an account? <span
                onClick={() => {
                    setOpen(true)
                }}
                className="text-[#147575] font-normal cursor-pointer hover:underline"
            >
                Sign Up
            </span></p>
            <SginUpModal open={open} onOpenChange={setOpen} />
        </Form>
    )
}
