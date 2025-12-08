export interface BadgeItem {
_id: string;
name: string;       // new name field in your response
badge: string[];    // array of badge image URLs
createdAt: string;
updatedAt: string;
__v: number;
}

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
userstatus: string;
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
badge?: BadgeItem[];   // now an array of BadgeItem
level: number;
ismanager: boolean;
createdAt: string;
updatedAt: string;
__v: number;
lastLogin: string;
experience?: number | null;
gitHubLink?: string;
cv?: string;                // PDF link for CV
certifications?: string;
lavelUpdateRequest?: boolean;
badgeRequest?: string;
badgeUpdateRequest?: boolean;
}

export interface SingleServiceUserResponse {
statusCode: number;
success: boolean;
message: string;
data: SingleUser;
}
