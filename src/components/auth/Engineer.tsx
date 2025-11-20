
// // "use client";

// // import { toast } from "sonner";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { z } from "zod";
// // import { useMutation } from "@tanstack/react-query";
// // import { Loader2, X } from "lucide-react";
// // import { useState } from "react";

// // import { Button } from "@/components/ui/button";
// // import {
// //     Form,
// //     FormControl,
// //     FormField,
// //     FormItem,
// //     FormLabel,
// //     FormMessage,
// // } from "@/components/ui/form";
// // import { Input } from "@/components/ui/input";
// // import { PasswordInput } from "@/components/ui/password-input";
// // import { Textarea } from "@/components/ui/textarea";
// // import {
// //     Select,
// //     SelectContent,
// //     SelectItem,
// //     SelectTrigger,
// //     SelectValue,
// // } from "@/components/ui/select";
// // import { Badge } from "@/components/ui/badge";
// // import { useGetAllIndustry, useGetAllService } from "@/hooks/apiCalling";



// // const INDUSTRY_OPTIONS = [
// //     "MedTech & Healthcare",
// //     "FinTech",
// //     "EdTech",
// //     "E-commerce",
// //     "SaaS",
// //     "AI & ML",
// //     "Blockchain",
// //     "Gaming",
// //     "Logistics",
// //     "Real Estate",
// // ];

// // const formSchema = z
// //     .object({
// //         firstName: z.string().min(1, "First name is required"),
// //         lastName: z.string().min(1, "Last name is required"),
// //         email: z.string().email("Invalid email address"),
// //         professionalTitle: z.string().min(1, "Professional title is required"),
// //         location: z.string().min(1, "Location is required"),
// //         skills: z.array(z.string()).min(1, "Add at least one skill"),
// //         service: z.string().min(1, "Please select a service"),
// //         industriesOfInterest: z.array(z.string()).min(1, "Select at least one industry"),
// //         bio: z.string().min(10, "Bio must be at least 10 characters"),
// //         createPassword: z.string().min(6, "Password must be at least 6 characters"),
// //         confirmPassword: z.string(),
// //     })
// //     .refine((data) => data.createPassword === data.confirmPassword, {
// //         message: "Passwords do not match",
// //         path: ["confirmPassword"],
// //     });

// // type FormValues = z.infer<typeof formSchema>;

// // export default function EngineerForm({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
// //     const [skillInput, setSkillInput] = useState("");
// //     const form = useForm<FormValues>({
// //         resolver: zodResolver(formSchema),
// //         defaultValues: {
// //             firstName: "",
// //             lastName: "",
// //             email: "",
// //             professionalTitle: "",
// //             location: "",
// //             skills: [],
// //             service: "",
// //             industriesOfInterest: [],
// //             bio: "",
// //             createPassword: "",
// //             confirmPassword: "",
// //         },
// //     });

// //     const allServie = useGetAllService()
// //     const allIndustries = useGetAllIndustry()
// //     console.log("allServie", allServie.data?.data)
// //     console.log("allIndustries", allIndustries.data?.data)

// //     const { mutate, isPending } = useMutation({
// //         mutationKey: ["signup"],
// //         mutationFn: (payload) =>
// //             fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
// //                 method: "POST",
// //                 headers: { "Content-Type": "application/json" },
// //                 body: JSON.stringify(payload),
// //             }).then((res) => res.json()),

// //         onSuccess: (data) => {
// //             if (!data?.success) {
// //                 toast.error(data?.message || "Something went wrong");
// //                 return;
// //             }
// //             toast.success(data?.message || "Account created successfully!");
// //             onOpenChange(false);
// //         },

// //         onError: (error) => {
// //             toast.error("Something went wrong. Please try again.");
// //             console.error("Signup error:", error);
// //         },
// //     });

