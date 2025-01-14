export interface AdminCreateNewRoleRequest {
    name: string;
    status: number;
}

export class RoleModel {
    role_uuid!: string;
    name!: string;
    status!: number;
    created_at!: string;
    updated_at!: string;
    deleted_at?: string;
}
