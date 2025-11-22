"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


export default function PaymentHistory() {

    const staticData = [
        {
            id: "01235779HE",
            name: "E-commerce API Integration",
            price: "$29.00",
            date: "Oct 06, 2025",
            status: "Complete",
        },
        {
            id: "01235779HE",
            name: "Premium",
            price: "$29.00",
            date: "Sep 01, 2025",
            status: "Complete",
        },
        {
            id: "01235779HE",
            name: "User Authentication System",
            price: "$9.99",
            date: "Aug 16, 2025",
            status: "Complete",
        },
        {
            id: "01235779HE",
            name: "Dashboard Redesign",
            price: "$0.00",
            date: "July 06, 2025",
            status: "Complete",
        },
        {
            id: "01235779HE",
            name: "Database Migration",
            price: "$0.00",
            date: "June 10, 2025",
            status: "Complete",
        },
        {
            id: "01235779HE",
            name: "Payment Gateway Integration",
            price: "$9.99",
            date: "May 12, 2025",
            status: "Complete",
        },
    ];

    return (
        <div>
            <div className="rounded-lg bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#F9FAFB]">
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
                        {staticData.map((item, idx) => (
                            <TableRow
                                key={idx}
                                className="border-b border-border hover:bg-muted/30"
                            >
                                <TableCell className="text-sm py-6 px-8 text-[#424242]">
                                    {item.id}
                                </TableCell>

                                <TableCell className="text-sm text-[#424242]">
                                    {item.name}
                                </TableCell>

                                <TableCell className="text-sm text-right text-[#424242]">
                                    {item.price}
                                </TableCell>

                                <TableCell className="text-sm text-right text-[#424242]">
                                    {item.date}
                                </TableCell>

                                <TableCell className="text-sm text-right pr-6">
                                    <span className="px-4 py-3 rounded-lg bg-[#E6F9EB] text-[#27BE69] text-xs font-medium">
                                        {item.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
