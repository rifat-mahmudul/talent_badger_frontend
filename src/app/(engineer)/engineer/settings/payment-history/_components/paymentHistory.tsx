/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface Engineer {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface Project {
  _id: string;
  title: string;
  status: string;
}

interface Client {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface Transfer {
  engineer: string | null;
  amount: number;
  transferId: string;
  timestamp: string;
}

interface ApprovedEngineer {
  engineer: Engineer;
  hour: number;
  rate: number;
  projectFee: number;
}

interface PaymentHistoryItem {
  _id: string;
  projectId: Project;
  clientId: Client;
  stripeSessionId: string;
  transferGroup: string;
  amount: number;
  adminFee: number;
  engineerFee: number;
  approvedEngineers: ApprovedEngineer[];
  currency: string;
  status: string;
  transfers: Transfer[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  stripePaymentIntentId: string;
}

export default function PaymentHistory() {
  const { data: session, status: sessionStatus } = useSession();
  const token = (session as any)?.user?.accessToken;
  const userId = (session as any)?.user?.id;

  const { data: paymentHistory, isLoading } = useQuery<PaymentHistoryItem[]>({
    queryKey: ["payment-history", token],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/history`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch payment history");
      }

      const data = await res.json();
      return data?.data || [];
    },
    enabled: !!token && sessionStatus === "authenticated",
    staleTime: 5 * 60 * 1000,
  });

  const getStatusStyle = (status: string): string => {
    const statusLower = status?.toLowerCase();

    switch (statusLower) {
      case "completed":
      case "distributed":
        return "bg-[#E6F9EB] text-[#27BE69]";
      case "pending":
        return "bg-[#FFF6E6] text-[#F79009]";
      case "failed":
      case "cancelled":
        return "bg-[#FEE4E2] text-[#F04438]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // const formatCurrency = (amount: number, currency: string = "usd"): string => {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: currency.toUpperCase(),
  //   }).format(amount / 100);
  // };

  if (sessionStatus === "loading" || isLoading) {
    return (
      <div className="rounded-lg bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F9FAFB]">
              <TableHead className="text-sm font-medium py-[20px] px-[32px] text-center">
                Project ID
              </TableHead>
              <TableHead className="text-sm font-medium text-center">
                Project Name
              </TableHead>
              <TableHead className="text-sm font-medium text-center">
                Project Amount
              </TableHead>
              <TableHead className="text-sm font-medium text-center">
                Payment Amount
              </TableHead>
              <TableHead className="text-sm font-medium text-center px-4">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index} className="border-b border-border">
                <TableCell className="py-6 px-8 text-center">
                  <Skeleton className="h-4 w-24 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-32 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-16 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-16 mx-auto" />
                </TableCell>
                <TableCell className="text-center pr-6">
                  <Skeleton className="h-6 w-20 mx-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  const shouldShowEmptyState =
    !paymentHistory?.length && sessionStatus === "authenticated";

  return (
    <div>
      <div className="rounded-lg bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F9FAFB]">
              <TableHead className="text-sm font-medium py-[20px] px-[32px] text-center">
                Project ID
              </TableHead>
              <TableHead className="text-sm font-medium text-center">
                Project Name
              </TableHead>
              <TableHead className="text-sm font-medium text-center">
                Project Amount
              </TableHead>
              <TableHead className="text-sm font-medium text-center">
                Payment Amount
              </TableHead>
              <TableHead className="text-sm font-medium text-center px-4">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paymentHistory?.map((item: PaymentHistoryItem) => (
              <TableRow
                key={item?._id}
                className="border-b border-border hover:bg-muted/30"
              >
                <TableCell className="text-sm py-6 px-8 text-[#424242] font-mono text-center">
                  {item?.projectId?._id || "-"}
                </TableCell>

                <TableCell className="text-sm text-[#424242] text-center">
                  {item?.projectId?.title || "-"}
                </TableCell>

                <TableCell className="text-sm text-[#424242] font-medium text-center">
                  ${item?.amount}
                </TableCell>

                <TableCell className="text-sm text-[#424242] font-medium text-center">
                  ${
                    item?.transfers?.find(
                      (transfer: any) => transfer?.engineer?._id === userId
                    )?.amount ?? 0
                  }
                </TableCell>

                <TableCell className="text-sm text-center pr-6">
                  <span
                    className={`px-3 py-2 rounded-lg text-xs font-medium capitalize ${getStatusStyle(
                      item?.status
                    )}`}
                  >
                    {item?.status?.toLowerCase() || "unknown"}
                  </span>
                </TableCell>
              </TableRow>
            ))}

            {shouldShowEmptyState && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No payment history found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
