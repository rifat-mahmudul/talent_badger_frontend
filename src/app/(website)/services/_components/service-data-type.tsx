export interface UserItem {
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
  rate?: number | null;            // sometimes null, sometimes number
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
  badge: string[];                 // array of strings
  level: number;
  ismanager: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastLogin: string;
  experience?: number | null;      // null or number
  gitHubLink?: string;
  phone?: string;
  cv?: string;
  certifications?: string;
  stripeAccountId?: string;
}

export interface UsersMeta {
  total: number;
  page: number;
  limit: number;
}

export interface ServiceApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: UsersMeta;
  data: UserItem[];
}

