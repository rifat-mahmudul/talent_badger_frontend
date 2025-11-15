
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
