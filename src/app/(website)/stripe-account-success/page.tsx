"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function StripeSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DDFFFF] p-4 relative overflow-hidden">

      {/* Soft floating background glows */}
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-[#AEEEEE]/40 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#C4F5F5]/50 rounded-full blur-3xl animate-pulse-slower"></div>

      {/* Card */}
      <div className="relative bg-white/60 backdrop-blur-xl shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-white/50 animate-fade-in">

        {/* Animated success icon */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-[#8CDCDC]/40 animate-ping"></div>
            <CheckCircle className="w-24 h-24 text-[#009999] animate-scale-in" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#006666] mb-3 tracking-wide">
          Stripe Connected 🎉
        </h1>

        <p className="text-[#006666]/70 text-lg leading-relaxed mb-6">
          Your Stripe account has been successfully connected.  
          You’re now ready to receive payments!
        </p>

        <Link
          href="/engineer"
          className="inline-block mt-4 px-6 py-3 rounded-full bg-[#009999] text-white font-semibold shadow-lg hover:bg-[#008888] transition duration-300"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
