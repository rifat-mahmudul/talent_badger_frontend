"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export function ChangePassword({ email ,setIsMOdalOpen}: { email: string , setIsMOdalOpen: (open: boolean) => void }) {
    console.log("[v0] ChangePassword component rendered for email:", email)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("")

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setNewPassword(value)
        setError("")
        console.log("[v0] New password changed:", {
            length: value.length,
            hasUpperCase: /[A-Z]/.test(value),
            hasLowerCase: /[a-z]/.test(value),
            hasNumbers: /[0-9]/.test(value),
            hasSpecialChar: /[!@#$%^&*]/.test(value),
        })
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setConfirmPassword(value)
        setError("")
        console.log("[v0] Confirm password changed:", {
            length: value.length,
            matchesNewPassword: value === newPassword,
        })
    }

    const validatePassword = () => {
        console.log("[v0] Validating password...")

        if (!newPassword) {
            const errorMsg = "New password is required"
            setError(errorMsg)
            console.log("[v0] Validation failed:", errorMsg)
            return false
        }

        if (newPassword.length < 6) {
            const errorMsg = "Password must be at least 6 characters"
            setError(errorMsg)
            console.log("[v0] Validation failed:", errorMsg)
            return false
        }

        if (!confirmPassword) {
            const errorMsg = "Please confirm your password"
            setError(errorMsg)
            console.log("[v0] Validation failed:", errorMsg)
            return false
        }

        if (newPassword !== confirmPassword) {
            const errorMsg = "Passwords do not match"
            setError(errorMsg)
            console.log("[v0] Validation failed:", errorMsg)
            return false
        }

        console.log("[v0] Validation passed")
        return true
    }

    const { mutate, isPending } = useMutation({
        mutationKey: ["change-password"],
        mutationFn: async ({ email, newPassword }: { email: string; newPassword: string }) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword }),
            })
            return res.json()
        },
        onSuccess: (data) => {
            if (!data?.success) {
                toast.error(data?.message || "Something went wrong.")
                return
            }
            toast.success(data?.message || "Password changed successfully!")
            setIsMOdalOpen(false)
        },
        onError: (error) => {
            console.error("Change password error:", error)
            toast.error("Something went wrong. Please try again.")
        },
    })


    const handleChangePassword = async () => {

        if (!validatePassword()) {
            return
        }
        mutate({ email, newPassword });
    }

    const isFormValid = newPassword && confirmPassword && newPassword === confirmPassword

    return (
        <div className="flex items-center justify-center  bg-background ">
            <div className="w-full  bg-card rounded-lg  ">
                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* New Password Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">Create New Password</label>
                    <div className="relative">
                        <Input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            placeholder="••••••••"
                            className="pr-10"
                            disabled={isPending}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setShowNewPassword(!showNewPassword)
                                console.log("[v0] New password visibility toggled:", !showNewPassword)
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password Input */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
                    <div className="relative">
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="••••••••"
                            className="pr-10"
                            disabled={isPending}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setShowConfirmPassword(!showConfirmPassword)
                                console.log("[v0] Confirm password visibility toggled:", !showConfirmPassword)
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Change Password Button */}
                <Button
                    onClick={handleChangePassword}
                    disabled={!isFormValid || isPending}
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 rounded-md transition-colors"
                >
                    Change Password {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                </Button>
            </div>
        </div>
    )
}
