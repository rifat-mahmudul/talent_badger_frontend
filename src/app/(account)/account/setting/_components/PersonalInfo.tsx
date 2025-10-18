"use client";

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
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    emailAddress: z.string().email(),
    phoneNumber: z.string().min(1),
    address: z.string().min(1),
    joiningDate: z.date().optional(),
    designation: z.string().min(1),
    accessLevels: z.string().min(1),
    lastoginTime: z.string().min(1),
});

export default function PersonalInfo() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNumber: "",
            address: "",
            joiningDate: undefined,
            designation: "",
            accessLevels: "",
            lastoginTime: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            );
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }

    return (
        <Card>
            <CardContent>
                <Form {...form}>
                    <h2 className="text-3xl mt-8 text-[#343A40 font-semibold]">Personal Information</h2>
                    <p className="text-[#68706A] text-[16px] ">Manage your personal information and profile details.</p>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 max-w-3xl mx-auto py-10"
                    >
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-6">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#434C45] font-medium">First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="First Name" type="text" {...field} />
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
                                            <FormLabel className="text-[#434C45] font-medium">Last Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Last Name" type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-6">
                                <FormField
                                    control={form.control}
                                    name="emailAddress"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#434C45] font-medium">Email Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email Address" type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="col-span-6">
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#434C45] font-medium">Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Phone Number" type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-6">
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#434C45] font-medium">Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Address" type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>


                            <div className="col-span-6">
                                <FormField
                                    control={form.control}
                                    name="joiningDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel className="text-[#434C45] font-medium">Joining Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Select date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent align="start" className="p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-4">
                                <FormField
                                    control={form.control}
                                    name="designation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#434C45] font-medium">Designation</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Designation" type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="col-span-4">
                                <FormField
                                    control={form.control}
                                    name="accessLevels"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#434C45] font-medium">Access Levels</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Access Levels" type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="col-span-4">
                                <FormField
                                    control={form.control}
                                    name="lastoginTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#434C45] font-medium">Last Login Time</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Last Login Time" type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className=" flex items-center justify-end">

                            <Button type="submit" className="bg-[#147575] text-white" >Submit</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
