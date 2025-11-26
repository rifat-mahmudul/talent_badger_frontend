export interface EngineerDatatype {
  _id: string;
  email: string;
  password: string;
  role: "engineer" | string;
  status: "active" | "inactive" | string;

  firstName: string;
  lastName: string;
  phone: string;
  profileImage: string;
  professionTitle: string;
  bio: string;
  rate: number;
  experience: number;

  skills: string[];
  expertise: string[];
  industry: string;
  service: string;

  location: string;
  walletBalance: number;
  balance: number;
  totalEarned: number;
  completedProjectsCount: number;
  level: number;
  avgRating: number;

  ismanager: boolean;
 userstatus?: "available" | "busy" | "offline" | string;

  createdAt: string;
  updatedAt: string;
  __v: number;
}



export type EngineerList = EngineerDatatype[];
