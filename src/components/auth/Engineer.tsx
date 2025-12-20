
"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import { useState } from "react";

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
import { PasswordInput } from "@/components/ui/password-input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useGetAllIndustry, useGetAllService } from "@/hooks/apiCalling";
import Image from "next/image";

const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    professionalTitle: z.string().min(1, "Professional title is required"),
    location: z.string().min(1, "Location is required"),
    skills: z.array(z.string()), // allow empty array
    service: z.string().min(1, "Please select a service"),
    industryOfInterest: z.string().min(1, "Select an industry"),
    rate: z.number().min(1, "Rate must be at least 1"),
    bio: z.string().min(10, "Bio must be at least 10 characters"),
    createPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.createPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function EngineerForm({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  const [skillInput, setSkillInput] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      professionalTitle: "",
      location: "",
      skills: [],
      service: "",
      industryOfInterest: "",
      rate: 1,
      bio: "",
      createPassword: "",
      confirmPassword: "",
    },
  });

  const allService = useGetAllService();
  const allIndustries = useGetAllIndustry();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (payload: FormData) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        method: "POST",
        body: payload,
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success(data?.message || "Account created successfully!");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error("Something went wrong. Please try again.");
      console.error("Signup error:", error);
    },
  });

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.createPassword);
    formData.append("professionTitle", values.professionalTitle);
    formData.append("location", values.location);
    values.skills.forEach((skill) => formData.append("skills", skill)); // <-- append each skill individually
    formData.append("role", "engineer");
    formData.append("service", values.service);
    formData.append("rate", values.rate.toString());
    formData.append("industry", values.industryOfInterest);
    formData.append("bio", values.bio);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    mutate(formData);
  };

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = skillInput.trim();
      if (value && !form.getValues("skills").includes(value)) {
        form.setValue("skills", [...form.getValues("skills"), value]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    form.setValue(
      "skills",
      form.getValues("skills").filter((s) => s !== skill)
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:max-h-[750px]  max-h-[400px] hide-scrollbar overflow-y-auto overflow-hidden w-full mx-auto"
      >
        {/* Profile Image */}
        <FormItem>
          <FormLabel>Profile Image</FormLabel>
          <FormControl>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setProfileImage(file);
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                />
                <div className="w-20 h-20 rounded-full border border-gray-300 overflow-hidden flex items-center justify-center bg-gray-100">
                  {previewUrl ? (
                    <Image
                      width={500}
                      height={500}
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Upload</span>
                  )}
                </div>
              </label>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} className="py-3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} className="py-3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="hello@example.com" {...field} className="py-3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* rate  */}

          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate/hr ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="50"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value === "" ? "" : Number(e.target.value);
                      field.onChange(value);
                    }}
                    value={field.value ?? ""}
                    className="py-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>


        {/* Professional Title & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="professionalTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Title</FormLabel>
                <FormControl>
                  <Input placeholder="Senior Engineer" {...field} className="py-3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="San Francisco, CA" {...field} className="py-3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Skills */}
        <FormField
          control={form.control}
          name="skills"
          render={() => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <div className="border border-gray-300 rounded-md p-2 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {form.watch("skills").map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                  <input
                    placeholder="Add your top skills..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={addSkill}
                    className="flex-1 min-w-[150px] outline-none py-1 text-sm"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Service & Industry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={allService.isLoading || !allService.data}
                >
                  <SelectTrigger className="py-3">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {allService.isLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : (
                      allService.data?.data?.map((service) => (
                        <SelectItem key={service._id} value={service._id}>
                          {service.serviceName}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industryOfInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={allIndustries.isLoading || !allIndustries.data}
                >
                  <SelectTrigger className="py-3">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {allIndustries.isLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : (
                      allIndustries.data?.data?.map((ind) => (
                        <SelectItem key={ind._id} value={ind._id}>
                          {ind.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Short bio..."
                  {...field}
                  className="py-3 min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Passwords */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="createPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Create Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} placeholder="******" className="py-3" />
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} placeholder="******" className="py-3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full py-4 bg-[#147575] hover:bg-[#147575]/90"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" /> Creating Account...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => onOpenChange(false)}
            className="text-[#147575] cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </form>
    </Form>
  );
}