// //     const onSubmit = (values: FormValues) => {
// //         // mutate({
// //         //     firstName: values.firstName,
// //         //     lastName: values.lastName,
// //         //     email: values.email,
// //         //     password: values.createPassword,
// //         //     professionalTitle: values.professionalTitle,
// //         //     location: values.location,
// //         //     skills: values.skills,
// //         //     service: values.service,
// //         //     industriesOfInterest: values.industriesOfInterest,
// //         //     bio: values.bio,
// //         // });
// //     };

// //     const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
// //         if (e.key === "Enter" || e.key === ",") {
// //             e.preventDefault();
// //             const value = skillInput.trim();
// //             if (value && !form.getValues("skills").includes(value)) {
// //                 form.setValue("skills", [...form.getValues("skills"), value]);
// //             }
// //             setSkillInput("");
// //         }
// //     };

// //     const removeSkill = (skill: string) => {
// //         form.setValue(
// //             "skills",
// //             form.getValues("skills").filter((s) => s !== skill)
// //         );
// //     };

// //     return (
// //         <Form {...form}>
// //             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full mx-auto">
// //                 {/* Name Fields */}
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                     <FormField
// //                         control={form.control}
// //                         name="firstName"
// //                         render={({ field }) => (
// //                             <FormItem>
// //                                 <FormLabel>First Name</FormLabel>
// //                                 <FormControl>
// //                                     <Input placeholder="John" {...field} className="py-3" />
// //                                 </FormControl>
// //                                 <FormMessage />
// //                             </FormItem>
// //                         )}
// //                     />
// //                     <FormField
// //                         control={form.control}
// //                         name="lastName"
// //                         render={({ field }) => (
// //                             <FormItem>
// //                                 <FormLabel>Last Name</FormLabel>
// //                                 <FormControl>
// //                                     <Input placeholder="Doe" {...field} className="py-3" />
// //                                 </FormControl>
// //                                 <FormMessage />
// //                             </FormItem>
// //                         )}
// //                     />
// //                 </div>

// //                 {/* Email */}
// //                 <FormField
// //                     control={form.control}
// //                     name="email"
// //                     render={({ field }) => (
// //                         <FormItem>
// //                             <FormLabel>Email Address</FormLabel>
// //                             <FormControl>
// //                                 <Input placeholder="hello@example.com" {...field} className="py-3" />
// //                             </FormControl>
// //                             <FormMessage />
// //                         </FormItem>
// //                     )}
// //                 />

// //                 {/* Professional Title & Location */}
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                     <FormField
// //                         control={form.control}
// //                         name="professionalTitle"
// //                         render={({ field }) => (
// //                             <FormItem>
// //                                 <FormLabel>Professional Title</FormLabel>
// //                                 <FormControl>
// //                                     <Input placeholder="Senior Engineer" {...field} className="py-3" />
// //                                 </FormControl>
// //                                 <FormMessage />
// //                             </FormItem>
// //                         )}
// //                     />
// //                     <FormField
// //                         control={form.control}
// //                         name="location"
// //                         render={({ field }) => (
// //                             <FormItem>
// //                                 <FormLabel>Location</FormLabel>
// //                                 <FormControl>
// //                                     <Input placeholder="San Francisco, CA" {...field} className="py-3" />
// //                                 </FormControl>
// //                                 <FormMessage />
// //                             </FormItem>
// //                         )}
// //                     />
// //                 </div>

// //                 {/* Skills */}
// //                 <FormField
// //                     control={form.control}
// //                     name="skills"
// //                     render={() => (
// //                         <FormItem>
// //                             <FormLabel>Skills</FormLabel>
// //                             <FormControl>
// //                                 <div className="border border-gray-300 rounded-md p-2 min-h-[50px] flex flex-wrap gap-2 items-center">
// //                                     {form.watch("skills").map((skill) => (
// //                                         <Badge key={skill} variant="secondary" className="flex items-center gap-1">
// //                                             {skill}
// //                                             <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
// //                                         </Badge>
// //                                     ))}
// //                                     <input
// //                                         placeholder="Add your top skills..."
// //                                         value={skillInput}
// //                                         onChange={(e) => setSkillInput(e.target.value)}
// //                                         onKeyDown={addSkill}
// //                                         className="flex-1 min-w-[150px] outline-none py-1 text-sm"
// //                                     />
// //                                 </div>
// //                             </FormControl>
// //                             <FormMessage />
// //                         </FormItem>
// //                     )}
// //                 />

