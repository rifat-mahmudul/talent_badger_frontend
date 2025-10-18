"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle2 } from "lucide-react"

export function SideSetting() {
    const [imageUrl, setImageUrl] = useState(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AakfxVtAP4R24wApjG814o3lVRuBo5.png"
    )
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        console.log("Profile Image URL:", imageUrl)
    }, [imageUrl])

    // When file is selected
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            console.log("Selected file:", file)
            const fileUrl = URL.createObjectURL(file)
            setImageUrl(fileUrl)
        }
    }

    // When avatar is clicked
    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <Card className="w-full max-w-[408px] overflow-hidden border-0 shadow-lg">
            <div
                className="h-44"
                style={{
                    background: "linear-gradient(135deg, #147575 0%, #DAF9FF 100%)",
                }}
            />
            <div className="relative px-6 pb-6">
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="absolute -top-16 left-1/2 -translate-x-1/2 cursor-pointer" onClick={handleAvatarClick}>
                    <div className="relative">
                        <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                            <AvatarImage src={imageUrl || "/placeholder.svg"} alt="Profile Image" />
                            <AvatarFallback className="text-2xl bg-gray-200 text-gray-600">MJ</AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-2 right-2 bg-white rounded-full p-0.5">
                            <CheckCircle2 className="h-6 w-6 text-teal-500 fill-teal-500" />
                        </div>
                    </div>
                </div>

                {/* Name and Role */}
                <div className="pt-20 text-center mb-6">
                    <h2 className="text-xl font-semibold text-teal-700 mb-1">Maria Jasmin</h2>
                    <p className="text-sm text-gray-500">Admin</p>
                </div>

                {/* Information List */}
                <div className="space-y-3">
                    <InfoRow label="Name:" value="Maria Jasmin" />
                    <InfoRow label="Email:" value="Maria.Jasmin@gmail.com" />
                    <InfoRow label="Phone:" value="+1 (555) 214-8574" />
                    <InfoRow label="Location:" value="San Francisco" />
                    <InfoRow label="Member Since:" value="14 August 2025" />
                </div>
            </div>
        </Card>
    )
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex text-sm gap-3">
            <span className="text-[#343A40] font-medium text-[16px]">{label}</span>
            <span className="text-[#68706A]">{value}</span>
        </div>
    )
}
