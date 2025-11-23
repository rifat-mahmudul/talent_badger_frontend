"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
import QuillEditor from "@/components/ui/quill-editor";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useTeamStore } from "@/store/teamStore";
import SowConfirmModal from "./SowConfirmModal";



const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  totalPaid: z.number().min(1, {
    message: "Total Paid must be a number",
  }),

  totalTimeline: z.number().min(1, {
    message: "Timeline must be a number",
  }),
  ndaAgreement: z
    .any()
    .optional()
    .refine((files) => !files || (Array.isArray(files) && files.length <= 5), {
      message: "You can upload a maximum of 5 files.",
    }),
});

const StatementOfWorkForm = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [confirmModal, setConfirmModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pendingValues, setPendingValues] = useState<any>(null);
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const team = useTeamStore((state) => state.team); 
  const clearTeam = useTeamStore((state) => state.clearTeam);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      totalPaid: 0,
      totalTimeline: 0,
      ndaAgreement: undefined,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (previewFiles.length + selectedFiles.length > 5) {
      toast.error("You can upload a maximum of 5 files.");
      return;
    }
    setPreviewFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setPreviewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  //   projects post api intgration
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-project"],
    mutationFn: async (formData: FormData) => {
      const res = await fetch(
        `${process?.env.NEXT_PUBLIC_BACKEND_URL}/project`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      return await res.json();
    },

    onSuccess: (data) => {
      if (!data?.success) {
        toast?.error(data?.message || "Something went wrong");
        return;
      }
      toast?.success(data?.message || "Project Created successfully");
      form.reset();
      setPreviewFiles([]);
      clearTeam();
      onOpenChange(false);
      
    },
  });

  // OPEN CONFIRM MODAL INSTEAD OF SUBMITTING
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (team.length === 0) {
      toast.error("Add engineers before submitting.");
      return;
    }

    setPendingValues(values);
    setConfirmModal(true);

  };

  // CONFIRMED SUBMISSION
  const handleFinalSubmit = () => {
    const formData = new FormData();

    const data = {
      title: pendingValues?.title,
      description: pendingValues?.description,
      totalPaid: pendingValues?.totalPaid,
      totalTimeline: pendingValues?.totalTimeline,
      engineers: team.map((e) => e._id),
    };

    formData.append("data", JSON.stringify(data));
    previewFiles.forEach((file) => formData.append("ndaAgreement", file));

    mutate(formData);
    setConfirmModal(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#147575] leading-[150%]">
              SOW (Statement of Work)
            </DialogTitle>
            <DialogDescription className="text-sm font-normal text-[#475569] leading-[150%] pt-1">
              Reserve your team today and get 10% off your kickoff sprint.
            </DialogDescription>
          </DialogHeader>

          {/* form  */}
          <div className="pt-5 h-[400px] md:h-[500px] overflow-y-auto scrollbar-hide">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 p-1"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-[#343A40] leading-[150%]">
                        Project Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full h-[49px] py-3 px-4 rounded-[8px] border-[1px] border-[#CBD5E1] placeholder:text-[#B7B7B7]"
                          placeholder="E-commerce Website"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-[#343A40] leading-[150%]">
                        Project Description
                      </FormLabel>
                      <FormControl className="h-[347px]">
                        <QuillEditor
                          id="description"
                          value={field.value}
                          onChange={(value: string) => field.onChange(value)} // ✅ FIXED
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalPaid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-[#343A40] leading-[150%]">
                        Project Budget
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="w-full h-[49px] py-3 px-4 rounded-[8px] border-[1px] border-[#CBD5E1] placeholder:text-[#B7B7B7]"
                          placeholder="Project budget"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="totalTimeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-[#343A40] leading-[150%]">
                        Project Time Line
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="w-full h-[49px] py-3 px-4 rounded-[8px] border-[1px] border-[#CBD5E1] placeholder:text-[#B7B7B7]"
                          placeholder="project timeline"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ndaAgreement"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-[#343A40] leading-[150%]">
                        Upload Your Custom NDA
                      </FormLabel>

                      <FormControl>
                        <div
                          className="border border-dashed border-[#C0C3C1] rounded-lg p-6 text-center bg-[#F9FAFB] hover:bg-[#F3F4F6] transition-colors"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            const droppedFiles = Array.from(
                              e.dataTransfer.files
                            );
                            if (previewFiles.length + droppedFiles.length > 5) {
                              toast.error(
                                "You can upload a maximum of 5 files."
                              );
                              return;
                            }
                            setPreviewFiles((prev) => [
                              ...prev,
                              ...droppedFiles,
                            ]);
                          }}
                        >
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                          >
                            <Upload className="w-8 h-8 text-[#82B7B4]" />
                            <span className="text-sm text-[#6B7280] font-medium">
                              Click to upload or drag and drop
                            </span>
                            <span className="text-xs text-[#9CA3AF]">
                              PNG, JPG, PDF, DOC up to 10MB (max 5 files)
                            </span>
                            <input
                              id="file-upload"
                              type="file"
                              accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                              multiple
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </label>

                          {previewFiles.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                              {previewFiles.map((file, index) => (
                                <div
                                  key={index}
                                  className="relative border border-[#E5E7EB] rounded-lg p-2 bg-white shadow-sm"
                                >
                                  {file.type.startsWith("image/") ? (
                                    <Image
                                      width={1000}
                                      height={1000}
                                      src={URL.createObjectURL(file)}
                                      alt={file.name}
                                      className="h-24 w-full object-cover rounded-md"
                                    />
                                  ) : (
                                    <div className="h-24 flex items-center justify-center text-sm text-gray-600">
                                      {file.name}
                                    </div>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="absolute top-1 right-1 bg-white rounded-full shadow p-1 hover:bg-gray-100"
                                  >
                                    <X className="w-4 h-4 text-gray-600" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </FormControl>

                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isPending}
                  className="w-full h-[48px] bg-[#147575] rounded-[6px] cursor-pointer text-base text-[#F7F8F8] leading-[150%] font-semibold py-3"
                  type="submit"
                >
                  {isPending ? "Pending..." : "Confirm"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
        {/* CONFIRM MODAL */}
      <SowConfirmModal
        open={confirmModal}
        onClose={() => setConfirmModal(false)}
        onConfirm={handleFinalSubmit}
        values={pendingValues}
        files={previewFiles}
        engineers={team.length}
      />
    </div>
  );
};

export default StatementOfWorkForm;
