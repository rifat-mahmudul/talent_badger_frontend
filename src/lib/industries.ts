import { IndustryResponse } from "@/types/ndustries";

export async function getAllIndustries() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/industry?status=active`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    const resData: IndustryResponse = await response.json()
    if (!response.ok) {
        throw new Error(resData.message || "Failed to get industry data")
    }
    return resData
}
