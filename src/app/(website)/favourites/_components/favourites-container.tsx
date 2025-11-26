"use client";

import Image from "next/image";
import { useTeamStore } from "@/store/teamStore";
import { X, Heart, Users, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import StatementOfWorkForm from "../../services/_components/statement-of-work-form";
import { cn } from "@/lib/utils"; // assuming you have this helper

export default function FavouritesContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const team = useTeamStore((state) => state.team);
  const removeMember = useTeamStore((state) => state.removeMember);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-100 text-red-600 mb-4">
              <Heart className="w-8 h-8" fill="currentColor" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              My Favourite Engineers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-5">
              You’ve saved {team.length} {team.length === 1 ? "engineer" : "engineers"} you love working with. 
              Ready to build something amazing together?
            </p>
          </div>

          {/* Empty State */}
          {team.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-16 text-center ">
              <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart className="w-16 h-16 text-gray-300" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                No favourites yet
              </h3>
              <p className="text-gray-500 text-base max-w-md mx-auto">
                Start adding engineers you’d love to work with again. They’ll appear here!
              </p>
            </div>
          ) : (
            <>
              {/* Team Members Grid */}
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-1">
                {team.map((member, idx) => (
                  <div
                    key={member._id}
                    className={cn(
                      "group relative bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-xl hover:border-gray-300 transition-all duration-300",
                      "hover:-translate-y-1"
                    )}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        {/* Avatar */}
                        <div className="relative">
                          <Image
                            src={member.profileImage || "/default-avatar.png"}
                            alt={member.firstName}
                            width={80}
                            height={80}
                            className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                            {member.level}
                          </div>
                        </div>

                        {/* Info */}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {member.firstName} {member.lastName}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            <span className="font-medium text-gray-700">
                              ${member.rate}/hr
                            </span>{" "}
                            • Expert in {member.skills?.[0] || "Engineering"}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {member?.completedProjectsCount || 0} projects completed
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeMember(member._id)}
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="mt-12 text-center">
                <div className="inline-block bg-gradient-to-r from-[#00383B] to-[#005A5A] text-white rounded-2xl shadow-2xl p-8 max-w-2xl">
                  <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
                    <Users className="w-8 h-8" />
                    Ready to Start Your Project?
                  </h2>
                  <p className="text-white/90 mb-6">
                    Your dream team is waiting. Create your Statement of Work now.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => setIsOpen(true)}
                    className="bg-white text-[#00383B] hover:bg-gray-100 font-semibold text-lg px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    Start My SOW
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* SOW Modal */}
      <StatementOfWorkForm open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
























// "use client";

// import Image from "next/image";
// import { useTeamStore } from "@/store/teamStore";
// import { X } from "lucide-react";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import StatementOfWorkForm from "../../services/_components/statement-of-work-form";

// export default function FavouritesContainer() {
//   const [isOpen, setIsOpen] = useState(false);
//   const team = useTeamStore((state) => state.team);
//   const removeMember = useTeamStore((state) => state.removeMember);

//   return (
//     <div className="min-h-screen container mx-auto py-10">
//       <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#00383B] text-center">
//         My Favourites
//       </h1>

//       {team.length === 0 ? (
//         <div className="w-full h-[500px] flex items-center justify-center">
//           <p className="text-gray-600 text-xl font-medium leading-[120%]">
//             No favourites added yet.
//           </p>
//         </div>
//       ) : (
//         <div className="container mx-auto space-y-4">
//           {team.map((member) => (
//             <div
//               key={member._id}
//               className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:bg-gray-50"
//             >
//               <div className="flex items-center gap-4">
//                 <Image
//                   src={member.profileImage || "/default-avatar.png"}
//                   alt={member.firstName}
//                   width={60}
//                   height={60}
//                   className="w-14 h-14 rounded-full object-cover"
//                 />

//                 <div>
//                   <h3 className="font-semibold text-lg">
//                     {member.firstName} {member.lastName}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     Level: {member.level} | {member.rate}/hr
//                   </p>
//                 </div>
//               </div>

//               <button
//                 onClick={() => removeMember(member._id)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           ))}

//           {/* button  */}
//           <div className="w-full flex items-center justify-end pt-4">
//             <Button
//               onClick={() => {
//                 setIsOpen(true);
//               }}
//               className="bg-[#00383B] hover:bg-[#005356] text-white w-full sm:w-auto"
//             >
//               Start My SOW
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* SOW modal form  */}
//       {isOpen && (
//         <StatementOfWorkForm
//           open={isOpen}
//           onOpenChange={(open: boolean) => setIsOpen(open)}
//         />
//       )}
//     </div>
//   );
// }
