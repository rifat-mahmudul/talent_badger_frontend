"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Clock, Loader2 } from "lucide-react"
import ChangePasswordModal from "./ChangePasswordModal"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export function VerifyOtp({ email, setIsMOdalOpen }: { email: string, setIsMOdalOpen: (open: boolean) => void }) {
  // 🔢 Now 6 digits instead of 5
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(54)
  const [showModal, setShowModal] = useState(false)

  // 🕒 Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1
        if (newTime <= 0) clearInterval(timer)
        return Math.max(newTime, 0)
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // 🔢 Handle OTP input
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (digits.length > 0) {
      const newOtp = digits.split("").concat(Array(6 - digits.length).fill(""))
      setOtp(newOtp)
      const nextEmptyIndex = newOtp.findIndex((d) => d === "")
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
      setTimeout(() => {
        document.getElementById(`otp-${focusIndex}`)?.focus()
      }, 0)
    }
  }

  // ✅ Verify OTP mutation
  const { mutate: verifyOtp, isPending: isVerifyingOtp } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })
      return res.json()
    },
    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data?.message || "Invalid OTP. Please try again.")
        return
      }
      toast.success(data?.message || "OTP verified successfully!")
      setShowModal(true)
    },
    onError: (error) => {
      console.error("Verify OTP error:", error)
      toast.error("Something went wrong. Please try again.")
    },
  })

  // 🔁 Resend OTP mutation
  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationKey: ["resend-otp"],
    mutationFn: async (email: string) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      return res.json()
    },
    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data?.message || "Failed to resend OTP.")
        return
      }
      toast.success(data?.message || "OTP sent successfully!")
    },
    onError: (error) => {
      console.error("Resend OTP error:", error)
      toast.error("Something went wrong. Please try again.")
    },
  })

  // 🔘 Verify button click
  const handleVerify = () => {
    const fullOtp = otp.join("")
    if (fullOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.")
      return
    }
    verifyOtp({ email, otp: fullOtp })
  }

  // 🔁 Resend button click
  const handleResend = () => {
    setOtp(["", "", "", "", "", ""])
    setTimeLeft(54)
    resendOtp(email)
  }

  const isComplete = otp.every((digit) => digit !== "")
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full border-none shadow-none">
        {/* OTP Inputs */}
        <div className="flex gap-3 mb-6 justify-center">
          {otp.map((digit, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="h-12 w-12 text-center text-lg font-semibold border-2 border-teal-200 rounded-lg focus:border-teal-600 focus:ring-0"
              placeholder="•"
              inputMode="numeric"
              autoComplete="off"
            />
          ))}
        </div>

        {/* Timer + Resend */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{formatTime(timeLeft)}</span>
          </div>
          <button
            onClick={handleResend}
            className="text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors flex items-center gap-1"
          >
            Didn&apos;t get a code?{" "}
            <span className="underline flex items-center">
              Resend Code {isResending && <Loader2 className="animate-spin ml-1" size={16} />}
            </span>
          </button>
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={!isComplete || isVerifyingOtp}
          className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          {isVerifyingOtp ? (
            <>
              Verifying <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </Card>

      {/* ✅ Show modal after successful verification */}
      {showModal && (
        <ChangePasswordModal setIsMOdalOpen={setIsMOdalOpen} email={email} open={showModal} onOpenChange={setShowModal} />
      )}
    </div>
  )
}
