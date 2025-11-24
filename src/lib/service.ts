
export async function getAllService() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get service data")
  }
  return resData
}

export async function getAllTopService({ page, limit }: { page?: number; limit?: number }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service/?sortBy=topService&page=${page}&limit=${limit}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get service data")
  }
  return resData
}
