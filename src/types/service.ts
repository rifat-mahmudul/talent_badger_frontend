export interface Service {
  _id: string;
  serviceName: string;
  category: string;
  status: string;
  image: string;
  description: string;
  createdBy: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  users: string[];
}

export interface ServicesResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: Service[];
}
