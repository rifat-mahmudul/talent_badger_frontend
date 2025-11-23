"use client";
import { UserItem } from "@/app/(website)/services/_components/service-data-type";
import { useState, useEffect } from "react";

export function useTeam() {
  const [team, setTeam] = useState<UserItem[]>([]);

  // Load initial team from localStorage
  useEffect(() => {
    const storedTeam: UserItem[] = JSON.parse(localStorage.getItem("myTeam") || "[]");
    setTeam(storedTeam);
  }, []);

  // Add member
  const addMember = (member: UserItem) => {
    setTeam((prev) => {
      if (prev.find((m) => m._id === member._id)) return prev; // avoid duplicates
      const newTeam = [...prev, member].slice(-10); // max 10 members
      localStorage.setItem("myTeam", JSON.stringify(newTeam));
      return newTeam;
    });
  };

  // Remove member
  const removeMember = (_id: string) => {
    setTeam((prev) => {
      const newTeam = prev.filter((m) => m._id !== _id);
      localStorage.setItem("myTeam", JSON.stringify(newTeam));
      return newTeam;
    });
  };

  return { team, addMember, removeMember };
}
