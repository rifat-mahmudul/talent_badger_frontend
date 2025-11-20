"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

/* ---------------------------
   Zod Schema (Strong Typing)
---------------------------- */
const formSchema = z.object({
  date: z.date({
    message: "Date is required",
  }),
  time: z.string().min(1, "Time is required"),
  url: z.string().url("Please enter a valid URL"),

});

interface ScheduleMeetingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/* ---------------------------
   Component
---------------------------- */

const ScheduleTheMeetingModal = ({ open, onOpenChange }: ScheduleMeetingProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      time: "",
      url: ""
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitted:", values);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* You may remove this Trigger if opening the modal programmatically */}
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#343A40] leading-[150%]">
            Website Redesign Meeting
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date Picker */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full h-12 border-[1px] border-[#147575] rounded-[4px] py-2 px-4 text-black placeholder:text-[#929292] text-sm font-medium leading-[150%] ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value
                            ? format(field.value, "MMM dd, yyyy")
                            : "Pick a date"}

                          <CalendarIcon className="ml-auto h-3 w-3 " />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Picker */}
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input  type="time" className="h-12 border-[1px] border-[#147575] rounded-[4px] py-2 px-4 text-black placeholder:text-[#929292] text-sm font-medium leading-[150%]" {...field} placeholder="Time" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
             {/* put the link*/}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input  type="url" className="h-12 border-[1px] border-[#147575] rounded-[4px] py-2 px-4 text-black placeholder:text-[#929292] text-sm font-medium leading-[150%]" {...field} placeholder="Put the link" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button className="bg-[#147575] border-[1px] border-[#147575] rounded-[4px] h-[48px] w-full text-[#F8F9FA] text-sm font-semibold leading-[150%]" type="submit">Schedule The Meeting</button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleTheMeetingModal;