// //                 {/* Service & Industries */}
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                     <FormField
// //                         control={form.control}
// //                         name="service"
// //                         render={({ field }) => (
// //                             <FormItem>
// //                                 <FormLabel>Service</FormLabel>
// //                                 <Select
// //                                     onValueChange={field.onChange}
// //                                     value={field.value}
// //                                     disabled={allServie.isLoading || !allServie.data}
// //                                 >
// //                                     <FormControl>
// //                                         <SelectTrigger className="py-3">
// //                                             <SelectValue placeholder="Select service" />
// //                                         </SelectTrigger>
// //                                     </FormControl>
// //                                     <SelectContent>
// //                                         {allServie.isLoading && (
// //                                             <SelectItem value="">Loading...</SelectItem>
// //                                         )}
// //                                         {allServie.data?.data?.map((service) => (
// //                                             <SelectItem key={service?._id} value={service?.serviceName}>
// //                                                 {service?.serviceName}
// //                                             </SelectItem>
// //                                         ))}
// //                                     </SelectContent>
// //                                 </Select>
// //                                 <FormMessage />
// //                             </FormItem>
// //                         )}
// //                     />


// //                     <FormField
// //                         control={form.control}
// //                         name="industriesOfInterest"
// //                         render={() => (
// //                             <FormItem>
// //                                 <FormLabel>Industries of Interest</FormLabel>
// //                                 <FormControl>
// //                                     <div className="flex flex-wrap gap-2 items-center">
// //                                         {form.watch("industriesOfInterest").map((industry) => (
// //                                             <Badge key={industry} variant="secondary" className="flex items-center gap-1">
// //                                                 {industry}
// //                                                 <X
// //                                                     className="h-3 w-3 cursor-pointer"
// //                                                     onClick={() =>
// //                                                         form.setValue(
// //                                                             "industriesOfInterest",
// //                                                             form.getValues("industriesOfInterest").filter((i) => i !== industry)
// //                                                         )
// //                                                     }
// //                                                 />
// //                                             </Badge>
// //                                         ))}

// //                                         <Select
// //                                             onValueChange={(value) => {
// //                                                 if (!form.getValues("industriesOfInterest").includes(value)) {
// //                                                     form.setValue("industriesOfInterest", [
// //                                                         ...form.getValues("industriesOfInterest"),
// //                                                         value,
// //                                                     ]);
// //                                                 }
// //                                             }}
// //                                             disabled={allIndustries.isLoading || !allIndustries.data}
// //                                         >
// //                                             <SelectTrigger className="py-1">
// //                                                 <span className="text-sm text-muted-foreground">
// //                                                     {form.watch("industriesOfInterest").length === 0 ? "Select..." : "Add more..."}
// //                                                 </span>
// //                                             </SelectTrigger>
// //                                             <SelectContent>
// //                                                 {allIndustries.isLoading && (
// //                                                     <SelectItem value="loading" disabled>
// //                                                         Loading...
// //                                                     </SelectItem>
// //                                                 )}
// //                                                 {allIndustries.data?.data
// //                                                     .filter((ind) => !form.watch("industriesOfInterest").includes(ind.name))
// //                                                     .map((ind) => (
// //                                                         <SelectItem key={ind._id} value={ind.name}>
// //                                                             {ind.name}
// //                                                         </SelectItem>
// //                                                     ))}
// //                                             </SelectContent>
// //                                         </Select>

// //                                     </div>
// //                                 </FormControl>
// //                                 <FormMessage />
// //                             </FormItem>
// //                         )}
// //                     />

