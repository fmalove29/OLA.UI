// models/permission-access.model.ts

export interface Access {
    name: string;
    path: string;
    module: string;
    roles: string;
    id?: string;
    modified?: string;
    modifiedBy?: string;
    active?: boolean;
  }
  
  export interface AccessResponse {
    data: Access[];
    meta: {
      total: number;
      limit: number;
      page: number;
      lastPage: number;
    };
  }
  