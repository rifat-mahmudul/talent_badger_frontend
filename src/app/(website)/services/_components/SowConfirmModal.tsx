"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface ProjectData {
  title: string;
  description: string;
  engineers?: string[]; // Array of user IDs
  totalPaid: string;
  totalTimeline: string;
}


interface SowConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  values: ProjectData ;
  files: File[];
  engineers: number;
}

export default function SowConfirmModal({
  open,
  onClose,
  onConfirm,
  values,
  files,
  engineers,
}: SowConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center" >
            Confirm Submission
          </DialogTitle>
          <DialogDescription className="text-center">
            Review your project details before final submission.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <p>
            <strong>Project Name :</strong> {values?.title}
          </p>

          <p>
            <strong>Budget :</strong> {values?.totalPaid}
          </p>

          <p>
            <strong>Timeline :</strong> {values?.totalTimeline} days
          </p>

          <div>
            <strong>Description :</strong>
            <div
              className="p-3 border rounded bg-gray-50 max-h-40 overflow-y-auto mt-2"
              dangerouslySetInnerHTML={{ __html: values?.description }}
            ></div>
          </div>

          <p>
            <strong>Files :</strong> {files.length} file(s)
          </p>

          <p>
            <strong>Engineers :</strong> {engineers} selected
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Back
          </Button>
          <Button className="bg-[#147575]" onClick={onConfirm}>
            Confirm & Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
