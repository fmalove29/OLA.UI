// models/permission-access.model.ts
export interface PermissionAccess {
    module: string;
    role: string;
    paths: string[];
}
