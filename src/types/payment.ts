export interface PaymentHistoryResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: PaginationMeta;
  data: PaymentItem[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
}

export interface PaymentItem {
  _id: string;
  projectId: ProjectInfo;
  clientId: ClientInfo;
  stripeSessionId: string;
  stripePaymentIntentId: string;
  transferGroup: string;
  amount: number;
  adminFee: number;
  engineerFee: number;
  approvedEngineers: ApprovedEngineer[];
  currency: string;
  status: string;
  transfers: TransferItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProjectInfo {
  _id: string;
  title: string;
  status: string;
}

export interface ClientInfo {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ApprovedEngineer {
  engineer: EngineerInfo;
  hour: number;
  rate: number;
  projectFee: number;
}

export interface EngineerInfo {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface TransferItem {
  engineer: string | null;
  amount: number;
  transferId: string;
  timestamp: string;
}
