"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import ServiceCard from "@/app/(website)/services/_components/ServiceCard"
import AskQ from "../../faqs/_components/AskQ"

export default function CandidateFilter() {
    return (
        <div className="w-full container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center mb-8">
                <div className="relative flex-1 min-w-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search candidates"
                        className="pl-10 h-11 border-gray-300 focus-visible:ring-teal-600"
                    />
                </div>
                <div className="flex flex-wrap lg:flex-nowrap gap-3">
                    <Select>
                        <SelectTrigger className="w-full lg:w-[110px] h-11 border-teal-600 text-teal-600 hover:bg-teal-50">
                            <SelectValue placeholder="Skills" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="frontend">Frontend</SelectItem>
                            <SelectItem value="backend">Backend</SelectItem>
                            <SelectItem value="fullstack">Full Stack</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-full lg:w-[100px] h-11 border-teal-600 text-teal-600 hover:bg-teal-50">
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="developer">Developer</SelectItem>
                            <SelectItem value="designer">Designer</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-full lg:w-[120px] h-11 border-teal-600 text-teal-600 hover:bg-teal-50">
                            <SelectValue placeholder="Badges" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="verified">Verified</SelectItem>
                            <SelectItem value="expert">Expert</SelectItem>
                            <SelectItem value="top-rated">Top Rated</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-full lg:w-[110px] h-11 border-teal-600 text-teal-600 hover:bg-teal-50">
                            <SelectValue placeholder="Range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0-50">$0 - $50</SelectItem>
                            <SelectItem value="50-100">$50 - $100</SelectItem>
                            <SelectItem value="100-150">$100 - $150</SelectItem>
                            <SelectItem value="150+">$150+</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-full lg:w-[120px] h-11 border-teal-600 text-teal-600 hover:bg-teal-50">
                            <SelectValue placeholder="Ratings" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5 Stars</SelectItem>
                            <SelectItem value="4">4+ Stars</SelectItem>
                            <SelectItem value="3">3+ Stars</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-full lg:w-[140px] h-11 border-teal-600 text-teal-600 hover:bg-teal-50">
                            <SelectValue placeholder="Availability" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="week">Within a week</SelectItem>
                            <SelectItem value="month">Within a month</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button className="h-11 bg-[#147575] hover:bg-teal-700 text-white px-6 whitespace-nowrap">
                    Generate The Team
                </Button>
            </div>


            <div className="space-y-2">
                <h2 className="text-[40px] font-bold text-[#147575]">Four Candidates Are Selected</h2>
                <p className="text-[#929292] text-[18px] leading-relaxed">
                    Meet a curated selection of trusted professionals whose expertise, reliability, and excellence set the benchmark in every project.
                </p>
            </div>
            {/* <div className="grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-6 justify-items-center my-10">
                {Array(10)
                    .fill(0)
                    .map((_, index) => (
                        <ServiceCard key={index} />
                    ))}
            </div> */}
            <AskQ />
        </div>
    )
}
