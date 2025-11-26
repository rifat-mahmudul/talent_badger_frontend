export interface ActiveProjectApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: Project[];
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  client: Client;
  engineers: Engineer[];
  status: "in_progress" | "completed" | "pending"; // adjust based on your actual status values
  totalPaid: number;
  ndaAgreement: string[];
  progress: number;
  totalTimeline: number;
  startDate: string; // ISO date string
  deliveryDate: string; // ISO date string
  usedAmount: number;
  approvedEngineers: ApprovedEngineer[];
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  profileImage:string;
  firstName: string;
  __v: number;
}

export interface Client {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

export interface Engineer {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  professionTitle?: string;
}

export interface ApprovedEngineer {
  engineer: Engineer;
  status: "approved" | "pending" | "rejected"; // adjust based on actual values
  isManager: boolean;
  _id: string;
}