// //                 </div>

// //                 {/* Bio */}
// //                 <FormField
// //                     control={form.control}
// //                     name="bio"
// //                     render={({ field }) => (
// //                         <FormItem>
// //                             <FormLabel>Bio</FormLabel>
// //                             <FormControl>
// //                                 <Textarea placeholder="Short bio..." {...field} className="py-3 min-h-[100px]" />
// //                             </FormControl>
// //                             <FormMessage />
// //                         </FormItem>
// //                     )}
// //                 />

// //                 {/* Passwords */}
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                     <FormField
// //                         control={form.control}
// //                         name="createPassword"
// //                         render={({ field }) => (
// //                             <FormItem>
// //                                 <FormLabel>Create Password</FormLabel>
// //                                 <FormControl>
// //                                     <PasswordInput {...field} placeholder="******" className="py-3" />
// //                                 </FormControl>
// //                                 <FormMessage />
// //                             </FormItem>
// //                         )}
// //                     />
// //                     <FormField
// //                         control={form.control}
// //                         name="confirmPassword"
// //                         render={({ field }) => (
// //                             <FormItem>
// //                                 <FormLabel>Confirm Password</FormLabel>
// //                                 <FormControl>
// //                                     <PasswordInput {...field} placeholder="******" className="py-3" />
// //                                 </FormControl>
// //                                 <FormMessage />
// //                             </FormItem>
// //                         )}
// //                     />
// //                 </div>

// //                 {/* Submit */}
// //                 <Button type="submit" disabled={isPending} className="w-full py-4 bg-[#147575] hover:bg-[#147575]/90">
// //                     {isPending ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Creating Account...</> : "Sign Up"}
// //                 </Button>

// //                 <p className="text-center mt-4 text-sm">
// //                     Already have an account?{" "}
// //                     <span onClick={() => onOpenChange(false)} className="text-[#147575] cursor-pointer hover:underline">
// //                         Log in
// //                     </span>
// //                 </p>
// //             </form>
// //         </Form>
// //     );
// // }


// "use client";

// import { toast } from "sonner";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useMutation } from "@tanstack/react-query";
// import { Loader2, X } from "lucide-react";
// import { useState } from "react";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { PasswordInput } from "@/components/ui/password-input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { useGetAllIndustry, useGetAllService } from "@/hooks/apiCalling";

// const formSchema = z
//   .object({
//     firstName: z.string().min(1, "First name is required"),
//     lastName: z.string().min(1, "Last name is required"),
//     email: z.string().email("Invalid email address"),
//     professionalTitle: z.string().min(1, "Professional title is required"),
//     location: z.string().min(1, "Location is required"),
//     skills: z.array(z.string()).min(1, "Add at least one skill"),
//     service: z.string().min(1, "Please select a service"),
//     industriesOfInterest: z
//       .array(z.string())
//       .min(1, "Select at least one industry"),
//     bio: z.string().min(10, "Bio must be at least 10 characters"),
//     createPassword: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.createPassword === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// type FormValues = z.infer<typeof formSchema>;

// export default function EngineerForm({
//   onOpenChange,
// }: {
//   onOpenChange: (open: boolean) => void;
// }) {
//   const [skillInput, setSkillInput] = useState("");
//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       professionalTitle: "",
//       location: "",
//       skills: [],
//       service: "",
//       industriesOfInterest: [],
//       bio: "",
//       createPassword: "",
//       confirmPassword: "",
//     },
//   });

//   const allService = useGetAllService();
//   const allIndustries = useGetAllIndustry();

//   const { mutate, isPending } = useMutation({
//     mutationKey: ["signup"],
//     mutationFn: (payload) =>
//       fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       }).then((res) => res.json()),
//     onSuccess: (data) => {
//       if (!data?.success) {
//         toast.error(data?.message || "Something went wrong");
//         return;
//       }
//       toast.success(data?.message || "Account created successfully!");
//       onOpenChange(false);
//     },
//     onError: (error) => {
//       toast.error("Something went wrong. Please try again.");
//       console.error("Signup error:", error);
//     },
//   });

