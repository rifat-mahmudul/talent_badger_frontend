"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import StatementOfWorkForm from "./statement-of-work-form";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const BestConsultant = () => {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;
  const role = (session?.user as { role: string })?.role;

  const [isOpen, setIsOpen] = useState(false);
  
  const handleStartSOW = () => {
    if (!token) {
      toast.error("Please login first", {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
        }
      });
      return;
    }
    else if (role === "engineer") {
      toast.error("You are an Engineer", {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
        }
      });
      return;
    }
    setIsOpen(true);
  };

  return (
    <section className="container mx-auto my-16 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left Section */}
        <div className="w-full md:w-2/3 text-center md:text-left">
          <h2 className="text-[#147575] font-bold text-[28px] sm:text-[32px] md:text-[40px] leading-tight mb-3">
            Meet Best Consultant of Us
          </h2>
          <p className="text-[#929292] font-normal text-[16px] sm:text-[18px] max-w-[900px] mx-auto md:mx-0">
            Meet a curated selection of trusted professionals whose expertise,
            reliability, and excellence set the benchmark in every project.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 md:gap-5 justify-center md:justify-end">
          <Button
            onClick={handleStartSOW}
            className="bg-[#00383B] hover:bg-[#005356] text-white w-full sm:w-auto"
          >
            Start My SOW
          </Button>

          {/* <Button className="border border-[#00383B] bg-transparent text-[#00383B] hover:bg-[#00383B] hover:text-white w-full sm:w-auto">
            Help Me Choose My Team
          </Button> */}
        </div>
      </div>

      {/* SOW Modal */}
      {isOpen && (
        <StatementOfWorkForm
          open={isOpen}
          onOpenChange={(open: boolean) => setIsOpen(open)}
        />
      )}
    </section>
  );
};

export default BestConsultant;
