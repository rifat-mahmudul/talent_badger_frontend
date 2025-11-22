


// "use client";

// import React, { useMemo, useState } from "react";
// import { cn } from "@/lib/utils";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import { useQuery } from "@tanstack/react-query";
// import { MyBookingsResponse, BookingItem } from "@/types/booking";
// import { useSession } from "next-auth/react";
// import { UpcomingBookingsResponse } from "@/types/upcomming";


// export const fetchBookings = async (token: string | undefined): Promise<MyBookingsResponse> => {
//     const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/my-bookings`,
//         {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: token ? `Bearer ${token}` : "",
//             },
//         }
//     );

//     const data = await res.json();

//     if (!res.ok) {
//         throw new Error(data?.message || "Failed to fetch bookings");
//     }

//     return data;
// };

// export const fetchUpcomingBookings = async (token: string | undefined): Promise<UpcomingBookingsResponse> => {
//     const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/upcoming`,
//         {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: token ? `Bearer ${token}` : "",
//             },
//         }
//     );

//     const data = await res.json();

//     if (!res.ok) {
//         throw new Error(data?.message || "Failed to fetch bookings");
//     }

//     return data;
// };

// export default function DiscoveryCalls() {
//     const today = new Date();
//     const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-11
//     const [currentYear, setCurrentYear] = useState(today.getFullYear());
//     const [openModal, setOpenModal] = useState(false);
//     const [selectedData, setSelectedData] = useState<BookingItem | null>(null);

//     const { data: session } = useSession();
//     const token = (session?.user as { accessToken: string })?.accessToken;


//     const { data } = useQuery<MyBookingsResponse>({
//         queryKey: ["booking"],
//         queryFn: () => fetchBookings(token),
//         enabled: !!token,
//     });

//     const { data:upcomming } = useQuery<UpcomingBookingsResponse>({
//         queryKey: ["upcoming"],
//         queryFn: () => fetchUpcomingBookings(token),
//         enabled: !!token,
//     });
// console.log(upcomming)
//     const highlightedDates = useMemo(() => {
//         if (!data?.data) return [];
//         return data.data
//             .filter((b) => {
//                 const d = new Date(b.date);
//                 return (
//                     d.getMonth() === currentMonth &&
//                     d.getFullYear() === currentYear
//                 );
//             })
//             .map((b) => Number(new Date(b.date).getDate()));
//     }, [data, currentMonth, currentYear]);


//     const handleDateClick = (day: number) => {
//         if (!data?.data) return;

//         const found = data.data.find((b) => {
//             const d = new Date(b.date);
//             return (
//                 d.getDate() === day &&
//                 d.getMonth() === currentMonth &&
//                 d.getFullYear() === currentYear
//             );
//         });

//         if (found) {
//             setSelectedData(found);
//             setOpenModal(true);
//         }
//     };

//     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
//     const firstDay = new Date(currentYear, currentMonth, 1).getDay();

//     const prevMonth = () => {
//         if (currentMonth === 0) {
//             setCurrentMonth(11);
//             setCurrentYear((y) => y - 1);
//         } else {
//             setCurrentMonth((m) => m - 1);
//         }
//     };

//     const nextMonth = () => {
//         if (currentMonth === 11) {
//             setCurrentMonth(0);
//             setCurrentYear((y) => y + 1);
//         } else {
//             setCurrentMonth((m) => m + 1);
//         }
//     };

//     const monthNames = [
//         "January", "February", "March", "April", "May", "June",
//         "July", "August", "September", "October", "November", "December"
//     ];

//     const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

//     return (
//         <>
//             {/* MAIN */}
//             <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">

//                 {/* LEFT: CALENDAR */}
//                 <div className="col-span-2 bg-white rounded-xl border p-6">
//                     <h2 className="font-semibold mb-4">Booked Discovery Calls</h2>

//                     <div className="flex items-center justify-between mb-3">
//                         <button onClick={prevMonth} className="p-1 border rounded-md">
//                             <ChevronLeft size={18} />
//                         </button>

//                         <p className="font-semibold">
//                             {monthNames[currentMonth]} {currentYear}
//                         </p>

