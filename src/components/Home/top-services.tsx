import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

import { useGetTopService } from "@/hooks/apiCalling";
import Image from "next/image";

// Data

export default function TopServices() {

const allData = useGetTopService(1, 6)
const services = allData.data?.data

  return (
    <div className="w-full flex flex-col items-center py-16 px-4 md:px-10 lg:px-24">
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900">
        Top <span className="text-teal-700">Services</span>
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mt-2 mb-10">
        Precise consulting solutions, powered by world-class experts.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
        {services?.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border rounded-2xl shadow-sm hover:shadow-md transition-all p-6 h-full cursor-pointer">
              <CardContent className="flex flex-col gap-4">
               <Image src={service?.image} alt="service" width={900} height={900} className="w-12 h-12" />
                <h2 className="text-lg font-semibold text-gray-900">{service?.serviceName}</h2>
                <p className="text-gray-600 leading-relaxed">{service?.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
