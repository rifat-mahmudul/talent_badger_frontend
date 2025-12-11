
// "use client";

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import DashboardCardsSkeleton from "@/app/(account)/account/_components/dashboard-header-skeleton";
// import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
// import NotFound from "@/components/shared/NotFound/NotFound";
// import { ServiceApiResponse } from "../services/_components/service-data-type";
// import ServiceCard from "../services/_components/ServiceCard";

// // shadcn carousel
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// const TeamBuilderService = () => {
//   const { data, isLoading, error, isError } = useQuery<ServiceApiResponse>({
//     queryKey: ["services-all"],
//     queryFn: async () => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/all-user?role=engineer`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       return res.json();
//     },
//   });

//   let content;

//   if (isLoading) {
//     content = (
//       <div>
//         <DashboardCardsSkeleton />
//       </div>
//     );
//   } else if (isError) {
//     content = (
//       <div className="">
//         <ErrorContainer message={error?.message || "Something went wrong"} />
//       </div>
//     );
//   } else if (data && data?.data && data?.data?.length === 0) {
//     content = (
//       <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
//     );
//   } else if (data && data?.data && data?.data?.length > 0) {
//     content = (
//       <div className="w-full py-10">
//         <Carousel className="relative">
//           <CarouselContent>
//             {data?.data?.map((item, index) => (
//               <CarouselItem
//                 key={index}
//                 className="lg:basis-1/3 md:basis-1/2 basis-full flex justify-center"
//               >
//                 <ServiceCard data={item} />
//               </CarouselItem>
//             ))}
//           </CarouselContent>

//           {/* Left Arrow */}
//           <CarouselPrevious className="absolute -left-10 top-1/2 -translate-y-1/2" />

//           {/* Right Arrow */}
//           <CarouselNext className="absolute -right-10 top-1/2 -translate-y-1/2" />
//         </Carousel>
//       </div>
//     );
//   }

//   return <div>{content}</div>;
// };

// export default TeamBuilderService;


"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardCardsSkeleton from "@/app/(account)/account/_components/dashboard-header-skeleton";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";
import { ServiceApiResponse } from "../services/_components/service-data-type";
import ServiceCard from "../services/_components/ServiceCard";

// shadcn carousel
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TeamBuilderService = () => {
  const { data, isLoading, error, isError } = useQuery<ServiceApiResponse>({
    queryKey: ["services-all"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/all-user?role=engineer`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.json();
    },
  });

  let content;

  if (isLoading) {
    content = Array.from({ length: 3 }, (_, index) => (
      <DashboardCardsSkeleton key={index} />
    ));
  } else if (isError) {
    content = (
      <ErrorContainer message={error?.message || "Something went wrong"} />
    );
  } else if (data && data?.data && data?.data?.length === 0) {
    content = (
      <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
    );
  } else if (data && data?.data?.length > 0) {
    content = (
      <div className="w-full py-10">
        <Carousel className="relative w-full mx-auto px-4">
          <CarouselContent>
            {data?.data?.map((item, index) => (
              <CarouselItem
                key={index}
                className="
                  basis-full
                  sm:basis-1/2
                  lg:basis-1/3 
                  flex justify-center
                "
              >
                <ServiceCard data={item} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Left Arrow */}
          <CarouselPrevious className="absolute -left-6 md:-left-10  top-1/2 -translate-y-1/2 z-10" />

          {/* Right Arrow */}
          <CarouselNext className="absolute -right-6 md:-right-10 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default TeamBuilderService;