//                         <button onClick={nextMonth} className="p-1 border rounded-md">
//                             <ChevronRight size={18} />
//                         </button>
//                     </div>

//                     {/* CALENDAR GRID */}
//                     <div className="grid grid-cols-7 text-center gap-y-2 text-sm">
//                         {dayNames.map((d, i) => (
//                             <p key={i} className="text-gray-500 font-medium">{d}</p>
//                         ))}

//                         {Array.from({ length: firstDay }).map((_, i) => (
//                             <div key={i}></div>
//                         ))}

//                         {Array.from({ length: daysInMonth }).map((_, i) => {
//                             const day = i + 1;
//                             const isHighlighted = highlightedDates.includes(day);

//                             return (
//                                 <div
//                                     key={day}
//                                     onClick={() => handleDateClick(day)}
//                                     className={cn(
//                                         "w-10 h-10 flex items-center justify-center mx-auto rounded-lg cursor-pointer text-sm transition",
//                                         isHighlighted
//                                             ? "bg-[#147575] text-white font-semibold shadow-sm hover:opacity-90"
//                                             : "hover:bg-gray-100"
//                                     )}
//                                 >
//                                     {day}
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>

//                 {/* RIGHT: UPCOMING LIST */}
//                 <div className="bg-white rounded-xl border p-6">
//                     <h2 className="font-semibold mb-4">Upcoming meeting list</h2>

//                     <ul className="space-y-4">
//                         {upcomming?.data?.slice(0, 3).map((b, i) => (
//                             <li key={b._id} className="flex items-start space-x-3">
//                                 <span className="w-6 h-6 rounded-full border flex items-center justify-center text-sm text-gray-500">
//                                     {i + 1}
//                                 </span>
//                                 <div>
//                                     <p className="font-medium">{b.projectId.title}</p>
//                                     <p className="text-sm text-gray-600">Time: {b.time}</p>
//                                     <p className="text-sm text-gray-600">
//                                         Date: {new Date(b.date).toDateString()}
//                                     </p>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>

//             {/* HELP SECTION */}
//             <div className="mt-6 bg-white rounded-xl border p-6 flex items-start space-x-4">
//                 <div className="w-6 h-6 rounded-full border flex items-center justify-center">?</div>
//                 <p className="text-sm text-gray-600">
//                     If you have any questions or need to reschedule, contact us at{" "}
//                     <span className="text-blue-500">support@clientbadger.com</span>
//                     or call (555) 123-4567
//                 </p>
//             </div>

//             {/* MODAL */}
//             <Dialog open={openModal} onOpenChange={setOpenModal}>
//                 <DialogContent className="max-w-md bg-white rounded-xl shadow-xl p-8">
//                     <DialogHeader>
//                         <DialogTitle className="text-center text-xl font-semibold">
//                             {selectedData?.projectId.title}
//                         </DialogTitle>
//                     </DialogHeader>

//                     <p className="text-center mt-2 font-medium">
//                         <span className="font-semibold">Time:</span> {selectedData?.time}
//                     </p>

//                     <div className="bg-gray-200 mt-5 rounded-md p-3 text-center">
//                         <a
//                             href={selectedData?.link}
//                             target="_blank"
//                             className="text-blue-500 text-sm underline"
//                         >
//                             {selectedData?.link}
//                         </a>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// }


"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { MyBookingsResponse, BookingItem } from "@/types/booking";
import { UpcomingBookingsResponse } from "@/types/upcomming";

export const fetchBookings = async (token?: string): Promise<MyBookingsResponse> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/my-bookings`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to fetch bookings");
    return data;
};

export const fetchUpcomingBookings = async (token?: string): Promise<UpcomingBookingsResponse> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/upcoming`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to fetch upcoming bookings");
    return data;
};

