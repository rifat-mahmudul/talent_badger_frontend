export interface SingleUser {
  _id: string;
  email: string;
  password: string;
  role: string;
  status: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  professionTitle: string;
  bio: string;
  rate: number | null;
  skills: string[];
  expertise: string[];
  industry: string;
  service: string;
  location: string;
  walletBalance: number;
  balance: number;
  totalEarned: number;
  completedProjectsCount: number;
  totalRating: number;
  ratingCount: number;
  avgRating: number;
  badge: string[]; 
  level: number;
  ismanager: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastLogin: string;
  experience: number | null;
  gitHubLink: string;
}

export interface SingleServiceUserResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: SingleUser;
}
