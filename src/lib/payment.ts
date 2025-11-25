import { PaymentHistoryResponse } from "@/types/payment"

export async function getAllPayment({ page, limit, token }: { page?: number; limit?: number, token: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/history?page=${page}&limit=${limit}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    const resData: PaymentHistoryResponse = await response.json()
    if (!response.ok) {
        throw new Error(resData.message || "Failed to get payment data")
    }
    return resData
}
