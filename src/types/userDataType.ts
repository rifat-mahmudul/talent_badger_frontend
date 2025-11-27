export interface Badge {
  _id: string;
  name: string;
  badge: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userstatus: string;
  role: string;
  status: string;
  profileImage: string;
  verified: boolean;
  phone: string;
  skills: string[];
  rate: number;
  expertise: string[];
  walletBalance: number;
  balance: number;
  experience: string;
  gitHubLink: string;
  service: string;
  industry: string;
  totalEarned: number;
  completedProjectsCount: number;
  totalRating: number;
  location: string;
  professionTitle: string;
  ratingCount: number;
  avgRating: number;
  badge: Badge | null; // Updated from string[] to Badge object
  level: number;
  createdAt: string;
  updatedAt: string;
  bio: string;
  lastLogin: string;
  otp: string;
  otpExpiry: string;
  stripeAccountId: string;
  __v: number;
  badgeUpdateRequest?: boolean;
  badgeRequest?: string | null;
}

export interface UserProfileResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: UserProfile;
}

export interface ProfileUpdatePayload {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  designation: string;
}

export interface EngineerProfileUpdatePayload {
  firstName: string;
  lastName: string;
  address: string;
  designation: string;
  professionTitle: string;
  bio: string;
  location: string;
  experience: string;
  githubLink: string;
  service: string;
  industriesOfInterest: string;
  rate: string;
  skills: string[];
  uploadCV: string | null;
  educationCertifications: string | null;
}