"use client";

import { useState } from "react";
import { ReusablePagination } from "@/components/reusebale/Pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetAllPayment } from "@/hooks/apiCalling";
import { useSession } from "next-auth/react";

export default function PaymentHistory() {
    const { data: session } = useSession();
    const token = (session?.user as { accessToken: string })?.accessToken;

    // Pagination States
    const [page, setPage] = useState(1);
    const limit = 10;

    // API Call
    const { data: paymentRes, isLoading } = useGetAllPayment(
        token as string,
        page,
        limit
    );

    const payments = paymentRes?.data || [];
    const meta = paymentRes?.meta;

    const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1;

    return (
        <div>
            <div className="rounded-lg bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#F2F2F2]">
                            <TableHead className="text-sm font-medium py-[20px] px-[32px]">
                                Project ID
                            </TableHead>
                            <TableHead className="text-sm font-medium">
                                Project Name
                            </TableHead>
                            <TableHead className="text-sm font-medium text-right">
                                Price
                            </TableHead>
                            <TableHead className="text-sm font-medium text-right">
                                Date
                            </TableHead>
                            <TableHead className="text-sm font-medium text-right px-4">
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading && (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="text-center py-6"
                                >
                                    Loading...
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && payments.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="text-center py-6"
                                >
                                    No payment history found.
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading &&
                            payments.map((item) => (
                                <TableRow
                                    key={item._id}
                                    className="border-b border-border hover:bg-muted/30"
                                >
                                    {/* Project ID */}
                                    <TableCell className="text-sm py-6 px-8 text-[#424242]">
                                        {item.projectId?._id}
                                    </TableCell>

                                    {/* Project Name */}
                                    <TableCell className="text-sm text-[#424242]">
                                        {item.projectId?.title}
                                    </TableCell>

                                    {/* Price */}
                                    <TableCell className="text-sm text-right text-[#424242]">
                                        ${item.amount}
                                    </TableCell>

                                    {/* Date */}
                                    <TableCell className="text-sm text-right text-[#424242]">
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "2-digit",
                                            year: "numeric",
                                        })}
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell className="text-sm text-right pr-6">
                                        <span
                                            className={`px-4 py-3 rounded-lg text-xs font-medium ${item.status ===
                                                "distributed"
                                                ? "bg-[#E6F9EB] text-[#27BE69]"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {meta && totalPages > 1 && (
                <div className="mt-4">
                    <ReusablePagination
                        currentPage={page}
                        totalPages={totalPages}
                        totalResults={meta.total}
                        resultsPerPage={limit}
                        onPageChange={setPage}
                    />
                </div>
            )}
        </div>
    );
}