//   const onSubmit = (values: FormValues) => {
//     console.log("Form values:", values);
//     // mutate({
//     //   firstName: values.firstName,
//     //   lastName: values.lastName,
//     //   email: values.email,
//     //   password: values.createPassword,
//     //   professionalTitle: values.professionalTitle,
//     //   location: values.location,
//     //   skills: values.skills,
//     //   service: values.service,
//     //   industriesOfInterest: values.industriesOfInterest,
//     //   bio: values.bio,
//     // });
//   };

//   const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       const value = skillInput.trim();
//       if (value && !form.getValues("skills").includes(value)) {
//         form.setValue("skills", [...form.getValues("skills"), value]);
//       }
//       setSkillInput("");
//     }
//   };

//   const removeSkill = (skill: string) => {
//     form.setValue(
//       "skills",
//       form.getValues("skills").filter((s) => s !== skill)
//     );
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-4 w-full mx-auto"
//       >
//         {/* Name Fields */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <FormField
//             control={form.control}
//             name="firstName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>First Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="John" {...field} className="py-3" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="lastName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Last Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Doe" {...field} className="py-3" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         {/* Email */}
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email Address</FormLabel>
//               <FormControl>
//                 <Input placeholder="hello@example.com" {...field} className="py-3" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Professional Title & Location */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <FormField
//             control={form.control}
//             name="professionalTitle"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Professional Title</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Senior Engineer" {...field} className="py-3" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="location"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Location</FormLabel>
//                 <FormControl>
//                   <Input placeholder="San Francisco, CA" {...field} className="py-3" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         {/* Skills */}
//         <FormField
//           control={form.control}
//           name="skills"
//           render={() => (
//             <FormItem>
//               <FormLabel>Skills</FormLabel>
//               <FormControl>
//                 <div className="border border-gray-300 rounded-md p-2 min-h-[50px] flex flex-wrap gap-2 items-center">
//                   {form.watch("skills").map((skill) => (
//                     <Badge
//                       key={skill}
//                       variant="secondary"
//                       className="flex items-center gap-1"
//                     >
//                       {skill}
//                       <X
//                         className="h-3 w-3 cursor-pointer"
//                         onClick={() => removeSkill(skill)}
//                       />
//                     </Badge>
//                   ))}
//                   <input
//                     placeholder="Add your top skills..."
//                     value={skillInput}
//                     onChange={(e) => setSkillInput(e.target.value)}
//                     onKeyDown={addSkill}
//                     className="flex-1 min-w-[150px] outline-none py-1 text-sm"
//                   />
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Service & Industries */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {/* Service Select */}
//           <FormField
//             control={form.control}
//             name="service"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Service</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   value={field.value}
//                   disabled={allService.isLoading || !allService.data}
//                 >
//                   <SelectTrigger className="py-3">
//                     <SelectValue placeholder="Select service" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {allService.isLoading ? (
//                       <SelectItem value="loading" disabled>
//                         Loading...
//                       </SelectItem>
//                     ) : (
//                       allService.data?.data?.map((service) => (
//                         <SelectItem key={service._id} value={service.serviceName}>
//                           {service.serviceName}
//                         </SelectItem>
//                       ))
//                     )}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Industries Select */}
//           <FormField
//             control={form.control}
//             name="industriesOfInterest"
//             render={() => (
//               <FormItem>
//                 <FormLabel>Industries of Interest</FormLabel>
//                 <FormControl>
//                   <div className="flex flex-wrap gap-2 items-center">
//                     {form.watch("industriesOfInterest").map((industry) => (
//                       <Badge
//                         key={industry}
//                         variant="secondary"
//                         className="flex items-center gap-1"
//                       >
//                         {industry}
//                         <X
//                           className="h-3 w-3 cursor-pointer"
//                           onClick={() =>
//                             form.setValue(
//                               "industriesOfInterest",
//                               form
//                                 .getValues("industriesOfInterest")
//                                 .filter((i) => i !== industry)
//                             )
//                           }
//                         />
//                       </Badge>
//                     ))}

