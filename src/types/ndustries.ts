export interface Industry {
    _id: string;
    name: string;
    status: "active" | "inactive";
    discription: string;
    createBy: string;
    users: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IndustryResponse {
    statusCode: number;
    success: boolean;
    message: string;
    meta: {
        total: number;
        page: number;
        limit: number;
    };
    data: Industry[];
}

export interface SingleIndustry {
    data: Industry;
    message: string;
    statusCode: number;
    success: boolean;
}
