"use client";

import { SingleUser } from "@/app/(website)/services/[id]/_components/IndividualService";
// import { UserItem } from "@/app/(website)/services/_components/service-data-type";
import { create } from "zustand";

interface TeamState {
  team: SingleUser[];
  addMember: (member: SingleUser) => void;
  removeMember: (_id: string) => void;
  clearTeam: () => void;
}

export const useTeamStore = create<TeamState>((set) => ({
  team: typeof window !== "undefined" 
    ? JSON.parse(localStorage.getItem("myTeam") || "[]") 
    : [],
  
  addMember: (member: SingleUser) =>
    set((state) => {
      if (state.team.find((m) => m._id === member._id)) return state;
      const newTeam = [...state.team, member].slice(-10); // max 10 members
      localStorage.setItem("myTeam", JSON.stringify(newTeam));
      return { team: newTeam };
    }),
  
  removeMember: (_id: string) =>
    set((state) => {
      const newTeam = state.team.filter((m) => m._id !== _id);
      localStorage.setItem("myTeam", JSON.stringify(newTeam));
      return { team: newTeam };
    }),

  clearTeam: () => {
    localStorage.removeItem("myTeam");
    return { team: [] };
  },
  removeMultipleMembers: (ids: string[]) => {
  set((state) => ({
    team: state.team.filter((member) => !ids.includes(member._id)),
  }));
},
}));