//                     <Select
//                       onValueChange={(value) => {
//                         if (!form.getValues("industriesOfInterest").includes(value)) {
//                           form.setValue("industriesOfInterest", [
//                             ...form.getValues("industriesOfInterest"),
//                             value,
//                           ]);
//                         }
//                       }}
//                       disabled={allIndustries.isLoading || !allIndustries.data}
//                     >
//                       <SelectTrigger className="py-1">
//                         <SelectValue placeholder="Select industries" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {allIndustries.isLoading ? (
//                           <SelectItem value="loading" disabled>
//                             Loading...
//                           </SelectItem>
//                         ) : (
//                           allIndustries.data?.data
//                             .filter(
//                               (ind) =>
//                                 !form
//                                   .watch("industriesOfInterest")
//                                   .includes(ind.name)
//                             )
//                             .map((ind) => (
//                               <SelectItem key={ind._id} value={ind.name}>
//                                 {ind.name}
//                               </SelectItem>
//                             ))
//                         )}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         {/* Bio */}
//         <FormField
//           control={form.control}
//           name="bio"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Bio</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Short bio..."
//                   {...field}
//                   className="py-3 min-h-[100px]"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Passwords */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <FormField
//             control={form.control}
//             name="createPassword"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Create Password</FormLabel>
//                 <FormControl>
//                   <PasswordInput {...field} placeholder="******" className="py-3" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="confirmPassword"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Confirm Password</FormLabel>
//                 <FormControl>
//                   <PasswordInput {...field} placeholder="******" className="py-3" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         {/* Submit */}
//         <Button
//           type="submit"
//           disabled={isPending}
//           className="w-full py-4 bg-[#147575] hover:bg-[#147575]/90"
//         >
//           {isPending ? (
//             <>
//               <Loader2 className="animate-spin mr-2 h-4 w-4" /> Creating Account...
//             </>
//           ) : (
//             "Sign Up"
//           )}
//         </Button>

//         <p className="text-center mt-4 text-sm">
//           Already have an account?{" "}
//           <span
//             onClick={() => onOpenChange(false)}
//             className="text-[#147575] cursor-pointer hover:underline"
//           >
//             Log in
//           </span>
//         </p>
//       </form>
//     </Form>
//   );
// }



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

const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    professionalTitle: z.string().min(1, "Professional title is required"),
    location: z.string().min(1, "Location is required"),
    skills: z.array(z.string()).min(1, "Add at least one skill"),
    service: z.string().min(1, "Please select a service"),
    industryOfInterest: z.string().min(1, "Select an industry"),
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
      bio: "",

      createPassword: "",
      confirmPassword: "",
    },
  });


  const allService = useGetAllService();
  const allIndustries = useGetAllIndustry();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (payload: { firstName: string, lastName: string, email: string, createPassword: string, professionalTitle: string, location: string, skills: string[], service: string, industryOfInterest: string, bio: string }) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            password: payload.createPassword,
            professionTitle: payload.professionalTitle,
            location: payload.location,
            skills: payload.skills,
            role: "engineer",
            service: payload.service,
            industry: payload.industryOfInterest,
            bio: payload.bio
          }
        ),
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
    console.log("Form values:", values);
    mutate({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      createPassword: values.createPassword,
      professionalTitle: values.professionalTitle,
      location: values.location,
      skills: values.skills,
      service: values.service,
      industryOfInterest: values.industryOfInterest,
      bio: values.bio
    })
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
        className="space-y-4 max-h-[500px] hide-scrollbar  overflow-y-auto overflow-hidden w-full mx-auto"
      >
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
          {/* Service Select */}
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

          {/* Industry Select (single) */}
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
