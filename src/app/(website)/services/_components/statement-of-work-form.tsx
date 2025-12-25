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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useTeamStore } from "@/store/teamStore";
import SowConfirmModal from "./SowConfirmModal";

/* ---------------- schema ---------------- */
const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(2, "Description must be at least 2 characters"),
  totalPaid: z.string().min(2, "Total paid must be at least 2 characters"),
  totalTimeline: z.string().min(1, "Total timeline must be at least 1 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const StatementOfWorkForm = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [pendingValues, setPendingValues] = useState<FormValues | null>(null);

  const [engineerHours, setEngineerHours] = useState<Record<string, number>>(
    {}
  );
  const [calculatedTotal, setCalculatedTotal] = useState(0);

  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;

  const team = useTeamStore((state) => state.team);
  const clearTeam = useTeamStore((state) => state.clearTeam);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      totalPaid: "",
      totalTimeline: "",
    },
  });

  /* ---------------- LOAD HOURS + CALCULATE TOTAL ---------------- */
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("assignedEngineerHours") || "[]") as {
        engineerId: string;
        hours: number;
      }[];

    const hoursMap = saved.reduce<Record<string, number>>((acc, cur) => {
      acc[cur.engineerId] = cur.hours;
      return acc;
    }, {});

    setEngineerHours(hoursMap);

    const total = team.reduce((sum, engineer) => {
      const hours = hoursMap[engineer._id] || 0;
      return sum + (engineer.rate ?? 0) * hours;
    }, 0);

    setCalculatedTotal(total);
    form.setValue("totalPaid", total.toString());
  }, [team, form]);

  /* ---------------- FILE HANDLING ---------------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (previewFiles.length + files.length > 5) {
      toast.error("Maximum 5 files allowed");
      return;
    }
    setPreviewFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setPreviewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------------- API ---------------- */
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-project"],
    mutationFn: async (formData: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      return res.json();
    },
    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success("Project created successfully");
      form.reset();
      setPreviewFiles([]);
      clearTeam();
      onOpenChange(false);
      localStorage.removeItem("assignedEngineerHours");
     window.location.reload();
    },
  });

  /* ---------------- SUBMIT FLOW ---------------- */
  const onSubmit = (values: FormValues) => {
    if (team.length === 0) {
      toast.error("Add engineers before submitting");
      return;
    }

    if (Number(values.totalPaid) < calculatedTotal) {
      toast.error(`Budget cannot be less than $${calculatedTotal}`);
      return;
    }


    setPendingValues(values);
    setConfirmModal(true);
  };

  const handleFinalSubmit = () => {
    if (!pendingValues) return;

    const formData = new FormData();

    const payload = {
      title: pendingValues.title,
      description: pendingValues.description,
      totalPaid: pendingValues.totalPaid,
      totalTimeline: pendingValues.totalTimeline,
      engineers: team.map((e) => ({
        engineer: e._id,
        allocatedHours: engineerHours[e._id] || 0,
      })),
    };

    formData.append("data", JSON.stringify(payload));

    // Append NDA files if any
    previewFiles.forEach((file) => formData.append("ndaAgreement", file));

    mutate(formData);
    setConfirmModal(false);
    localStorage.removeItem("assignedEngineerHours")
    localStorage.removeItem("myTeam")

  };

  /* ---------------- UI ---------------- */
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold text-[#147575]">
              Statement of Work
            </DialogTitle>
            <DialogDescription>
              Review your team & project cost before submitting
            </DialogDescription>
          </DialogHeader>

          {/* COST BREAKDOWN */}
          <div className="bg-gray-50 border rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-sm">Team Cost Breakdown</h4>
            {team.map((e) => {
              const hours = engineerHours[e._id] || 0;
              const cost = e.rate && e.rate * hours;
              return (
                <div key={e._id} className="flex justify-between text-sm">
                  <span>
                    {e.firstName} ({hours}h × ${e.rate})
                  </span>
                  <span>${cost}</span>
                </div>
              );
            })}
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total Project Value</span>
              <span>${calculatedTotal}</span>
            </div>
          </div>

          {/* FORM */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <QuillEditor
                        id="description-editor"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* NDA UPLOAD */}
              <FormItem>
                <FormLabel>Upload NDA (Max 5 files)</FormLabel>
                <FormControl>
                  <div
                    className="border border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const droppedFiles = Array.from(e.dataTransfer.files);
                      if (previewFiles.length + droppedFiles.length > 5) {
                        toast.error("Maximum 5 files allowed");
                        return;
                      }
                      setPreviewFiles((prev) => [...prev, ...droppedFiles]);
                    }}
                  >
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center"
                    >
                      <Upload className="w-8 h-8 text-[#82B7B4]" />
                      <span>Click to upload or drag and drop</span>
                      <input
                        id="file-upload"
                        type="file"
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
                            className="relative border p-2 rounded-md bg-white"
                          >
                            {file.type.startsWith("image/") ? (
                              <Image
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                width={1000}
                                height={1000}
                                className="h-24 w-full object-cover rounded-md"
                              />
                            ) : (
                              <div className="h-24 flex items-center justify-center text-sm">
                                {file.name}
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="absolute top-1 right-1 bg-white rounded-full shadow p-1 hover:bg-gray-100"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormControl>
              </FormItem>

              <FormField
                control={form.control}
                name="totalPaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Budget (min ${calculatedTotal})</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalTimeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timeline (in days)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#147575]"
              >
                {isPending ? "Submitting..." : "Confirm"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {pendingValues && (
        <SowConfirmModal
          open={confirmModal}
          onClose={() => setConfirmModal(false)}
          onConfirm={handleFinalSubmit}
          values={pendingValues}
          files={previewFiles}
          engineers={team.length}
        />
      )}
    </>
  );
};

export default StatementOfWorkForm;
