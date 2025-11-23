import { Zap, BarChart3, MessageSquare, Award, DollarSign } from "lucide-react";
import Image from "next/image";
import { UserItem } from "./service-data-type";
import Link from "next/link";
import { toast } from "sonner";
import { useTeamStore } from "@/store/teamStore";


export default function ServiceCard({ data }: { data: UserItem }) {


    const addMember = useTeamStore((state) => state.addMember);
  const team = useTeamStore((state) => state.team);

  const handleAddToTeam = () => {
    if (!data?._id) return;

    if (team.find((m) => m._id === data._id)) {
      alert(`${data.firstName} is already in your team!`);
      return;
    }

    if (team.length >= 10) {
      toast.error("Team is full! Remove someone to add a new member.");
      return;
    }

    addMember(data);
    toast.success(`${data.firstName} added to your team!`);
  };



  return (
    <div className="w-full max-w-[496px] bg-white rounded-xl border-t-[3px]  border-[#147575] shadow-[0px_4px_6px_0px_#45B6CA1A]  overflow-hidden">
      <div className="relative">
        <Image
          src={data?.profileImage || ""}
          alt={data?.firstName}
          width={392}
          height={200}
          className="w-full h-[304px] object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white text-sm font-medium text-gray-700">
            Level - {data?.level}
          </span>
        </div>
      </div>

      <div className="py-4 px-6">
        <h2 className="text-xl font-semibold text-[#147575] mb-2">
          {data?.firstName} {data?.lastName}
        </h2>

        <p className="text-[16px] text-[#929292] mb-6 leading-relaxed">
          {data?.professionTitle}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#E8F1F1] rounded-full border border-[#E8F1F1]">
            <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span className="text-sm font-medium text-[#147575] ">
              {data?.skills?.join(" , ")}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-[#E8F1F1] rounded-full border border-[#E8F1F1]">
            <BarChart3 className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700">
              {data?.experience}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-[#E8F1F1] rounded-full border border-[#E8F1F1]">
            <MessageSquare className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700">
              {data?.expertise}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-[#E8F1F1] rounded-full border border-[#E8F1F1]">
            <Award className="w-4 h-4 text-yellow-600 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700">
              Level - {data?.level}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-[#E8F1F1]  border border-[#E8F1F1] rounded-full mb-6 w-fit">
            <DollarSign className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700">
              {data?.rate}/hrs
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="col-span-1">
            <Link href={`/services/${data?._id}`}>
              <button className="w-full flex-1 px-6 py-2.5 border font-medium border-[#00383B] rounded-lg text-sm  text-[#00383B] hover:bg-gray-50 transition-colors">
                See Profile
              </button>
            </Link>
          </div>
          <div className="col-span-1">
            <button
              onClick={handleAddToTeam}
              className="w-full flex-1 px-6 py-2.5 bg-[#147575] rounded-lg text-sm font-medium text-white hover:bg-teal-800 transition-colors"
            >
              Add to My Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
