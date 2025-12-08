type BadgeItem = {
  _id: string;
  name: string;
  badge: string[]; // array of image URLs
};

export type UserItem = {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  professionTitle: string;
  bio: string;
  experience: number;
  userstatus: "available" | "not_available" | string;
  skills: string[];
  rate: number;
  completedProjectsCount: number;

  // FIXED TYPE
  badge: BadgeItem[];
};