export default function DiscoveryCalls() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [openModal, setOpenModal] = useState(false);
    const [selectedData, setSelectedData] = useState<BookingItem | null>(null);

    const { data: session } = useSession();
    const token = (session?.user as { accessToken: string })?.accessToken;

    const { data } = useQuery<MyBookingsResponse>({
        queryKey: ["my-bookings"],
        queryFn: () => fetchBookings(token),
        enabled: !!token,
    });

    const { data: upcoming } = useQuery<UpcomingBookingsResponse>({
        queryKey: ["upcoming-bookings"],
        queryFn: () => fetchUpcomingBookings(token),
        enabled: !!token,
    });

    const highlightedDates = useMemo(() => {
        if (!data?.data) return [];
        return data.data
            .filter((b) => {
                const d = new Date(b.date);
                return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
            })
            .map((b) => new Date(b.date).getDate());
    }, [data, currentMonth, currentYear]);

    const handleDateClick = (day: number) => {
        if (!data?.data) return;
        const found = data.data.find((b) => {
            const d = new Date(b.date);
            return d.getDate() === day && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        });
        if (found) {
            setSelectedData(found);
            setOpenModal(true);
        }
    };

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((y) => y - 1);
        } else setCurrentMonth((m) => m - 1);
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear((y) => y + 1);
        } else setCurrentMonth((m) => m + 1);
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

    return (
        <>
            {/* MAIN */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
                {/* CALENDAR */}
                <div className="col-span-2 bg-white rounded-xl border p-6">
                    <h2 className="font-semibold mb-4">Booked Discovery Calls</h2>
                    <div className="flex items-center justify-between mb-3">
                        <button onClick={prevMonth} className="p-1 border rounded-md">
                            <ChevronLeft size={18} />
                        </button>
                        <p className="font-semibold">{monthNames[currentMonth]} {currentYear}</p>
                        <button onClick={nextMonth} className="p-1 border rounded-md">
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    {/* CALENDAR GRID */}
                    <div className="grid grid-cols-7 text-center gap-y-2 text-sm">
                        {dayNames.map((d, i) => <p key={i} className="text-gray-500 font-medium">{d}</p>)}
                        {Array.from({ length: firstDay }).map((_, i) => <div key={i}></div>)}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const isHighlighted = highlightedDates.includes(day);
                            return (
                                <div
                                    key={day}
                                    onClick={() => handleDateClick(day)}
                                    className={cn(
                                        "w-10 h-10 flex items-center justify-center mx-auto rounded-lg cursor-pointer text-sm transition",
                                        isHighlighted
                                            ? "bg-[#147575] text-white font-semibold shadow-sm hover:opacity-90"
                                            : "hover:bg-gray-100"
                                    )}
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* UPCOMING LIST */}
                <div className="bg-white rounded-xl border p-6">
                    <h2 className="font-semibold mb-4">Upcoming meeting list</h2>
                    <ul className="space-y-4">
                        {upcoming?.data?.slice(0, 3).map((b, i) => (
                            <li key={b._id} className="flex items-start space-x-3">
                                <span className="w-6 h-6 rounded-full border flex items-center justify-center text-sm text-gray-500">{i + 1}</span>
                                <div>
                                    <p className="font-medium">{b.projectId.title}</p>
                                    <p className="text-sm text-gray-600">Time: {b.time}</p>
                                    <p className="text-sm text-gray-600">Date: {new Date(b.date).toLocaleDateString()}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* HELP SECTION */}
            <div className="mt-6 bg-white rounded-xl border p-6 flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full border flex items-center justify-center">?</div>
                <p className="text-sm text-gray-600">
                    If you have any questions or need to reschedule, contact us at{" "}
                    <span className="text-blue-500">support@clientbadger.com</span> or call (555) 123-4567
                </p>
            </div>

            {/* MODAL */}
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="max-w-5xl bg-white rounded-xl shadow-xl p-8">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-semibold">
                            {selectedData?.projectId.title || ""}
                        </DialogTitle>
                    </DialogHeader>
                    <p className="text-center mt-2 font-medium">
                        <span className="font-semibold">Time:</span> {selectedData?.time}
                    </p>
                    <div className="bg-gray-200 mt-5 rounded-md p-3 text-center">
                        <a href={selectedData?.link} target="_blank" className="text-blue-500 text-sm underline">
                            {selectedData?.link}
                        </a>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
