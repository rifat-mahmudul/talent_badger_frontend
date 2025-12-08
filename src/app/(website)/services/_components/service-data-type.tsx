export interface BadgeItem {
  _id: string;
  lavel: number;
  badge: string[];
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserItem {
  _id: string;
  userstatus: string;
  email: string;
  password: string;
  role: string;
  status: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  professionTitle: string;
  bio: string;
  rate?: number | null;
  skills: string[];
  expertise: string[];
  industry: string;
  service: string;
  location: string;
  walletBalance: number;
  balance: number;
  totalEarned: number;
  completedProjectsCount: number;
  totalRating?: number;
  ratingCount?: number;
  avgRating: number;
  badge?: BadgeItem[]; // <-- CHANGE HERE
  level: number;
  ismanager: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastLogin: string;
  experience?: number | null;
  gitHubLink?: string;
  phone?: string;
  cv?: string;
  certifications?: string;
  stripeAccountId?: string;
  lavelUpdateRequest?: boolean;
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
