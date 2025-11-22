export interface ProjectsMyTeamApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: Project[];
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  client: Client;
  engineers: Engineer[];
  approvedEngineers: Engineer[];
  status: "pending" | "in_progress" | "completed";
  totalPaid: number;
  ndaAgreement: string[];
  progress: number;
  totalTimeline: number;
  startDate: string;
  deliveryDate: string;
  usedAmount: number;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
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
  professionTitle: string;
  ismanager: boolean;
}
