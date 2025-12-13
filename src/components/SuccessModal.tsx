"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessModal({
  open,
  onClose,
  onRedirect,
}: {
  open: boolean;
  onClose: () => void;
  onRedirect: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-8 rounded-xl shadow-xl text-center relative bg-white">

        {/* Success Icon */}
        <div className="mx-auto mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
          <CheckCircle className="text-green-600" size={45} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#147575]">
          Successfully Added
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 mt-1">
          Added expertise was completed successful
        </p>

        {/* Button */}
        <Button
          onClick={onRedirect}
          className="w-full mt-6 bg-[#147575] hover:bg-[#147575]/90 py-3"
        >
          Back to Home Page
        </Button>
      </DialogContent>
    </Dialog>
  );
}
