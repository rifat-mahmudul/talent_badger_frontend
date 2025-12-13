"use client"

import {
    toast
} from "sonner"
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import {
    z
} from "zod"

import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import {
    PasswordInput
} from "@/components/ui/password-input"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string(),
    createPassword: z.string(),
    confirmPassword: z.string()
});

export default function SginUpForm({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    })

    const { mutate, isPending } = useMutation({
        mutationKey: ["signup"],
        mutationFn: (payload: { firstName: string, lastName: string, password: string, email: string }) =>
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }).then((res) => res.json()),

        onSuccess: (data) => {
            if (!data?.success) {
                toast.error(data?.message || "Something went wrong");
                return;
            }

            toast.success(data?.message || " Account created successfully!");
            onOpenChange(false)
        },

        onError: (error) => {
            toast.error("Something went wrong. Please try again.");
            console.error("Signup error:", error);
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {

        mutate({
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.createPassword,
            email: values.email
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  ">
                <div className="grid grid-cols-12 gap-4">

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#616161] font-medium text-[16px] mb-2">First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="First Name"
                                            className="border border-[#616161] py-4 focus-visible:border-none"
                                            type=""
                                            {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#616161] font-medium text-[16px] mb-2">Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Last Name"
                                            className="border border-[#616161] py-4 focus-visible:border-none"
                                            type="text"
                                            {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>

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

                <FormField
                    control={form.control}
                    name="createPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#616161] font-medium text-[16px] mb-2">Create Password</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    className="border border-[#616161] py-4 focus-visible:border-none"
                                    placeholder="******" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#616161] font-medium text-[16px] mb-2">Confirm Password</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    className="border border-[#616161] py-4 focus-visible:border-none"
                                    placeholder="******" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="bg-[#147575]  hover:bg-[#147575]/90 w-full "
                >
                    Sign up {isPending && <Loader2 className="animate-spin" />}
                </Button>
            </form>
            <p className="text-center mt-16">Don’t have an account? <span
                onClick={() => {
                    onOpenChange(false)
                }}
                className="text-[#147575] font-normal cursor-pointer hover:underline"
            >
                Login
            </span></p>
        </Form>
    )
}